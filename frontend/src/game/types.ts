// ========================
// Game Entity Types
// ========================

export type Role = 'tank' | 'melee_dps' | 'ranged_dps' | 'healer' | 'cc' | 'mechanic';
export type MonsterType = 'normal' | 'elite' | 'boss';
export type GamePhase = 'prep' | 'wave' | 'wave_clear' | 'victory' | 'defeat';

// ========================
// Synergy System
// ========================
export interface SynergyBonus {
  type: 'race' | 'element';
  name: string;       // e.g. '오크', '화염'
  count: number;      // number of heroes with this tag
  tier: 1 | 2 | 3 | 4 | 5;   // 2=tier1, 3=tier2, 4=tier3, 5=tier4(AR영웅 필요)
  description?: string | null;
  // Actual bonus multipliers (applied to heroes)
  bonuses: {
    hpMult?: number;
    atkMult?: number;
    defBonus?: number;
    defMult?: number;    // % defense increase
    healMult?: number;
    ccDurationMult?: number;
    executeThresholdBonus?: number; // extra % below which execute triggers
    lifestealMult?: number;
    spdMult?: number;        // movement speed multiplier
    atkSpeedMult?: number;   // attack speed multiplier (divides attackCooldown)
    critDamageMult?: number; // multiplier for critical damage
  };
}

export interface ActiveSynergies {
  list: SynergyBonus[];
}

export interface Position {
  x: number;
  y: number;
}

// ========================
// Projectile System
// ========================
export type ProjectileType = 'fireball' | 'frostbolt' | 'heal_orb' | 'shadow_bolt';

export interface Projectile {
  id: number;
  heroId?: number;           // 소유 영웅 ID (영웅 발사 시)
  summonId?: number;         // 소유 소환수 ID (소환수 발사 시)
  monsterId?: number;        // 소유 수비대 ID (오펜스 모드 적 발사 시)
  targetId: number;          // monster id (or hero/summon id for heal_orb)
  targetType: 'monster' | 'hero' | 'summon' | 'wall';
  wallTarget?: Position;     // 벽 공격 투사체일 때 목표 좌표
  position: Position;
  damage: number;
  speed: number;             // pixels per second
  type: ProjectileType;
  color: string;
  size: number;
  slowDuration?: number;     // frostbolt: slow duration on hit
  isHeal?: boolean;
  healAmount?: number;
}

// ========================
// Summon System
// ========================

/** Summon skill configuration (embedded in GameHero from equipped skills) */
export interface SummonConfig {
  skillId: string;
  displayName: string;
  displayNameKey?: string;
  hp: number;
  atk: number;
  def: number;
  spd: number;
  role: string;        // 'tank' | 'melee_dps' | 'ranged_dps'
  attackRange: number;
  duration: number;    // seconds; 0 = permanent until killed
  color: string;
}

/** Active summon entity in the game world */
export interface GameSummon {
  id: number;
  summonerId: number;  // owning hero's id
  skillId: string;
  displayName: string;
  displayNameKey?: string;
  role: string;
  maxHp: number;
  hp: number;
  atk: number;
  def: number;
  speed: number;
  attackRange: number;
  maxDuration: number; // 0 = permanent
  duration: number;    // remaining seconds
  position: Position;
  isAlive: boolean;
  attackCooldown: number;
  attackTimer: number;
  targetId: number | null;
  color: string;
  size: number;
  /** 위협 배율 (탱커 소환수 2.0~, 딜러 1.0) */
  threatMult: number;
  /** 근딜 전용: 전투의 리듬 스택 (0, 1, 2) */
  battleRhythmCount?: number;
  /** 메카닉 포탑 전용: 벽 접근 적 광역 근딜 쿨다운 타이머 */
  wallAoETimer?: number;
}

export interface GameHero {
  id: number;
  heroDefId?: string;
  name: string;
  nameKey?: string;
  role: Role;
  specName: string;
  specNameKey?: string;
  activeSpecNames?: string[]; // 봉인 해제 시 모든 특성 이름 포함
  isUnsealed?: boolean;       // 봉인 해제 여부
  className: string;
  classNameKey?: string;
  raceName: string;
  raceNameKey?: string;
  elementName: string;

  // Stats
  maxHp: number;
  hp: number;
  atk: number;
  def: number;
  speed: number;
  attackRange: number;
  aggroRadius: number;
  /**
   * 위협 배율 (threat multiplier)
   * 데미지/힐 1당 생성 위협량 = amount × threatMult
   * 탱커 기본 2.0, 도발의 외침 장착 시 5.0
   */
  threatMult: number;

