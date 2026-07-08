import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GameEngine } from '../game/GameEngine';
import { HERO_DEFINITIONS } from '../game/heroData';
import { Renderer } from '../game/Renderer';
import { generateTutorialWave } from '../game/TutorialWaveData';
import { useAuth } from '../contexts/AuthContext';
import { useGameLock } from '../contexts/GameLockContext';
import api from '../api/client';
import type { GameState, HeroMeterEntry } from '../game/types';
import {
  CANVAS_WIDTH, CANVAS_HEIGHT, HERO_SIZE,
  FIELD_Y_CENTER,
} from '../game/constants';

type TutorialScreen =
  | 'intro'
  | 'playing'
  | 'boss_intro'
  | 'dying'
  | 'stage_end';

function getSummonDisplayName(t: (key: string) => string, skillId: string, rawName: string): string {
  for (const h of HERO_DEFINITIONS) {
    for (const r of h.classRoutes) {
      const s = r.skills.find(sk => sk.id === skillId);
      if (s?.summonStats?.displayNameKey) return t(s.summonStats.displayNameKey);
      if (s?.nameKey) return t(s.nameKey);
    }
  }
  return rawName;
}

export default function TutorialPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setLocked } = useGameLock();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const prevPhaseRef = useRef<string>('prep');
  const prevWaveRef = useRef<number>(0);
  const bossIntroShownRef = useRef(false);
  const goldSavedRef = useRef(false);
  const narrationWaveRef = useRef<number | null>(null);

  const [screen, setScreen] = useState<TutorialScreen>('intro');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [introLineIdx, setIntroLineIdx] = useState(0);
  const [waveNarration, setWaveNarration] = useState<string[] | null>(null);
  const [bossLine, setBossLine] = useState(0);
  const [deathLine, setDeathLine] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const [savedGold, setSavedGold] = useState(0);
  const [meterTab, setMeterTab] = useState<'damage' | 'healing' | 'taken'>('damage');

  const INTRO_LINES = useMemo(() => t('tutorial.s1.intro', { returnObjects: true }) as string[], [t]);
  const WAVE_CLEAR_LINES = useMemo((): Record<number, string[]> => ({
    1: t('tutorial.s1.wave1', { returnObjects: true }) as string[],
    2: t('tutorial.s1.wave2', { returnObjects: true }) as string[],
    3: t('tutorial.s1.wave3', { returnObjects: true }) as string[],
    4: t('tutorial.s1.wave4', { returnObjects: true }) as string[],
  }), [t]);
  const BOSS_INTRO_LINES = useMemo(() => t('tutorial.s1.bossIntro', { returnObjects: true }) as string[], [t]);
  const DEATH_LINES = useMemo(() => t('tutorial.s1.death', { returnObjects: true }) as string[], [t]);

  // ── 렌더러 초기화 + wall label 설정
  useEffect(() => {
    if (!canvasRef.current) return;
    rendererRef.current = new Renderer(canvasRef.current);
    return () => { engineRef.current?.stop(); setLocked(false); };
  }, []);

  useEffect(() => {
    if (!rendererRef.current) return;
    rendererRef.current.t_i18n = t;
    rendererRef.current.wallLabel = t('game.wallLabel');
    rendererRef.current.wall2Label = t('game.wall2Label');
    rendererRef.current.wall3Label = t('game.wall3Label');
    rendererRef.current.affixEnrageLabel = '[' + t('game.affixEnrage') + ']';
    rendererRef.current.affixHealAuraLabel = '[' + t('game.affixHealAura') + ']';
    rendererRef.current.affixSummonLabel = '[' + t('game.affixSummon') + ']';
    rendererRef.current.affixAoeSlamLabel = '[' + t('game.affixAoeSlam') + ']';
  }, [t]);

  // ── 렌더 루프
  useEffect(() => {
    let rafId: number;
    const loop = () => {
      if (rendererRef.current && engineRef.current) {
        rendererRef.current.render(
          engineRef.current.state,
          engineRef.current.damageNumbers,
          engineRef.current.explosions,
        );
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── 인트로 타이핑
  useEffect(() => {
    if (screen !== 'intro' || introLineIdx >= INTRO_LINES.length) return;
    const delay = INTRO_LINES[introLineIdx] === '' ? 200 : 600;
    const timer = setTimeout(() => setIntroLineIdx(i => i + 1), delay);
    return () => clearTimeout(timer);
  }, [screen, introLineIdx, INTRO_LINES]);

  // ── 웨이브 클리어 나레이션 자동 해제
  useEffect(() => {
    if (!waveNarration) return;
    const timer = setTimeout(() => { setWaveNarration(null); narrationWaveRef.current = null; }, 3500);
    return () => clearTimeout(timer);
  }, [waveNarration]);

  // ── 게임 상태 감시
  useEffect(() => {
    if (!gameState || screen !== 'playing') return;
    const { phase, currentWave } = gameState;

    if (phase === 'defeat') {
      engineRef.current?.stop();
      setScreen('dying');
      setDeathLine(0);
      prevPhaseRef.current = phase;
      return;
    }

    if (
      phase === 'prep' &&
      currentWave === 4 &&
      prevPhaseRef.current === 'wave_clear' &&
      !bossIntroShownRef.current
    ) {
      bossIntroShownRef.current = true;
      engineRef.current?.togglePause();
      setBossLine(0);
      setScreen('boss_intro');
      prevPhaseRef.current = phase;
      return;
    }

    if (phase === 'wave_clear' && currentWave !== prevWaveRef.current) {
      prevWaveRef.current = currentWave;
      const lines = WAVE_CLEAR_LINES[currentWave];
      if (lines) { narrationWaveRef.current = currentWave; setWaveNarration(lines); }
    }

    prevPhaseRef.current = phase;
  }, [gameState, screen, WAVE_CLEAR_LINES]);

  useEffect(() => {
    if (narrationWaveRef.current !== null) {
      const lines = WAVE_CLEAR_LINES[narrationWaveRef.current];
      if (lines) setWaveNarration(lines);
    }
  }, [WAVE_CLEAR_LINES]);

  // ── 사망 연출
  useEffect(() => {
    if (screen !== 'dying' || deathLine >= DEATH_LINES.length) return;
    const delay = deathLine === 0 ? 500 : 900;
    const timer = setTimeout(() => setDeathLine(l => l + 1), delay);
    return () => clearTimeout(timer);
  }, [screen, deathLine, DEATH_LINES]);

  useEffect(() => {
    if (screen !== 'dying' || deathLine < DEATH_LINES.length) return;
    const timer = setTimeout(() => setScreen('stage_end'), 2500);
    return () => clearTimeout(timer);
  }, [screen, deathLine, DEATH_LINES]);

  // ── 골드 지급
  useEffect(() => {
    if (screen !== 'stage_end' || goldSavedRef.current || !user?.id) return;
    goldSavedRef.current = true;
    const earned = (gameState?.goldEarned ?? 0) + 300;
    setSavedGold(earned);
    api.post('/user/gold', { delta: earned }).catch(() => { });
  }, [screen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 보스 인트로 대사
  useEffect(() => {
    if (screen !== 'boss_intro' || bossLine >= BOSS_INTRO_LINES.length) return;
    const delay = BOSS_INTRO_LINES[bossLine] === '' ? 200 : 800;
    const timer = setTimeout(() => setBossLine(l => l + 1), delay);
    return () => clearTimeout(timer);
  }, [screen, bossLine, BOSS_INTRO_LINES]);

  // ── 게임 시작
  const handleStartGame = useCallback(() => {
    setShowCanvas(true);
    setScreen('playing');
    prevPhaseRef.current = 'prep';
    prevWaveRef.current = 0;
    bossIntroShownRef.current = false;

    const heroName = user?.username ?? '용사';
    const engine = new GameEngine(
      () => {
        if (engineRef.current) {
          setGameState({ ...engineRef.current.state });
        }
      },
      {
        maxWave: 5,
        difficulty: 'normal',
        customHeroes: [{
          name: heroName,
          role: 'melee_dps',
          specName: '용사', className: '용사',
          raceName: '인간', elementName: '빛',
          maxHp: 800, hp: 800,
          atk: 60, def: 30, speed: 3,
          attackRange: 90, aggroRadius: 0,
          threatMult: 1.5,
          isAlive: true,
          attackCooldown: 1.0, attackTimer: 0,
          color: '#e11d48',
          size: HERO_SIZE + 4,
        }],
        waveGenerator: (waveNumber) => {
          const wave = generateTutorialWave(waveNumber);
          return { ...wave, monsters: wave.monsters.map(m => ({ ...m, displayName: m.displayNameKey ? t(m.displayNameKey) : m.displayName })) };
        },
        initialPositions: [{ x: 420, y: FIELD_Y_CENTER }],
      },
    );
    engineRef.current = engine;
    engine.start();
    setLocked(true);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const dismissBossIntro = useCallback(() => {
    setScreen('playing');
    engineRef.current?.togglePause();
  }, []);

  const handleSpeed = useCallback((speed: number) => {
    engineRef.current?.setSpeed(speed);
  }, []);

  const handleSkip = useCallback(async () => {
    try {
      const { data } = await api.get('/user/tutorial-progress');
      if (data === 'none') {
        await api.post('/user/tutorial-progress', { progress: 'skipped' });
      }
    } catch {
      // ignore
    }
    setLocked(false);
    navigate('/');
  }, [navigate, setLocked]);

  const saveStage1ProgressIfNeeded = async () => {
    try {
      const { data } = await api.get('/user/tutorial-progress');
      if (data !== 'complete') {
        await api.post('/user/tutorial-progress', { progress: 'stage1' });
      }
    } catch {
      // ignore
    }
  };

  const handleNext = useCallback(async () => {
    await saveStage1ProgressIfNeeded();
    setLocked(false);
    navigate('/tutorial/basic2');
  }, [navigate, setLocked, saveStage1ProgressIfNeeded]);

  const handleComplete = useCallback(async () => {
    await saveStage1ProgressIfNeeded();
    setLocked(false);
    navigate('/');
  }, [navigate, setLocked, saveStage1ProgressIfNeeded]);

  const currentWaveDisplay = gameState ? Math.min(gameState.currentWave, 5) : 0;
  const heroHp = gameState?.heroes[0]?.hp ?? 0;
  const heroMaxHp = gameState?.heroes[0]?.maxHp ?? 800;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center">

      {/* ── 오프닝 인트로 ── */}
      {screen === 'intro' && (
        <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center px-8">
          <div className="mb-12 text-center">
            <p className="text-yellow-600 text-sm tracking-[0.4em] mb-3 uppercase">Tutorial</p>
            <h1 className="text-5xl font-bold text-yellow-400 mb-1">Stage 1</h1>
            <p className="text-xl text-gray-300 tracking-widest">{t('tutorial.s1.title')}</p>
          </div>

          <div className="max-w-xl text-center space-y-3 mb-16 min-h-[200px]">
            {INTRO_LINES.slice(0, introLineIdx).map((line, i) => (
              <p key={i} className={line === '' ? 'h-3' : 'text-gray-300 text-lg'}>{line}</p>
            ))}
          </div>

          {introLineIdx >= INTRO_LINES.length && (
            <button
              onClick={handleStartGame}
              className="px-10 py-4 bg-red-700 hover:bg-red-600 text-white text-xl font-bold
                         rounded-lg border border-red-500 transition-all duration-300"
            >
              {t('tutorial.common.start')}
            </button>
          )}

          <button
            onClick={handleSkip}
            className="mt-6 text-gray-600 hover:text-gray-400 text-sm transition-colors"
          >
            {t('tutorial.common.skip')}
          </button>
        </div>
      )}

      {/* ── 게임 캔버스 영역 ── */}
      <div className="relative w-full max-w-5xl mt-4">
        {showCanvas && (
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">{t('tutorial.s1.label')}</span>
              <span className="text-yellow-400 font-bold">Wave {currentWaveDisplay} / 5</span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(s => (
                <button
                  key={s}
                  onClick={() => handleSpeed(s)}
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-colors ${gameState?.gameSpeed === s
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                >
                  {s}x
                </button>
              ))}
              <span className="text-red-400 text-sm">{user?.username ?? '용사'}</span>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(0, (heroHp / heroMaxHp) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">{Math.max(0, heroHp)}/{heroMaxHp}</span>
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className={showCanvas ? 'block w-full' : 'hidden'}
          style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}` }}
        />

        {screen === 'playing' && gameState?.phase === 'wave' && (() => {
          const remaining = Math.ceil(60 - (gameState.waveElapsedTime ?? 0));
          if (remaining > 30) return null;
          const isUrgent = remaining <= 10;
          return (
            <div className={`absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg font-bold text-sm shadow-lg pointer-events-none z-30
              ${isUrgent ? 'bg-red-900/90 text-red-300 border border-red-500 animate-pulse' : 'bg-yellow-900/80 text-yellow-300 border border-yellow-700'}`}>
              ⏱ {remaining}{t('tutorial.common.timerSuffix')}
            </div>
          );
        })()}

        {waveNarration && screen === 'playing' && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-5 px-8 text-center pointer-events-none">
            {waveNarration.map((line, i) => (
              <p key={i} className={`text-gray-200 text-base ${line === '' ? 'h-2' : ''}`}>{line}</p>
            ))}
          </div>
        )}

        {screen === 'boss_intro' && showCanvas && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center z-40">
            <div className="max-w-md text-center space-y-4 px-6">
              {BOSS_INTRO_LINES.slice(0, bossLine).map((line, i) => (
                <p
                  key={i}
                  className={
                    line === '' ? 'h-3'
                      : line.startsWith('━━') ? 'text-2xl font-bold text-red-400 tracking-widest my-4'
                        : 'text-gray-200 text-lg'
                  }
                >
                  {line}
                </p>
              ))}
            </div>
            {bossLine >= BOSS_INTRO_LINES.length && (
              <button
                onClick={dismissBossIntro}
                className="mt-10 px-8 py-3 bg-red-900/80 hover:bg-red-800 border border-red-600
                           text-red-200 font-bold rounded-lg transition-colors"
              >
                {t('tutorial.common.fight')}
              </button>
            )}
          </div>
        )}

        {screen === 'dying' && showCanvas && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black/85">
            <div className="max-w-md text-center space-y-5 px-6">
              {DEATH_LINES.slice(0, deathLine).map((line, i) => (
                <p key={i} className={`text-gray-300 text-lg italic ${line === '' ? 'h-2' : ''}`}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 데미지 미터기 ── */}
      {showCanvas && gameState && gameState.meter.length > 0 && (
        <div className="w-full max-w-5xl mt-2 bg-gray-900 border border-gray-700 rounded-lg p-3">
          <div className="flex gap-1 mb-2">
            {(['damage', 'healing', 'taken'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setMeterTab(tab)}
                className={`text-xs px-2 py-1 rounded font-semibold transition-colors ${meterTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
              >
                {t(`tutorial.common.${tab}`)}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-500 self-center">{t('tutorial.common.meterTitle')}</span>
          </div>
          {(() => {
            const sorted = [...gameState.meter].sort((a, b) => {
              if (meterTab === 'damage') return (b.damage + b.summons.reduce((s, x) => s + x.damage, 0)) - (a.damage + a.summons.reduce((s, x) => s + x.damage, 0));
              if (meterTab === 'healing') return (b.healing + b.shieldAbsorbed) - (a.healing + a.shieldAbsorbed);
              return b.damageTaken - a.damageTaken;
            });
            const maxVal = sorted.reduce((max, e) => {
              if (meterTab === 'damage') return Math.max(max, e.damage + e.summons.reduce((s, x) => s + x.damage, 0));
              if (meterTab === 'healing') return Math.max(max, e.healing + e.shieldAbsorbed);
              return Math.max(max, e.damageTaken);
            }, 1);
            return (
              <div className="space-y-1.5">
                {sorted.map((entry: HeroMeterEntry) => {
                  const heroTotal = meterTab === 'damage' ? entry.damage : meterTab === 'healing' ? entry.healing : entry.damageTaken;
                  const summonTotal = meterTab === 'damage' ? entry.summons.reduce((s, x) => s + x.damage, 0) : 0;
                  const shieldTotal = meterTab === 'healing' ? (entry.shieldAbsorbed ?? 0) : 0;
                  const total = heroTotal + summonTotal + shieldTotal;
                  if (total === 0) return null;
                  const barWidth = (total / maxVal) * 100;
                  const heroBarPct = total > 0 ? (heroTotal / total) * 100 : 0;
                  return (
                    <div key={entry.heroId} className="text-xs">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-medium" style={{ color: entry.color }}>{entry.heroName}</span>
                        <div className="flex items-center gap-1 text-gray-300">
                          {meterTab === 'damage' && entry.summons.filter(s => s.damage > 0).map(s => (
                            <span key={s.skillId} style={{ color: s.color }}>{getSummonDisplayName(t, s.skillId, s.displayName)}: {s.damage.toLocaleString()}</span>
                          ))}
                          {meterTab === 'healing' && shieldTotal > 0 && (
                            <span style={{ color: '#FBBF24' }}>{t('tutorial.common.shield')}: {shieldTotal.toLocaleString()}</span>
                          )}
                          <span className="font-bold text-white">{total.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="h-2 rounded overflow-hidden bg-gray-700" style={{ width: `${barWidth}%`, minWidth: '4px' }}>
                        {meterTab === 'damage' && summonTotal > 0 ? (
                          <div className="flex h-full">
                            <div style={{ width: `${heroBarPct}%`, backgroundColor: entry.color }} />
                            {entry.summons.filter(s => s.damage > 0).map(s => (
                              <div key={s.skillId} style={{ width: `${(s.damage / total) * 100}%`, backgroundColor: s.color }} />
                            ))}
                          </div>
                        ) : meterTab === 'healing' && shieldTotal > 0 ? (
                          <div className="flex h-full">
                            <div style={{ width: `${heroBarPct}%`, backgroundColor: '#22C55E' }} />
                            <div style={{ width: `${(shieldTotal / total) * 100}%`, backgroundColor: '#FBBF24' }} />
                          </div>
                        ) : (
                          <div className="h-full" style={{
                            backgroundColor: meterTab === 'healing' ? '#22C55E' : meterTab === 'taken' ? '#EF4444' : entry.color,
                          }} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* ── 스테이지 완료 화면 ── */}
      {screen === 'stage_end' && (
        <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center px-8">
          <div className="max-w-lg text-center">
            <div className="mb-10">
              <p className="text-yellow-600 text-xs tracking-[0.4em] mb-2 uppercase">{t('tutorial.s1.complete')}</p>
              <h2 className="text-4xl font-bold text-white mb-3">{t('tutorial.s1.title')}</h2>
              <p className="text-gray-400 text-sm">{t('tutorial.s1.defeatSub')}</p>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8 text-left space-y-3">
              <p className="text-gray-300">
                <span className="text-red-400 font-bold">{t('tutorial.s1.defeatBy')}</span>{t('tutorial.s1.defeatText1')}
              </p>
              <p className="text-gray-300">{t('tutorial.s1.defeatText2')}</p>
              <p className="text-gray-300">
                {t('tutorial.s1.defeatText3a')}{' '}
                <span className="text-yellow-400 font-bold">{t('tutorial.s1.defeatText3b')}</span>{' '}
                {t('tutorial.s1.defeatText3c')}
              </p>
            </div>

            {savedGold > 0 && (
              <div className="bg-yellow-950/60 border border-yellow-700 rounded-lg p-3 mb-4 text-center">
                <span className="text-yellow-400 font-bold text-lg">💰 +{savedGold.toLocaleString()}G</span>
                <p className="text-yellow-700 text-xs mt-1">{t('tutorial.s1.goldBonus')}</p>
              </div>
            )}

            <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4 mb-8 text-sm text-gray-400">
              <p className="text-yellow-500 font-semibold mb-2">{t('tutorial.s1.nextHint')}</p>
              <ul className="space-y-1 text-left">
                <li>• {t('tutorial.s1.next1')}</li>
                <li>• {t('tutorial.s1.next2')}</li>
                <li>• {t('tutorial.s1.next3')}</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleNext}
                className="w-full py-4 text-white font-bold text-lg rounded-lg border transition-colors hover:opacity-90"
                style={{ background: '#5b21b6', borderColor: '#7c3aed' }}
              >
                {t('tutorial.s1.btnNext')}
              </button>
              <button
                onClick={handleComplete}
                className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 font-semibold rounded-lg transition-colors"
              >
                {t('tutorial.common.backDash')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
