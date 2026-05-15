import { useRef, useEffect, useState, useCallback, useContext } from 'react';
import { Link, useNavigate, UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { GameEngine, GameOptions } from '../game/GameEngine';
import { Renderer } from '../game/Renderer';
import {
  CANVAS_WIDTH, CANVAS_HEIGHT, COLORS,
  TOWER_HP, OFFENSE_WALL_X, HERO_MIN_X,
  FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX,
} from '../game/constants';
import type { GameState, GameHero, Position, Role, WaveConfig } from '../game/types';
import { HERO_DEFINITIONS, ROLE_LABELS, ROLE_COLORS, GRADE_COLORS, calcHeroCombatStats, type HeroDefinition } from '../game/heroData';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useGameLock } from '../contexts/GameLockContext';
import api from '../api/client';
import {
  loadProtagonistSave, loadProtagonistDefenseSave, loadProtagonistAISave,
  loadProtagonistOffenseSave, loadProtagonistRaidSave, loadSave, saveOwnedHeroes,
  loadOwnedHeroes, loadStageProgress, saveStageProgress, isStageUnlocked,
  type StageProgress,
} from '../utils/localStorage';
import { REGIONS, SECTORS, StageDefinition, generateInfiniteDungeon } from '../game/offenseData';
import { loadManghonguSave } from '../game/manghonguData';
import { heroDefToPartialGameHero, STAR_MULT, getTranslatedRace, getTranslatedElement } from '../game/heroUtils';
import TurretPlacementOverlay from '../components/TurretPlacementOverlay';

// ── 스테이지 시스템 ────────────────────────────────────────────────────────────

const DEFENDER_ROLE_LABEL: Record<string, string> = {
  tank: '탱커', melee_dps: '근딜', ranged_dps: '원딜', cc: 'CC', healer: '힐러',
};

const ELITE_MULT = { hp: 1.8, atk: 1.5, def: 1.3 };

function makeStageWaveGenerator(
  stage: StageDefinition,
  isElite: boolean,
  getDisplayName?: (d: { defType?: string; defenderRole: string; displayName: string }) => string,
) {
  const defenders = isElite
    ? [...stage.normalDefenders, ...stage.eliteExtra]
    : stage.normalDefenders;
  const mult = isElite ? ELITE_MULT : { hp: 1, atk: 1, def: 1 };
  return (waveNumber: number): WaveConfig => ({
    waveNumber,
    monsters: defenders.map(d => ({
      type: 'elite' as const,
      name: d.name,
      displayName: getDisplayName ? getDisplayName(d) : d.displayName,
      count: 1,
      hp: Math.round(d.hp * mult.hp),
      atk: Math.round(d.atk * mult.atk),
      def: Math.round(d.def * mult.def),
      speed: d.speed,
      isRanged: d.isRanged,
      color: d.color,
      startX: d.startX,
      startY: d.startY,
      defenderRole: d.defenderRole,
      hidesBehindWall: d.hidesBehindWall,
      hasCleave: d.hasCleave,
      auraDamage: d.auraDamage,
      auraRadius: d.auraRadius,
    })),
  });
}

// ── OffenseGamePage ──────────────────────────────────────────────────────────