  /** 소환수 설정 (소환 스킬 장착 시) */
  summonConfigs?: SummonConfig[];

  /** 장착된 스킬 ID 목록 (영혼 흡수 등 특수 스킬 판정용) */
  equippedSkillIds?: string[];

  /** AR(Achievement) 영웅 여부 — 5티어 시너지 활성화 조건 */
  isArHero?: boolean;

  /** 고유 스킬 수치 (현재 성급 기준, %). 예: 펠다 5성=35 */
  uniqueSkillValue?: number;

  /**
   * 보조 역할 (Feldah 등 복합 영웅 전용).
   * 'healer': 기본 role 행동 + 별도 healTimer로 주기적 힐 오브 발사.
   */
  secondaryRole?: 'healer';
  /** 근딜 전용: 전투의 리듬 스택 (0, 1, 2) */
  battleRhythmCount?: number;
  /** 보조 힐 쿨다운 타이머 (secondaryRole 전용) */
  healTimer?: number;
  /** 보조 힐 쿨다운 주기 (초). 기본 4.0 */
  healCooldown?: number;
  /** 메카닉: 포탑 재소환 쿨타임 카운트다운 (초) */
  turretRespawnTimer?: number;
  /** 메카닉: 이전 프레임의 살아있는 포탑 수 (사망 감지용) */
  turretPrevCount?: number;

  /**
   * 영혼석 무적 플래그 (튜토리얼 전용).
   * true이면 이 영웅의 HP는 1 미만으로 내려가지 않는다.
   */
  isInvincible?: boolean;
  /** 일시 피해 감소 (0~1, spirit_link 등). 0=없음 */
  dmgReducePct?: number;
  dmgReduceTimer?: number;

  // Position (fixed during wave)
  position: Position;

  // State
  isAlive: boolean;
  attackCooldown: number;
  attackTimer: number;
  skillTimers?: Record<string, number>;

  // Visual
  color: string;
  size: number;
  sprite?: string;
  /** 인게임 GIF 스프라이트 (절대 경로 — sprite 스프라이트시트 대신 사용) */
  gifSprite?: string;
}

export interface GameMonster {
  id: number;
  name: string;
  displayName: string;
  displayNameKey?: string;
  monsterType: MonsterType;

  maxHp: number;
  hp: number;
  atk: number;
  def: number;
  speed: number;
  isRanged: boolean;

  position: Position;
  isAlive: boolean;
  /**
   * 어그로 테이블: "type:id" (e.g. "hero:1", "summon:5") → 누적 위협 수치
   * 몬스터는 이 테이블에서 가장 높은 값의 개체를 타겟으로 삼음
   */
  aggroTable: Record<string, number>;
  targetId: number | null; // aggro target id
  targetType: 'hero' | 'summon' | null;
  isSlowed: boolean;
  slowTimer: number;
  isStunned: boolean;
  stunTimer: number;
  /** 출혈 DoT (kaern_rake 등) */
  isBleed?: boolean;
  bleedTimer?: number;
  bleedDmg?: number;
  /** 받는 피해 배율 (낙인 등, 1.0 = 기본) */
  dmgTakenMult?: number;

  attackCooldown: number;
  attackTimer: number;

  /** offense 모드: 수비대 역할 (AI 행동 분기) */
  defenderRole?: 'tank' | 'melee_dps' | 'ranged_dps' | 'cc' | 'healer';
  /** offense 모드: 힐러 수비대 힐 쿨다운 타이머 */
  enemyHealTimer?: number;
  /** offense 기믹: 벽 파괴 전까지 AI 정지 + 타겟 불가, 벽 파괴 시 활성화 */
  hidesBehindWall?: boolean;

  /** 광역 공격 여부 (전방 클리브) */
  hasCleave?: boolean;
  /** 오라 데미지 (초당 피해) */
  auraDamage?: number;
  /** 오라 반경 */
  auraRadius?: number;
  /** CC(슬로우/기절) 완전 면역 (레이드 보스용) */
  immuneToCc?: boolean;
  /** 자폭병: 아무것도 공격하지 않고 오직 벽으로 돌진 → 접촉 시 벽 maxHp 50% 폭발 */
  isSuicideBomber?: boolean;
  /** 철갑 피부: 모든 공격이 1 데미지만 입힘 (연타형 영웅 필요) */
  ironSkin?: boolean;
  /** 벽 붕괴: 특정 X 위치 도달 시 전 영웅 즉사 광역기 발동 (DPS 체크 보스) */
  wallCrash?: boolean;
  /** wallCrash 발동 여부 (중복 발동 방지) */
  wallCrashTriggered?: boolean;

