import { useRef, useEffect, useState, useCallback, useContext } from 'react';
import { useSearchParams, useNavigate, Link, UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { GameEngine, GameOptions } from '../game/GameEngine';
import { Renderer } from '../game/Renderer';
import {
  CANVAS_WIDTH, CANVAS_HEIGHT, COLORS,
  TOWER_HP, TOWER_X, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX,
  HERO_MIN_X, HERO_MAX_X,
} from '../game/constants';
import type { GameState, GameHero, Position, Role, DamageNumber, SynergyBonus, HeroMeterEntry } from '../game/types';
import { HERO_DEFINITIONS, HERO_GRAPHIC_IDS, ROLE_LABELS, ROLE_COLORS, GRADE_COLORS, calcHeroCombatStats, type HeroDefinition } from '../game/heroData';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { useGameLock } from '../contexts/GameLockContext';
import { getSocket } from '../api/socket';
import api from '../api/client';
import {
  loadProtagonistSave, loadProtagonistDefenseSave, loadProtagonistAISave, loadSave,
  loadOwnedHeroes, saveOwnedHeroes, loadWallTalents,
  loadRaidStageProgress, saveRaidStageProgress, isRaidStageUnlocked,
  type RaidStageProgress,
} from '../utils/localStorage';
import { makeRaidWaveGenerator, RAID_BOSSES, RAID_WAVE_SCHEDULE } from '../game/raidData';
import { addMonsterKill } from '../game/monsterBook';
import { loadManghonguSave } from '../game/manghonguData';
import { heroDefToPartialGameHero, STAR_MULT, getTranslatedRace } from '../game/heroUtils';
import TurretPlacementOverlay from '../components/TurretPlacementOverlay';

// ── Hero 목록 Y축 분산 배치 ─────────────────────────────────────────────────

/**
 * 영웅 목록을 역할별로 그룹화해 기본 포지션(Record<heroDefId, Position>)을 계산.
 * GameEngine.assignHeroPositions와 동일한 로직 (캔버스 프리뷰용).
 * @param heroIds 영웅 ID 목록
 * @param roleOverrides heroId → 유효 역할 (루트/주인공 역할 오버라이드용)
 */
function calcDefaultHeroPositions(
  heroIds: string[],
  roleOverrides?: Record<string, Role>,
): Record<string, Position> {
  const defs = heroIds.map(id => HERO_DEFINITIONS.find(h => h.id === id)).filter(Boolean) as HeroDefinition[];
  const roleX: Record<string, number> = {
    tank: HERO_MAX_X - 50, melee_dps: HERO_MAX_X - 95,
    cc: HERO_MIN_X + 160, ranged_dps: TOWER_X - 50, healer: HERO_MIN_X + 15,
  };
  // heroId → 유효 역할 (roleOverrides 우선, 없으면 hero.role)
  const groups: Record<string, string[]> = {}; // role → heroIds
  for (const def of defs) {
    const effectiveRole = roleOverrides?.[def.id] ?? def.role;
    if (!groups[effectiveRole]) groups[effectiveRole] = [];
    groups[effectiveRole].push(def.id);
  }
  const yMin = FIELD_Y_MIN + 25, yMax = FIELD_Y_MAX - 25;
  const result: Record<string, Position> = {};
  for (const [role, ids] of Object.entries(groups)) {
    const x = roleX[role] ?? (HERO_MIN_X + 60);
    const count = ids.length;
    ids.forEach((id, local) => {
      result[id] = {
        x,
        y: count === 1 ? FIELD_Y_CENTER : yMin + (yMax - yMin) * local / (count - 1),
      };
    });
  }
  return result;
}


const SYNERGY_TIER_COLORS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: '#9CA3AF',  // gray
  2: '#F59E0B',  // amber
  3: '#EF4444',  // red (legendary)
  4: '#A855F7',  // purple (epic)
  5: '#22D3EE',  // cyan (AR)
};

// 한국어 종족명 → 번역 테이블 슬러그 키 매핑
const RACE_NAME_TO_KEY: Record<string, string> = {
  '오크': 'orc', '인간': 'human', '엘프': 'elf', '언데드': 'undead',
  '타우렌': 'tauren', '트롤': 'troll', '판다렌': 'pandaren', '야수족': 'beast',
  '밤엘프': 'nightelf', '고블린': 'goblin', '드레나이': 'draenei',
  '블러드엘프': 'bloodelf', '공허엘프': 'voidelf', '빛벼림 드레나이': 'lightforged',
  '노움': 'gnome', '드렉티르': 'dracthyr',
  '마그하르 오크': 'maghar', '나이트본': 'nightborne',
  '검은무쇠 드워프': 'dark_iron', '잔달라 트롤': 'zandalari',
  '기계': 'mechanical', '정령': 'elemental', '악마': 'demon', '볼페라': 'vulpera',
};
// 한국어 원소명 → 번역 테이블 슬러그 키 매핑
const ELEM_NAME_TO_KEY: Record<string, string> = {
  '화염': 'fire', '냉기': 'frost', '신성': 'holy', '암흑': 'dark',
  '자연': 'nature', '물': 'water', '번개': 'thunder', '서리': 'ice',
  '바람': 'wind', '독': 'poison', '불꽃': 'flame', '용': 'dragon', '빛': 'light',
  '비전': 'arcane',
};
// 한국어 보스 displayName → 번역 키 매핑 (boss ability log 번역용)
const BOSS_KO_TO_TKEY: Record<string, { ns: 'monster' | 'boss'; key: string }> = {
  '트롤 전쟁군주': { ns: 'monster', key: 'troll_warlord' },
  '리치 군주': { ns: 'monster', key: 'lich_king' },
  '화염 군주': { ns: 'monster', key: 'fire_lord' },
  '냉기 왕': { ns: 'monster', key: 'frost_king' },
  '공허의 보행자': { ns: 'monster', key: 'void_walker' },
  '티타늄 골렘': { ns: 'monster', key: 'titanium_golem' },
  '폭풍 폭군': { ns: 'monster', key: 'thunder_tyrant' },
  '거대 살덩이': { ns: 'monster', key: 'flesh_giant' },
  '공허 드래곤': { ns: 'monster', key: 'void_dragon' },
  '공허 거인': { ns: 'boss', key: 'void_colossus' },
  '대지 거인': { ns: 'boss', key: 'stone_titan' },
  '폭발의 지배자 잭': { ns: 'boss', key: 'bomb_master_jack' },
  '태양의 사제': { ns: 'boss', key: 'sun_priest' },
  '달의 전사': { ns: 'boss', key: 'moon_warrior' },
  '군단 지도자 자그': { ns: 'boss', key: 'broodmother_zagg' },
  '천살 마기사 제천': { ns: 'boss', key: 'chunsal_magisa' },
  '영혼의 인도자 가르두': { ns: 'boss', key: 'soul_guide_gardu' },
  '군단장 롬바르도': { ns: 'boss', key: 'commander_lombardo' },
  '용암 지배자': { ns: 'boss', key: 'molten_overlord' },
  '서리 거인': { ns: 'boss', key: 'frost_titan' },
  '공허 고대자': { ns: 'boss', key: 'void_ancient' },
  '폭풍의 신': { ns: 'boss', key: 'storm_god' },
  '죽음의 전령': { ns: 'boss', key: 'death_harbinger' },
  '역병 거인': { ns: 'boss', key: 'plague_giant' },
  '얼음 여왕': { ns: 'boss', key: 'glacial_queen' },
  '대지 파괴자': { ns: 'boss', key: 'earth_crusher' },
  '번개 폭군': { ns: 'boss', key: 'thunder_overlord' },
  '불꽃 드래곤': { ns: 'boss', key: 'flame_drake' },
  '심연의 용': { ns: 'boss', key: 'abyssal_dragon' },
  '공허 지배자': { ns: 'boss', key: 'void_sovereign' },
};

/** 선택된 영웅 정의 목록에서 시너지 미리보기 계산 */
function calcPreviewSynergies(
  heroDefs: import('../game/heroData').HeroDefinition[],
  t: any,
): import('../game/types').SynergyBonus[] {
  const raceCounts: Record<string, number> = {};
  const elementCounts: Record<string, number> = {};
  for (const h of heroDefs) {
    if (h.raceName) raceCounts[h.raceName] = (raceCounts[h.raceName] || 0) + 1;
    if (h.elementName) elementCounts[h.elementName] = (elementCounts[h.elementName] || 0) + 1;
  }
  const synergies: import('../game/types').SynergyBonus[] = [];

  const getRaceDesc = (race: string, tier: number): string => {
    const key = RACE_NAME_TO_KEY[race];
    const val = key ? t(`synergy.race.${key}.t${tier}`) : undefined;
    return val || `종족 시너지 T${tier}`;
  };
  const getElemDesc = (elem: string, tier: number): string => {
    const key = ELEM_NAME_TO_KEY[elem];
    const val = key ? t(`synergy.element.${key}.t${tier}`) : undefined;
    return val || `원소 시너지 T${tier}`;
  };
  const getRaceName = (race: string): string => {
    const key = RACE_NAME_TO_KEY[race];
    const val = key ? t(`synergy.race.${key}.name`) : undefined;
    return val || race;
  };
  const getElemName = (elem: string): string => {
    const key = ELEM_NAME_TO_KEY[elem];
    const val = key ? t(`synergy.element.${key}.name`) : undefined;
    return val || elem;
  };

  for (const [race, count] of Object.entries(raceCounts)) {
    if (count < 2) continue;
    const tier = count >= 4 ? 3 : count >= 3 ? 2 : 1;
    synergies.push({ type: 'race', name: getRaceName(race), count, tier,
      description: getRaceDesc(race, tier),
      bonuses: {} });
  }
  // 특별: 용 원소 — 1명만 있어도 발동
  if ((elementCounts['용'] || 0) >= 1) {
    const dragonName = t('synergy.element.dragon.name') || '용 ★';
    const dragonDesc = t('synergy.element.dragon.t1') || '용의 은총 — 전체 공격력 +20%, 체력 +15%';
    synergies.push({ type: 'element', name: dragonName, count: elementCounts['용'], tier: 1,
      description: dragonDesc,
      bonuses: {} });
  }
  for (const [element, count] of Object.entries(elementCounts)) {
    if (element === '용') continue;
    if (count < 2) continue;
    const tier = count >= 4 ? 3 : count >= 3 ? 2 : 1;
    synergies.push({ type: 'element', name: getElemName(element), count, tier,
      description: getElemDesc(element, tier),
      bonuses: {} });
  }
  return synergies;
}

type Difficulty = 'easy' | 'normal' | 'hard';

