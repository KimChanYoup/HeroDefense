import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GameEngine } from '../game/GameEngine';
import { HERO_DEFINITIONS } from '../game/heroData';
import { Renderer } from '../game/Renderer';
import { generateTutorialStage2Wave } from '../game/TutorialWaveData';
import { useAuth } from '../contexts/AuthContext';
import { useGameLock } from '../contexts/GameLockContext';
import api from '../api/client';
import type { GameState, HeroMeterEntry } from '../game/types';
import {
  CANVAS_WIDTH, CANVAS_HEIGHT, HERO_SIZE,
  FIELD_Y_CENTER,
} from '../game/constants';

type TutorialScreen2 =
  | 'intro'
  | 'playing'
  | 'boss5_intro'
  | 'boss10_intro'
  | 'victory'
  | 'stage_end';

type BossIntroKey = 'boss5' | 'boss10';

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

export default function TutorialPage2() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setLocked } = useGameLock();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const prevPhaseRef = useRef<string>('prep');
  const prevWaveRef = useRef<number>(0);
  const bossIntroShownRef = useRef<Set<BossIntroKey>>(new Set());
  const goldSavedRef = useRef(false);
  const tRef = useRef(t);
  useEffect(() => { tRef.current = t; }, [t]);

  const [screen, setScreen] = useState<TutorialScreen2>('intro');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [introLineIdx, setIntroLineIdx] = useState(0);
  const [waveNarration, setWaveNarration] = useState<number | null>(null);
  const [bossLines, setBossLines] = useState<string[]>([]);
  const [bossLineIdx, setBossLineIdx] = useState(0);
  const [victoryLine, setVictoryLine] = useState(0);
  const [showCanvas, setShowCanvas] = useState(false);
  const [savedGold, setSavedGold] = useState(0);
  const [meterTab, setMeterTab] = useState<'damage' | 'healing' | 'taken'>('damage');

  const INTRO_LINES = useMemo(() => t('tutorial.s2.intro', { returnObjects: true }) as string[], [t]);
  const BOSS5_INTRO_LINES = useMemo(() => t('tutorial.s2.boss5Intro', { returnObjects: true }) as string[], [t]);
  const BOSS10_INTRO_LINES = useMemo(() => t('tutorial.s2.boss10Intro', { returnObjects: true }) as string[], [t]);
  const VICTORY_LINES = useMemo(() => t('tutorial.s2.victory', { returnObjects: true }) as string[], [t]);
  const WAVE_CLEAR_LINES = useMemo((): Record<number, string[]> => ({
    1: t('tutorial.s2.wave1', { returnObjects: true }) as string[],
    2: t('tutorial.s2.wave2', { returnObjects: true }) as string[],
    3: t('tutorial.s2.wave3', { returnObjects: true }) as string[],
    4: t('tutorial.s2.wave4', { returnObjects: true }) as string[],
    5: t('tutorial.s2.wave5', { returnObjects: true }) as string[],
    6: t('tutorial.s2.wave6', { returnObjects: true }) as string[],
    7: t('tutorial.s2.wave7', { returnObjects: true }) as string[],
    8: t('tutorial.s2.wave8', { returnObjects: true }) as string[],
    9: t('tutorial.s2.wave9', { returnObjects: true }) as string[],
  }), [t]);

  const feldahName = t('tutorial.s2.feldahName');

  // ── 튜토리얼 진입 가드
  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    const checkProgress = async () => {
      try {
        const res = await api.get('/user/tutorial-progress');
        const progress = typeof res.data === 'string' ? res.data : res.data?.tutorialProgress;
        if (!cancelled && progress !== 'stage1' && progress !== 'complete') {
          alert(t('tutorial.s2.winText2'));
          navigate('/');
        }
      } catch {
        if (!cancelled) {
          navigate('/');
        }
      }
    };
    checkProgress();
    return () => { cancelled = true; };
  }, [user?.id, navigate, t]);

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

  useEffect(() => {
    let rafId: number;
    const loop = () => {
      if (rendererRef.current && engineRef.current) {
        rendererRef.current.render(engineRef.current.state, engineRef.current.damageNumbers, engineRef.current.explosions);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (screen !== 'intro' || introLineIdx >= INTRO_LINES.length) return;
    const delay = INTRO_LINES[introLineIdx] === '' ? 200 : INTRO_LINES[introLineIdx].startsWith('━━') ? 800 : 600;
    const timer = setTimeout(() => setIntroLineIdx(i => i + 1), delay);
    return () => clearTimeout(timer);
  }, [screen, introLineIdx, INTRO_LINES]);

  useEffect(() => {
    if (!waveNarration) return;
    const timer = setTimeout(() => setWaveNarration(null), 3800);
    return () => clearTimeout(timer);
  }, [waveNarration]);

  useEffect(() => {
    if (!gameState || screen !== 'playing') return;
    const { phase, currentWave } = gameState;

    if (phase === 'victory') {
      engineRef.current?.stop();
      setScreen('victory');
      setVictoryLine(0);
      prevPhaseRef.current = phase;
      return;
    }

    if (phase === 'prep' && currentWave === 4 && prevPhaseRef.current === 'wave_clear' && !bossIntroShownRef.current.has('boss5')) {
      bossIntroShownRef.current.add('boss5');
      engineRef.current?.togglePause();
      setBossLines(BOSS5_INTRO_LINES);
      setBossLineIdx(0);
      setScreen('boss5_intro');
      prevPhaseRef.current = phase;
      return;
    }

    if (phase === 'prep' && currentWave === 9 && prevPhaseRef.current === 'wave_clear' && !bossIntroShownRef.current.has('boss10')) {
      bossIntroShownRef.current.add('boss10');
      engineRef.current?.togglePause();
      setBossLines(BOSS10_INTRO_LINES);
      setBossLineIdx(0);
      setScreen('boss10_intro');
      prevPhaseRef.current = phase;
      return;
    }

    if (phase === 'wave_clear' && currentWave !== prevWaveRef.current) {
      prevWaveRef.current = currentWave;
      if (WAVE_CLEAR_LINES[currentWave]) setWaveNarration(currentWave);
    }

    prevPhaseRef.current = phase;
  }, [gameState, screen, BOSS5_INTRO_LINES, BOSS10_INTRO_LINES, WAVE_CLEAR_LINES]);

  const isBossIntroScreen = screen === 'boss5_intro' || screen === 'boss10_intro';
  useEffect(() => {
    if (!isBossIntroScreen || bossLineIdx >= bossLines.length) return;
    const delay = bossLines[bossLineIdx] === '' ? 200 : bossLines[bossLineIdx].startsWith('━━') ? 1000 : 800;
    const timer = setTimeout(() => setBossLineIdx(l => l + 1), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBossIntroScreen, bossLineIdx, bossLines]);

  // 언어 변경 시 진행 중인 보스 인트로 대사 실시간 갱신
  useEffect(() => {
    if (screen === 'boss5_intro') setBossLines(BOSS5_INTRO_LINES);
    else if (screen === 'boss10_intro') setBossLines(BOSS10_INTRO_LINES);
  }, [BOSS5_INTRO_LINES, BOSS10_INTRO_LINES, screen]);

  useEffect(() => {
    if (screen !== 'victory' || victoryLine >= VICTORY_LINES.length) return;
    const delay = VICTORY_LINES[victoryLine] === '' ? 200 : 800;
    const timer = setTimeout(() => setVictoryLine(l => l + 1), delay);
    return () => clearTimeout(timer);
  }, [screen, victoryLine, VICTORY_LINES]);

  useEffect(() => {
    if (screen !== 'victory' || victoryLine < VICTORY_LINES.length) return;
    const timer = setTimeout(() => setScreen('stage_end'), 2500);
    return () => clearTimeout(timer);
  }, [screen, victoryLine, VICTORY_LINES]);

  useEffect(() => {
    if (screen !== 'stage_end' || goldSavedRef.current || !user?.id) return;
    goldSavedRef.current = true;
    const earned = (gameState?.goldEarned ?? 0) + 500;
    setSavedGold(earned);
    api.post('/user/gold', { delta: earned }).catch(() => { });
    api.post('/achievements/check', {
      cleared: true,
      mode: 'solo',
      tutorial: true,
    }).catch(() => { });
  }, [screen]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStartGame = useCallback(() => {
    setShowCanvas(true);
    setScreen('playing');
    prevPhaseRef.current = 'prep';
    prevWaveRef.current = 0;
    bossIntroShownRef.current = new Set();

    const heroName = user?.username ?? '용사';
    const engine = new GameEngine(
      () => { if (engineRef.current) setGameState({ ...engineRef.current.state }); },
      {
        maxWave: 10,
        difficulty: 'normal',
        customHeroes: [
          {
            name: heroName,
            role: 'tank',
            specName: '용사', className: '용사',
            raceName: '인간', elementName: '빛',
            maxHp: 2000, hp: 2000,
            atk: 60, def: 35, speed: 3,
            attackRange: 70, aggroRadius: 140,
            threatMult: 2.5,
            isAlive: true,
            attackCooldown: 1.2, attackTimer: 0,
            color: '#e11d48',
            size: HERO_SIZE + 6,
            isInvincible: true,
          },
          {
            name: t('tutorial.s2.feldahName'),
            role: 'ranged_dps',
            secondaryRole: 'healer',
            healTimer: 0,
            healCooldown: 3.5,
            specName: '흑마법사', className: '워록',
            raceName: '인간', elementName: '암흑',
            maxHp: 1500, hp: 1500,
            atk: 280, def: 30, speed: 2.5,
            attackRange: 900, aggroRadius: 0,
            threatMult: 1.0,
            isAlive: true,
            attackCooldown: 1.8, attackTimer: 0,
            color: '#8b00ff',
            size: HERO_SIZE + 2,
            gifSprite: '/graphic2/펠다/펠다right.gif',
            summonConfigs: [{
              skillId: 'feldah_felguard',
              displayName: t('tutorial.s2.felgardName'),
              hp: 1200, atk: 180, def: 50, spd: 2.5,
              role: 'tank', attackRange: 80, duration: 0, color: '#4c1d95',
            }],
          },
        ],
        waveGenerator: (waveNumber) => {
          const wave = generateTutorialStage2Wave(waveNumber);
          return { ...wave, monsters: wave.monsters.map(m => ({ ...m, displayName: m.displayNameKey ? tRef.current(m.displayNameKey) : m.displayName })) };
        },
        initialPositions: [
          { x: 200, y: FIELD_Y_CENTER },
          { x: 370, y: FIELD_Y_CENTER + 30 },
        ],
      },
    );
    engineRef.current = engine;
    engine.start();
    setLocked(true);
  }, [user, t]); // eslint-disable-line react-hooks/exhaustive-deps

  const dismissBossIntro = useCallback(() => {
    setScreen('playing');
    engineRef.current?.togglePause();
  }, []);

  const handleSpeed = useCallback((speed: number) => {
    engineRef.current?.setSpeed(speed);
  }, []);

  const goToDashboard = useCallback(() => {
    api.post('/user/tutorial-progress', { progress: 'complete' }).catch(() => { });
    setLocked(false);
    navigate('/');
  }, [navigate, setLocked]);

  const goToHeroes = useCallback(() => {
    api.post('/user/tutorial-progress', { progress: 'complete' }).catch(() => { });
    setLocked(false);
    navigate('/heroes');
  }, [navigate, setLocked]);

  const handleSkip = useCallback(() => { setLocked(false); navigate('/'); }, [navigate, setLocked]);

  const currentWaveDisplay = gameState ? Math.min(gameState.currentWave, 10) : 0;
  const heroHp = gameState?.heroes[0]?.hp ?? 0;
  const heroMaxHp = gameState?.heroes[0]?.maxHp ?? 2000;
  const feldahHp = gameState?.heroes[1]?.hp ?? 0;
  const feldahMaxHp = gameState?.heroes[1]?.maxHp ?? 1500;
  const felguard = gameState?.summons?.find(s => s.skillId === 'feldah_felguard' && s.isAlive);
  const felguardHp = felguard?.hp ?? 0;
  const felguardMax = felguard?.maxHp ?? 1200;

  const bossIntroBg = screen === 'boss5_intro' ? 'bg-purple-950/90' : 'bg-blue-950/90';
  const bossIntroAccent = screen === 'boss5_intro' ? '#1a0530' : '#1E3A5F';

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center">

      {screen === 'intro' && (
        <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center px-8">
          <div className="mb-10 text-center">
            <p className="text-purple-400 text-sm tracking-[0.4em] mb-3 uppercase">Tutorial</p>
            <h1 className="text-5xl font-bold text-purple-300 mb-1">Stage 2</h1>
            <p className="text-xl text-gray-300 tracking-widest">{t('tutorial.s2.title')}</p>
          </div>

          <div className="max-w-xl text-center space-y-3 mb-16 min-h-[260px]">
            {INTRO_LINES.slice(0, introLineIdx).map((line, i) => (
              <p
                key={i}
                className={
                  line === '' ? 'h-3' :
                    line.startsWith('━━') ? 'text-2xl font-bold text-purple-300 tracking-widest my-4' :
                      line.startsWith('Feldah:') ? 'text-purple-200 text-base italic' :
                        'text-gray-300 text-lg'
                }
              >
                {line}
              </p>
            ))}
          </div>

          {introLineIdx >= INTRO_LINES.length && (
            <button
              onClick={handleStartGame}
              className="px-10 py-4 text-white text-xl font-bold rounded-lg border transition-all duration-300"
              style={{ background: '#5b21b6', borderColor: '#7c3aed' }}
            >
              {t('tutorial.common.start')}
            </button>
          )}

          <button onClick={handleSkip} className="mt-6 text-gray-600 hover:text-gray-400 text-sm transition-colors">
            {t('tutorial.common.skip')}
          </button>
        </div>
      )}

      <div className="relative w-full max-w-5xl mt-4">
        {showCanvas && (
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">{t('tutorial.s2.label')}</span>
              <span className="text-purple-400 font-bold">Wave {currentWaveDisplay} / 10</span>
              {currentWaveDisplay >= 5 && (
                <span className="text-xs text-purple-400 bg-purple-900/30 px-1.5 py-0.5 rounded">{t('tutorial.s2.boss5Cleared')}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(s => (
                <button key={s} onClick={() => handleSpeed(s)}
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-colors ${gameState?.gameSpeed === s ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
                  {s}x
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">💛</span>
                <span className="text-red-400 text-xs">{user?.username ?? '용사'}</span>
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden" style={{ boxShadow: '0 0 4px rgba(255,215,0,0.5)' }}>
                  <div className="h-full bg-red-500 rounded-full transition-all duration-300" style={{ width: `${Math.max(0, (heroHp / heroMaxHp) * 100)}%` }} />
                </div>
                <span className="text-xs text-gray-500">{Math.max(0, heroHp)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-purple-400 text-xs">{feldahName}</span>
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${Math.max(0, (feldahHp / feldahMaxHp) * 100)}%`, background: '#8b00ff' }} />
                </div>
                <span className="text-xs text-gray-500">{Math.max(0, feldahHp)}</span>
              </div>
              {(felguard || gameState?.summons) && (
                <div className="flex items-center gap-1">
                  <span className="text-xs" style={{ color: '#7c3aed' }}>{t('tutorial.s2.felgardName')}</span>
                  <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-300" style={{ width: `${felguard ? Math.max(0, (felguardHp / felguardMax) * 100) : 0}%`, background: '#4c1d95' }} />
                  </div>
                  <span className="text-xs text-gray-600">{felguard ? Math.max(0, felguardHp) : t('tutorial.s2.summoning')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className={showCanvas ? 'block w-full' : 'hidden'} style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}` }} />

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

        {waveNarration !== null && WAVE_CLEAR_LINES[waveNarration] && screen === 'playing' && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-5 px-8 text-center pointer-events-none">
            {WAVE_CLEAR_LINES[waveNarration].map((line, i) => (
              <p key={i} className={`text-gray-200 text-base ${line === '' ? 'h-2' : ''} ${line.startsWith('Feldah:') ? 'text-purple-300 italic' : ''}`}>
                {line}
              </p>
            ))}
          </div>
        )}

        {isBossIntroScreen && showCanvas && (
          <div className={`absolute inset-0 ${bossIntroBg} flex flex-col items-center justify-center z-40`}
            style={{ background: bossIntroAccent + 'dd' }}>
            <div className="max-w-md text-center space-y-4 px-6">
              {bossLines.slice(0, bossLineIdx).map((line, i) => (
                <p
                  key={i}
                  className={
                    line === '' ? 'h-3' :
                      line.startsWith('━━') ? 'text-2xl font-bold tracking-widest my-4 text-red-300' :
                        line.startsWith('Feldah:') ? 'text-purple-300 text-base italic font-semibold' :
                          '"' === line[0] ? 'text-gray-300 text-base italic' :
                            'text-gray-200 text-lg'
                  }
                >
                  {line}
                </p>
              ))}
            </div>
            {bossLineIdx >= bossLines.length && (
              <button
                onClick={dismissBossIntro}
                className="mt-10 px-8 py-3 border font-bold rounded-lg transition-colors"
                style={{ background: bossIntroAccent + 'cc', borderColor: '#9ca3af', color: '#e5e7eb' }}
              >
                {t('tutorial.common.fight')}
              </button>
            )}
          </div>
        )}

        {screen === 'victory' && showCanvas && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50" style={{ background: 'rgba(10,0,30,0.88)' }}>
            <div className="max-w-md text-center space-y-5 px-6">
              {VICTORY_LINES.slice(0, victoryLine).map((line, i) => (
                <p
                  key={i}
                  className={
                    line === '' ? 'h-3' :
                      line.startsWith('Feldah:') ? 'text-purple-300 text-lg italic font-semibold' :
                        'text-gray-200 text-xl'
                  }
                >
                  {line}
                </p>
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
              <button key={tab} onClick={() => setMeterTab(tab)}
                className={`text-xs px-2 py-1 rounded font-semibold transition-colors ${meterTab === tab ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
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
                        <span className="font-medium" style={{ color: entry.color }}>{entry.heroId === 2 ? feldahName : entry.heroName}</span>
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
                          <div className="h-full" style={{ backgroundColor: meterTab === 'healing' ? '#22C55E' : meterTab === 'taken' ? '#EF4444' : entry.color }} />
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
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-8"
          style={{ background: 'linear-gradient(160deg, #0a001e, #1a0530)' }}>
          <div className="max-w-lg text-center">
            <div className="mb-10">
              <p className="text-purple-400 text-xs tracking-[0.4em] mb-2 uppercase">{t('tutorial.s2.complete')}</p>
              <h2 className="text-5xl font-bold mb-3" style={{ color: '#a855f7' }}>{t('tutorial.s2.winTitle')}</h2>
              <p className="text-gray-300 text-lg font-semibold">{t('tutorial.s2.winTitle2')}</p>
              <p className="text-gray-500 text-sm mt-1">{t('tutorial.s2.winSub')}</p>
            </div>

            <div className="border border-purple-800/50 rounded-xl p-6 mb-6 text-left space-y-3"
              style={{ background: 'rgba(91,33,182,0.12)' }}>
              <p className="text-gray-200">
                <span className="text-blue-400 font-bold">{t('tutorial.s2.winText1a')}</span>{' '}
                <span className="text-purple-300 font-bold">{t('tutorial.s2.winText1b')}</span>{t('tutorial.s2.winText1c')}
              </p>
              <p className="text-gray-300">{t('tutorial.s2.winText2')}</p>
              <p className="text-gray-300">
                {t('tutorial.s2.winText3a')}{' '}
                <span className="text-yellow-400 font-bold">{t('tutorial.s2.winText3b')}</span>
              </p>
            </div>

            <div className="border border-gray-700 rounded-xl p-4 mb-8 text-sm text-gray-400 text-left space-y-2">
              <p className="text-gray-300 font-semibold mb-1">{t('tutorial.s2.partyTitle')}</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">💛</span>
                <span className="text-red-400 font-semibold">{user?.username ?? '용사'}</span>
                <span className="text-gray-600">— {t('tutorial.s2.heroPrev')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: '#8b00ff' }}></span>
                <span className="font-semibold" style={{ color: '#a855f7' }}>{feldahName}</span>
                <span className="text-gray-600">— {t('tutorial.s2.feldahPrev')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: '#4c1d95' }}></span>
                <span className="font-semibold" style={{ color: '#7c3aed' }}>{t('tutorial.s2.felgardName')}</span>
                <span className="text-gray-600">— {t('tutorial.s2.felgardPrev')}</span>
              </div>
            </div>

            {savedGold > 0 && (
              <div className="bg-yellow-950/60 border border-yellow-700 rounded-lg p-3 mb-6 text-center">
                <span className="text-yellow-400 font-bold text-lg">💰 +{savedGold.toLocaleString()}G</span>
                <p className="text-yellow-700 text-xs mt-1">{t('tutorial.s2.goldBonus')}</p>
              </div>
            )}

            <div className="space-y-3">
              <button onClick={goToHeroes}
                className="w-full py-4 text-white text-lg font-bold rounded-lg border transition-colors hover:opacity-90"
                style={{ background: '#5b21b6', borderColor: '#7c3aed' }}>
                {t('tutorial.s2.btnPlay')}
              </button>
              <button onClick={goToDashboard}
                className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm">
                {t('tutorial.common.backDash')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