export default function OffenseGamePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const { t: t_i18n } = useTranslation();
  const tRef = useRef(t);
  tRef.current = t;
  const { setLocked, setPaused, setExitGameCallback } = useGameLock();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [turretPlacingConfig, setTurretPlacingConfig] = useState<{ maxTurrets: number; onConfirm: (positions: {x:number;y:number}[]) => void } | null>(null);
  const previewStateRef = useRef<GameState | null>(null);
  const userPositionsRef = useRef<Record<string, Position>>({});
  const draggingHeroIdxRef = useRef<number | null>(null);
  const dragOffsetRef = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });

  const [selectedHeroIds, setSelectedHeroIds] = useState<string[]>([]);
  const [heroSaveData, setHeroSaveData] = useState<Record<string, { starRating: number; activeRouteId: string; equippedSkillIds: string[] }>>({});
  const [ownedHeroIds, setOwnedHeroIds] = useState<string[]>(['protagonist']);
  const [protagonistSave, setProtagonistSave] = useState<any>(null);
  const [defProtSave, setDefProtSave] = useState<any>(null);
  const [aiProtSave, setAiProtSave] = useState<any>(null);
  const [offenseProtSave, setOffenseProtSave] = useState<any>(null);
  const [raidProtSave, setRaidProtSave] = useState<any>(null);
  const [heroSearch, setHeroSearch] = useState('');
  const [showNormalNames, setShowNormalNames] = useState(false);
  const [returnCountdown, setReturnCountdown] = useState<number | null>(null);
  const [savedGoldToast, setSavedGoldToast] = useState<number | null>(null);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [rewardHero, setRewardHero] = useState<any>(null);
  const achievementCheckedRef = useRef(false);
  const goldSavedRef = useRef(false);

  const [selectedRegionId, setSelectedRegionId] = useState(REGIONS.length > 0 ? REGIONS[0].id : '');
  const [selectedStageId, setSelectedStageId] = useState(1);
  const [isElite, setIsElite] = useState(false);
  const [stageProgress, setStageProgress] = useState<StageProgress>({});
  const stageProgressRef = useRef<StageProgress>({});
  const currentGameStageRef = useRef<{ stageId: number; isElite: boolean } | null>(null);

  const [meterTab, setMeterTab] = useState<'damage' | 'healing' | 'taken'>('damage');

  // ── 무한 던전 모드 state ────────────────────────────────────────────────────
  const [offenseTab, setOffenseTab]                   = useState<'normal' | 'infinite'>('normal');
  const [infiniteDepth, setInfiniteDepth]             = useState(1);
  const [infiniteBest,  setInfiniteBest]              = useState(0);
  const [infiniteVictoryPending, setInfiniteVictoryPending] = useState(false);
  const [infiniteGameOver, setInfiniteGameOver]       = useState(false);
  const [isInfiniteMode, setIsInfiniteMode]           = useState(false);
  const isInfiniteGameRef   = useRef(false);
  const infiniteDepthRef    = useRef(1);
  const infiniteBestRef     = useRef(0);
  const currentSpeedRef     = useRef(1);
  const [infiniteAutoCountdown, setInfiniteAutoCountdown] = useState<number | null>(null);
  const infiniteAutoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [offenseHeroGranted, setOffenseHeroGranted] = useState(false);

  const [isAutoPlayMode, setIsAutoPlayMode] = useState(false);
  const isAutoPlayModeRef = useRef(false);
  const handleNextStageRef = useRef<() => void>();

  const isGameActive = isStarted && !!gameState && gameState.phase !== 'victory' && gameState.phase !== 'defeat';
  const autoPausedRef = useRef(false);
  const gameIsPausedRef = useRef(false);
  const [blockedTx, setBlockedTx] = useState<{ retry: () => void; unblock: () => void } | null>(null);
  const [pendingTabPath, setPendingTabPath] = useState<string | null>(null);
  const navigationCtx = useContext(NavigationContext);

  const handleContinuePlay = useCallback(() => {
    if (autoPausedRef.current && engineRef.current) {
      engineRef.current.togglePause();
      autoPausedRef.current = false;
    }
    setBlockedTx(null);
  }, []);

  const handleLeaveGame = useCallback(() => {
    if (blockedTx) {
      blockedTx.unblock();
      setBlockedTx(null);
      blockedTx.retry();
    }
  }, [blockedTx]);

  // 무한 던전: 진척도 저장 + 골드 수령 후 나가기
  const handleInfiniteSaveAndExit = useCallback(async (exitFn: () => void) => {
    if (user?.id) {
      const depth = infiniteDepthRef.current;
      if (depth > infiniteBestRef.current) {
        setInfiniteBest(depth);
        infiniteBestRef.current = depth;
        localStorage.setItem(`infinite_best_${user.id}`, String(depth));
      }
    }
    if (!goldSavedRef.current && gameState && gameState.goldEarned > 0) {
      goldSavedRef.current = true;
      await api.post('/user/gold', { delta: gameState.goldEarned }).catch(() => {});
    }
    exitFn();
  }, [gameState, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { setLocked(isGameActive); return () => setLocked(false); }, [isGameActive, setLocked]);
  useEffect(() => { setPaused(!!gameState?.isPaused); }, [gameState?.isPaused, setPaused]);
  useEffect(() => {
    if (isGameActive) { setExitGameCallback(() => handleReset); }
    else { setExitGameCallback(null); }
    return () => setExitGameCallback(null);
  }, [isGameActive]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { gameIsPausedRef.current = !!gameState?.isPaused; }, [gameState?.isPaused]);
  useEffect(() => { stageProgressRef.current = stageProgress; }, [stageProgress]);
  useEffect(() => { infiniteDepthRef.current = infiniteDepth; }, [infiniteDepth]);
  useEffect(() => { infiniteBestRef.current  = infiniteBest;  }, [infiniteBest]);
  useEffect(() => {
    if (!user?.id) return;
    const saved = parseInt(localStorage.getItem(`infinite_best_${user.id}`) ?? '0', 10);
    if (!isNaN(saved) && saved > 0) { setInfiniteBest(saved); infiniteBestRef.current = saved; }
  }, [user?.id]);

  useEffect(() => {
    if (!isGameActive) return;
    const nav = navigationCtx.navigator as any;
    if (typeof nav.block !== 'function') return;
    const unblock = nav.block((tx: { retry: () => void }) => {
      if (!gameIsPausedRef.current && engineRef.current) {
        engineRef.current.togglePause();
        autoPausedRef.current = true;
      }
      setBlockedTx({ retry: tx.retry, unblock });
    });
    return () => unblock();
  }, [isGameActive, navigationCtx.navigator]);

  useEffect(() => {
    if (!isGameActive) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isGameActive]);

  useEffect(() => {
    if (!user?.id) return;
    Promise.all([api.get('/user/profile'), api.get('/user/heroes'), api.get('/user/owned-heroes')]).then(([profileRes, heroesRes, ownedRes]) => {
      const dbProfile = profileRes.data;
      const dbHeroList = heroesRes.data;
      const dbOwnedIds: string[] = Array.isArray(ownedRes.data) ? ownedRes.data : [];
      const localProto = loadProtagonistSave(user.id);
      setProtagonistSave(dbProfile.protagonistSave || localProto);
      setDefProtSave(loadProtagonistDefenseSave(user.id));
      setAiProtSave(loadProtagonistAISave(user.id));
      setOffenseProtSave(loadProtagonistOffenseSave(user.id));
      setRaidProtSave(loadProtagonistRaidSave(user.id));
      const localSave = loadSave(user.id);
      const mergedSave: Record<string, any> = { ...localSave };
      dbHeroList.forEach((uh: any) => {
        const def = HERO_DEFINITIONS.find(d => d.name === uh.template?.name);
        if (def && uh.saveData) mergedSave[def.id] = uh.saveData;
      });
      const localOwnedIds = loadOwnedHeroes(user.id);
      const ownedIds = [...new Set(['protagonist', ...localOwnedIds, ...dbOwnedIds])];
      setOwnedHeroIds(ownedIds);
      const finalHeroSaveData: any = {};
      for (const heroDef of HERO_DEFINITIONS) {
        const s = mergedSave[heroDef.id];
        finalHeroSaveData[heroDef.id] = { starRating: s?.starRating ?? 1, activeRouteId: s?.activeRouteId ?? heroDef.classRoutes[0].id, equippedSkillIds: s?.equippedSkillIds ?? [] };
      }
      setHeroSaveData(finalHeroSaveData);
    }).catch(err => {
      console.error('Failed to load hero data for offense game', err);
      setOwnedHeroIds(loadOwnedHeroes(user.id));
      setProtagonistSave(loadProtagonistSave(user.id));
      setDefProtSave(loadProtagonistDefenseSave(user.id));
      setAiProtSave(loadProtagonistAISave(user.id));
      setOffenseProtSave(loadProtagonistOffenseSave(user.id));
      setRaidProtSave(loadProtagonistRaidSave(user.id));
    });
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    // DB가 source of truth: DB 진척도 로드 후 localStorage 동기화
    api.get('/user/offense-progress')
      .then(res => {
        const dbProgress: StageProgress = res.data ?? {};
        setStageProgress(dbProgress);
        stageProgressRef.current = dbProgress;
        localStorage.setItem(`offense_stages_${user.id}`, JSON.stringify(dbProgress));
        const allStages = REGIONS.flatMap(r => r.stages);
        const maxStageId = allStages.length > 0 ? Math.max(...allStages.map(s => s.id)) : 1;
        let highestUnlockedStage = 1;
        for (let id = maxStageId; id >= 1; id--) { if (isStageUnlocked(id, dbProgress)) { highestUnlockedStage = id; break; } }
        const region = REGIONS.find(r => r.stages.some(s => s.id === highestUnlockedStage)) ?? REGIONS[0];
        setSelectedRegionId(region.id);
        setSelectedStageId(highestUnlockedStage);
      })
      .catch(() => {
        // 오프라인 fallback: localStorage 사용
        const progress = loadStageProgress(user.id);
        setStageProgress(progress);
        stageProgressRef.current = progress;
        const allStages = REGIONS.flatMap(r => r.stages);
        const maxStageId = allStages.length > 0 ? Math.max(...allStages.map(s => s.id)) : 1;
        let highestUnlockedStage = 1;
        for (let id = maxStageId; id >= 1; id--) { if (isStageUnlocked(id, progress)) { highestUnlockedStage = id; break; } }
        const region = REGIONS.find(r => r.stages.some(s => s.id === highestUnlockedStage)) ?? REGIONS[0];
        setSelectedRegionId(region.id);
        setSelectedStageId(highestUnlockedStage);
      });
  }, [user?.id]);

  if (REGIONS.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-yellow-400">
        데이터를 불러오는 중...
      </div>
    );
  }

  const selectedRegion = REGIONS.find(r => r.id === selectedRegionId) || REGIONS[0];
  const selectedStage = (selectedRegion && selectedRegion.stages) 
    ? (selectedRegion.stages.find(s => s.id === selectedStageId) || selectedRegion.stages[0])
    : { id: 1, name: 'Loading...', themeColor: '#555', description: '', normalDefenders: [], eliteExtra: [], gimmick: undefined as any, isBossStage: false, stageSubIndex: 1 };
  const allDefenders = isElite
    ? [...(selectedStage.normalDefenders || []), ...(selectedStage.eliteExtra || [])]
    : (selectedStage.normalDefenders || []);

  const tOff = t.offense as any;
  const tRoles = t.roles as any;
  const translatedRegionName = (tOff.regions as any)?.[selectedRegion?.id]?.name ?? selectedRegion?.name ?? '';
  const translatedStageName = (selectedStage as any).isBossStage
    ? `${translatedRegionName} ${tOff.stageInner ?? '최심부'}`
    : `${translatedRegionName} ${(tOff.stageOutskirts ?? '외곽 {n}구역').replace('{n}', String((selectedStage as any).stageSubIndex ?? ''))}`;
  const translatedStageDesc = (selectedStage as any).isBossStage
    ? (tOff.stageBossDesc ?? selectedStage.description)
    : (tOff.stageNormalDesc ?? '{region}의 수비대가 진을 치고 있습니다.').replace('{region}', translatedRegionName);
  const getTranslatedStageName = (stage: any) => {
    const r = REGIONS.find(rg => rg.stages.some(s => s.id === stage.id));
    const rName = r?.id ? ((tOff.regions as any)?.[r.id]?.name ?? r.name ?? '') : '';
    return stage.isBossStage
      ? `${rName} ${tOff.stageInner ?? '최심부'}`
      : `${rName} ${(tOff.stageOutskirts ?? '외곽 {n}구역').replace('{n}', String(stage.stageSubIndex ?? ''))}`;
  };
  const getHeroDefName = (heroDef: HeroDefinition) => {
    if (heroDef.isProtagonist) return user?.username ?? t_i18n('heroesPage.defaultHeroName');
    return heroDef.nameKey ? t_i18n(heroDef.nameKey) : heroDef.name;
  };
  const getMeterHeroName = (heroId: number, rawName: string) => {
    const hero = gameState?.heroes.find(h => h.id === heroId);
    if (!hero) return rawName;
    const def = HERO_DEFINITIONS.find(h => h.id === hero.heroDefId);
    return def ? getHeroDefName(def) : rawName;
  };
  const getSummonDisplayName = (skillId: string, rawName: string): string => {
    for (const h of HERO_DEFINITIONS) {
      for (const r of h.classRoutes) {
        const s = r.skills.find(sk => sk.id === skillId);
        if (s?.summonStats?.displayNameKey) return t_i18n(s.summonStats.displayNameKey);
        if (s?.nameKey) return t_i18n(s.nameKey);
      }
    }
    return rawName;
  };
  const getDefenderDisplayName = (d: { defType?: string; defenderRole: string }) => {
    if (d.defType === 'leader') return `${translatedRegionName} ${tOff.eliteLeader ?? '우두머리'}`;
    if (d.defType === 'soldier') return `${translatedRegionName} ${tOff.eliteSoldier ?? '정예병'}`;
    return `${translatedRegionName} ${tRoles?.[d.defenderRole] ?? d.defenderRole}`;
  };

  useEffect(() => {
    if (isStarted) return;
    const heroBase = selectedHeroIds.map(id => HERO_DEFINITIONS.find(h => h.id === id)).filter((h): h is HeroDefinition => !!h);
    const _offenseProtSave = user?.id ? loadProtagonistOffenseSave(user.id) : null;
    const _raidProtSave    = user?.id ? loadProtagonistRaidSave(user.id)    : null;
    const _defProtSave     = user?.id ? loadProtagonistDefenseSave(user.id) : null;
    const previewHeroes: GameHero[] = heroBase.map((hero, i) => {
      const protSave =
        hero.id === 'protagonist_defense' ? _defProtSave :
        hero.id === 'protagonist_offense' ? _offenseProtSave :
        hero.id === 'protagonist_raid'    ? _raidProtSave :
        (hero.isProtagonist && protagonistSave) ? protagonistSave : null;
      const star = protSave ? (protSave.starRating ?? 1) : (heroSaveData[hero.id]?.starRating ?? 1);
      const routeId = heroSaveData[hero.id]?.activeRouteId ?? hero.classRoutes[0].id;
      const skillIds = protSave ? (protSave.equippedSkillIds ?? []) : (heroSaveData[hero.id]?.equippedSkillIds ?? []);
      const overrideRole = protSave ? (protSave.selectedRole ?? hero.role) : undefined;
      const isUnsealed = (!hero.isProtagonist && (heroSaveData[hero.id] as any)?.isUnsealed) || false;
      const partial = heroDefToPartialGameHero(hero, star, routeId, skillIds, overrideRole, isUnsealed);
      const defaultX = partial.role === 'tank' ? 200 : partial.role === 'melee_dps' ? 185 : partial.role === 'cc' ? 160 : partial.role === 'ranged_dps' ? 150 : 130;
      const pos = userPositionsRef.current[hero.id] ?? { x: defaultX, y: FIELD_Y_CENTER };
      return { ...partial, id: i + 1, position: { ...pos } } as import('../game/types').GameHero;
    });
    previewStateRef.current = { phase: 'prep', currentWave: 0, maxWave: 1, heroes: previewHeroes, monsters: [], walls: [{ hp: TOWER_HP, maxHp: TOWER_HP, level: 1, position: { x: OFFENSE_WALL_X, y: FIELD_Y_CENTER }, talents: { hpBonus: 0, defBonus: 0, reflectPct: 0, auraDamage: 0, auraSlowPct: 0, elementBuffPct: 0, recoveryPerWave: 0, heroDefBonus: 0, healAlliesPerWave: 0, healAlliesAura: 0, shieldOnWaveStartPct: 0, goldBonusPct: 0, lightningReflect: 0, chainLightningCount: 0, projectileBlockPct: 0, lowHpDefBonus: 0 } }], score: 0, goldEarned: 0, nextMonsterId: 1, waveTimer: 3, isPaused: false, gameSpeed: 1, synergies: [], bossAbilityLog: [], projectiles: [], nextProjectileId: 1, summons: [], nextSummonId: 1, meter: [], hots: [], shields: [], healerEffects: [], healingFlashes: [], meleeTankBonuses: { atkPct: 0, defFlat: 0, hpPct: 0, atkSpdPct: 0, reflectPct: 0, lifestealPct: 0, executePct: 0, armorPenPct: 0, poisonOnHit: 0, healOnKill: 0, meleeCleaveRadius: 0 }, aiAuraBonus: 0, waveElapsedTime: 0 };
  }, [selectedHeroIds, heroSaveData, protagonistSave, isStarted]);

  const toggleHero = useCallback((heroId: string) => {
    setSelectedHeroIds(prev => {
      if (prev.includes(heroId)) return prev.filter(id => id !== heroId);
      if (prev.length >= 5) return prev;
      return [...prev, heroId];
    });
  }, []);

  const roleComposition = selectedHeroIds.reduce((acc, id) => {
    const hero = HERO_DEFINITIONS.find(h => h.id === id);
    if (hero) {
      const routeId = heroSaveData[hero.id]?.activeRouteId ?? hero.classRoutes[0].id;
      const route = hero.classRoutes.find(r => r.id === routeId) ?? hero.classRoutes[0];
      const overrideRole = (hero.isProtagonist && protagonistSave) ? protagonistSave.selectedRole : undefined;
      const effectiveRole = overrideRole ?? route.role ?? hero.role;
      acc[effectiveRole] = (acc[effectiveRole] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const handleStateChange = useCallback(() => { if (engineRef.current) setGameState({ ...engineRef.current.state }); }, []);

  useEffect(() => { if (!canvasRef.current) return; const r = new Renderer(canvasRef.current); r.isOffenseMode = true; rendererRef.current = r; return () => { engineRef.current?.stop(); }; }, []);

  useEffect(() => {
    let rafId: number;
    const renderLoop = () => {
      if (rendererRef.current) {
        rendererRef.current.t_i18n = t_i18n;
        rendererRef.current.monsterNameMap = (tRef.current as any).monsters ?? {};
        rendererRef.current.defenderNameFn = ((name: string, displayName: string): string => {
          const REGION_IDS = ['goblin','orc','tauren','darkelf','fire','ice','undead','poison','mercenary','elemental','sea','sky','demon','dragon'];
          const ROLES = ['melee_dps','ranged_dps','tank','healer','cc'];
          const tOff2 = (tRef.current as any).offense ?? {};
          const tRoles2 = (tRef.current as any).roles ?? {};
          for (const rid of REGION_IDS) {
            if (name.startsWith(rid + '_')) {
              const rest = name.slice(rid.length + 1);
              const role = ROLES.find(r => rest.startsWith(r + '_') || rest === r) ?? '';
              const regionName = tOff2.regions?.[rid]?.name ?? rid;
              if (displayName.includes('우두머리')) return `${regionName} ${tOff2.eliteLeader ?? '우두머리'}`;
              if (displayName.includes('정예병')) return `${regionName} ${tOff2.eliteSoldier ?? '정예병'}`;
              if (displayName.includes('수호자')) return `${regionName} ${tOff2.eliteLeader ?? '수호자'}`;
              return role ? `${regionName} ${tRoles2[role] ?? role}` : displayName;
            }
          }
          return displayName;
        });
        rendererRef.current.showNormalMonsterNames = showNormalNames;
        rendererRef.current.wallLabel = tRef.current.game.wallLabel;
        rendererRef.current.wall2Label = tRef.current.game.wall2Label;
        rendererRef.current.wall3Label = tRef.current.game.wall3Label;
        rendererRef.current.affixEnrageLabel = '[' + tRef.current.game.affixEnrage + ']';
        rendererRef.current.affixHealAuraLabel = '[' + tRef.current.game.affixHealAura + ']';
        rendererRef.current.affixSummonLabel = '[' + tRef.current.game.affixSummon + ']';
        rendererRef.current.affixAoeSlamLabel = '[' + tRef.current.game.affixAoeSlam + ']';
        if (engineRef.current) rendererRef.current.render(engineRef.current.state, engineRef.current.damageNumbers, engineRef.current.explosions);
        else if (!isStarted && previewStateRef.current) rendererRef.current.render(previewStateRef.current, []);
      }
      rafId = requestAnimationFrame(renderLoop);
    };
    rafId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isStarted, showNormalNames]);

  // ── 스테이지 직접 시작 (stage/eliteMode 명시) ─────────────────────────────────
  const startOffenseGame = useCallback((stage: StageDefinition, eliteMode: boolean, customTurretPositions?: {x:number;y:number}[]) => {
    achievementCheckedRef.current = false;
    goldSavedRef.current = false;
    currentGameStageRef.current = { stageId: stage.id, isElite: eliteMode };
    const activeHeroes: any[] = [];
    const activeHeroIds: string[] = [];
    const defProtSave     = user?.id ? loadProtagonistDefenseSave(user.id)  : null;
    const offenseProtSave = user?.id ? loadProtagonistOffenseSave(user.id) : null;
    const raidProtSave    = user?.id ? loadProtagonistRaidSave(user.id)    : null;
    selectedHeroIds.forEach(id => {
      const heroDef = HERO_DEFINITIONS.find(h => h.id === id);
      if (!heroDef) return;
      const protSave =
        heroDef.id === 'protagonist_defense' ? defProtSave :
        heroDef.id === 'protagonist_offense' ? offenseProtSave :
        heroDef.id === 'protagonist_raid'    ? raidProtSave :
        (heroDef.isProtagonist && protagonistSave) ? protagonistSave : null;
      const star         = protSave ? (protSave.starRating ?? 1) : (heroSaveData[id]?.starRating ?? 1);
      const routeId      = heroSaveData[id]?.activeRouteId ?? heroDef.classRoutes[0].id;
      const skillIds     = protSave ? (protSave.equippedSkillIds ?? []) : (heroSaveData[id]?.equippedSkillIds ?? []);
      const overrideRole = protSave ? (protSave.selectedRole ?? heroDef.role) : undefined;
      const isUnsealed   = (!heroDef.isProtagonist && (heroSaveData[id] as any)?.isUnsealed) || false;
      activeHeroes.push(heroDefToPartialGameHero(heroDef, star, routeId, skillIds, overrideRole, isUnsealed));
      activeHeroIds.push(id);
    });
    const initialPositions = activeHeroIds.map((id, i) => {
      if (userPositionsRef.current[id]) return { ...userPositionsRef.current[id] };
      const role = activeHeroes[i].role;
      return { x: role === 'tank' ? 200 : role === 'melee_dps' ? 185 : role === 'cc' ? 160 : role === 'ranged_dps' ? 150 : 130, y: FIELD_Y_CENTER };
    });
    const options: GameOptions = {
      difficulty: eliteMode ? 'hard' : 'normal', maxWave: 1,
      customHeroes: activeHeroes, initialPositions,
      mode: 'offense', towerX: OFFENSE_WALL_X,
      waveGenerator: makeStageWaveGenerator(stage as any, eliteMode, (d) => getDefenderDisplayName(d)),
      manghongu: user?.id ? loadManghonguSave(user.id) : undefined,
      customTurretPositions,
    };
    engineRef.current?.stop();
    engineRef.current = new GameEngine(handleStateChange, options);
    setGameState({ ...engineRef.current.state });
    engineRef.current.start();
    if (currentSpeedRef.current !== 1) engineRef.current.setSpeed(currentSpeedRef.current);
    setReturnCountdown(null);
    setIsStarted(true);
  }, [selectedHeroIds, heroSaveData, protagonistSave, handleStateChange, user?.id]);

  const handleStart = useCallback(() => {
    if (selectedHeroIds.length === 0) return;
    // 메카닉이 파티에 있으면 포탑 위치 설정 오버레이 먼저 표시
    let totalTurrets = 0;
    for (const id of selectedHeroIds) {
      const heroDef = HERO_DEFINITIONS.find(h => h.id === id);
      if (!heroDef) continue;
      const protSave =
        heroDef.id === 'protagonist_defense' ? defProtSave :
        heroDef.id === 'protagonist_offense' ? offenseProtSave :
        heroDef.id === 'protagonist_raid'    ? raidProtSave :
        (heroDef.isProtagonist && protagonistSave) ? protagonistSave : null;
      const routeId = heroSaveData[id]?.activeRouteId ?? heroDef.classRoutes[0].id;
      const route = heroDef.classRoutes.find(r => r.id === routeId) ?? heroDef.classRoutes[0];
      const role = protSave?.selectedRole ?? route.role;
      if (role === 'mechanic') {
        const skillIds: string[] = protSave?.equippedSkillIds ?? heroSaveData[id]?.equippedSkillIds ?? [];
        totalTurrets += skillIds.includes('coilzak_triple_turret') ? 3 : skillIds.includes('scrapbom_multi_turret') ? 2 : 1;
      }
    }
    if (totalTurrets > 0) {
      const maxTurrets = totalTurrets;
      const stage = selectedStage as StageDefinition;
      const elite = isElite;
      setTurretPlacingConfig({
        maxTurrets,
        onConfirm: (positions) => {
          setTurretPlacingConfig(null);
          startOffenseGame(stage, elite, positions);
        },
      });
      return;
    }
    startOffenseGame(selectedStage as StageDefinition, isElite);
  }, [selectedHeroIds, heroSaveData, selectedStage, isElite, startOffenseGame, defProtSave, offenseProtSave, raidProtSave, protagonistSave]);

  const handlePause = () => engineRef.current?.togglePause();
  const handleSpeed = (speed: number) => { currentSpeedRef.current = speed; engineRef.current?.setSpeed(speed); };
  const handleReset = useCallback(() => {
    engineRef.current?.stop();
    engineRef.current = null;
    setGameState(null);
    setIsStarted(false);
    setReturnCountdown(null);
    achievementCheckedRef.current = false;
    goldSavedRef.current = false;
    isInfiniteGameRef.current = false;
    setIsInfiniteMode(false);
    setInfiniteVictoryPending(false);
    setInfiniteGameOver(false);
  }, []);

  const handleNextStage = useCallback(() => {
    const nextId = selectedStageId + 1;
    const nextRegion = REGIONS.find(r => r.stages.some(s => s.id === nextId));
    if (!nextRegion) return;
    const nextStage = nextRegion.stages.find(s => s.id === nextId)!;
    const currentRegion = REGIONS.find(r => r.stages.some(s => s.id === selectedStageId));
    setSelectedRegionId(nextRegion.id);
    setSelectedStageId(nextId);
    if (nextRegion.id === currentRegion?.id || isAutoPlayMode) {
      // 같은 랜드이거나 자동 진행 중: 동일 영웅·난이도로 즉시 시작
      startOffenseGame(nextStage, isElite);
    } else {
      // 랜드 클리어: 다음 랜드 설정 화면으로
      setIsElite(false);
      handleReset();
      window.scrollTo(0, 0);
    }
  }, [selectedStageId, isElite, handleReset, startOffenseGame, isAutoPlayMode]);

  useEffect(() => { handleNextStageRef.current = handleNextStage; }, [handleNextStage]);

  // ── 무한 던전 시작 ────────────────────────────────────────────────────────────
  const startInfiniteDungeon = useCallback((depth: number) => {
    if (selectedHeroIds.length === 0) return;
    achievementCheckedRef.current = false;
    goldSavedRef.current = false;
    isInfiniteGameRef.current = true;
    setIsInfiniteMode(true);
    setInfiniteDepth(depth);
    infiniteDepthRef.current = depth;
    setInfiniteVictoryPending(false);
    setInfiniteGameOver(false);

    const stage = generateInfiniteDungeon(depth);
    const activeHeroes: any[] = [];
    const activeHeroIds: string[] = [];
    const defProtSave     = user?.id ? loadProtagonistDefenseSave(user.id)  : null;
    const offenseProtSave = user?.id ? loadProtagonistOffenseSave(user.id) : null;
    const raidProtSave    = user?.id ? loadProtagonistRaidSave(user.id)    : null;
    selectedHeroIds.forEach(id => {
      const heroDef = HERO_DEFINITIONS.find(h => h.id === id);
      if (!heroDef) return;
      const protSave =
        heroDef.id === 'protagonist_defense' ? defProtSave :
        heroDef.id === 'protagonist_offense' ? offenseProtSave :
        heroDef.id === 'protagonist_raid'    ? raidProtSave :
        (heroDef.isProtagonist && protagonistSave) ? protagonistSave : null;
      const star         = protSave ? (protSave.starRating ?? 1) : (heroSaveData[id]?.starRating ?? 1);
      const routeId      = heroSaveData[id]?.activeRouteId ?? heroDef.classRoutes[0].id;
      const skillIds     = protSave ? (protSave.equippedSkillIds ?? []) : (heroSaveData[id]?.equippedSkillIds ?? []);
      const overrideRole = protSave ? (protSave.selectedRole ?? heroDef.role) : undefined;
      const isUnsealed   = (!heroDef.isProtagonist && (heroSaveData[id] as any)?.isUnsealed) || false;
      activeHeroes.push(heroDefToPartialGameHero(heroDef, star, routeId, skillIds, overrideRole, isUnsealed));
      activeHeroIds.push(id);
    });
    const initialPositions = activeHeroIds.map((id, i) => {
      if (userPositionsRef.current[id]) return { ...userPositionsRef.current[id] };
      const role = activeHeroes[i].role;
      return { x: role === 'tank' ? 200 : role === 'melee_dps' ? 185 : role === 'cc' ? 160 : role === 'ranged_dps' ? 150 : 130, y: FIELD_Y_CENTER };
    });
    const options: GameOptions = {
      difficulty: 'normal', maxWave: 1, customHeroes: activeHeroes, initialPositions,
      mode: 'offense', towerX: OFFENSE_WALL_X,
      waveGenerator: makeStageWaveGenerator(stage, false, (d) => getInfiniteDefName(d)),
      manghongu: user?.id ? loadManghonguSave(user.id) : undefined,
    };
    engineRef.current?.stop();
    engineRef.current = new GameEngine(handleStateChange, options);
    setGameState({ ...engineRef.current.state });
    engineRef.current.start();
    if (currentSpeedRef.current !== 1) engineRef.current.setSpeed(currentSpeedRef.current);
    setIsStarted(true);
  }, [selectedHeroIds, heroSaveData, protagonistSave, handleStateChange, user]);

  const getCanvasHeroAt = useCallback((cx: number, cy: number): number | null => {
    if (!previewStateRef.current || isStarted) return null;
    for (let i = previewStateRef.current.heroes.length - 1; i >= 0; i--) {
      const h = previewStateRef.current.heroes[i];
      if (Math.abs(h.position.x - cx) < h.size + 8 && Math.abs(h.position.y - cy) < h.size + 8) return i;
    }
    return null;
  }, [isStarted]);

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isStarted) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top) * scaleY;
    const idx = getCanvasHeroAt(cx, cy);
    if (idx !== null) {
      draggingHeroIdxRef.current = idx;
      const h = previewStateRef.current!.heroes[idx];
      dragOffsetRef.current = { dx: cx - h.position.x, dy: cy - h.position.y };
    }
  }, [isStarted, getCanvasHeroAt]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isStarted || draggingHeroIdxRef.current === null) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const cx = (e.clientX - rect.left) * scaleX - dragOffsetRef.current.dx;
    const cy = (e.clientY - rect.top) * scaleY - dragOffsetRef.current.dy;
    const idx = draggingHeroIdxRef.current;
    if (previewStateRef.current) {
      previewStateRef.current.heroes[idx].position.x = Math.max(HERO_MIN_X - 60, Math.min(400, cx));
      previewStateRef.current.heroes[idx].position.y = Math.max(FIELD_Y_MIN + 15, Math.min(FIELD_Y_MAX - 15, cy));
      const heroId = selectedHeroIds[idx];
      if (heroId) userPositionsRef.current[heroId] = { ...previewStateRef.current.heroes[idx].position };
    }
  }, [isStarted, selectedHeroIds]);

  const handleCanvasMouseUp = useCallback(() => { draggingHeroIdxRef.current = null; }, []);

  useEffect(() => {
    if (!gameState || (gameState.phase !== 'victory' && gameState.phase !== 'defeat')) return;
    if (achievementCheckedRef.current) return;
    achievementCheckedRef.current = true;

    // ── 무한 던전 모드 결과 처리 ──────────────────────────────────────────────
    if (isInfiniteGameRef.current) {
      if (!goldSavedRef.current && gameState.goldEarned > 0) {
        goldSavedRef.current = true;
        api.post('/user/gold', { delta: gameState.goldEarned }).then(() => { setSavedGoldToast(gameState.goldEarned); setTimeout(() => setSavedGoldToast(null), 4000); }).catch(() => {});
      }
      if (gameState.phase === 'victory') {
        const clearedDepth = infiniteDepthRef.current;
        if (clearedDepth > infiniteBestRef.current) {
          setInfiniteBest(clearedDepth);
          infiniteBestRef.current = clearedDepth;
          if (user?.id) localStorage.setItem(`infinite_best_${user.id}`, String(clearedDepth));
        }
        // 100층 클리어 → 어택 용사 지급
        if (clearedDepth >= 100 && user?.id) {
          const owned = loadOwnedHeroes(user.id);
          if (!owned.includes('protagonist_offense')) {
            const newOwned = [...owned, 'protagonist_offense'];
            saveOwnedHeroes(user.id, newOwned);
            api.post('/user/claim-milestone-hero', { milestoneType: 'protagonist_offense' }).catch(() => {});
            setOffenseHeroGranted(true);
          }
        }
        // 100층이 최종층 — 더 이상 진행 없이 완료 처리
        if (clearedDepth >= 100) {
          setInfiniteGameOver(false);
          return;
        }
        setInfiniteVictoryPending(true);
      } else {
        setInfiniteGameOver(true);
      }
      return;
    }

    // ── 일반 오펜스 모드 결과 처리 ───────────────────────────────────────────
    const stageInfo = currentGameStageRef.current;
    api.post('/achievements/check', { wave: gameState.currentWave, score: gameState.score, cleared: gameState.phase === 'victory', mode: 'offense', difficulty: stageInfo?.isElite ? 'hard' : 'normal', stageId: stageInfo?.stageId, ownedHeroCount: user?.id ? loadOwnedHeroes(user.id).length : 1, partySize: selectedHeroIds.length }).then(res => { if (res.data.newlyUnlocked?.length > 0) setNewAchievements(res.data.newlyUnlocked); }).catch(() => {});
    api.post('/leaderboard/record', { wave: gameState.currentWave, score: gameState.score, cleared: gameState.phase === 'victory', goldEarned: gameState.goldEarned }).catch(() => {});
    if (gameState.phase === 'victory' && stageInfo && user?.id) {
      const newProgress = saveStageProgress(user.id, stageInfo.stageId, stageInfo.isElite, stageProgressRef.current);
      setStageProgress(newProgress);
      api.post('/user/offense-progress', { progress: newProgress }).catch(() => {});
      const region = REGIONS.find(r => r.stages.some(s => s.id === stageInfo.stageId));
      if (region && region.stages[region.stages.length - 1].id === stageInfo.stageId) {
        const heroDef = HERO_DEFINITIONS.find(h => h.id === region.rewardHeroId);
        if (heroDef) api.post('/user/claim-land-reward', { stageId: stageInfo.stageId }).then(() => { setRewardHero(heroDef); const owned = loadOwnedHeroes(user.id); if (!owned.includes(heroDef.id)) localStorage.setItem(`owned_heroes_${user.id}`, JSON.stringify([...owned, heroDef.id])); }).catch(err => console.error('Reward grant failed', err));
      }
      
      if (isAutoPlayModeRef.current) {
        if (stageInfo.stageId < 116) {
          setTimeout(() => {
            if (handleNextStageRef.current) handleNextStageRef.current();
          }, 1500);
        } else {
          setIsAutoPlayMode(false);
          isAutoPlayModeRef.current = false;
        }
      }
    }
    if (!goldSavedRef.current && gameState.goldEarned > 0) {
      goldSavedRef.current = true;
      api.post('/user/gold', { delta: gameState.goldEarned }).then(() => { setSavedGoldToast(gameState.goldEarned); setTimeout(() => setSavedGoldToast(null), 4000); }).catch(() => {});
    }
  }, [gameState?.phase, user?.id, selectedHeroIds.length]);

  useEffect(() => {
    if (!gameState || (gameState.phase !== 'victory' && gameState.phase !== 'defeat')) return;
    if (isInfiniteGameRef.current) return; // 무한 모드는 자동이동 안 함
    if (gameState.phase === 'victory' && isAutoPlayModeRef.current) return; // 자동 진행 모드
    setReturnCountdown(10);
    const interval = setInterval(() => { setReturnCountdown(prev => { if (prev === null || prev <= 1) { clearInterval(interval); navigate('/'); return null; } return prev - 1; }); }, 1000);
    return () => clearInterval(interval);
  }, [gameState?.phase, navigate]);

  // 무한 던전: 승리 시 3초 카운트다운 후 자동으로 다음 층 진행
  useEffect(() => {
    if (!infiniteVictoryPending) {
      if (infiniteAutoTimerRef.current) { clearInterval(infiniteAutoTimerRef.current); infiniteAutoTimerRef.current = null; }
      setInfiniteAutoCountdown(null);
      return;
    }
    setInfiniteAutoCountdown(1);
    infiniteAutoTimerRef.current = setInterval(() => {
      setInfiniteAutoCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(infiniteAutoTimerRef.current!);
          infiniteAutoTimerRef.current = null;
          setInfiniteVictoryPending(false);
          startInfiniteDungeon(infiniteDepthRef.current + 1);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (infiniteAutoTimerRef.current) { clearInterval(infiniteAutoTimerRef.current); infiniteAutoTimerRef.current = null; } };
  }, [infiniteVictoryPending, startInfiniteDungeon]);

  const roleLabel = (role: Role) => tRoles?.[role] ?? ROLE_LABELS[role] ?? role;
  const meterEntries = gameState?.meter ?? [];
  const infinitePreviewStage = !isStarted && offenseTab === 'infinite' ? generateInfiniteDungeon(infiniteDepth) : null;
  const infiniteMilestone = infiniteDepth % 5 === 0;
  const infiniteRegionName = infinitePreviewStage
    ? ((tOff.regions as any)?.[infinitePreviewStage.regionId]?.name ?? infinitePreviewStage.regionId)
    : '';
  const infiniteStageName = infiniteMilestone
    ? (tOff.infiniteMilestoneName ?? `심층 ${infiniteDepth}층`).replace('{n}', String(infiniteDepth))
    : (tOff.infiniteFloorName ?? `${infiniteDepth}층`).replace('{n}', String(infiniteDepth));
  const infiniteStageDesc = infiniteMilestone
    ? (tOff.infiniteMilestoneDesc ?? '{region}의 강력한 수호자들이 지키는 심층 던전!').replace('{region}', infiniteRegionName)
    : (tOff.infiniteNormalDesc ?? '{region}의 어둠 속 깊은 곳. 수비대가 강화되었다.').replace('{region}', infiniteRegionName);
  const getInfiniteDefName = (d: { defType?: string; defenderRole: string }) => {
    if (d.defType === 'leader') return `${infiniteRegionName} ${tOff.eliteLeader ?? '우두머리'}`;
    if (d.defType === 'soldier') return `${infiniteRegionName} ${tOff.eliteSoldier ?? '정예병'}`;
    return `${infiniteRegionName} ${tRoles?.[d.defenderRole] ?? d.defenderRole}`;
  };
  const meterMax = Math.max(1, ...meterEntries.map(e => meterTab === 'damage' ? (e.damage + e.summons.reduce((a, s) => a + s.damage, 0)) : meterTab === 'healing' ? (e.healing + (e.shieldAbsorbed ?? 0)) : e.damageTaken));
  const enemyWallHp = gameState?.walls.at(-1)?.hp ?? TOWER_HP;
  const enemyWallMaxHp = gameState?.walls.at(-1)?.maxHp ?? TOWER_HP;
  const gameStageInfo = currentGameStageRef.current ? REGIONS.flatMap(r => r.stages).find(s => s.id === currentGameStageRef.current!.stageId) ?? selectedStage : selectedStage;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* 어택 용사 지급 모달 */}
      {offenseHeroGranted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-in fade-in duration-500">
          <div className="relative max-w-sm w-full bg-gray-900 border-2 border-amber-500 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(245,158,11,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent rounded-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-2">{tOff.offense1000Badge ?? '던전 공격 1000층 완주!'}</div>
              <h2 className="text-3xl font-black text-white mb-6">{tOff.offense1000Title ?? '불굴의 공격자'}</h2>
              <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-amber-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                <div className="text-5xl mb-3">⚔️</div>
                <div className="text-2xl font-bold text-amber-400 mb-1">{t_i18n('heroes.protagonist_offense.name')}</div>
                <div className="text-sm text-gray-400 mb-3">{getTranslatedRace('인간', t_i18n)} · {getTranslatedElement('화염', t_i18n)}</div>
                <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-400 text-xs font-bold uppercase mb-3">LR GRADE</div>
                <p className="text-xs text-gray-300 leading-relaxed">{tOff.offense1000HeroDesc ?? '최강의 공격력 보유 + 독단의 창 패시브'}<br/><span className="text-amber-300 font-bold">+ {tOff.offense1000HeroDescBold ?? '아군이 쓰러질수록 공격력 최대 30% 증가'}</span></p>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {(tOff.offense1000JoinMsg ?? '무한 던전 1000층을 모두 정복한 당신에게 {name}가 합류했습니다!').replace('{name}', t_i18n('heroes.protagonist_offense.name'))}
              </p>
              <button onClick={() => setOffenseHeroGranted(false)}
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-lg transition-colors">
                {tOff.offense1000Confirm ?? tOff.confirm ?? '확인'}
              </button>
            </div>
          </div>
        </div>
      )}

      {rewardHero && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-in fade-in duration-500">
          <div className="relative max-w-sm w-full bg-gray-900 border-2 border-yellow-500 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(234,179,8,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent rounded-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-yellow-500 text-sm font-bold tracking-widest uppercase mb-2">New Hero Joined!</div>
              <h2 className="text-3xl font-black text-white mb-6">{(t.offense as any).rewardTitle ?? '새로운 영웅 합류'}</h2>
              <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500" />
                <div className="text-5xl mb-4">✨</div>
                <div className="text-2xl font-bold text-yellow-400 mb-1">{rewardHero.nameKey ? t_i18n(rewardHero.nameKey) : rewardHero.name}</div>
                <div className="text-sm text-gray-400 mb-4">{getTranslatedRace(rewardHero.raceName, t_i18n)} · {getTranslatedElement(rewardHero.elementName, t_i18n)}</div>
                <div className="inline-block px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-yellow-500 text-xs font-bold uppercase">{rewardHero.grade} GRADE</div>
              </div>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">{((t.offense as any).landClearMsg as string).replace('{name}', rewardHero.nameKey ? t_i18n(rewardHero.nameKey) : rewardHero.name)}</p>
              <button onClick={() => setRewardHero(null)} className="w-full py-4 bg-yellow-600 hover:bg-yellow-500 text-black font-black rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg">{(t.offense as any).confirm}</button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-4 right-4 z-50 space-y-2">
        {savedGoldToast !== null && (
          <div className="bg-yellow-950 border border-yellow-500 text-yellow-300 px-4 py-3 rounded shadow-lg text-sm flex items-center gap-2">
            <span>💰</span>
            <div><div className="font-bold">{t_i18n('game.goldSavedTitle')}</div><div><span className="text-yellow-400 font-bold">+{savedGoldToast.toLocaleString()}G</span> {t_i18n('game.goldSavedApplied')}</div></div>
            <button onClick={() => setSavedGoldToast(null)} className="ml-2 text-yellow-400 hover:text-yellow-200">✕</button>
          </div>
        )}
        {newAchievements.map((name, i) => (
          <div key={i} className="bg-yellow-900 border border-yellow-500 text-yellow-300 px-4 py-3 rounded shadow-lg text-sm flex items-center gap-2">
            <span>🏆</span>
            <div><div className="font-bold">{t_i18n('game.achievementUnlocked')}</div><div>{t_i18n(name)}</div></div>
            <button onClick={() => setNewAchievements(prev => prev.filter((_, j) => j !== i))} className="ml-2 text-yellow-400 hover:text-yellow-200">✕</button>
          </div>
        ))}
      </div>

      {blockedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 border border-red-600 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-red-400 mb-2">⚠ {t.game.exitConfirmTitle}</h3>
            <p className="text-gray-300 text-sm mb-4 whitespace-pre-line">
              {isInfiniteGameRef.current && !!user
                ? t_i18n('game.exitConfirmDescInfiniteFloor', { floor: infiniteDepth, gold: gameState?.goldEarned ?? 0 })
                : t.game.exitConfirmDescNormal}
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={handleContinuePlay} className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 text-sm">{t.game.continuePlay}</button>
              {isInfiniteGameRef.current && !!user && (
                <button
                  onClick={() => handleInfiniteSaveAndExit(() => handleLeaveGame())}
                  className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded text-sm font-bold"
                >
                  {t.game.saveAndExit}
                </button>
              )}
              <button onClick={handleLeaveGame} className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-bold">{t.game.justExit}</button>
            </div>
          </div>
        </div>
      )}

      {/* 탭 전환 확인 모달 (일시정지 상태에서 던전방어↔던전공격 클릭 시) */}
      {pendingTabPath && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 border border-red-600 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-red-400 mb-2">⚠ {t.game.exitConfirmTitle}</h3>
            <p className="text-gray-300 text-sm mb-4 whitespace-pre-line">
              {isInfiniteGameRef.current && !!user
                ? t_i18n('game.exitConfirmDescInfiniteFloor', { floor: infiniteDepth, gold: gameState?.goldEarned ?? 0 })
                : t.game.exitConfirmDescTabSwitch}
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={() => setPendingTabPath(null)} className="w-full px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 text-sm">{t.game.continuePlay}</button>
              {isInfiniteGameRef.current && !!user && (
                <button
                  onClick={() => handleInfiniteSaveAndExit(() => { navigate(pendingTabPath!); setPendingTabPath(null); })}
                  className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded text-sm font-bold"
                >
                  {t.game.saveAndExit}
                </button>
              )}
              <button onClick={() => { navigate(pendingTabPath!); setPendingTabPath(null); }} className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-bold">{t.game.justExit}</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        {isGameActive && !gameState?.isPaused ? (
          <span
            className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-800 text-gray-600 border-2 border-gray-700 cursor-not-allowed select-none"
            title={t.game.exitConfirmNavBlocked}
          >
            {t.offense.defenseTab}
          </span>
        ) : isGameActive && gameState?.isPaused ? (
          <button
            onClick={() => setPendingTabPath('/game')}
            className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition-colors opacity-70"
          >
            {t.offense.defenseTab}
          </button>
        ) : (
          <Link to="/game" className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition-colors">{t.offense.defenseTab}</Link>
        )}
        <span className="px-4 py-2 rounded-lg font-bold text-sm bg-red-700 text-white border-2 border-red-500 shadow">{t.offense.offenseTab}</span>
        {isGameActive && !gameState?.isPaused ? (
          <span
            className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-800 text-gray-600 border-2 border-gray-700 cursor-not-allowed select-none"
            title={t.game.exitConfirmNavBlocked}
          >
            {t.game.tabRaid}
          </span>
        ) : isGameActive && gameState?.isPaused ? (
          <button
            onClick={() => setPendingTabPath('/game?mode=raid')}
            className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-purple-700 hover:text-white transition-colors opacity-70"
          >
            {t.game.tabRaid}
          </button>
        ) : (
          <Link to="/game?mode=raid" className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-purple-700 hover:text-white transition-colors">{t.game.tabRaid}</Link>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div><h1 className="text-2xl font-bold text-red-400">{t.offense.offenseTab}</h1><p className="text-sm text-gray-400">{t.offense.desc}</p></div>
        <div className="flex items-center gap-3">
          {isStarted && (
            <>
              <button onClick={handlePause} className="btn-secondary text-sm">{gameState?.isPaused ? t.game.resume : t.game.pause}</button>
              <div className="flex gap-1">
                {[1, 2, 3].map(s => (
                  <button key={s} onClick={() => handleSpeed(s)} className={`px-2 py-1 rounded text-xs ${gameState?.gameSpeed === s ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400'}`}>{s}x</button>
                ))}
              </div>
              <button onClick={handleReset} className="btn-danger text-sm">{t.game.reset}</button>
            </>
          )}
        </div>
      </div>

      {!isStarted && (
        <>
          {/* ── 모드 탭 ── */}
          <div className="flex gap-2 mb-4 border-b border-gray-700 pb-3">
            <button onClick={() => setOffenseTab('normal')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${offenseTab === 'normal' ? 'bg-red-700 text-white border-2 border-red-500' : 'bg-gray-800 text-gray-400 border-2 border-gray-700 hover:border-gray-500'}`}>{(t.offense as any).tabNormal}</button>
            <button onClick={() => setOffenseTab('infinite')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${offenseTab === 'infinite' ? 'bg-amber-700 text-white border-2 border-amber-500' : 'bg-gray-800 text-gray-400 border-2 border-gray-700 hover:border-gray-500'}`}>{(t.offense as any).tabInfinite}</button>
            {infiniteBest > 0 && <span className="ml-auto self-center text-xs text-amber-400 font-semibold">{((t.offense as any).bestFloor as string).replace('{n}', String(infiniteBest))}</span>}
          </div>

          {offenseTab === 'normal' && (<>
          <div className="space-y-6 mb-6">
            {SECTORS.map((sector) => {
              const sectorRegions = REGIONS.filter(r => r.sectorId === sector.id);
              const sectorClearCount = sectorRegions.filter(r => r.stages.every(s => stageProgress[s.id]?.normal)).length;
              const isSectorMastered = sectorClearCount === sectorRegions.length;
              return (
                <div key={sector.id} className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <div><h2 className="text-sm font-bold text-white flex items-center gap-2">{((t.offense as any).sectors as any)?.[sector.id]?.name ?? sector.name}{isSectorMastered && <span className="text-yellow-400 text-xs bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/30">{(t.offense as any).mastered}</span>}</h2><p className="text-[10px] text-gray-500">{((t.offense as any).sectors as any)?.[sector.id]?.description ?? sector.description}</p></div>
                    <div className="text-right"><div className="text-[10px] text-cyan-400 font-bold">{((t.offense as any).sectorReward as string).replace('{gold}', String(sector.completionReward.gold)).replace('{crystals}', String(sector.completionReward.crystals))}</div><div className="text-[9px] text-gray-600">{((t.offense as any).sectorProgress as string).replace('{n}', String(sectorClearCount)).replace('{total}', String(sectorRegions.length))}</div></div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    {sectorRegions.map((region) => {
                      const firstStageId = region.stages[0]?.id ?? 999;
                      const isRegionUnlocked = isStageUnlocked(firstStageId, stageProgress);
                      const isSelected = selectedRegionId === region.id;
                      const clearCount = region.stages.filter(s => stageProgress[s.id]?.normal).length;
                      const progressPct = region.stages.length > 0 ? Math.round((clearCount / region.stages.length) * 100) : 0;
                      return (
                        <button key={region.id} disabled={!isRegionUnlocked} onClick={() => { if (isRegionUnlocked) { setSelectedRegionId(region.id); const unlocked = region.stages.filter(s => isStageUnlocked(s.id, stageProgress)); setSelectedStageId(unlocked.length > 0 ? unlocked[unlocked.length - 1].id : region.stages[0].id); }}} className={`flex-shrink-0 w-44 p-3 rounded-xl border-2 transition-all text-left ${isSelected ? 'border-yellow-500 bg-gray-800 shadow-lg scale-[1.02]' : isRegionUnlocked ? 'border-gray-700 bg-gray-800/50 hover:border-gray-500' : 'border-gray-800 bg-gray-900/50 opacity-50 cursor-not-allowed'}`}>
                          <div className="text-xs font-bold mb-1 line-clamp-1" style={{ color: isRegionUnlocked ? region.themeColor : '#4b5563' }}>{isRegionUnlocked ? (((t.offense as any).regions as any)?.[region.id]?.name ?? region.name) : (t.offense as any).unknownRegion}</div>
                          {isRegionUnlocked ? (<><div className="text-[9px] text-gray-500 mb-1 line-clamp-1 h-4">{((t.offense as any).regions as any)?.[region.id]?.desc ?? region.description}</div><div className="text-[10px] text-pink-400 font-bold mb-2 flex items-center gap-1 bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/20"><span className="text-[12px]">✨</span> {(tOff.regions as any)?.[region.id]?.reward ?? region.clearRewardDisplay}</div><div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{ width: `${progressPct}%` }} /></div><div className="text-[9px] text-right mt-1 text-gray-500">{progressPct}%</div></>) : (<div className="text-2xl text-center text-gray-700 my-4">🔒</div>)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card mb-3">
            <h2 className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">{t.offense.selectStage} - {((t.offense as any).regions as any)?.[selectedRegion.id]?.name ?? selectedRegion.name}</h2>
            <div className="flex items-start justify-center gap-0 overflow-x-auto pb-1">
              {selectedRegion.stages.map((stage, i) => {
                const unlocked = isStageUnlocked(stage.id, stageProgress);
                const selected = selectedStageId === stage.id;
                return (
                  <div key={stage.id} className="flex items-center">
                    {i > 0 && <div className={`w-6 h-0.5 mb-7 flex-shrink-0 ${isStageUnlocked(stage.id, stageProgress) ? 'bg-gray-500' : 'bg-gray-700'}`} />}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0" style={{ width: '88px' }}>
                      <button onClick={() => unlocked && setSelectedStageId(stage.id)} disabled={!unlocked} className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${selected ? 'scale-110 shadow-lg' : unlocked ? 'hover:scale-105 border-gray-500' : 'border-gray-700 opacity-40 cursor-not-allowed'}`} style={selected ? { backgroundColor: stage.themeColor + '30', borderColor: stage.themeColor, boxShadow: `0 0 12px ${stage.themeColor}50` } : unlocked ? { backgroundColor: '#1f2937' } : { backgroundColor: '#111827' }}>
                        {unlocked ? <span style={{ color: selected ? stage.themeColor : '#9ca3af' }}>{stage.id}</span> : <span className="text-gray-600 text-xs">🔒</span>}
                      </button>
                      <div className="text-center"><div className="text-[10px] font-semibold leading-tight" style={{ color: unlocked ? (selected ? stage.themeColor : '#d1d5db') : '#4b5563' }}>{(stage as any).isBossStage ? (tOff.stageInner ?? '최심부') : (tOff.stageOutskirts ?? '외곽 {n}구역').replace('{n}', String((stage as any).stageSubIndex ?? ''))}</div><div className="flex gap-0.5 justify-center mt-0.5"><span className={`text-[9px] px-1 rounded font-bold ${stageProgress[stage.id]?.normal ? 'bg-yellow-600 text-yellow-100' : 'bg-gray-700 text-gray-600'}`}>N</span><span className={`text-[9px] px-1 rounded font-bold ${stageProgress[stage.id]?.elite ? 'bg-red-600 text-red-100' : 'bg-gray-700 text-gray-600'}`}>E</span></div></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card mb-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1"><h3 className="font-bold text-base" style={{ color: selectedStage.themeColor }}>{(t?.offense?.stageInfo || 'Stage {id} — {name}').replace('{id}', String(selectedStage.id)).replace('{name}', translatedStageName)}</h3>{selectedStage.gimmick === 'hidden_ranged' && <span className="text-[10px] bg-purple-900/50 text-purple-300 border border-purple-600 rounded px-1.5 py-0.5 flex-shrink-0">{tOff.hiddenRangedGimmick ?? '🔮 원거리 은신 기믹'}</span>}</div><p className="text-xs text-gray-400 mb-2">{translatedStageDesc}</p><div className="flex flex-wrap gap-1.5 mb-2">{allDefenders.map((d, i) => <span key={i} className="text-xs px-2 py-0.5 rounded border flex items-center gap-1" style={{ borderColor: d.color + '55', backgroundColor: d.color + '11' }}><span className="font-semibold" style={{ color: d.color }}>{tRoles?.[d.defenderRole] ?? DEFENDER_ROLE_LABEL[d.defenderRole]}</span><span className="text-gray-400 hidden sm:inline">{getDefenderDisplayName(d)}</span>{d.hidesBehindWall && <span className="text-purple-400 text-[9px]">🔮</span>}</span>)}</div>{selectedStage.gimmick === 'hidden_ranged' && <div className="text-xs text-purple-300 bg-purple-900/20 border border-purple-700/40 rounded px-2 py-1">{tOff.hiddenRangedDesc ?? '⚠️ 벽을 파괴하면 🔮 표시된 수비대가 나타납니다.'}</div>}</div>
              <div className="flex flex-col gap-2 flex-shrink-0"><button onClick={() => setIsElite(false)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors text-center ${!isElite ? 'bg-yellow-600 text-white shadow' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}><div>{t.offense.normal}</div><div className="text-[10px] font-normal opacity-80">{(tOff.defenderCount ?? '{n}인 수비대').replace('{n}', String(selectedStage.normalDefenders?.length || 0))}</div></button><button onClick={() => setIsElite(true)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors text-center ${isElite ? 'bg-red-600 text-white shadow' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}><div>{t.offense.elite}</div><div className="text-[10px] font-normal opacity-80">{(tOff.defenderCount ?? '{n}인 수비대').replace('{n}', String((selectedStage.normalDefenders?.length || 0) + (selectedStage.eliteExtra?.length || 0)))} · HP×1.8</div></button></div>
            </div>
          </div>
          </>)}

          {offenseTab === 'infinite' && (
          <div className="card mb-4">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-sm font-bold text-white">{(t.offense as any).infiniteTitle}</h2>
              {infiniteBest > 0 && <span className="text-xs text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">{((t.offense as any).bestFloor as string).replace('{n}', String(infiniteBest))}</span>}
            </div>
            <p className="text-xs text-gray-400 mb-4">{(t.offense as any).infiniteDesc}</p>
            {infinitePreviewStage && (
              <div className="rounded-xl border p-4 mb-4" style={{ borderColor: infinitePreviewStage.themeColor + '55', background: infinitePreviewStage.themeColor + '11' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-black" style={{ color: infinitePreviewStage.themeColor }}>{infiniteStageName}</span>
                  {infiniteMilestone && <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded font-bold">{(t.offense as any).milestone}</span>}
                </div>
                <p className="text-xs text-gray-400 mb-3">{infiniteStageDesc}</p>
                <div className="flex flex-wrap gap-1">
                  {[...(infinitePreviewStage.normalDefenders ?? []), ...(infinitePreviewStage.eliteExtra ?? [])].map((d, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded border" style={{ borderColor: d.color + '55', backgroundColor: d.color + '11', color: d.color }}>{getInfiniteDefName(d)}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{(t.offense as any).startFloor}</span>
              <button onClick={() => setInfiniteDepth(d => Math.max(1, d - 1))} disabled={infiniteDepth <= 1} className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white rounded text-sm font-bold">−</button>
              <span className="text-lg font-bold text-amber-400 w-14 text-center">{infiniteDepth}{(t.offense as any).floorSuffix}</span>
              <button onClick={() => setInfiniteDepth(d => Math.min(d + 1, Math.min(100, Math.max(1, infiniteBest + 1))))} disabled={infiniteDepth >= Math.min(100, Math.max(1, infiniteBest + 1))} className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-600 disabled:opacity-40 text-white rounded text-sm font-bold">+</button>
              {infiniteBest > 0 && <span className="text-xs text-gray-500 ml-1">{((t.offense as any).maxFloorHint as string).replace('{n}', String(Math.min(100, infiniteBest + 1)))}</span>}
            </div>
          </div>
          )}

          <div className="card mb-4">
            <div className="flex items-center justify-between mb-3"><h2 className="text-sm font-bold text-white">{t.offense.partyTitle}<span className="ml-2 text-xs text-gray-500 font-normal">{(t.offense as any).partySelectHint}</span><span className={`ml-2 text-xs font-bold ${selectedHeroIds.length >= 5 ? 'text-red-400' : selectedHeroIds.length === 0 ? 'text-gray-500' : 'text-yellow-400'}`}>({selectedHeroIds.length}/5)</span></h2><div className="flex items-center gap-1.5 flex-wrap">{Object.entries(roleComposition).map(([role, count]) => <span key={role} className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ color: ROLE_COLORS[role], backgroundColor: ROLE_COLORS[role] + '22', border: `1px solid ${ROLE_COLORS[role]}55` }}>{tRoles?.[role] ?? ROLE_LABELS[role]} {count}</span>)}</div></div>
            <div className="mb-3"><input type="text" value={heroSearch} onChange={e => setHeroSearch(e.target.value)} placeholder={t.offense.searchPlaceholder} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500" /></div>
            <div className="grid grid-cols-5 gap-2">{HERO_DEFINITIONS.filter(h => { if (!ownedHeroIds.includes(h.id)) return false; if (!heroSearch.trim()) return true; const q = heroSearch.trim().toLowerCase(); const routeId = heroSaveData[h.id]?.activeRouteId ?? h.classRoutes[0].id; const route = h.classRoutes.find(r => r.id === routeId) ?? h.classRoutes[0]; const overrideRole = (h.isProtagonist && protagonistSave) ? protagonistSave.selectedRole : undefined; const effectiveRole = overrideRole ?? route.role ?? h.role; return h.name.toLowerCase().includes(q) || h.raceName.toLowerCase().includes(q) || h.elementName.toLowerCase().includes(q) || (tRoles?.[effectiveRole] ?? ROLE_LABELS[effectiveRole] ?? '').toLowerCase().includes(q) || h.grade.toLowerCase().includes(q); }).map(hero => { const pSave = hero.id === 'protagonist' ? protagonistSave : hero.id === 'protagonist_defense' ? defProtSave : hero.id === 'protagonist_ai' ? aiProtSave : hero.id === 'protagonist_offense' ? offenseProtSave : hero.id === 'protagonist_raid' ? raidProtSave : null; const star = pSave ? (pSave.starRating ?? 1) : (heroSaveData[hero.id]?.starRating ?? 1); const mult = STAR_MULT[Math.max(0, star - 1) as 0|1|2|3|4]; const isSelected = selectedHeroIds.includes(hero.id); const routeId = heroSaveData[hero.id]?.activeRouteId ?? hero.classRoutes[0].id; const route = hero.classRoutes.find(r => r.id === routeId) ?? hero.classRoutes[0]; const overrideRole = pSave ? (pSave.selectedRole ?? hero.role) : undefined; const effectiveRole: Role = overrideRole ?? route.role ?? hero.role; const roleColor = ROLE_COLORS[effectiveRole] ?? '#6b7280'; const combat = calcHeroCombatStats(hero, star, routeId, overrideRole); return (<button key={hero.id} onClick={() => toggleHero(hero.id)} disabled={!isSelected && selectedHeroIds.length >= 5} className="p-3 rounded-xl border-2 text-left transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed" style={isSelected ? { borderColor: roleColor, background: roleColor + '15' } : { borderColor: '#374151', background: '#0f172a', opacity: 0.45 }}><div className="flex items-center gap-1.5 mb-1.5"><span className="text-xs font-black px-1 rounded" style={{ color: GRADE_COLORS[hero.grade], backgroundColor: GRADE_COLORS[hero.grade] + '22' }}>{hero.grade}</span><span className="text-xs font-semibold text-white truncate">{getHeroDefName(hero)}</span></div><div className="text-xs font-medium mb-1.5" style={{ color: roleColor }}>{tRoles?.[effectiveRole] ?? ROLE_LABELS[effectiveRole]}</div><div className="flex gap-px mb-2">{[1,2,3,4,5].map(s => <span key={s} className="text-xs" style={{ color: s <= star ? '#facc15' : '#1f2937' }}>★</span>)}</div><div className="grid grid-cols-2 gap-1 text-[10px]"><div className="text-gray-500">HP <span className="text-green-400 font-mono">{Math.round(hero.baseStats.hp * mult)}</span></div><div className="text-gray-500">ATK <span className="text-red-400 font-mono">{combat.finalAtk}</span></div><div className="text-gray-500">ASPD <span className="text-yellow-400 font-mono">{combat.attackCooldown}</span></div><div className="text-gray-500">DPS <span className="text-rose-400 font-mono">{combat.dps}</span></div></div><div className="text-xs text-gray-600 mt-1.5">{getTranslatedRace(hero.raceName, t_i18n)} · {getTranslatedElement(hero.elementName, t_i18n)}</div>{isSelected && <div className="text-xs font-bold mt-1.5" style={{ color: roleColor }}>{t_i18n('game.heroSelected')}</div>}</button>); })}</div>
            <div className={`mt-4 flex items-center ${offenseTab === 'normal' ? 'justify-between' : 'justify-end'}`}>
              {offenseTab === 'normal' && (
                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-emerald-400 bg-emerald-900/20 px-4 py-2 rounded-lg border border-emerald-800">
                  <input
                    type="checkbox"
                    checked={isAutoPlayMode}
                    onChange={(e) => {
                      setIsAutoPlayMode(e.target.checked);
                      isAutoPlayModeRef.current = e.target.checked;
                    }}
                    className="w-5 h-5 accent-emerald-500 rounded bg-gray-700 border-gray-600 focus:ring-emerald-500"
                  />
                  {(t.offense as any).autoNextStage}
                </label>
              )}
              {offenseTab === 'normal'
                ? <button onClick={handleStart} disabled={selectedHeroIds.length === 0} className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl text-lg shadow-lg transition-transform hover:scale-105 active:scale-95">{t.offense.startBtn}</button>
                : <button onClick={() => startInfiniteDungeon(infiniteDepth)} disabled={selectedHeroIds.length === 0} className="px-8 py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl text-lg shadow-lg transition-transform hover:scale-105 active:scale-95">{((t.offense as any).infiniteChallenge as string).replace('{n}', String(infiniteDepth))}</button>
              }
            </div>
          </div>
        </>
      )}

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-2 mb-4 overflow-x-auto relative">
        {!isStarted && <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-red-300 bg-black/60 px-3 py-1 rounded pointer-events-none z-10 whitespace-nowrap">{(t.offense as any).offenseDragHint}</div>}
        {isInfiniteMode && isStarted && (
          <div className="absolute top-3 left-4 z-10 bg-black/75 rounded-lg px-3 py-1.5 pointer-events-none">
            <div className="text-amber-400 font-black text-sm">{infiniteDepth}{(t.offense as any).floorSuffix}</div>
            {infiniteBest > 0 && <div className="text-gray-400 text-[10px]">{((t.offense as any).bestFloorShort as string).replace('{n}', String(infiniteBest))}</div>}
          </div>
        )}
        {infiniteVictoryPending && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 rounded-lg">
            <div className="bg-gray-900 border-2 border-amber-500 rounded-2xl px-8 py-6 text-center shadow-2xl">
              <div className="text-3xl mb-1">🎉</div>
              <h3 className="text-xl font-black text-amber-400 mb-1">{((t.offense as any).floorClear as string).replace('{n}', String(infiniteDepth))}</h3>
              {gameState && gameState.goldEarned > 0 && <p className="text-yellow-400 text-sm mb-2">+{gameState.goldEarned.toLocaleString()}G</p>}
              <p className="text-amber-300 text-sm font-bold mb-3">
                {infiniteAutoCountdown !== null ? ((t.offense as any).infiniteAutoNext as string).replace('{n}', String(infiniteAutoCountdown)).replace('{next}', String(infiniteDepth + 1)) : `${infiniteDepth + 1}${(t.offense as any).floorSuffix}...`}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { if (infiniteAutoTimerRef.current) { clearInterval(infiniteAutoTimerRef.current); infiniteAutoTimerRef.current = null; } setInfiniteAutoCountdown(null); setInfiniteVictoryPending(false); startInfiniteDungeon(infiniteDepth + 1); }}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-sm transition-colors"
                >{(t.offense as any).continueNow}</button>
                <button
                  onClick={() => { if (infiniteAutoTimerRef.current) { clearInterval(infiniteAutoTimerRef.current); infiniteAutoTimerRef.current = null; } setInfiniteAutoCountdown(null); setInfiniteVictoryPending(false); handleReset(); }}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg text-sm transition-colors"
                >{(t.offense as any).quit}</button>
              </div>
            </div>
          </div>
        )}
        {infiniteGameOver && (() => {
          const checkpoints: number[] = [];
          for (let c = 5; c <= infiniteDepth; c += 5) checkpoints.push(c);
          return (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 rounded-lg">
              <div className="bg-gray-900 border-2 border-red-600 rounded-2xl px-8 py-6 text-center shadow-2xl max-w-sm w-full">
                <div className="text-3xl mb-1">💀</div>
                <h3 className="text-xl font-black text-red-400 mb-1">{((t.offense as any).floorGameOver as string).replace('{n}', String(infiniteDepth))}</h3>
                {infiniteBest > 0 && <p className="text-amber-400 text-sm font-bold mb-3">{((t.offense as any).bestFloor as string).replace('{n}', String(infiniteBest))}</p>}
                {checkpoints.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">{(t.offense as any).checkpointContinue}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {checkpoints.map(cp => (
                        <button key={cp} onClick={() => { setInfiniteGameOver(false); setInfiniteDepth(cp); startInfiniteDungeon(cp); }} className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg text-sm transition-colors">{cp}{(t.offense as any).floorSuffix}</button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => { setInfiniteGameOver(false); setInfiniteDepth(1); startInfiniteDungeon(1); }}
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-sm transition-colors"
                  >{(t.offense as any).fromFloor1}</button>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg text-sm transition-colors"
                  >{(t.offense as any).quit}</button>
                </div>
              </div>
            </div>
          );
        })()}
        {/* 웨이브 제한시간 카운트다운 */}
        {isStarted && gameState?.phase === 'wave' && (() => {
          const remaining = Math.ceil(60 - (gameState.waveElapsedTime ?? 0));
          if (remaining > 30) return null;
          const isUrgent = remaining <= 10;
          return (
            <div className={`absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg font-bold text-sm shadow-lg pointer-events-none z-10
              ${isUrgent ? 'bg-red-900/90 text-red-300 border border-red-500 animate-pulse' : 'bg-yellow-900/80 text-yellow-300 border border-yellow-700'}`}>
              ⏱ {remaining}초
            </div>
          );
        })()}
        {isStarted && gameState && gameState.phase === 'wave' && (
          <div className="absolute top-3 right-4 z-10 bg-black/70 rounded px-3 py-2 min-w-[180px]">
            <div className="text-xs text-red-300 font-bold mb-1">{t.offense.enemyWall}</div>
            <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden"><div className="h-full transition-all duration-300" style={{ width: `${Math.max(0, (enemyWallHp / enemyWallMaxHp) * 100)}%`, backgroundColor: enemyWallHp / enemyWallMaxHp > 0.4 ? '#EF4444' : '#DC2626' }} /></div>
            <div className="text-xs text-red-400 mt-0.5 text-right">{Math.max(0, Math.ceil(enemyWallHp))} / {enemyWallMaxHp}</div>
          </div>
        )}
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="rounded block mx-auto" style={{ imageRendering: 'pixelated', cursor: !isStarted ? 'grab' : 'default' }} onMouseDown={handleCanvasMouseDown} onMouseMove={handleCanvasMouseMove} onMouseUp={handleCanvasMouseUp} onMouseLeave={handleCanvasMouseUp} />
        <div className="absolute bottom-2 right-2 flex items-center bg-black/60 px-2 py-1 rounded">
          <label className="text-xs text-gray-300 flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={showNormalNames} onChange={e => setShowNormalNames(e.target.checked)} className="w-3 h-3 accent-yellow-500 rounded bg-gray-700 border-gray-600 focus:ring-yellow-500 focus:ring-offset-gray-900" />
            {t.game.showNormalMonsterNames}
          </label>
        </div>
      </div>

      {gameState && !isInfiniteMode && (gameState.phase === 'victory' || gameState.phase === 'defeat') && (
        <div className="card mb-4 text-center py-8">
          {gameState.phase === 'victory' ? (<><div className="text-4xl mb-2">🎉</div><h2 className="text-2xl font-bold text-yellow-400 mb-1">{(t?.offense?.stageClear || 'Stage {id} Clear!').replace('{id}', String(gameStageInfo.id))}</h2><p className="text-sm mb-0.5" style={{ color: gameStageInfo.themeColor }}>{getTranslatedStageName(gameStageInfo)} {currentGameStageRef.current?.isElite ? `· ${t?.offense?.elite} ${t?.game?.victory}!` : `· ${t?.offense?.normal} ${t?.game?.victory}!`}</p><p className="text-yellow-400 font-bold mb-4">{t?.dashboard?.gold}: {gameState.goldEarned.toLocaleString()}G | {t?.tournament?.score}: {gameState.score.toLocaleString()}</p></>) : (<><div className="text-4xl mb-2">💀</div><h2 className="text-2xl font-bold text-red-400 mb-2">{t?.offense?.defeat}</h2><p className="text-gray-300 mb-1">{(t?.offense?.stageInfo || 'Stage {id} — {name}').replace('{id}', String(gameStageInfo.id)).replace('{name}', getTranslatedStageName(gameStageInfo))} {t?.offense?.defeatDesc}</p><p className="text-gray-500 text-sm mb-4">{t?.offense?.retryHint || '파티를 강화해 다시 도전하세요!'}</p></>)}
          {returnCountdown !== null && <p className="text-xs text-gray-500 mb-3">{(t?.offense?.autoReturn || '{n}초 후 메인화면으로 자동 이동합니다...').replace('{n}', String(returnCountdown))}</p>}
          <div className="flex gap-3 justify-center">
            {gameState.phase === 'victory' && selectedStageId < 116 && (() => {
              const nextId = selectedStageId + 1;
              const nextR = REGIONS.find(r => r.stages.some(s => s.id === nextId));
              const curR  = REGIONS.find(r => r.stages.some(s => s.id === selectedStageId));
              const isSameLand = nextR?.id === curR?.id;
              return (
                <button onClick={handleNextStage} className={`px-6 py-2 font-bold rounded-lg text-sm transition-colors text-white ${isSameLand ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-700 hover:bg-emerald-600'}`}>
                  {isSameLand ? (t.offense as any).nextStage : (t.offense as any).nextLand}
                </button>
              );
            })()}
            <button onClick={handleReset} className={`px-6 py-2 font-bold rounded-lg text-sm ${gameState.phase === 'victory' ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-red-700 hover:bg-red-800 text-white'}`}>{(t.offense as any).retry}</button>
            <button onClick={() => navigate('/')} className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg text-sm">{(t.offense as any).toMain}</button>
          </div>
        </div>
      )}

      {gameState && (
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-3">
            {gameState.heroes.map(hero => {
              const mySummons = (gameState.summons || []).filter(s => s.summonerId === hero.id && s.isAlive);
              return (
                <div key={hero.id} className="space-y-2">
                  <div className={`card p-3 border-l-4 transition-opacity duration-300 ${hero.isAlive ? '' : 'opacity-40'}`} style={{ borderLeftColor: hero.color }}>
                    <div className="flex items-center justify-between mb-1"><span className="font-bold text-sm text-white truncate">{getMeterHeroName(hero.id, hero.name)}</span><span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: hero.color + '33', color: hero.color }}>{roleLabel(hero.role)}</span></div>
                    <div className="mb-1"><div className="flex justify-between text-[10px] mb-0.5"><span className="text-gray-500">HP</span><span className={hero.hp / hero.maxHp > 0.3 ? 'text-green-400' : 'text-red-400 font-bold'}>{Math.max(0, Math.ceil(hero.hp))}/{hero.maxHp}</span></div><div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden"><div className="h-full transition-all duration-500" style={{ width: `${Math.max(0, (hero.hp / hero.maxHp) * 100)}%`, backgroundColor: hero.hp / hero.maxHp > 0.3 ? COLORS.hp_bar_fill : COLORS.hp_bar_low }} /></div></div>
                    <div className="grid grid-cols-2 gap-x-2 text-[9px] text-gray-500 font-mono"><div className="flex justify-between"><span>ATK</span><span className="text-gray-300">{hero.atk}</span></div><div className="flex justify-between"><span>DEF</span><span className="text-gray-300">{hero.def}</span></div><div className="flex justify-between"><span>ASPD</span><span className="text-yellow-400">{hero.attackCooldown}</span></div><div className="flex justify-between"><span>DPS</span><span className="text-red-400">{Math.round(hero.atk / hero.attackCooldown)}</span></div></div>
                  </div>
                  {mySummons.length > 0 && mySummons.map(s => (<div key={s.id} className="card p-2 border-l-2" style={{ borderLeftColor: s.color }}><div className="text-[10px] font-bold truncate" style={{ color: s.color }}>{getSummonDisplayName(s.skillId, s.displayName)}</div><div className="w-full bg-gray-700 rounded-full h-1.5 mt-1 overflow-hidden"><div className="h-full" style={{ width: `${Math.max(0, (s.hp / s.maxHp) * 100)}%`, backgroundColor: s.color }} /></div><div className="text-[9px] text-gray-500 mt-0.5">{Math.ceil(s.hp)}/{s.maxHp}</div></div>))}
                </div>
              );
            })}
          </div>
          {meterEntries.length > 0 && (
            <div className="card">
              <div className="flex items-center justify-between mb-2"><h3 className="text-xs font-bold text-white">{t_i18n('game.damage')} Meter</h3><div className="flex gap-1">{(['damage', 'healing', 'taken'] as const).map(tab => (<button key={tab} onClick={() => setMeterTab(tab)} className={`px-2 py-0.5 rounded text-[10px] ${meterTab === tab ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400'}`}>{tab === 'damage' ? t_i18n('game.damage') : tab === 'healing' ? t_i18n('game.healing') : t_i18n('game.damageTaken')}</button>))}</div></div>
              <div className="space-y-1">
                {meterEntries.sort((a, b) => { const va = meterTab === 'damage' ? (a.damage + a.summons.reduce((x, s) => x + s.damage, 0)) : meterTab === 'healing' ? (a.healing + (a.shieldAbsorbed ?? 0)) : a.damageTaken; const vb = meterTab === 'damage' ? (b.damage + b.summons.reduce((x, s) => x + s.damage, 0)) : meterTab === 'healing' ? (b.healing + (b.shieldAbsorbed ?? 0)) : b.damageTaken; return vb - va; }).map(entry => { const shieldAmt = meterTab === 'healing' ? (entry.shieldAbsorbed ?? 0) : 0; const total = meterTab === 'damage' ? (entry.damage + entry.summons.reduce((x, s) => x + s.damage, 0)) : meterTab === 'healing' ? (entry.healing + shieldAmt) : entry.damageTaken; const pct = Math.round((total / meterMax) * 100); return (<div key={entry.heroId} className="flex items-center gap-2 text-[10px]"><span className="w-20 truncate font-medium" style={{ color: entry.color }}>{getMeterHeroName(entry.heroId, entry.heroName)}</span><div className="flex-1 bg-gray-700 rounded h-3 overflow-hidden flex">{meterTab === 'healing' ? (<><div style={{ width: `${Math.round((entry.healing / meterMax) * 100)}%`, backgroundColor: '#22C55E', transition: 'width 0.3s' }} />{shieldAmt > 0 && <div style={{ width: `${Math.round((shieldAmt / meterMax) * 100)}%`, backgroundColor: '#FBBF24', transition: 'width 0.3s' }} />}</>) : meterTab === 'taken' ? (<div style={{ width: `${Math.round((total / meterMax) * 100)}%`, backgroundColor: '#EF4444', transition: 'width 0.3s' }} />) : (<><div style={{ width: `${Math.round((entry.damage / meterMax) * 100)}%`, backgroundColor: entry.color, transition: 'width 0.3s' }} />{entry.summons.map(s => (<div key={s.skillId} style={{ width: `${Math.round((s.damage / meterMax) * 100)}%`, backgroundColor: s.color, transition: 'width 0.3s' }} />))}</>)}</div><span className="w-16 text-right text-gray-400">{total.toLocaleString()} ({pct}%)</span></div>); })}
              </div>
            </div>
          )}
        </div>
      )}
      {turretPlacingConfig && (
        <TurretPlacementOverlay
          maxTurrets={turretPlacingConfig.maxTurrets}
          onConfirm={turretPlacingConfig.onConfirm}
        />
      )}
    </div>
  );
}
