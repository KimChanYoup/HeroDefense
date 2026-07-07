import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GameEngine } from '../game/GameEngine';
import { Renderer } from '../game/Renderer';
import { generateMeleeTutorialWave } from '../game/TutorialWaveData';
import type { GameState } from '../game/types';
import {
  CANVAS_WIDTH, CANVAS_HEIGHT, HERO_SIZE,
  FIELD_Y_CENTER,
} from '../game/constants';

type MeleeTutorialScreen = 'intro' | 'playing' | 'victory' | 'stage_end';

export default function MeleeTutorialPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const prevWaveRef = useRef<number>(0);
  const narrationKeyRef = useRef<string | null>(null);

  const [screen, setScreen] = useState<MeleeTutorialScreen>('intro');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [narration, setNarration] = useState<string[] | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [speed, setSpeed] = useState(1);

  const handleSpeed = (s: number) => { setSpeed(s); engineRef.current?.setSpeed(s); };

  const DIALOGUE_SEQUENCES = useMemo(() => ({
    intro: t('tutorial.melee.intro', { returnObjects: true }) as string[],
    wave1_clear: t('tutorial.melee.wave1', { returnObjects: true }) as string[],
    wave2_clear: t('tutorial.melee.wave2', { returnObjects: true }) as string[],
    wave3_clear: t('tutorial.melee.wave3', { returnObjects: true }) as string[],
    wave4_clear: t('tutorial.melee.wave4', { returnObjects: true }) as string[],
    victory: t('tutorial.melee.victory', { returnObjects: true }) as string[],
  }), [t]);

  const MASTERY = useMemo(() => t('tutorial.melee.mastery', { returnObjects: true }) as Array<{ title: string; desc: string }>, [t]);
  const jedahName = t('tutorial.melee.jedahName');
  const cairneName = t('tutorial.melee.cairneName');

  useEffect(() => {
    if (!canvasRef.current) return;
    rendererRef.current = new Renderer(canvasRef.current);
    return () => { engineRef.current?.stop(); };
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
    if (engineRef.current) {
      const heroes = engineRef.current.state.heroes;
      if (heroes[0]) heroes[0].name = t('tutorial.melee.myName');
      if (heroes[1]) heroes[1].name = t('tutorial.melee.jedahLabel');
    }
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
    if (screen !== 'intro' || dialogueIdx >= DIALOGUE_SEQUENCES.intro.length - 1) return;
    const timer = setTimeout(() => setDialogueIdx(i => i + 1), 1500);
    return () => clearTimeout(timer);
  }, [screen, dialogueIdx, DIALOGUE_SEQUENCES]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && screen === 'intro' && dialogueIdx < DIALOGUE_SEQUENCES.intro.length - 1) {
        setDialogueIdx(prev => prev + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, dialogueIdx, DIALOGUE_SEQUENCES]);

  useEffect(() => {
    if (!gameState || screen !== 'playing') return;
    const { phase, currentWave } = gameState;

    if (phase === 'victory') {
      engineRef.current?.stop();
      setScreen('victory');
      setDialogueIdx(0);
      return;
    }

    if (phase === 'wave_clear' && currentWave !== prevWaveRef.current) {
      prevWaveRef.current = currentWave;
      const key = `wave${currentWave}_clear` as keyof typeof DIALOGUE_SEQUENCES;
      if (DIALOGUE_SEQUENCES[key]) {
        narrationKeyRef.current = key;
        setNarration(DIALOGUE_SEQUENCES[key] as string[]);
        setTimeout(() => { setNarration(null); narrationKeyRef.current = null; }, 5000);
      }
    }
  }, [gameState, screen, DIALOGUE_SEQUENCES]);

  useEffect(() => {
    if (narrationKeyRef.current) {
      const lines = DIALOGUE_SEQUENCES[narrationKeyRef.current as keyof typeof DIALOGUE_SEQUENCES];
      if (lines) setNarration(lines as string[]);
    }
  }, [DIALOGUE_SEQUENCES]);

  useEffect(() => {
    if (screen !== 'victory') return;
    if (dialogueIdx < DIALOGUE_SEQUENCES.victory.length - 1) {
      const timer = setTimeout(() => setDialogueIdx(i => i + 1), 1800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setScreen('stage_end'), 3000);
      return () => clearTimeout(timer);
    }
  }, [screen, dialogueIdx, DIALOGUE_SEQUENCES]);

  const handleStartGame = useCallback(() => {
    setShowCanvas(true);
    setScreen('playing');

    const engine = new GameEngine(
      () => { if (engineRef.current) setGameState({ ...engineRef.current.state }); },
      {
        maxWave: 5,
        difficulty: 'normal',
        customHeroes: [
          {
            name: t('tutorial.melee.myName'),
            role: 'melee_dps',
            specName: '야성', className: '드루이드',
            raceName: '타우렌', elementName: '자연',
            maxHp: 1500, hp: 1500,
            atk: 250, def: 30, speed: 5.5,
            attackRange: 50, aggroRadius: 0,
            threatMult: 1.0, battleRhythmCount: 0,
            isAlive: true,
            attackCooldown: 0.6, attackTimer: 0,
            color: '#ef4444',
            size: HERO_SIZE,
            sprite: '케른 다이노후프.png',
          },
          {
            name: t('tutorial.melee.jedahLabel'),
            role: 'tank',
            specName: '방어', className: '전사',
            raceName: '언데드', elementName: '화염',
            maxHp: 5000, hp: 5000,
            atk: 30, def: 80, speed: 2.5,
            attackRange: 60, aggroRadius: 200,
            threatMult: 10.0,
            isAlive: true,
            attackCooldown: 1.5, attackTimer: 0,
            color: '#3b82f6',
            size: HERO_SIZE + 4,
            gifSprite: '/graphic2/제다/제다idle.gif',
          },
        ],
        waveGenerator: (waveNumber) => {
          const wave = generateMeleeTutorialWave(waveNumber);
          return { ...wave, monsters: wave.monsters.map(m => ({ ...m, displayName: m.displayNameKey ? t(m.displayNameKey) : m.displayName })) };
        },
        initialPositions: [
          { x: 380, y: FIELD_Y_CENTER + 20 },
          { x: 420, y: FIELD_Y_CENTER - 20 },
        ],
      },
    );
    engineRef.current = engine;
    engine.start();
  }, [t]);

  const goToSelection = () => navigate('/tutorial');

  const currentDialogue = DIALOGUE_SEQUENCES.intro[dialogueIdx] || '';
  const isJedahSpeaking = currentDialogue.startsWith(jedahName + ':');

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center">

      {screen === 'intro' && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-8">
          <div className="flex items-center gap-12 mb-12">
            <div className="flex -space-x-8">
              <img src="/graphic2/케른 다이노후프/케른 다이노후프right.gif" alt="Cairne"
                className={`w-32 h-32 border-4 rounded-full bg-gray-800 relative z-20 transition-all duration-500 ${isJedahSpeaking ? 'border-gray-600 grayscale opacity-50 scale-90' : 'border-red-500 scale-110 shadow-2xl shadow-red-900/50'}`} />
              <img src="/graphic2/제다/제다right.gif" alt="Jedah"
                className={`w-32 h-32 border-4 rounded-full bg-gray-800 relative z-10 transition-all duration-500 ${!isJedahSpeaking ? 'border-gray-600 grayscale opacity-50 scale-90' : 'border-blue-500 scale-110 shadow-2xl shadow-blue-900/50'}`} />
            </div>
            <div>
              <p className="text-red-500 font-bold tracking-widest uppercase">Class Tutorial</p>
              <h1 className="text-5xl font-extrabold text-white">{t('tutorial.melee.pageTitle')}</h1>
            </div>
          </div>

          <div className="max-w-2xl w-full bg-gray-900 border-2 border-red-900/50 rounded-2xl p-8 shadow-2xl shadow-red-900/20">
            <div className="min-h-[160px] text-xl leading-relaxed text-gray-200">
              <span className={isJedahSpeaking ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'}>
                {isJedahSpeaking ? jedahName : cairneName}:
              </span>
              {' ' + currentDialogue.split(': ').slice(1).join(': ')}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div className="flex gap-1">
                {DIALOGUE_SEQUENCES.intro.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i <= dialogueIdx ? 'bg-red-500' : 'bg-gray-700'}`} />
                ))}
              </div>

              {dialogueIdx >= DIALOGUE_SEQUENCES.intro.length - 1 ? (
                <button onClick={handleStartGame} className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-transform hover:scale-105">
                  {t('tutorial.melee.startBtn')}
                </button>
              ) : (
                <button onClick={() => setDialogueIdx(i => i + 1)} className="text-gray-400 hover:text-white flex items-center gap-2">
                  {t('tutorial.common.next')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-5xl mt-4">
        {showCanvas && (
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-red-900/50">
            <div className="flex items-center gap-4">
              <span className="text-red-500 font-bold">{t('tutorial.melee.trainingLabel')}</span>
              <span className="text-gray-400">Wave {gameState?.currentWave ?? 0} / 5</span>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex gap-1">
                {[1, 2, 3].map(s => (
                  <button key={s} onClick={() => handleSpeed(s)}
                    className={`px-2 py-0.5 text-xs font-bold rounded ${speed === s ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                    x{s}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{t('tutorial.melee.myName')}</span>
                <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                  <div className="h-full bg-red-600" style={{ width: `${((gameState?.heroes[0]?.hp ?? 0) / 1500) * 100}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{t('tutorial.melee.jedahLabel')}</span>
                <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                  <div className="h-full bg-blue-600" style={{ width: `${((gameState?.heroes[1]?.hp ?? 0) / 5000) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className={showCanvas ? 'block w-full border-x border-b border-gray-800' : 'hidden'} style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}` }} />

        {narration && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-black/80 border-2 border-red-600 rounded-xl p-4 text-center">
            {narration.map((line, i) => (
              <p key={i} className="text-lg font-bold text-gray-100 italic">{line}</p>
            ))}
          </div>
        )}

        {screen === 'victory' && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
            <div className="bg-gray-900 border-4 border-red-500 p-8 rounded-3xl text-center max-w-lg animate-bounce-short">
              <h2 className="text-4xl font-black text-red-500 mb-6">HUNT COMPLETE</h2>
              <p className="text-xl text-white italic font-bold">{DIALOGUE_SEQUENCES.victory[dialogueIdx]}</p>
            </div>
          </div>
        )}
      </div>

      {screen === 'stage_end' && (
        <div className="fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center p-8 text-center">
          <div className="text-7xl mb-6">⚔️</div>
          <h2 className="text-5xl font-black text-red-500 mb-2">{t('tutorial.melee.masterTitle')}</h2>
          <p className="text-gray-400 text-xl mb-12">{t('tutorial.melee.masterSub')}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mb-12">
            {MASTERY.map((m, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
                <div className="text-yellow-500 font-bold mb-1">{m.title}</div>
                <div className="text-xs text-gray-500">{m.desc}</div>
              </div>
            ))}
          </div>

          <button onClick={goToSelection} className="px-12 py-4 bg-red-600 hover:bg-red-500 text-white text-xl font-bold rounded-xl transition-all">
            {t('tutorial.common.toList')}
          </button>
        </div>
      )}
    </div>
  );
}