  /** 쌍둥이 보스 기믹용 */
  vulnerability?: 'melee' | 'ranged'; // 특정 직업군에게만 데미지를 입음
  twinId?: string;          // 쌍둥이 보스 식별자

  /** 천살 마기사 기믹용 */
  hasSplitDamage?: boolean;  // 피해 분산 로직 활성화
  isBlinking?: boolean;      // 점멸 중 (화면에서 사라짐)
  burstTimer?: number;       // 점멸 후 중앙 폭발 잔여 시간

  /** 가르두 기믹용 */
  onlyVulnerableToSummons?: boolean; // 오직 소환수(GameSummon)의 공격만 허용

  /** 8번 레이드 기믹용 */
  rolePriority?: boolean;    // 힐러/메카닉 우선 타겟팅 여부

  // Boss abilities
  affix?: BossAffix;
  affixCooldown: number;
  affixTimer: number;
  isEnraged: boolean;

  color: string;
  size: number;
}

export interface WallTalentEffects {
  hpBonus?: number;
  defBonus?: number;
  reflectPct?: number;
  auraDamage?: number;
  auraSlowPct?: number;
  elementBuffPct?: number;
  recoveryPerWave?: number;
  globalSlowLowHp?: boolean;
  slowZone?: string;
  /** 생명 계열 */
  heroDefBonus?: number;
  healAlliesPerWave?: number;
  healAlliesAura?: number;
  shieldOnWaveStartPct?: number;
  goldBonusPct?: number;
  reviveOnce?: boolean;
  reviveAllPct?: number;
  /** 번개 계열 */
  lightningReflect?: number;
  chainLightningCount?: number;
  projectileBlockPct?: number;
  lowHpDefBonus?: number;
  waveStartLightning?: boolean;
  waveStartStun?: boolean;

  // ── 제 2의 벽 ──
  lightHealBothWalls?: number;
  lightAuraDamage?: number;
  shadowExecute?: number;
  naturePoisonAura?: number;
  bloodVampireAura?: number;
  timeCooldownReduction?: number;
  timeSlowAura?: number;

  // ── 제 3의 벽 ──
  heroSpdBonusPct?: number;
  heroAtkSpeedBonusPct?: number;
  massEarthquake?: number;
  earthHpBonus?: number;
  arcaneAmpPct?: number;
  arcaneExplosion?: number;
  voidWeaken?: number;
  voidHealOnKill?: number;
  stormAuraDmg?: number;
  stormChainCount?: number;
}

/** 지속 치유 (HoT) */
export interface HealOverTime {
  id: number;
  targetId: number;
  targetType: 'hero' | 'summon';
  amountPerTick: number;
  totalTicks: number;
  currentTick: number;
  interval: number; // 초 단위 (보통 1s)
  timer: number;
  color: string;
}

/** 보호막 */
export interface Shield {
  targetId: number;
  targetType: 'hero' | 'summon';
  amount: number;
  maxAmount: number;
  duration: number;
  /** 보호막을 건 영웅 ID (미터기 기록용) */
  casterId?: number;
}

/** 힐러 특수 효과 (봉화 등) */
export interface HealerEffect {
  type: 'beacon' | 'earth_shield' | 'lightning_shield';
  sourceId: number;
  targetId: number;
  value?: number;
}

export interface Tower {
  hp: number;
  maxHp: number;
  level: number;
  position: Position;
  /** 활성화된 특성 효과들 */
  talents: WallTalentEffects;
}

export type BossAffix = 'enrage' | 'heal_aura' | 'summon' | 'aoe_slam' | 'none';

