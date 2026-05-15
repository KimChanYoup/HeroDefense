/**
 * AI Game Page — 3 Tabs
 * 파티: 내 영웅(최대 5) + AI 파티 1개 → playerCount=2 (총 10명)
 * 레이드: 내 영웅(최대 5) + AI 파티 2개 → playerCount=3 (총 15명)
 * Factions: AI 용병단 관리 및 육성
 * PvP: 준비 중
 */
import { useRef, useEffect, useState, useCallback, useContext } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { GameEngine, GameOptions } from '../game/GameEngine';
import { Renderer } from '../game/Renderer';
import { CANVAS_WIDTH, CANVAS_HEIGHT, COLORS } from '../game/constants';
import type { GameState, GameHero, HeroMeterEntry } from '../game/types';
import { AI_STRATEGY_KEYS, createAIHeroes, AI_FACTIONS } from '../game/AIEngine';
import { makeRaidWaveGenerator, RAID_BOSSES, RAID_WAVE_SCHEDULE } from '../game/raidData';
import { makeAIInfiniteWaveGenerator } from '../game/WaveData';
import {
  HERO_DEFINITIONS,
  HERO_GRAPHIC_IDS,
  ROLE_COLORS,
  GRADE_COLORS,
  type HeroDefinition,
} from '../game/heroData';
import {
  loadOwnedHeroes, saveOwnedHeroes,
  loadProtagonistSave, loadProtagonistAISave, loadProtagonistDefenseSave,
  loadProtagonistOffenseSave, loadProtagonistRaidSave,
  loadSave, loadWallTalents,
  loadRaidStageProgress, saveRaidStageProgress, isRaidStageUnlocked,
  loadAIFactionStars, saveAIFactionStars,
  type RaidStageProgress,
} from '../utils/localStorage';
import { loadManghonguSave } from '../game/manghonguData';
import { addMonsterKill } from '../game/monsterBook';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useGameLock } from '../contexts/GameLockContext';
import api from '../api/client';
import { REGIONS } from '../game/offenseData';
import { heroDefToPartialGameHero, STAR_MULT, getTranslatedRace, getTranslatedElement } from '../game/heroUtils';

// ── Utilities ─────────────────────────────────────────────────────────────
const ROLE_ICON: Record<string, string> = {
  tank: '🛡️', melee_dps: '⚔️', ranged_dps: '🏹', cc: '❄️', healer: '💚',
};


// ── Component ─────────────────────────────────────────────────────────────

type Difficulty = 'easy' | 'normal' | 'hard';
type TabType = 'party' | 'raid' | 'factions' | 'pvp';