export default function GamePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t: t_old } = useLanguage();
  const { t: t_i18n } = useTranslation();
  const tRef = useRef(t_old);
  tRef.current = t_old;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [turretPlacingConfig, setTurretPlacingConfig] = useState<{ maxTurrets: number; onConfirm: (positions: {x:number;y:number}[]) => void } | null>(null);
  const remoteStateRef = useRef<{ state: GameState; damageNumbers: DamageNumber[] } | null>(null);
  // 멀티플레이: 서버에서 집약된 전체 영웅 데이터 (호스트 전용)
  const allHeroDataRef = useRef<Omit<GameHero, 'id' | 'position'>[] | null>(null);
  const allPlayerCountRef = useRef<number>(1);
  // 항상 최신 값 유지 (stale closure 방지용 refs)
  const difficultyRef = useRef<Difficulty>('normal');
  const maxWaveRef = useRef<number>(30);
  const userIdRef = useRef<number | undefined>(undefined);
  // 드래그앤드롭 포지셔닝 (게임 시작 전)
  const previewStateRef = useRef<GameState | null>(null);
  const previewHeroDefIdsRef = useRef<string[]>([]);
  const userPositionsRef = useRef<Record<string, Position>>({}); // heroDefId → 사용자 지정 위치
  const draggingHeroIdxRef = useRef<number | null>(null);
  const dragOffsetRef = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });

  // Multiplayer params
  const lobbyId = searchParams.get('lobby');
  const hostId = searchParams.get('host');
  const lobbyMode = searchParams.get('mode'); // 'party' | 'raid_3' | 'raid'
  const isMultiplayer = !!lobbyId;
  const isRaidMode = lobbyMode === 'raid_3';
  const isSoloRaid = lobbyMode === 'raid' && !isMultiplayer;
  const isHost = isMultiplayer && hostId && user ? Number(hostId) === user.id : false;
  const isGuest = isMultiplayer && !isHost;
  const [multiPlayers, setMultiPlayers] = useState<{ id: number; username: string }[]>([]);
  const [heroDataReady, setHeroDataReady] = useState(false); // 모든 플레이어 영웅 데이터 집약 완료
  const [heroDataSubmitted, setHeroDataSubmitted] = useState(false); // 내 영웅 데이터 서버 제출 완료
  const [heroSubmitStatus, setHeroSubmitStatus] = useState<{ submitted: number; total: number } | null>(null); // 제출 현황
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const achievementCheckedRef = useRef(false);
  const goldSavedRef = useRef(false);
  const [savedGoldToast, setSavedGoldToast] = useState<number | null>(null);
  const [hostLeftToast, setHostLeftToast] = useState<string | null>(null);
  const [returnCountdown, setReturnCountdown] = useState<number | null>(null);
  const [guestGameEnded, setGuestGameEnded] = useState<{ wave: number; score: number; cleared: boolean } | null>(null);
  const [meterTab, setMeterTab] = useState<'damage' | 'healing' | 'taken'>('damage');
  const [heroSearch, setHeroSearch] = useState('');
  const [showNormalNames, setShowNormalNames] = useState(false);

  // 솔로 레이드 스테이지
  const [raidSubMode, setRaidSubMode] = useState<'stage' | 'infinite'>('stage');
  const [selectedRaidStageIdx, setSelectedRaidStageIdx] = useState<number>(0);
  const [raidStageProgress, setRaidStageProgress] = useState<RaidStageProgress>({});
  const [raidStageClearToast, setRaidStageClearToast] = useState<string | null>(null);
  const isSoloRaidStageRef = useRef(false);
  const selectedRaidStageIdxRef = useRef(0);
  selectedRaidStageIdxRef.current = selectedRaidStageIdx;
  isSoloRaidStageRef.current = isSoloRaid && raidSubMode === 'stage';

  // 무한 디펜스 체크포인트
  const [defBestWave, setDefBestWave] = useState<number>(0);
  const defBestWaveRef = useRef<number>(0);
  const [defDeathWave, setDefDeathWave] = useState<number>(0);
  const [defenseHeroGranted, setDefenseHeroGranted] = useState(false); // 1000층 클리어 보상
  const [defStartWave, setDefStartWave] = useState<number>(1);

  // 파티 편성 상태
  const [selectedHeroIds, setSelectedHeroIds] = useState<string[]>([]);
  const [heroSaveData, setHeroSaveData] = useState<Record<string, { starRating: number; activeRouteId: string; equippedSkillIds: string[] }>>({});
  const [ownedHeroIds, setOwnedHeroIds] = useState<string[]>(['protagonist']);
  const [protagonistSave, setProtagonistSave] = useState<any>(null);

  // Game customization settings
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [maxWave, setMaxWave] = useState<number>(30);
  // refs를 항상 최신 값으로 동기화
  difficultyRef.current = difficulty;
  maxWaveRef.current = maxWave;
  userIdRef.current = user?.id;

  // 멀티플레이: 페이지 진입 시 로비 재입장(Check-in) — 소켓 ID 갱신 및 룸 재참가 보장
  useEffect(() => {
    if (!isMultiplayer || !lobbyId || !user) return;
    const socket = getSocket();
    console.log(`[GamePage] Re-joining lobby ${lobbyId} for check-in...`);
    socket.emit('lobby:join', { lobbyId, username: user.username });
  }, [isMultiplayer, lobbyId, user]);

  // 보유 영웅 목록 및 저장 데이터 통합 로드 (DB 우선)
  useEffect(() => {
    if (!user?.id) return;

    Promise.all([
      api.get('/user/profile'),
      api.get('/user/heroes'),
      api.get('/user/owned-heroes'),
    ]).then(([profileRes, heroesRes, ownedRes]) => {
      const dbProfile = profileRes.data;
      const dbHeroList = heroesRes.data;
      const dbOwnedIds: string[] = Array.isArray(ownedRes.data) ? ownedRes.data : [];

      // 1. 주인공 데이터 로드
      const localProto = loadProtagonistSave(user.id);
      const mergedProto = dbProfile.protagonistSave || localProto;
      setProtagonistSave(mergedProto);

      // 2. 일반 영웅 데이터 로드
      const localSave = loadSave(user.id);
      const mergedSave: Record<string, any> = { ...localSave };

      // DB heroes (HeroTemplate 기반) saveData 병합
      dbHeroList.forEach((uh: any) => {
        const def = HERO_DEFINITIONS.find(d => d.name === uh.template?.name);
        if (def && uh.saveData) {
          mergedSave[def.id] = uh.saveData;
        }
      });

      // owned-heroes(JSON 배열) + localStorage 병합
      const localOwnedIds = loadOwnedHeroes(user.id);
      const ownedIds = [...new Set(['protagonist', ...localOwnedIds, ...dbOwnedIds])];

      setOwnedHeroIds(ownedIds);
      
      const finalHeroSaveData: Record<string, { starRating: number; activeRouteId: string; equippedSkillIds: string[] }> = {};
      for (const heroDef of HERO_DEFINITIONS) {
        const s = mergedSave[heroDef.id];
        finalHeroSaveData[heroDef.id] = {
          starRating: s?.starRating ?? 1,
          activeRouteId: s?.activeRouteId ?? heroDef.classRoutes[0].id,
          equippedSkillIds: s?.equippedSkillIds ?? [],
        };
      }
      setHeroSaveData(finalHeroSaveData);

      // 무한 디펜스 최고 기록 로드
      const savedBest = parseInt(localStorage.getItem(`defense_infinite_best_${user.id}`) ?? '0', 10);
      if (!isNaN(savedBest) && savedBest > 0) {
        setDefBestWave(savedBest);
        defBestWaveRef.current = savedBest;
      }

      // 레이드 스테이지 진척도 로드
      setRaidStageProgress(loadRaidStageProgress(user.id));

    }).catch(err => {
      console.error('Failed to load hero data for game', err);
      // 에러 시 로컬 스토리지 폴백 (기존 로직)
      setOwnedHeroIds(loadOwnedHeroes(user.id));
      setProtagonistSave(loadProtagonistSave(user.id));
    });
  }, [user?.id]);

  // 드래그앤드롭 프리뷰 상태 구축 (영웅 선택/데이터 변경 시 갱신)
  useEffect(() => {
    if (isStarted || heroDataSubmitted) return;

    const heroBase = selectedHeroIds
      .map(id => HERO_DEFINITIONS.find(h => h.id === id))
      .filter((h): h is HeroDefinition => !!h);

    // 유효 역할 맵 계산 (루트 역할 + 주인공 오버라이드 반영)
    const defProtSave = user?.id ? loadProtagonistDefenseSave(user.id) : null;
    const aiProtSaveForPreview = user?.id ? loadProtagonistAISave(user.id) : null;
    const effectiveRoles: Record<string, Role> = {};
    for (const hero of heroBase) {
      const routeId = heroSaveData[hero.id]?.activeRouteId ?? hero.classRoutes[0].id;
      const route = hero.classRoutes.find(r => r.id === routeId) ?? hero.classRoutes[0];
      const isDefProt = hero.id === 'protagonist_defense';
      const isAIProt = hero.id === 'protagonist_ai';
      const overrideRole = isDefProt ? (defProtSave?.selectedRole ?? hero.role) : isAIProt ? (aiProtSaveForPreview?.selectedRole ?? hero.role) : (hero.isProtagonist && protagonistSave) ? protagonistSave.selectedRole : undefined;
      effectiveRoles[hero.id] = overrideRole ?? route.role ?? hero.role;
    }
    const defaultPositions = calcDefaultHeroPositions(heroBase.map(h => h.id), effectiveRoles);

    const previewHeroes: GameHero[] = heroBase.map((hero, i) => {
      const isDefProt = hero.id === 'protagonist_defense';
      const isAIProt = hero.id === 'protagonist_ai';
      const star = isDefProt ? (defProtSave?.starRating ?? 1) : isAIProt ? (aiProtSaveForPreview?.starRating ?? 1) : (hero.isProtagonist && protagonistSave) ? protagonistSave.starRating : (heroSaveData[hero.id]?.starRating ?? 1);
      const routeId = heroSaveData[hero.id]?.activeRouteId ?? hero.classRoutes[0].id;
      const skillIds = isDefProt ? (defProtSave?.equippedSkillIds ?? []) : isAIProt ? (aiProtSaveForPreview?.equippedSkillIds ?? []) : (hero.isProtagonist && protagonistSave)
        ? (protagonistSave.equippedSkillIds ?? [])
        : (heroSaveData[hero.id]?.equippedSkillIds ?? []);
      const overrideRole = isDefProt ? (defProtSave?.selectedRole ?? hero.role) : isAIProt ? (aiProtSaveForPreview?.selectedRole ?? hero.role) : (hero.isProtagonist && protagonistSave) ? protagonistSave.selectedRole : undefined;
      const isUnsealed = (!hero.isProtagonist && (heroSaveData[hero.id] as any)?.isUnsealed) || false;
      const partial = heroDefToPartialGameHero(hero, star, routeId, skillIds, overrideRole, isUnsealed);
      // 사용자가 이전에 드래그한 위치 우선 적용
      const pos = userPositionsRef.current[hero.id] ?? defaultPositions[hero.id] ?? { x: HERO_MIN_X + 60, y: FIELD_Y_CENTER };
      return { ...partial, id: i + 1, position: { ...pos } } as GameHero;
    });

    previewStateRef.current = {
      phase: 'prep',
      currentWave: 0,
      maxWave: 30,
      heroes: previewHeroes,
      monsters: [],
      walls: [{ hp: TOWER_HP, maxHp: TOWER_HP, level: 1, position: { x: TOWER_X, y: FIELD_Y_CENTER }, talents: { hpBonus: 0, defBonus: 0, reflectPct: 0, auraDamage: 0, auraSlowPct: 0, elementBuffPct: 0, recoveryPerWave: 0, heroDefBonus: 0, healAlliesPerWave: 0, healAlliesAura: 0, shieldOnWaveStartPct: 0, goldBonusPct: 0, lightningReflect: 0, chainLightningCount: 0, projectileBlockPct: 0, lowHpDefBonus: 0 } }],
      score: 0,
      goldEarned: 0,
      nextMonsterId: 1,
      waveTimer: 3,
      isPaused: false,
      gameSpeed: 1,
      synergies: [],
      bossAbilityLog: [],
      projectiles: [],
      nextProjectileId: 1,
      summons: [],
      nextSummonId: 1,
      meter: [],
      hots: [],
      shields: [],
      healerEffects: [],
      healingFlashes: [],
      meleeTankBonuses: { atkPct: 0, defFlat: 0, hpPct: 0, atkSpdPct: 0, reflectPct: 0, lifestealPct: 0, executePct: 0, armorPenPct: 0, poisonOnHit: 0, healOnKill: 0, meleeCleaveRadius: 0 },
      aiAuraBonus: 0,
      waveElapsedTime: 0,
    };
    previewHeroDefIdsRef.current = heroBase.map(h => h.id);
  }, [selectedHeroIds, heroSaveData, protagonistSave, isStarted, heroDataSubmitted]); // eslint-disable-line react-hooks/exhaustive-deps

  const maxPartySize = isSoloRaid ? 20 : 5;
  const toggleHero = useCallback((heroId: string) => {
    setSelectedHeroIds(prev => {
      if (prev.includes(heroId)) {
        return prev.filter(id => id !== heroId);
      }
      if (prev.length >= maxPartySize) return prev;
      return [...prev, heroId];
    });
  }, [maxPartySize]);

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

  // 몬스터 킬 추적: 이전 프레임에서 살아있던 몬스터 ID 추적
  const prevAliveMonsterIdsRef = useRef<Map<number, string>>(new Map()); // id → name

  const handleStateChange = useCallback(() => {
    if (!engineRef.current) return;
    const newState = engineRef.current.state;

    // 이번 프레임에서 죽은 몬스터 감지 (호스트/솔로만)
    if (!isGuest && user?.id) {
      for (const monster of newState.monsters) {
        if (!monster.isAlive && prevAliveMonsterIdsRef.current.has(monster.id)) {
          addMonsterKill(user.id, monster.name);
          prevAliveMonsterIdsRef.current.delete(monster.id);
        } else if (monster.isAlive) {
          prevAliveMonsterIdsRef.current.set(monster.id, monster.name);
        }
      }
    }

    setGameState({ ...newState });
  }, [isGuest, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Multiplayer: listen for game state from host
  useEffect(() => {
    if (!isGuest) return;

    const socket = getSocket();

    const handleRemoteState = (data: { state: GameState; damageNumbers: DamageNumber[] }) => {
      remoteStateRef.current = data;
      setGameState({ ...data.state });
      setIsStarted(true); // 첫 게임 상태 수신 시 렌더링 시작
    };

    const handleGameEnded = (result: { wave: number; score: number; cleared: boolean }) => {
      // 최종 phase를 캔버스에 강제 반영 (game:state 타이밍 보장 불가)
      const finalPhase = result.cleared ? 'victory' : 'defeat';
      if (remoteStateRef.current) {
        remoteStateRef.current = {
          ...remoteStateRef.current,
          state: { ...remoteStateRef.current.state, phase: finalPhase },
        };
      }
      setGameState(prev => prev ? { ...prev, phase: finalPhase } : prev);
      // 게임 종료 시 호스트와 동일하게 10초 카운트다운 후 메인화면 이동
      setGuestGameEnded(result);
      setReturnCountdown(10);
      const interval = setInterval(() => {
        setReturnCountdown(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            socket.emit('lobby:leave');
            navigate('/');
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    };

    socket.on('game:state', handleRemoteState);
    socket.on('game:ended', handleGameEnded);

    return () => {
      socket.off('game:state', handleRemoteState);
      socket.off('game:ended', handleGameEnded);
    };
  }, [isGuest, navigate]);

  // 선택된 영웅만 서버에 제출하는 함수 (멀티플레이 호스트/게스트 공통)
  const buildAndSubmitHeroes = useCallback(() => {
    if (!isMultiplayer || !user?.id || !lobbyId) return;
    const socket = getSocket();
    console.log(`[buildAndSubmitHeroes] connected=${socket.connected}, lobbyId=${lobbyId}, userId=${user.id}, heroes=${selectedHeroIds.length}`);

    // previewState에서 각 영웅의 실제 위치 추출 (드래그 위치 반영, issue #17)
    const previewHeroIds = previewHeroDefIdsRef.current;
    const previewHeroes = previewStateRef.current?.heroes ?? [];
    const heroPosMap = new Map<string, Position>(
      previewHeroIds.map((defId, i) => [defId, previewHeroes[i]?.position]).filter((e): e is [string, Position] => !!e[1])
    );
    const heroList = selectedHeroIds
      .map(id => HERO_DEFINITIONS.find(h => h.id === id))
      .filter((h): h is HeroDefinition => !!h)
      .map(hero => {
        const partial = heroDefToPartialGameHero(
          hero,
          (hero.isProtagonist && protagonistSave) ? protagonistSave.starRating : (heroSaveData[hero.id]?.starRating ?? 1),
          heroSaveData[hero.id]?.activeRouteId ?? hero.classRoutes[0].id,
          (hero.isProtagonist && protagonistSave)
            ? (protagonistSave.equippedSkillIds ?? [])
            : (heroSaveData[hero.id]?.equippedSkillIds ?? []),
          (hero.isProtagonist && protagonistSave) ? protagonistSave.selectedRole : undefined,
          (!hero.isProtagonist && (heroSaveData[hero.id] as any)?.isUnsealed) || false,
        );
        // previewState의 실제 위치 포함 (드래그 위치 반영)
        const pos = heroPosMap.get(hero.id) ?? userPositionsRef.current[hero.id];
        return pos ? { ...partial, _initialPos: pos } : partial;
      });

    const userId = user.id;
    const username = user.username;
    const doEmit = () => {
      // 로비 재입장 확인 후 heroData 전송 (룸 멤버십 보장)
      socket.emit('lobby:join', { lobbyId, username });
      console.log(`[buildAndSubmitHeroes] emitting game:heroData, heroList=${heroList.length}`);
      socket.emit('game:heroData', { lobbyId, userId, heroes: heroList });
    };

    if (!socket.connected) {
      console.warn('[buildAndSubmitHeroes] 소켓 미연결! 재연결 후 전송...');
      const token = localStorage.getItem('token');
      socket.auth = { token };
      socket.once('connect', doEmit);
      socket.connect();
    } else {
      doEmit();
    }
    setHeroDataSubmitted(true);
  }, [isMultiplayer, user?.id, lobbyId, selectedHeroIds, heroSaveData, protagonistSave]); // eslint-disable-line react-hooks/exhaustive-deps

  // 멀티플레이: 상대방 이탈 감지 — 백엔드 전용 game:playerLeft 이벤트 (issues #9, #10)
  useEffect(() => {
    if (!isMultiplayer || !lobbyId) return;
    const socket = getSocket();
    const handlePlayerLeft = (data: { userId: number; username: string }) => {
      engineRef.current?.stop();
      engineRef.current = null;
      setHostLeftToast(data.username);
      setTimeout(() => {
        setHostLeftToast(null);
        navigate('/lobby');
      }, 3000);
    };
    socket.on('game:playerLeft', handlePlayerLeft);
    return () => { socket.off('game:playerLeft', handlePlayerLeft); };
  }, [isMultiplayer, lobbyId, navigate]);

  // 멀티플레이: game:reset 수신 (호스트 초기화 알림) — issues #19, #21
  useEffect(() => {
    if (!isMultiplayer || !lobbyId) return;
    const socket = getSocket();
    const handleGameReset = () => {
      engineRef.current?.stop();
      engineRef.current = null;
      setGameState(null);
      setIsStarted(false);
      setHeroDataSubmitted(false);
      setHeroDataReady(false);
      setHeroSubmitStatus(null);
      allHeroDataRef.current = null;
      remoteStateRef.current = null;
      setGuestGameEnded(null);
      setReturnCountdown(null);
    };
    socket.on('game:reset', handleGameReset);
    return () => { socket.off('game:reset', handleGameReset); };
  }, [isMultiplayer, lobbyId]);

  // 멀티플레이: 전체 영웅 데이터 수신 (호스트+게스트 모두)
  useEffect(() => {
    if (!isMultiplayer || !lobbyId) return;
    const socket = getSocket();

    const handleAllHeroData = (data: { heroes: Omit<GameHero, 'id' | 'position'>[]; playerCount: number }) => {
      console.log('[game:allHeroData] 수신됨, heroes=', data.heroes.length, 'isHost=', isHost);
      allHeroDataRef.current = data.heroes;
      allPlayerCountRef.current = data.playerCount;
      setHeroSubmitStatus(null);
      setHeroDataReady(true);
      // 호스트는 "게임 시작" 버튼 클릭 시 엔진 시작 (자동 시작 X)
      // 게스트는 호스트가 시작할 때까지 대기
    };

    const handleSubmitStatus = (data: { submitted: number; total: number }) => {
      console.log(`[game:heroSubmitStatus] ${data.submitted}/${data.total}`);
      setHeroSubmitStatus(data);
    };

    socket.on('game:allHeroData', handleAllHeroData);
    socket.on('game:heroSubmitStatus', handleSubmitStatus);
    return () => {
      socket.off('game:allHeroData', handleAllHeroData);
      socket.off('game:heroSubmitStatus', handleSubmitStatus);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMultiplayer, lobbyId, isHost]);

  // 멀티플레이 호스트: "게임 시작" 버튼 클릭 핸들러
  const handleMultiplayerStart = useCallback(() => {
    if (!isHost || !lobbyId || !allHeroDataRef.current) return;
    const socket = getSocket();
    const heroesRaw = allHeroDataRef.current as (Omit<GameHero, 'id' | 'position'> & { _initialPos?: Position })[];
    const heroes = heroesRaw.map(({ _initialPos: _, ...rest }) => rest);
    // 모든 영웅에 위치 데이터가 있으면 해당 위치 사용, 없으면 GameEngine 기본 배치 (issue #17)
    const rawPositions = heroesRaw.map(h => h._initialPos);
    const initialPositions = rawPositions.every(Boolean) ? (rawPositions as Position[]) : undefined;
    const playerCount = allPlayerCountRef.current;

    const options: GameOptions = {
      difficulty: difficultyRef.current,
      maxWave: maxWaveRef.current,
      customHeroes: heroes,
      initialPositions,
      playerCount: playerCount > 1 ? playerCount : undefined,
      wallTalents: userIdRef.current ? loadWallTalents(userIdRef.current) : undefined,
      manghongu: userIdRef.current ? loadManghonguSave(userIdRef.current) : undefined,
      ...(isRaidMode && { waveGenerator: makeRaidWaveGenerator(difficultyRef.current) }),
    };
    options.onStateSync = (state, dn) => socket.emit('game:state', { lobbyId, state, damageNumbers: dn });
    engineRef.current?.stop();
    prevAliveMonsterIdsRef.current.clear();
    engineRef.current = new GameEngine(handleStateChange, options);
    setGameState({ ...engineRef.current.state });
    engineRef.current.start();
    setIsStarted(true);
  }, [isHost, lobbyId, isRaidMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // Parse multiplayer players from URL
  useEffect(() => {
    const playersParam = searchParams.get('players');
    if (playersParam) {
      try {
        setMultiPlayers(JSON.parse(decodeURIComponent(playersParam)));
      } catch { /* ignore */ }
    }
  }, [searchParams]);

  // 렌더러는 마운트 시 1회 생성, 언마운트 시 엔진 정리
  useEffect(() => {
    if (!canvasRef.current) return;
    rendererRef.current = new Renderer(canvasRef.current);
    return () => { engineRef.current?.stop(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Render loop
  useEffect(() => {
    let rafId: number;
    const renderLoop = () => {
      if (rendererRef.current) {
        rendererRef.current.t_i18n = t_i18n;
        rendererRef.current.monsterNameMap = (tRef.current as any).monsters ?? {};
        rendererRef.current.showNormalMonsterNames = showNormalNames;
        rendererRef.current.wallLabel = tRef.current.game.wallLabel;
        rendererRef.current.wall2Label = tRef.current.game.wall2Label;
        rendererRef.current.wall3Label = tRef.current.game.wall3Label;
        rendererRef.current.affixEnrageLabel = '[' + tRef.current.game.affixEnrage + ']';
        rendererRef.current.affixHealAuraLabel = '[' + tRef.current.game.affixHealAura + ']';
        rendererRef.current.affixSummonLabel = '[' + tRef.current.game.affixSummon + ']';
        rendererRef.current.affixAoeSlamLabel = '[' + tRef.current.game.affixAoeSlam + ']';
        if (isGuest && remoteStateRef.current) {
          rendererRef.current.render(
            remoteStateRef.current.state,
            remoteStateRef.current.damageNumbers,
          );
        } else if (engineRef.current) {
          rendererRef.current.render(
            engineRef.current.state,
            engineRef.current.damageNumbers,
            engineRef.current.explosions,
          );
        } else if (!isStarted && !heroDataSubmitted && previewStateRef.current) {
          // 게임 시작 전: 드래그앤드롭 프리뷰 렌더
          rendererRef.current.render(previewStateRef.current, []);
        }
      }
      rafId = requestAnimationFrame(renderLoop);
    };
    rafId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(rafId);
  }, [isGuest, isStarted, heroDataSubmitted, showNormalNames, t_i18n, t_old]);

  // ── 캔버스 드래그앤드롭 (게임 시작 전 영웅 포지셔닝) ──────────────────────
  const handleCanvasMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isStarted || !previewStateRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width);
    const my = (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height);
    const heroes = previewStateRef.current.heroes;
    for (let i = heroes.length - 1; i >= 0; i--) {
      const h = heroes[i];
      const dx = mx - h.position.x, dy = my - h.position.y;
      if (Math.sqrt(dx * dx + dy * dy) <= h.size + 6) {
        draggingHeroIdxRef.current = i;
        dragOffsetRef.current = { dx, dy };
        break;
      }
    }
  }, [isStarted]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isStarted || draggingHeroIdxRef.current === null || !previewStateRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width);
    const my = (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height);
    const idx = draggingHeroIdxRef.current;
    const hero = previewStateRef.current.heroes[idx];
    if (!hero) return;
    // 이동 범위 제한: x=60~560, y=FIELD_Y_MIN+15~FIELD_Y_MAX-15
    hero.position.x = Math.max(60, Math.min(560, mx - dragOffsetRef.current.dx));
    hero.position.y = Math.max(FIELD_Y_MIN + 15, Math.min(FIELD_Y_MAX - 15, my - dragOffsetRef.current.dy));
    // 다음 빌드 시에도 위치 유지
    const defId = previewHeroDefIdsRef.current[idx];
    if (defId) userPositionsRef.current[defId] = { x: hero.position.x, y: hero.position.y };
  }, [isStarted]);

  const handleCanvasMouseUp = useCallback(() => {
    draggingHeroIdxRef.current = null;
  }, []);

  const doStartGame = (startFromWave?: number, customTurretPositions?: {x:number;y:number}[]) => {
    const defProtSaveForStart = user?.id ? loadProtagonistDefenseSave(user.id) : null;
    const aiProtSaveForStart = user?.id ? loadProtagonistAISave(user.id) : null;
    const customHeroes = selectedHeroIds
      .map(id => HERO_DEFINITIONS.find(h => h.id === id))
      .filter((h): h is HeroDefinition => !!h)
      .map(hero => {
        const isDefProt = hero.id === 'protagonist_defense';
        const isAIProt = hero.id === 'protagonist_ai';
        return heroDefToPartialGameHero(
          hero,
          isDefProt ? (defProtSaveForStart?.starRating ?? 1) : isAIProt ? (aiProtSaveForStart?.starRating ?? 1) : (hero.isProtagonist && protagonistSave) ? protagonistSave.starRating : (heroSaveData[hero.id]?.starRating ?? 1),
          heroSaveData[hero.id]?.activeRouteId ?? hero.classRoutes[0].id,
          isDefProt ? (defProtSaveForStart?.equippedSkillIds ?? []) : isAIProt ? (aiProtSaveForStart?.equippedSkillIds ?? []) : (hero.isProtagonist && protagonistSave) ? (protagonistSave.equippedSkillIds ?? []) : (heroSaveData[hero.id]?.equippedSkillIds ?? []),
          isDefProt ? (defProtSaveForStart?.selectedRole ?? hero.role) : isAIProt ? (aiProtSaveForStart?.selectedRole ?? hero.role) : (hero.isProtagonist && protagonistSave) ? protagonistSave.selectedRole : undefined,
          (!hero.isProtagonist && !isDefProt && !isAIProt && (heroSaveData[hero.id] as any)?.isUnsealed) || false
        );
      });

    const initialPositions = previewStateRef.current
      ? previewStateRef.current.heroes.map(h => h.position)
      : undefined;

    const isRaidStageMode = isSoloRaidStageRef.current;
    const raidStageWaveNum = RAID_WAVE_SCHEDULE[selectedRaidStageIdxRef.current]?.wave ?? 1;
    const raidStageGen = isRaidStageMode
      ? ((_: number) => makeRaidWaveGenerator(difficulty)(raidStageWaveNum))
      : undefined;
    const options: GameOptions = {
      difficulty: maxWave === 1000 ? 'normal' : difficulty,
      maxWave: isRaidStageMode ? 1 : maxWave,
      customHeroes: customHeroes.length > 0 ? (customHeroes as Omit<import('../game/types').GameHero, 'id' | 'position'>[]) : undefined,
      initialPositions,
      wallTalents: user?.id ? loadWallTalents(user.id) : undefined,
      manghongu: user?.id ? loadManghonguSave(user.id) : undefined,
      customTurretPositions,
      ...(startFromWave && startFromWave > 1 ? { startFromWave } : {}),
      ...(isRaidStageMode && { waveGenerator: raidStageGen, noWall: true }),
      ...(!isRaidStageMode && isSoloRaid && { waveGenerator: makeRaidWaveGenerator(difficulty), noWall: true }),
    };

    achievementCheckedRef.current = false;
    goldSavedRef.current = false;
    engineRef.current?.stop();
    engineRef.current = new GameEngine(handleStateChange, options);
    setGameState({ ...engineRef.current.state });
    engineRef.current.start();
    setIsStarted(true);
  };

  const handleStart = (startFromWave?: number) => {
    if (isGuest || isMultiplayer) return;

    // 메카닉이 파티에 있으면 포탑 위치 설정 오버레이 먼저 표시
    const defProtSaveForCheck = user?.id ? loadProtagonistDefenseSave(user.id) : null;
    const aiProtSaveForCheck = user?.id ? loadProtagonistAISave(user.id) : null;
    let totalTurrets = 0;
    for (const id of selectedHeroIds) {
      const heroDef = HERO_DEFINITIONS.find(h => h.id === id);
      if (!heroDef) continue;
      const isDefProt = heroDef.id === 'protagonist_defense';
      const isAIProt = heroDef.id === 'protagonist_ai';
      const protSave = isDefProt ? defProtSaveForCheck : isAIProt ? aiProtSaveForCheck : (heroDef.isProtagonist && protagonistSave) ? protagonistSave : null;
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
      setTurretPlacingConfig({
        maxTurrets,
        onConfirm: (positions) => {
          setTurretPlacingConfig(null);
          doStartGame(startFromWave, positions);
        },
      });
      return;
    }
    doStartGame(startFromWave);
  };

  // 무한모드 진척도 저장 로직 (항법은 호출자가 처리)
  const doInfiniteSave = async () => {
    const liveState = engineRef.current?.state ?? gameState;
    if (liveState && user?.id) {
      const wave = liveState.currentWave;
      if (wave > defBestWaveRef.current) {
        setDefBestWave(wave);
        defBestWaveRef.current = wave;
        localStorage.setItem(`defense_infinite_best_${user.id}`, String(wave));
      }
      if (!goldSavedRef.current && liveState.goldEarned > 0) {
        goldSavedRef.current = true;
        const timeout = new Promise<void>(resolve => setTimeout(resolve, 5000));
        await Promise.race([
          api.post('/user/gold', { delta: liveState.goldEarned }).catch(() => {}),
          timeout,
        ]);
      }
    }
    // nav.block 인터셉터 해제 (GamePage 자체 navigate 사용하므로 차단 해제 필요)
    navUnblockRef.current?.();
    navUnblockRef.current = null;
  };

  // 무한모드 저장 후 targetPath로 이동 (Layout 컨텍스트 콜백 + pendingTabPath용)
  const handleInfiniteSaveAndExit = async (targetPath: string) => {
    await doInfiniteSave();
    if (targetPath === '__logout__') {
      await logout();
      navigate('/login');
    } else if (targetPath === '/game') {
      // 이미 /game에 있으므로 navigate가 no-op → 직접 게임 상태 초기화
      handleReset();
    } else {
      navigate(targetPath);
    }
  };

  const handleContinueFromCheckpoint = (wave: number) => {
    // 엔진 정지 + 상태 초기화 후 즉시 새 게임 시작
    engineRef.current?.stop();
    engineRef.current = null;
    achievementCheckedRef.current = false;
    goldSavedRef.current = false;
    setNewAchievements([]);
    setSavedGoldToast(null);
    setGameState(null);
    setReturnCountdown(null);
    setDefStartWave(wave);
    handleStart(wave);
  };

  const handleReset = () => {
    engineRef.current?.stop();
    engineRef.current = null;
    setGameState(null);
    setIsStarted(false);
    setHeroDataSubmitted(false);
    setHeroDataReady(false);
    setHeroSubmitStatus(null);
    allHeroDataRef.current = null;
    achievementCheckedRef.current = false;
    goldSavedRef.current = false;
    setNewAchievements([]);
    setSavedGoldToast(null);
    setGuestGameEnded(null);
    setReturnCountdown(null);
    // 멀티플레이 중 초기화 시 상대에게 알림 (issues #19, #21)
    if (isMultiplayer && lobbyId) {
      const socket = getSocket();
      socket.emit('game:reset', { lobbyId });
    }
  };

  const handlePause = () => {
    engineRef.current?.togglePause();
  };

  const handleSpeed = (speed: number) => {
    engineRef.current?.setSpeed(speed);
  };

  // ── 게임 진행 중 이탈 방지 ─────────────────────────────────────────────────
  const isGameActive = isStarted && !!gameState && gameState.phase !== 'victory' && gameState.phase !== 'defeat';
  const { setLocked, setPaused, setInfiniteMode, setInfiniteSaveCallback, setExitGameCallback } = useGameLock();

  // 게임 활성 상태 → 상단 메뉴 잠금
  useEffect(() => {
    setLocked(isGameActive);
    return () => setLocked(false);
  }, [isGameActive]); // eslint-disable-line react-hooks/exhaustive-deps

  // 게임 활성 중 '같은 페이지 나가기' 콜백 등록 (Layout의 동일경로 이탈 처리용)
  useEffect(() => {
    if (isGameActive) {
      setExitGameCallback(() => handleReset);
    } else {
      setExitGameCallback(null);
    }
    return () => setExitGameCallback(null);
  }, [isGameActive]); // eslint-disable-line react-hooks/exhaustive-deps

  // 일시정지 상태 → 상단 메뉴 잠금 해제 (확인 모달 표시용)
  useEffect(() => {
    setPaused(!!gameState?.isPaused);
  }, [gameState?.isPaused]); // eslint-disable-line react-hooks/exhaustive-deps

  // 무한모드 여부 + 저장 콜백 → Layout 모달에 전달
  useEffect(() => {
    const isInf = isGameActive && maxWave === 1000 && !isGuest;
    setInfiniteMode(isInf);
    setInfiniteSaveCallback(isInf ? handleInfiniteSaveAndExit : null);
    return () => { setInfiniteMode(false); setInfiniteSaveCallback(null); };
  }, [isGameActive, maxWave, isGuest]); // eslint-disable-line react-hooks/exhaustive-deps
  const autoPausedRef = useRef(false);
  const gameIsPausedRef = useRef(false);
  const navUnblockRef = useRef<(() => void) | null>(null);
  const [blockedTx, setBlockedTx] = useState<{ retry: () => void; unblock: () => void } | null>(null);
  const [pendingTabPath, setPendingTabPath] = useState<string | null>(null);
  const navigationCtx = useContext(NavigationContext);

  // gameState.isPaused 를 ref에 동기화 (blocker 콜백 내 stale closure 방지)
  useEffect(() => {
    gameIsPausedRef.current = !!gameState?.isPaused;
  }, [gameState?.isPaused]);

  // BrowserRouter 호환 내비게이션 차단 (UNSAFE_NavigationContext.navigator.block)
  useEffect(() => {
    if (!isGameActive) return;
    const nav = navigationCtx.navigator as any;
    if (typeof nav.block !== 'function') return;

    const unblock = nav.block((tx: { retry: () => void }) => {
      if (!gameIsPausedRef.current) {
        engineRef.current?.togglePause();
        autoPausedRef.current = true;
      }
      setBlockedTx({ retry: tx.retry, unblock });
    });
    navUnblockRef.current = unblock;
    return () => { unblock(); navUnblockRef.current = null; };
  }, [isGameActive]); // eslint-disable-line react-hooks/exhaustive-deps

  // 브라우저 새로고침/닫기 방지
  useEffect(() => {
    if (!isGameActive) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [isGameActive]);

  // Notify host when game ends in multiplayer (goldEarned 포함 → 서버 측 분배)
  useEffect(() => {
    if (!isHost || !gameState || !lobbyId) return;
    if (gameState.phase === 'victory' || gameState.phase === 'defeat') {
      const socket = getSocket();
      socket.emit('game:end', {
        lobbyId,
        result: {
          wave: gameState.currentWave,
          score: gameState.score,
          cleared: gameState.phase === 'victory',
          goldEarned: gameState.goldEarned,
          perfectClear: gameState.phase === 'victory' && (gameState.walls.at(-1)?.hp ?? 0) >= (gameState.walls.at(-1)?.maxHp ?? 1),
        },
      });
    }
  }, [gameState?.phase, isHost, lobbyId]);

  // 멀티플레이: 컴포넌트 언마운트 시 로비 탈퇴 (호스트 정리)
  // StrictMode 이중 마운트 방지: ref로 실제 마운트 상태 추적
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!isMultiplayer || !lobbyId) return;
    mountedRef.current = true;
    return () => {
      // StrictMode: mount→unmount→remount 사이클에서 remount가 완료될 때까지 대기
      // 3인 raid 등 영웅 데이터가 많을수록 re-mount가 느려지므로 300ms로 여유 확보
      setTimeout(() => {
        if (!mountedRef.current) {
          const socket = getSocket();
          socket.emit('lobby:leave');
        }
      }, 300);
      mountedRef.current = false;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 멀티플레이: 서버로부터 골드 분배 알림 수신 (호스트+게스트 공통)
  useEffect(() => {
    if (!isMultiplayer) return;
    const socket = getSocket();
    const handler = ({ amount }: { amount: number }) => {
      if (amount > 0) {
        setSavedGoldToast(amount);
        setTimeout(() => setSavedGoldToast(null), 4000);
      }
    };
    socket.on('game:gold_awarded', handler);
    return () => { socket.off('game:gold_awarded', handler); };
  }, [isMultiplayer]);

  // Check achievements + save gold when game ends
  useEffect(() => {
    if (!gameState || isGuest) return;
    if (gameState.phase !== 'victory' && gameState.phase !== 'defeat') return;
    if (achievementCheckedRef.current) return;
    achievementCheckedRef.current = true;

    // 1) 업적 체크
    // 파티 조합 통계 계산
    const elementCounts: Record<string, number> = {};
    const raceCounts: Record<string, number> = {};
    const roleCounts: Record<string, number> = {};
    for (const hero of gameState.heroes) {
      if (hero.elementName) elementCounts[hero.elementName] = (elementCounts[hero.elementName] || 0) + 1;
      if (hero.raceName) raceCounts[hero.raceName] = (raceCounts[hero.raceName] || 0) + 1;
      if (hero.role) roleCounts[hero.role] = (roleCounts[hero.role] || 0) + 1;
    }
    api.post('/achievements/check', {
      wave: gameState.phase === 'victory' ? gameState.currentWave : gameState.currentWave - 1,
      score: gameState.score,
      cleared: gameState.phase === 'victory',
      mode: isMultiplayer ? 'party' : 'solo',
      difficulty,
      ownedHeroCount: user?.id ? loadOwnedHeroes(user.id).length : 1,
      partySize: selectedHeroIds.length,
      elementCounts,
      raceCounts,
      roleCounts,
    }).then(res => {
      if (res.data.newlyUnlocked?.length > 0) {
        setNewAchievements(res.data.newlyUnlocked);
      }
    }).catch(() => { /* ignore */ });

    // 2) 리더보드 기록 저장 (솔로 전용; 멀티는 서버에서 저장)
    if (!isMultiplayer) {
      api.post('/leaderboard/record', {
        wave: gameState.currentWave,
        score: gameState.score,
        cleared: gameState.phase === 'victory',
        goldEarned: gameState.goldEarned,
      }).catch(() => { /* ignore */ });
    }

    // 2-B) 무한 디펜스 1000층 클리어 보상: 디펜스 용사 지급
    if (gameState.phase === 'victory' && maxWaveRef.current === 1000 && user?.id) {
      const owned = loadOwnedHeroes(user.id);
      if (!owned.includes('protagonist_defense')) {
        const newOwned = [...owned, 'protagonist_defense'];
        saveOwnedHeroes(user.id, newOwned);
        api.post('/user/claim-milestone-hero', { milestoneType: 'protagonist_defense' }).catch(() => {});
        setDefenseHeroGranted(true);
      }
    }

    // 3) 솔로 전용: 골드 개별 저장
    //    멀티플레이는 서버(game.gateway)가 모든 파티원에게 일괄 지급
    if (!isMultiplayer && !goldSavedRef.current && gameState.goldEarned > 0) {
      goldSavedRef.current = true;
      api.post('/user/gold', { delta: gameState.goldEarned })
        .then(() => {
          setSavedGoldToast(gameState.goldEarned);
          setTimeout(() => setSavedGoldToast(null), 4000);
        })
        .catch(() => { /* 저장 실패는 무시 */ });

      // Perfect Clear 보상 (크리스탈)
      if (gameState.phase === 'victory' && (gameState.walls.at(-1)?.hp ?? 0) >= (gameState.walls.at(-1)?.maxHp ?? 1)) {
        api.post('/user/crystals', { delta: 10 }).catch(() => {});
      }
    }
  }, [gameState?.phase, isGuest, isMultiplayer]);

  // 무한모드: 100웨이브마다 자동 저장
  useEffect(() => {
    if (!gameState || maxWaveRef.current !== 1000 || isGuest || !user?.id) return;
    const wave = gameState.currentWave;
    if (wave > 0 && wave % 100 === 0 && wave > defBestWaveRef.current) {
      setDefBestWave(wave);
      defBestWaveRef.current = wave;
      localStorage.setItem(`defense_infinite_best_${user.id}`, String(wave));
    }
  }, [gameState?.currentWave]); // eslint-disable-line react-hooks/exhaustive-deps

  // 무한 디펜스: 패배 시 최고 기록 저장
  useEffect(() => {
    if (!gameState || gameState.phase !== 'defeat') return;
    if (maxWaveRef.current !== 1000) return;
    const wave = gameState.currentWave;
    setDefDeathWave(wave);
    if (wave > defBestWaveRef.current) {
      setDefBestWave(wave);
      defBestWaveRef.current = wave;
      if (user?.id) localStorage.setItem(`defense_infinite_best_${user.id}`, String(wave));
    }
  }, [gameState?.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // 솔로 레이드 스테이지: 클리어 시 진척도 저장 + 토스트
  useEffect(() => {
    if (!gameState || gameState.phase !== 'victory') return;
    if (!isSoloRaidStageRef.current || !user?.id) return;
    const idx = selectedRaidStageIdxRef.current;
    const bossName = RAID_WAVE_SCHEDULE[idx]?.bosses
      .map(id => {
        const boss = RAID_BOSSES.find(b => b.id === id);
        return boss ? (t_i18n(`game.bosses.${boss.id}.name`) || boss.displayName) : id;
      }).join(' + ') ?? '';
    const updated = saveRaidStageProgress(user.id, idx, raidStageProgress);
    setRaidStageProgress(updated);
    setRaidStageClearToast(t_i18n('game.raidStageClear', { n: idx + 1, boss: bossName }));
    setTimeout(() => setRaidStageClearToast(null), 4000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState?.phase]);

  // 승리/패배 후 10초 카운트다운 → 대시보드 자동 이동 (무한 모드 패배는 제외)
  useEffect(() => {
    if (!gameState) return;
    if (gameState.phase !== 'victory' && gameState.phase !== 'defeat') return;
    if (maxWaveRef.current === 1000 && gameState.phase === 'defeat') return; // 무한 패배는 체크포인트 UI 표시
    setReturnCountdown(10);
    const interval = setInterval(() => {
      setReturnCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          navigate('/');
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState?.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const roleLabel = (role: Role) => t_i18n(`roles.${role}`) || role;

  // 인게임 UI용 헬퍼: 영웅 표시 이름
  const getHeroDisplayName = (hero: GameHero) => {
    const proto = HERO_DEFINITIONS.find(h => h.id === hero.heroDefId);
    if (proto?.isProtagonist) return user?.username ?? t_i18n('heroesPage.defaultHeroName');
    return proto?.nameKey ? t_i18n(proto.nameKey) : hero.name;
  };

  const getMeterHeroName = (heroId: number, rawName: string) => {
    if (heroId === GameEngine.WALL_METER_ID) return t_i18n('game.wallLabel');
    const hero = gameState?.heroes.find(h => h.id === heroId);
    if (!hero) return rawName;
    return getHeroDisplayName(hero);
  };

  const getSummonDisplayName = (skillId: string, rawName: string, displayNameKey?: string) => {
    if (displayNameKey) return t_i18n(displayNameKey);
    for (const h of HERO_DEFINITIONS) {
      for (const r of h.classRoutes) {
        const s = r.skills.find(sk => sk.id === skillId);
        if (s?.summonStats?.displayNameKey) return t_i18n(s.summonStats.displayNameKey);
        if (s?.nameKey) return t_i18n(s.nameKey);
      }
    }
    return rawName;
  };

  const difficultyLabel = (d: Difficulty) => {
    if (d === 'easy') return t_i18n('game.easy');
    if (d === 'hard') return t_i18n('game.hard');
    return t_i18n('game.normal');
  };

  // 보스 로그 번역 헬퍼
  const getBossName = (koName: string): string => {
    const entry = BOSS_KO_TO_TKEY[koName];
    if (!entry) return koName;
    const translated = entry.ns === 'monster'
      ? t_i18n(`monsters.${entry.key}.displayName`)
      : t_i18n(`game.bosses.${entry.key}.name`);
    return translated || koName;
  };

  const translateBossLog = (log: string) => {
    if (log.includes('자폭병 폭발! 벽')) {
      const match = log.match(/벽 ([\d,]+) 피해/);
      return t_i18n('game.bossExplosion', { damage: match ? match[1] : '?' });
    }
    if (log.includes('자폭병 폭발!') && log.includes('명의 현재 HP 50% 감소')) {
      const match = log.match(/폭발! (\d+)명의/);
      return t_i18n('game.bossSapperHit', { count: parseInt(match?.[1] ?? '0', 10) });
    }
    if (log.includes('의 대지 진동! 모두가 쓰러졌다!')) {
      const koName = log.replace('💀 ', '').split('의')[0];
      return t_i18n('game.bossSlam', { name: getBossName(koName) });
    }
    if (log.includes('광폭화! 공격력 50% 증가!')) {
      const koName = log.split(' 광폭화')[0];
      return t_i18n('game.bossEnrage', { name: getBossName(koName) });
    }
    if (log.includes('의 마력 폭발이 멈췄습니다.')) {
      const koName = log.split('의 마력')[0];
      return t_i18n('game.bossArcaneEnd', { name: getBossName(koName) });
    }
    if (log.includes('천살 만개! 전 화면 피해!')) {
      const koName = log.split(' 천살')[0];
      return t_i18n('game.bossThousandBloom', { name: getBossName(koName) });
    }
    if (log.includes('대지 강타!') && log.includes('명 적중!')) {
      const nameMatch = log.match(/^(.+?) 대지 강타!/);
      const hitMatch = log.match(/(\d+)명 적중/);
      return t_i18n('game.bossGroundSlam', { name: getBossName(nameMatch?.[1] ?? ''), count: parseInt(hitMatch?.[1] ?? '0', 10) });
    }
    if (log.includes('허공 점멸! 중앙 마력 폭발!')) {
      const koName = log.split(' 허공')[0];
      return t_i18n('game.bossVoidBlink', { name: getBossName(koName) });
    }
    if (log.includes('군단 소환!') && log.includes('마리의') && log.includes('등장!')) {
      const nameMatch = log.match(/^(.+?) 군단 소환!/);
      const countMatch = log.match(/(\d+)마리의/);
      const typeMatch = log.match(/마리의 (.+) 등장!/);
      return t_i18n('game.bossLegionSummon', { name: getBossName(nameMatch?.[1] ?? ''), count: parseInt(countMatch?.[1] ?? '0', 10), type: typeMatch?.[1] ?? '' });
    }
    if (log.includes('의 강력한 공격을') && log.includes('명이 분산해서 막아냈습니다!')) {
      const nameMatch = log.match(/^(.+?)의 강력한 공격을/);
      const countMatch = log.match(/(\d+)명이 분산/);
      return t_i18n('game.bossDefenseDistributed', { name: getBossName(nameMatch?.[1] ?? ''), count: parseInt(countMatch?.[1] ?? '0', 10) });
    }
    if (log.includes('의 공격이 집중되어 치명적인 피해를 입었습니다!')) {
      const nameMatch = log.match(/^(.+?)의 공격이/);
      const countMatch = log.match(/현재 (\d+)명/);
      return t_i18n('game.bossAttackConcentrated', { name: getBossName(nameMatch?.[1] ?? ''), count: parseInt(countMatch?.[1] ?? '0', 10) });
    }
    return log;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* 게임 모드 탭 */}
      {!isMultiplayer && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {isSoloRaid ? (
            <>
              {isGameActive && !gameState?.isPaused ? (
                <span className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-800 text-gray-600 border-2 border-gray-700 cursor-not-allowed select-none" title={t_i18n('game.exitConfirmNavBlocked')}>{t_old.game.tabDungeonDefense}</span>
              ) : isGameActive && gameState?.isPaused ? (
                <button onClick={() => setPendingTabPath('/game')} className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition-colors opacity-70">{t_old.game.tabDungeonDefense}</button>
              ) : (
                <Link to="/game" className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition-colors">{t_old.game.tabDungeonDefense}</Link>
              )}
              {isGameActive && !gameState?.isPaused ? (
                <span className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-800 text-gray-600 border-2 border-gray-700 cursor-not-allowed select-none" title={t_i18n('game.exitConfirmNavBlocked')}>{t_old.game.tabDungeonAttack}</span>
              ) : isGameActive && gameState?.isPaused ? (
                <button onClick={() => setPendingTabPath('/offense-game')} className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition-colors opacity-70">{t_old.game.tabDungeonAttack}</button>
              ) : (
                <Link to="/offense-game" className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition-colors">{t_old.game.tabDungeonAttack}</Link>
              )}
              <span className="px-4 py-2 rounded-lg font-bold text-sm bg-purple-700 text-white border-2 border-purple-400 shadow">{t_old.game.tabRaid}</span>
            </>
          ) : (
            <>
              <span className="px-4 py-2 rounded-lg font-bold text-sm bg-yellow-600 text-white border-2 border-yellow-400 shadow">
                {t_old.game.tabDungeonDefense}
              </span>
              {isGameActive && !gameState?.isPaused ? (
                <span className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-800 text-gray-600 border-2 border-gray-700 cursor-not-allowed select-none" title={t_i18n('game.exitConfirmNavBlocked')}>{t_old.game.tabDungeonAttack}</span>
              ) : isGameActive && gameState?.isPaused ? (
                <button onClick={() => setPendingTabPath('/offense-game')} className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition-colors opacity-70">{t_old.game.tabDungeonAttack}</button>
              ) : (
                <Link to="/offense-game" className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600 hover:text-white transition-colors">{t_old.game.tabDungeonAttack}</Link>
              )}
              {isGameActive && !gameState?.isPaused ? (
                <span className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-800 text-gray-600 border-2 border-gray-700 cursor-not-allowed select-none" title={t_i18n('game.exitConfirmNavBlocked')}>{t_old.game.tabRaid}</span>
              ) : isGameActive && gameState?.isPaused ? (
                <button onClick={() => setPendingTabPath('/game?mode=raid')} className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-purple-700 hover:text-white transition-colors opacity-70">{t_old.game.tabRaid}</button>
              ) : (
                <Link to="/game?mode=raid" className="px-4 py-2 rounded-lg font-bold text-sm bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-purple-700 hover:text-white transition-colors">{t_old.game.tabRaid}</Link>
              )}
            </>
          )}
        </div>
      )}
      {/* 레이드 스테이지 클리어 토스트 */}
      {raidStageClearToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-2xl text-base animate-bounce">
          {raidStageClearToast}
        </div>
      )}
      {/* 토스트 알림 영역 */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {/* 호스트 이탈 토스트 */}
        {hostLeftToast !== null && (
          <div className="bg-red-950 border border-red-500 text-red-300 px-4 py-3 rounded shadow-lg text-sm flex items-center gap-2">
            <span>🚪</span>
            <div>
              <div className="font-bold">{t_old?.game?.hostLeft || '호스트가 게임을 떠났습니다.'}</div>
              <div>{(t_old?.game?.hostLeftDesc || '{n}초 후 게임이 종료됩니다.').replace('{n}', String(hostLeftToast))}</div>
            </div>
          </div>
        )}
        {/* 골드 저장 토스트 */}
        {savedGoldToast !== null && (
          <div className="bg-yellow-950 border border-yellow-500 text-yellow-300 px-4 py-3 rounded shadow-lg text-sm flex items-center gap-2">
            <span>💰</span>
            <div>
              <div className="font-bold">{t_i18n('game.goldSavedTitle')}</div>
              <div><span className="text-yellow-400 font-bold">+{savedGoldToast.toLocaleString()}G</span> {t_i18n('game.goldSavedApplied')}</div>
            </div>
            <button onClick={() => setSavedGoldToast(null)} className="ml-2 text-yellow-400 hover:text-yellow-200">✕</button>
          </div>
        )}
        {/* 업적 토스트 */}
        {newAchievements.map((name, i) => (
          <div key={i} className="bg-yellow-900 border border-yellow-500 text-yellow-300 px-4 py-3 rounded shadow-lg text-sm flex items-center gap-2">
            <span>🏆</span>
            <div>
              <div className="font-bold">{t_old.game.achievementUnlocked}</div>
              <div>{t_i18n(name)}</div>
            </div>
            <button onClick={() => setNewAchievements(prev => prev.filter((_, j) => j !== i))} className="ml-2 text-yellow-400 hover:text-yellow-200">✕</button>
          </div>
        ))}
      </div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">
            {t_old.game.title}
            {isRaidMode && <span className="ml-2 text-lg text-purple-400">🐉 레이드</span>}
          </h1>
          {isMultiplayer && (
            <p className="text-sm text-gray-400">
              {t_old.game.multiplayer} {isHost ? t_old.game.host : t_old.game.guest} | {t_old.game.players} {multiPlayers.map(p => p.username).join(', ')}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* 멀티플레이: 호스트/게스트 모두 영웅 제출 버튼 */}
          {isMultiplayer && !isStarted && !heroDataSubmitted && (
            <button onClick={buildAndSubmitHeroes}
              disabled={selectedHeroIds.length === 0}
              className="btn-primary text-sm px-6 disabled:opacity-40 disabled:cursor-not-allowed">
              영웅 제출
            </button>
          )}
          {isMultiplayer && !isStarted && heroDataSubmitted && (
            <div className="flex items-center gap-3">
              {isHost && heroDataReady && (
                <button
                  onClick={handleMultiplayerStart}
                  className="btn-primary text-sm px-6 animate-bounce shadow-lg shadow-yellow-500/20"
                >
                  게임 시작
                </button>
              )}
              <span className="text-sm text-yellow-400 animate-pulse bg-yellow-900/20 px-3 py-1.5 rounded-lg border border-yellow-500/30">
                {isHost
                  ? (heroDataReady
                      ? '✓ 모든 영웅 데이터 준비 완료!'
                      : `⏳ 다른 플레이어 영웅 데이터 수집 중... ${heroSubmitStatus ? `(${heroSubmitStatus.submitted}/${heroSubmitStatus.total})` : ''}`)
                  : (heroDataReady
                      ? '✓ 모든 영웅 데이터 준비 완료! 호스트의 시작을 기다리는 중...'
                      : `⏳ 영웅 데이터 수집 중... ${heroSubmitStatus ? `(${heroSubmitStatus.submitted}/${heroSubmitStatus.total})` : ''}`)}
              </span>
            </div>
          )}
          {/* 솔로: 게임 시작 버튼 */}
          {!isStarted && !isMultiplayer ? (
            <button onClick={() => handleStart(maxWave === 1000 && defStartWave > 1 ? defStartWave : undefined)}
              disabled={isSoloRaid ? selectedHeroIds.length < maxPartySize : selectedHeroIds.length === 0}
              className="btn-primary text-sm px-6 disabled:opacity-40 disabled:cursor-not-allowed">
              {isSoloRaid
                ? (t_old.game.raidStart || '레이드 시작 ({cur}/{max})').replace('{cur}', String(selectedHeroIds.length)).replace('{max}', String(maxPartySize))
                : (maxWave === 1000 && defStartWave > 1
                  ? (t_old.game.startFromWave || '{n}웨이브부터 시작').replace('{n}', String(defStartWave))
                  : t_old.game.startGame)}
            </button>
          ) : !isGuest ? (
            <>
              <button onClick={handlePause} className="btn-secondary text-sm">
                {gameState?.isPaused ? t_old.game.resume : t_old.game.pause}
              </button>
              <div className="flex gap-1">
                {[1, 2, 3].map(s => (
                  <button
                    key={s}
                    onClick={() => handleSpeed(s)}
                    className={`px-2 py-1 rounded text-xs ${gameState?.gameSpeed === s ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
              <button onClick={handleReset} className="btn-danger text-sm">
                {t_old.game.reset}
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* 솔로 레이드: 스테이지 선택 UI */}
      {isSoloRaid && !isStarted && (
        <div className="card mb-4 border-purple-700/40 bg-purple-950/10">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-base font-bold text-purple-300">{t_old.game.raidModeTitle}</h2>
            <div className="flex gap-1 ml-auto">
              {(['stage', 'infinite'] as const).map(mode => (
                <button key={mode} onClick={() => setRaidSubMode(mode)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors border ${raidSubMode === mode ? 'bg-purple-700 border-purple-500 text-white' : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-gray-400'}`}>
                  {mode === 'stage' ? t_old.game.raidStageModeShort : t_old.game.raidInfiniteModeShort}
                </button>
              ))}
            </div>
          </div>

          {raidSubMode === 'stage' && (
            <>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-3">
                {RAID_WAVE_SCHEDULE.map((entry, idx) => {
                  const unlocked = isRaidStageUnlocked(idx, raidStageProgress);
                  const cleared = !!raidStageProgress[idx];
                  const selected = selectedRaidStageIdx === idx;
                  const bosses = entry.bosses.map(id => RAID_BOSSES.find(b => b.id === id));
                  return (
                    <button key={idx} disabled={!unlocked}
                      onClick={() => setSelectedRaidStageIdx(idx)}
                      className={`relative p-2 rounded-lg border text-xs transition-all text-left ${
                        selected ? 'border-purple-400 bg-purple-900/40' :
                        unlocked ? 'border-gray-600 bg-gray-800/50 hover:border-purple-500' :
                        'border-gray-700 bg-gray-900/30 opacity-40 cursor-not-allowed'
                      }`}>
                      <div className="text-[10px] text-gray-500 mb-0.5">S{idx + 1}</div>
                      {bosses.map((b, bi) => (
                        <div key={bi} className="font-bold text-gray-200 truncate" style={{ fontSize: '10px' }}>{(t_old.game.bosses as any)?.[entry.bosses[bi]]?.name ?? b?.displayName ?? entry.bosses[bi]}</div>
                      ))}
                      {cleared && <span className="absolute top-1 right-1 text-[9px] bg-yellow-600 text-white px-1 rounded">✓</span>}
                      {!unlocked && <span className="absolute top-1 right-1 text-gray-500">🔒</span>}
                    </button>
                  );
                })}
              </div>
              {/* 선택된 스테이지 상세 */}
              {(() => {
                const entry = RAID_WAVE_SCHEDULE[selectedRaidStageIdx];
                const bosses = entry?.bosses.map(id => RAID_BOSSES.find(b => b.id === id)).filter(Boolean) ?? [];
                return bosses.length > 0 ? (
                  <div className="bg-gray-800/60 rounded-lg p-3 border border-gray-700 text-xs">
                    <div className="font-bold text-purple-300 mb-1">{(t_old.game.raidStageInfo ?? '스테이지 {n} — {boss}').replace('{n}', String(selectedRaidStageIdx + 1)).replace('{boss}', bosses.map(b => (t_old.game.bosses as any)?.[b!.id]?.name ?? b!.displayName).join(' + '))}</div>
                    <div className="flex flex-wrap gap-3 text-gray-400">
                      {bosses.map((b, i) => (
                        <span key={i}>HP {(b!.hp / 1000).toFixed(0)}k · ATK {b!.atk}
                          {b!.ironSkin && <span className="ml-1 text-orange-400 font-bold">{t_old.game.raidIronSkinLabel}</span>}
                          {b!.hasCleave && <span className="ml-1 text-red-400">{t_old.game.raidCleaveLabel}</span>}
                          {b!.immuneToCc && <span className="ml-1 text-yellow-400">{t_old.game.raidCcImmuneLabel}</span>}
                          {b!.affix === 'enrage' && <span className="ml-1 text-red-500">{t_old.game.raidEnrageLabel}</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}
            </>
          )}

          {raidSubMode === 'infinite' && (
            <div className="text-xs text-gray-400">
              <p>{t_old.game.raidInfiniteSimpleDesc}</p>
            </div>
          )}
        </div>
      )}

      {/* Game Customization (Solo only, before start, 레이드 모드 제외) */}
      {!isStarted && !isMultiplayer && !isSoloRaid && (
        <div className="card mb-4">
          <div className="flex items-center gap-6 flex-wrap">
            {maxWave !== 1000 && (
            <div>
              <label className="block text-xs text-gray-400 mb-1">{t_old.game.difficulty}</label>
              <div className="flex gap-1">
                {(['easy', 'normal', 'hard'] as Difficulty[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-3 py-1 rounded text-xs ${
                      difficulty === d
                        ? d === 'easy' ? 'bg-green-600 text-white'
                        : d === 'hard' ? 'bg-red-600 text-white'
                        : 'bg-yellow-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    {difficultyLabel(d)}
                  </button>
                ))}
              </div>
            </div>
            )}
            <div>
              <label className="block text-xs text-gray-400 mb-1">{t_old.game.waves}</label>
              <div className="flex gap-1">
                {[10, 20, 30, 1000].map(w => (
                  <button
                    key={w}
                    onClick={() => { setMaxWave(w); if (w !== 1000) setDefStartWave(1); }}
                    className={`px-3 py-1 rounded text-xs ${maxWave === w ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                  >
                    {w === 1000 ? t_old.game.infiniteFloor : w}
                  </button>
                ))}
              </div>
            </div>
            {maxWave !== 1000 && (
            <div className="text-xs text-gray-500">
              {difficulty === 'easy' && t_old.game.easyDesc}
              {difficulty === 'normal' && t_old.game.normalDesc}
              {difficulty === 'hard' && t_old.game.hardDesc}
            </div>
            )}
            {maxWave === 1000 && defBestWave > 0 && (
              <div className="text-xs text-amber-400 font-semibold ml-auto self-center">{(t_old.game.bestRecord || '최고 기록: {n}웨이브').replace('{n}', String(defBestWave))}</div>
            )}
          </div>
          {maxWave === 1000 && (
            <div className="mt-3 pt-3 border-t border-gray-700">
              <label className="block text-xs text-gray-400 mb-2">{t_old.game.startWave}</label>
              <div className="flex gap-2 flex-wrap">
                {(() => {
                  const available: number[] = [1];
                  for (let c = 25; c <= defBestWave; c += 25) available.push(c);
                  return available.map(w => (
                    <button
                      key={w}
                      onClick={() => setDefStartWave(w)}
                      className={`px-3 py-1 rounded text-xs font-bold transition-colors ${defStartWave === w ? 'bg-amber-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                    >
                      {w === 1 ? t_old.game.fromStart : `${w}${t_old.game.waveUnit}`}
                    </button>
                  ));
                })()}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Party Builder */}
      {!isStarted && !(isMultiplayer && heroDataSubmitted) && (
        <div className="card mb-4">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-white">
              {t_old.game.partySetup}
              <span className="ml-2 text-xs text-gray-500 font-normal">{t_old.game.partySelectHint}</span>
              <span className={`ml-2 text-xs font-bold ${selectedHeroIds.length >= maxPartySize ? (isSoloRaid ? 'text-green-400' : 'text-red-400') : selectedHeroIds.length === 0 ? 'text-gray-500' : 'text-yellow-400'}`}>
                ({selectedHeroIds.length}/{maxPartySize}){isSoloRaid && selectedHeroIds.length < maxPartySize ? ` — ${(t_old.game.moreNeeded || '{n}명 더 선택 필요').replace('{n}', String(maxPartySize - selectedHeroIds.length))}` : ''}
              </span>
            </h2>
            <div className="flex items-center gap-1.5 flex-wrap">
              {Object.entries(roleComposition).map(([role, count]) => (
                <span key={role} className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ color: ROLE_COLORS[role], backgroundColor: ROLE_COLORS[role] + '22', border: `1px solid ${ROLE_COLORS[role]}55` }}>
                  {(t_old.roles as Record<string, string>)[role] ?? ROLE_LABELS[role]} {count}
                </span>
              ))}
            </div>
          </div>

          {/* 검색창 */}
          <div className="mb-3">
            <input
              id="hero-search"
              name="hero-search"
              type="text"
              value={heroSearch}
              onChange={e => setHeroSearch(e.target.value)}
              placeholder={t_old.game.partySearchPlaceholder}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
            />
          </div>

          {/* 시너지 미리보기 (용 원소는 1명도 표시) */}
          {selectedHeroIds.length >= 1 && (() => {
            const selectedDefs = selectedHeroIds.map(id => HERO_DEFINITIONS.find(h => h.id === id)).filter(Boolean) as import('../game/heroData').HeroDefinition[];
            const previewSynergies = calcPreviewSynergies(selectedDefs, t_i18n);
            if (previewSynergies.length === 0) return null;
            return (
              <div className="mb-3 p-2 rounded-lg bg-gray-800/80 border border-gray-600">
                <div className="text-xs font-bold text-yellow-400 mb-1.5">{t_old?.game?.activeSynergyPreview || '✨ 활성 시너지'}</div>
                <div className="flex flex-wrap gap-1.5">
                  {previewSynergies.map((syn, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg border"
                      style={{
                        backgroundColor: SYNERGY_TIER_COLORS[syn.tier] + '15',
                        borderColor: SYNERGY_TIER_COLORS[syn.tier] + '55',
                      }}
                    >
                      <span className="font-bold" style={{ color: SYNERGY_TIER_COLORS[syn.tier] }}>
                        {syn.name} ({syn.count})
                      </span>
                      <span className="text-gray-400">— {syn.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="grid grid-cols-5 gap-2">
            {HERO_DEFINITIONS.filter(h => {
              if (!ownedHeroIds.includes(h.id)) return false;
              if (!heroSearch.trim()) return true;
              const q = heroSearch.trim().toLowerCase();
              const routeId = heroSaveData[h.id]?.activeRouteId ?? h.classRoutes[0].id;
              const route = h.classRoutes.find(r => r.id === routeId) ?? h.classRoutes[0];
              const overrideRole = (h.isProtagonist && protagonistSave) ? protagonistSave.selectedRole : undefined;
              const effectiveRole = overrideRole ?? route.role ?? h.role;
              const translatedHeroName = ((t_old.heroes as Record<string, { name?: string }>)[h.id]?.name || h.name).toLowerCase();
              const translatedRole = ((t_old.roles as Record<string, string>)[effectiveRole] ?? ROLE_LABELS[effectiveRole] ?? '').toLowerCase();
              const raceKey = RACE_NAME_TO_KEY[h.raceName];
              const elemKey = ELEM_NAME_TO_KEY[h.elementName];
              const translatedRace = ((t_old.synergy as any)?.race?.[raceKey]?.name || h.raceName).toLowerCase();
              const translatedElem = ((t_old.synergy as any)?.element?.[elemKey]?.name || h.elementName).toLowerCase();
              return (
                h.name.toLowerCase().includes(q) ||
                translatedHeroName.includes(q) ||
                h.raceName.toLowerCase().includes(q) ||
                translatedRace.includes(q) ||
                h.elementName.toLowerCase().includes(q) ||
                translatedElem.includes(q) ||
                translatedRole.includes(q) ||
                h.grade.toLowerCase().includes(q)
              );
            }).map(hero => {
              const star = (hero.isProtagonist && protagonistSave) ? protagonistSave.starRating : (heroSaveData[hero.id]?.starRating ?? 1);
              const mult = STAR_MULT[Math.max(0, star - 1) as 0 | 1 | 2 | 3 | 4];
              const isSelected = selectedHeroIds.includes(hero.id);
              // 현재 선택된 루트 기반 유효 역할 계산
              const cardRouteId = heroSaveData[hero.id]?.activeRouteId ?? hero.classRoutes[0].id;
              const cardRoute = hero.classRoutes.find(r => r.id === cardRouteId) ?? hero.classRoutes[0];
              const cardOverrideRole = (hero.isProtagonist && protagonistSave) ? protagonistSave.selectedRole : undefined;
              const cardEffectiveRole: Role = cardOverrideRole ?? cardRoute.role ?? hero.role;
              const roleColor = ROLE_COLORS[cardEffectiveRole] ?? '#6b7280';
              const combat = calcHeroCombatStats(hero, star, cardRouteId, cardOverrideRole);
              const heroDisplayName = (t_old.heroes as Record<string, { name?: string }>)[hero.id]?.name || hero.name;
              return (
                <button key={hero.id} onClick={() => toggleHero(hero.id)}
                  disabled={!isSelected && selectedHeroIds.length >= maxPartySize}
                  className="p-3 rounded-xl border-2 text-left transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed"
                  style={isSelected
                    ? { borderColor: roleColor, background: roleColor + '15' }
                    : { borderColor: '#374151', background: '#0f172a', opacity: 0.45 }
                  }
                >
                  {/* 프로필 이미지 (portrait 있으면 GIF/전용이미지, 없으면 스프라이트 크롭) */}
                  <div className="w-full h-16 rounded-lg mb-1.5 relative overflow-hidden bg-gray-900"
                    style={{ border: `1px solid ${roleColor}44` }}>
                    {hero.portrait ? (
                      <img
                        src={hero.portrait}
                        alt={heroDisplayName}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                    ) : HERO_GRAPHIC_IDS.has(hero.id) ? (
                      <div className="absolute inset-0 w-full h-full"
                        style={{
                          backgroundImage: `url("/graphic/${encodeURIComponent(hero.name)}.png")`,
                          backgroundSize: '183.3% 130%',
                          backgroundPosition: '0% 0%',
                          backgroundRepeat: 'no-repeat'
                        }}
                      />
                    ) : null}
                    <span className="absolute top-1 left-1 text-[9px] font-black px-1 rounded leading-tight"
                      style={{ color: GRADE_COLORS[hero.grade], backgroundColor: '#000000aa' }}>
                      {hero.grade}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs font-semibold text-white truncate">{heroDisplayName}</span>
                  </div>
                  <div className="text-xs font-medium mb-1.5" style={{ color: roleColor }}>
                    {(t_old.roles as Record<string, string>)[cardEffectiveRole] ?? ROLE_LABELS[cardEffectiveRole]}
                  </div>
                  <div className="flex gap-px mb-2">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className="text-xs" style={{ color: s <= star ? '#facc15' : '#1f2937' }}>★</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div className="text-gray-500">HP <span className="text-green-400 font-mono">{Math.round(hero.baseStats.hp * mult)}</span></div>
                    <div className="text-gray-500">ATK <span className="text-red-400 font-mono">{combat.finalAtk}</span></div>
                    <div className="text-gray-500">ASPD <span className="text-yellow-400 font-mono">{combat.attackCooldown}</span></div>
                    <div className="text-gray-500">DPS <span className="text-rose-400 font-mono">{combat.dps}</span></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1.5">
                    {((k => (t_old.synergy as any)?.race?.[k]?.name || hero.raceName)(RACE_NAME_TO_KEY[hero.raceName]))} · {((k => (t_old.synergy as any)?.element?.[k]?.name || hero.elementName)(ELEM_NAME_TO_KEY[hero.elementName]))}
                  </div>
                  {isSelected && (
                    <div className="text-xs font-bold mt-1.5" style={{ color: roleColor }}>{t_old.game.heroSelected}</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Game Canvas */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-2 mb-4 overflow-hidden relative">
        {/* 드래그앤드롭 힌트 (게임 시작 전, 솔로만) */}
        {!isStarted && !isGuest && !isMultiplayer && !heroDataSubmitted && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-yellow-300 bg-black/60 px-3 py-1 rounded pointer-events-none z-10 whitespace-nowrap">
            {t_old.game.dragHint}
          </div>
        )}
        {isMultiplayer && !isStarted && heroDataSubmitted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded z-10 backdrop-blur-[1px]">
            <div className="text-center">
              <p className="text-yellow-400 text-lg font-bold mb-2 animate-pulse">
                {isHost
                  ? (heroDataReady ? '✓ 모든 데이터 준비 완료!' : '⏳ 영웅 데이터 수집 중...')
                  : (heroDataReady ? '✓ 준비 완료!' : '⏳ 영웅 데이터 수집 중...')}
              </p>
              <p className="text-gray-300 text-sm">
                {isHost
                  ? (heroDataReady ? '상단 [게임 시작] 버튼을 눌러주세요' : `다른 플레이어를 기다리고 있습니다... ${heroSubmitStatus ? `(${heroSubmitStatus.submitted}/${heroSubmitStatus.total})` : ''}`)
                  : (heroDataReady ? '호스트가 게임을 시작하기를 기다리는 중...' : `제출 현황: ${heroSubmitStatus ? `(${heroSubmitStatus.submitted}/${heroSubmitStatus.total})` : ''}`)}
              </p>
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="rounded block mx-auto"
          style={{
            maxWidth: '100%',
            height: 'auto',
            cursor: !isStarted && !isGuest && !heroDataSubmitted ? 'grab' : 'default',
          }}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
        />
        {/* 웨이브 제한시간 카운트다운 (레이드·무한모드 제외, wave 진행 중 표시) */}
        {isStarted && gameState?.phase === 'wave' && !isSoloRaid && !isRaidMode && maxWave < 1000 && (() => {
          const remaining = Math.ceil(60 - (gameState.waveElapsedTime ?? 0));
          if (remaining > 30) return null;
          const isUrgent = remaining <= 10;
          return (
            <div className={`absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg font-bold text-sm shadow-lg pointer-events-none
              ${isUrgent ? 'bg-red-900/90 text-red-300 border border-red-500 animate-pulse' : 'bg-yellow-900/80 text-yellow-300 border border-yellow-700'}`}>
              ⏱ {remaining}초
            </div>
          );
        })()}
        <div className="absolute bottom-2 right-2 flex items-center bg-black/60 px-2 py-1 rounded">
          <label className="text-xs text-gray-300 flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showNormalNames}
              onChange={(e) => setShowNormalNames(e.target.checked)}
              className="w-3 h-3 accent-yellow-500 rounded bg-gray-700 border-gray-600 focus:ring-yellow-500 focus:ring-offset-gray-900"
            />
            {t_old.game.showNormalMonsterNames}
          </label>
        </div>
      </div>

      {/* Bottom Panel: Hero Info */}
      {gameState && (
        <div className="grid grid-cols-5 gap-3">
          {gameState.heroes.map((hero) => {
            // 소환수 필터링: 시전자 ID 일치 + 생존
            const mySummons = (gameState.summons || []).filter(s => s.summonerId === hero.id && s.isAlive);
            return (
              <div key={hero.id} className="space-y-2">
                <div
                  className={`card p-3 border-l-4 transition-opacity duration-300 ${hero.isAlive ? '' : 'opacity-40'}`}
                  style={{ borderLeftColor: hero.color }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white truncate">{getHeroDisplayName(hero)}</span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded font-bold"
                      style={{ backgroundColor: hero.color + '33', color: hero.color }}
                    >
                      {roleLabel(hero.role)}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 mb-2 truncate">
                    {hero.specNameKey ? t_i18n(hero.specNameKey) : hero.specName} | {hero.raceNameKey ? t_i18n(hero.raceNameKey) : getTranslatedRace(hero.raceName, t_i18n)}
                  </div>

                  {/* HP Bar */}
                  <div className="mb-1">
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-gray-500">{t_i18n('common.hp')}</span>
                      <span className={hero.hp / hero.maxHp > 0.3 ? 'text-green-400' : 'text-red-400 font-bold'}>
                        {Math.max(0, Math.ceil(hero.hp))}/{hero.maxHp}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 ease-out"
                        style={{
                          width: `${Math.max(0, (hero.hp / hero.maxHp) * 100)}%`,
                          backgroundColor: hero.hp / hero.maxHp > 0.3 ? COLORS.hp_bar_fill : COLORS.hp_bar_low,
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] text-gray-500 mt-1 font-mono">
                    <div className="flex justify-between"><span>ATK</span> <span className="text-gray-300">{hero.atk}</span></div>
                    <div className="flex justify-between"><span>DEF</span> <span className="text-gray-300">{hero.def}</span></div>
                    <div className="flex justify-between"><span>SPD</span> <span className="text-gray-300">{hero.speed}</span></div>
                    <div className="flex justify-between"><span>RNG</span> <span className="text-gray-300">{hero.attackRange}</span></div>
                    <div className="flex justify-between"><span>ASPD</span> <span className="text-yellow-400">{hero.attackCooldown}</span></div>
                    <div className="flex justify-between"><span>DPS</span> <span className="text-red-400">{Math.round(hero.atk / hero.attackCooldown)}</span></div>
                  </div>
                </div>

                {/* Summon Status (Below Hero Card) */}
                {mySummons.length > 0 && (
                  <div className="space-y-1 animation-fade-in">
                    {mySummons.map(s => (
                      <div key={s.id} className="bg-gray-800/60 border border-gray-700/50 rounded-lg p-2 flex flex-col gap-1 shadow-md">
                        <div className="flex justify-between items-center px-0.5">
                          <span className="text-[10px] font-black" style={{ color: s.color }}>{getSummonDisplayName(s.skillId, s.displayName, s.displayNameKey)}</span>
                          <span className="text-[9px] text-gray-400 font-mono">HP {Math.max(0, Math.ceil(s.hp))}</span>
                        </div>
                        <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full transition-all duration-500"
                            style={{
                              width: `${Math.max(0, (s.hp / s.maxHp) * 100)}%`,
                              backgroundColor: s.hp / s.maxHp > 0.3 ? s.color : '#EF4444'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Synergy Panel + Boss Log */}
      {gameState && (gameState.synergies.length > 0 || gameState.bossAbilityLog.length > 0) && (
        <div className="grid grid-cols-2 gap-3 mt-3">
          {/* Active Synergies */}
          {gameState.synergies.length > 0 && (
            <div className="card p-3">
              <h3 className="text-xs font-bold text-yellow-400 mb-2 uppercase tracking-wider">{t_i18n('game.activeSynergies')}</h3>
              <div className="space-y-1">
                {gameState.synergies.map((syn: SynergyBonus, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span
                      className="px-1.5 py-0.5 rounded font-bold text-xs"
                      style={{ backgroundColor: SYNERGY_TIER_COLORS[syn.tier] + '33', color: SYNERGY_TIER_COLORS[syn.tier] }}
                    >
                      {(syn.type === 'race'
                        ? (t_i18n(`synergy.race.${RACE_NAME_TO_KEY[syn.name]}.name`) || syn.name)
                        : (t_i18n(`synergy.element.${ELEM_NAME_TO_KEY[syn.name]}.name`) || syn.name)
                      )} ({syn.count})
                    </span>
                    <span className="text-gray-400">{syn.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Boss Ability Log */}
          {gameState.bossAbilityLog.length > 0 && (
            <div className="card p-3">
              <h3 className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wider">{t_i18n('game.bossAbilities')}</h3>
              <div className="space-y-1">
                {gameState.bossAbilityLog.slice(-5).map((log: string, i: number) => (
                  <div key={i} className="text-xs text-orange-300">
                    {translateBossLog(log)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Damage Meter */}
      {gameState && gameState.meter.length > 0 && (
        <div className="card p-3 mt-3">
          {/* Tab buttons */}
          <div className="flex gap-1 mb-2">
            {(['damage', 'healing', 'taken'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setMeterTab(tab)}
                className={`text-xs px-2 py-1 rounded font-semibold transition-colors ${
                  meterTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {tab === 'damage' ? t_i18n('game.damage') : tab === 'healing' ? t_i18n('game.healing') : t_i18n('game.damageTaken')}
              </button>
            ))}
          </div>
          {/* Rows */}
          {(() => {
            const sorted = [...gameState.meter].sort((a, b) => {
              if (meterTab === 'damage') {
                const totalA = a.damage + a.summons.reduce((s, x) => s + x.damage, 0);
                const totalB = b.damage + b.summons.reduce((s, x) => s + x.damage, 0);
                return totalB - totalA;
              }
              if (meterTab === 'healing') return (b.healing + b.shieldAbsorbed) - (a.healing + a.shieldAbsorbed);
              return b.damageTaken - a.damageTaken;
            });
            const maxVal = sorted.reduce((max, e) => {
              if (meterTab === 'damage') {
                return Math.max(max, e.damage + e.summons.reduce((s, x) => s + x.damage, 0));
              }
              if (meterTab === 'healing') return Math.max(max, e.healing + e.shieldAbsorbed);
              return Math.max(max, e.damageTaken);
            }, 1);

            return (
              <div className="space-y-1.5">
                {sorted.map((entry: HeroMeterEntry) => {
                  const heroTotal = meterTab === 'damage'
                    ? entry.damage
                    : meterTab === 'healing'
                    ? entry.healing
                    : entry.damageTaken;
                  const summonTotal = meterTab === 'damage'
                    ? entry.summons.reduce((s, x) => s + x.damage, 0)
                    : 0;
                  const shieldTotal = meterTab === 'healing' ? (entry.shieldAbsorbed ?? 0) : 0;
                  const total = heroTotal + summonTotal + shieldTotal;
                  if (total === 0) return null;
                  const barWidth = (total / maxVal) * 100;
                  const heroBarPct = total > 0 ? (heroTotal / total) * 100 : 0;

                  return (
                    <div key={entry.heroId} className="text-xs">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-medium" style={{ color: entry.color }}>
                          {getMeterHeroName(entry.heroId, entry.heroName)}
                        </span>
                        <div className="flex items-center gap-1 text-gray-300">
                          {meterTab === 'damage' && entry.summons.filter(s => s.damage > 0).map(s => (
                            <span key={s.skillId} style={{ color: s.color }} className="text-gray-400">
                              {getSummonDisplayName(s.skillId, s.displayName, s.displayNameKey)}: {s.damage.toLocaleString()}
                            </span>
                          ))}
                          {meterTab === 'healing' && shieldTotal > 0 && (
                            <span style={{ color: '#FBBF24' }} className="text-gray-400">
                              {t_i18n('game.shieldLabel')}: {shieldTotal.toLocaleString()}
                            </span>
                          )}
                          <span className="font-bold text-white">{total.toLocaleString()}</span>
                        </div>
                      </div>
                      {/* Stacked bar */}
                      <div className="h-2 rounded overflow-hidden bg-gray-700" style={{ width: `${barWidth}%`, minWidth: '4px' }}>
                        {meterTab === 'damage' && summonTotal > 0 ? (
                          <div className="flex h-full">
                            <div style={{ width: `${heroBarPct}%`, backgroundColor: entry.color }} />
                            {entry.summons.filter(s => s.damage > 0).map(s => (
                              <div
                                key={s.skillId}
                                style={{ width: `${(s.damage / total) * 100}%`, backgroundColor: s.color }}
                              />
                            ))}
                          </div>
                        ) : meterTab === 'healing' && shieldTotal > 0 ? (
                          <div className="flex h-full">
                            <div style={{ width: `${heroBarPct}%`, backgroundColor: '#22C55E' }} />
                            <div style={{ width: `${(shieldTotal / total) * 100}%`, backgroundColor: '#FBBF24' }} />
                          </div>
                        ) : (
                          <div
                            className="h-full"
                            style={{
                              backgroundColor: meterTab === 'healing' ? '#22C55E'
                                : meterTab === 'taken' ? '#EF4444'
                                : entry.color,
                            }}
                          />
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

      {/* 게스트 게임 종료 UI (issue #11) */}
      {isGuest && guestGameEnded && (
        <div className="flex flex-col items-center gap-3 mt-4">
          <h2 className={`text-2xl font-bold ${guestGameEnded.cleared ? 'text-yellow-400' : 'text-red-400'}`}>
            {guestGameEnded.cleared ? t_i18n('game.gameClear') : t_i18n('game.gameOver')}
          </h2>
          <p className="text-gray-300 text-sm">{t_i18n('game.waveLabel')}: {guestGameEnded.wave} | {t_i18n('game.score')}: {guestGameEnded.score}</p>
          <button onClick={() => { const socket = getSocket(); socket.emit('lobby:leave'); navigate('/'); }} className="btn-secondary text-lg px-8 py-3">
            {t_i18n('game.backToMain')}
          </button>
          {returnCountdown !== null && (
            <p className="text-gray-400 text-sm">{returnCountdown}{t_i18n('common.second')} {t_i18n('game.backToMainHint')}</p>
          )}
        </div>
      )}

      {/* Game Over Actions */}
      {gameState && (gameState.phase === 'victory' || gameState.phase === 'defeat') && !isGuest && (
        <div className="flex flex-col items-center gap-3 mt-4">
          {/* 무한 디펜스 패배: 체크포인트 UI */}
          {maxWave === 1000 && gameState.phase === 'defeat' && !isGuest && (() => {
            const checkpoints: number[] = [];
            for (let c = 25; c <= defDeathWave; c += 25) checkpoints.push(c);
            return (
              <div className="text-center mb-2">
                <p className="text-red-400 font-bold mb-1">{t_i18n('game.challengeEnd', { n: defDeathWave })}</p>
                {defBestWave > 0 && <p className="text-amber-400 text-sm font-semibold mb-3">{t_i18n('game.bestRecord', { n: defBestWave })}</p>}
                {checkpoints.length > 0 && (
                  <>
                    <p className="text-xs text-gray-400 mb-2">{t_i18n('game.checkpointStart')}</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-3">
                      {checkpoints.map(cp => (
                        <button key={cp} onClick={() => handleContinueFromCheckpoint(cp)} className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg text-sm transition-colors">{t_i18n('game.waveN', { n: cp })}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })()}
          <div className="flex gap-3">
            {!isGuest && (
              <button onClick={handleReset} className="btn-primary text-lg px-8 py-3">
                {t_i18n('game.playAgain')}
              </button>
            )}
            <button
              onClick={() => navigate('/')}
              className="btn-secondary text-lg px-8 py-3"
            >
              {t_i18n('game.backToMain')}
            </button>
          </div>
          {returnCountdown !== null && (
            <p className="text-gray-400 text-sm">
              {returnCountdown}{t_i18n('common.second')} {t_i18n('game.backToMainHint')}
            </p>
          )}
        </div>
      )}

      {/* 무한 디펜스 1000층 완주 보상 모달 */}
      {defenseHeroGranted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-in fade-in duration-500">
          <div className="relative max-w-sm w-full bg-gray-900 border-2 border-blue-500 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(59,130,246,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-blue-400 text-sm font-bold tracking-widest uppercase mb-2">{t_i18n('game.reward1000Title')}</div>
              <h2 className="text-3xl font-black text-white mb-6">{t_i18n('game.legendaryGuardian')}</h2>
              <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-blue-700 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
                <div className="text-5xl mb-3">🛡️</div>
                <div className="text-2xl font-bold text-blue-400 mb-1">{t_i18n('game.defenseHero')}</div>
                <div className="text-sm text-gray-400 mb-3">{t_i18n('races.human')} · {t_i18n('elements.holy')}</div>
                <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-400 text-xs font-bold uppercase mb-3">SSR GRADE</div>
                <p className="text-xs text-gray-300 whitespace-pre-line leading-relaxed">{t_i18n('game.defenseHeroDesc')}</p>
              </div>
              <p className="text-gray-400 text-sm mb-6 whitespace-pre-line leading-relaxed">
                {t_i18n('game.heroJoinMsg', { name: t_i18n('game.defenseHero') })}
              </p>
              <button onClick={() => setDefenseHeroGranted(false)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-lg transition-colors">
                {t_i18n('common.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 게임 중 이탈 확인 모달 */}
      {blockedTx && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl border-2 border-yellow-500/60 p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚠️</div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">{t_i18n('game.exitConfirmTitle')}</h3>
              {maxWave === 1000 && !isGuest ? (
                <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
                  {t_i18n('game.exitConfirmDescInfinite', { wave: gameState?.currentWave ?? 0, gold: gameState?.goldEarned ?? 0 })}
                </p>
              ) : (
                <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
                  {t_i18n('game.exitConfirmDescNormal')}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  if (autoPausedRef.current) {
                    engineRef.current?.togglePause();
                    autoPausedRef.current = false;
                  }
                  setBlockedTx(null);
                }}
                className="w-full btn-secondary py-2.5 font-semibold"
              >
                {t_i18n('game.continuePlay')}
              </button>
              {maxWave === 1000 && !isGuest && (
                <button
                  onClick={async () => { await doInfiniteSave(); blockedTx.retry(); }}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
                >
                  {t_i18n('game.saveAndExit')}
                </button>
              )}
              <button
                onClick={() => {
                  blockedTx.unblock();
                  blockedTx.retry();
                }}
                className="w-full bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
              >
                {t_i18n('game.justExit')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 탭 전환 확인 모달 (일시정지 상태에서 던전방어↔던전공격 클릭 시) */}
      {pendingTabPath && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl border-2 border-yellow-500/60 p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚠️</div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">{t_i18n('game.exitConfirmTitle')}</h3>
              {maxWave === 1000 && !isGuest ? (
                <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
                  {t_i18n('game.exitConfirmDescInfinite', { wave: gameState?.currentWave ?? 0, gold: gameState?.goldEarned ?? 0 })}
                </p>
              ) : (
                <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
                  {t_i18n('game.exitConfirmDescNormal')}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setPendingTabPath(null)}
                className="w-full btn-secondary py-2.5 font-semibold"
              >
                {t_i18n('game.continuePlay')}
              </button>
              {maxWave === 1000 && !isGuest && (
                <button
                  onClick={() => { setPendingTabPath(null); handleInfiniteSaveAndExit(pendingTabPath!); }}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
                >
                  {t_i18n('game.saveAndExit')}
                </button>
              )}
              <button
                onClick={() => { navigate(pendingTabPath!); setPendingTabPath(null); }}
                className="w-full bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
              >
                {t_i18n('game.justExit')}
              </button>
            </div>
          </div>
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