export interface WaveConfig {
  waveNumber: number;
  monsters: {
    type: 'normal' | 'elite' | 'boss';
    name: string;
    displayName: string;
    displayNameKey?: string;
    count: number;
    hp: number;
    atk: number;
    def: number;
    speed: number;
    isRanged: boolean;
    color: string;
    affix?: BossAffix;
    /** offense 모드: 커스텀 스폰 X 좌표 */
    startX?: number;
    /** offense 모드: 커스텀 스폰 Y 좌표 */
    startY?: number;
    /** offense 모드: 수비대 역할 */
    defenderRole?: 'tank' | 'melee_dps' | 'ranged_dps' | 'cc' | 'healer';
    /** offense 기믹: 벽 뒤 은신 (벽 파괴 전 AI 정지 + 타겟불가) */
    hidesBehindWall?: boolean;
    /** 개별 공격 쿨타임 (기본 1.0s) */
    attackCooldown?: number;
    /** 전방 클리브 공격 여부 */
    hasCleave?: boolean;
    /** 오라 피해 (보스/우두머리) */
    auraDamage?: number;
    /** 오라 반경 */
    auraRadius?: number;
    /** CC(슬로우/기절) 완전 면역 */
    immuneToCc?: boolean;
    /** 자폭병 플래그 */
    isSuicideBomber?: boolean;
    /** 철갑 피부: 모든 공격이 1 데미지만 입힘 */
    ironSkin?: boolean;
    /** 벽 붕괴: 특정 X 위치 도달 시 전 영웅 즉사 광역기 */
    wallCrash?: boolean;
    /** 어픽스 발동 쿨타임 (초) */
    affixCooldown?: number;
    /** 특정 역할군에게만 피해를 입음 */
    vulnerability?: 'melee' | 'ranged';
    /** 쌍둥이 보스 식별자 */
    twinId?: string;
    /** 초기 무적 시간 (초) */
    invincibleTimer?: number;
    /** 피해 분산 로직 활성화 */
    hasSplitDamage?: boolean;
    /** 소환수 피해만 허용 */
    onlyVulnerableToSummons?: boolean;
    /** 역할군 우선순위 타겟팅 */
    rolePriority?: boolean;
  }[];
}

/** 벽 특성 기반 근딜·탱커 보상 (10티어마다 1스택, 최대 3스택/카테고리) */
export interface MeleeTankBonuses {
  // ── 게임 시작 시 정적 적용 ──
  atkPct: number;       // ATK % 증가 (화염/비전/폭풍)
  defFlat: number;      // DEF 플랫 증가 (강철/대지)
  hpPct: number;        // MaxHP % 증가 (냉기/빛)
  atkSpdPct: number;    // 공격 쿨타임 감소 % (바람/시간)
  // ── 런타임 효과 ──
  reflectPct: number;   // 피격 시 반사 % (전기)
  lifestealPct: number; // 공격 시 흡혈 % (혈액)
  executePct: number;   // 처형 발동 HP% 추가 (그림자)
  armorPenPct: number;  // 몬스터 DEF 무시 % (공허)
  poisonOnHit: number;  // 타격당 추가 독 피해 (자연)
  healOnKill: number;   // 처치 시 HP 회복 (생명)
  meleeCleaveRadius: number; // 근딜 광역 공격 반경 px (폭풍) 0=비활성
}

export interface GameState {
  phase: GamePhase;
  currentWave: number;
  maxWave: number;
  heroes: GameHero[];
  monsters: GameMonster[];
  /** 벽 배열: walls[0] = 가장 바깥쪽(먼저 파괴), walls.at(-1) = 가장 안쪽(마지막 보루) */
  walls: Tower[];
  meleeTankBonuses: MeleeTankBonuses;
  score: number;
  goldEarned: number;
  nextMonsterId: number;
  waveTimer: number; // time between waves
  isPaused: boolean;
  gameSpeed: number; // 1 = normal, 2 = fast
  synergies: SynergyBonus[]; // active synergy bonuses
  bossAbilityLog: string[]; // recent boss ability messages
  projectiles: Projectile[]; // active projectiles
  nextProjectileId: number;
  summons: GameSummon[];  // active summons
  nextSummonId: number;
  meter: HeroMeterEntry[]; // damage/heal meter
  
  // ── 힐 시스템 추가 ──
  hots: HealOverTime[];
  shields: Shield[];
  healerEffects: HealerEffect[];
  healingFlashes: { x: number; y: number; timer: number; color: string }[];
  // ── AI 용사 전술 지휘 오오라 ──
  aiAuraBonus: number;

  // ── 쌍둥이 보스 부활 타이머 ──
  twinDeathTimer?: number;
  // ── 웨이브 제한시간 ──
  waveElapsedTime: number; // 현재 웨이브에서 경과한 시간 (초)
  }
  // ========================
  // Damage Meter
  // ========================

export interface SummonMeterEntry {
  skillId: string;
  displayName: string;
  displayNameKey?: string;
  color: string;
  damage: number;
}

export interface HeroMeterEntry {
  heroId: number;
  heroName: string;
  color: string;
  damage: number;         // 영웅 본인이 준 피해
  healing: number;        // 힐량
  shieldAbsorbed: number; // 보호막으로 흡수한 피해량
  damageTaken: number;    // 받은 피해
  summons: SummonMeterEntry[];
}

export interface DamageNumber {
  x: number;
  y: number;
  value: number;
  color: string;
  timer: number;
  isHeal: boolean;
}

export interface Explosion {
  x: number;
  y: number;
  color: string;
  timer: number;     // 남은 시간 (초)
  maxTimer: number;  // 전체 지속 시간
  maxRadius: number; // 최대 반경 (px)
}