// ── Main Component ────────────────────────────────────────────────────────
export default function AIGamePage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { t: t_i18n } = useTranslation();
  const tRef = useRef(t);
  const getHeroDefName = (heroDef: HeroDefinition): string => {
    if (heroDef.isProtagonist) return user?.username ?? t_i18n('heroesPage.defaultHeroName');
    return heroDef.nameKey ? t_i18n(heroDef.nameKey) : heroDef.name;
  };

  const getMeterHeroName = (heroId: number, rawName: string): string => {
    if (heroId === GameEngine.WALL_METER_ID) return t_i18n('game.wallLabel');
    const hero = coopState?.heroes.find(h => h.id === heroId);
    if (!hero) return rawName;
    if ((hero as any).nameKey) return t_i18n((hero as any).nameKey);
    if (hero.raceName) {
      const race = getTranslatedRace(hero.raceName, t_i18n);
      const roleTitle = hero.role === 'tank'
        ? t_i18n('aiGame.roleTitle.tank')
        : hero.role === 'healer'
        ? t_i18n('aiGame.roleTitle.healer')
        : t_i18n('aiGame.roleTitle.other');
      return `${race} ${roleTitle}`;
    }
    return rawName;
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

  tRef.current = t;
  const { setLocked, setPaused, setInfiniteMode, setInfiniteSaveCallback } = useGameLock();

  const [activeTab, setActiveTab] = useState<TabType>('party');
  const [showNormalNames, setShowNormalNames] = useState(false);
  const [meterTab, setMeterTab] = useState<'damage' | 'healing' | 'taken'>('damage');
  const [pendingTabPath, setPendingTabPath] = useState<TabType | null>(null);
  // ── AI 무한모드 진척도 ──────────────────────────────────────────
  const [aiBestWave, setAiBestWave] = useState(0);
  const aiBestWaveRef = useRef(0);
  const [aiDeathWave, setAiDeathWave] = useState(0);
  const [aiStartWave, setAiStartWave] = useState(1);
  const [aiHeroGranted, setAiHeroGranted] = useState(false);
  const [protagonistAISave, setProtagonistAISave] = useState<ReturnType<typeof loadProtagonistAISave> | null>(null);
  const [protagonistDefSave, setProtagonistDefSave] = useState<any>(null);
  const [protagonistOffSave, setProtagonistOffSave] = useState<any>(null);
  const [protagonistRaidSave, setProtagonistRaidSave] = useState<any>(null);
  // ── 레이드 무한모드 진척도 ─────────────────────────────────────
  const [raidBestWave, setRaidBestWave] = useState(0);
  const raidBestWaveRef = useRef(0);
  const [raidDeathWave, setRaidDeathWave] = useState(0);
  const [raidStartWave, setRaidStartWave] = useState(1);
  const [raidHeroGranted, setRaidHeroGranted] = useState(false);
  // ── 레이드 스테이지 모드 ────────────────────────────────────────────────
  const [raidSubMode, setRaidSubMode] = useState<'stage' | 'infinite'>('stage');
  const [selectedRaidStageIdx, setSelectedRaidStageIdx] = useState<number>(0);
  const [raidStageProgress, setRaidStageProgress] = useState<RaidStageProgress>({});
  const [raidStageClearToast, setRaidStageClearToast] = useState<string | null>(null);
  // activeTab ref (콜백 내에서 최신값 접근용)
  const activeTabRef = useRef<TabType>('party');

  // ── Shared game settings ────────────────────────────────────────────────
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [maxWave, setMaxWave] = useState(20);
  const [aiStrategy1, setAiStrategy1] = useState<string | number>(0);
  const [aiStrategy2, setAiStrategy2] = useState<string | number>(1);
  const [aiStrategy3, setAiStrategy3] = useState<string | number>(2);

  // ── Hero builder state ──────────────────────────────────────────────────
  const [selectedHeroIds, setSelectedHeroIds] = useState<string[]>([]);
  const [ownedHeroIds, setOwnedHeroIds] = useState<string[]>(['protagonist']);
  const [heroSaveData, setHeroSaveData] = useState<
    Record<string, { starRating: number; activeRouteId: string; equippedSkillIds: string[] }>
  >({});
  const [protagonistSave, setProtagonistSave] = useState<ReturnType<typeof loadProtagonistSave> | null>(null);
  const [userGold, setUserGold] = useState(0);

  // ── Faction system state ───────────────────────────────────────────────
  const [factionStars, setFactionStars] = useState<Record<string, number>>({});
  const [unlockedFactionIds, setUnlockedFactionIds] = useState<string[]>([]);
  const [upgradeableFactionIds, setUpgradeableFactionIds] = useState<string[]>([]);

  // ── 이탈 방지 관련 ───────────────────────────────────────────────────────
  const navigationCtx = useContext(NavigationContext);
  const [blockedTx, setBlockedTx] = useState<{ retry: () => void; unblock: () => void } | null>(null);
  const autoPausedRef = useRef(false);
  const gameIsPausedRef = useRef(false);

  useEffect(() => {
    if (!user?.id) return;

    Promise.all([
      api.get('/user/profile'),
      api.get('/user/heroes'),
      api.get('/user/owned-heroes'),
    ]).then(([profileRes, heroesRes, ownedRes]) => {
      const dbProfile = profileRes.data;
      setUserGold(dbProfile.gold);
      const dbHeroList = heroesRes.data;
      const dbOwnedIds: string[] = Array.isArray(ownedRes.data) ? ownedRes.data : [];

      const localProto = loadProtagonistSave(user.id);
      setProtagonistSave(dbProfile.protagonistSave || localProto);
      setProtagonistAISave(loadProtagonistAISave(user.id));
      setProtagonistDefSave(loadProtagonistDefenseSave(user.id));
      setProtagonistOffSave(loadProtagonistOffenseSave(user.id));
      setProtagonistRaidSave(loadProtagonistRaidSave(user.id));

      const savedAIBest = parseInt(localStorage.getItem(`ai_infinite_best_${user.id}`) ?? '0', 10);
      if (!isNaN(savedAIBest) && savedAIBest > 0) {
        setAiBestWave(savedAIBest);
        aiBestWaveRef.current = savedAIBest;
        if (savedAIBest >= 25) setAiStartWave(Math.floor(savedAIBest / 25) * 25);
      }
      const savedRaidBest = parseInt(localStorage.getItem(`raid_infinite_best_${user.id}`) ?? '0', 10);
      if (!isNaN(savedRaidBest) && savedRaidBest > 0) {
        setRaidBestWave(savedRaidBest);
        raidBestWaveRef.current = savedRaidBest;
        if (savedRaidBest >= 25) setRaidStartWave(Math.floor(savedRaidBest / 25) * 25);
      }
      setRaidStageProgress(loadRaidStageProgress(user.id));

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
        finalHeroSaveData[heroDef.id] = {
          starRating: s?.starRating ?? 1,
          activeRouteId: s?.activeRouteId ?? heroDef.classRoutes[0].id,
          equippedSkillIds: s?.equippedSkillIds ?? [],
        };
      }
      setHeroSaveData(finalHeroSaveData);

      const initialSelection = HERO_DEFINITIONS
        .filter(h => ownedIds.includes(h.id))
        .slice(0, 5)
        .map(h => h.id);
      setSelectedHeroIds(initialSelection);

      setFactionStars(loadAIFactionStars(user.id));
      
      try {
        const rawStages = localStorage.getItem(`offense_stages_${user.id}`);
        if (rawStages) {
          const progress = JSON.parse(rawStages);
          const unlocked: string[] = [];
          const upgradeable: string[] = [];
          for (const faction of AI_FACTIONS) {
            const region = REGIONS.find(r => r.id === faction.regionId);
            if (!region) continue;
            // 일반 클리어: 모든 스테이지 normal 클리어 → 용병단 해금
            if (region.stages.every(s => progress[s.id]?.normal)) {
              unlocked.push(faction.id);
            }
            // 정예 클리어: 하나 이상의 스테이지 elite 클리어 → 레벨업 가능
            if (region.stages.some(s => progress[s.id]?.elite)) {
              upgradeable.push(faction.id);
            }
          }
          setUnlockedFactionIds(unlocked);
          setUpgradeableFactionIds(upgradeable);
        }
      } catch (e) {
        console.error('Failed to parse offense progress', e);
      }
    }).catch(err => {
      console.error('Failed to load hero data for AI game', err);
    });
  }, [user?.id]);

  const toggleHero = (heroId: string) => {
    setSelectedHeroIds(prev => {
      if (prev.includes(heroId)) {
        return prev.length > 1 ? prev.filter(id => id !== heroId) : prev;
      }
      if (prev.length >= 5) return prev;
      return [...prev, heroId];
    });
  };

  const handleUpgradeFaction = (factionId: string) => {
    if (!user?.id) return;
    const currentStars = factionStars[factionId] || 1;
    if (currentStars >= 5) return;

    const costs = [0, 500, 1000, 2500, 6000];
    const cost = costs[currentStars];

    if (userGold < cost) {
      alert(t?.shop?.notEnoughGold || 'Not enough gold!');
      return;
    }

    const factionName = AI_FACTIONS.find(f => f.id === factionId)?.name || '';
    const confirmMsg = (t?.aiGame?.upgradeConfirm || 'Upgrade {name} to {star}★?\nCost: {cost}G')
      .replace('{name}', factionName)
      .replace('{star}', String(currentStars + 1))
      .replace('{cost}', cost.toLocaleString());
    if (window.confirm(confirmMsg)) {
      api.post('/user/gold', { delta: -cost }).then(() => {
        const newStars = { ...factionStars, [factionId]: currentStars + 1 };
        setFactionStars(newStars);
        saveAIFactionStars(user.id, newStars);
        setUserGold(prev => prev - cost);
      });
    }
  };

  const coopEngineRef = useRef<GameEngine | null>(null);
  const coopRendererRef = useRef<Renderer | null>(null);
  const prevAliveMonsterIdsRef = useRef<Map<number, string>>(new Map());
  const [coopState, setCoopState] = useState<GameState | null>(null);
  const [coopStarted, setCoopStarted] = useState(false);
  const coopGoldSaved = useRef(false);
  const [savedGoldToast, setSavedGoldToast] = useState<number | null>(null);

  const isGameActive = coopStarted && !!coopState && coopState.phase !== 'victory' && coopState.phase !== 'defeat';

  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);

  useEffect(() => {
    setLocked(isGameActive);
    return () => setLocked(false);
  }, [isGameActive, setLocked]);

  useEffect(() => {
    setPaused(!!coopState?.isPaused);
    gameIsPausedRef.current = !!coopState?.isPaused;
  }, [coopState?.isPaused, setPaused]);

  // AI 무한모드: GameLockContext에 무한모드 등록
  useEffect(() => {
    const isInf = isGameActive && maxWave === 1000;
    setInfiniteMode(isInf);
    setInfiniteSaveCallback(isInf ? handleAIInfiniteSaveAndExit : null);
    return () => { setInfiniteMode(false); setInfiniteSaveCallback(null); };
  }, [isGameActive, maxWave]); // eslint-disable-line react-hooks/exhaustive-deps

  // 무한모드: 25웨이브마다 자동 저장 (파티/레이드 분기)
  useEffect(() => {
    if (!coopState || maxWave !== 1000 || !user?.id) return;
    const wave = coopState.currentWave;
    if (wave <= 0 || wave % 25 !== 0) return;
    const isRaid = activeTabRef.current === 'raid';
    const bestRef = isRaid ? raidBestWaveRef : aiBestWaveRef;
    if (wave > bestRef.current) {
      bestRef.current = wave;
      if (isRaid) { setRaidBestWave(wave); localStorage.setItem(`raid_infinite_best_${user.id}`, String(wave)); }
      else         { setAiBestWave(wave);  localStorage.setItem(`ai_infinite_best_${user.id}`,  String(wave)); }
    }
  }, [coopState?.currentWave]); // eslint-disable-line react-hooks/exhaustive-deps

  // 무한모드: 패배 시 최고 기록 저장 (파티/레이드 분기)
  useEffect(() => {
    if (!coopState || coopState.phase !== 'defeat' || maxWave !== 1000 || !user?.id) return;
    const wave = coopState.currentWave;
    const isRaid = activeTabRef.current === 'raid';
    const bestRef = isRaid ? raidBestWaveRef : aiBestWaveRef;
    if (isRaid) setRaidDeathWave(wave); else setAiDeathWave(wave);
    if (wave > bestRef.current) {
      bestRef.current = wave;
      if (isRaid) { setRaidBestWave(wave); localStorage.setItem(`raid_infinite_best_${user.id}`, String(wave)); }
      else         { setAiBestWave(wave);  localStorage.setItem(`ai_infinite_best_${user.id}`,  String(wave)); }
    }
  }, [coopState?.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // 무한모드: 1000웨이브 클리어 → 용사 지급 (파티: AI용사 / 레이드: 레이드용사)
  useEffect(() => {
    if (!coopState || coopState.phase !== 'victory' || maxWave !== 1000 || !user?.id) return;
    const isRaid = activeTabRef.current === 'raid';
    const heroId = isRaid ? 'protagonist_raid' : 'protagonist_ai';
    const owned = loadOwnedHeroes(user.id);
    if (!owned.includes(heroId)) {
      saveOwnedHeroes(user.id, [...owned, heroId]);
      api.post('/user/claim-milestone-hero', { milestoneType: heroId }).catch(() => {});
      if (isRaid) setRaidHeroGranted(true); else setAiHeroGranted(true);
    }
  }, [coopState?.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // 레이드 스테이지 모드: 클리어 시 진척도 저장 + 토스트
  useEffect(() => {
    if (!coopState || coopState.phase !== 'victory' || !user?.id) return;
    if (activeTabRef.current !== 'raid' || raidSubMode !== 'stage') return;
    const bossName = RAID_WAVE_SCHEDULE[selectedRaidStageIdx]?.bosses
      .map(id => { const b = RAID_BOSSES.find(b => b.id === id); return (t.game.bosses as any)?.[id]?.name ?? b?.displayName ?? id; })
      .join(' + ') ?? '';
    const updated = saveRaidStageProgress(user.id, selectedRaidStageIdx, raidStageProgress);
    setRaidStageProgress(updated);
    setRaidStageClearToast(t_i18n('game.raidStageClear', { n: selectedRaidStageIdx + 1, boss: bossName }));
    setTimeout(() => setRaidStageClearToast(null), 4000);
  }, [coopState?.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isGameActive) return;
    const nav = navigationCtx.navigator as any;
    if (typeof nav.block !== 'function') return;
    const unblock = nav.block((tx: { retry: () => void }) => {
      if (!gameIsPausedRef.current && coopEngineRef.current) {
        coopEngineRef.current.togglePause();
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

  const handleContinuePlay = useCallback(() => {
    if (autoPausedRef.current && coopEngineRef.current) {
      coopEngineRef.current.togglePause();
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

  const coopCanvasCallback = useCallback((node: HTMLCanvasElement | null) => {
    if (node) coopRendererRef.current = new Renderer(node);
    else coopRendererRef.current = null;
  }, []);

  useEffect(() => {
    if (activeTab === 'pvp' || activeTab === 'factions') return;
    let rafId: number;
    const loop = () => {
      if (coopRendererRef.current) {
        coopRendererRef.current.showNormalMonsterNames = showNormalNames;
        coopRendererRef.current.wallLabel = tRef.current.game.wallLabel;
        coopRendererRef.current.wall2Label = tRef.current.game.wall2Label;
        coopRendererRef.current.wall3Label = tRef.current.game.wall3Label;
        coopRendererRef.current.affixEnrageLabel = '[' + tRef.current.game.affixEnrage + ']';
        coopRendererRef.current.affixHealAuraLabel = '[' + tRef.current.game.affixHealAura + ']';
        coopRendererRef.current.affixSummonLabel = '[' + tRef.current.game.affixSummon + ']';
        coopRendererRef.current.affixAoeSlamLabel = '[' + tRef.current.game.affixAoeSlam + ']';
        coopRendererRef.current.t_i18n = t_i18n;
        coopRendererRef.current.monsterNameMap = (tRef.current as any).monsters ?? {};
        coopRendererRef.current.heroNameFn = (hero) => {
          if ((hero as any).nameKey) return t_i18n((hero as any).nameKey);
          if (hero.raceName) {
            const race = getTranslatedRace(hero.raceName, t_i18n);
            const roleTitle = hero.role === 'tank'
              ? t_i18n('aiGame.roleTitle.tank')
              : hero.role === 'healer'
              ? t_i18n('aiGame.roleTitle.healer')
              : t_i18n('aiGame.roleTitle.other');
            return `${race} ${roleTitle}`;
          }
          return hero.name;
        };
      }
      if (coopRendererRef.current && coopEngineRef.current) {
        coopRendererRef.current.render(coopEngineRef.current.state, coopEngineRef.current.damageNumbers, coopEngineRef.current.explosions);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [activeTab, showNormalNames]);

  useEffect(() => {
    return () => {
      coopEngineRef.current?.stop();
      coopEngineRef.current = null;
    };
  }, [activeTab]);

  useEffect(() => {
    if (!coopState || !user?.id) return;
    if (coopState.phase !== 'victory' && coopState.phase !== 'defeat') return;
    if (coopGoldSaved.current) return;
    coopGoldSaved.current = true;
    api.post('/leaderboard/record', { wave: coopState.currentWave, score: coopState.score, cleared: coopState.phase === 'victory', goldEarned: coopState.goldEarned }).catch(() => {});
    if (coopState.goldEarned > 0) {
      api.post('/user/gold', { delta: coopState.goldEarned }).then(() => {
        setSavedGoldToast(coopState.goldEarned);
        setUserGold(prev => prev + coopState.goldEarned);
        setTimeout(() => setSavedGoldToast(null), 4000);
      }).catch(() => {});
    }
  }, [coopState?.phase, user?.id]);

  const handleCoopStateChange = useCallback(() => {
    if (!coopEngineRef.current) return;
    const newState = coopEngineRef.current.state;
    if (user?.id) {
      for (const monster of newState.monsters) {
        if (!monster.isAlive && prevAliveMonsterIdsRef.current.has(monster.id)) {
          addMonsterKill(user.id, monster.name);
          prevAliveMonsterIdsRef.current.delete(monster.id);
        } else if (monster.isAlive) {
          prevAliveMonsterIdsRef.current.set(monster.id, monster.name);
        }
      }
    }
    setCoopState({ ...newState });
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCoopStart = () => {
    if (selectedHeroIds.length === 0) return;
    const playerHeroes = selectedHeroIds.map(id => HERO_DEFINITIONS.find(h => h.id === id)).filter((h): h is HeroDefinition => !!h).map(hero => {
      const isAIProt = hero.id === 'protagonist_ai';
      const isDefProt = hero.id === 'protagonist_defense';
      const star = isAIProt ? (protagonistAISave?.starRating ?? 1) : (hero.isProtagonist && protagonistSave) ? protagonistSave.starRating : (heroSaveData[hero.id]?.starRating ?? 1);
      const isUnsealed = (!hero.isProtagonist && !isDefProt && !isAIProt && (heroSaveData[hero.id] as any)?.isUnsealed) || false;
      const skillIds = isAIProt ? (protagonistAISave?.equippedSkillIds ?? []) : (hero.isProtagonist && protagonistSave) ? (protagonistSave.equippedSkillIds ?? []) : (heroSaveData[hero.id]?.equippedSkillIds ?? []);
      const routeId = heroSaveData[hero.id]?.activeRouteId ?? hero.classRoutes[0].id;
      const partial = heroDefToPartialGameHero(hero, star, routeId, skillIds, isUnsealed);
      if (isAIProt && protagonistAISave) partial.role = protagonistAISave.selectedRole as any;
      return partial;
    });
    const stripGameHero = (heroes: GameHero[]): Omit<GameHero, 'id' | 'position'>[] => heroes.map(({ id: _id, position: _pos, ...rest }) => rest);
    const getAIStar = (sid: string | number) => typeof sid === 'string' ? factionStars[sid] || 1 : 1;
    
    const aiHeroes1 = stripGameHero(createAIHeroes(aiStrategy1, getAIStar(aiStrategy1)));

    let customHeroes: Omit<GameHero, 'id' | 'position'>[];
    let playerCount: number;
    if (activeTab === 'party') {
      customHeroes = [...playerHeroes, ...aiHeroes1];
      playerCount = 2;
    }
    else {
      // 레이드: 플레이어 + AI 3팀 = 최대 20명
      const aiHeroes2 = stripGameHero(createAIHeroes(aiStrategy2, getAIStar(aiStrategy2)));
      const aiHeroes3 = stripGameHero(createAIHeroes(aiStrategy3, getAIStar(aiStrategy3)));
      customHeroes = [...playerHeroes, ...aiHeroes1, ...aiHeroes2, ...aiHeroes3];
      playerCount = 4;
    }
    coopEngineRef.current?.stop();
    prevAliveMonsterIdsRef.current.clear();
    coopGoldSaved.current = false;
    setSavedGoldToast(null);
    const isAIInfinite = maxWave === 1000;
    const isRaidStageMode = activeTab === 'raid' && raidSubMode === 'stage';
    // 레이드 스테이지 모드: 선택한 스테이지의 보스 1웨이브만 진행
    const raidStageWaveNum = RAID_WAVE_SCHEDULE[selectedRaidStageIdx]?.wave ?? 1;
    const raidStageGen = isRaidStageMode
      ? ((_: number) => makeRaidWaveGenerator(difficulty)(raidStageWaveNum))
      : undefined;
    const options: GameOptions = {
      difficulty: isAIInfinite ? 'normal' : difficulty,
      maxWave: isRaidStageMode ? 1 : maxWave,
      customHeroes,
      playerCount,
      wallTalents: user?.id ? loadWallTalents(user.id) : undefined,
      manghongu: user?.id ? loadManghonguSave(user.id) : undefined,
      ...(isAIInfinite && { waveGenerator: makeAIInfiniteWaveGenerator() }),
      ...(isRaidStageMode && { waveGenerator: raidStageGen }),
      ...(activeTab === 'raid' && !isAIInfinite && !isRaidStageMode && { waveGenerator: makeRaidWaveGenerator(difficulty) }),
      ...(isAIInfinite && activeTab === 'party' && aiStartWave > 1 && { startFromWave: aiStartWave }),
      ...(isAIInfinite && activeTab === 'raid' && raidStartWave > 1 && { startFromWave: raidStartWave }),
      ...(activeTab === 'raid' && { noWall: true }),
    };
    if (isAIInfinite) {
      coopGoldSaved.current = false;
      if (activeTab === 'party') setAiDeathWave(0);
      else setRaidDeathWave(0);
    }
    coopEngineRef.current = new GameEngine(handleCoopStateChange, options);
    setCoopState({ ...coopEngineRef.current.state });
    coopEngineRef.current.start();
    if (coopRendererRef.current) coopRendererRef.current.noWall = activeTab === 'raid';
    setCoopStarted(true);
  };

  const doAIInfiniteSave = useCallback(async () => {
    const liveState = coopEngineRef.current?.state ?? coopState;
    if (liveState && user?.id) {
      const wave = liveState.currentWave;
      const isRaid = activeTabRef.current === 'raid';
      const bestRef = isRaid ? raidBestWaveRef : aiBestWaveRef;
      if (wave > bestRef.current) {
        bestRef.current = wave;
        if (isRaid) { setRaidBestWave(wave); localStorage.setItem(`raid_infinite_best_${user.id}`, String(wave)); }
        else         { setAiBestWave(wave);  localStorage.setItem(`ai_infinite_best_${user.id}`,  String(wave)); }
      }
      if (!coopGoldSaved.current && liveState.goldEarned > 0) {
        coopGoldSaved.current = true;
        await Promise.race([
          api.post('/user/gold', { delta: liveState.goldEarned }).catch(() => {}),
          new Promise<void>(resolve => setTimeout(resolve, 5000)),
        ]);
      }
    }
  }, [coopState, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCoopReset = () => { coopEngineRef.current?.stop(); coopEngineRef.current = null; setCoopState(null); setCoopStarted(false); coopGoldSaved.current = false; setSavedGoldToast(null); if (coopRendererRef.current) coopRendererRef.current.noWall = false; setAiDeathWave(0); setRaidDeathWave(0); };

  const handleAIInfiniteSaveAndExit = useCallback(async (targetPath: string) => {
    await doAIInfiniteSave();
    if (targetPath === '/ai-game') {
      handleCoopReset();
    }
    // else: navigate는 Layout이 처리
  }, [doAIInfiniteSave]); // eslint-disable-line react-hooks/exhaustive-deps
  const switchTab = (tab: TabType) => {
    if (tab === activeTab) return;
    if (isGameActive) {
      if (!coopState?.isPaused) return; // 진행 중 + 미정지: 완전 차단
      setPendingTabPath(tab); // 진행 중 + 일시정지: 확인 모달
      return;
    }
    handleCoopReset();
    setActiveTab(tab);
  };
  const difficultyLabel = (d: Difficulty) => d === 'easy' ? t.game.easy : d === 'hard' ? t.game.hard : t.game.normal;
  const phaseLabel = (phase: string) => phase === 'victory' ? t.game.victory : phase === 'defeat' ? t.game.defeat : phase === 'wave' ? t.game.fighting : t.game.preparing;
  const isCoopTab = activeTab === 'party' || activeTab === 'raid';

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {raidStageClearToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-2xl text-base animate-bounce">
          {raidStageClearToast}
        </div>
      )}
      {blockedTx && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 border border-red-600 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-red-400 mb-2">⚠ {t.game.exitConfirmTitle}</h3>
            <p className="text-gray-300 text-sm mb-4 whitespace-pre-line">{t.game.exitConfirmDescNormal}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={handleContinuePlay} className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 text-sm">{t.game.continuePlay}</button>
              <button onClick={handleLeaveGame} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-bold">{t.game.exitGame}</button>
            </div>
          </div>
        </div>
      )}

      {/* 탭 전환 확인 모달 (일시정지 상태에서 다른 탭 클릭 시) */}
      {pendingTabPath && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 border border-red-600 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-red-400 mb-2">⚠ {t.game.exitConfirmTitle}</h3>
            <p className="text-gray-300 text-sm mb-4 whitespace-pre-line">{t.game.exitConfirmDescTabSwitch}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setPendingTabPath(null)} className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 text-sm">{t.game.continuePlay}</button>
              <button onClick={() => { const tab = pendingTabPath; setPendingTabPath(null); handleCoopReset(); setActiveTab(tab); }} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-bold">{t.game.switchTab}</button>
            </div>
          </div>
        </div>
      )}
      {savedGoldToast !== null && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-950 border border-yellow-500 text-yellow-300 px-4 py-3 rounded shadow-lg text-sm flex items-center gap-2">
          <span>💰</span>
          <div><div className="font-bold">{t.game.goldSavedTitle}</div><div><span className="text-yellow-400 font-bold">+{savedGoldToast.toLocaleString()}G</span> {t.game.goldSavedApplied}</div></div>
          <button onClick={() => setSavedGoldToast(null)} className="ml-2 text-yellow-400 hover:text-yellow-200">✕</button>
        </div>
      )}
      <div className="mb-4 flex justify-between items-end">
        <div><h1 className="text-2xl font-bold text-purple-400">{t.aiGame.title}</h1><p className="text-sm text-gray-400">{t.aiGame.subtitle}</p></div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-3">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t.aiGame.ownedGold}</span>
          <span className="text-lg font-black text-yellow-400">{userGold.toLocaleString()}<span className="text-xs ml-1">G</span></span>
        </div>
      </div>
      <div className="flex gap-1 mb-4 border-b border-gray-700">
        {([
          { key: 'party', label: t.aiGame.tabAiParty, desc: t.aiGame.tabDescParty },
          { key: 'raid', label: t.aiGame.tabAiRaid, desc: t.aiGame.tabDescRaid },
          { key: 'factions', label: t.aiGame.tabMercenary, desc: t.aiGame.tabDescFactions },
          { key: 'pvp', label: t.aiGame.tabPvp, desc: t.aiGame.tabDescPvp }
        ] as any[]).map(({ key, label, desc }) => {
          const isActive = activeTab === key;
          const isBlocked = isGameActive && !coopState?.isPaused && !isActive;
          const tabCls = isActive
            ? 'bg-gray-800 text-purple-400 border-t border-l border-r border-gray-600 -mb-px'
            : isBlocked
            ? 'text-gray-600 cursor-not-allowed select-none'
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50';
          return (
            <button
              key={key}
              onClick={() => switchTab(key)}
              title={isBlocked ? t.game.exitConfirmTabBlocked : undefined}
              className={`px-5 py-2.5 rounded-t text-sm font-bold transition-colors flex flex-col items-center leading-tight ${tabCls}`}
            >
              <span>{label}</span><span className="text-[10px] font-normal opacity-70">{desc}</span>
            </button>
          );
        })}
      </div>
      {activeTab === 'factions' && (
        <div className="space-y-6">
          <div className="card p-4 bg-purple-900/10 border-purple-500/30">
            <h2 className="text-lg font-bold text-purple-300 mb-1">{t.aiGame.mercenaryTitle}</h2>
            <p className="text-sm text-gray-400">{t.aiGame.mercenaryDesc}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_FACTIONS.map(faction => {
              const isUnlocked = unlockedFactionIds.includes(faction.id);
              const isUpgradeable = upgradeableFactionIds.includes(faction.id);
              const stars = factionStars[faction.id] || 1;
              const nextCost = [0, 500, 1000, 2500, 6000][stars] || 0;
              const regionName = t_i18n('offense.regions.' + faction.regionId + '.name') || REGIONS.find(r => r.id === faction.regionId)?.name || '?';
              return (
                <div key={faction.id} className={`card overflow-hidden border-2 transition-all ${isUnlocked ? 'border-gray-700 bg-gray-800/80' : 'border-gray-800 bg-gray-900/50 opacity-60'}`}>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div><h3 className={`font-bold text-base ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>{faction.nameKey ? t_i18n(faction.nameKey) : faction.name}</h3><div className="text-[10px] text-gray-500 uppercase tracking-tighter">{(t.aiGame.factionRace ?? 'Race: {race}').replace('{race}', getTranslatedRace(faction.race, t_i18n))}</div></div>
                      {isUnlocked ? <div className="flex gap-0.5 text-yellow-400 text-sm">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</div> : <span className="text-xl">🔒</span>}
                    </div>
                    {!isUnlocked ? <div className="py-4 text-center"><div className="text-xs text-red-400 font-bold mb-1">{t.aiGame.factionUnlockTitle}</div><div className="text-[11px] text-gray-400">{(t.aiGame.factionUnlockDesc ?? '[{region}]').replace('{region}', regionName)}</div></div> : (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-black/30 rounded p-2 text-center"><div className="text-[9px] text-gray-500 mb-0.5">{t.aiGame.factionStatMult}</div><div className="text-sm font-black text-cyan-400">x{STAR_MULT[stars-1].toFixed(2)}</div></div>
                          <div className="bg-black/30 rounded p-2 text-center"><div className="text-[9px] text-gray-500 mb-0.5">{t.aiGame.factionBonusDef}</div><div className="text-sm font-black text-green-400">+{((stars-1)*5)}%</div></div>
                        </div>
                        {stars < 5 ? (
                          isUpgradeable ? (
                            <button onClick={() => handleUpgradeFaction(faction.id)} disabled={userGold < nextCost} className="w-full py-2 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-700 disabled:opacity-50 text-black font-bold rounded-lg text-xs transition-all flex justify-between px-4 items-center">
                              <span>{(t.aiGame.factionUpgrade ?? '{star}★ → {star2}★').replace('{star}', String(stars)).replace('{star2}', String(stars + 1))}</span><span className="bg-black/20 px-2 py-0.5 rounded">{nextCost.toLocaleString()}G</span>
                            </button>
                          ) : (
                            <div className="w-full py-2 bg-gray-800/60 text-gray-500 rounded-lg text-xs text-center border border-gray-700/50">
                              {t.aiGame.factionUpgradeLocked}
                            </div>
                          )
                        ) : <div className="w-full py-2 bg-purple-900/40 text-purple-300 font-bold rounded-lg text-xs text-center border border-purple-500/30">{t.aiGame.factionMaxed}</div>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* AI 무한 1000층 완주 보상 모달 */}
      {aiHeroGranted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-in fade-in duration-500">
          <div className="relative max-w-sm w-full bg-gray-900 border-2 border-purple-500 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(168,85,247,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-2">{t.aiGame.ai1000Title}</div>
              <h2 className="text-3xl font-black text-white mb-6">{t.aiGame.ai1000Subtitle}</h2>
              <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-purple-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-500" />
                <div className="text-5xl mb-3">🤖</div>
                <div className="text-2xl font-bold text-purple-400 mb-1">{t.aiGame.ai1000HeroName}</div>
                <div className="text-sm text-gray-400 mb-3">{t.aiGame.ai1000HeroRace}</div>
                <div className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-400 text-xs font-bold uppercase mb-3">SSR GRADE</div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.aiGame.ai1000Skills}<br/><span className="text-purple-300 font-bold">{t.aiGame.ai1000Buff}</span></p>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {t.aiGame.ai1000Flavor}<br/>
                <span className="text-white font-semibold">{t.aiGame.ai1000Joined}</span>
              </p>
              <button onClick={() => setAiHeroGranted(false)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-lg transition-colors">
                {t.aiGame.confirm ?? t.offense?.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 레이드 무한 1000층 완주 → 레이드 용사 지급 모달 */}
      {raidHeroGranted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-in fade-in duration-500">
          <div className="relative max-w-sm w-full bg-gray-900 border-2 border-emerald-500 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-emerald-400 text-sm font-bold tracking-widest uppercase mb-2">{t.aiGame.raid1000Title}</div>
              <h2 className="text-3xl font-black text-white mb-6">{t.aiGame.raid1000Subtitle}</h2>
              <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-emerald-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
                <div className="text-5xl mb-3">🐉</div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">{t.aiGame.raid1000HeroName}</div>
                <div className="text-sm text-gray-400 mb-3">{t.aiGame.raid1000HeroRace}</div>
                <div className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-400 text-xs font-bold uppercase mb-3">SSR GRADE</div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.aiGame.ai1000Skills}<br/><span className="text-emerald-300 font-bold">{t.aiGame.raid1000Buff}</span></p>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {t.aiGame.raid1000Flavor}<br/>
                <span className="text-white font-semibold">{t.aiGame.raid1000Joined}</span>
              </p>
              <button onClick={() => setRaidHeroGranted(false)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-lg transition-colors">
                {t.aiGame.confirm ?? t.offense?.confirm}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pvp' && (
        <div className="card p-16 text-center">
          <div className="text-5xl mb-4">🆚</div><h2 className="text-xl font-bold text-gray-300 mb-2">{t.aiGame.pvpTitle}</h2>
          <p className="text-gray-500 text-sm" style={{ whiteSpace: 'pre-line' }}>{t.aiGame.pvpDesc}</p>
        </div>
      )}
      {isCoopTab && (
        <div>
          {!coopStarted && activeTab === 'raid' && (
            <div className="mb-4">
              {/* 서브모드 토글 */}
              <div className="flex gap-2 mb-3">
                {(['stage', 'infinite'] as const).map(mode => (
                  <button key={mode} onClick={() => setRaidSubMode(mode)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors border ${raidSubMode === mode ? 'bg-emerald-700 border-emerald-500 text-white' : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-400'}`}>
                    {mode === 'stage' ? t.game.raidStageMode : t.game.raidInfiniteMode}
                  </button>
                ))}
              </div>

              {raidSubMode === 'stage' && (
                <div>
                  {/* 스테이지 그리드 */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-3">
                    {RAID_WAVE_SCHEDULE.map((schedule, idx) => {
                      const cleared = !!raidStageProgress[idx];
                      const unlocked = isRaidStageUnlocked(idx, raidStageProgress);
                      const selected = selectedRaidStageIdx === idx;
                      const bossDefs = schedule.bosses.map(id => RAID_BOSSES.find(b => b.id === id)).filter(Boolean);
                      const primaryBoss = bossDefs[0];
                      return (
                        <button key={idx}
                          disabled={!unlocked}
                          onClick={() => unlocked && setSelectedRaidStageIdx(idx)}
                          className={`relative p-2.5 rounded-lg border-2 text-left transition-all ${
                            !unlocked ? 'border-gray-800 bg-gray-900/40 opacity-50 cursor-not-allowed' :
                            selected ? 'border-emerald-500 bg-emerald-900/30 shadow-lg shadow-emerald-900/30' :
                            cleared ? 'border-yellow-700/60 bg-yellow-900/10 hover:border-yellow-500' :
                            'border-gray-700 bg-gray-800/50 hover:border-gray-500'
                          }`}>
                          {/* 클리어 배지 */}
                          {cleared && <span className="absolute top-1 right-1 text-[9px] font-black text-yellow-400">✓</span>}
                          {!unlocked && <span className="absolute top-1 right-1 text-[10px]">🔒</span>}
                          {/* 스테이지 번호 */}
                          <div className={`text-[9px] font-bold mb-0.5 ${selected ? 'text-emerald-400' : 'text-gray-500'}`}>
                            STAGE {idx + 1}
                          </div>
                          {/* 보스 색 도트 + 이름 */}
                          <div className="flex items-center gap-1 mb-1 flex-wrap">
                            {bossDefs.map((b, bi) => b && (
                              <span key={bi} className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: b.color }} />
                            ))}
                          </div>
                          <div className="text-[10px] font-bold text-white leading-tight truncate">
                            {bossDefs.map(b => b && ((t.game.bosses as any)?.[b.id]?.name ?? b.displayName)).join(' + ')}
                          </div>
                          {/* 특수 메커니즘 배지 */}
                          {primaryBoss?.ironSkin && (
                            <div className="mt-1 text-[8px] px-1 py-0.5 rounded bg-purple-900/60 text-purple-300 inline-block">{t.game.affixIronSkin}</div>
                          )}
                          {bossDefs.length > 1 && (
                            <div className="mt-1 text-[8px] px-1 py-0.5 rounded bg-red-900/60 text-red-300 inline-block">{(t.game.raidSimultaneous ?? '{n} simultaneous').replace('{n}', String(bossDefs.length))}</div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* 선택된 스테이지 상세 */}
                  {(() => {
                    const schedule = RAID_WAVE_SCHEDULE[selectedRaidStageIdx];
                    const bossDefs = schedule.bosses.map(id => RAID_BOSSES.find(b => b.id === id)).filter(Boolean);
                    const primaryBoss = bossDefs[0];
                    if (!primaryBoss) return null;
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="card p-3 border" style={{ borderColor: `${primaryBoss.color}44`, backgroundColor: `${primaryBoss.color}08` }}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: primaryBoss.color }} />
                            <div className="text-xs font-black text-white">{bossDefs.map(b => b && ((t.game.bosses as any)?.[b.id]?.name ?? b.displayName)).join(' + ')}</div>
                            <span className="ml-auto text-[9px] text-gray-500">W{schedule.wave}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 leading-relaxed mb-2 italic">"{primaryBoss.lore}"</p>
                          <div className="grid grid-cols-3 gap-1 text-[9px]">
                            <div className="bg-black/30 rounded px-1.5 py-1 text-center"><div className="text-gray-500">HP</div><div className="text-white font-bold">{primaryBoss.hp.toLocaleString()}</div></div>
                            <div className="bg-black/30 rounded px-1.5 py-1 text-center"><div className="text-gray-500">ATK</div><div className="text-red-400 font-bold">{primaryBoss.atk}</div></div>
                            <div className="bg-black/30 rounded px-1.5 py-1 text-center"><div className="text-gray-500">{t.game.raidAttackCycle}</div><div className="text-yellow-400 font-bold">{primaryBoss.attackCooldown ?? 1.0}s</div></div>
                          </div>
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {primaryBoss.ironSkin && <span className="text-[8px] px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300">{t.game.affixIronSkin}</span>}
                            {primaryBoss.immuneToCc && <span className="text-[8px] px-1.5 py-0.5 rounded bg-red-900/60 text-red-300">{t.game.affixCcImmune}</span>}
                            {primaryBoss.hasCleave && <span className="text-[8px] px-1.5 py-0.5 rounded bg-orange-900/60 text-orange-300">{t.game.affixCleave}</span>}
                            {primaryBoss.affix === 'enrage' && <span className="text-[8px] px-1.5 py-0.5 rounded bg-yellow-900/60 text-yellow-300">{t.game.affixEnrage}</span>}
                            {primaryBoss.affix === 'heal_aura' && <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-900/60 text-green-300">{t.game.affixHealAura}</span>}
                            {primaryBoss.affix === 'summon' && <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300">{t.game.affixSummon}</span>}
                            {primaryBoss.affix === 'aoe_slam' && <span className="text-[8px] px-1.5 py-0.5 rounded bg-gray-700 text-gray-300">{t.game.affixAoeSlam}</span>}
                          </div>
                        </div>
                        <div className="card p-3 border border-gray-700 bg-gray-800/40 flex flex-col justify-between">
                          <div>
                            <div className="text-[10px] text-gray-400 font-bold mb-2">{primaryBoss.escort ? (t.game.raidEscort ?? 'Escort: {name} ×{count}').replace('{name}', (t.game.bosses as any)?.[primaryBoss.id]?.escort ?? primaryBoss.escort.displayName).replace('{count}', String(primaryBoss.escort.count)) : t.game.raidNoEscort}</div>
                            {primaryBoss.ironSkin && (
                              <div className="space-y-1 text-[10px] mb-2">
                                <div className="flex items-start gap-1.5 bg-red-950/40 border border-red-800/40 rounded px-2 py-1">
                                  <span className="text-red-400">✗</span><span className="text-red-300">{t.game.raidIronSkinBad}</span>
                                </div>
                                <div className="flex items-start gap-1.5 bg-green-950/40 border border-green-800/40 rounded px-2 py-1">
                                  <span className="text-green-400">✓</span><span className="text-green-300">{t.game.raidIronSkinGood1}</span>
                                </div>
                                <div className="flex items-start gap-1.5 bg-blue-950/40 border border-blue-800/40 rounded px-2 py-1">
                                  <span className="text-blue-400">✓</span><span className="text-blue-300">{(t.game.raidIronSkinGood2 ?? 'Healer required — recover {n}s after hit').replace('{n}', String(primaryBoss.attackCooldown))}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          {raidStageProgress[selectedRaidStageIdx] && (
                            <div className="text-[10px] text-yellow-400 font-bold">{t.game.raidClearBadge}</div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {raidSubMode === 'infinite' && (
                <div className="text-xs text-gray-400 bg-gray-900/40 border border-gray-700 rounded p-3">
                  {(() => {
                    const desc = (t.game.raidInfiniteDesc ?? '♾️ {bold}Infinite Mode{/bold}: Select wave count below and start to run the full raid schedule.');
                    const parts = desc.split(/\{bold\}|\{\/bold\}/);
                    return parts.map((p, i) => i === 1 ? <span key={i} className="text-emerald-400 font-bold">{p}</span> : p);
                  })()}
                  {raidBestWave > 0 && <span className="ml-2 text-gray-500"><span className="text-emerald-400 font-bold">{(t.game.raidBestWave ?? 'Best Record: Wave {n}').replace('{n}', String(raidBestWave))}</span></span>}
                </div>
              )}
            </div>
          )}
          {!coopStarted && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="lg:col-span-2 card p-3">
                <div className="flex items-center justify-between mb-2"><h3 className="font-bold text-sm text-gray-200">{t.game.raidMyParty} <span className={`font-normal ${selectedHeroIds.length >= 5 ? 'text-yellow-400' : 'text-gray-400'}`}>({selectedHeroIds.length}/5)</span></h3><span className="text-xs text-gray-500">{t.game.raidPartyHint}</span></div>
                <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-1 max-h-60 overflow-y-auto pr-1">
                  {HERO_DEFINITIONS.filter(h => h.id === 'protagonist' || ownedHeroIds.includes(h.id)).map(hero => {
                    const selected = selectedHeroIds.includes(hero.id); const star = hero.id === 'protagonist' ? (protagonistSave?.starRating ?? 1) : hero.id === 'protagonist_ai' ? (protagonistAISave?.starRating ?? 1) : hero.id === 'protagonist_defense' ? (protagonistDefSave?.starRating ?? 1) : hero.id === 'protagonist_offense' ? (protagonistOffSave?.starRating ?? 1) : hero.id === 'protagonist_raid' ? (protagonistRaidSave?.starRating ?? 1) : (heroSaveData[hero.id]?.starRating ?? 1);
                    return (
                      <button key={hero.id} onClick={() => toggleHero(hero.id)} title={`${getHeroDefName(hero)} (${hero.grade})`} className={`relative p-1 rounded text-center transition-all border overflow-hidden ${selected ? 'border-purple-500 bg-purple-900/40 text-white' : 'border-gray-700 bg-gray-800/60 text-gray-400 hover:border-gray-500'}`}>
                        <div className="w-8 h-10 mx-auto mb-1 rounded bg-gray-900 border border-gray-700 relative overflow-hidden flex items-center justify-center">
                          {hero.portrait ? (
                            <img src={hero.portrait} alt={getHeroDefName(hero)} className="absolute inset-0 w-full h-full object-cover object-top" />
                          ) : HERO_GRAPHIC_IDS.has(hero.id) ? (
                            <div className="absolute inset-0 w-full h-full" style={{ backgroundImage: `url("/graphic/${encodeURIComponent(hero.name)}.png")`, backgroundSize: '183.3% 130%', backgroundPosition: '0% 0%', backgroundRepeat: 'no-repeat' }} />
                          ) : null}
                        </div>
                        <div className="truncate text-[8px] leading-tight font-semibold">{getHeroDefName(hero)}</div><div className="text-yellow-400 text-[8px]">{'★'.repeat(Math.min(star, 3))}{star > 3 ? `+${star - 3}` : ''}</div>
                        {hero.grade !== 'SR' && <span className={`absolute top-0.5 right-0.5 text-[8px] font-bold px-0.5 rounded ${GRADE_COLORS[hero.grade as keyof typeof GRADE_COLORS] ?? 'text-gray-400'}`}>{hero.grade}</span>}
                      </button>
                    );
                  })}
                </div>
                {selectedHeroIds.length > 0 && (
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {selectedHeroIds.map(id => { const hero = HERO_DEFINITIONS.find(h => h.id === id); if (!hero) return null; return <span key={id} className="text-xs px-2 py-0.5 rounded-full border" style={{ backgroundColor: `${ROLE_COLORS[hero.role]}18`, borderColor: `${ROLE_COLORS[hero.role]}44`, color: ROLE_COLORS[hero.role] }}>{ROLE_ICON[hero.role]} {getHeroDefName(hero)}</span>; })}
                  </div>
                )}
                <div className="mt-2 p-2 rounded bg-purple-900/20 border border-purple-800/40 text-xs text-purple-300">
                  {activeTab === 'party'
                    ? `⚔️ ${(t.game.raidPartyCount ?? 'Party: my {me} + AI party 5 = total {total}').replace('{me}', String(selectedHeroIds.length)).replace('{total}', String(selectedHeroIds.length + 5))}`
                    : `🐉 ${(t.game.raidPartyCountRaid ?? 'Raid: my {me} + AI parties 15 = total {total}').replace('{me}', String(selectedHeroIds.length)).replace('{total}', String(selectedHeroIds.length + 15))}`}
                  <span className="ml-2 text-purple-400 font-bold">{activeTab === 'party' ? t.aiGame.partyScaleParty : t.aiGame.partyScaleRaid}</span>
                </div>
              </div>
              <div className="card p-3 space-y-3">
                {maxWave !== 1000 && (
                  <div><label className="block text-xs text-gray-400 mb-1">{t.game.difficulty}</label><div className="flex gap-1">{(['easy', 'normal', 'hard'] as any[]).map(d => <button key={d} onClick={() => setDifficulty(d)} className={`flex-1 py-1.5 rounded text-xs font-medium ${difficulty === d ? (d === 'easy' ? 'bg-green-600' : d === 'hard' ? 'bg-red-600' : 'bg-yellow-600') + ' text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>{difficultyLabel(d)}</button>)}</div></div>
                )}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">{t.game.waves}</label>
                  <div className="flex gap-1">
                    {[10, 20, 30, 1000].map(w => (
                      <button key={w} onClick={() => setMaxWave(w)}
                        className={`flex-1 py-1.5 rounded text-xs font-medium ${maxWave === w ? (w === 1000 ? 'bg-purple-600 text-white' : 'bg-yellow-600 text-white') : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}>
                        {w === 1000 ? (activeTab === 'raid' ? t.aiGame.infiniteRaidLabel : t.aiGame.infinitePartyLabel) : w}
                      </button>
                    ))}
                  </div>
                  {maxWave === 1000 && activeTab === 'party' && (
                    <p className="text-xs text-purple-400 mt-1">{t.aiGame.infinitePartyWarning}</p>
                  )}
                  {maxWave === 1000 && activeTab === 'raid' && (
                    <p className="text-xs text-emerald-400 mt-1">{t.aiGame.infiniteRaidWarning}</p>
                  )}
                  {maxWave === 1000 && activeTab === 'raid' && raidBestWave > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">{(t.game.raidBestWave ?? 'Best: Wave {n}').replace('{n}', String(raidBestWave))} {raidStartWave > 1 && (t.aiGame.resumeHint ?? '').replace('{n}', String(raidStartWave))}</p>
                  )}
                  {maxWave === 1000 && activeTab === 'party' && aiBestWave > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">{(t.game.raidBestWave ?? 'Best: Wave {n}').replace('{n}', String(aiBestWave))}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    {activeTab === 'raid' ? (t.aiGame.companionSelectParty ?? 'AI Companion (Party {n})').replace('{n}', '1') : t.aiGame.companionSelect}
                  </label>
                  <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-1 mb-2">
                    {AI_STRATEGY_KEYS.map((key, i) => <button key={`strat1_${i}`} onClick={() => setAiStrategy1(i)} className={`py-1.5 px-2 rounded text-[11px] text-left flex justify-between ${aiStrategy1 === i ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}><span>💡 {t_i18n(key).split('(')[0].trim()}</span></button>)}
                    {AI_FACTIONS.map(faction => { const isUnlocked = unlockedFactionIds.includes(faction.id); const stars = factionStars[faction.id] || 1; if (!isUnlocked) return null; return <button key={`faction1_${faction.id}`} onClick={() => setAiStrategy1(faction.id)} className={`py-1.5 px-2 rounded text-[11px] text-left flex justify-between items-center ${aiStrategy1 === faction.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}><span>🚩 {faction.nameKey ? t_i18n(faction.nameKey) : faction.name}</span><span className="text-[9px] font-bold text-yellow-400">{'★'.repeat(stars)}</span></button>; })}
                  </div>

                  {activeTab === 'raid' && (
                    <>
                      <label className="block text-xs text-gray-400 mb-1">{(t.aiGame.companionSelectParty ?? 'AI Companion (Party {n})').replace('{n}', '2')}</label>
                      <div className="flex flex-col gap-1 max-h-32 overflow-y-auto pr-1 mb-2">
                        {AI_STRATEGY_KEYS.map((key, i) => <button key={`strat2_${i}`} onClick={() => setAiStrategy2(i)} className={`py-1.5 px-2 rounded text-[11px] text-left flex justify-between ${aiStrategy2 === i ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}><span>💡 {t_i18n(key).split('(')[0].trim()}</span></button>)}
                        {AI_FACTIONS.map(faction => { const isUnlocked = unlockedFactionIds.includes(faction.id); const stars = factionStars[faction.id] || 1; if (!isUnlocked) return null; return <button key={`faction2_${faction.id}`} onClick={() => setAiStrategy2(faction.id)} className={`py-1.5 px-2 rounded text-[11px] text-left flex justify-between items-center ${aiStrategy2 === faction.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}><span>🚩 {faction.nameKey ? t_i18n(faction.nameKey) : faction.name}</span><span className="text-[9px] font-bold text-yellow-400">{'★'.repeat(stars)}</span></button>; })}
                      </div>
                      <label className="block text-xs text-gray-400 mb-1">{(t.aiGame.companionSelectParty ?? 'AI Companion (Party {n})').replace('{n}', '3')}</label>
                      <div className="flex flex-col gap-1 max-h-32 overflow-y-auto pr-1">
                        {AI_STRATEGY_KEYS.map((key, i) => <button key={`strat3_${i}`} onClick={() => setAiStrategy3(i)} className={`py-1.5 px-2 rounded text-[11px] text-left flex justify-between ${aiStrategy3 === i ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}><span>💡 {t_i18n(key).split('(')[0].trim()}</span></button>)}
                        {AI_FACTIONS.map(faction => { const isUnlocked = unlockedFactionIds.includes(faction.id); const stars = factionStars[faction.id] || 1; if (!isUnlocked) return null; return <button key={`faction3_${faction.id}`} onClick={() => setAiStrategy3(faction.id)} className={`py-1.5 px-2 rounded text-[11px] text-left flex justify-between items-center ${aiStrategy3 === faction.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}><span>🚩 {faction.nameKey ? t_i18n(faction.nameKey) : faction.name}</span><span className="text-[9px] font-bold text-yellow-400">{'★'.repeat(stars)}</span></button>; })}
                      </div>
                    </>
                  )}
                </div>
                <button onClick={handleCoopStart} disabled={selectedHeroIds.length === 0} className="w-full btn-primary text-sm py-2.5 font-bold disabled:opacity-50 disabled:cursor-not-allowed">{activeTab === 'party' ? t.aiGame.startPartyBtn : t.aiGame.startRaidBtn}</button>
              </div>
            </div>
          )}
          {coopStarted && (
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              {coopState && (
                <div className="flex gap-4 text-sm"><span className="text-gray-400">{t.aiGame.wave} <span className="text-yellow-400 font-bold">{coopState.currentWave}/{coopState.maxWave === 1000 ? '∞' : coopState.maxWave}</span></span><span className="text-gray-400">{t.aiGame.scoreLabel} <span className="text-blue-400 font-bold">{coopState.score.toLocaleString()}</span></span><span className="text-gray-400">{t.aiGame.goldLabel} <span className="text-yellow-400 font-bold">{coopState.goldEarned}G</span></span><span className={`font-bold ${coopState.phase === 'victory' ? 'text-green-400' : coopState.phase === 'defeat' ? 'text-red-400' : 'text-gray-300'}`}>{phaseLabel(coopState.phase)}</span></div>
              )}
              <div className="flex items-center gap-2">
                <button onClick={() => coopEngineRef.current?.togglePause()} className="btn-secondary text-sm">{coopState?.isPaused ? t.game.resume : t.game.pause}</button>
                <div className="flex gap-1">{[1, 2, 3].map(s => <button key={s} onClick={() => coopEngineRef.current?.setSpeed(s)} className={`px-2 py-1 rounded text-xs ${coopState?.gameSpeed === s ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400'}`}>{s}x</button>)}</div>
                <button onClick={handleCoopReset} className="btn-danger text-sm">{t.game.reset}</button>
              </div>
            </div>
          )}
          {coopStarted && coopState && coopState.synergies.length > 0 && (
            <div className="flex gap-2 mb-2 flex-wrap">{coopState.synergies.map((s, i) => <span key={i} className="text-xs px-2 py-0.5 rounded bg-amber-900/30 border border-amber-700/60 text-amber-300">✨ {s.type === 'race' ? getTranslatedRace(s.name, t_i18n) : getTranslatedElement(s.name, t_i18n)} (T{s.tier})</span>)}</div>
          )}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-4 relative">
            <canvas ref={coopCanvasCallback} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ width: '100%', height: 'auto', display: 'block', imageRendering: 'pixelated' }} />
            <div className="absolute bottom-2 right-2 flex items-center bg-black/60 px-2 py-1 rounded">
              <label className="text-xs text-gray-300 flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={showNormalNames} onChange={e => setShowNormalNames(e.target.checked)} className="w-3 h-3 accent-yellow-500 rounded bg-gray-700 border-gray-600 focus:ring-yellow-500 focus:ring-offset-gray-900" />
                {t.game.showNormalMonsterNames}
              </label>
            </div>
          </div>
          {coopState && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {coopState.heroes.map(hero => {
                const mySummons = (coopState.summons || []).filter(s => s.summonerId === hero.id && s.isAlive);
                return (
                  <div key={hero.id} className="flex flex-col gap-1.5">
                    <div className={`bg-gray-800/90 border-l-4 rounded p-2 transition-opacity ${hero.isAlive ? '' : 'opacity-40'}`} style={{ borderLeftColor: hero.color }}>
                      <div className="flex justify-between items-center mb-1 gap-1"><span className="text-[10px] font-bold text-white truncate">{(hero as any).nameKey ? t_i18n((hero as any).nameKey) : (hero.raceName ? `${getTranslatedRace(hero.raceName, t_i18n)} ${hero.role === 'tank' ? t_i18n('aiGame.roleTitle.tank') : hero.role === 'healer' ? t_i18n('aiGame.roleTitle.healer') : t_i18n('aiGame.roleTitle.other')}` : hero.name)}</span><span className="text-[9px] px-1 rounded bg-black/40 flex-shrink-0" style={{ color: hero.color }}>{ROLE_ICON[hero.role] ?? ''}</span></div>
                      <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden"><div className="h-full transition-all duration-500 ease-out" style={{ width: `${Math.max(0, (hero.hp / hero.maxHp) * 100)}%`, backgroundColor: hero.hp / hero.maxHp > 0.3 ? COLORS.hp_bar_fill : COLORS.hp_bar_low }} /></div>
                      <div className="grid grid-cols-2 gap-x-1 gap-y-0.5 mt-1 text-[8px] text-gray-500 font-mono px-0.5"><div className="flex justify-between"><span>HP</span><span>{Math.max(0, Math.ceil(hero.hp))}</span></div><div className="flex justify-between"><span>ATK</span><span>{hero.atk}</span></div><div className="flex justify-between"><span>ASPD</span><span className="text-yellow-400">{hero.attackCooldown}</span></div><div className="flex justify-between"><span>DPS</span><span className="text-red-400">{Math.round(hero.atk / hero.attackCooldown)}</span></div></div>
                    </div>
                    {mySummons.length > 0 && <div className="space-y-1 pl-1">{mySummons.map(s => <div key={s.id} className="bg-gray-900/60 border border-gray-700/40 rounded px-1.5 py-1 flex items-center gap-2 shadow-sm"><span className="text-[9px] font-black truncate flex-1" style={{ color: s.color }}>{getSummonDisplayName(s.skillId, s.displayName)}</span><div className="w-10 h-1 bg-gray-800 rounded-full overflow-hidden flex-shrink-0"><div className="h-full transition-all duration-500" style={{ width: `${Math.max(0, (s.hp / s.maxHp) * 100)}%`, backgroundColor: s.hp / s.maxHp > 0.3 ? s.color : '#EF4444' }} /></div></div>)}</div>}
                  </div>
                );
              })}
            </div>
          )}
          {/* Damage Meter */}
          {coopState && coopState.meter.length > 0 && (
            <div className="card p-3 mt-3">
              <div className="flex gap-1 mb-2">
                {(['damage', 'healing', 'taken'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setMeterTab(tab)}
                    className={`text-xs px-2 py-1 rounded font-semibold transition-colors ${
                      meterTab === tab ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {tab === 'damage' ? t.game.damage : tab === 'healing' ? t.game.healing : t.game.damageTaken}
                  </button>
                ))}
              </div>
              {(() => {
                const sorted = [...coopState.meter].sort((a, b) => {
                  if (meterTab === 'damage') {
                    const totalA = a.damage + a.summons.reduce((s, x) => s + x.damage, 0);
                    const totalB = b.damage + b.summons.reduce((s, x) => s + x.damage, 0);
                    return totalB - totalA;
                  }
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
                            <span className="font-medium" style={{ color: entry.color }}>{getMeterHeroName(entry.heroId, entry.heroName)}</span>
                            <div className="flex items-center gap-1 text-gray-300">
                              {meterTab === 'damage' && entry.summons.filter(s => s.damage > 0).map(s => (
                                <span key={s.skillId} style={{ color: s.color }} className="text-gray-400">{getSummonDisplayName(s.skillId, s.displayName)}: {s.damage.toLocaleString()}</span>
                              ))}
                              {meterTab === 'healing' && shieldTotal > 0 && (
                                <span style={{ color: '#FBBF24' }} className="text-gray-400">{t.game.shieldLabel}: {shieldTotal.toLocaleString()}</span>
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

          {coopState && (coopState.phase === 'victory' || coopState.phase === 'defeat') && (
            <div className="flex justify-center mt-6">
              <div className={`card p-6 text-center border ${coopState.phase === 'victory' ? 'border-green-500' : 'border-red-500'}`} style={{ minWidth: 320 }}>
                <div className={`text-3xl font-bold mb-2 ${coopState.phase === 'victory' ? 'text-green-400' : 'text-red-400'}`}>{phaseLabel(coopState.phase)}</div>
                <div className="text-sm text-gray-400 space-x-3 mb-1">
                  <span>{t.aiGame.wave} <span className="text-white font-bold">{coopState.currentWave}</span></span>
                  <span>{t.aiGame.scoreLabel} <span className="text-blue-400 font-bold">{coopState.score.toLocaleString()}</span></span>
                  <span>{t.aiGame.goldLabel} <span className="text-yellow-400 font-bold">{coopState.goldEarned}G</span></span>
                </div>
                {/* 무한모드: 패배 체크포인트 (파티/레이드 분기) */}
                {maxWave === 1000 && coopState.phase === 'defeat' && (() => {
                  const isRaid = activeTabRef.current === 'raid';
                  const deathWave = isRaid ? raidDeathWave : aiDeathWave;
                  const bestWave  = isRaid ? raidBestWave  : aiBestWave;
                  if (!deathWave || deathWave <= 0) return null;
                  const checkpoints: number[] = [];
                  for (let c = 25; c <= deathWave; c += 25) checkpoints.push(c);
                  return checkpoints.length > 0 ? (
                    <div className="mt-3 mb-2">
                      <p className="text-red-400 font-bold mb-1">{(t.aiGame.deathMsg ?? '💀 Challenge ended at Wave {n}').replace('{n}', String(deathWave))}</p>
                      {bestWave > 0 && <p className="text-amber-400 text-sm font-semibold mb-2">{(t.game.raidBestWave ?? 'Best: Wave {n}').replace('{n}', String(bestWave))}</p>}
                      <p className="text-xs text-gray-400 mb-2">{(t.game as any).checkpointContinue}</p>
                      <div className="flex flex-wrap gap-2 justify-center mb-2">
                        {checkpoints.map(cp => (
                          <button key={cp} onClick={() => { if (isRaid) setRaidStartWave(cp); else setAiStartWave(cp); handleCoopReset(); }}
                            className={`px-3 py-1.5 ${isRaid ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-purple-700 hover:bg-purple-600'} text-white font-bold rounded-lg text-sm transition-colors`}>
                            {(t.aiGame.waveN ?? 'Wave {n}').replace('{n}', String(cp))}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}
                {/* AI 무한모드: 저장 버튼 */}
                {maxWave === 1000 && coopState.phase === 'defeat' && (
                  <button onClick={async () => { await doAIInfiniteSave(); }}
                    className="w-full mb-2 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-sm transition-colors">
                    {t.aiGame.saveProgress}
                  </button>
                )}
                <button onClick={handleCoopReset} className="btn-primary mt-1 px-8">{t.game.playAgain}</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
