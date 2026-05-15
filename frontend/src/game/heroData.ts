import type { Role } from './types';

// ========================
// Grade & Core Types
// ========================
export type HeroGrade = 'R' | 'SR' | 'SSR' | 'AR' | 'LR';

/** 소환수 스탯 (악흑 워록 Feldah 전용) */
export interface SummonStats {
  hp: number;
  atk: number;
  def: number;
  spd: number;
  role: string;
  attackRange: number;
  /** 소환 지속 시간 (초) */
  duration: number;
  /** 소환수 표시 이름 */
  displayName: string;
  /** 소환수 표시 이름 번역 키 */
  displayNameKey?: string;
}

export interface RouteSkill {
  id: string;
  name: string;
  nameKey?: string;
  description: string;
  descriptionKey?: string;
  /** 스킬 테마 색상 */
  color: string;
  /** 공유 스킬 여부 (여러 영웅이 공통으로 사용) */
  isShared: boolean;
  /**
   * 고유스킬 또는 다른 스킬과의 시너지 설명
   * 예: "고유스킬 [가시 본능]과 연계: 2회 타격 각각에 고유 확률 적용 → 최대 6회"
   */
  synergyNote?: string;
  synergyNoteKey?: string;
  /** 구매 골드 비용 */
  cost: number;
  /**
   * true이면 같은 루트의 다른 3스킬을 모두 구매해야 해금
   * 보통 루트의 마지막(4번째) 스킬에 적용
   */
  isFinal?: boolean;
  /** 소환수 스탯 (소환 스킬 전용) */
  summonStats?: SummonStats;
}

export interface ClassRoute {
  id: string;
  /** 루트 이름 (예: '방어', '분노') */
  name: string;
  nameKey?: string;
  /** 루트 테마 색상 */
  color: string;
  /**
   * 이 루트를 선택했을 때 영웅의 인게임 역할.
   * 미설정 시 HeroDefinition.role 사용 (기본 역할 유지).
   */
  role?: Role;
  /**
   * 이 루트가 활성화됐을 때 고유스킬이 변형되는 형태
   * 수치(values)는 HeroDefinition.uniqueSkill.baseValues 공유
   */
  uniqueVariant: {
    name: string;
    nameKey?: string;
    descriptionTemplate: string; // {value}{unit} 플레이스홀더 사용
    descriptionTemplateKey?: string;
  };
  /**
   * 이 루트에서 선택 가능한 스킬 목록.
   * 일반 SR 영웅: 4개 고정. 주인공 올라운더: 빈 배열 (동적 풀로 대체).
   */
  skills: RouteSkill[];
  /** 루트별 공격사거리 오버라이드 (조화 등 원딜 루트 전용) */
  attackRange?: number;
  /** 루트별 공격 쿨타임 오버라이드 (사격냥꾼 등 느린 단타 루트 전용) */
  attackCooldown?: number;
}

export interface HeroDefinition {
  id: string;
  name: string;
  nameKey?: string;
  grade: HeroGrade;
  /** 기본 역할 (활성 루트 기준) */
  role: Role;
  /**
   * 주인공 전용: 루트별 역할 매핑
   * routeId → Role. 활성 루트에 따라 게임 내 역할 결정.
   */
  routeRoles?: Record<string, Role>;
  raceName: string;
  raceNameKey?: string;
  elementName: string;
  elementNameKey?: string;
  /** 현재 성급 (1~5) */
  starRating: 1 | 2 | 3 | 4 | 5;
  lore: string;
  loreKey?: string;
  /** 고유 패시브 스킬 공통 수치 - 루트별 variant에서 설명이 바뀌어도 수치는 동일 */
  uniqueSkill: {
    baseValues: [number, number, number, number, number];
    unit: string;
  };
  /**
   * 성급 업그레이드 골드 비용
   * [1→2, 2→3, 3→4, 4→5]
   */
  starUpgradeCosts: [number, number, number, number];
  /**
   * 전직 루트 목록. 일반 SR = 2루트, 주인공 SSR = 5루트.
   * 최소 2개 이상.
   */
  classRoutes: ClassRoute[];
  /** 최대 장착 가능 스킬 수 (기본 3, 주인공 5) */
  maxEquippedSkills?: number;
  /** true이면 주인공 — 이름을 유저 닉네임으로 동적 치환 */
  isProtagonist?: boolean;
  baseStats: {
    hp: number;
    atk: number;
    def: number;
    spd: number;
    attackRange: number;
    /** 종족/영웅 고유 공격 쿨다운(초). 미설정 시 역할 기본값 사용. */
    attackCooldown?: number;
  };
  /** 역할 표시 색상 */
  color: string;
  /** 인게임 그래픽 리소스 (선택 사항) */
  sprite?: string;
  /** 커스텀 프로필 이미지 URL (GIF 등 — sprite 크롭 대신 전용 이미지 사용) */
  portrait?: string;
  /** 인게임 GIF 스프라이트 절대 경로 (sprite 스프라이트시트 대신 사용) */
  gifSprite?: string;
  /** 성급당 공격속도 보너스 (예: 0.05면 성급당 5% 단축) */
  starAtkSpeedBonus?: number;
}

// ========================
// 영웅 영입 가격 (상점)
// ========================
/** 등급(grade) 기반 상점 영입 가격을 반환합니다. */
export function getHeroPrice(grade: HeroGrade): number {
  switch (grade) {
    case 'R':   return 200;
    case 'SR':  return 500;
    case 'SSR': return 1200;
    default:    return 500;
  }
}

/** 
 * SHARED 스킬 풀
 * 도발(provoke)은 시스템 내장화(탱커 기본 능력)에 따라 제거됨
 */
const SHARED: Record<string, Omit<RouteSkill, 'synergyNote' | 'isFinal'>> = {
  bastion: { id: 'shared_bastion', name: '보루의 기세', nameKey: 'skills.shared_bastion.name', description: '아군 전체의 방어력이 12 증가합니다.', descriptionKey: 'skills.shared_bastion.description', color: '#6b7280', isShared: true, cost: 300 },
  multi_strike: { id: 'shared_multi_strike', name: '연속 일격', nameKey: 'skills.shared_multi_strike.name', description: '25% 확률로 같은 대상에게 2회 공격합니다.', descriptionKey: 'skills.shared_multi_strike.description', color: '#ef4444', isShared: true, cost: 300 },
  berserk: { id: 'shared_berserk', name: '광폭화', nameKey: 'skills.shared_berserk.name', description: 'HP가 50% 이하로 떨어지면 공격속도 40% 증가, 받는 피해 10% 증가.', descriptionKey: 'skills.shared_berserk.description', color: '#b91c1c', isShared: true, cost: 400 },
  lifesteal: { id: 'shared_lifesteal', name: '피의 갈증', nameKey: 'skills.shared_lifesteal.name', description: '공격 시 입힌 피해의 15%를 자신의 HP로 흡수합니다.', descriptionKey: 'skills.shared_lifesteal.description', color: '#7f1d1d', isShared: true, cost: 400 },
  magic_amp: { id: 'shared_magic_amp', name: '마력 증폭', nameKey: 'skills.shared_magic_amp.name', description: '공격력이 30% 증가합니다. 마법 공격의 크기도 커집니다.', descriptionKey: 'skills.shared_magic_amp.description', color: '#d97706', isShared: true, cost: 350 },
  frost_nova: { id: 'shared_frost_nova', name: '프로스트 노바', nameKey: 'skills.shared_frost_nova.name', description: '주변 반경 120px의 적에게 3초간 슬로우를 적용합니다.', descriptionKey: 'skills.shared_frost_nova.description', color: '#06b6d4', isShared: true, cost: 150 },
  cold_heart: { id: 'shared_cold_heart', name: '차가운 심장', nameKey: 'skills.shared_cold_heart.name', description: '슬로우 상태의 적에게 입히는 모든 피해가 40% 증가합니다.', descriptionKey: 'skills.shared_cold_heart.description', color: '#0284c7', isShared: true, cost: 400 },
  blizzard: { id: 'shared_blizzard', name: '눈보라', nameKey: 'skills.shared_blizzard.name', description: 'CC (슬로우/빙결) 지속시간이 50% 증가합니다.', descriptionKey: 'skills.shared_blizzard.description', color: '#7dd3fc', isShared: true, cost: 300 },
  purify: { id: 'shared_purify', name: '정화', nameKey: 'skills.shared_purify.name', description: '아군 1명의 디버프 1개를 즉시 제거합니다.', descriptionKey: 'skills.shared_purify.description', color: '#fde68a', isShared: true, cost: 200 },
  curse: { id: 'shared_curse', name: '저주', nameKey: 'skills.shared_curse.name', description: '대상의 공격력을 10초간 25% 감소시킵니다.', descriptionKey: 'skills.shared_curse.description', color: '#7c3aed', isShared: true, cost: 250 },
  shield_wall: { id: 'shared_shield_wall', name: '방패 벽', nameKey: 'skills.shared_shield_wall.name', description: '받는 모든 피해가 20% 감소합니다.', descriptionKey: 'skills.shared_shield_wall.description', color: '#4b5563', isShared: true, cost: 300 },
};

export const HERO_DEFINITIONS: HeroDefinition[] = [
  // 0. 용사 (SSR)
  {
    id: 'protagonist', name: '용사', nameKey: 'heroes.protagonist.name', grade: 'SSR', role: 'tank', raceName: '인간', elementName: '빛', starRating: 1,
    lore: '예언서에 기록된 전설의 용사. 다른 영웅들의 힘을 흡수하여 무한히 성장한다.', loreKey: 'heroes.protagonist.lore',
    uniqueSkill: { baseValues: [1, 2, 3, 4, 5], unit: '슬롯' }, starUpgradeCosts: [200, 500, 1000, 3000], isProtagonist: true,
    classRoutes: [
      { 
        id: 'protagonist_all', name: '올라운더', nameKey: 'heroes.protagonist.routes.protagonist_all.name', color: '#e11d48', 
        uniqueVariant: { 
          name: '영웅의 그릇', nameKey: 'heroes.protagonist.routes.protagonist_all.variantName',
          descriptionTemplate: '다른 영웅이 해금한 스킬을 최대 {value}슬롯까지 장착합니다.',
          descriptionTemplateKey: 'heroes.protagonist.routes.protagonist_all.variantDesc'
        }, 
        skills: [] 
      }
    ],
    baseStats: { hp: 550, atk: 60, def: 30, spd: 3, attackRange: 300 }, color: '#e11d48',
  },
  // 0-B. 디펜스 용사 (LR) - 무한 디펜스 1000층 클리어 보상
  {
    id: 'protagonist_defense', name: '디펜스 용사', nameKey: 'heroes.protagonist_defense.name', grade: 'LR', role: 'tank', raceName: '인간', elementName: '신성', starRating: 1,
    lore: '무한 던전 1000층을 돌파한 전설의 수호자. 수많은 영웅들의 고유 특성을 자신의 것으로 만들어 최강의 방어선을 구축한다.', loreKey: 'heroes.protagonist_defense.lore',
    uniqueSkill: { baseValues: [1, 1, 2, 2, 3], unit: '개' }, starUpgradeCosts: [200, 500, 1000, 3000], isProtagonist: true,
    classRoutes: [
      { 
        id: 'protagonist_defense_all', name: '올라운더', nameKey: 'heroes.protagonist_defense.routes.protagonist_defense_all.name', color: '#3b82f6', 
        uniqueVariant: { 
          name: '특성 흡수', nameKey: 'heroes.protagonist_defense.routes.protagonist_defense_all.variantName',
          descriptionTemplate: '다른 영웅의 고유 특성을 최대 {value}개 흡수하여 강력한 패시브를 얻습니다.',
          descriptionTemplateKey: 'heroes.protagonist_defense.routes.protagonist_defense_all.variantDesc'
        }, 
        skills: [] 
      }
    ],
    baseStats: { hp: 650, atk: 65, def: 45, spd: 3, attackRange: 300 }, color: '#3b82f6',
  },
  // 0-C. AI 용사 (LR) - AI 협동 무한 1000층 클리어 보상
  {
    id: 'protagonist_ai', name: 'AI 용사', nameKey: 'heroes.protagonist_ai.name', grade: 'LR', role: 'ranged_dps', raceName: '기계', elementName: '번개', starRating: 1,
    lore: 'AI 협동 무한 던전 1000층을 돌파한 전략 인공지능. 방대한 전투 데이터로 파티 전체의 효율을 극대화한다.', loreKey: 'heroes.protagonist_ai.lore',
    uniqueSkill: { baseValues: [30, 40, 50, 65, 85], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], isProtagonist: true,
    classRoutes: [{ id: 'protagonist_ai_all', name: '올라운더', nameKey: 'heroes.protagonist_ai.routes.protagonist_ai_all.name', color: '#a855f7', uniqueVariant: { name: '전술 지휘 오오라', nameKey: 'heroes.protagonist_ai.routes.protagonist_ai_all.variantName', descriptionTemplate: '파티 전체의 모든 능력치(공속/체력/공격력/방어력)를 {value}% 향상시킵니다.', descriptionTemplateKey: 'heroes.protagonist_ai.routes.protagonist_ai_all.variantDesc' }, skills: [] }],
    baseStats: { hp: 500, atk: 95, def: 20, spd: 3.2, attackRange: 650 }, color: '#a855f7',
  },
  // 0-D. 어택 용사 (LR) - 던전 공격 무한 1000층 클리어 보상
  {
    id: 'protagonist_offense', name: '어택 용사', nameKey: 'heroes.protagonist_offense.name', grade: 'LR', role: 'melee_dps', raceName: '인간', elementName: '화염', starRating: 1,
    lore: '무한 던전 1000층 공략을 완수한 최강의 공격자. 그 누구도 막을 수 없는 파괴적인 공격력으로 적의 심장을 파고든다.', loreKey: 'heroes.protagonist_offense.lore',
    uniqueSkill: { baseValues: [5, 10, 15, 20, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], isProtagonist: true,
    classRoutes: [{ id: 'protagonist_offense_all', name: '올라운더', nameKey: 'heroes.protagonist_offense.routes.protagonist_offense_all.name', color: '#f59e0b', uniqueVariant: { name: '독단의 창', nameKey: 'heroes.protagonist_offense.routes.protagonist_offense_all.variantName', descriptionTemplate: '전투 중 아군이 쓰러질수록 공격력이 {value}% 증가합니다.', descriptionTemplateKey: 'heroes.protagonist_offense.routes.protagonist_offense_all.variantDesc' }, skills: [] }],
    baseStats: { hp: 450, atk: 130, def: 15, spd: 4.0, attackRange: 55 }, color: '#f59e0b',
  },
  // 0-E. 레이드 용사 (LR) - AI 레이드 무한 1000웨이브 클리어 보상
  {
    id: 'protagonist_raid', name: '레이드 용사', nameKey: 'heroes.protagonist_raid.name', grade: 'LR', role: 'ranged_dps', raceName: '엘프', elementName: '신성', starRating: 1,
    lore: '수없이 쏟아지는 레이드 보스들을 홀로 격파한 전설의 레이더. 보스를 사냥하기 위해 최적화된 몸과 마음을 지닌다.', loreKey: 'heroes.protagonist_raid.lore',
    uniqueSkill: { baseValues: [10, 20, 30, 50, 80], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], isProtagonist: true,
    classRoutes: [{ id: 'protagonist_raid_all', name: '올라운더', nameKey: 'heroes.protagonist_raid.routes.protagonist_raid_all.name', color: '#10b981', uniqueVariant: { name: '보스 사냥꾼', nameKey: 'heroes.protagonist_raid.routes.protagonist_raid_all.variantName', descriptionTemplate: '보스/엘리트에게 가하는 피해가 {value}% 증가합니다.', descriptionTemplateKey: 'heroes.protagonist_raid.routes.protagonist_raid_all.variantDesc' }, skills: [] }],
    baseStats: { hp: 480, atk: 110, def: 18, spd: 3.5, attackRange: 600 }, color: '#10b981',
  },
  // ──────────────────────────────────────────────
  // AR (Achievement Hero) 등급 영웅
  // 업적 달성 시 해금. 종족 5티어 시너지 활성화 조건.
  // maxEquippedSkills: 3 (봉인 해제 시 +2 = 5)
  // ──────────────────────────────────────────────

  // AR-01. 자렌텐 (AR) - 언데드 군주 / 해금: 언데드 영웅 5명 보유
  {
    id: 'ar_jarlten', name: '자렌텐', nameKey: 'heroes.ar_jarlten.name', grade: 'AR', role: 'tank', raceName: '언데드', elementName: '암흑', starRating: 1,
    lore: '고대의 영웅이 죽음 이후 언데드 군주로 부활했다. 아군 언데드 전군을 지휘하는 존재로서, 그의 존재만으로 언데드 군단이 각성한다.', loreKey: 'heroes.ar_jarlten.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'ar_jarlten_overlord', name: '군주', nameKey: 'heroes.ar_jarlten.routes.overlord.name', color: '#6d28d9', role: 'tank',
        uniqueVariant: { 
          name: '죽음의 의지', nameKey: 'heroes.ar_jarlten.routes.overlord.variantName',
          descriptionTemplate: '피격 시 {value}% 확률로 피해 완전 무효화.', descriptionTemplateKey: 'heroes.ar_jarlten.routes.overlord.variantDesc'
        },
        skills: [
          { id: 'ar_jarlten_corpse_nova', name: '시체 폭발', nameKey: 'heroes.ar_jarlten.skills.corpse_nova.name', description: '타겟 주위 120px ATK×5 폭발 피해', descriptionKey: 'heroes.ar_jarlten.skills.corpse_nova.desc', color: '#7c3aed', isShared: false, cost: 300 },
          { id: 'ar_jarlten_undead_aura', name: '군주의 오라', nameKey: 'heroes.ar_jarlten.skills.undead_aura.name', description: '패시브: 자신 ATK +25%, HP +20% 영구 증가', descriptionKey: 'heroes.ar_jarlten.skills.undead_aura.desc', color: '#5b21b6', isShared: false, cost: 400 },
          { id: 'ar_jarlten_deathmark', name: '죽음의 낙인', nameKey: 'heroes.ar_jarlten.skills.deathmark.name', description: '모든 적 받는 피해 20% 증가 10초', descriptionKey: 'heroes.ar_jarlten.skills.deathmark.desc', color: '#4c1d95', isShared: false, cost: 600 },
          { id: 'ar_jarlten_am_shell', name: '대마법 보호막', nameKey: 'heroes.ar_jarlten.skills.am_shell.name', description: '5초간 모든 마법 피해 무효화', descriptionKey: 'heroes.ar_jarlten.skills.am_shell.desc', color: '#065f46', isShared: false, cost: 800 },
          { id: 'ar_jarlten_raise_dead', name: '죽은 자 소생', nameKey: 'heroes.ar_jarlten.skills.raise_dead.name', description: '쓰러진 아군 1명을 HP 50%로 즉시 부활', descriptionKey: 'heroes.ar_jarlten.skills.raise_dead.desc', color: '#3730a3', isShared: false, cost: 2000, isFinal: true },
        ],
      },
      {
        id: 'ar_jarlten_fearlord', name: '공포군주', nameKey: 'heroes.ar_jarlten.routes.fearlord.name', color: '#1e1b4b', role: 'cc',
        uniqueVariant: { 
          name: '공포의 군주', nameKey: 'heroes.ar_jarlten.routes.fearlord.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 2초 공포(이동불가).', descriptionTemplateKey: 'heroes.ar_jarlten.routes.fearlord.variantDesc'
        },
        skills: [
          { id: 'ar_jarlten_banshee_wail', name: '밴시의 울부짖음', nameKey: 'heroes.ar_jarlten.skills.banshee_wail.name', description: '주변 180px 적 3초 기절', descriptionKey: 'heroes.ar_jarlten.skills.banshee_wail.desc', color: '#4338ca', isShared: false, cost: 300 },
          { id: 'ar_jarlten_death_coil_ar', name: '죽음의 고리', nameKey: 'heroes.ar_jarlten.skills.death_coil.name', description: '단일 ATK×6 암흑 + 50% 흡혈', descriptionKey: 'heroes.ar_jarlten.skills.death_coil.desc', color: '#3730a3', isShared: false, cost: 400 },
          { id: 'ar_jarlten_spectral_summon', name: '망령 소환', nameKey: 'heroes.ar_jarlten.skills.spectral_summon.name', description: '망령 소환 (20초, ATK×0.8, CC)', descriptionKey: 'heroes.ar_jarlten.skills.spectral_summon.desc', color: '#312e81', isShared: false, cost: 600,
            summonStats: { displayName: '공포의 망령', displayNameKey: 'heroes.ar_jarlten.summons.spectral.name', hp: 280, atk: 75, def: 8, spd: 3.5, role: 'cc', attackRange: 200, duration: 20 } },
          { id: 'ar_jarlten_sleep', name: '수면', nameKey: 'heroes.ar_jarlten.skills.sleep.name', description: '적 1명을 8초간 잠재움', descriptionKey: 'heroes.ar_jarlten.skills.sleep.desc', color: '#1e1b4b', isShared: false, cost: 800 },
          { id: 'ar_jarlten_army_of_dead', name: '사자의 군단', nameKey: 'heroes.ar_jarlten.skills.army_of_dead.name', description: '군단 언데드 소환 (강화형)', descriptionKey: 'heroes.ar_jarlten.skills.army_of_dead.desc', color: '#1e1b4b', isShared: false, cost: 2000, isFinal: true,
            summonStats: { displayName: '군단 언데드', displayNameKey: 'heroes.ar_jarlten.summons.army.name', hp: 350, atk: 90, def: 15, spd: 4.5, role: 'melee_dps', attackRange: 45, duration: 18 } },
        ],
      },
      {
        id: 'ar_jarlten_necromancy', name: '강령술', nameKey: 'heroes.ar_jarlten.routes.necromancy.name', color: '#4c1d95', role: 'ranged_dps',
        uniqueVariant: { 
          name: '영혼 포식', nameKey: 'heroes.ar_jarlten.routes.necromancy.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 대상의 영혼을 흡수하여 공격력 강화.', descriptionTemplateKey: 'heroes.ar_jarlten.routes.necromancy.variantDesc'
        },
        skills: [
          { id: 'ar_jarlten_shadow_bolt', name: '어둠의 화살', nameKey: 'heroes.ar_jarlten.skills.shadow_bolt.name', description: '단일 ATK×4 암흑 피해', descriptionKey: 'heroes.ar_jarlten.skills.shadow_bolt.desc', color: '#7c3aed', isShared: false, cost: 300 },
          { id: 'ar_jarlten_corruption', name: '부패', nameKey: 'heroes.ar_jarlten.skills.corruption.name', description: '10초간 적에게 지속 암흑 피해', descriptionKey: 'heroes.ar_jarlten.skills.corruption.desc', color: '#6d28d9', isShared: false, cost: 400 },
          { id: 'ar_jarlten_soulfire', name: '영혼 불꽃', nameKey: 'heroes.ar_jarlten.skills.soulfire.name', description: '적의 영혼을 불태워 강력한 암흑 피해', descriptionKey: 'heroes.ar_jarlten.skills.soulfire.desc', color: '#4c1d95', isShared: false, cost: 600 },
          { id: 'ar_jarlten_raise_skeleton', name: '해골 소환', nameKey: 'heroes.ar_jarlten.skills.raise_skeleton.name', description: '해골 전사 2명 소환', descriptionKey: 'heroes.ar_jarlten.skills.raise_skeleton.desc', color: '#3730a3', isShared: false, cost: 800,
            summonStats: { displayName: '해골 전사', displayNameKey: 'heroes.ar_jarlten.summons.skeleton.name', hp: 250, atk: 60, def: 10, spd: 3.5, role: 'melee_dps', attackRange: 45, duration: 20 } },
          { id: 'ar_jarlten_death_and_decay', name: '죽음과 부패', nameKey: 'heroes.ar_jarlten.skills.death_and_decay.name', description: '지정 위치에 장판을 깔아 광역 지속 피해', descriptionKey: 'heroes.ar_jarlten.skills.death_and_decay.desc', color: '#1e1b4b', isShared: false, cost: 2000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 820, atk: 95, def: 55, spd: 2.5, attackRange: 45 }, color: '#6d28d9',
  },

  // AR-02. 고르그 굳주먹 (AR) - 오크 전쟁족장 / 해금: 오크 영웅 4명 보유
  {
    id: 'ar_gorg', name: '고르그 굳주먹', nameKey: 'heroes.ar_gorg.name', grade: 'AR', role: 'melee_dps', raceName: '오크', elementName: '화염', starRating: 1,
    lore: '전설의 오크 전쟁족장. 오크 부족 전체가 그의 이름 아래 뭉친다. 그의 포효 하나에 전장이 뒤흔들린다.', loreKey: 'heroes.ar_gorg.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'ar_gorg_warchief', name: '전쟁족장', nameKey: 'heroes.ar_gorg.routes.warchief.name', color: '#b45309', role: 'melee_dps',
        uniqueVariant: { 
          name: '전쟁족장의 의지', nameKey: 'heroes.ar_gorg.routes.warchief.variantName',
          descriptionTemplate: '처치 시 {value}% 확률로 즉시 재공격.', descriptionTemplateKey: 'heroes.ar_gorg.routes.warchief.variantDesc'
        },
        skills: [
          { id: 'ar_gorg_bladestorm_ar', name: '블레이드스톰', nameKey: 'heroes.ar_gorg.skills.bladestorm.name', description: '주변 130px 모든 적 ATK×6 회전베기', descriptionKey: 'heroes.ar_gorg.skills.bladestorm.desc', color: '#d97706', isShared: false, cost: 300 },
          { id: 'ar_gorg_war_stomp_ar', name: '전투 발구르기', nameKey: 'heroes.ar_gorg.skills.war_stomp.name', description: '주변 150px 기절 2.5초 + ATK×4 피해', descriptionKey: 'heroes.ar_gorg.skills.war_stomp.desc', color: '#b45309', isShared: false, cost: 400 },
          { id: 'ar_gorg_avatar_ar', name: '아바타', nameKey: 'heroes.ar_gorg.skills.avatar.name', description: '패시브: HP 40% 이하 시 공격력 +50%, 흡혈 +20%', descriptionKey: 'heroes.ar_gorg.skills.avatar.desc', color: '#92400e', isShared: false, cost: 600 },
          { id: 'ar_gorg_mortal_strike', name: '거인의 타격', nameKey: 'heroes.ar_gorg.skills.mortal_strike.name', description: '강력한 내려치기 ATK×10 피해', descriptionKey: 'heroes.ar_gorg.skills.mortal_strike.desc', color: '#7c2d12', isShared: false, cost: 800 },
          { id: 'ar_gorg_deathwish', name: '죽음의 소원', nameKey: 'heroes.ar_gorg.skills.deathwish.name', description: '오크 아군 모두에게 공격력 +25% 오라 [패시브]', descriptionKey: 'heroes.ar_gorg.skills.deathwish.desc', color: '#78350f', isShared: false, cost: 2000, isFinal: true },
        ],
      },
      {
        id: 'ar_gorg_farseer', name: '정령전사', nameKey: 'heroes.ar_gorg.routes.farseer.name', color: '#f97316', role: 'healer',
        uniqueVariant: { 
          name: '대지의 정령', nameKey: 'heroes.ar_gorg.routes.farseer.variantName',
          descriptionTemplate: '치유 시 {value}% 확률로 치유량 2배.', descriptionTemplateKey: 'heroes.ar_gorg.routes.farseer.variantDesc'
        },
        skills: [
          { id: 'ar_gorg_lava_burst_ar', name: '용암 폭발', nameKey: 'heroes.ar_gorg.skills.lava_burst.name', description: '단일 대상 ATK×8 화염 피해', descriptionKey: 'heroes.ar_gorg.skills.lava_burst.desc', color: '#f97316', isShared: false, cost: 300 },
          { id: 'ar_gorg_chain_lightning_ar', name: '연쇄 번개', nameKey: 'heroes.ar_gorg.skills.chain_lightning.name', description: '적 최대 3명에게 ATK×4 연쇄 피해', descriptionKey: 'heroes.ar_gorg.skills.chain_lightning.desc', color: '#fbbf24', isShared: false, cost: 400 },
          { id: 'ar_gorg_healing_rain_ar', name: '치유의 비', nameKey: 'heroes.ar_gorg.skills.healing_rain.name', description: '전체 아군 ATK×4 치유', descriptionKey: 'heroes.ar_gorg.skills.healing_rain.desc', color: '#ea580c', isShared: false, cost: 600 },
          { id: 'ar_gorg_spirit_walk', name: '정령의 이동', nameKey: 'heroes.ar_gorg.skills.spirit_walk.name', description: '위험한 아군에게 순간이동하여 보호막 부여', descriptionKey: 'heroes.ar_gorg.skills.spirit_walk.desc', color: '#f59e0b', isShared: false, cost: 800 },
          { id: 'ar_gorg_earthquake_ar', name: '대지진', nameKey: 'heroes.ar_gorg.skills.earthquake.name', description: '모든 적 4초 슬로우 + ATK×3 광역 피해', descriptionKey: 'heroes.ar_gorg.skills.earthquake.desc', color: '#c2410c', isShared: false, cost: 2000, isFinal: true },
        ],
      },
      {
        id: 'ar_gorg_tank', name: '강철방패', nameKey: 'heroes.ar_gorg.routes.tank.name', color: '#6b7280', role: 'tank',
        uniqueVariant: { 
          name: '불굴의 오크', nameKey: 'heroes.ar_gorg.routes.tank.variantName',
          descriptionTemplate: '받는 피해 {value}% 감소.', descriptionTemplateKey: 'heroes.ar_gorg.routes.tank.variantDesc'
        },
        skills: [
          { id: 'ar_gorg_shield_slam', name: '방패 밀쳐내기', nameKey: 'heroes.ar_gorg.skills.shield_slam.name', description: '적 넉백 + 2초 기절', descriptionKey: 'heroes.ar_gorg.skills.shield_slam.desc', color: '#9ca3af', isShared: false, cost: 300 },
          { id: 'ar_gorg_intervene', name: '가로막기', nameKey: 'heroes.ar_gorg.skills.intervene.name', description: '아군 대신 피해를 받음', descriptionKey: 'heroes.ar_gorg.skills.intervene.desc', color: '#6b7280', isShared: false, cost: 400 },
          { id: 'ar_gorg_demoralizing_shout', name: '사기 저하의 외침', nameKey: 'heroes.ar_gorg.skills.demoralizing_shout.name', description: '주변 적 공격력 30% 감소', descriptionKey: 'heroes.ar_gorg.skills.demoralizing_shout.desc', color: '#4b5563', isShared: false, cost: 600 },
          { id: 'ar_gorg_last_stand', name: '최후의 저항', nameKey: 'heroes.ar_gorg.skills.last_stand.name', description: '최대 HP 50% 증가 15초', descriptionKey: 'heroes.ar_gorg.skills.last_stand.desc', color: '#374151', isShared: false, cost: 800 },
          { id: 'ar_gorg_shield_wall', name: '방패 벽', nameKey: 'heroes.ar_gorg.skills.shield_wall.name', description: '10초간 무적에 가까운 방어력 증가', descriptionKey: 'heroes.ar_gorg.skills.shield_wall.desc', color: '#1f2937', isShared: false, cost: 2000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 720, atk: 145, def: 40, spd: 3.5, attackRange: 45 }, color: '#b45309',
  },

  // AR-03. 발라노스 (AR) - 블러드엘프 피의 마법사 / 해금: 블러드엘프 영웅 5명 보유
  {
    id: 'ar_valanos', name: '발라노스', nameKey: 'heroes.ar_valanos.name', grade: 'AR', role: 'cc', raceName: '블러드엘프', elementName: '비전', starRating: 1,
    lore: '태양샘이 타락하기 전의 힘을 기억하는 마지막 피의 마법사. 마력 흡수로 아군을 강화하고 적을 소멸시킨다.', loreKey: 'heroes.ar_valanos.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'ar_valanos_bloodmage', name: '피의 마법사', nameKey: 'heroes.ar_valanos.routes.bloodmage.name', color: '#dc2626', role: 'cc',
        uniqueVariant: { 
          name: '마력 공명', nameKey: 'heroes.ar_valanos.routes.bloodmage.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 ATK×3 비전 추가 피해.', descriptionTemplateKey: 'heroes.ar_valanos.routes.bloodmage.variantDesc'
        },
        skills: [
          { id: 'ar_val_mana_burn_ar', name: '마나 소각', nameKey: 'heroes.ar_valanos.skills.mana_burn.name', description: '단일 ATK×5 비전 + 50% 흡혈', descriptionKey: 'heroes.ar_valanos.skills.mana_burn.desc', color: '#ef4444', isShared: false, cost: 300 },
          { id: 'ar_val_phoenix_ar', name: '불사조 소환', nameKey: 'heroes.ar_valanos.skills.phoenix.name', description: '불사조 소환 (30초, 원딜, 공격 시 화상)', descriptionKey: 'heroes.ar_valanos.skills.phoenix.desc', color: '#dc2626', isShared: false, cost: 400,
            summonStats: { displayName: '불사조', displayNameKey: 'heroes.ar_valanos.summons.phoenix.name', hp: 400, atk: 130, def: 12, spd: 3.5, role: 'ranged_dps', attackRange: 800, duration: 30 } },
          { id: 'ar_val_flame_strike_ar', name: '화염 강타', nameKey: 'heroes.ar_valanos.skills.flame_strike.name', description: '타겟 주위 100px ATK×6 화염 폭발', descriptionKey: 'heroes.ar_valanos.skills.flame_strike.desc', color: '#b91c1c', isShared: false, cost: 600 },
          { id: 'ar_val_flame_pillar', name: '불기둥', nameKey: 'heroes.ar_valanos.skills.flame_pillar.name', description: '지정 위치에 거대 불기둥 생성 ATK×8', descriptionKey: 'heroes.ar_valanos.skills.flame_pillar.desc', color: '#991b1b', isShared: false, cost: 800 },
          { id: 'ar_val_arcane_nova_ar', name: '비전 대폭발', nameKey: 'heroes.ar_valanos.skills.arcane_nova.name', description: '모든 적에게 ATK×5 비전 폭발', descriptionKey: 'heroes.ar_valanos.skills.arcane_nova.desc', color: '#7f1d1d', isShared: false, cost: 2000, isFinal: true },
        ],
      },
      {
        id: 'ar_valanos_manavampire', name: '마나흡혈귀', nameKey: 'heroes.ar_valanos.routes.manavampire.name', color: '#9f1239', role: 'cc',
        uniqueVariant: { 
          name: '피의 갈망', nameKey: 'heroes.ar_valanos.routes.manavampire.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 대상 2초 침묵.', descriptionTemplateKey: 'heroes.ar_valanos.routes.manavampire.variantDesc'
        },
        skills: [
          { id: 'ar_val_arcane_torrent_ar', name: '비전 급류', nameKey: 'heroes.ar_valanos.skills.arcane_torrent.name', description: '전체 적 3초 침묵 + ATK×3 피해', descriptionKey: 'heroes.ar_valanos.skills.arcane_torrent.desc', color: '#e11d48', isShared: false, cost: 300 },
          { id: 'ar_val_blood_tap_ar', name: '피의 탭', nameKey: 'heroes.ar_valanos.skills.blood_tap.name', description: '패시브: 자신 ATK +40%, HP -15%', descriptionKey: 'heroes.ar_valanos.skills.blood_tap.desc', color: '#be123c', isShared: false, cost: 400 },
          { id: 'ar_val_void_bolt_ar', name: '공허 화살', nameKey: 'heroes.ar_valanos.skills.void_bolt.name', description: '단일 ATK×4 + 2초 공격속도 -50%', descriptionKey: 'heroes.ar_valanos.skills.void_bolt.desc', color: '#9f1239', isShared: false, cost: 600 },
          { id: 'ar_val_polymorph', name: '변이', nameKey: 'heroes.ar_valanos.skills.polymorph.name', description: '적 1명을 8초간 양으로 변이', descriptionKey: 'heroes.ar_valanos.skills.polymorph.desc', color: '#881337', isShared: false, cost: 800 },
          { id: 'ar_val_sunwell_surge_ar', name: '태양샘 분출', nameKey: 'heroes.ar_valanos.skills.sunwell_surge.name', description: '모든 적 ATK×8 + 전체 아군 ATK×3 힐', descriptionKey: 'heroes.ar_valanos.skills.sunwell_surge.desc', color: '#4c0519', isShared: false, cost: 2000, isFinal: true },
        ],
      },
      {
        id: 'ar_valanos_destro', name: '파괴', nameKey: 'heroes.ar_valanos.routes.destro.name', color: '#ea580c', role: 'ranged_dps',
        uniqueVariant: { 
          name: '점화', nameKey: 'heroes.ar_valanos.routes.destro.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 대상 폭발.', descriptionTemplateKey: 'heroes.ar_valanos.routes.destro.variantDesc'
        },
        skills: [
          { id: 'ar_val_immolate', name: '제물', nameKey: 'heroes.ar_valanos.skills.immolate.name', description: '대상에게 15초간 지속 화염 피해', descriptionKey: 'heroes.ar_valanos.skills.immolate.desc', color: '#fb923c', isShared: false, cost: 300 },
          { id: 'ar_val_incinerate', name: '소각', nameKey: 'heroes.ar_valanos.skills.incinerate.name', description: '화염 화살 발사 ATK×3.5', descriptionKey: 'heroes.ar_valanos.skills.incinerate.desc', color: '#f97316', isShared: false, cost: 400 },
          { id: 'ar_val_conflagrate', name: '점화 폭발', nameKey: 'heroes.ar_valanos.skills.conflagrate.name', description: '제물 대상을 폭발시켜 ATK×6 피해', descriptionKey: 'heroes.ar_valanos.skills.conflagrate.desc', color: '#ea580c', isShared: false, cost: 600 },
          { id: 'ar_val_rain_of_fire', name: '불의 비', nameKey: 'heroes.ar_valanos.skills.rain_of_fire.name', description: '지정 위치에 화염 우박 투하', descriptionKey: 'heroes.ar_valanos.skills.rain_of_fire.desc', color: '#c2410c', isShared: false, cost: 800 },
          { id: 'ar_val_chaos_bolt', name: '혼돈의 화살', nameKey: 'heroes.ar_valanos.skills.chaos_bolt.name', description: '방어 무시 강력한 한방 ATK×15', descriptionKey: 'heroes.ar_valanos.skills.chaos_bolt.desc', color: '#7c2d12', isShared: false, cost: 2000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 380, atk: 175, def: 12, spd: 2.8, attackRange: 1400 }, color: '#dc2626',
  },

  // AR-04. 마하루크 (AR) - 타우렌 대지어머니 / 해금: 타우렌 영웅 4명 보유
  {
    id: 'ar_maharuuk', name: '마하루크', nameKey: 'heroes.ar_maharuuk.name', grade: 'AR', role: 'tank', raceName: '타우렌', elementName: '자연', starRating: 1,
    lore: '대지모신의 직계 후계자. 타우렌 부족의 대지 마법으로 방어선을 강화하고 아군을 치유한다.', loreKey: 'heroes.ar_maharuuk.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'ar_maharuuk_earthguard', name: '대지수호자', nameKey: 'heroes.ar_maharuuk.routes.earthguard.name', color: '#15803d', role: 'tank',
        uniqueVariant: { 
          name: '대지의 방패', nameKey: 'heroes.ar_maharuuk.routes.earthguard.variantName',
          descriptionTemplate: '피격 시 {value}% 확률로 주변 아군 방어력 +20 (5초).', descriptionTemplateKey: 'heroes.ar_maharuuk.routes.earthguard.variantDesc'
        },
        skills: [
          { id: 'ar_mah_earth_stomp_ar', name: '대지 발구르기', nameKey: 'heroes.ar_maharuuk.skills.earth_stomp.name', description: '전방 130px 기절 2초 + ATK×4', descriptionKey: 'heroes.ar_maharuuk.skills.earth_stomp.desc', color: '#16a34a', isShared: false, cost: 300 },
          { id: 'ar_mah_stone_bulwark_ar', name: '돌의 보루', nameKey: 'heroes.ar_maharuuk.skills.stone_bulwark.name', description: '전체 아군 방어력 +30, HP 10% 회복', descriptionKey: 'heroes.ar_maharuuk.skills.stone_bulwark.desc', color: '#15803d', isShared: false, cost: 400 },
          { id: 'ar_mah_living_seed_ar', name: '살아있는 씨앗', nameKey: 'heroes.ar_maharuuk.skills.living_seed.name', description: '패시브: 피격 시 자신 HP 8% 즉시 회복', descriptionKey: 'heroes.ar_maharuuk.skills.living_seed.desc', color: '#166534', isShared: false, cost: 600 },
          { id: 'ar_mah_thorns', name: '가시나무', nameKey: 'heroes.ar_maharuuk.skills.thorns.name', description: '아군 전체에게 피해 반사 20% 부여', descriptionKey: 'heroes.ar_maharuuk.skills.thorns.desc', color: '#14532d', isShared: false, cost: 800 },
          { id: 'ar_mah_avatar_earth_ar', name: '대지화신', nameKey: 'heroes.ar_maharuuk.skills.avatar_earth.name', description: '15초간 피해감소 40% + 주변 피해 반사', descriptionKey: 'heroes.ar_maharuuk.skills.avatar_earth.desc', color: '#064e3b', isShared: false, cost: 2000, isFinal: true },
        ],
      },
      {
        id: 'ar_maharuuk_stormcaller', name: '폭풍주술사', nameKey: 'heroes.ar_maharuuk.routes.stormcaller.name', color: '#0e7490', role: 'healer',
        uniqueVariant: { 
          name: '정령의 가르침', nameKey: 'heroes.ar_maharuuk.routes.stormcaller.variantName',
          descriptionTemplate: '치유 시 {value}% 만큼 추가 보호막 부여.', descriptionTemplateKey: 'heroes.ar_maharuuk.routes.stormcaller.variantDesc'
        },
        skills: [
          { id: 'ar_mah_chain_heal_ar', name: '연쇄 치유', nameKey: 'heroes.ar_maharuuk.skills.chain_heal.name', description: 'HP 최저 아군 ATK×5 치유 + 연쇄 ATK×2', descriptionKey: 'heroes.ar_maharuuk.skills.chain_heal.desc', color: '#0891b2', isShared: false, cost: 300 },
          { id: 'ar_mah_ancestral_spirit_ar', name: '조상의 정령', nameKey: 'heroes.ar_maharuuk.skills.ancestral_spirit.name', description: '쓰러진 아군 1명 HP 50% 부활', descriptionKey: 'heroes.ar_maharuuk.skills.ancestral_spirit.desc', color: '#0e7490', isShared: false, cost: 400 },
          { id: 'ar_mah_healing_rain_mah', name: '치유의 비', nameKey: 'heroes.ar_maharuuk.skills.healing_rain.name', description: '전체 아군 ATK×3 광역 치유', descriptionKey: 'heroes.ar_maharuuk.skills.healing_rain.desc', color: '#155e75', isShared: false, cost: 600 },
          { id: 'ar_mah_riptide', name: '성난 해일', nameKey: 'heroes.ar_maharuuk.skills.riptide.name', description: '대상에게 즉시 힐 + 지속 힐 부여', descriptionKey: 'heroes.ar_maharuuk.skills.riptide.desc', color: '#06b6d4', isShared: false, cost: 800 },
          { id: 'ar_mah_bloodlust_ar', name: '영웅심', nameKey: 'heroes.ar_maharuuk.skills.bloodlust.name', description: '15초간 전체 아군 공격속도 +60%', descriptionKey: 'heroes.ar_maharuuk.skills.bloodlust.desc', color: '#164e63', isShared: false, cost: 2000, isFinal: true },
        ],
      },
      {
        id: 'ar_maharuuk_sunwalker', name: '태양길잡이', nameKey: 'heroes.ar_maharuuk.routes.sunwalker.name', color: '#f59e0b', role: 'melee_dps',
        uniqueVariant: { 
          name: '태양의 광휘', nameKey: 'heroes.ar_maharuuk.routes.sunwalker.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 대상 주위에 화염 피해.', descriptionTemplateKey: 'heroes.ar_maharuuk.routes.sunwalker.variantDesc'
        },
        skills: [
          { id: 'ar_mah_crusader_strike', name: '성전사의 일격', nameKey: 'heroes.ar_maharuuk.skills.crusader_strike.name', description: '단일 ATK×4 신성 피해', descriptionKey: 'heroes.ar_maharuuk.skills.crusader_strike.desc', color: '#fde68a', isShared: false, cost: 300 },
          { id: 'ar_mah_judgment', name: '심판', nameKey: 'heroes.ar_maharuuk.skills.judgment.name', description: '대상에게 ATK×5 피해 및 받는 피해 증가', descriptionKey: 'heroes.ar_maharuuk.skills.judgment.desc', color: '#fbbf24', isShared: false, cost: 400 },
          { id: 'ar_mah_holy_light', name: '신성한 빛', nameKey: 'heroes.ar_maharuuk.skills.holy_light.name', description: '자신 주위 아군 ATK×3 치유', descriptionKey: 'heroes.ar_maharuuk.skills.holy_light.desc', color: '#f59e0b', isShared: false, cost: 600 },
          { id: 'ar_mah_wrath', name: '천벌', nameKey: 'heroes.ar_maharuuk.skills.wrath.name', description: '전방 모든 적에게 강력한 빛의 일격', descriptionKey: 'heroes.ar_maharuuk.skills.wrath.desc', color: '#d97706', isShared: false, cost: 800 },
          { id: 'ar_mah_avenging_wrath', name: '응징의 격노', nameKey: 'heroes.ar_maharuuk.skills.avenging_wrath.name', description: '20초간 공격력 50% 증가 및 모든 공격 광역화', descriptionKey: 'heroes.ar_maharuuk.skills.avenging_wrath.desc', color: '#92400e', isShared: false, cost: 2000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 880, atk: 80, def: 58, spd: 2.2, attackRange: 50 }, color: '#15803d',
  },

  // 1. 제다 (SSR) - 언데드
  {
    id: 'zedah', name: '제다', nameKey: 'heroes.zedah.name', grade: 'SSR', role: 'tank', raceName: '언데드', elementName: '화염', starRating: 1,
    lore: '죽음에서 돌아온 수호자. 지옥불로 단련된 방패로 아군을 지킨다.', loreKey: 'heroes.zedah.lore',
    uniqueSkill: { baseValues: [20, 30, 40, 50, 100], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      { 
        id: 'zedah_defense', name: '방어', nameKey: 'heroes.zedah.routes.defense.name', color: '#3b82f6', 
        uniqueVariant: { 
          name: '가시 갑옷', nameKey: 'heroes.zedah.routes.defense.variantName',
          descriptionTemplate: '피격 시 피해의 {value}% 반사.', descriptionTemplateKey: 'heroes.zedah.routes.defense.variantDesc'
        }, 
        skills: [
          { id: 'zedah_lava_armor', name: '용암 갑옷', nameKey: 'heroes.zedah.skills.lava_armor.name', description: '피격 시 적에게 ATK 30% 화염 피해', descriptionKey: 'heroes.zedah.skills.lava_armor.desc', color: '#f97316', isShared: false, cost: 150 }, 
          { id: 'zedah_steel_shield', name: '강철 방패', nameKey: 'heroes.zedah.skills.steel_shield.name', description: '방어력 +25 패시브', descriptionKey: 'heroes.zedah.skills.steel_shield.desc', color: '#6b7280', isShared: false, cost: 200 }, 
          { ...SHARED.bastion }, 
          { id: 'zedah_thorn_edge', name: '가시날의 각인', nameKey: 'heroes.zedah.skills.thorn_edge.name', description: '반사량 +15%', descriptionKey: 'heroes.zedah.skills.thorn_edge.desc', color: '#1d4ed8', isShared: false, cost: 1200, isFinal: true, synergyNote: '가시 갑옷과 스택' }
        ] 
      },
      { 
        id: 'zedah_weapon', name: '무기', nameKey: 'heroes.zedah.routes.weapon.name', color: '#b45309', role: 'melee_dps', 
        uniqueVariant: { 
          name: '지옥불 도검', nameKey: 'heroes.zedah.routes.weapon.variantName',
          descriptionTemplate: '3타마다 ATK×{value}% 추가 화염 피해.', descriptionTemplateKey: 'heroes.zedah.routes.weapon.variantDesc'
        }, 
        skills: [
          { id: 'zedah_weapon_mastery', name: '무기 연마', nameKey: 'heroes.zedah.skills.weapon_mastery.name', description: 'ATK +25% 패시브', descriptionKey: 'heroes.zedah.skills.weapon_mastery.desc', color: '#d97706', isShared: false, cost: 300 }, 
          { id: 'zedah_heat_blade', name: '열화 도검', nameKey: 'heroes.zedah.skills.heat_blade.name', description: '공격 시 ATK 20% 추가 화염 피해', descriptionKey: 'heroes.zedah.skills.heat_blade.desc', color: '#ea580c', isShared: false, cost: 400 }, 
          { ...SHARED.multi_strike }, 
          { id: 'zedah_hellfire_slash', name: '지옥불 베기', nameKey: 'heroes.zedah.skills.hellfire_slash.name', description: '8초마다 전방 160px 내 모든 적에게 ATK×4 화염 피해', descriptionKey: 'heroes.zedah.skills.hellfire_slash.desc', color: '#7c2d12', isShared: false, cost: 1200, isFinal: true }
        ] 
      },
      { 
        id: 'zedah_fury', name: '분노', nameKey: 'heroes.zedah.routes.fury.name', color: '#dc2626', role: 'melee_dps', 
        uniqueVariant: { 
          name: '가시 본능', nameKey: 'heroes.zedah.routes.fury.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 3연타.', descriptionTemplateKey: 'heroes.zedah.routes.fury.variantDesc'
        }, 
        skills: [
          { ...SHARED.multi_strike }, 
          { ...SHARED.berserk }, 
          { ...SHARED.lifesteal }, 
          { id: 'zedah_execute_instinct', name: '집행자', nameKey: 'heroes.zedah.skills.execute_instinct.name', description: 'HP 30% 이하 적에게 공격력 2배', descriptionKey: 'heroes.zedah.skills.execute_instinct.desc', color: '#991b1b', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 800, atk: 30, def: 60, spd: 2, attackRange: 40 }, color: '#3b82f6', sprite: '제다.png',
    portrait: '/graphic2/%EC%A0%9C%EB%8B%A4/%EC%A0%9C%EB%8B%A4idle.gif',
  },
  // 2. 그렉칼 (SR) - 마그하르 오크
  {
    id: 'grelcal', name: '그렉칼', nameKey: 'heroes.grelcal.name', grade: 'SR', role: 'melee_dps', raceName: '마그하르 오크', elementName: '화염', starRating: 1,
    lore: '드레노어의 야성을 간직한 마그하르 전사. 무자비한 힘으로 적을 분쇄한다.', loreKey: 'heroes.grelcal.lore',
    uniqueSkill: { baseValues: [20, 30, 40, 50, 75], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'grelcal_defense', name: '방어', nameKey: 'heroes.grelcal.routes.defense.name', color: '#6b7280', role: 'tank', 
        uniqueVariant: { 
          name: '전사의 의지', nameKey: 'heroes.grelcal.routes.defense.variantName',
          descriptionTemplate: '피격 시 {value}% 확률로 피해 50% 무효화.', descriptionTemplateKey: 'heroes.grelcal.routes.defense.variantDesc'
        }, 
        skills: [
          { id: 'grelcal_shockwave', name: '충격파', nameKey: 'heroes.grelcal.skills.shockwave.name', description: '주변 적 1.5초 기절', descriptionKey: 'heroes.grelcal.skills.shockwave.desc', color: '#92400e', isShared: false, cost: 200 }, 
          { id: 'grelcal_iron_wall', name: '철벽', nameKey: 'heroes.grelcal.skills.iron_wall.name', description: '받는 피해 15% 감소', descriptionKey: 'heroes.grelcal.skills.iron_wall.desc', color: '#374151', isShared: false, cost: 200 }, 
          { ...SHARED.bastion }, 
          { id: 'grelcal_shield_bash', name: '방패 타격', nameKey: 'heroes.grelcal.skills.shield_bash.name', description: '방어력의 50%만큼 추가 공격력', descriptionKey: 'heroes.grelcal.skills.shield_bash.desc', color: '#4b5563', isShared: false, cost: 1200, isFinal: true }
        ] 
      },
      { 
        id: 'grelcal_weapon', name: '무기', nameKey: 'heroes.grelcal.routes.weapon.name', color: '#b45309', 
        uniqueVariant: { 
          name: '전사의 공세', nameKey: 'heroes.grelcal.routes.weapon.variantName',
          descriptionTemplate: '3타마다 {value}% 추가 피해.', descriptionTemplateKey: 'heroes.grelcal.routes.weapon.variantDesc'
        }, 
        skills: [
          { ...SHARED.multi_strike }, 
          { id: 'grelcal_weapon_mastery', name: '무기 연마', nameKey: 'heroes.grelcal.skills.weapon_mastery.name', description: '공격력 +20%, 공속 +10%', descriptionKey: 'heroes.grelcal.skills.weapon_mastery.desc', color: '#d97706', isShared: false, cost: 350 }, 
          { id: 'grelcal_lacerate', name: '열상', nameKey: 'heroes.grelcal.skills.lacerate.name', description: '자신의 방어력이 25% 감소하지만 공격력이 50% 증가', descriptionKey: 'heroes.grelcal.skills.lacerate.desc', color: '#92400e', isShared: false, cost: 450 }, 
          { id: 'grelcal_rend', name: '찢어발기기', nameKey: 'heroes.grelcal.skills.rend.name', description: '15초 출혈, 치사 시 즉사', descriptionKey: 'heroes.grelcal.skills.rend.desc', color: '#7f1d1d', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 550, atk: 171, def: 30, spd: 4, attackRange: 40, attackCooldown: 1.6 }, color: '#b45309',
  },
  // 3. 이스키에르피리아 (SSR) - 블러드엘프
  {
    id: 'iskierpyria', name: '이스키에르피리아', nameKey: 'heroes.iskierpyria.name', grade: 'SSR', role: 'ranged_dps', raceName: '블러드엘프', elementName: '비전', starRating: 1,
    lore: '태양샘의 마력을 받아들인 고위 마법사. 냉기·화염·비전의 세 가지 흐름을 자유로이 다룬다.', loreKey: 'heroes.iskierpyria.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      { id: 'iskier_frost', name: '냉기', nameKey: 'heroes.iskierpyria.routes.frost.name', color: '#06b6d4', role: 'cc', 
        uniqueVariant: { 
          name: '마법 결빙', nameKey: 'heroes.iskierpyria.routes.frost.variantName',
          descriptionTemplate: '냉기 공격 시 {value}% 확률로 2초 빙결.', descriptionTemplateKey: 'heroes.iskierpyria.routes.frost.variantDesc'
        }, 
        skills: [
          { id: 'iskier_frost_nova', name: '프로스트 노바', nameKey: 'heroes.iskierpyria.skills.frost_nova.name', description: '8초마다 주변 120px 적 3초 슬로우', descriptionKey: 'heroes.iskierpyria.skills.frost_nova.desc', color: '#06b6d4', isShared: false, cost: 200 },
          { ...SHARED.cold_heart },
          { ...SHARED.blizzard },
          { id: 'iskier_frost_elemental', name: '냉기의 정령', nameKey: 'heroes.iskierpyria.skills.frost_elemental.name', description: '냉기 정령 소환 (30초, 원딜, 공격 시 슬로우)', descriptionKey: 'heroes.iskierpyria.skills.frost_elemental.desc', color: '#0891b2', isShared: false, cost: 1200, isFinal: true, summonStats: { displayName: '냉기의 정령', displayNameKey: 'heroes.iskierpyria.summons.frost_elemental.name', hp: 300, atk: 100, def: 10, spd: 3, role: 'ranged_dps', attackRange: 900, duration: 30 } }
        ] 
      },
      { 
        id: 'iskier_fire', name: '화염', nameKey: 'heroes.iskierpyria.routes.fire.name', color: '#f97316', role: 'ranged_dps', 
        uniqueVariant: { 
          name: '마법 점화', nameKey: 'heroes.iskierpyria.routes.fire.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 ATK×2 즉발 화상 피해.', descriptionTemplateKey: 'heroes.iskierpyria.routes.fire.variantDesc'
        }, 
        skills: [
          { id: 'iskier_fireball', name: '화염구', nameKey: 'heroes.iskierpyria.skills.fireball.name', description: '6초마다 타겟 주변 80px ATK×5 폭발', descriptionKey: 'heroes.iskierpyria.skills.fireball.desc', color: '#f97316', isShared: false, cost: 200 },
          { ...SHARED.magic_amp },
          { id: 'iskier_ignite', name: '점화', nameKey: 'heroes.iskierpyria.skills.ignite.name', description: '화염 속성 공격 피해 30% 증폭 패시브', descriptionKey: 'heroes.iskierpyria.skills.ignite.desc', color: '#ea580c', isShared: false, cost: 400 },
          { id: 'iskier_meteor', name: '운석 낙하', nameKey: 'heroes.iskierpyria.skills.meteor.name', description: '15초마다 단일 ATK×12 + 주변 50% 피해', descriptionKey: 'heroes.iskierpyria.skills.meteor.desc', color: '#7c2d12', isShared: false, cost: 1200, isFinal: true }
        ] 
      },
      { 
        id: 'iskier_arcane', name: '비전', nameKey: 'heroes.iskierpyria.routes.arcane.name', color: '#a855f7', role: 'cc', 
        uniqueVariant: { 
          name: '비전 공명', nameKey: 'heroes.iskierpyria.routes.arcane.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 비전 투사체 추가 발사.', descriptionTemplateKey: 'heroes.iskierpyria.routes.arcane.variantDesc'
        }, 
        skills: [
          { id: 'iskier_arcane_missiles', name: '비전 미사일', nameKey: 'heroes.iskierpyria.skills.arcane_missiles.name', description: '5초마다 ATK×1.5 투사체 5발 연속 발사', descriptionKey: 'heroes.iskierpyria.skills.arcane_missiles.desc', color: '#c084fc', isShared: false, cost: 200 },
          { ...SHARED.magic_amp },
          { id: 'iskier_arcane_barrage', name: '비전 집중포격', nameKey: 'heroes.iskierpyria.skills.arcane_barrage.name', description: '8초마다 ATK×3 투사체 3발 발사', descriptionKey: 'heroes.iskierpyria.skills.arcane_barrage.desc', color: '#9333ea', isShared: false, cost: 400 },
          { id: 'iskier_arcane_surge', name: '비전 쇄도', nameKey: 'heroes.iskierpyria.skills.arcane_surge.name', description: '15초마다 전체 적에게 ATK×4 비전 폭격', descriptionKey: 'heroes.iskierpyria.skills.arcane_surge.desc', color: '#6b21a8', isShared: false, cost: 1200, isFinal: true }
        ] 
      },
    ],
    baseStats: { hp: 350, atk: 165, def: 10, spd: 2.5, attackRange: 1500 }, color: '#a855f7',
  },
  // 4. 이레네에르피리아 (R) - 나이트본
  {
    id: 'ireneerpiria', name: '이레네에르피리아', nameKey: 'heroes.ireneerpiria.name', grade: 'R', role: 'cc', raceName: '나이트본', elementName: '냉기', starRating: 1,
    lore: '수라마르에서 온 비전술사. 고대 마력으로 적을 제압한다.', loreKey: 'heroes.ireneerpiria.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 100], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'irene_arcane', name: '비전', nameKey: 'heroes.ireneerpiria.routes.arcane.name', color: '#7c3aed', role: 'cc', 
        uniqueVariant: { 
          name: '비전 공명', nameKey: 'heroes.ireneerpiria.routes.arcane.variantName',
          descriptionTemplate: '마법 공격 시 {value}% 확률로 피해 2배.', descriptionTemplateKey: 'heroes.ireneerpiria.routes.arcane.variantDesc'
        }, 
        skills: [
          { id: 'irene_arcane_blast', name: '비전 폭발', nameKey: 'heroes.ireneerpiria.skills.arcane_blast.name', description: 'ATK 200% 단일 피해', descriptionKey: 'heroes.ireneerpiria.skills.arcane_blast.desc', color: '#8b5cf6', isShared: false, cost: 200 }, 
          { ...SHARED.magic_amp }, 
          { id: 'irene_mana_burn', name: '마법 파쇄', nameKey: 'heroes.ireneerpiria.skills.mana_burn.name', description: '버프 제거 + 추가 피해', descriptionKey: 'heroes.ireneerpiria.skills.mana_burn.desc', color: '#6d28d9', isShared: false, cost: 450 }, 
          { id: 'irene_resonance_burst', name: '공명 폭발', nameKey: 'heroes.ireneerpiria.skills.resonance_burst.name', description: '공명 발동 시 주변 50% 피해 전파', descriptionKey: 'heroes.ireneerpiria.skills.resonance_burst.desc', color: '#4c1d95', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 370, atk: 65, def: 12, spd: 3, attackRange: 1500 }, color: '#7c3aed',
  },
  // 5. 디즈가르도 (SSR) - 언데드
  {
    id: 'dizgarldo', name: '디즈가르도', nameKey: 'heroes.dizgarldo.name', grade: 'SSR', role: 'healer', raceName: '언데드', elementName: '신성', starRating: 1,
    lore: '잊혀진 그림자의 교단 사제. 빛과 어둠을 오가며 아군을 치유한다.', loreKey: 'heroes.dizgarldo.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      { 
        id: 'dizgar_discipline', name: '수양', nameKey: 'heroes.dizgarldo.routes.discipline.name', color: '#fbbf24', 
        uniqueVariant: { 
          name: '신성한 방호', nameKey: 'heroes.dizgarldo.routes.discipline.variantName',
          descriptionTemplate: '피격 시 HP 30% 이하면 {value}% 확률로 최대HP 15% 즉시 회복.', descriptionTemplateKey: 'heroes.dizgarldo.routes.discipline.variantDesc'
        }, 
        skills: [
          { id: 'dizgar_light_wave', name: '빛의 파동', nameKey: 'heroes.dizgarldo.skills.light_wave.name', description: '8초마다 전체 아군 ATK×1.5 힐', descriptionKey: 'heroes.dizgarldo.skills.light_wave.desc', color: '#fde68a', isShared: false, cost: 150 },
          { id: 'dizgar_holy_shield', name: '신성한 보호막', nameKey: 'heroes.dizgarldo.skills.holy_shield.name', description: '12초마다 HP 최저 아군 보호막 (최대HP 20%)', descriptionKey: 'heroes.dizgarldo.skills.holy_shield.desc', color: '#fbbf24', isShared: false, cost: 300 },
          { id: 'dizgar_resurrection', name: '부활', nameKey: 'heroes.dizgarldo.skills.resurrection.name', description: '45초마다 쓰러진 아군 1명 HP 30% 부활', descriptionKey: 'heroes.dizgarldo.skills.resurrection.desc', color: '#d97706', isShared: false, cost: 500 },
          { id: 'dizgar_divine_intervention', name: '신성 개입', nameKey: 'heroes.dizgarldo.skills.divine_intervention.name', description: '30초마다 전체 아군 ATK×4 힐 + 보호막', descriptionKey: 'heroes.dizgarldo.skills.divine_intervention.desc', color: '#78350f', isShared: false, cost: 1200, isFinal: true }
        ] 
      },
      { 
        id: 'dizgar_holy', name: '신성', nameKey: 'heroes.dizgarldo.routes.holy.name', color: '#fef9c3', 
        uniqueVariant: { 
          name: '신성한 자비', nameKey: 'heroes.dizgarldo.routes.holy.variantName',
          descriptionTemplate: '힐 시 {value}% 확률로 전체 아군 소량 힐 전파.', descriptionTemplateKey: 'heroes.dizgarldo.routes.holy.variantDesc'
        }, 
        skills: [
          { id: 'dizgar_holy_light', name: '신성한 빛', nameKey: 'heroes.dizgarldo.skills.holy_light.name', description: '8초마다 HP 최저 아군 완전 회복 (ATK×8)', descriptionKey: 'heroes.dizgarldo.skills.holy_light.desc', color: '#fef08a', isShared: false, cost: 150 },
          { id: 'dizgar_prayer_healing', name: '치유의 기도', nameKey: 'heroes.dizgarldo.skills.prayer_healing.name', description: '10초마다 전체 아군 ATK×2 힐', descriptionKey: 'heroes.dizgarldo.skills.prayer_healing.desc', color: '#fbbf24', isShared: false, cost: 300 },
          { id: 'dizgar_holy_beacon', name: '빛의 봉화', nameKey: 'heroes.dizgarldo.skills.holy_beacon.name', description: '빛의 봉화 소환 (25초, 2초마다 HP 최저 아군 힐)', descriptionKey: 'heroes.dizgarldo.skills.holy_beacon.desc', color: '#fcd34d', isShared: false, cost: 500, summonStats: { displayName: '빛의 봉화', displayNameKey: 'heroes.dizgarldo.summons.holy_beacon.name', hp: 250, atk: 50, def: 5, spd: 0, role: 'healer', attackRange: 600, duration: 25 } },
          { id: 'dizgar_divine_hymn', name: '신성한 찬가', nameKey: 'heroes.dizgarldo.skills.divine_hymn.name', description: '15초마다 전체 아군 ATK×5 강힐 + 보호막', descriptionKey: 'heroes.dizgarldo.skills.divine_hymn.desc', color: '#92400e', isShared: false, cost: 1200, isFinal: true }
        ] 
      },
      { 
        id: 'dizgar_shadow', name: '암흑', nameKey: 'heroes.dizgarldo.routes.shadow.name', color: '#7c3aed', role: 'ranged_dps', 
        uniqueVariant: { 
          name: '어둠의 갈망', nameKey: 'heroes.dizgarldo.routes.shadow.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 피해량 50% 체력 최저 아군 힐.', descriptionTemplateKey: 'heroes.dizgarldo.routes.shadow.variantDesc'
        }, 
        skills: [
          { id: 'dizgar_life_drain', name: '생명 흡수', nameKey: 'heroes.dizgarldo.skills.life_drain.name', description: '공격 시 피해량 50% 자가회복 패시브', descriptionKey: 'heroes.dizgarldo.skills.life_drain.desc', color: '#6d28d9', isShared: false, cost: 200 },
          { id: 'dizgar_dark_feast', name: '암흑 포식', nameKey: 'heroes.dizgarldo.skills.dark_feast.name', description: '6초마다 자신 최대HP 10% 회복', descriptionKey: 'heroes.dizgarldo.skills.dark_feast.desc', color: '#4c1d95', isShared: false, cost: 300 },
          { id: 'dizgar_demon_summon', name: '마귀 소환', nameKey: 'heroes.dizgarldo.skills.demon_summon.name', description: '마귀 소환 (20초, 공격 시 피해의 50%만큼 체력 최저 아군 힐)', descriptionKey: 'heroes.dizgarldo.skills.demon_summon.desc', color: '#5b21b6', isShared: false, cost: 500, summonStats: { displayName: '마귀', displayNameKey: 'heroes.dizgarldo.summons.demon.name', hp: 400, atk: 60, def: 10, spd: 4, role: 'melee_dps', attackRange: 50, duration: 20 } },
          { id: 'dizgar_blood_ritual', name: '피의 의식', nameKey: 'heroes.dizgarldo.skills.blood_ritual.name', description: '20초마다 자신 HP 30% 소모 → 전체 아군 ATK×3 힐', descriptionKey: 'heroes.dizgarldo.skills.blood_ritual.desc', color: '#581c87', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 420, atk: 35, def: 15, spd: 3, attackRange: 600 }, color: '#fbbf24',
  },
  // 6. 펠다 (SSR) - 언데드
  {
    id: 'feldah', name: '펠다', nameKey: 'heroes.feldah.name', grade: 'SSR', role: 'ranged_dps', raceName: '언데드', elementName: '암흑', starRating: 1,
    lore: '강력한 흑마법사. 죽음을 초월한 육신으로 악마 군단을 부린다.', loreKey: 'heroes.feldah.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'feldah_demon', name: '악흑', nameKey: 'heroes.feldah.routes.demon.name', color: '#7c3aed', 
        uniqueVariant: { 
          name: '악마 군주', nameKey: 'heroes.feldah.routes.demon.variantName',
          descriptionTemplate: '소환수 능력치 {value}% 증가.', descriptionTemplateKey: 'heroes.feldah.routes.demon.variantDesc'
        }, 
        skills: [
          { id: 'feldah_imp', name: '임프 소환', nameKey: 'heroes.feldah.skills.imp.name', description: '원거리 임프 소환', descriptionKey: 'heroes.feldah.skills.imp.desc', color: '#a855f7', isShared: false, cost: 150, summonStats: { displayName: '임프', displayNameKey: 'heroes.feldah.summons.imp.name', hp: 220, atk: 80, def: 5, spd: 3.5, role: 'ranged_dps', attackRange: 350, duration: 15 } }, 
          { id: 'feldah_healthstone', name: '생명석', nameKey: 'heroes.feldah.skills.healthstone.name', description: '위기 시 아군 회복', descriptionKey: 'heroes.feldah.skills.healthstone.desc', color: '#064e3b', isShared: false, cost: 300 }, 
          { id: 'feldah_felhunter', name: '마법사냥개', nameKey: 'heroes.feldah.skills.felhunter.name', description: '근접 악마 소환', descriptionKey: 'heroes.feldah.skills.felhunter.desc', color: '#5b21b6', isShared: false, cost: 500, summonStats: { displayName: '마법사냥개', displayNameKey: 'heroes.feldah.summons.felhunter.name', hp: 300, atk: 120, def: 8, spd: 5.5, role: 'melee_dps', attackRange: 50, duration: 18 } }, 
          { id: 'feldah_felguard', name: '펠가드', nameKey: 'heroes.feldah.skills.felguard.name', description: '강력한 탱커 악마 소환', descriptionKey: 'heroes.feldah.skills.felguard.desc', color: '#3b0764', isShared: false, cost: 1200, isFinal: true, summonStats: { displayName: '펠가드', displayNameKey: 'heroes.feldah.summons.felguard.name', hp: 900, atk: 160, def: 45, spd: 2.5, role: 'tank', attackRange: 80, duration: 25 } }
        ] 
      },
      { 
        id: 'feldah_destro', name: '파흑', nameKey: 'heroes.feldah.routes.destro.name', color: '#dc2626', 
        uniqueVariant: { 
          name: '혼돈의 불꽃', nameKey: 'heroes.feldah.routes.destro.variantName',
          descriptionTemplate: '치명타 시 {value}% 쿨타임 단축.', descriptionTemplateKey: 'heroes.feldah.routes.destro.variantDesc'
        }, 
        skills: [
          { id: 'feldah_double_bolt', name: '쌍 투사체', nameKey: 'heroes.feldah.skills.double_bolt.name', description: '2발 발사', descriptionKey: 'heroes.feldah.skills.double_bolt.desc', color: '#f97316', isShared: false, cost: 200 }, 
          { id: 'feldah_crit_triple', name: '파멸의 일격', nameKey: 'heroes.feldah.skills.crit_triple.name', description: '치명타 피해 3배', descriptionKey: 'heroes.feldah.skills.crit_triple.desc', color: '#ef4444', isShared: false, cost: 350 }, 
          { id: 'feldah_sacrifice', name: '제물', nameKey: 'heroes.feldah.skills.sacrifice.name', description: '전체 틱 데미지', descriptionKey: 'heroes.feldah.skills.sacrifice.desc', color: '#b91c1c', isShared: false, cost: 500 }, 
          { id: 'feldah_chaos_bolt', name: '혼돈의 화살', nameKey: 'heroes.feldah.skills.chaos_bolt.name', description: '방어 무시 강력한 한방', descriptionKey: 'heroes.feldah.skills.chaos_bolt.desc', color: '#7f1d1d', isShared: false, cost: 1200, isFinal: true }
        ] 
      },
      { 
        id: 'feldah_afflict', name: '고흑', nameKey: 'heroes.feldah.routes.afflict.name', color: '#065f46', 
        uniqueVariant: { 
          name: '저주받은 영혼', nameKey: 'heroes.feldah.routes.afflict.variantName',
          descriptionTemplate: '피격 적 이속 {value}% 감소.', descriptionTemplateKey: 'heroes.feldah.routes.afflict.variantDesc'
        }, 
        skills: [
          { id: 'feldah_corruption', name: '광역 부패', nameKey: 'heroes.feldah.skills.corruption.name', description: '전체 지속 피해', descriptionKey: 'heroes.feldah.skills.corruption.desc', color: '#059669', isShared: false, cost: 150 }, 
          { id: 'feldah_curse_fatigue', name: '광역 피로', nameKey: 'heroes.feldah.skills.curse_fatigue.name', description: '전체 이속 감소', descriptionKey: 'heroes.feldah.skills.curse_fatigue.desc', color: '#047857', isShared: false, cost: 300 }, 
          { id: 'feldah_agony', name: '고통의 저주', nameKey: 'heroes.feldah.skills.agony.name', description: '점증하는 지속 피해', descriptionKey: 'heroes.feldah.skills.agony.desc', color: '#065f46', isShared: false, cost: 500 }, 
          { id: 'feldah_drain_soul', name: '영혼 흡수', nameKey: 'heroes.feldah.skills.drain_soul.name', description: 'HP 35% 미만 일반몹 즉사', descriptionKey: 'heroes.feldah.skills.drain_soul.desc', color: '#7c3aed', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 380, atk: 130, def: 12, spd: 2.5, attackRange: 900 }, color: '#8b00ff', sprite: '펠다.png',
    portrait: '/graphic2/%ED%8E%A0%EB%8B%A4/%ED%8E%A0%EB%8B%A4idle.gif',
    gifSprite: '/graphic2/%ED%8E%A0%EB%8B%A4/%ED%8E%A0%EB%8B%A4right.gif',
  },
  // 7. 케른 (SSR) - 타우렌 드루이드, 4루트
  {
    id: 'kaern_dinohouf', name: '케른 다이노후프', nameKey: 'heroes.kaern_dinohouf.name', grade: 'SSR', role: 'tank', raceName: '타우렌', elementName: '자연', starRating: 1,
    lore: '대지모신을 섬기는 타우렌 대족장. 야성과 자연의 힘을 자유자재로 다룬다.', loreKey: 'heroes.kaern_dinohouf.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'kaern_feral', name: '야성', nameKey: 'heroes.kaern_dinohouf.routes.feral.name', color: '#f97316', role: 'melee_dps',
        uniqueVariant: { 
          name: '야성의 심판', nameKey: 'heroes.kaern_dinohouf.routes.feral.variantName',
          descriptionTemplate: '출혈 대상 공격 시 ATK×{value}% 추가 피해.', descriptionTemplateKey: 'heroes.kaern_dinohouf.routes.feral.variantDesc'
        },
        skills: [
          { id: 'kaern_rake', name: '갈퀴 발톱', nameKey: 'heroes.kaern_dinohouf.skills.rake.name', description: '공격마다 3초 출혈 DoT 부여 (ATK×50%/tick)', descriptionKey: 'heroes.kaern_dinohouf.skills.rake.desc', color: '#ea580c', isShared: false, cost: 200 },
          { ...SHARED.multi_strike },
          { id: 'kaern_blood_frenzy', name: '피의 분노', nameKey: 'heroes.kaern_dinohouf.skills.blood_frenzy.name', description: '출혈 대상에게 피해 20% 증가 패시브', descriptionKey: 'heroes.kaern_dinohouf.skills.blood_frenzy.desc', color: '#9a3412', isShared: false, cost: 500 },
          { id: 'kaern_pounce', name: '표범 도약', nameKey: 'heroes.kaern_dinohouf.skills.pounce.name', description: '10초마다 단일 ATK×6 + 2초 기절', descriptionKey: 'heroes.kaern_dinohouf.skills.pounce.desc', color: '#7c2d12', isShared: false, cost: 1200, isFinal: true },
        ],
      },
      {
        id: 'kaern_guardian', name: '수호', nameKey: 'heroes.kaern_dinohouf.routes.guardian.name', color: '#15803d',
        uniqueVariant: { 
          name: '격곰 변신', nameKey: 'heroes.kaern_dinohouf.routes.guardian.variantName',
          descriptionTemplate: '방어력 {value}% 증가.', descriptionTemplateKey: 'heroes.kaern_dinohouf.routes.guardian.variantDesc'
        },
        skills: [
          { id: 'kaern_mangle', name: '분쇄', nameKey: 'heroes.kaern_dinohouf.skills.mangle.name', description: '8초마다 전방 120px ATK×3 + 2초 기절', descriptionKey: 'heroes.kaern_dinohouf.skills.mangle.desc', color: '#16a34a', isShared: false, cost: 200 },
          { id: 'kaern_thorns', name: '가시덩굴', nameKey: 'heroes.kaern_dinohouf.skills.thorns.name', description: '피격 시 ATK 25% 반사 패시브', descriptionKey: 'heroes.kaern_dinohouf.skills.thorns.desc', color: '#15803d', isShared: false, cost: 400 },
          { id: 'kaern_survival_instincts', name: '생존 본능', nameKey: 'heroes.kaern_dinohouf.skills.survival_instincts.name', description: 'HP 40% 이하 시 받는 피해 30% 감소 패시브', descriptionKey: 'heroes.kaern_dinohouf.skills.survival_instincts.desc', color: '#166534', isShared: false, cost: 600 },
          { id: 'kaern_bear_hug', name: '격곰 포획', nameKey: 'heroes.kaern_dinohouf.skills.bear_hug.name', description: '20초마다 단일 ATK×5 + 5초 속박', descriptionKey: 'heroes.kaern_dinohouf.skills.bear_hug.desc', color: '#14532d', isShared: false, cost: 1200, isFinal: true },
        ],
      },
      {
        id: 'kaern_restoration', name: '회복', nameKey: 'heroes.kaern_dinohouf.routes.restoration.name', color: '#22c55e', role: 'healer',
        uniqueVariant: { 
          name: '자연의 우기', nameKey: 'heroes.kaern_dinohouf.routes.restoration.variantName',
          descriptionTemplate: 'HoT 효과 {value}% 강화.', descriptionTemplateKey: 'heroes.kaern_dinohouf.routes.restoration.variantDesc'
        },
        skills: [
          { id: 'kaern_rejuvenation', name: '회춘', nameKey: 'heroes.kaern_dinohouf.skills.rejuvenation.name', description: '체력 최저 아군 지속 힐 (HoT)', descriptionKey: 'heroes.kaern_dinohouf.skills.rejuvenation.desc', color: '#4ade80', isShared: false, cost: 200 },
          { id: 'kaern_wild_growth', name: '야생 성장', nameKey: 'heroes.kaern_dinohouf.skills.wild_growth.name', description: '8초마다 전체 아군 ATK×1.5 힐', descriptionKey: 'heroes.kaern_dinohouf.skills.wild_growth.desc', color: '#16a34a', isShared: false, cost: 400 },
          { id: 'kaern_nourish', name: '영양', nameKey: 'heroes.kaern_dinohouf.skills.nourish.name', description: '10초마다 체력 최저 아군 ATK×5 강화 힐', descriptionKey: 'heroes.kaern_dinohouf.skills.nourish.desc', color: '#15803d', isShared: false, cost: 600 },
          { id: 'kaern_tranquility', name: '평온', nameKey: 'heroes.kaern_dinohouf.skills.tranquility.name', description: '30초마다 전체 아군 ATK×3 힐', descriptionKey: 'heroes.kaern_dinohouf.skills.tranquility.desc', color: '#14532d', isShared: false, cost: 1200, isFinal: true },
        ],
      },
      {
        id: 'kaern_balance', name: '조화', nameKey: 'heroes.kaern_dinohouf.routes.balance.name', color: '#7c3aed', role: 'cc', attackRange: 1100,
        uniqueVariant: { 
          name: '달빛 폭발', nameKey: 'heroes.kaern_dinohouf.routes.balance.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 주변 80px ATK×2 광역 폭발.', descriptionTemplateKey: 'heroes.kaern_dinohouf.routes.balance.variantDesc'
        },
        skills: [
          { id: 'kaern_moonfire', name: '달빛 불꽃', nameKey: 'heroes.kaern_dinohouf.skills.moonfire.name', description: '공격마다 ATK 30% 추가 자연 피해', descriptionKey: 'heroes.kaern_dinohouf.skills.moonfire.desc', color: '#a78bfa', isShared: false, cost: 200 },
          { ...SHARED.magic_amp },
          { id: 'kaern_starsurge', name: '별 급류', nameKey: 'heroes.kaern_dinohouf.skills.starsurge.name', description: '8초마다 단일 ATK×6 자연 강타', descriptionKey: 'heroes.kaern_dinohouf.skills.starsurge.desc', color: '#7c3aed', isShared: false, cost: 600 },
          { id: 'kaern_starfall', name: '별비', nameKey: 'heroes.kaern_dinohouf.skills.starfall.name', description: '20초마다 전체 적 ATK×2 별빛 폭격', descriptionKey: 'heroes.kaern_dinohouf.skills.starfall.desc', color: '#4c1d95', isShared: false, cost: 1200, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 900, atk: 45, def: 55, spd: 2.2, attackRange: 45, attackCooldown: 2.2 }, color: '#15803d',
  },
  // 8. 헬른 (SR) - 타우렌 (유지)
  {
    id: 'heln_dinohouf', name: '헬른 다이노후프', nameKey: 'heroes.heln_dinohouf.name', grade: 'SR', role: 'cc', raceName: '타우렌', elementName: '자연', starRating: 1,
    lore: '달과 태양의 힘을 다루는 타우렌 드루이드.', loreKey: 'heroes.heln_dinohouf.lore',
    uniqueSkill: { baseValues: [20, 28, 38, 50, 70], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'heln_balance', name: '조화드루', nameKey: 'heroes.heln_dinohouf.routes.balance.name', color: '#7c3aed', role: 'cc', 
        uniqueVariant: { 
          name: '달빛 쐐기', nameKey: 'heroes.heln_dinohouf.routes.balance.variantName',
          descriptionTemplate: '공격 시 {value}% 확률 광역 폭발.', descriptionTemplateKey: 'heroes.heln_dinohouf.routes.balance.variantDesc'
        }, 
        skills: [
          { id: 'heln_moonfire', name: '달빛 불꽃', nameKey: 'heroes.heln_dinohouf.skills.moonfire.name', description: '광역 DoT', descriptionKey: 'heroes.heln_dinohouf.skills.moonfire.desc', color: '#8b5cf6', isShared: false, cost: 200 }, 
          { ...SHARED.magic_amp }, 
          { id: 'heln_starsurge', name: '별 급류', nameKey: 'heroes.heln_dinohouf.skills.starsurge.name', description: '단일 강타', descriptionKey: 'heroes.heln_dinohouf.skills.starsurge.desc', color: '#6d28d9', isShared: false, cost: 500 }, 
          { id: 'heln_starfall', name: '별비', nameKey: 'heroes.heln_dinohouf.skills.starfall.name', description: '전체 광역 폭격', descriptionKey: 'heroes.heln_dinohouf.skills.starfall.desc', color: '#4c1d95', isShared: false, cost: 1200, isFinal: true }
        ] 
      },
      { 
        id: 'heln_restoration', name: '회복드루', nameKey: 'heroes.heln_dinohouf.routes.restoration.name', color: '#22c55e', role: 'healer', 
        uniqueVariant: { 
          name: '자연의 우기', nameKey: 'heroes.heln_dinohouf.routes.restoration.variantName',
          descriptionTemplate: 'HoT 효과 {value}% 강화.', descriptionTemplateKey: 'heroes.heln_dinohouf.routes.restoration.variantDesc'
        }, 
        skills: [
          { id: 'heln_rejuvenation', name: '회춘', nameKey: 'heroes.heln_dinohouf.skills.rejuvenation.name', description: '단일 HoT', descriptionKey: 'heroes.heln_dinohouf.skills.rejuvenation.desc', color: '#4ade80', isShared: false, cost: 150 }, 
          { id: 'heln_ironbark', name: '아이언바크', nameKey: 'heroes.heln_dinohouf.skills.ironbark.name', description: '힐 대상에게 보호막 부여 (최대HP 12%, 8초)', descriptionKey: 'heroes.heln_dinohouf.skills.ironbark.desc', color: '#16a34a', isShared: false, cost: 300 }, 
          { id: 'heln_wild_growth', name: '야생 성장', nameKey: 'heroes.heln_dinohouf.skills.wild_growth.name', description: '광역 HoT', descriptionKey: 'heroes.heln_dinohouf.skills.wild_growth.desc', color: '#15803d', isShared: false, cost: 500 }, 
          { id: 'heln_natures_swiftness', name: '자연의 의지', nameKey: 'heroes.heln_dinohouf.skills.natures_swiftness.name', description: '주기적 전체 힐', descriptionKey: 'heroes.heln_dinohouf.skills.natures_swiftness.desc', color: '#166534', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 380, atk: 94, def: 12, spd: 3, attackRange: 1000, attackCooldown: 2.5 }, color: '#7c3aed',
  },
  // 9. 서리가람 (SSR) - 트롤, 3루트
  {
    id: 'seori_garam', name: '서리가람', nameKey: 'heroes.seori_garam.name', grade: 'SSR', role: 'melee_dps', raceName: '트롤', elementName: '자연', starRating: 1,
    lore: '정령과 소통하는 트롤 대주술사. 야성의 힘과 정령, 대자연의 치유를 동시에 다룬다.', loreKey: 'heroes.seori_garam.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'seori_enhancement', name: '고양술사', nameKey: 'heroes.seori_garam.routes.enhancement.name', color: '#f59e0b',
        uniqueVariant: { 
          name: '전투의 토템', nameKey: 'heroes.seori_garam.routes.enhancement.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 ATK×2 추가 자연 피해.', descriptionTemplateKey: 'heroes.seori_garam.routes.enhancement.variantDesc'
        },
        skills: [
          { id: 'seori_lava_lash', name: '용암 채찍', nameKey: 'heroes.seori_garam.skills.lava_lash.name', description: '공격마다 ATK 30% 추가 화염 피해 패시브', descriptionKey: 'heroes.seori_garam.skills.lava_lash.desc', color: '#ea580c', isShared: false, cost: 200 },
          { id: 'seori_stormstrike', name: '폭풍 강타', nameKey: 'heroes.seori_garam.skills.stormstrike.name', description: '6초마다 단일 ATK×4 + 2초 슬로우', descriptionKey: 'heroes.seori_garam.skills.stormstrike.desc', color: '#d97706', isShared: false, cost: 400 },
          { id: 'seori_lightning_shield', name: '번개 보호막', nameKey: 'heroes.seori_garam.skills.lightning_shield.name', description: '피격 시 ATK 20% 번개 반사 패시브', descriptionKey: 'heroes.seori_garam.skills.lightning_shield.desc', color: '#fbbf24', isShared: false, cost: 600 },
          { id: 'seori_feral_spirit', name: '정령 각성', nameKey: 'heroes.seori_garam.skills.feral_spirit.name', description: '늑대 정령 소환 (20초, 근딜)', descriptionKey: 'heroes.seori_garam.skills.feral_spirit.desc', color: '#92400e', isShared: false, cost: 1200, isFinal: true,
            summonStats: { displayName: '정령 늑대', displayNameKey: 'heroes.seori_garam.summons.feral_spirit.name', hp: 280, atk: 90, def: 12, spd: 5.0, role: 'melee_dps', attackRange: 45, duration: 20 } },
        ],
      },
      {
        id: 'seori_elemental', name: '정기술사', nameKey: 'heroes.seori_garam.routes.elemental.name', color: '#ef4444', role: 'ranged_dps', attackRange: 900,
        uniqueVariant: { 
          name: '정령의 공명', nameKey: 'heroes.seori_garam.routes.elemental.variantName',
          descriptionTemplate: '소환수 능력치 {value}% 증가.', descriptionTemplateKey: 'heroes.seori_garam.routes.elemental.variantDesc'
        },
        skills: [
          { id: 'seori_fire_elemental', name: '화염 정령 소환', nameKey: 'heroes.seori_garam.skills.fire_elemental.name', description: '화염 정령 소환 (20초, 원딜, 공격 시 ATK 30% 화염 추가 피해)', descriptionKey: 'heroes.seori_garam.skills.fire_elemental.desc',
            color: '#ef4444', isShared: false, cost: 300,
            summonStats: { displayName: '화염 정령', displayNameKey: 'heroes.seori_garam.summons.fire_elemental.name', hp: 300, atk: 110, def: 8, spd: 0, role: 'ranged_dps', attackRange: 900, duration: 20 } },
          { id: 'seori_earth_elemental', name: '대지 정령 소환', nameKey: 'heroes.seori_garam.skills.earth_elemental.name', description: '대지 정령 소환 (20초, 탱커, 높은 HP/방어)', descriptionKey: 'heroes.seori_garam.skills.earth_elemental.desc',
            color: '#92400e', isShared: false, cost: 400,
            summonStats: { displayName: '대지 정령', displayNameKey: 'heroes.seori_garam.summons.earth_elemental.name', hp: 750, atk: 45, def: 55, spd: 2.0, role: 'tank', attackRange: 50, duration: 20 } },
          { id: 'seori_chain_lightning', name: '연쇄 번개', nameKey: 'heroes.seori_garam.skills.chain_lightning.name', description: '6초마다 3연쇄 ATK×1.5 번개 타격', descriptionKey: 'heroes.seori_garam.skills.chain_lightning.desc', color: '#fbbf24', isShared: false, cost: 600 },
          { id: 'seori_totemic_wrath', name: '토템의 분노', nameKey: 'heroes.seori_garam.skills.totemic_wrath.name', description: '20초마다 전체 적 ATK×3 번개 폭격', descriptionKey: 'heroes.seori_garam.skills.totemic_wrath.desc', color: '#b45309', isShared: false, cost: 1200, isFinal: true },
        ],
      },
      {
        id: 'seori_restoration', name: '복원술사', nameKey: 'heroes.seori_garam.routes.restoration.name', color: '#06b6d4', role: 'healer',
        uniqueVariant: { 
          name: '회복의 물결', nameKey: 'heroes.seori_garam.routes.restoration.variantName',
          descriptionTemplate: '힐 시 {value}% 확률로 주변 아군 소량 힐 전파.', descriptionTemplateKey: 'heroes.seori_garam.routes.restoration.variantDesc'
        },
        skills: [
          { id: 'seori_water_shield', name: '물의 방패', nameKey: 'heroes.seori_garam.skills.water_shield.name', description: '피격 시 ATK 15% 자가 회복 패시브', descriptionKey: 'heroes.seori_garam.skills.water_shield.desc', color: '#67e8f9', isShared: false, cost: 200 },
          { id: 'seori_chain_heal', name: '연쇄 치유', nameKey: 'heroes.seori_garam.skills.chain_heal.name', description: '8초마다 체력 낮은 순 3인 연쇄 힐 (ATK×3→2→1)', descriptionKey: 'heroes.seori_garam.skills.chain_heal.desc', color: '#0ea5e9', isShared: false, cost: 400 },
          { id: 'seori_healing_rain', name: '치유의 비', nameKey: 'heroes.seori_garam.skills.healing_rain.name', description: '12초마다 전체 아군 ATK×2 힐', descriptionKey: 'heroes.seori_garam.skills.healing_rain.desc', color: '#0284c7', isShared: false, cost: 600 },
          { id: 'seori_spirit_link', name: '정령 연결', nameKey: 'heroes.seori_garam.skills.spirit_link.name', description: '30초마다 전체 아군 체력 균등화 + 5초 피해 20% 감소', descriptionKey: 'heroes.seori_garam.skills.spirit_link.desc', color: '#0c4a6e', isShared: false, cost: 1200, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 650, atk: 55, def: 25, spd: 4, attackRange: 50, attackCooldown: 0.45 }, color: '#f59e0b',
  },
  // 10. 천둥가람 (SR) - 잔달라 트롤
  {
    id: 'cheondung_garam', name: '천둥가람', nameKey: 'heroes.cheondung_garam.name', grade: 'SR', role: 'ranged_dps', raceName: '잔달라 트롤', elementName: '번개', starRating: 1,
    lore: '황금 도시의 고위 주술사. 폭풍을 부른다.', loreKey: 'heroes.cheondung_garam.lore',
    uniqueSkill: { baseValues: [20, 28, 38, 50, 70], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'cheondung_elemental', name: '정기술사', nameKey: 'heroes.cheondung_garam.routes.elemental.name', color: '#eab308', 
        uniqueVariant: { 
          name: '번개 과부하', nameKey: 'heroes.cheondung_garam.routes.elemental.variantName',
          descriptionTemplate: '번개 스킬 {value}% 확률 2회 발동.', descriptionTemplateKey: 'heroes.cheondung_garam.routes.elemental.variantDesc'
        }, 
        skills: [
          { id: 'cheondung_lightning_bolt', name: '번개 화살', nameKey: 'heroes.cheondung_garam.skills.lightning_bolt.name', description: '연쇄 번개 공격', descriptionKey: 'heroes.cheondung_garam.skills.lightning_bolt.desc', color: '#facc15', isShared: false, cost: 150 }, 
          { id: 'cheondung_earthquake', name: '지진', nameKey: 'heroes.cheondung_garam.skills.earthquake.name', description: '광역 슬로우+피해', descriptionKey: 'heroes.cheondung_garam.skills.earthquake.desc', color: '#ca8a04', isShared: false, cost: 350 }, 
          { id: 'cheondung_thunderstorm', name: '천둥 폭풍', nameKey: 'heroes.cheondung_garam.skills.thunderstorm.name', description: '부채꼴 광역', descriptionKey: 'heroes.cheondung_garam.skills.thunderstorm.desc', color: '#a16207', isShared: false, cost: 450 }, 
          { id: 'cheondung_lightning_storm', name: '번개 폭풍', nameKey: 'heroes.cheondung_garam.skills.lightning_storm.name', description: '전체 광역 폭격', descriptionKey: 'heroes.cheondung_garam.skills.lightning_storm.desc', color: '#713f12', isShared: false, cost: 1200, isFinal: true }
        ] 
      },
      { 
        id: 'cheondung_restoration', name: '복원술사', nameKey: 'heroes.cheondung_garam.routes.restoration.name', color: '#22c55e', role: 'healer', 
        uniqueVariant: { 
          name: '조류의 역류', nameKey: 'heroes.cheondung_garam.routes.restoration.variantName',
          descriptionTemplate: '힐 시 {value}% 확률로 주변 소량 힐.', descriptionTemplateKey: 'heroes.cheondung_garam.routes.restoration.variantDesc'
        }, 
        skills: [
          { id: 'cheondung_earth_shield', name: '대지 방패', nameKey: 'heroes.cheondung_garam.skills.earth_shield.name', description: '피격 힐 버프', descriptionKey: 'heroes.cheondung_garam.skills.earth_shield.desc', color: '#4ade80', isShared: false, cost: 150 }, 
          { id: 'cheondung_healing_wave', name: '치유의 파동', nameKey: 'heroes.cheondung_garam.skills.healing_wave.name', description: '강력 단일 힐', descriptionKey: 'heroes.cheondung_garam.skills.healing_wave.desc', color: '#16a34a', isShared: false, cost: 300 }, 
          { id: 'cheondung_chain_heal2', name: '연쇄 치유', nameKey: 'heroes.cheondung_garam.skills.chain_heal.name', description: '연쇄 힐', descriptionKey: 'heroes.cheondung_garam.skills.chain_heal.desc', color: '#15803d', isShared: false, cost: 450 }, 
          { id: 'cheondung_earth_elemental', name: '대지 정령', nameKey: 'heroes.cheondung_garam.skills.earth_elemental.name', description: '탱커 정령 소환', descriptionKey: 'heroes.cheondung_garam.skills.earth_elemental.desc', color: '#166534', isShared: false, cost: 1200, isFinal: true, summonStats: { displayName: '대지 정령', displayNameKey: 'heroes.cheondung_garam.summons.earth_elemental.name', hp: 500, atk: 50, def: 60, spd: 2.0, role: 'tank', attackRange: 55, duration: 20 } }
        ] 
      }
    ],
    baseStats: { hp: 360, atk: 35, def: 10, spd: 3, attackRange: 1200, attackCooldown: 0.5 }, color: '#eab308',
  },
  // 11. 필지뱅크릴 (SR) - 고블린
  {
    id: 'pilji_bangkril', name: '필지뱅크릴', nameKey: 'heroes.pilji_bangkril.name', grade: 'SSR', role: 'ranged_dps', raceName: '고블린', elementName: '자연', starRating: 1,
    lore: '이익을 위해서라면 야수도 길들이는 고블린 사냥꾼.', loreKey: 'heroes.pilji_bangkril.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 55], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'pilji_beast_mastery', name: '야수냥꾼', nameKey: 'heroes.pilji_bangkril.routes.beast_mastery.name', color: '#92400e',
        uniqueVariant: { 
          name: '야수의 분노', nameKey: 'heroes.pilji_bangkril.routes.beast_mastery.variantName',
          descriptionTemplate: '소환수 능력치 {value}% 증가.', descriptionTemplateKey: 'heroes.pilji_bangkril.routes.beast_mastery.variantDesc'
        },
        skills: [
          { id: 'pilji_poison_arrow', name: '독화살', nameKey: 'heroes.pilji_bangkril.skills.poison_arrow.name', description: '공격마다 3초 독 DoT (ATK×40%/tick) 부여', descriptionKey: 'heroes.pilji_bangkril.skills.poison_arrow.desc', color: '#a3e635', isShared: false, cost: 200 },
          { id: 'pilji_rapid_fire', name: '연사', nameKey: 'heroes.pilji_bangkril.skills.rapid_fire.name', description: '30% 확률로 추가 투사체 발사', descriptionKey: 'heroes.pilji_bangkril.skills.rapid_fire.desc', color: '#84cc16', isShared: false, cost: 400 },
          { id: 'pilji_call_pet', name: '반려동물', nameKey: 'heroes.pilji_bangkril.skills.call_pet.name', description: '반려 늑대 소환 (20초, 근딜)', descriptionKey: 'heroes.pilji_bangkril.skills.call_pet.desc', color: '#65a30d', isShared: false, cost: 600, summonStats: { displayName: '반려 늑대', displayNameKey: 'heroes.pilji_bangkril.summons.pet.name', hp: 350, atk: 85, def: 15, spd: 4.0, role: 'melee_dps', attackRange: 45, duration: 20 } },
          { id: 'pilji_bestial_wrath', name: '야수 폭주', nameKey: 'heroes.pilji_bangkril.skills.bestial_wrath.name', description: '20초마다 소환수 공격력 2배 + 광폭화 30초', descriptionKey: 'heroes.pilji_bangkril.skills.bestial_wrath.desc', color: '#4d7c0f', isShared: false, cost: 1200, isFinal: true },
        ],
      },
      {
        id: 'pilji_marksmanship', name: '사격냥꾼', nameKey: 'heroes.pilji_bangkril.routes.marksmanship.name', color: '#b45309', attackCooldown: 2.5, attackRange: 1500,
        uniqueVariant: { 
          name: '저격수의 집중', nameKey: 'heroes.pilji_bangkril.routes.marksmanship.variantName',
          descriptionTemplate: '공격마다 {value}% 확률로 ATK×3 추가 관통 피해.', descriptionTemplateKey: 'heroes.pilji_bangkril.routes.marksmanship.variantDesc'
        },
        skills: [
          { id: 'pilji_aimed_shot', name: '조준 사격', nameKey: 'heroes.pilji_bangkril.skills.aimed_shot.name', description: '공격마다 ATK 60% 추가 피해 패시브', descriptionKey: 'heroes.pilji_bangkril.skills.aimed_shot.desc', color: '#fbbf24', isShared: false, cost: 200 },
          { id: 'pilji_explosive_arrow', name: '폭발 화살', nameKey: 'heroes.pilji_bangkril.skills.explosive_arrow.name', description: '명중 시 주변 70px ATK×1.5 광역 폭발', descriptionKey: 'heroes.pilji_bangkril.skills.explosive_arrow.desc', color: '#d97706', isShared: false, cost: 400 },
          { id: 'pilji_piercing_shot', name: '관통 사격', nameKey: 'heroes.pilji_bangkril.skills.piercing_shot.name', description: '8초마다 단일 ATK×8 방어 무시 강타', descriptionKey: 'heroes.pilji_bangkril.skills.piercing_shot.desc', color: '#b45309', isShared: false, cost: 600 },
          { id: 'pilji_kill_shot', name: '처형 사격', nameKey: 'heroes.pilji_bangkril.skills.kill_shot.name', description: '15초마다 HP 40% 이하 적 즉사 or ATK×12', descriptionKey: 'heroes.pilji_bangkril.skills.kill_shot.desc', color: '#92400e', isShared: false, cost: 1200, isFinal: true },
        ],
      },
      {
        id: 'pilji_survival', name: '생존냥꾼', nameKey: 'heroes.pilji_bangkril.routes.survival.name', color: '#166534', role: 'melee_dps',
        uniqueVariant: { 
          name: '생존술사', nameKey: 'heroes.pilji_bangkril.routes.survival.variantName',
          descriptionTemplate: '근접 공격 시 {value}% 추가 자연 피해.', descriptionTemplateKey: 'heroes.pilji_bangkril.routes.survival.variantDesc'
        },
        skills: [
          { id: 'pilji_serpent_sting', name: '독 칼날', nameKey: 'heroes.pilji_bangkril.skills.serpent_sting.name', description: '공격마다 3초 독 DoT (ATK×50%/tick) 부여', descriptionKey: 'heroes.pilji_bangkril.skills.serpent_sting.desc', color: '#4ade80', isShared: false, cost: 200 },
          { id: 'pilji_binding_shot', name: '올가미', nameKey: 'heroes.pilji_bangkril.skills.binding_shot.name', description: '8초마다 단일 3초 속박', descriptionKey: 'heroes.pilji_bangkril.skills.binding_shot.desc', color: '#22c55e', isShared: false, cost: 400 },
          { id: 'pilji_explosive_trap', name: '폭발 함정', nameKey: 'heroes.pilji_bangkril.skills.explosive_trap.name', description: '12초마다 주변 150px ATK×3 폭발 + 3초 슬로우', descriptionKey: 'heroes.pilji_bangkril.skills.explosive_trap.desc', color: '#16a34a', isShared: false, cost: 600 },
          { id: 'pilji_mongoose_bite', name: '몽구스 한입', nameKey: 'heroes.pilji_bangkril.skills.mongoose_bite.name', description: '20초마다 단일 ATK×6 강타 + 2초 기절', descriptionKey: 'heroes.pilji_bangkril.skills.mongoose_bite.desc', color: '#15803d', isShared: false, cost: 1200, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 520, atk: 50, def: 22, spd: 4.0, attackRange: 1100 }, color: '#92400e',
  },
  // 12. 무영삵 (SSR) - 언데드 도적
  {
    id: 'muyeong_salk', name: '무영삵', nameKey: 'heroes.muyeong_salk.name', grade: 'SSR', role: 'melee_dps', raceName: '언데드', elementName: '암흑', starRating: 1,
    lore: '생전의 기억을 잃은 언데드 도적. 이제 무법지대의 지배자나 어둠 속의 암살자로서 전장을 누빈다.', loreKey: 'heroes.muyeong_salk.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'muyeong_outlaw', name: '무법', nameKey: 'heroes.muyeong_salk.routes.outlaw.name', color: '#ea580c',
        uniqueVariant: { 
          name: '뼈 굴리기', nameKey: 'heroes.muyeong_salk.routes.outlaw.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 10초간 무작위 전투 강화 버프 획득.', descriptionTemplateKey: 'heroes.muyeong_salk.routes.outlaw.variantDesc'
        },
        skills: [
          { id: 'muyeong_outlaw_pistol', name: '권총 사격', nameKey: 'heroes.muyeong_salk.skills.pistol.name', description: '6초마다 단일 대상 ATK×3.5 피해 및 3초 슬로우', descriptionKey: 'heroes.muyeong_salk.skills.pistol.desc', color: '#f97316', isShared: false, cost: 200 },
          { id: 'muyeong_outlaw_flurry', name: '칼날 난무', nameKey: 'heroes.muyeong_salk.skills.flurry.name', description: '공격 시 {value}% 확률로 주변 적에게 50%의 복제 피해', descriptionKey: 'heroes.muyeong_salk.skills.flurry.desc', color: '#fb923c', isShared: false, cost: 400 },
          { id: 'muyeong_outlaw_between_eyes', name: '미간 적중', nameKey: 'heroes.muyeong_salk.skills.between_eyes.name', description: '10초마다 단일 대상 ATK×6 피해 및 2초 기절', descriptionKey: 'heroes.muyeong_salk.skills.between_eyes.desc', color: '#f59e0b', isShared: false, cost: 600 },
          { id: 'muyeong_outlaw_dreadblades', name: '공포의 검', nameKey: 'heroes.muyeong_salk.skills.dreadblades.name', description: '20초마다 10초간 공격속도 50% 증가 및 모든 공격에 {value}% 추가 피해', descriptionKey: 'heroes.muyeong_salk.skills.dreadblades.desc', color: '#c2410c', isShared: false, cost: 1200, isFinal: true }
        ]
      },
      {
        id: 'muyeong_assassination', name: '암살', nameKey: 'heroes.muyeong_salk.routes.assassination.name', color: '#16a34a',
        uniqueVariant: { 
          name: '치명적인 독', nameKey: 'heroes.muyeong_salk.routes.assassination.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 대상에게 강력한 맹독 DoT 부여.', descriptionTemplateKey: 'heroes.muyeong_salk.routes.assassination.variantDesc'
        },
        skills: [
          { id: 'muyeong_ass_garrote', name: '목조르기', nameKey: 'heroes.muyeong_salk.skills.garrote.name', description: '8초마다 단일 대상 6초 침묵 및 ATK×4 지속 피해', descriptionKey: 'heroes.muyeong_salk.skills.garrote.desc', color: '#22c55e', isShared: false, cost: 200 },
          { id: 'muyeong_ass_mutilate', name: '절단', nameKey: 'heroes.muyeong_salk.skills.mutilate.name', description: '공격 시 {value}% 확률로 ATK×3 피해 및 독 효과 2배 증폭', descriptionKey: 'heroes.muyeong_salk.skills.mutilate.desc', color: '#4ade80', isShared: false, cost: 400 },
          { id: 'muyeong_ass_envenom', name: '독살', nameKey: 'heroes.muyeong_salk.skills.envenom.name', description: '12초마다 독에 걸린 대상에게 ATK×10의 폭발적 피해', descriptionKey: 'heroes.muyeong_salk.skills.envenom.desc', color: '#15803d', isShared: false, cost: 600 },
          { id: 'muyeong_ass_kingsbane', name: '왕의 살해자', nameKey: 'heroes.muyeong_salk.skills.kingsbane.name', description: '30초마다 대상에게 강력한 독을 주입하여 14초간 매초 ATK×2 피해 (피해량 점증)', descriptionKey: 'heroes.muyeong_salk.skills.kingsbane.desc', color: '#064e3b', isShared: false, cost: 1200, isFinal: true }
        ]
      },
      {
        id: 'muyeong_subtlety', name: '잠행', nameKey: 'heroes.muyeong_salk.routes.subtlety.name', color: '#7c3aed',
        uniqueVariant: { 
          name: '어둠의 춤', nameKey: 'heroes.muyeong_salk.routes.subtlety.variantName',
          descriptionTemplate: '스킬 사용 시 {value}% 확률로 5초간 공격력 30% 증가.', descriptionTemplateKey: 'heroes.muyeong_salk.routes.subtlety.variantDesc'
        },
        skills: [
          { id: 'muyeong_sub_shadowstrike', name: '그림자 일격', nameKey: 'heroes.muyeong_salk.skills.shadowstrike.name', description: '5초마다 타겟 뒤로 순간이동하여 ATK×4 피해 및 1초 기절', descriptionKey: 'heroes.muyeong_salk.skills.shadowstrike.desc', color: '#a78bfa', isShared: false, cost: 200 },
          { id: 'muyeong_sub_eviscerate', name: '절개', nameKey: 'heroes.muyeong_salk.skills.eviscerate.name', description: '공격 시 {value}% 확률로 약점을 찔러 ATK×5 피해', descriptionKey: 'heroes.muyeong_salk.skills.eviscerate.desc', color: '#8b5cf6', isShared: false, cost: 400 },
          { id: 'muyeong_sub_symbols', name: '죽음의 상징', nameKey: 'heroes.muyeong_salk.skills.symbols.name', description: '15초마다 8초간 다음 3회의 공격 확정 치명타 및 공격력 20% 증가', descriptionKey: 'heroes.muyeong_salk.skills.symbols.desc', color: '#6d28d9', isShared: false, cost: 600 },
          { id: 'muyeong_sub_secret_tech', name: '비밀 기법', nameKey: 'heroes.muyeong_salk.skills.secret_tech.name', description: '25초마다 환영을 소환하여 전방 광역 ATK×12 피해', descriptionKey: 'heroes.muyeong_salk.skills.secret_tech.desc', color: '#4c1d95', isShared: false, cost: 1200, isFinal: true }
        ]
      }
    ],
    baseStats: { hp: 780, atk: 125, def: 38, spd: 5.5, attackRange: 40, attackCooldown: 0.7 }, color: '#ea580c',
  },
  // 13. 다울가르 (SSR) - 오크 죽음의 기사
  {
    id: 'daulgard', name: '다울가르', nameKey: 'heroes.daulgard.name', grade: 'SSR', role: 'melee_dps', raceName: '오크', elementName: '서리', starRating: 1,
    lore: '타락했다가 명예를 되찾은 오크 죽음의 기사. 칠흑의 기사단의 힘을 빌려 언데드 군단을 부리거나, 냉기와 피의 마력을 다룬다.', loreKey: 'heroes.daulgard.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'daulgard_unholy', name: '부정', nameKey: 'heroes.daulgard.routes.unholy.name', color: '#4d7c0f',
        uniqueVariant: { 
          name: '언데드 군단', nameKey: 'heroes.daulgard.routes.unholy.variantName',
          descriptionTemplate: '소환수 능력치 {value}% 증가.', descriptionTemplateKey: 'heroes.daulgard.routes.unholy.variantDesc'
        },
        skills: [
          { id: 'daulgard_unholy_disease', name: '질병', nameKey: 'heroes.daulgard.skills.disease.name', description: '4초마다 전장의 모든 적에게 ATK×1.0 지속 피해 (10초)', descriptionKey: 'heroes.daulgard.skills.disease.desc', color: '#84cc16', isShared: false, cost: 200 },
          {
            id: 'daulgard_unholy_ghoul', name: '구울 소환', nameKey: 'heroes.daulgard.skills.ghoul.name', description: '근접 구울 1마리와 해골 궁수 1마리를 소환합니다.', descriptionKey: 'heroes.daulgard.skills.ghoul.desc', color: '#65a30d', isShared: false, cost: 400,
            summonStats: { displayName: '구울', displayNameKey: 'heroes.daulgard.summons.ghoul.name', hp: 350, atk: 90, def: 15, spd: 3.5, role: 'melee_dps', attackRange: 45, duration: 25 }
          },
          { id: 'daulgard_unholy_death_coil', name: '죽음의 고리', nameKey: 'heroes.daulgard.skills.death_coil.name', description: '8초마다 단일 대상에게 ATK×8 강력한 한방 피해', descriptionKey: 'heroes.daulgard.skills.death_coil.desc', color: '#4ade80', isShared: false, cost: 600 },
          {
            id: 'daulgard_unholy_army', name: '사자의 군대', nameKey: 'heroes.daulgard.skills.army.name', description: '25초마다 9마리의 군단 구울을 즉시 소환합니다.', descriptionKey: 'heroes.daulgard.skills.army.desc', color: '#166534', isShared: false, cost: 1200, isFinal: true,
            summonStats: { displayName: '군단 구울', displayNameKey: 'heroes.daulgard.summons.army.name', hp: 200, atk: 60, def: 10, spd: 4.0, role: 'melee_dps', attackRange: 45, duration: 12 }
          }
        ]
      },
      {
        id: 'daulgard_frost', name: '냉기', nameKey: 'heroes.daulgard.routes.frost.name', color: '#0ea5e9',
        uniqueVariant: { 
          name: '냉기의 가피', nameKey: 'heroes.daulgard.routes.frost.variantName',
          descriptionTemplate: '냉기 공격 시 {value}% 확률로 대상 2초 빙결.', descriptionTemplateKey: 'heroes.daulgard.routes.frost.variantDesc'
        },
        skills: [
          { id: 'daulgard_frost_chains', name: '얼음의 손길', nameKey: 'heroes.daulgard.skills.frost_chains.name', description: '6초마다 단일 대상 ATK×3 피해 및 5초 슬로우', descriptionKey: 'heroes.daulgard.skills.frost_chains.desc', color: '#38bdf8', isShared: false, cost: 200 },
          { id: 'daulgard_frost_strike', name: '냉기 타격', nameKey: 'heroes.daulgard.skills.frost_strike.name', description: '공격 시 {value}% 확률로 ATK×2 추가 냉기 피해', descriptionKey: 'heroes.daulgard.skills.frost_strike.desc', color: '#0ea5e9', isShared: false, cost: 400 },
          { id: 'daulgard_frost_howling_blast', name: '울부짖는 한파', nameKey: 'heroes.daulgard.skills.howling_blast.name', description: '10초마다 타겟 주변 150px 적 ATK×4 광역 피해 및 슬로우', descriptionKey: 'heroes.daulgard.skills.howling_blast.desc', color: '#0284c7', isShared: false, cost: 600 },
          { id: 'daulgard_frost_remorseless_winter', name: '절멸의 겨울', nameKey: 'heroes.daulgard.skills.remorseless_winter.name', description: '20초마다 10초간 주변 모든 적에게 매초 ATK×1.5 피해 및 50% 슬로우', descriptionKey: 'heroes.daulgard.skills.remorseless_winter.desc', color: '#075985', isShared: false, cost: 1200, isFinal: true }
        ]
      },
      {
        id: 'daulgard_blood', name: '혈기', nameKey: 'heroes.daulgard.routes.blood.name', color: '#dc2626', role: 'tank',
        uniqueVariant: { 
          name: '피의 결속', nameKey: 'heroes.daulgard.routes.blood.variantName',
          descriptionTemplate: '피해량 {value}%만큼 자신의 HP를 흡수합니다.', descriptionTemplateKey: 'heroes.daulgard.routes.blood.variantDesc'
        },
        skills: [
          { id: 'daulgard_blood_boil', name: '피의 소용돌이', nameKey: 'heroes.daulgard.skills.blood_boil.name', description: '8초마다 주변 모든 적 ATK×3 피해 및 입힌 피해만큼 자가 회복', descriptionKey: 'heroes.daulgard.skills.blood_boil.desc', color: '#ef4444', isShared: false, cost: 200 },
          { id: 'daulgard_blood_death_strike', name: '죽음의 일격', nameKey: 'heroes.daulgard.skills.death_strike.name', description: '공격 시 {value}% 확률로 ATK×4 강력한 흡혈 공격', descriptionKey: 'heroes.daulgard.skills.death_strike.desc', color: '#b91c1c', isShared: false, cost: 400 },
          { id: 'daulgard_blood_vampiric_blood', name: '흡혈귀의 피', nameKey: 'heroes.daulgard.skills.vampiric_blood.name', description: '15초마다 10초간 최대 HP 30% 증가 및 받는 치유량 50% 증가', descriptionKey: 'heroes.daulgard.skills.vampiric_blood.desc', color: '#991b1b', isShared: false, cost: 600 },
          { id: 'daulgard_blood_dancing_weapon', name: '춤추는 룬 무기', nameKey: 'heroes.daulgard.skills.dancing_weapon.name', description: '30초마다 자신의 복사본인 룬 무기를 소환하여 함께 공격 (20초)', descriptionKey: 'heroes.daulgard.skills.dancing_weapon.desc', color: '#7f1d1d', isShared: false, cost: 1200, isFinal: true,
            summonStats: { displayName: '룬 무기', displayNameKey: 'heroes.daulgard.summons.rune_weapon.name', hp: 500, atk: 120, def: 30, spd: 4.5, role: 'melee_dps', attackRange: 45, duration: 20 }
          }
        ]
      }
    ],
    baseStats: { hp: 850, atk: 120, def: 45, spd: 3.0, attackRange: 45, attackCooldown: 1.6 }, color: '#7c3aed',
  },
  // 14. 노스훼라투 (SSR) - 블러드엘프 성기사
  {
    id: 'nostferatu', name: '노스훼라투', nameKey: 'heroes.nostferatu.name', grade: 'SSR', role: 'melee_dps', raceName: '블러드엘프', elementName: '신성', starRating: 1,
    lore: '태양샘의 타락과 정화를 모두 지켜본 블러드 나이트. 이제 신성한 빛의 심판관으로서 전장에 선다.', loreKey: 'heroes.nostferatu.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'nost_retribution', name: '징벌', nameKey: 'heroes.nostferatu.routes.retribution.name', color: '#f59e0b',
        uniqueVariant: { 
          name: '신성 질타', nameKey: 'heroes.nostferatu.routes.retribution.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 ATK×2 추가 신성 피해.', descriptionTemplateKey: 'heroes.nostferatu.routes.retribution.variantDesc'
        },
        skills: [
          { id: 'nost_ret_judgment', name: '심판', nameKey: 'heroes.nostferatu.skills.judgment.name', description: '6초마다 단일 대상 ATK×4 피해 및 5초간 받는 피해 15% 증가', descriptionKey: 'heroes.nostferatu.skills.judgment.desc', color: '#fbbf24', isShared: false, cost: 200 },
          { id: 'nost_ret_divine_storm', name: '신성 폭풍', nameKey: 'heroes.nostferatu.skills.divine_storm.name', description: '8초마다 주변 모든 적 ATK×3.5 피해 및 입힌 피해 20% 회복', descriptionKey: 'heroes.nostferatu.skills.divine_storm.desc', color: '#f59e0b', isShared: false, cost: 400 },
          { id: 'nost_ret_blade_of_justice', name: '심판의 칼날', nameKey: 'heroes.nostferatu.skills.blade_of_justice.name', description: '공격 시 {value}% 확률로 ATK×3 강력한 일격', descriptionKey: 'heroes.nostferatu.skills.blade_of_justice.desc', color: '#d97706', isShared: false, cost: 600 },
          { id: 'nost_ret_wake_of_ashes', name: '파멸의 재', nameKey: 'heroes.nostferatu.skills.wake_of_ashes.name', description: '20초마다 전방 모든 적 ATK×10 피해. 언데드는 즉시 소멸(즉사).', descriptionKey: 'heroes.nostferatu.skills.wake_of_ashes.desc', color: '#92400e', isShared: false, cost: 1200, isFinal: true }
        ]
      },
      {
        id: 'nost_protection', name: '보호', nameKey: 'heroes.nostferatu.routes.protection.name', color: '#3b82f6', role: 'tank',
        uniqueVariant: { 
          name: '빛의 수호', nameKey: 'heroes.nostferatu.routes.protection.variantName',
          descriptionTemplate: '피격 시 {value}% 확률로 3초간 최대 HP 15% 보호막.', descriptionTemplateKey: 'heroes.nostferatu.routes.protection.variantDesc'
        },
        skills: [
          { id: 'nost_prot_holy_ground', name: '신성한 대지', nameKey: 'heroes.nostferatu.skills.holy_ground.name', description: '10초마다 8초간 주변 아군 방어력 +20 및 매초 2% 회복', descriptionKey: 'heroes.nostferatu.skills.holy_ground.desc', color: '#fbbf24', isShared: false, cost: 200 },
          { id: 'nost_prot_avengers_shield', name: '응징의 방패', nameKey: 'heroes.nostferatu.skills.avengers_shield.name', description: '8초마다 적 3명에게 ATK×3 피해 및 2초 침묵', descriptionKey: 'heroes.nostferatu.skills.avengers_shield.desc', color: '#2563eb', isShared: false, cost: 400 },
          { ...SHARED.bastion },
          { id: 'nost_prot_guardian_king', name: '고대 왕의 수호자', nameKey: 'heroes.nostferatu.skills.guardian_king.name', description: '25초마다 10초간 받는 피해 50% 감소 및 반사량 100% 증가', descriptionKey: 'heroes.nostferatu.skills.guardian_king.desc', color: '#1d4ed8', isShared: false, cost: 1200, isFinal: true }
        ]
      },
      {
        id: 'nost_holy', name: '신성', nameKey: 'heroes.nostferatu.routes.holy.name', color: '#fde047', role: 'healer',
        uniqueVariant: { 
          name: '빛의 가피', nameKey: 'heroes.nostferatu.routes.holy.variantName',
          descriptionTemplate: '치유 시 {value}% 확률로 대상의 해로운 효과 제거.', descriptionTemplateKey: 'heroes.nostferatu.routes.holy.variantDesc'
        },
        skills: [
          { id: 'nost_holy_beacon_1', name: '빛의 봉화', nameKey: 'heroes.nostferatu.skills.holy_beacon_1.name', description: '치유 시 가장 생명력이 낮은 추가 아군 1명을 함께 치유합니다.', descriptionKey: 'heroes.nostferatu.skills.holy_beacon_1.desc', color: '#fde68a', isShared: false, cost: 200 },
          { id: 'nost_holy_flash', name: '빛의 섬광', nameKey: 'heroes.nostferatu.skills.holy_flash.name', description: '5초마다 단일 대상 ATK×4 즉시 치유', descriptionKey: 'heroes.nostferatu.skills.holy_flash.desc', color: '#fbbf24', isShared: false, cost: 400 },
          { id: 'nost_holy_beacon_2', name: '두 번째 봉화', nameKey: 'heroes.nostferatu.skills.holy_beacon_2.name', description: '치유 시 추가로 아군 1명을 더 치유합니다. (총 3명 동시 치유)', descriptionKey: 'heroes.nostferatu.skills.holy_beacon_2.desc', color: '#facc15', isShared: false, cost: 600 },
          { id: 'nost_holy_divine_revelation', name: '신성한 계시', nameKey: 'heroes.nostferatu.skills.divine_revelation.name', description: '15초마다 10초간 모든 치유량 50% 증가 및 마나 소모 없음', descriptionKey: 'heroes.nostferatu.skills.divine_revelation.desc', color: '#ca8a04', isShared: false, cost: 1200, isFinal: true }
        ]
      }
    ],
    baseStats: { hp: 820, atk: 115, def: 50, spd: 3.0, attackRange: 45 }, color: '#f59e0b',
  },
  // 15. 퀸차이 (SSR) - 판다렌 수도사
  {
    id: 'quinchai', name: '퀸차이', nameKey: 'heroes.quinchai.name', grade: 'SSR', role: 'tank', raceName: '판다렌', elementName: '바람', starRating: 1,
    lore: '취권을 구사하는 판다렌 수도사. 백호, 흑우, 옥룡, 주학의 기운을 빌려 전장을 휩쓴다.', loreKey: 'heroes.quinchai.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'quinchai_windwalker', name: '풍운', nameKey: 'heroes.quinchai.routes.windwalker.name', color: '#0ea5e9', role: 'melee_dps',
        uniqueVariant: { 
          name: '취호의 가피', nameKey: 'heroes.quinchai.routes.windwalker.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 2연타.', descriptionTemplateKey: 'heroes.quinchai.routes.windwalker.variantDesc'
        },
        skills: [
          { id: 'quinchai_ww_fists', name: '분노의 권법', nameKey: 'heroes.quinchai.skills.fists.name', description: '6초마다 전방 150px 적 ATK×4 광역 피해 및 1초 기절', descriptionKey: 'heroes.quinchai.skills.fists.desc', color: '#38bdf8', isShared: false, cost: 200 },
          { id: 'quinchai_ww_kick', name: '해오름차기', nameKey: 'heroes.quinchai.skills.kick.name', description: '공격 시 {value}% 확률로 ATK×2.5 피해', descriptionKey: 'heroes.quinchai.skills.kick.desc', color: '#0ea5e9', isShared: false, cost: 400 },
          { id: 'quinchai_ww_flying_kick', name: '불능의 결계', nameKey: 'heroes.quinchai.skills.flying_kick.name', description: '8초마다 주변 모든 적 3초간 이동속도 50% 감소', descriptionKey: 'heroes.quinchai.skills.flying_kick.desc', color: '#0284c7', isShared: false, cost: 600 },
          {
            id: 'quinchai_ww_xuen', name: '백호 쉬엔 소환', nameKey: 'heroes.quinchai.skills.xuen.name', description: '20초간 강력한 백호 쉬엔을 소환하여 함께 싸웁니다.', descriptionKey: 'heroes.quinchai.skills.xuen.desc', color: '#075985', isShared: false, cost: 1200, isFinal: true,
            summonStats: { displayName: '쉬엔', displayNameKey: 'heroes.quinchai.summons.xuen.name', hp: 600, atk: 150, def: 20, spd: 5.5, role: 'melee_dps', attackRange: 45, duration: 20 }
          }
        ]
      },
      {
        id: 'quinchai_brewmaster', name: '양조', nameKey: 'heroes.quinchai.routes.brewmaster.name', color: '#d97706', role: 'tank',
        uniqueVariant: { 
          name: '시간차', nameKey: 'heroes.quinchai.routes.brewmaster.variantName',
          descriptionTemplate: '받는 피해의 {value}%를 10초에 걸쳐 나누어 받습니다.', descriptionTemplateKey: 'heroes.quinchai.routes.brewmaster.variantDesc'
        },
        skills: [
          { id: 'quinchai_bm_keg', name: '술통 강타', nameKey: 'heroes.quinchai.skills.bm_keg.name', description: '8초마다 적 5명 ATK×3 피해 및 4초간 40% 슬로우', descriptionKey: 'heroes.quinchai.skills.bm_keg.desc', color: '#f59e0b', isShared: false, cost: 200 },
          { id: 'quinchai_bm_iron_skin', name: '철벽주', nameKey: 'heroes.quinchai.skills.bm_iron_skin.name', description: '15초마다 8초간 받는 피해 30% 감소', descriptionKey: 'heroes.quinchai.skills.bm_iron_skin.desc', color: '#b45309', isShared: false, cost: 400 },
          { ...SHARED.bastion },
          {
            id: 'quinchai_bm_niuzao', name: '흑우 니우자오 소환', nameKey: 'heroes.quinchai.skills.niuzao.name', description: '자신의 능력치 90%를 가진 흑우를 소환하여 부탱커로 활용합니다.', descriptionKey: 'heroes.quinchai.skills.niuzao.desc', color: '#78350f', isShared: false, cost: 1200, isFinal: true,
            summonStats: { displayName: '니우자오', displayNameKey: 'heroes.quinchai.summons.niuzao.name', hp: 800, atk: 60, def: 60, spd: 2.5, role: 'tank', attackRange: 50, duration: 25 }
          }
        ]
      },
      {
        id: 'quinchai_mistweaver', name: '운무', nameKey: 'heroes.quinchai.routes.mistweaver.name', color: '#06b6d4', role: 'healer',
        uniqueVariant: { 
          name: '안개 돌풍', nameKey: 'heroes.quinchai.routes.mistweaver.variantName',
          descriptionTemplate: '치유 시 {value}% 확률로 추가 안개 치유.', descriptionTemplateKey: 'heroes.quinchai.routes.mistweaver.variantDesc'
        },
        skills: [
          {
            id: 'quinchai_mw_yu_lon', name: '옥룡 위론 소환', nameKey: 'heroes.quinchai.skills.yu_lon.name', description: '옥룡을 소환하여 20초간 주변 모든 아군을 주기적으로 치유합니다.', descriptionKey: 'heroes.quinchai.skills.yu_lon.desc', color: '#67e8f9', isShared: false, cost: 300,
            summonStats: { displayName: '위론', displayNameKey: 'heroes.quinchai.summons.yu_lon.name', hp: 400, atk: 80, def: 10, spd: 0, role: 'healer', attackRange: 400, duration: 20 }
          },
          { id: 'quinchai_mw_vivify', name: '생충', nameKey: 'heroes.quinchai.skills.vivify.name', description: '5초마다 최저 체력 아군 ATK×4 치유', descriptionKey: 'heroes.quinchai.skills.vivify.desc', color: '#22d3ee', isShared: false, cost: 400 },
          { id: 'quinchai_mw_revival', name: '재활', nameKey: 'heroes.quinchai.skills.revival.name', description: '25초마다 모든 아군 즉시 ATK×3 치유 및 모든 해로운 효과 제거', descriptionKey: 'heroes.quinchai.skills.revival.desc', color: '#0891b2', isShared: false, cost: 600 },
          {
            id: 'quinchai_mw_chi_ji', name: '주학 츠지 소환', nameKey: 'heroes.quinchai.skills.chi_ji.name', description: '주학을 소환하여 부상당한 아군을 매우 빠르게 치유합니다.', descriptionKey: 'heroes.quinchai.skills.chi_ji.desc', color: '#155e75', isShared: false, cost: 1200, isFinal: true,
            summonStats: { displayName: '츠지', displayNameKey: 'heroes.quinchai.summons.chi_ji.name', hp: 350, atk: 120, def: 5, spd: 4.5, role: 'healer', attackRange: 500, duration: 20 }
          }
        ]
      }
    ],
    baseStats: { hp: 880, atk: 110, def: 55, spd: 3.0, attackRange: 45 }, color: '#d97706',
  },
  // 16. 울트리온 (SSR) - 드렉티르 기원사
  {
    id: 'ultrion', name: '울트리온', nameKey: 'heroes.ultrion.name', grade: 'SSR', role: 'healer', raceName: '드렉티르', elementName: '용', starRating: 1,
    lore: '용의 섬에서 깨어난 고대 드렉티르. 오색 용의 힘을 다루며 아군을 치유하거나 강화하고, 적을 파괴한다.', loreKey: 'heroes.ultrion.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'ultrion_preservation', name: '복원', nameKey: 'heroes.ultrion.routes.preservation.name', color: '#22c55e', role: 'healer',
        uniqueVariant: { 
          name: '생명의 숨결', nameKey: 'heroes.ultrion.routes.preservation.variantName',
          descriptionTemplate: '힐 시 {value}% 확률로 주변 아군 2명을 추가로 치유합니다.', descriptionTemplateKey: 'heroes.ultrion.routes.preservation.variantDesc'
        },
        skills: [
          { id: 'ult_pres_reversion', name: '소생', nameKey: 'heroes.ultrion.skills.reversion.name', description: '6초마다 대상에게 8초간 ATK×0.5 지속 회복 부여', descriptionKey: 'heroes.ultrion.skills.reversion.desc', color: '#4ade80', isShared: false, cost: 200 },
          { id: 'ult_pres_spiritbloom', name: '정신꽃', nameKey: 'heroes.ultrion.skills.spiritbloom.name', description: '8초마다 체력이 낮은 아군 3명에게 ATK×4 즉시 치유', descriptionKey: 'heroes.ultrion.skills.spiritbloom.desc', color: '#16a34a', isShared: false, cost: 400 },
          { id: 'ult_pres_temporal_anomaly', name: '시간의 변칙', nameKey: 'heroes.ultrion.skills.temporal_anomaly.name', description: '12초마다 아군 전체에게 6초간 최대 HP 15% 보호막 부여', descriptionKey: 'heroes.ultrion.skills.temporal_anomaly.desc', color: '#15803d', isShared: false, cost: 600 },
          { id: 'ult_pres_stasis', name: '정지', nameKey: 'heroes.ultrion.skills.stasis.name', description: '25초마다 모든 아군 즉시 ATK×5 치유 및 2초간 모든 피해 면역', descriptionKey: 'heroes.ultrion.skills.stasis.desc', color: '#166534', isShared: false, cost: 1200, isFinal: true }
        ]
      },
      {
        id: 'ultrion_devastation', name: '파열', nameKey: 'heroes.ultrion.routes.devastation.name', color: '#dc2626', role: 'ranged_dps',
        uniqueVariant: { 
          name: '파멸의 기운', nameKey: 'heroes.ultrion.routes.devastation.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 타겟 주변 100px 적에게 ATK×2 추가 피해.', descriptionTemplateKey: 'heroes.ultrion.routes.devastation.variantDesc'
        },
        skills: [
          { id: 'ult_dev_fire_breath', name: '불꽃 숨결', nameKey: 'heroes.ultrion.skills.fire_breath.name', description: '8초마다 전방 모든 적 ATK×5 피해 및 5초간 지속 화염 피해', descriptionKey: 'heroes.ultrion.skills.fire_breath.desc', color: '#f97316', isShared: false, cost: 200 },
          { id: 'ult_dev_eternity_surge', name: '영겁의 해일', nameKey: 'heroes.ultrion.skills.eternity_surge.name', description: '공격 시 {value}% 확률로 주변 적 3명에게 ATK×3 피해', descriptionKey: 'heroes.ultrion.skills.eternity_surge.desc', color: '#ef4444', isShared: false, cost: 400 },
          { id: 'ult_dev_disintegrate', name: '분열', nameKey: 'heroes.ultrion.skills.disintegrate.name', description: '12초마다 단일 대상에게 3초간 매초 ATK×4 피해 및 50% 슬로우', descriptionKey: 'heroes.ultrion.skills.disintegrate.desc', color: '#b91c1c', isShared: false, cost: 600 },
          { id: 'ult_dev_dragonrage', name: '용의 격노', nameKey: 'heroes.ultrion.skills.dragonrage.name', description: '20초마다 10초간 공격력 50% 및 공격 속도 50% 증가', descriptionKey: 'heroes.ultrion.skills.dragonrage.desc', color: '#7f1d1d', isShared: false, cost: 1200, isFinal: true }
        ]
      },
      {
        id: 'ultrion_augmentation', name: '증강', nameKey: 'heroes.ultrion.routes.augmentation.name', color: '#7c3aed', role: 'cc',
        uniqueVariant: { 
          name: '강화의 정수', nameKey: 'heroes.ultrion.routes.augmentation.variantName',
          descriptionTemplate: '오라: 주변 250px 내 모든 아군의 공격 속도가 {value}% 증가합니다.', descriptionTemplateKey: 'heroes.ultrion.routes.augmentation.variantDesc'
        },
        skills: [
          { id: 'ult_aug_ebon_might', name: '흑요의 힘', nameKey: 'heroes.ultrion.skills.ebon_might.name', description: '10초마다 8초간 가장 공격력이 높은 아군 2명의 ATK 30% 증가', descriptionKey: 'heroes.ultrion.skills.ebon_might.desc', color: '#a855f7', isShared: false, cost: 200 },
          { id: 'ult_aug_blistering_scales', name: '작열의 비늘', nameKey: 'heroes.ultrion.skills.blistering_scales.name', description: '12초마다 탱커 아군 방어력 +40 및 피격 시 ATK 30% 반사 (10초)', descriptionKey: 'heroes.ultrion.skills.blistering_scales.desc', color: '#7c3aed', isShared: false, cost: 400 },
          { id: 'ult_aug_upheaval', name: '지각 변동', nameKey: 'heroes.ultrion.skills.upheaval.name', description: '15초마다 타겟 주변 적 ATK×5 피해 및 2초간 기절', descriptionKey: 'heroes.ultrion.skills.upheaval.desc', color: '#6d28d9', isShared: false, cost: 600 },
          { id: 'ult_aug_breath_of_eons', name: '무한의 숨결', nameKey: 'heroes.ultrion.skills.breath_of_eons.name', description: '30초마다 전장 모든 적 3초 기절 및 10초간 아군 전체 피해량 20% 증가', descriptionKey: 'heroes.ultrion.skills.breath_of_eons.desc', color: '#4c1d95', isShared: false, cost: 1200, isFinal: true }
        ]
      }
    ],
    baseStats: { hp: 800, atk: 110, def: 42, spd: 3.0, attackRange: 1500 }, color: '#22d3ee',
  },
  // 17. 롬바르도 (SSR) - 블러드엘프 악마사냥꾼
  {
    id: 'lombardo', name: '롬바르도', nameKey: 'heroes.lombardo.name', grade: 'SSR', role: 'melee_dps', raceName: '블러드엘프', elementName: '불꽃', starRating: 1,
    lore: '일리다리를 따르는 악마사냥꾼. 지옥불과 혼돈의 마력으로 적을 파괴하거나, 고통을 견디며 아군을 보호한다.', loreKey: 'heroes.lombardo.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'lomb_havoc', name: '파멸', nameKey: 'heroes.lombardo.routes.havoc.name', color: '#a855f7',
        uniqueVariant: { 
          name: '혼돈의 가피', nameKey: 'heroes.lombardo.routes.havoc.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 ATK×2 추가 혼돈 피해.', descriptionTemplateKey: 'heroes.lombardo.routes.havoc.variantDesc'
        },
        skills: [
          { id: 'lomb_havoc_fel_rush', name: '지옥 돌진', nameKey: 'heroes.lombardo.skills.fel_rush.name', description: '5초마다 전방 250px 돌진하며 경로 상의 모든 적 ATK×3.5 피해', descriptionKey: 'heroes.lombardo.skills.fel_rush.desc', color: '#c026d3', isShared: false, cost: 200 },
          { id: 'lomb_havoc_chaos_strike', name: '혼돈의 일격', nameKey: 'heroes.lombardo.skills.chaos_strike.name', description: '공격 시 {value}% 확률로 ATK×3 피해 및 소모 기력 반환(쿨타임 감소)', descriptionKey: 'heroes.lombardo.skills.chaos_strike.desc', color: '#a855f7', isShared: false, cost: 300 },
          { id: 'lomb_havoc_blade_dance', name: '칼날의 춤', nameKey: 'heroes.lombardo.skills.blade_dance.name', description: '8초마다 주변 모든 적 ATK×4 피해 및 1초간 모든 공격 회피', descriptionKey: 'heroes.lombardo.skills.blade_dance.desc', color: '#7e22ce', isShared: false, cost: 400 },
          { id: 'lomb_havoc_eye_beam', name: '안광', nameKey: 'heroes.lombardo.skills.eye_beam.name', description: '12초마다 전방 모든 적에게 2초간 매초 ATK×4 피해 및 확정 치명타', descriptionKey: 'heroes.lombardo.skills.eye_beam.desc', color: '#9333ea', isShared: false, cost: 600 },
          { id: 'lomb_havoc_metamorphosis', name: '탈태', nameKey: 'heroes.lombardo.skills.metamorphosis.name', description: '20초마다 10초간 악마로 변신하여 가속 40% 및 유연성(피감) 20% 증가', descriptionKey: 'heroes.lombardo.skills.metamorphosis.desc', color: '#6b21a8', isShared: false, cost: 800 },
          { id: 'lomb_havoc_the_hunt', name: '사냥', nameKey: 'heroes.lombardo.skills.the_hunt.name', description: '30초마다 대상에게 돌진하여 ATK×15 피해 및 6초간 지속 피해', descriptionKey: 'heroes.lombardo.skills.the_hunt.desc', color: '#581c87', isShared: false, cost: 1200, isFinal: true }
        ]
      },
      {
        id: 'lomb_vengeance', name: '복수', nameKey: 'heroes.lombardo.routes.vengeance.name', color: '#dc2626', role: 'tank',
        uniqueVariant: { 
          name: '영혼 흡수', nameKey: 'heroes.lombardo.routes.vengeance.variantName',
          descriptionTemplate: '피격 시 {value}% 확률로 영혼 파편 생성 (HP 5% 회복).', descriptionTemplateKey: 'heroes.lombardo.routes.vengeance.variantDesc'
        },
        skills: [
          { id: 'lomb_ven_shear', name: '절단', nameKey: 'heroes.lombardo.skills.shear.name', description: '6초마다 대상 ATK×3.5 피해 및 확정적으로 영혼 파편 1개 생성', descriptionKey: 'heroes.lombardo.skills.shear.desc', color: '#ef4444', isShared: false, cost: 200 },
          { id: 'lomb_ven_soul_cleave', name: '영혼 분쇄', nameKey: 'heroes.lombardo.skills.soul_cleave.name', description: '8초마다 전방 광역 ATK×3 피해 및 소모한 파편 당 HP 8% 회복', descriptionKey: 'heroes.lombardo.skills.soul_cleave.desc', color: '#dc2626', isShared: false, cost: 300 },
          { id: 'lomb_ven_sigil_flame', name: '불꽃의 인장', nameKey: 'heroes.lombardo.skills.sigil_flame.name', description: '10초마다 6초간 반경 180px 바닥 생성, 매초 ATK×1.5 화염 피해', descriptionKey: 'heroes.lombardo.skills.sigil_flame.desc', color: '#b91c1c', isShared: false, cost: 400 },
          { id: 'lomb_ven_demon_spikes', name: '악마의 쐐기', nameKey: 'heroes.lombardo.skills.demon_spikes.name', description: '15초마다 6초간 방어력 50% 증가 및 무기 막기 확률(피감) 20% 증가', descriptionKey: 'heroes.lombardo.skills.demon_spikes.desc', color: '#991b1b', isShared: false, cost: 600 },
          { id: 'lomb_ven_soul_carving', name: '영혼 베기', nameKey: 'heroes.lombardo.skills.soul_carving.name', description: '20초마다 대상에게 ATK×8 피해 및 영혼 파편 3개 즉시 생성', descriptionKey: 'heroes.lombardo.skills.soul_carving.desc', color: '#7f1d1d', isShared: false, cost: 800 },
          { id: 'lomb_ven_elysian_decree', name: '천상의 종', nameKey: 'heroes.lombardo.skills.elysian_decree.name', description: '30초마다 지정 위치에 광역 ATK×12 비전 피해 및 파편 3개 생성', descriptionKey: 'heroes.lombardo.skills.elysian_decree.desc', color: '#450a0a', isShared: false, cost: 1200, isFinal: true }
        ]
      }
    ],
    baseStats: { hp: 920, atk: 118, def: 48, spd: 4.5, attackRange: 42 }, color: '#a855f7',
  },
  // 18. 리뮤 (R) - 볼페라
  {
    id: 'limu', name: '리뮤', nameKey: 'heroes.limu.name', grade: 'R', role: 'ranged_dps', raceName: '볼페라', elementName: '바람', starRating: 1,
    lore: '사막의 여우 사냥꾼. 성급이 오를수록 압도적인 속사 능력을 보여준다.', loreKey: 'heroes.limu.lore',
    uniqueSkill: { baseValues: [20, 28, 38, 50, 70], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    starAtkSpeedBonus: 0.12, // 성급당 12% 단축 (5성 시 거의 50% 단축)
    classRoutes: [
      { 
        id: 'limu_precision', name: '사격', nameKey: 'heroes.limu.routes.precision.name', color: '#84cc16', 
        uniqueVariant: { 
          name: '에임 다운', nameKey: 'heroes.limu.routes.precision.variantName',
          descriptionTemplate: '공격 시 {value}% 확률 치명타.', descriptionTemplateKey: 'heroes.limu.routes.precision.variantDesc'
        }, 
        skills: [
          { id: 'limu_aimed_shot', name: '조준 사격', nameKey: 'heroes.limu.skills.aimed_shot.name', description: '강력한 한발', descriptionKey: 'heroes.limu.skills.aimed_shot.desc', color: '#a3e635', isShared: false, cost: 200 }, 
          { id: 'limu_piercing_arrow', name: '관통 화살', nameKey: 'heroes.limu.skills.piercing_arrow.name', description: '직선 관통', descriptionKey: 'heroes.limu.skills.piercing_arrow.desc', color: '#84cc16', isShared: false, cost: 350 }, 
          { id: 'limu_marked_for_death', name: '목표 지정', nameKey: 'heroes.limu.skills.marked_for_death.name', description: '확정 치명타', descriptionKey: 'heroes.limu.skills.marked_for_death.desc', color: '#65a30d', isShared: false, cost: 500 }, 
          { id: 'limu_trueshot', name: '진실의 한 발', nameKey: 'heroes.limu.skills.trueshot.name', description: '피해 2배', descriptionKey: 'heroes.limu.skills.trueshot.desc', color: '#3f6212', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 370, atk: 85, def: 8, spd: 3, attackRange: 1500 }, color: '#84cc16',
  },
  // 19. 샹화 (R) - 판다렌
  {
    id: 'xianghua', name: '샹화', nameKey: 'heroes.xianghua.name', grade: 'R', role: 'healer', raceName: '판다렌', elementName: '물', starRating: 1,
    lore: '치유의 안개를 다루는 판다렌 수도사.', loreKey: 'heroes.xianghua.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'xianghua_mistweaver', name: '운무수도사', nameKey: 'heroes.xianghua.routes.mistweaver.name', color: '#06b6d4', 
        uniqueVariant: { 
          name: '운무 직조', nameKey: 'heroes.xianghua.routes.mistweaver.variantName',
          descriptionTemplate: '공격 시 {value}% 확률 스마트 힐.', descriptionTemplateKey: 'heroes.xianghua.routes.mistweaver.variantDesc'
        }, 
        skills: [
          { id: 'xianghua_soothing_mist', name: '안식의 안개', nameKey: 'heroes.xianghua.skills.soothing_mist.name', description: '채널 힐', descriptionKey: 'heroes.xianghua.skills.soothing_mist.desc', color: '#67e8f9', isShared: false, cost: 150 }, 
          { id: 'xianghua_life_cocoon', name: '생명의 누에고치', nameKey: 'heroes.xianghua.skills.life_cocoon.name', description: '보호막+HoT', descriptionKey: 'heroes.xianghua.skills.life_cocoon.desc', color: '#22d3ee', isShared: false, cost: 300 }, 
          { id: 'xianghua_enveloping_mist', name: '감싸는 안개', nameKey: 'heroes.xianghua.skills.enveloping_mist.name', description: '강력 힐+HoT', descriptionKey: 'heroes.xianghua.skills.enveloping_mist.desc', color: '#0891b2', isShared: false, cost: 500 }, 
          { id: 'xianghua_revival', name: '부활의 의식', nameKey: 'heroes.xianghua.skills.revival.name', description: '전체 회복', descriptionKey: 'heroes.xianghua.skills.revival.desc', color: '#155e75', isShared: false, cost: 1200 }, 
          { id: 'xianghua_invoke_chi_ji', name: '기지 소환', nameKey: 'heroes.xianghua.skills.invoke_chi_ji.name', description: '8초간 전체 주기 힐', descriptionKey: 'heroes.xianghua.skills.invoke_chi_ji.desc', color: '#0e7490', isShared: false, cost: 2000, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 430, atk: 50, def: 18, spd: 3.5, attackRange: 250 }, color: '#06b6d4',
  },
  // 20. 리아시안 (R) - 공허엘프
  {
    id: 'liasian', name: '리아시안', nameKey: 'heroes.liasian.name', grade: 'R', role: 'melee_dps', raceName: '공허엘프', elementName: '암흑', starRating: 1,
    lore: '공허에 물든 엘프 악마사냥꾼. 적의 생명력을 포식한다.', loreKey: 'heroes.liasian.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'liasian_feast', name: '포식', nameKey: 'heroes.liasian.routes.feast.name', color: '#dc2626', 
        uniqueVariant: { 
          name: '피의 포식', nameKey: 'heroes.liasian.routes.feast.variantName',
          descriptionTemplate: '처치 시 HP {value}% 회복.', descriptionTemplateKey: 'heroes.liasian.routes.feast.variantDesc'
        }, 
        skills: [
          { id: 'liasian_consume', name: '악마의 물어뜯기', nameKey: 'heroes.liasian.skills.consume.name', description: '피해+흡혈', descriptionKey: 'heroes.liasian.skills.consume.desc', color: '#ef4444', isShared: false, cost: 200 }, 
          { id: 'liasian_soul_rend', name: '영혼 갈취', nameKey: 'heroes.liasian.skills.soul_rend.name', description: 'HP 직접 흡수', descriptionKey: 'heroes.liasian.skills.soul_rend.desc', color: '#b91c1c', isShared: false, cost: 350 }, 
          { id: 'liasian_immolation_aura', name: '포식의 오라', nameKey: 'heroes.liasian.skills.immolation_aura.name', description: '주변 지속 피해', descriptionKey: 'heroes.liasian.skills.immolation_aura.desc', color: '#991b1b', isShared: false, cost: 450 }, 
          { id: 'liasian_massacre', name: '대학살', nameKey: 'heroes.liasian.skills.massacre.name', description: '처형+쿨초기화', descriptionKey: 'heroes.liasian.skills.massacre.desc', color: '#7f1d1d', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 480, atk: 105, def: 18, spd: 5, attackRange: 42 }, color: '#dc2626',
  },
  // 20-2. 라리시안 (R) - 블러드엘프 (복구)
  {
    id: 'larisian', name: '라리시안', nameKey: 'heroes.larisian.name', grade: 'R', role: 'melee_dps', raceName: '블러드엘프', elementName: '암흑', starRating: 1,
    lore: '먹이를 노리는 포식자. 블러드엘프 악마사냥꾼.', loreKey: 'heroes.larisian.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'larisian_feast', name: '포식', nameKey: 'heroes.larisian.routes.feast.name', color: '#dc2626', 
        uniqueVariant: { 
          name: '피의 포식', nameKey: 'heroes.larisian.routes.feast.variantName',
          descriptionTemplate: '처치 시 HP {value}% 회복.', descriptionTemplateKey: 'heroes.larisian.routes.feast.variantDesc'
        }, 
        skills: [
          { id: 'larisian_consume', name: '악마의 물어뜯기', nameKey: 'heroes.larisian.skills.consume.name', description: '피해+흡혈', descriptionKey: 'heroes.larisian.skills.consume.desc', color: '#ef4444', isShared: false, cost: 200 }, 
          { id: 'larisian_soul_rend', name: '영혼 갈취', nameKey: 'heroes.larisian.skills.soul_rend.name', description: 'HP 직접 흡수', descriptionKey: 'heroes.larisian.skills.soul_rend.desc', color: '#b91c1c', isShared: false, cost: 350 }, 
          { id: 'larisian_immolation_aura', name: '포식의 오라', nameKey: 'heroes.larisian.skills.immolation_aura.name', description: '주변 지속 피해', descriptionKey: 'heroes.larisian.skills.immolation_aura.desc', color: '#991b1b', isShared: false, cost: 450 }, 
          { id: 'larisian_massacre', name: '대학살', nameKey: 'heroes.larisian.skills.massacre.name', description: '처형+쿨초기화', descriptionKey: 'heroes.larisian.skills.massacre.desc', color: '#7f1d1d', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 480, atk: 105, def: 18, spd: 5, attackRange: 42 }, color: '#dc2626',
  },
  // 21. 투탕카톤 (R) - 토석인
  {
    id: 'tutankaton', name: '투탕카톤', nameKey: 'heroes.tutankaton.name', grade: 'R', role: 'melee_dps', raceName: '토석인', elementName: '독', starRating: 1,
    lore: '살아있는 돌, 토석인 도적. 단단한 몸으로 은밀하게 접근한다.', loreKey: 'heroes.tutankaton.lore',
    uniqueSkill: { baseValues: [20, 28, 38, 50, 70], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'tutan_assassination', name: '암살', nameKey: 'heroes.tutankaton.routes.assassination.name', color: '#65a30d', 
        uniqueVariant: { 
          name: '맹독 전문가', nameKey: 'heroes.tutankaton.routes.assassination.variantName',
          descriptionTemplate: '독 피해 {value}% 증가.', descriptionTemplateKey: 'heroes.tutankaton.routes.assassination.variantDesc'
        }, 
        skills: [
          { id: 'tutan_garrote', name: '교살', nameKey: 'heroes.tutankaton.skills.garrote.name', description: '출혈+독', descriptionKey: 'heroes.tutankaton.skills.garrote.desc', color: '#84cc16', isShared: false, cost: 150 }, 
          { id: 'tutan_rupture', name: '파열', nameKey: 'heroes.tutankaton.skills.rupture.name', description: '독 DoT', descriptionKey: 'heroes.tutankaton.skills.rupture.desc', color: '#4ade80', isShared: false, cost: 300 }, 
          { id: 'tutan_envenom', name: '부식', nameKey: 'heroes.tutankaton.skills.envenom.name', description: '독 폭발 피해', descriptionKey: 'heroes.tutankaton.skills.envenom.desc', color: '#16a34a', isShared: false, cost: 450 }, 
          { id: 'tutan_venom_burst', name: '맹독 폭발', nameKey: 'heroes.tutankaton.skills.venom_burst.name', description: '광역 독 폭발', descriptionKey: 'heroes.tutankaton.skills.venom_burst.desc', color: '#166534', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 390, atk: 105, def: 10, spd: 5.5, attackRange: 38 }, color: '#65a30d',
  },
  // 22. 예슈탈키온 (SR) - 빛벼림 드레나이
  {
    id: 'yeshtalktion', name: '예슈탈키온', nameKey: 'heroes.yeshtalktion.name', grade: 'SR', role: 'healer', raceName: '빛벼림 드레나이', elementName: '신성', starRating: 1,
    lore: '빛으로 벼려진 드레나이 성기사. 순수한 빛의 힘을 다룬다.', loreKey: 'heroes.yeshtalktion.lore',
    uniqueSkill: { baseValues: [20, 28, 38, 50, 70], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'yesh_holy', name: '신성기사', nameKey: 'heroes.yeshtalktion.routes.holy.name', color: '#fbbf24', role: 'healer', 
        uniqueVariant: { 
          name: '신성한 빛', nameKey: 'heroes.yeshtalktion.routes.holy.variantName',
          descriptionTemplate: '힐 시 {value}% 확률 연계 힐.', descriptionTemplateKey: 'heroes.yeshtalktion.routes.holy.variantDesc'
        }, 
        skills: [
          { id: 'yesh_holy_light', name: '신성 빛', nameKey: 'heroes.yeshtalktion.skills.holy_light.name', description: '강력 단일 힐', descriptionKey: 'heroes.yeshtalktion.skills.holy_light.desc', color: '#fde68a', isShared: false, cost: 150 }, 
          { id: 'yesh_sacred_shield', name: '신성한 방패', nameKey: 'heroes.yeshtalktion.skills.sacred_shield.name', description: '힐 대상에게 보호막 (최대HP 15%, 8초)', descriptionKey: 'heroes.yeshtalktion.skills.sacred_shield.desc', color: '#f59e0b', isShared: false, cost: 300 }, 
          { id: 'yesh_divine_favor', name: '빛의 은혜', nameKey: 'heroes.yeshtalktion.skills.divine_favor.name', description: '힐 2배+쿨초', descriptionKey: 'heroes.yeshtalktion.skills.divine_favor.desc', color: '#d97706', isShared: false, cost: 500 }, 
          { id: 'yesh_sanctified_ground', name: '지성소', nameKey: 'heroes.yeshtalktion.skills.sanctified_ground.name', description: '장판 힐+피감', descriptionKey: 'heroes.yeshtalktion.skills.sanctified_ground.desc', color: '#92400e', isShared: false, cost: 1200, isFinal: true }
        ] 
      },
      { 
        id: 'yesh_retribution', name: '징벌기사', nameKey: 'heroes.yeshtalktion.routes.retribution.name', color: '#dc2626', role: 'melee_dps', 
        uniqueVariant: { 
          name: '신성 응보', nameKey: 'heroes.yeshtalktion.routes.retribution.variantName',
          descriptionTemplate: '힐 후 공격 {value}% 추뎀.', descriptionTemplateKey: 'heroes.yeshtalktion.routes.retribution.variantDesc'
        }, 
        skills: [
          { id: 'yesh_crusader_strike', name: '성기사의 뇌격', nameKey: 'heroes.yeshtalktion.skills.crusader_strike.name', description: '신성 타격', descriptionKey: 'heroes.yeshtalktion.skills.crusader_strike.desc', color: '#f97316', isShared: false, cost: 150 }, 
          { id: 'yesh_hammer_of_wrath', name: '진노의 해머', nameKey: 'heroes.yeshtalktion.skills.hammer_of_wrath.name', description: '마무리 일격', descriptionKey: 'heroes.yeshtalktion.skills.hammer_of_wrath.desc', color: '#ea580c', isShared: false, cost: 300 }, 
          { id: 'yesh_divine_purpose', name: '성전사의 검', nameKey: 'heroes.yeshtalktion.skills.divine_purpose.name', description: '쿨감 가속', descriptionKey: 'heroes.yeshtalktion.skills.divine_purpose.desc', color: '#c2410c', isShared: false, cost: 450 }, 
          { id: 'yesh_final_reckoning', name: '최후의 심판', nameKey: 'heroes.yeshtalktion.skills.final_reckoning.name', description: '광역 피해+힐', descriptionKey: 'heroes.yeshtalktion.skills.final_reckoning.desc', color: '#9a3412', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 500, atk: 50, def: 28, spd: 2.5, attackRange: 500 }, color: '#fbbf24',
  },
  // 23. 에이나 (R) - 드레나이
  {
    id: 'aeina', name: '에이나', nameKey: 'heroes.aeina.name', grade: 'R', role: 'ranged_dps', raceName: '드레나이', elementName: '암흑', starRating: 1,
    lore: '어둠을 받아들인 드레나이 사제.', loreKey: 'heroes.aeina.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [{ 
      id: 'aeina_void', name: '공허', nameKey: 'heroes.aeina.routes.void.name', color: '#1e1b4b', 
      uniqueVariant: { 
        name: '공허 파열', nameKey: 'heroes.aeina.routes.void.variantName',
        descriptionTemplate: '공격 시 {value}% 확률 광역 전파.', descriptionTemplateKey: 'heroes.aeina.routes.void.variantDesc'
      }, 
      skills: [
        { id: 'aeina_mind_flay', name: '정신 채찍', nameKey: 'heroes.aeina.skills.mind_flay.name', description: '채널 피해+슬로우', descriptionKey: 'heroes.aeina.skills.mind_flay.desc', color: '#3730a3', isShared: false, cost: 200 }, 
        { id: 'aeina_mind_blast', name: '공허 폭탄', nameKey: 'heroes.aeina.skills.mind_blast.name', description: '단일 강타', descriptionKey: 'heroes.aeina.skills.mind_blast.desc', color: '#4338ca', isShared: false, cost: 350 }, 
        { id: 'aeina_devouring_plague', name: '황폐', nameKey: 'heroes.aeina.skills.devouring_plague.name', description: 'DoT+흡혈', descriptionKey: 'heroes.aeina.skills.devouring_plague.desc', color: '#312e81', isShared: false, cost: 500 }, 
        { id: 'aeina_void_form', name: '공허화', nameKey: 'heroes.aeina.skills.void_form.name', description: '변신 강화', descriptionKey: 'heroes.aeina.skills.void_form.desc', color: '#1e1b4b', isShared: false, cost: 1200, isFinal: true }
      ] 
    }],
    baseStats: { hp: 360, atk: 95, def: 10, spd: 3, attackRange: 1200 }, color: '#7c3aed',
  },
  // 24. 이에나 (R) - 빛벼림 드레나이
  {
    id: 'iyena', name: '이에나', nameKey: 'heroes.iyena.name', grade: 'R', role: 'healer', raceName: '빛벼림 드레나이', elementName: '신성', starRating: 1,
    lore: '에이나의 자매. 빛벼림 드레나이 수양 사제.', loreKey: 'heroes.iyena.lore',
    uniqueSkill: { baseValues: [20, 28, 38, 50, 70], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'iyena_discipline', name: '수양', nameKey: 'heroes.iyena.routes.discipline.name', color: '#06b6d4', 
        uniqueVariant: { 
          name: '고통의 방어막', nameKey: 'heroes.iyena.routes.discipline.variantName',
          descriptionTemplate: '힐 시 HP {value}% 방어막.', descriptionTemplateKey: 'heroes.iyena.routes.discipline.variantDesc'
        }, 
        skills: [
          { id: 'iyena_power_word_shield', name: '장막', nameKey: 'heroes.iyena.skills.power_word_shield.name', description: '단일 보호막 부여 (최대HP 25%, 12초)', descriptionKey: 'heroes.iyena.skills.power_word_shield.desc', color: '#67e8f9', isShared: false, cost: 150 }, 
          { id: 'iyena_atonement', name: '속죄', nameKey: 'heroes.iyena.skills.atonement.name', description: '딜→힐 전환', descriptionKey: 'heroes.iyena.skills.atonement.desc', color: '#22d3ee', isShared: false, cost: 300 }, 
          { id: 'iyena_penance', name: '참회', nameKey: 'heroes.iyena.skills.penance.name', description: '공격/치유 연타', descriptionKey: 'heroes.iyena.skills.penance.desc', color: '#0891b2', isShared: false, cost: 450 }, 
          { id: 'iyena_barrier', name: '빛의 홍수', nameKey: 'heroes.iyena.skills.barrier.name', description: '전체 아군 보호막 (최대HP 10%, 8초)', descriptionKey: 'heroes.iyena.skills.barrier.desc', color: '#155e75', isShared: false, cost: 1200 }, 
          { id: 'iyena_desperate_prayer', name: '절박한 기도', nameKey: 'heroes.iyena.skills.desperate_prayer.name', description: '자신 ATK×10 즉시 힐', descriptionKey: 'heroes.iyena.skills.desperate_prayer.desc', color: '#0ea5e9', isShared: false, cost: 2000, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 400, atk: 40, def: 15, spd: 3, attackRange: 800 }, color: '#fbbf24',
  },
  // 25. 칼리샨 (R) - 공허엘프
  {
    id: 'kalishan', name: '칼리샨', nameKey: 'heroes.kalishan.name', grade: 'R', role: 'ranged_dps', raceName: '공허엘프', elementName: '암흑', starRating: 1,
    lore: '공허의 힘을 화살에 실어 쏘는 사냥꾼.', loreKey: 'heroes.kalishan.lore',
    uniqueSkill: { baseValues: [20, 28, 38, 50, 70], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'kali_marksmanship', name: '사격', nameKey: 'heroes.kalishan.routes.marksmanship.name', color: '#065f46', 
        uniqueVariant: { 
          name: '공허 화살', nameKey: 'heroes.kalishan.routes.marksmanship.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 암흑 추가 피해.', descriptionTemplateKey: 'heroes.kalishan.routes.marksmanship.variantDesc'
        }, 
        skills: [
          { id: 'kali_aimed_shot', name: '조준 사격', nameKey: 'heroes.kalishan.skills.aimed_shot.name', description: '강력한 사격', descriptionKey: 'heroes.kalishan.skills.aimed_shot.desc', color: '#059669', isShared: false, cost: 150 }, 
          { id: 'kali_arcane_shot', name: '신비한 사격', nameKey: 'heroes.kalishan.skills.arcane_shot.name', description: '즉시 시전 사격', descriptionKey: 'heroes.kalishan.skills.arcane_shot.desc', color: '#047857', isShared: false, cost: 300 }, 
          { id: 'kali_rapid_fire', name: '속사', nameKey: 'heroes.kalishan.skills.rapid_fire.name', description: '공격 속도 증가', descriptionKey: 'heroes.kalishan.skills.rapid_fire.desc', color: '#065f46', isShared: false, cost: 450 }, 
          { id: 'kali_void_volley', name: '공허의 화살비', nameKey: 'heroes.kalishan.skills.void_volley.name', description: '광역 암흑 피해', descriptionKey: 'heroes.kalishan.skills.void_volley.desc', color: '#064e3b', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 360, atk: 110, def: 8, spd: 3, attackRange: 1400 }, color: '#7c3aed',
  },
  // 26. 트론튬 (R) - 검은무쇠 드워프
  {
    id: 'trontum', name: '트론튬', nameKey: 'heroes.trontum.name', grade: 'R', role: 'melee_dps', raceName: '검은무쇠 드워프', elementName: '서리', starRating: 1,
    lore: '불타는 산 깊은 곳에서 온 검은무쇠 드워프 죽음의 기사.', loreKey: 'heroes.trontum.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 55], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      { 
        id: 'trontum_frost_dps', name: '냉기', nameKey: 'heroes.trontum.routes.frost.name', color: '#0ea5e9', 
        uniqueVariant: { 
          name: '서리칼날', nameKey: 'heroes.trontum.routes.frost.variantName',
          descriptionTemplate: '공격 시 {value}% 추가 냉기 피해.', descriptionTemplateKey: 'heroes.trontum.routes.frost.variantDesc'
        }, 
        skills: [
          { id: 'trontum_frost_strike', name: '냉기 강타', nameKey: 'heroes.trontum.skills.frost_strike.name', description: '냉기 피해+슬로우', descriptionKey: 'heroes.trontum.skills.frost_strike.desc', color: '#38bdf8', isShared: false, cost: 150 }, 
          { id: 'trontum_howling_blast', name: '얼음 포효', nameKey: 'heroes.trontum.skills.howling_blast.name', description: '광역 냉기', descriptionKey: 'heroes.trontum.skills.howling_blast.desc', color: '#0ea5e9', isShared: false, cost: 300 }, 
          { id: 'trontum_pillar_of_frost', name: '냉기 형상', nameKey: 'heroes.trontum.skills.pillar_of_frost.name', description: '공격력 증가', descriptionKey: 'heroes.trontum.skills.pillar_of_frost.desc', color: '#0284c7', isShared: false, cost: 450 }, 
          { id: 'trontum_obliterate', name: '오블리터레이트', nameKey: 'heroes.trontum.skills.obliterate.name', description: '강력한 2연타', descriptionKey: 'heroes.trontum.skills.obliterate.desc', color: '#075985', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ],
    baseStats: { hp: 600, atk: 85, def: 35, spd: 3, attackRange: 45 }, color: '#0ea5e9',
  },
  // 27. 가르두 (R)
  { 
    id: 'gardu', name: '가르두', nameKey: 'heroes.gardu.name', grade: 'R', role: 'melee_dps', raceName: '오크', elementName: '화염', starRating: 1, 
    lore: '거대 도끼를 휘두르는 오크 전사.', loreKey: 'heroes.gardu.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'gardu_arms', name: '무기', nameKey: 'heroes.gardu.routes.arms.name', color: '#b91c1c', 
        uniqueVariant: { 
          name: '치명적 일격', nameKey: 'heroes.gardu.routes.arms.variantName',
          descriptionTemplate: '치명타율 {value}% 증가.', descriptionTemplateKey: 'heroes.gardu.routes.arms.variantDesc'
        }, 
        skills: [
          { ...SHARED.multi_strike }, 
          { id: 'gardu_mortal_strike', name: '필사의 일격', nameKey: 'heroes.gardu.skills.mortal_strike.name', description: '적에게 피해를 주고 치유 50% 감소', descriptionKey: 'heroes.gardu.skills.mortal_strike.desc', color: '#991b1b', isShared: false, cost: 250 }, 
          { ...SHARED.berserk }, 
          { id: 'gardu_bladestorm', name: '칼날폭풍', nameKey: 'heroes.gardu.skills.bladestorm.name', description: '광역 휠윈드', descriptionKey: 'heroes.gardu.skills.bladestorm.desc', color: '#7f1d1d', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 500, atk: 160, def: 25, spd: 3.5, attackRange: 40, attackCooldown: 1.6 }, color: '#b91c1c' 
  },
  // 28. 모크라 (R)
  { 
    id: 'mokra', name: '모크라', nameKey: 'heroes.mokra.name', grade: 'R', role: 'ranged_dps', raceName: '오크', elementName: '번개', starRating: 1, 
    lore: '대지의 정령과 소통하는 오크 주술사.', loreKey: 'heroes.mokra.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 40], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'mokra_elemental', name: '정기', nameKey: 'heroes.mokra.routes.elemental.name', color: '#facc15', 
        uniqueVariant: { 
          name: '정령의 분노', nameKey: 'heroes.mokra.routes.elemental.variantName',
          descriptionTemplate: '스킬 피해 {value}% 증가.', descriptionTemplateKey: 'heroes.mokra.routes.elemental.variantDesc'
        }, 
        skills: [
          { id: 'mokra_lightning_bolt', name: '번개 화살', nameKey: 'heroes.mokra.skills.lightning_bolt.name', description: '번개 피해', descriptionKey: 'heroes.mokra.skills.lightning_bolt.desc', color: '#fde047', isShared: false, cost: 150 }, 
          { ...SHARED.magic_amp }, 
          { id: 'mokra_chain_lightning', name: '연쇄 번개', nameKey: 'heroes.mokra.skills.chain_lightning.name', description: '3인 연쇄', descriptionKey: 'heroes.mokra.skills.chain_lightning.desc', color: '#eab308', isShared: false, cost: 400 }, 
          { id: 'mokra_thunder_shock', name: '천둥 충격', nameKey: 'heroes.mokra.skills.thunder_shock.name', description: '밀쳐내기+피해', descriptionKey: 'heroes.mokra.skills.thunder_shock.desc', color: '#ca8a04', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 350, atk: 108, def: 10, spd: 3, attackRange: 600, attackCooldown: 1.8 }, color: '#facc15' 
  },
  // 29. 두르가 (R)
  { 
    id: 'durga', name: '두르가', nameKey: 'heroes.durga.name', grade: 'R', role: 'ranged_dps', raceName: '오크', elementName: '자연', starRating: 1, 
    lore: '백발백중의 오크 사냥꾼.', loreKey: 'heroes.durga.lore',
    uniqueSkill: { baseValues: [50, 75, 100, 125, 150], unit: 'px' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'durga_marksmanship', name: '사격', nameKey: 'heroes.durga.routes.marksmanship.name', color: '#65a30d', 
        uniqueVariant: { 
          name: '매의 눈', nameKey: 'heroes.durga.routes.marksmanship.variantName',
          descriptionTemplate: '사거리 {value} 증가.', descriptionTemplateKey: 'heroes.durga.routes.marksmanship.variantDesc'
        }, 
        skills: [
          { id: 'durga_arcane_shot', name: '신비한 사격', nameKey: 'heroes.durga.skills.arcane_shot.name', description: '기본 사격', descriptionKey: 'heroes.durga.skills.arcane_shot.desc', color: '#84cc16', isShared: false, cost: 150 }, 
          { id: 'durga_concussive_shot', name: '충격포', nameKey: 'heroes.durga.skills.concussive_shot.name', description: '적에게 피해를 주고 이속 50% 감소', descriptionKey: 'heroes.durga.skills.concussive_shot.desc', color: '#4d7c0f', isShared: false, cost: 250 }, 
          { ...SHARED.multi_strike }, 
          { id: 'durga_aimed_shot', name: '조준 사격', nameKey: 'heroes.durga.skills.aimed_shot.name', description: '강력한 한방', descriptionKey: 'heroes.durga.skills.aimed_shot.desc', color: '#3f6212', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 380, atk: 114, def: 12, spd: 3, attackRange: 700, attackCooldown: 1.8 }, color: '#65a30d' 
  },
  // 30. 베네딕트 (R)
  { 
    id: 'benedict', name: '베네딕트', nameKey: 'heroes.benedict.name', grade: 'R', role: 'healer', raceName: '인간', elementName: '신성', starRating: 1, 
    lore: '신실한 믿음의 인간 사제.', loreKey: 'heroes.benedict.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'benedict_holy', name: '신성', nameKey: 'heroes.benedict.routes.holy.name', color: '#fde047', 
        uniqueVariant: { 
          name: '신성한 치유', nameKey: 'heroes.benedict.routes.holy.variantName',
          descriptionTemplate: '힐량 {value}% 증가.', descriptionTemplateKey: 'heroes.benedict.routes.holy.variantDesc'
        }, 
        skills: [
          { id: 'benedict_heal', name: '치유', nameKey: 'heroes.benedict.skills.heal.name', description: '단일 힐', descriptionKey: 'heroes.benedict.skills.heal.desc', color: '#fef08a', isShared: false, cost: 150 }, 
          { id: 'benedict_renew', name: '소생', nameKey: 'heroes.benedict.skills.renew.name', description: '단일 HoT', descriptionKey: 'heroes.benedict.skills.renew.desc', color: '#facc15', isShared: false, cost: 250 }, 
          { ...SHARED.purify }, 
          { id: 'benedict_holy_word_serenity', name: '빛의 평온', nameKey: 'heroes.benedict.skills.holy_word_serenity.name', description: '대량 힐', descriptionKey: 'heroes.benedict.skills.holy_word_serenity.desc', color: '#ca8a04', isShared: false, cost: 1200 }, 
          { id: 'benedict_guardian_spirit', name: '수호 정령', nameKey: 'heroes.benedict.skills.guardian_spirit.name', description: '아군 10초 HoT+힐증폭', descriptionKey: 'heroes.benedict.skills.guardian_spirit.desc', color: '#d97706', isShared: false, cost: 2000, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 360, atk: 30, def: 10, spd: 2.5, attackRange: 600 }, color: '#fde047' 
  },
  // 31. 제이나로 (R)
  { 
    id: 'jainaro', name: '제이나로', nameKey: 'heroes.jainaro.name', grade: 'R', role: 'ranged_dps', raceName: '인간', elementName: '냉기', starRating: 1, 
    lore: '달라란의 전투 마법사.', loreKey: 'heroes.jainaro.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'jainaro_arcane', name: '비전', nameKey: 'heroes.jainaro.routes.arcane.name', color: '#a855f7', role: 'cc', 
        uniqueVariant: { 
          name: '신비 집중', nameKey: 'heroes.jainaro.routes.arcane.variantName',
          descriptionTemplate: '쿨타임 {value}% 감소.', descriptionTemplateKey: 'heroes.jainaro.routes.arcane.variantDesc'
        }, 
        skills: [
          { id: 'jainaro_arcane_missiles', name: '신비한 화살', nameKey: 'heroes.jainaro.skills.arcane_missiles.name', description: '3연발', descriptionKey: 'heroes.jainaro.skills.arcane_missiles.desc', color: '#c026d3', isShared: false, cost: 150 }, 
          { ...SHARED.magic_amp }, 
          { id: 'jainaro_polymorph', name: '변이', nameKey: 'heroes.jainaro.skills.polymorph.name', description: '적 1명을 5초간 무력화', descriptionKey: 'heroes.jainaro.skills.polymorph.desc', color: '#9333ea', isShared: false, cost: 400 }, 
          { id: 'jainaro_arcane_power', name: '신비의 마법 강화', nameKey: 'heroes.jainaro.skills.arcane_power.name', description: '공격력 증가', descriptionKey: 'heroes.jainaro.skills.arcane_power.desc', color: '#7e22ce', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 340, atk: 95, def: 8, spd: 3, attackRange: 650 }, color: '#a855f7' 
  },
  // 32. 아서 (R)
  { 
    id: 'arthur', name: '아서', nameKey: 'heroes.arthur.name', grade: 'R', role: 'tank', raceName: '인간', elementName: '물', starRating: 1, 
    lore: '왕실 근위대 방패 전사.', loreKey: 'heroes.arthur.lore',
    uniqueSkill: { baseValues: [5, 10, 15, 20, 25], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'arthur_protection', name: '방어', nameKey: 'heroes.arthur.routes.protection.name', color: '#3b82f6', 
        uniqueVariant: { 
          name: '방패 막기', nameKey: 'heroes.arthur.routes.protection.variantName',
          descriptionTemplate: '받는 물리 피해 {value}% 감소.', descriptionTemplateKey: 'heroes.arthur.routes.protection.variantDesc'
        }, 
        skills: [
          { id: 'arthur_knights_oath', name: '기사의 맹세', nameKey: 'heroes.arthur.skills.knights_oath.name', description: '주변 아군 방어력 +15', descriptionKey: 'heroes.arthur.skills.knights_oath.desc', color: '#60a5fa', isShared: false, cost: 150 }, 
          { id: 'arthur_shield_slam', name: '방패 밀쳐내기', nameKey: 'heroes.arthur.skills.shield_slam.name', description: '방패 강타', descriptionKey: 'heroes.arthur.skills.shield_slam.desc', color: '#2563eb', isShared: false, cost: 200 }, 
          { ...SHARED.bastion }, 
          { id: 'arthur_last_stand', name: '최후의 저항', nameKey: 'heroes.arthur.skills.last_stand.name', description: '자신 대형 방어막+주변 아군 소형 방어막', descriptionKey: 'heroes.arthur.skills.last_stand.desc', color: '#1d4ed8', isShared: false, cost: 1200 }, 
          { id: 'arthur_shield_wall', name: '방어막 장벽', nameKey: 'heroes.arthur.skills.shield_wall.name', description: '전체 아군 방어막+자신 강화', descriptionKey: 'heroes.arthur.skills.shield_wall.desc', color: '#1e3a8a', isShared: false, cost: 2000, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 750, atk: 40, def: 55, spd: 2.5, attackRange: 40 }, color: '#3b82f6' 
  },
  // 33. 실바 (R)
  { 
    id: 'sylva', name: '실바', nameKey: 'heroes.sylva.name', grade: 'R', role: 'melee_dps', raceName: '언데드', elementName: '암흑', starRating: 1, 
    lore: '죽음에서 돌아온 어둠의 순찰자.', loreKey: 'heroes.sylva.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'sylva_survival', name: '생존', nameKey: 'heroes.sylva.routes.survival.name', color: '#713f12', 
        uniqueVariant: { 
          name: '어둠의 화살', nameKey: 'heroes.sylva.routes.survival.variantName',
          descriptionTemplate: '공격 시 {value}% 암흑 추뎀.', descriptionTemplateKey: 'heroes.sylva.routes.survival.variantDesc'
        }, 
        skills: [
          { id: 'sylva_raptor_strike', name: '랩터의 일격', nameKey: 'heroes.sylva.skills.raptor_strike.name', description: '근접 강타', descriptionKey: 'heroes.sylva.skills.raptor_strike.desc', color: '#854d0e', isShared: false, cost: 150 }, 
          { id: 'sylva_black_arrow', name: '검은 화살', nameKey: 'heroes.sylva.skills.black_arrow.name', description: '암흑 DoT', descriptionKey: 'heroes.sylva.skills.black_arrow.desc', color: '#a16207', isShared: false, cost: 300 }, 
          { ...SHARED.lifesteal }, 
          { id: 'sylva_explosive_shot', name: '폭발 사격', nameKey: 'heroes.sylva.skills.explosive_shot.name', description: '광역 폭발', descriptionKey: 'heroes.sylva.skills.explosive_shot.desc', color: '#ca8a04', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 480, atk: 80, def: 15, spd: 4, attackRange: 50 }, color: '#713f12' 
  },
  // 34. 켈투 (R)
  { 
    id: 'keltu', name: '켈투', nameKey: 'heroes.keltu.name', grade: 'R', role: 'ranged_dps', raceName: '언데드', elementName: '서리', starRating: 1, 
    lore: '스컬지의 강령술사.', loreKey: 'heroes.keltu.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'keltu_frost', name: '냉기', nameKey: 'heroes.keltu.routes.frost.name', color: '#0ea5e9', 
        uniqueVariant: { 
          name: '사자의 한기', nameKey: 'heroes.keltu.routes.frost.variantName',
          descriptionTemplate: '냉기 피해 {value}% 증가.', descriptionTemplateKey: 'heroes.keltu.routes.frost.variantDesc'
        }, 
        skills: [
          { id: 'keltu_frostbolt', name: '얼음 화살', nameKey: 'heroes.keltu.skills.frostbolt.name', description: '냉기 피해+슬로우', descriptionKey: 'heroes.keltu.skills.frostbolt.desc', color: '#38bdf8', isShared: false, cost: 150 }, 
          { ...SHARED.frost_nova }, 
          { ...SHARED.blizzard }, 
          { id: 'keltu_cone_of_cold', name: '냉기 돌풍', nameKey: 'heroes.keltu.skills.cone_of_cold.name', description: '부채꼴 얼음', descriptionKey: 'heroes.keltu.skills.cone_of_cold.desc', color: '#0284c7', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 320, atk: 100, def: 8, spd: 2.5, attackRange: 600 }, color: '#0ea5e9' 
  },
  // 35. 아눕 (R)
  { 
    id: 'anub', name: '아눕', nameKey: 'heroes.anub.name', grade: 'R', role: 'tank', raceName: '언데드', elementName: '독', starRating: 1, 
    lore: '지하 군주.', loreKey: 'heroes.anub.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'anub_protection', name: '방어', nameKey: 'heroes.anub.routes.protection.name', color: '#15803d', 
        uniqueVariant: { 
          name: '가시 껍질', nameKey: 'heroes.anub.routes.protection.variantName',
          descriptionTemplate: '피격 시 {value}% 반사.', descriptionTemplateKey: 'heroes.anub.routes.protection.variantDesc'
        }, 
        skills: [
          { id: 'anub_iron_carapace', name: '강철 껍질', nameKey: 'heroes.anub.skills.iron_carapace.name', description: '받는 피해 25% 감소', descriptionKey: 'heroes.anub.skills.iron_carapace.desc', color: '#166534', isShared: false, cost: 200 }, 
          { id: 'anub_impale', name: '꿰뚫기', nameKey: 'heroes.anub.skills.impale.name', description: '스턴', descriptionKey: 'heroes.anub.skills.impale.desc', color: '#16a34a', isShared: false, cost: 300 }, 
          { id: 'anub_carrion_beetles', name: '송장 벌레', nameKey: 'heroes.anub.skills.carrion_beetles.name', description: '벌레 소환+회복', descriptionKey: 'heroes.anub.skills.carrion_beetles.desc', color: '#15803d', isShared: false, cost: 450 }, 
          { id: 'anub_locust_swarm', name: '메뚜기 떼', nameKey: 'heroes.anub.skills.locust_swarm.name', description: '광역 흡혈', descriptionKey: 'heroes.anub.skills.locust_swarm.desc', color: '#14532d', isShared: false, cost: 1200 }, 
          { id: 'anub_underground_assault', name: '지하 강습', nameKey: 'heroes.anub.skills.underground_assault.name', description: '광역 ATK×5 피해+기절', descriptionKey: 'heroes.anub.skills.underground_assault.desc', color: '#052e16', isShared: false, cost: 2000, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 800, atk: 45, def: 50, spd: 3, attackRange: 45 }, color: '#15803d' 
  },
  // 36. 말퓨 (R)
  { 
    id: 'malfu', name: '말퓨', nameKey: 'heroes.malfu.name', grade: 'R', role: 'ranged_dps', raceName: '밤엘프', elementName: '자연', starRating: 1, 
    lore: '자연의 균형을 수호하는 드루이드.', loreKey: 'heroes.malfu.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'malfu_balance', name: '조화', nameKey: 'heroes.malfu.routes.balance.name', color: '#7c3aed', role: 'cc', 
        uniqueVariant: { 
          name: '월식', nameKey: 'heroes.malfu.routes.balance.variantName',
          descriptionTemplate: '비전 피해 {value}% 증가.', descriptionTemplateKey: 'heroes.malfu.routes.balance.variantDesc'
        }, 
        skills: [
          { id: 'malfu_wrath', name: '천벌', nameKey: 'heroes.malfu.skills.wrath.name', description: '자연 피해', descriptionKey: 'heroes.malfu.skills.wrath.desc', color: '#a855f7', isShared: false, cost: 150 }, 
          { id: 'malfu_moonfire', name: '달빛 섬광', nameKey: 'heroes.malfu.skills.moonfire.name', description: '비전 DoT', descriptionKey: 'heroes.malfu.skills.moonfire.desc', color: '#9333ea', isShared: false, cost: 250 }, 
          { id: 'malfu_entangling_roots', name: '휘감는 뿌리', nameKey: 'heroes.malfu.skills.entangling_roots.name', description: '속박', descriptionKey: 'heroes.malfu.skills.entangling_roots.desc', color: '#16a34a', isShared: false, cost: 400 }, 
          { id: 'malfu_starfall', name: '별똥별', nameKey: 'heroes.malfu.skills.starfall.name', description: '광역 폭격', descriptionKey: 'heroes.malfu.skills.starfall.desc', color: '#7e22ce', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 400, atk: 85, def: 15, spd: 3, attackRange: 700 }, color: '#7c3aed' 
  },
  // 37. 티란 (R)
  { 
    id: 'tyran', name: '티란', nameKey: 'heroes.tyran.name', grade: 'R', role: 'melee_dps', raceName: '밤엘프', elementName: '불꽃', starRating: 1, 
    lore: '지옥불을 다루는 악마사냥꾼.', loreKey: 'heroes.tyran.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'tyran_havoc', name: '황폐', nameKey: 'heroes.tyran.routes.havoc.name', color: '#a855f7', 
        uniqueVariant: { 
          name: '혼돈의 일격', nameKey: 'heroes.tyran.routes.havoc.variantName',
          descriptionTemplate: '치명타 피해 {value}% 증가.', descriptionTemplateKey: 'heroes.tyran.routes.havoc.variantDesc'
        }, 
        skills: [
          { id: 'tyran_chaos_strike', name: '혼돈의 일격', nameKey: 'heroes.tyran.skills.chaos_strike.name', description: '화염 타격', descriptionKey: 'heroes.tyran.skills.chaos_strike.desc', color: '#c026d3', isShared: false, cost: 150 }, 
          { id: 'tyran_immolation_aura', name: '지옥불 오라', nameKey: 'heroes.tyran.skills.immolation_aura.name', description: '주변 화염', descriptionKey: 'heroes.tyran.skills.immolation_aura.desc', color: '#9333ea', isShared: false, cost: 300 }, 
          { ...SHARED.lifesteal }, 
          { id: 'tyran_metamorphosis', name: '악마 변신', nameKey: 'heroes.tyran.skills.metamorphosis.name', description: '능력치 강화', descriptionKey: 'heroes.tyran.skills.metamorphosis.desc', color: '#7e22ce', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 450, atk: 90, def: 20, spd: 4.5, attackRange: 40 }, color: '#a855f7' 
  },
  // 38. 마이에브 (R)
  { 
    id: 'maiev', name: '마이에브', nameKey: 'heroes.maiev.name', grade: 'R', role: 'melee_dps', raceName: '밤엘프', elementName: '암흑', starRating: 1, 
    lore: '그림자 속 감시자.', loreKey: 'heroes.maiev.lore',
    uniqueSkill: { baseValues: [20, 25, 30, 35, 40], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'maiev_subtlety', name: '잠행', nameKey: 'heroes.maiev.routes.subtlety.name', color: '#581c87', 
        uniqueVariant: { 
          name: '그림자 일격', nameKey: 'heroes.maiev.routes.subtlety.variantName',
          descriptionTemplate: '은신 공격 {value}% 추뎀.', descriptionTemplateKey: 'heroes.maiev.routes.subtlety.variantDesc'
        }, 
        skills: [
          { id: 'maiev_backstab', name: '기습', nameKey: 'heroes.maiev.skills.backstab.name', description: '후방 공격', descriptionKey: 'heroes.maiev.skills.backstab.desc', color: '#7c3aed', isShared: false, cost: 150 }, 
          { id: 'maiev_shadowstep', name: '그림자 밟기', nameKey: 'heroes.maiev.skills.shadowstep.name', description: '순간이동', descriptionKey: 'heroes.maiev.skills.shadowstep.desc', color: '#6d28d9', isShared: false, cost: 250 }, 
          { ...SHARED.multi_strike }, 
          { id: 'maiev_shadow_dance', name: '어둠의 춤', nameKey: 'heroes.maiev.skills.shadow_dance.name', description: '은신 돌입', descriptionKey: 'heroes.maiev.skills.shadow_dance.desc', color: '#4c1d95', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 420, atk: 95, def: 15, spd: 5, attackRange: 40 }, color: '#581c87' 
  },
  // 39. 바인 (R)
  { 
    id: 'baine', name: '바인', nameKey: 'heroes.baine.name', grade: 'R', role: 'melee_dps', raceName: '타우렌', elementName: '자연', starRating: 1, 
    lore: '대지모신의 가호를 받는 전사.', loreKey: 'heroes.baine.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'baine_arms', name: '무기', nameKey: 'heroes.baine.routes.arms.name', color: '#166534', 
        uniqueVariant: { 
          name: '대지의 힘', nameKey: 'heroes.baine.routes.arms.variantName',
          descriptionTemplate: '공격력 {value}% 증가.', descriptionTemplateKey: 'heroes.baine.routes.arms.variantDesc'
        }, 
        skills: [
          { id: 'baine_slam', name: '격돌', nameKey: 'heroes.baine.skills.slam.name', description: '강력한 강타', descriptionKey: 'heroes.baine.skills.slam.desc', color: '#15803d', isShared: false, cost: 150 }, 
          { ...SHARED.bastion }, 
          { id: 'baine_war_stomp', name: '전투 발구르기', nameKey: 'heroes.baine.skills.war_stomp.name', description: '광역 기절', descriptionKey: 'heroes.baine.skills.war_stomp.desc', color: '#14532d', isShared: false, cost: 400 }, 
          { id: 'baine_avatar', name: '투신', nameKey: 'heroes.baine.skills.avatar.name', description: '거대화 버프', descriptionKey: 'heroes.baine.skills.avatar.desc', color: '#052e16', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 650, atk: 186, def: 40, spd: 2.5, attackRange: 50, attackCooldown: 2.0 }, color: '#166534' 
  },
  // 40. 하뮬 (R)
  { 
    id: 'hamul', name: '하뮬', nameKey: 'heroes.hamul.name', grade: 'R', role: 'healer', raceName: '타우렌', elementName: '자연', starRating: 1, 
    lore: '자연의 조화를 중시하는 드루이드.', loreKey: 'heroes.hamul.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'hamul_restoration', name: '회복', nameKey: 'heroes.hamul.routes.restoration.name', color: '#22c55e', 
        uniqueVariant: { 
          name: '생명의 나무', nameKey: 'heroes.hamul.routes.restoration.variantName',
          descriptionTemplate: 'HoT 효과 {value}% 증가.', descriptionTemplateKey: 'heroes.hamul.routes.restoration.variantDesc'
        }, 
        skills: [
          { id: 'hamul_regrowth', name: '재생', nameKey: 'heroes.hamul.skills.regrowth.name', description: '즉발+HoT', descriptionKey: 'heroes.hamul.skills.regrowth.desc', color: '#4ade80', isShared: false, cost: 150 }, 
          { ...SHARED.purify }, 
          { id: 'hamul_tranquility', name: '평온', nameKey: 'heroes.hamul.skills.tranquility.name', description: '광역 지속 힐', descriptionKey: 'heroes.hamul.skills.tranquility.desc', color: '#16a34a', isShared: false, cost: 500 }, 
          { id: 'hamul_incarnation', name: '화신: 생명의 나무', nameKey: 'heroes.hamul.skills.incarnation.name', description: '치유 강화 변신', descriptionKey: 'heroes.hamul.skills.incarnation.desc', color: '#15803d', isShared: false, cost: 1200 }, 
          { id: 'hamul_wild_growth', name: '야생 성장', nameKey: 'heroes.hamul.skills.wild_growth.name', description: '전체 아군 HoT', descriptionKey: 'heroes.hamul.skills.wild_growth.desc', color: '#16a34a', isShared: false, cost: 2000, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 550, atk: 35, def: 20, spd: 2.5, attackRange: 600, attackCooldown: 2.5 }, color: '#22c55e' 
  },
  // 41. 마가타 (R)
  { 
    id: 'magatha', name: '마가타', nameKey: 'heroes.magatha.name', grade: 'R', role: 'ranged_dps', raceName: '타우렌', elementName: '화염', starRating: 1, 
    lore: '불의 정령을 부리는 주술사.', loreKey: 'heroes.magatha.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'magatha_elemental', name: '정기', nameKey: 'heroes.magatha.routes.elemental.name', color: '#ef4444', 
        uniqueVariant: { 
          name: '용암 격류', nameKey: 'heroes.magatha.routes.elemental.variantName',
          descriptionTemplate: '화염 피해 {value}% 증가.', descriptionTemplateKey: 'heroes.magatha.routes.elemental.variantDesc'
        }, 
        skills: [
          { id: 'magatha_lava_burst', name: '용암 폭발', nameKey: 'heroes.magatha.skills.lava_burst.name', description: '확정 치명타', descriptionKey: 'heroes.magatha.skills.lava_burst.desc', color: '#f87171', isShared: false, cost: 200 }, 
          { id: 'magatha_flame_shock', name: '화염 충격', nameKey: 'heroes.magatha.skills.flame_shock.name', description: '화염 DoT', descriptionKey: 'heroes.magatha.skills.flame_shock.desc', color: '#dc2626', isShared: false, cost: 300 }, 
          { ...SHARED.magic_amp }, 
          { id: 'magatha_ascendance', name: '승천', nameKey: 'heroes.magatha.skills.ascendance.name', description: '불의 승천자 변신', descriptionKey: 'heroes.magatha.skills.ascendance.desc', color: '#991b1b', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 400, atk: 120, def: 15, spd: 2.5, attackRange: 650, attackCooldown: 2.0 }, color: '#ef4444' 
  },
  // 42. 볼진 (R)
  { 
    id: 'voljin', name: '볼진', nameKey: 'heroes.voljin.name', grade: 'R', role: 'melee_dps', raceName: '트롤', elementName: '암흑', starRating: 1, 
    lore: '어둠사냥꾼.', loreKey: 'heroes.voljin.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'voljin_enhancement', name: '고양', nameKey: 'heroes.voljin.routes.enhancement.name', color: '#5b21b6', 
        uniqueVariant: { 
          name: '그림자 사냥꾼', nameKey: 'heroes.voljin.routes.enhancement.variantName',
          descriptionTemplate: '공속 {value}% 증가.', descriptionTemplateKey: 'heroes.voljin.routes.enhancement.variantDesc'
        }, 
        skills: [
          { id: 'voljin_shadow_strike', name: '그림자 일격', nameKey: 'heroes.voljin.skills.shadow_strike.name', description: '암흑 무기 공격', descriptionKey: 'heroes.voljin.skills.shadow_strike.desc', color: '#7c3aed', isShared: false, cost: 150 }, 
          { id: 'voljin_hex', name: '주술', nameKey: 'heroes.voljin.skills.hex.name', description: '변이', descriptionKey: 'heroes.voljin.skills.hex.desc', color: '#6d28d9', isShared: false, cost: 350 }, 
          { ...SHARED.curse }, 
          { id: 'voljin_big_bad_voodoo', name: '대규모 부두', nameKey: 'heroes.voljin.skills.big_bad_voodoo.name', description: '광역 무적', descriptionKey: 'heroes.voljin.skills.big_bad_voodoo.desc', color: '#4c1d95', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 480, atk: 55, def: 20, spd: 4, attackRange: 45, attackCooldown: 0.45 }, color: '#5b21b6' 
  },
  // 43. 라칸 (R)
  { 
    id: 'rakan', name: '라칸', nameKey: 'heroes.rakan.name', grade: 'R', role: 'ranged_dps', raceName: '트롤', elementName: '독', starRating: 1, 
    lore: '저주와 독의 부두술사.', loreKey: 'heroes.rakan.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'rakan_shadow', name: '암흑', nameKey: 'heroes.rakan.routes.shadow.name', color: '#166534', 
        uniqueVariant: { 
          name: '부두 인형', nameKey: 'heroes.rakan.routes.shadow.variantName',
          descriptionTemplate: '받는 피해 {value}% 반사.', descriptionTemplateKey: 'heroes.rakan.routes.shadow.variantDesc'
        }, 
        skills: [
          { id: 'rakan_shadow_word_pain', name: '고통', nameKey: 'heroes.rakan.skills.shadow_word_pain.name', description: '지속 암흑 피해', descriptionKey: 'heroes.rakan.skills.shadow_word_pain.desc', color: '#15803d', isShared: false, cost: 150 }, 
          { id: 'rakan_vampiric_touch', name: '흡혈의 손길', nameKey: 'heroes.rakan.skills.vampiric_touch.name', description: '피해+회복', descriptionKey: 'heroes.rakan.skills.vampiric_touch.desc', color: '#16a34a', isShared: false, cost: 300 }, 
          { ...SHARED.curse }, 
          { id: 'rakan_void_eruption', name: '공허의 형상', nameKey: 'heroes.rakan.skills.void_eruption.name', description: '공허 개방', descriptionKey: 'heroes.rakan.skills.void_eruption.desc', color: '#14532d', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 360, atk: 27, def: 10, spd: 3, attackRange: 600, attackCooldown: 0.5 }, color: '#166534' 
  },
  // 44. 줄진 (R)
  { 
    id: 'zuljin', name: '줄진', nameKey: 'heroes.zuljin.name', grade: 'R', role: 'ranged_dps', raceName: '트롤', elementName: '바람', starRating: 1, 
    lore: '전설적인 도끼 투척병.', loreKey: 'heroes.zuljin.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'zuljin_combat', name: '전투', nameKey: 'heroes.zuljin.routes.combat.name', color: '#f97316', 
        uniqueVariant: { 
          name: '광전사', nameKey: 'heroes.zuljin.routes.combat.variantName',
          descriptionTemplate: '저체력 시 공속 {value}% 증가.', descriptionTemplateKey: 'heroes.zuljin.routes.combat.variantDesc'
        }, 
        skills: [
          { id: 'zuljin_throw_axe', name: '도끼 투척', nameKey: 'heroes.zuljin.skills.throw_axe.name', description: '원거리 물리 피해', descriptionKey: 'heroes.zuljin.skills.throw_axe.desc', color: '#fdba74', isShared: false, cost: 150 }, 
          { id: 'zuljin_twin_cleave', name: '쌍도끼 베기', nameKey: 'heroes.zuljin.skills.twin_cleave.name', description: '전방 범위 피해', descriptionKey: 'heroes.zuljin.skills.twin_cleave.desc', color: '#fb923c', isShared: false, cost: 300 }, 
          { ...SHARED.berserk }, 
          { id: 'zuljin_guillotine', name: '길로틴', nameKey: 'heroes.zuljin.skills.guillotine.name', description: '거대 도끼 낙하', descriptionKey: 'heroes.zuljin.skills.guillotine.desc', color: '#ea580c', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 450, atk: 32, def: 15, spd: 4, attackRange: 400, attackCooldown: 0.5 }, color: '#f97316' 
  },
  // 45. 가즈로 (R)
  { 
    id: 'gazro', name: '가즈로', nameKey: 'heroes.gazro.name', grade: 'R', role: 'ranged_dps', raceName: '고블린', elementName: '화염', starRating: 1, 
    lore: '고블린 공학자. 그의 기계는 성급이 오를수록 쉴 새 없이 발사된다.', loreKey: 'heroes.gazro.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], starAtkSpeedBonus: 0.15, 
    classRoutes: [
      { 
        id: 'gazro_marksmanship', name: '사격', nameKey: 'heroes.gazro.routes.marksmanship.name', color: '#ef4444', 
        uniqueVariant: { 
          name: '고블린 공학', nameKey: 'heroes.gazro.routes.marksmanship.variantName',
          descriptionTemplate: '쿨타임 {value}% 감소.', descriptionTemplateKey: 'heroes.gazro.routes.marksmanship.variantDesc'
        }, 
        skills: [
          { id: 'gazro_rock_it_turret', name: '잘나가 포탑', nameKey: 'heroes.gazro.skills.rock_it_turret.name', description: '포탑 설치', descriptionKey: 'heroes.gazro.skills.rock_it_turret.desc', color: '#fca5a5', isShared: false, cost: 200, summonStats: { displayName: '잘나가 포탑', displayNameKey: 'heroes.gazro.summons.turret.name', hp: 300, atk: 40, def: 10, spd: 0, role: 'ranged_dps', attackRange: 400, duration: 15 } }, 
          { id: 'gazro_deth_lazor', name: '죽음의 광선', nameKey: 'heroes.gazro.skills.deth_lazor.name', description: '충전 레이저', descriptionKey: 'heroes.gazro.skills.deth_lazor.desc', color: '#f87171', isShared: false, cost: 350 }, 
          { id: 'gazro_xplodium_charge', name: '폭탄 투하', nameKey: 'heroes.gazro.skills.xplodium_charge.name', description: '스턴 폭탄', descriptionKey: 'heroes.gazro.skills.xplodium_charge.desc', color: '#ef4444', isShared: false, cost: 500 }, 
          { id: 'gazro_grav_o_bomb_3000', name: '중력 폭탄', nameKey: 'heroes.gazro.skills.grav_o_bomb.name', description: '블랙홀 폭탄', descriptionKey: 'heroes.gazro.skills.grav_o_bomb.desc', color: '#b91c1c', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 400, atk: 18, def: 20, spd: 3, attackRange: 500, attackCooldown: 0.4 }, color: '#ef4444' 
  },
  // 46. 노즈 (R)
  { 
    id: 'nog', name: '노즈', nameKey: 'heroes.nog.name', grade: 'R', role: 'melee_dps', raceName: '고블린', elementName: '독', starRating: 1, 
    lore: '치명적인 독 암살자.', loreKey: 'heroes.nog.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'nog_assassination', name: '암살', nameKey: 'heroes.nog.routes.assassination.name', color: '#84cc16', 
        uniqueVariant: { 
          name: '연금술', nameKey: 'heroes.nog.routes.assassination.variantName',
          descriptionTemplate: '독 지속시간 {value}% 증가.', descriptionTemplateKey: 'heroes.nog.routes.assassination.variantDesc'
        }, 
        skills: [
          { id: 'nog_poison_knife', name: '독칼', nameKey: 'heroes.nog.skills.poison_knife.name', description: '독 찌르기', descriptionKey: 'heroes.nog.skills.poison_knife.desc', color: '#bef264', isShared: false, cost: 150 }, 
          { id: 'nog_mutilate', name: '절단', nameKey: 'heroes.nog.skills.mutilate.name', description: '쌍수 공격', descriptionKey: 'heroes.nog.skills.mutilate.desc', color: '#a3e635', isShared: false, cost: 300 }, 
          { id: 'nog_vendetta', name: '원한', nameKey: 'heroes.nog.skills.vendetta.name', description: '피해 증폭', descriptionKey: 'heroes.nog.skills.vendetta.desc', color: '#65a30d', isShared: false, cost: 450 }, 
          { id: 'nog_poison_bomb', name: '독 폭탄', nameKey: 'heroes.nog.skills.poison_bomb.name', description: '독 구름 생성', descriptionKey: 'heroes.nog.skills.poison_bomb.desc', color: '#3f6212', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 380, atk: 47, def: 10, spd: 5, attackRange: 40, attackCooldown: 0.35 }, color: '#84cc16' 
  },
  // 47. 릭스 (R)
  { 
    id: 'rix', name: '릭스', nameKey: 'heroes.rix.name', grade: 'R', role: 'ranged_dps', raceName: '고블린', elementName: '화염', starRating: 1, 
    lore: '불장난을 좋아하는 마법사.', loreKey: 'heroes.rix.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'rix_fire', name: '화염', nameKey: 'heroes.rix.routes.fire.name', color: '#f97316', 
        uniqueVariant: { 
          name: '발화', nameKey: 'heroes.rix.routes.fire.variantName',
          descriptionTemplate: '화염 DoT {value}% 증가.', descriptionTemplateKey: 'heroes.rix.routes.fire.variantDesc'
        }, 
        skills: [
          { id: 'rix_fireball', name: '화염구', nameKey: 'heroes.rix.skills.fireball.name', description: '화염 피해', descriptionKey: 'heroes.rix.skills.fireball.desc', color: '#fdba74', isShared: false, cost: 150 }, 
          { id: 'rix_fire_blast', name: '화염 작렬', nameKey: 'heroes.rix.skills.fire_blast.name', description: '즉시 시전', descriptionKey: 'heroes.rix.skills.fire_blast.desc', color: '#fb923c', isShared: false, cost: 300 }, 
          { ...SHARED.magic_amp }, 
          { id: 'rix_pyroblast', name: '불덩이 작렬', nameKey: 'heroes.rix.skills.pyroblast.name', description: '거대 화염구', descriptionKey: 'heroes.rix.skills.pyroblast.desc', color: '#ea580c', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 340, atk: 27, def: 8, spd: 3, attackRange: 600, attackCooldown: 0.4 }, color: '#f97316' 
  },
  // 48. 마라드 (R)
  { 
    id: 'maraad', name: '마라드', nameKey: 'heroes.maraad.name', grade: 'R', role: 'melee_dps', raceName: '드레나이', elementName: '신성', starRating: 1, 
    lore: '복수의 성기사.', loreKey: 'heroes.maraad.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'maraad_retribution', name: '징벌', nameKey: 'heroes.maraad.routes.retribution.name', color: '#fbbf24', 
        uniqueVariant: { 
          name: '정의의 문장', nameKey: 'heroes.maraad.routes.retribution.variantName',
          descriptionTemplate: '공격 시 {value}% 신성 추뎀.', descriptionTemplateKey: 'heroes.maraad.routes.retribution.variantDesc'
        }, 
        skills: [
          { id: 'maraad_crusader_strike', name: '성전사의 일격', nameKey: 'heroes.maraad.skills.crusader_strike.name', description: '신성 타격', descriptionKey: 'heroes.maraad.skills.crusader_strike.desc', color: '#fcd34d', isShared: false, cost: 150 }, 
          { id: 'maraad_blade_of_justice', name: '심판의 칼날', nameKey: 'heroes.maraad.skills.blade_of_justice.name', description: '신성 칼날', descriptionKey: 'heroes.maraad.skills.blade_of_justice.desc', color: '#f59e0b', isShared: false, cost: 300 }, 
          { ...SHARED.multi_strike }, 
          { id: 'maraad_avenging_wrath', name: '응징의 격노', nameKey: 'heroes.maraad.skills.avenging_wrath.name', description: '날개 변신', descriptionKey: 'heroes.maraad.skills.avenging_wrath.desc', color: '#d97706', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 550, atk: 75, def: 30, spd: 3, attackRange: 45 }, color: '#fbbf24' 
  },
  // 49. 이렐 (R)
  { 
    id: 'yrel', name: '이렐', nameKey: 'heroes.yrel.name', grade: 'R', role: 'tank', raceName: '드레나이', elementName: '신성', starRating: 1, 
    lore: '빛의 용사.', loreKey: 'heroes.yrel.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'yrel_protection', name: '보호', nameKey: 'heroes.yrel.routes.protection.name', color: '#f59e0b', 
        uniqueVariant: { 
          name: '헌신적인 수호자', nameKey: 'heroes.yrel.routes.protection.variantName',
          descriptionTemplate: '피해 {value}% 감소.', descriptionTemplateKey: 'heroes.yrel.routes.protection.variantDesc'
        }, 
        skills: [
          { id: 'yrel_light_protection', name: '빛의 가호', nameKey: 'heroes.yrel.skills.light_protection.name', description: '가장 낮은 HP 아군에게 5초간 보호막(HP 15%)', descriptionKey: 'heroes.yrel.skills.light_protection.desc', color: '#fde68a', isShared: false, cost: 200 }, 
          { id: 'yrel_hammer_of_righteous', name: '정의의 망치', nameKey: 'heroes.yrel.skills.hammer_of_righteous.name', description: '광역 신성', descriptionKey: 'heroes.yrel.skills.hammer_of_righteous.desc', color: '#fbbf24', isShared: false, cost: 200 }, 
          { ...SHARED.bastion }, 
          { id: 'yrel_guardian_of_kings', name: '고대 왕의 수호자', nameKey: 'heroes.yrel.skills.guardian_of_kings.name', description: '전체 아군 10초 피감 15%', descriptionKey: 'heroes.yrel.skills.guardian_of_kings.desc', color: '#b45309', isShared: false, cost: 1200 }, 
          { id: 'yrel_divine_storm', name: '신성한 폭풍', nameKey: 'heroes.yrel.skills.divine_storm.name', description: '광역 ATK×5 신성+자힐', descriptionKey: 'heroes.yrel.skills.divine_storm.desc', color: '#78350f', isShared: false, cost: 2000, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 700, atk: 45, def: 55, spd: 2.5, attackRange: 45 }, color: '#f59e0b' 
  },
  // 50. 벨렌 (R)
  { 
    id: 'velen', name: '벨렌', nameKey: 'heroes.velen.name', grade: 'R', role: 'healer', raceName: '드레나이', elementName: '신성', starRating: 1, 
    lore: '드레나이 예언자.', loreKey: 'heroes.velen.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'velen_holy', name: '신성', nameKey: 'heroes.velen.routes.holy.name', color: '#fde047', 
        uniqueVariant: { 
          name: '구원의 빛', nameKey: 'heroes.velen.routes.holy.variantName',
          descriptionTemplate: '힐 시 {value}% 쿨타임 단축.', descriptionTemplateKey: 'heroes.velen.routes.holy.variantDesc'
        }, 
        skills: [
          { id: 'velen_flash_heal', name: '순간 치유', nameKey: 'heroes.velen.skills.flash_heal.name', description: '빠른 힐', descriptionKey: 'heroes.velen.skills.flash_heal.desc', color: '#fef9c3', isShared: false, cost: 150 }, 
          { id: 'velen_circle_of_healing', name: '치유의 마법진', nameKey: 'heroes.velen.skills.circle_of_healing.name', description: '광역 힐', descriptionKey: 'heroes.velen.skills.circle_of_healing.desc', color: '#facc15', isShared: false, cost: 350 }, 
          { ...SHARED.purify }, 
          { id: 'velen_holy_word_salvation', name: '빛의 권능: 구원', nameKey: 'heroes.velen.skills.holy_word_salvation.name', description: '전체 대량 힐', descriptionKey: 'heroes.velen.skills.holy_word_salvation.desc', color: '#ca8a04', isShared: false, cost: 1200 }, 
          { id: 'velen_divine_hymn', name: '신성한 찬송', nameKey: 'heroes.velen.skills.divine_hymn.name', description: '전체 아군 반복 힐(4초)', descriptionKey: 'heroes.velen.skills.divine_hymn.desc', color: '#b45309', isShared: false, cost: 2000, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 400, atk: 35, def: 12, spd: 2.5, attackRange: 600 }, color: '#fde047' 
  },
  // 51. 첸 (R)
  { 
    id: 'chen', name: '첸', nameKey: 'heroes.chen.name', grade: 'R', role: 'tank', raceName: '판다렌', elementName: '물', starRating: 1, 
    lore: '전설적인 양조사.', loreKey: 'heroes.chen.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'chen_brewmaster', name: '양조', nameKey: 'heroes.chen.routes.brewmaster.name', color: '#3b82f6', 
        uniqueVariant: { 
          name: '교묘한 투사', nameKey: 'heroes.chen.routes.brewmaster.variantName',
          descriptionTemplate: '회피율 {value}% 증가.', descriptionTemplateKey: 'heroes.chen.routes.brewmaster.variantDesc'
        }, 
        skills: [
          { id: 'chen_beer_waterfall', name: '맥주 폭포', nameKey: 'heroes.chen.skills.beer_waterfall.name', description: '주변 적 이동속도 40% 감소', descriptionKey: 'heroes.chen.skills.beer_waterfall.desc', color: '#60a5fa', isShared: false, cost: 200 }, 
          { id: 'chen_breath_of_fire', name: '불의 숨결', nameKey: 'heroes.chen.skills.breath_of_fire.name', description: '화염 피해', descriptionKey: 'heroes.chen.skills.breath_of_fire.desc', color: '#60a5fa', isShared: false, cost: 250 }, 
          { id: 'chen_stagger', name: '시간차', nameKey: 'heroes.chen.skills.stagger.name', description: '받는 피해의 50%를 10초에 걸쳐 나눔', descriptionKey: 'heroes.chen.skills.stagger.desc', color: '#2563eb', isShared: false, cost: 450 }, 
          { id: 'chen_storm_earth_fire', name: '폭풍, 대지, 불', nameKey: 'heroes.chen.skills.storm_earth_fire.name', description: '3방향 동시 폭발 ATK×4', descriptionKey: 'heroes.chen.skills.storm_earth_fire.desc', color: '#1d4ed8', isShared: false, cost: 1200 }, 
          { id: 'chen_invoke_niuzao', name: '우요 소환', nameKey: 'heroes.chen.skills.invoke_niuzao.name', description: '전체 아군 방어막+자신 피감', descriptionKey: 'heroes.chen.skills.invoke_niuzao.desc', color: '#1e3a5f', isShared: false, cost: 2000, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 750, atk: 50, def: 45, spd: 3, attackRange: 45 }, color: '#3b82f6' 
  },
  // 52. 리리 (R)
  { 
    id: 'lili', name: '리리', nameKey: 'heroes.lili.name', grade: 'R', role: 'healer', raceName: '판다렌', elementName: '바람', starRating: 1, 
    lore: '모험을 좋아하는 수도사.', loreKey: 'heroes.lili.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'lili_mistweaver', name: '운무', nameKey: 'heroes.lili.routes.mistweaver.name', color: '#22c55e', 
        uniqueVariant: { 
          name: '안개 돌풍', nameKey: 'heroes.lili.routes.mistweaver.variantName',
          descriptionTemplate: '힐 시 {value}% 추가 힐.', descriptionTemplateKey: 'heroes.lili.routes.mistweaver.variantDesc'
        }, 
        skills: [
          { id: 'lili_effuse', name: '발산', nameKey: 'heroes.lili.skills.effuse.name', description: '빠른 힐', descriptionKey: 'heroes.lili.skills.effuse.desc', color: '#4ade80', isShared: false, cost: 150 }, 
          { id: 'lili_renewing_mist', name: '소생의 안개', nameKey: 'heroes.lili.skills.renewing_mist.name', description: '전이 HoT', descriptionKey: 'heroes.lili.skills.renewing_mist.desc', color: '#16a34a', isShared: false, cost: 300 }, 
          { ...SHARED.purify }, 
          { id: 'lili_life_cocoon', name: '기의 고치', nameKey: 'heroes.lili.skills.life_cocoon.name', description: '보호막', descriptionKey: 'heroes.lili.skills.life_cocoon.desc', color: '#15803d', isShared: false, cost: 1200 }, 
          { id: 'lili_chi_burst', name: '기 폭발', nameKey: 'heroes.lili.skills.chi_burst.name', description: '전방 직선 피해+힐', descriptionKey: 'heroes.lili.skills.chi_burst.desc', color: '#22c55e', isShared: false, cost: 2000, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 400, atk: 30, def: 15, spd: 3.5, attackRange: 550 }, color: '#22c55e' 
  },
  // 53. 타란 (R)
  { 
    id: 'taran', name: '타란', nameKey: 'heroes.taran.name', grade: 'R', role: 'melee_dps', raceName: '판다렌', elementName: '암흑', starRating: 1, 
    lore: '음영파의 수장.', loreKey: 'heroes.taran.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'tutan_subtlety', name: '잠행', nameKey: 'heroes.taran.routes.subtlety.name', color: '#581c87', 
        uniqueVariant: { 
          name: '약점 포착', nameKey: 'heroes.taran.routes.subtlety.variantName',
          descriptionTemplate: '방어 관통 {value}%.', descriptionTemplateKey: 'heroes.taran.routes.subtlety.variantDesc'
        }, 
        skills: [
          { id: 'taran_shadowstrike', name: '그림자 일격', nameKey: 'heroes.taran.skills.shadowstrike.name', description: '은신 공격', descriptionKey: 'heroes.taran.skills.shadowstrike.desc', color: '#7c3aed', isShared: false, cost: 150 }, 
          { id: 'taran_eviscerate', name: '절개', nameKey: 'heroes.taran.skills.eviscerate.name', description: '마무리 일격', descriptionKey: 'heroes.taran.skills.eviscerate.desc', color: '#6d28d9', isShared: false, cost: 300 }, 
          { ...SHARED.multi_strike }, 
          { id: 'taran_secret_technique', name: '비기', nameKey: 'heroes.taran.skills.secret_technique.name', description: '분신 공격', descriptionKey: 'heroes.taran.skills.secret_technique.desc', color: '#4c1d95', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 450, atk: 90, def: 20, spd: 4, attackRange: 40 }, color: '#581c87' 
  },
  // 54. 그레이 (R)
  { 
    id: 'gray', name: '그레이', nameKey: 'heroes.gray.name', grade: 'R', role: 'melee_dps', raceName: '야수족', elementName: '바람', starRating: 1, 
    lore: '길니াসের 늑대인간 전사.', loreKey: 'heroes.gray.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'gray_fury', name: '분노', nameKey: 'heroes.gray.routes.fury.name', color: '#ef4444', 
        uniqueVariant: { 
          name: '피의 갈증', nameKey: 'heroes.gray.routes.fury.variantName',
          descriptionTemplate: '공격 시 {value}% 회복.', descriptionTemplateKey: 'heroes.gray.routes.fury.variantDesc'
        }, 
        skills: [
          { id: 'gray_bloodthirst', name: '피의 갈증', nameKey: 'heroes.gray.skills.bloodthirst.name', description: '피해+회복', descriptionKey: 'heroes.gray.skills.bloodthirst.desc', color: '#f87171', isShared: false, cost: 150 }, 
          { id: 'gray_rampage', name: '광란', nameKey: 'heroes.gray.skills.rampage.name', description: '4연타', descriptionKey: 'heroes.gray.skills.rampage.desc', color: '#ef4444', isShared: false, cost: 350 }, 
          { ...SHARED.berserk }, 
          { id: 'gray_recklessness', name: '무모한 희생', nameKey: 'heroes.gray.skills.recklessness.name', description: '치명타 100%', descriptionKey: 'heroes.gray.skills.recklessness.desc', color: '#b91c1c', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 550, atk: 80, def: 20, spd: 4, attackRange: 40 }, color: '#ef4444' 
  },
  // 55. 크로우 (R)
  { 
    id: 'crow', name: '크로우', nameKey: 'heroes.crow.name', grade: 'R', role: 'melee_dps', raceName: '야수족', elementName: '암흑', starRating: 1, 
    lore: '그림자 속의 늑대 암살자.', loreKey: 'heroes.crow.lore',
    uniqueSkill: { baseValues: [15, 20, 25, 30, 35], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'crow_combat', name: '전투', nameKey: 'heroes.crow.routes.combat.name', color: '#713f12', 
        uniqueVariant: { 
          name: '아드레날린', nameKey: 'heroes.crow.routes.combat.variantName',
          descriptionTemplate: '기력 회복 {value}% 증가.', descriptionTemplateKey: 'heroes.crow.routes.combat.variantDesc'
        }, 
        skills: [
          { id: 'crow_sinister_strike', name: '사악한 일격', nameKey: 'heroes.crow.skills.sinister_strike.name', description: '연계 점수', descriptionKey: 'heroes.crow.skills.sinister_strike.desc', color: '#a16207', isShared: false, cost: 150 }, 
          { id: 'crow_eviscerate', name: '절개', nameKey: 'heroes.crow.skills.eviscerate.name', description: '마무리', descriptionKey: 'heroes.crow.skills.eviscerate.desc', color: '#854d0e', isShared: false, cost: 300 }, 
          { ...SHARED.multi_strike }, 
          { id: 'crow_killing_spree', name: '살육의 희열', nameKey: 'heroes.crow.skills.killing_spree.name', description: '연속 공격', descriptionKey: 'heroes.crow.skills.killing_spree.desc', color: '#422006', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 420, atk: 85, def: 15, spd: 5, attackRange: 40 }, color: '#713f12' 
  },
  // 56. 하울 (R)
  { 
    id: 'howl', name: '하울', nameKey: 'heroes.howl.name', grade: 'R', role: 'melee_dps', raceName: '야수족', elementName: '자연', starRating: 1, 
    lore: '야수의 본성을 받아들인 드루이드.', loreKey: 'heroes.howl.lore',
    uniqueSkill: { baseValues: [10, 15, 20, 25, 30], unit: '%' }, starUpgradeCosts: [200, 500, 1000, 3000], 
    classRoutes: [
      { 
        id: 'howl_feral', name: '야성', nameKey: 'heroes.howl.routes.feral.name', color: '#16a34a', 
        uniqueVariant: { 
          name: '청명의 전조', nameKey: 'heroes.howl.routes.feral.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 쿨타임 즉시 초기화.', descriptionTemplateKey: 'heroes.howl.routes.feral.variantDesc'
        }, 
        skills: [
          { id: 'howl_shred', name: '칼날 발톱', nameKey: 'heroes.howl.skills.shred.name', description: '연계 점수', descriptionKey: 'heroes.howl.skills.shred.desc', color: '#22c55e', isShared: false, cost: 150 }, 
          { id: 'howl_rip', name: '도려내기', nameKey: 'heroes.howl.skills.rip.name', description: '출혈 DoT', descriptionKey: 'heroes.howl.skills.rip.desc', color: '#15803d', isShared: false, cost: 300 }, 
          { ...SHARED.lifesteal }, 
          { id: 'howl_berserk', name: '광폭화', nameKey: 'heroes.howl.skills.berserk.name', description: '쿨타임 단축 + 공격속도 증가', descriptionKey: 'heroes.howl.skills.berserk.desc', color: '#14532d', isShared: false, cost: 1200, isFinal: true }
        ] 
      }
    ], 
    baseStats: { hp: 480, atk: 80, def: 20, spd: 4.5, attackRange: 45 }, color: '#16a34a' 
  },

  {
    id: 'ar_lian', name: '리안', nameKey: 'heroes.ar_lian.name', grade: 'AR', role: 'tank', raceName: '블러드엘프', elementName: '빛', starRating: 1,
    lore: '태양샘의 힘을 혈기로 전환한 최초의 혈기사. 아군을 위해 자신의 피를 불태우며 전선을 사수한다.', loreKey: 'heroes.ar_lian.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'ar_lian_blood', name: '혈기', nameKey: 'heroes.ar_lian.routes.blood.name', color: '#991b1b', role: 'tank',
        uniqueVariant: { 
          name: '붉은 갈증', nameKey: 'heroes.ar_lian.routes.blood.variantName',
          descriptionTemplate: '피격 시 {value}% 확률로 잃은 체력의 10%를 즉시 회복합니다.', descriptionTemplateKey: 'heroes.ar_lian.routes.blood.variantDesc'
        },
        skills: [
          { id: 'ar_lian_blood_strike', name: '피의 일격', nameKey: 'heroes.ar_lian.skills.blood_strike.name', description: '단일 ATK×5 피해 및 20% 흡혈', descriptionKey: 'heroes.ar_lian.skills.blood_strike.desc', color: '#b91c1c', isShared: false, cost: 300 },
          { id: 'ar_lian_blood_boil', name: '피의 소용돌이', nameKey: 'heroes.ar_lian.skills.blood_boil.name', description: '주변 모든 적 ATK×4 피해 및 5초간 출혈', descriptionKey: 'heroes.ar_lian.skills.blood_boil.desc', color: '#991b1b', isShared: false, cost: 400 },
          { id: 'ar_lian_death_bond', name: '죽음의 결속', nameKey: 'heroes.ar_lian.skills.death_bond.name', description: '아군 1명과 결속하여 피해를 50% 나누어 받음', descriptionKey: 'heroes.ar_lian.skills.death_bond.desc', color: '#7f1d1d', isShared: false, cost: 600 },
          { id: 'ar_lian_rune_tap', name: '룬 전환', nameKey: 'heroes.ar_lian.skills.rune_tap.name', description: '최대 HP 20% 보호막 생성 및 DEF +40', descriptionKey: 'heroes.ar_lian.skills.rune_tap.desc', color: '#450a0a', isShared: false, cost: 800 },
          { id: 'ar_lian_dancing_weapon', name: '춤추는 룬 무기', nameKey: 'heroes.ar_lian.skills.dancing_weapon.name', description: '룬 무기 소환: 아군 전체 방어력 50% 증가 및 무적 5초', descriptionKey: 'heroes.ar_lian.skills.dancing_weapon.desc', color: '#000000', isShared: false, cost: 2000, isFinal: true },
        ],
      },
      {
        id: 'ar_lian_retri', name: '징벌', nameKey: 'heroes.ar_lian.routes.retri.name', color: '#f59e0b', role: 'melee_dps',
        uniqueVariant: { 
          name: '성스러운 복수', nameKey: 'heroes.ar_lian.routes.retri.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 대상에게 ATK×4 신성 추가 피해.', descriptionTemplateKey: 'heroes.ar_lian.routes.retri.variantDesc'
        },
        skills: [
          { id: 'ar_lian_crusader_strike', name: '성전사의 일격', nameKey: 'heroes.ar_lian.skills.crusader_strike.name', description: '단일 ATK×6 신성 피해', descriptionKey: 'heroes.ar_lian.skills.crusader_strike.desc', color: '#fde68a', isShared: false, cost: 300 },
          { id: 'ar_lian_blade_justice', name: '심판의 칼날', nameKey: 'heroes.ar_lian.skills.blade_justice.name', description: '적 3명에게 신성 칼날 ATK×5', descriptionKey: 'heroes.ar_lian.skills.blade_justice.desc', color: '#fbbf24', isShared: false, cost: 400 },
          { id: 'ar_lian_divine_storm', name: '신성한 폭풍', nameKey: 'heroes.ar_lian.skills.divine_storm.name', description: '주변 광역 ATK×5 피해 및 아군 힐', descriptionKey: 'heroes.ar_lian.skills.divine_storm.desc', color: '#f59e0b', isShared: false, cost: 600 },
          { id: 'ar_lian_fanaticism', name: '광신', nameKey: 'heroes.ar_lian.skills.fanaticism.name', description: '15초간 공격력 50% 증가 및 모든 공격 속도 2배', descriptionKey: 'heroes.ar_lian.skills.fanaticism.desc', color: '#d97706', isShared: false, cost: 800 },
          { id: 'ar_lian_avenging_wrath', name: '응징의 격노', nameKey: 'heroes.ar_lian.skills.avenging_wrath.name', description: '20초간 무적 + 모든 공격이 광역 신성 폭발로 변경', descriptionKey: 'heroes.ar_lian.skills.avenging_wrath.desc', color: '#92400e', isShared: false, cost: 2000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 850, atk: 110, def: 50, spd: 3.0, attackRange: 45 }, color: '#991b1b',
  },
  {
    id: 'ar_kargath', name: '카르가스', nameKey: 'heroes.ar_kargath.name', grade: 'AR', role: 'melee_dps', raceName: '오크', elementName: '화염', starRating: 1,
    lore: '부러진 손 부족의 전설적인 지도자. 스스로 손을 자르고 칼날을 달아 전장을 피로 물들인다.', loreKey: 'heroes.ar_kargath.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [500, 1500, 3000, 8000],
    classRoutes: [
      {
        id: 'ar_kargath_blade', name: '칼날손', nameKey: 'heroes.ar_kargath.routes.blade.name', color: '#ef4444', role: 'melee_dps',
        uniqueVariant: { 
          name: '부러진 손의 칼날', nameKey: 'heroes.ar_kargath.routes.blade.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 적에게 치명적인 상처(방어 0)를 입힙니다.', descriptionTemplateKey: 'heroes.ar_kargath.routes.blade.variantDesc'
        },
        skills: [
          { id: 'ar_kar_impale', name: '꿰뚫기', nameKey: 'heroes.ar_kargath.skills.impale.name', description: '단일 ATK×8 피해 및 3초 기절', descriptionKey: 'heroes.ar_kargath.skills.impale.desc', color: '#f87171', isShared: false, cost: 300 },
          { id: 'ar_kar_blade_sweep', name: '칼날 휩쓸기', nameKey: 'heroes.ar_kargath.skills.blade_sweep.name', description: '전방 부채꼴 모든 적 ATK×5 피해', descriptionKey: 'heroes.ar_kargath.skills.blade_sweep.desc', color: '#ef4444', isShared: false, cost: 400 },
          { id: 'ar_kar_bloodthirst', name: '피의 굶주림', nameKey: 'heroes.ar_kargath.skills.bloodthirst.name', description: '적 처치 시 공격력 10% 증가 (무제한 중첩)', descriptionKey: 'heroes.ar_kargath.skills.bloodthirst.desc', color: '#dc2626', isShared: false, cost: 600 },
          { id: 'ar_kar_furious_attack', name: '맹렬한 공격', nameKey: 'heroes.ar_kargath.skills.furious_attack.name', description: '10초간 공격속도 200% 증가', descriptionKey: 'heroes.ar_kargath.skills.furious_attack.desc', color: '#b91c1c', isShared: false, cost: 800 },
          { id: 'ar_kar_massacre', name: '대학살', nameKey: 'heroes.ar_kargath.skills.massacre.name', description: '전장 전체 적 ATK×15 피해 및 HP 30% 이하 적 즉사', descriptionKey: 'heroes.ar_kargath.skills.massacre.desc', color: '#7f1d1d', isShared: false, cost: 2000, isFinal: true },
        ],
      },
      {
        id: 'ar_kargath_berserk', name: '광전사', nameKey: 'heroes.ar_kargath.routes.berserk.name', color: '#7c2d12', role: 'melee_dps',
        uniqueVariant: { 
          name: '가차없는 힘', nameKey: 'heroes.ar_kargath.routes.berserk.variantName',
          descriptionTemplate: '공격 시 {value}% 확률로 주변 적들에게 전이 피해를 입힙니다.', descriptionTemplateKey: 'heroes.ar_kargath.routes.berserk.variantDesc'
        },
        skills: [
          { id: 'ar_kar_slam', name: '격돌', nameKey: 'heroes.ar_kargath.skills.slam.name', description: '단일 ATK×10 강력한 한방', descriptionKey: 'heroes.ar_kargath.skills.slam.desc', color: '#92400e', isShared: false, cost: 300 },
          { id: 'ar_kar_whirlwind', name: '소용돌이', nameKey: 'heroes.ar_kargath.skills.whirlwind.name', description: '주변 모든 적에게 매초 ATK×3 피해 (5초 지속)', descriptionKey: 'heroes.ar_kargath.skills.whirlwind.desc', color: '#78350f', isShared: false, cost: 400 },
          { id: 'ar_kar_recklessness', name: '무모한 희생', nameKey: 'heroes.ar_kargath.skills.recklessness.name', description: '받는 피해 20% 증가, 주는 피해 100% 증가', descriptionKey: 'heroes.ar_kargath.skills.recklessness.desc', color: '#451a03', isShared: false, cost: 600 },
          { id: 'ar_kar_mortal_strike', name: '거인의 타격', nameKey: 'heroes.ar_kargath.skills.mortal_strike.name', description: '대상 적 방어력 영구 50% 감소 및 ATK×12 피해', descriptionKey: 'heroes.ar_kargath.skills.mortal_strike.desc', color: '#7c2d12', isShared: false, cost: 800 },
          { id: 'ar_kar_avatar', name: '투신', nameKey: 'heroes.ar_kargath.skills.avatar.name', description: '20초간 거대화: 공격력 3배, 무적', descriptionKey: 'heroes.ar_kargath.skills.avatar.desc', color: '#000000', isShared: false, cost: 2000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 780, atk: 165, def: 35, spd: 4.5, attackRange: 45 }, color: '#ef4444',
  },
  // --- 랜드 보상 LR 영웅 (14인) ---
  {
    id: 'ssr_goblin_warchief', name: '고블린 워치프', nameKey: 'heroes.ssr_goblin_warchief.name', grade: 'LR', role: 'tank', raceName: '고블린', elementName: '번개', starRating: 1,
    lore: '돈과 기술로 무장한 고블린들의 우두머리. 거대한 기계 슈트와 황금의 힘으로 적을 압도한다.', loreKey: 'heroes.ssr_goblin_warchief.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'goblin_chief_shredder', name: '기계 슈트', nameKey: 'heroes.ssr_goblin_warchief.routes.goblin_chief_shredder.name', color: '#eab308', role: 'mechanic',
        uniqueVariant: { name: '황금 갑옷', nameKey: 'heroes.ssr_goblin_warchief.routes.goblin_chief_shredder.variantName', descriptionTemplate: '받는 피해 {value}% 감소 및 피격 시 번개 반격.', descriptionTemplateKey: 'heroes.ssr_goblin_warchief.routes.goblin_chief_shredder.variantDesc' },
        skills: [
          { id: 'ssr_goblin_gold_toss', name: '골드 투척', nameKey: 'heroes.ssr_goblin_warchief.skills.gold_toss.name', description: '적 1명에게 ATK×5 피해 및 2초 기절', descriptionKey: 'heroes.ssr_goblin_warchief.skills.gold_toss.desc', color: '#facc15', isShared: false, cost: 500 },
          { id: 'ssr_goblin_repair', name: '기계 수리', nameKey: 'heroes.ssr_goblin_warchief.skills.repair.name', description: '패시브: 매초 자신의 HP 2.5% 회복', descriptionKey: 'heroes.ssr_goblin_warchief.skills.repair.desc', color: '#84cc16', isShared: false, cost: 800 },
          { id: 'ssr_goblin_turret', name: '강화 포탑', nameKey: 'heroes.ssr_goblin_warchief.skills.turret.name', description: '황금 포탑 소환 (상시 유지)', descriptionKey: 'heroes.ssr_goblin_warchief.skills.turret.desc', color: '#fb923c', isShared: false, cost: 1200,
            summonStats: { displayName: '황금 포탑', displayNameKey: 'heroes.ssr_goblin_warchief.summons.gold_turret.name', hp: 600, atk: 150, def: 30, spd: 0, role: 'ranged_dps', attackRange: 500, duration: 0 } },
          { id: 'ssr_goblin_shield', name: '기술력의 장벽', nameKey: 'heroes.ssr_goblin_warchief.skills.shield.name', description: '전체 아군에게 HP 30% 보호막 부여', descriptionKey: 'heroes.ssr_goblin_warchief.skills.shield.desc', color: '#ca8a04', isShared: false, cost: 1500 },
          { id: 'ssr_goblin_beam', name: '황금 광선', nameKey: 'heroes.ssr_goblin_warchief.skills.beam.name', description: '전방 모든 적에게 ATK×12 신성 피해', descriptionKey: 'heroes.ssr_goblin_warchief.skills.beam.desc', color: '#eab308', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'goblin_chief_merchant', name: '거상', nameKey: 'heroes.ssr_goblin_warchief.routes.goblin_chief_merchant.name', color: '#84cc16', role: 'ranged_dps',
        uniqueVariant: { name: '자본의 힘', nameKey: 'heroes.ssr_goblin_warchief.routes.goblin_chief_merchant.variantName', descriptionTemplate: '공격 시 {value}% 확률로 획득 골드 영구 1% 증가 (최대 50%).', descriptionTemplateKey: 'heroes.ssr_goblin_warchief.routes.goblin_chief_merchant.variantDesc' },
        skills: [
          { id: 'ssr_goblin_rocket', name: '로켓 발사', nameKey: 'heroes.ssr_goblin_warchief.skills.rocket.name', description: '적 3명에게 ATK×4 폭발 피해', descriptionKey: 'heroes.ssr_goblin_warchief.skills.rocket.desc', color: '#f87171', isShared: false, cost: 500 },
          { id: 'ssr_goblin_mine', name: '지뢰 매설', nameKey: 'heroes.ssr_goblin_warchief.skills.mine.name', description: '전장에 지뢰 설치: 밟은 적 ATK×6 피해', descriptionKey: 'heroes.ssr_goblin_warchief.skills.mine.desc', color: '#ef4444', isShared: false, cost: 800 },
          { id: 'ssr_goblin_bribe', name: '매수', nameKey: 'heroes.ssr_goblin_warchief.skills.bribe.name', description: '적 1명을 10초간 아군으로 만듬 (보스 기절)', descriptionKey: 'heroes.ssr_goblin_warchief.skills.bribe.desc', color: '#84cc16', isShared: false, cost: 1200 },
          { id: 'ssr_goblin_investment', name: '투자', nameKey: 'heroes.ssr_goblin_warchief.skills.investment.name', description: '10초간 아군 전체 공격력 50% 증가', descriptionKey: 'heroes.ssr_goblin_warchief.skills.investment.desc', color: '#4ade80', isShared: false, cost: 1500 },
          { id: 'ssr_goblin_bombardment', name: '공중 폭격', nameKey: 'heroes.ssr_goblin_warchief.skills.bombardment.name', description: '화면 전체 무차별 로켓 폭격 ATK×15', descriptionKey: 'heroes.ssr_goblin_warchief.skills.bombardment.desc', color: '#166534', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1500, atk: 60, def: 100, spd: 3, attackRange: 50, attackCooldown: 0.4 }, color: '#eab308',
  },
  {
    id: 'ssr_orc_blademaster', name: '오크 검귀', nameKey: 'heroes.ssr_orc_blademaster.name', grade: 'LR', role: 'melee_dps', raceName: '오크', elementName: '화염', starRating: 1,
    lore: '전설적인 불타는 칼날 부족의 검객. 바람보다 빠르고 불길보다 뜨거운 검술을 구사한다.', loreKey: 'heroes.ssr_orc_blademaster.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'blademaster_sword', name: '검도', nameKey: 'heroes.ssr_orc_blademaster.routes.blademaster_sword.name', color: '#ef4444', role: 'melee_dps',
        uniqueVariant: { name: '환영 분신', nameKey: 'heroes.ssr_orc_blademaster.routes.blademaster_sword.variantName', descriptionTemplate: '공격 시 {value}% 확률로 환영 생성 및 치명타 확률 증가.', descriptionTemplateKey: 'heroes.ssr_orc_blademaster.routes.blademaster_sword.variantDesc' },
        skills: [
          { id: 'ssr_orc_windwalk', name: '윈드워크', nameKey: 'heroes.ssr_orc_blademaster.skills.windwalk.name', description: '5초간 이속 50% 증가 및 은신, 다음 공격 3배 피해', descriptionKey: 'heroes.ssr_orc_blademaster.skills.windwalk.desc', color: '#9ca3af', isShared: false, cost: 500 },
          { id: 'ssr_orc_mirror_image', name: '미러 이미지', nameKey: 'heroes.ssr_orc_blademaster.skills.mirror_image.name', description: '자신과 동일한 분신 3개 생성', descriptionKey: 'heroes.ssr_orc_blademaster.skills.mirror_image.desc', color: '#f87171', isShared: false, cost: 800,
            summonStats: { displayName: '환영', displayNameKey: 'heroes.ssr_orc_blademaster.summons.mirror_image.name', hp: 400, atk: 100, def: 15, spd: 5, role: 'melee_dps', attackRange: 45, duration: 15 } },
          { id: 'ssr_orc_critical_strike', name: '치명적 일격', nameKey: 'heroes.ssr_orc_blademaster.skills.critical_strike.name', description: '패시브: 25% 확률로 4배 피해', descriptionKey: 'heroes.ssr_orc_blademaster.skills.critical_strike.desc', color: '#ef4444', isShared: false, cost: 1200 },
          { id: 'ssr_orc_burning_blade', name: '불타는 칼날', nameKey: 'heroes.ssr_orc_blademaster.skills.burning_blade.name', description: '공격 시 추가 화염 피해 및 5초간 공격력 50% 증가', descriptionKey: 'heroes.ssr_orc_blademaster.skills.burning_blade.desc', color: '#ea580c', isShared: false, cost: 1500 },
          { id: 'ssr_orc_bladestorm', name: '칼날폭풍', nameKey: 'heroes.ssr_orc_blademaster.skills.bladestorm.name', description: '10초간 무적 및 주변 광역 ATK×5 지속 피해', descriptionKey: 'heroes.ssr_orc_blademaster.skills.bladestorm.desc', color: '#b91c1c', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'blademaster_ghost', name: '귀도', nameKey: 'heroes.ssr_orc_blademaster.routes.blademaster_ghost.name', color: '#7c3aed', role: 'melee_dps',
        uniqueVariant: { name: '유령 보폭', nameKey: 'heroes.ssr_orc_blademaster.routes.blademaster_ghost.variantName', descriptionTemplate: '공격 시 {value}% 확률로 적을 관통하여 뒤로 이동하며 베기.', descriptionTemplateKey: 'heroes.ssr_orc_blademaster.routes.blademaster_ghost.variantDesc' },
        skills: [
          { id: 'ssr_orc_ghost_strike', name: '유령 베기', nameKey: 'heroes.ssr_orc_blademaster.skills.ghost_strike.name', description: '단일 ATK×8 암흑 피해 + 3초 공포', descriptionKey: 'heroes.ssr_orc_blademaster.skills.ghost_strike.desc', color: '#a78bfa', isShared: false, cost: 500 },
          { id: 'ssr_orc_spirit_link', name: '영혼 결속', nameKey: 'heroes.ssr_orc_blademaster.skills.spirit_link.name', description: '적 3명을 연결하여 받는 피해 공유', descriptionKey: 'heroes.ssr_orc_blademaster.skills.spirit_link.desc', color: '#8b5cf6', isShared: false, cost: 800 },
          { id: 'ssr_orc_haunt', name: '원혼', nameKey: 'heroes.ssr_orc_blademaster.skills.haunt.name', description: '쓰러진 적을 10초간 유령병사로 소환', descriptionKey: 'heroes.ssr_orc_blademaster.skills.haunt.desc', color: '#7c3aed', isShared: false, cost: 1200,
            summonStats: { displayName: '원혼', displayNameKey: 'heroes.ssr_orc_blademaster.summons.ghost.name', hp: 300, atk: 80, def: 10, spd: 4, role: 'melee_dps', attackRange: 45, duration: 10 } },
          { id: 'ssr_orc_night_terror', name: '밤의 공포', nameKey: 'heroes.ssr_orc_blademaster.skills.night_terror.name', description: '전체 적 실명 및 매초 지속 피해', descriptionKey: 'heroes.ssr_orc_blademaster.skills.night_terror.desc', color: '#6d28d9', isShared: false, cost: 1500 },
          { id: 'ssr_orc_ghost_army', name: '만령의 진혼곡', nameKey: 'heroes.ssr_orc_blademaster.skills.ghost_army.name', description: '전장 전체 유령 군단 소환 폭격 ATK×20', descriptionKey: 'heroes.ssr_orc_blademaster.skills.ghost_army.desc', color: '#4c1d95', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1100, atk: 185, def: 45, spd: 5, attackRange: 45 }, color: '#ef4444',
  },
  {
    id: 'ssr_tauren_chieftain', name: '붉은갈기 족장', nameKey: 'heroes.ssr_tauren_chieftain.name', grade: 'LR', role: 'tank', raceName: '타우렌', elementName: '자연', starRating: 1,
    lore: '붉은 봉우리의 수호자이자 대지모신의 목소리. 그의 발구르기는 대지를 가르고, 그의 의지는 죽음을 초월한다.', loreKey: 'heroes.ssr_tauren_chieftain.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'tauren_chieftain_guardian', name: '윤회', nameKey: 'heroes.ssr_tauren_chieftain.routes.tauren_chieftain_guardian.name', color: '#a16207', role: 'tank',
        uniqueVariant: { name: '윤회', nameKey: 'heroes.ssr_tauren_chieftain.routes.tauren_chieftain_guardian.variantName', descriptionTemplate: '사망 시 {value}% 체력으로 즉시 부활 (쿨타임 60초).', descriptionTemplateKey: 'heroes.ssr_tauren_chieftain.routes.tauren_chieftain_guardian.variantDesc' },
        skills: [
          { id: 'ssr_tauren_shockwave', name: '충격파', nameKey: 'heroes.ssr_tauren_chieftain.skills.shockwave.name', description: '전방 원뿔형 적들에게 ATK×5 피해 및 2초 기절', descriptionKey: 'heroes.ssr_tauren_chieftain.skills.shockwave.desc', color: '#92400e', isShared: false, cost: 500 },
          { id: 'ssr_tauren_war_stomp', name: '전투 발구르기', nameKey: 'heroes.ssr_tauren_chieftain.skills.war_stomp.name', description: '주변 적 3초 기절 및 ATK×4 피해', descriptionKey: 'heroes.ssr_tauren_chieftain.skills.war_stomp.desc', color: '#78350f', isShared: false, cost: 800 },
          { id: 'ssr_tauren_endurance_aura', name: '인내의 오라', nameKey: 'heroes.ssr_tauren_chieftain.skills.endurance_aura.name', description: '패시브: 아군 전체 공격속도/이동속도 20% 증가', descriptionKey: 'heroes.ssr_tauren_chieftain.skills.endurance_aura.desc', color: '#a16207', isShared: false, cost: 1200 },
          { id: 'ssr_tauren_earth_shield', name: '대지의 보호막', nameKey: 'heroes.ssr_tauren_chieftain.skills.earth_shield.name', description: '피격 시 HP를 회복하는 보호막을 아군에게 부여', descriptionKey: 'heroes.ssr_tauren_chieftain.skills.earth_shield.desc', color: '#d97706', isShared: false, cost: 1500 },
          { id: 'ssr_tauren_reincarnation', name: '대지의 축복', nameKey: 'heroes.ssr_tauren_chieftain.skills.reincarnation.name', description: '부활 시 15초간 공격력 3배 및 무적', descriptionKey: 'heroes.ssr_tauren_chieftain.skills.reincarnation.desc', color: '#451a03', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'tauren_chieftain_spirit', name: '정령', nameKey: 'heroes.ssr_tauren_chieftain.routes.tauren_chieftain_spirit.name', color: '#16a34a', role: 'melee_dps',
        uniqueVariant: { name: '정령의 인도', nameKey: 'heroes.ssr_tauren_chieftain.routes.tauren_chieftain_spirit.variantName', descriptionTemplate: '공격 시 {value}% 확률로 자연 추가 피해 및 힐.', descriptionTemplateKey: 'heroes.ssr_tauren_chieftain.routes.tauren_chieftain_spirit.variantDesc' },
        skills: [
          { id: 'ssr_tauren_nature_fury', name: '자연의 분노', nameKey: 'heroes.ssr_tauren_chieftain.skills.nature_fury.name', description: '단일 ATK×8 자연 피해', descriptionKey: 'heroes.ssr_tauren_chieftain.skills.nature_fury.desc', color: '#4ade80', isShared: false, cost: 500 },
          { id: 'ssr_tauren_spirit_link', name: '영혼 연결', nameKey: 'heroes.ssr_tauren_chieftain.skills.spirit_link.name', description: '아군 3명을 연결하여 받는 피해 30% 감소 및 분산', descriptionKey: 'heroes.ssr_tauren_chieftain.skills.spirit_link.desc', color: '#22c55e', isShared: false, cost: 800 },
          { id: 'ssr_tauren_totem_mastery', name: '토템의 숙련', nameKey: 'heroes.ssr_tauren_chieftain.skills.totem_mastery.name', description: '4가지 토템(공격/방어/치유/가속)을 동시에 소환', descriptionKey: 'heroes.ssr_tauren_chieftain.skills.totem_mastery.desc', color: '#16a34a', isShared: false, cost: 1200 },
          { id: 'ssr_tauren_ancestral_call', name: '선조의 부름', nameKey: 'heroes.ssr_tauren_chieftain.skills.ancestral_call.name', description: '선조의 영혼 2명을 소환하여 함께 전투 (상시)', descriptionKey: 'heroes.ssr_tauren_chieftain.skills.ancestral_call.desc', color: '#15803d', isShared: false, cost: 1500,
            summonStats: { displayName: '선조의 영혼', displayNameKey: 'heroes.ssr_tauren_chieftain.summons.ancestor.name', hp: 1000, atk: 120, def: 50, spd: 3, role: 'melee_dps', attackRange: 50, duration: 0 } },
          { id: 'ssr_tauren_world_stomp', name: '천지개벽 발구르기', nameKey: 'heroes.ssr_tauren_chieftain.skills.world_stomp.name', description: '전장 전체 적 ATK×15 피해 및 5초 기절', descriptionKey: 'heroes.ssr_tauren_chieftain.skills.world_stomp.desc', color: '#14532d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 2200, atk: 130, def: 110, spd: 2.5, attackRange: 60, attackCooldown: 2.0 }, color: '#a16207',
  },
  {
    id: 'ssr_darkelf_lord', name: '그림자 군주', nameKey: 'heroes.ssr_darkelf_lord.name', grade: 'LR', role: 'ranged_dps', raceName: '엘프', elementName: '암흑', starRating: 1,
    lore: '그림자 숲의 절대 지배자. 빛조차 닿지 않는 어둠의 힘으로 적의 정신과 육체를 붕괴시킨다.', loreKey: 'heroes.ssr_darkelf_lord.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'darkelf_lord_shadow', name: '그림자술', nameKey: 'heroes.ssr_darkelf_lord.routes.darkelf_lord_shadow.name', color: '#7c3aed', role: 'ranged_dps',
        uniqueVariant: { name: '그림자 침식', nameKey: 'heroes.ssr_darkelf_lord.routes.darkelf_lord_shadow.variantName', descriptionTemplate: '공격 시 {value}% 확률로 적 방어력을 0으로 무시하고 피해를 입힙니다.', descriptionTemplateKey: 'heroes.ssr_darkelf_lord.routes.darkelf_lord_shadow.variantDesc' },
        skills: [
          { id: 'ssr_elf_shadow_bolt', name: '그림자 화살', nameKey: 'heroes.ssr_darkelf_lord.skills.shadow_bolt.name', description: '단일 대상 ATK×6 어둠 피해', descriptionKey: 'heroes.ssr_darkelf_lord.skills.shadow_bolt.desc', color: '#8b5cf6', isShared: false, cost: 500 },
          { id: 'ssr_elf_curse_of_agony', name: '고통의 저주', nameKey: 'heroes.ssr_darkelf_lord.skills.curse_of_agony.name', description: '15초간 적에게 매초 점증하는 암흑 지속 피해', descriptionKey: 'heroes.ssr_darkelf_lord.skills.curse_of_agony.desc', color: '#6d28d9', isShared: false, cost: 800 },
          { id: 'ssr_elf_nightfall', name: '밤의 도래', nameKey: 'heroes.ssr_darkelf_lord.skills.nightfall.name', description: '전체 적 5초간 실명(명중률 -90%) 및 공포', descriptionKey: 'heroes.ssr_darkelf_lord.skills.nightfall.desc', color: '#4c1d95', isShared: false, cost: 1200 },
          { id: 'ssr_elf_shadow_form', name: '그림자 형상', nameKey: 'heroes.ssr_darkelf_lord.skills.shadow_form.name', description: '패시브: 자신의 모든 암흑 피해 50% 증가', descriptionKey: 'heroes.ssr_darkelf_lord.skills.shadow_form.desc', color: '#581c87', isShared: false, cost: 1500 },
          { id: 'ssr_elf_doom', name: '파멸', nameKey: 'heroes.ssr_darkelf_lord.skills.doom.name', description: '30초 후 적 즉사 (보스는 현재 체력의 50% 피해)', descriptionKey: 'heroes.ssr_darkelf_lord.skills.doom.desc', color: '#2e1065', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'darkelf_lord_void', name: '공허', nameKey: 'heroes.ssr_darkelf_lord.routes.darkelf_lord_void.name', color: '#1e1b4b', role: 'cc',
        uniqueVariant: { name: '공허의 갈망', nameKey: 'heroes.ssr_darkelf_lord.routes.darkelf_lord_void.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상의 공격력을 50% 흡수합니다.', descriptionTemplateKey: 'heroes.ssr_darkelf_lord.routes.darkelf_lord_void.variantDesc' },
        skills: [
          { id: 'ssr_elf_void_zone', name: '공허 지대', nameKey: 'heroes.ssr_darkelf_lord.skills.void_zone.name', description: '반경 150px 적 지속 피해 및 침묵', descriptionKey: 'heroes.ssr_darkelf_lord.skills.void_zone.desc', color: '#4338ca', isShared: false, cost: 500 },
          { id: 'ssr_elf_mind_blast', name: '정신 폭발', nameKey: 'heroes.ssr_darkelf_lord.skills.mind_blast.name', description: '단일 ATK×10 암흑 피해 + 3초 기절', descriptionKey: 'heroes.ssr_darkelf_lord.skills.mind_blast.desc', color: '#3730a3', isShared: false, cost: 800 },
          { id: 'ssr_elf_soul_leech', name: '영혼 흡수', nameKey: 'heroes.ssr_darkelf_lord.skills.soul_leech.name', description: '적 1명에게 ATK×8 피해 및 아군 전체 힐', descriptionKey: 'heroes.ssr_darkelf_lord.skills.soul_leech.desc', color: '#312e81', isShared: false, cost: 1200 },
          { id: 'ssr_elf_void_singularity', name: '공허 특이점', nameKey: 'heroes.ssr_darkelf_lord.skills.void_singularity.name', description: '모든 적을 한 점으로 끌어당김', descriptionKey: 'heroes.ssr_darkelf_lord.skills.void_singularity.desc', color: '#1e1b4b', isShared: false, cost: 1500 },
          { id: 'ssr_elf_oblivion', name: '망각', nameKey: 'heroes.ssr_darkelf_lord.skills.oblivion.name', description: '전장 전체를 공허로 뒤덮어 모든 적 무력화 10초', descriptionKey: 'heroes.ssr_darkelf_lord.skills.oblivion.desc', color: '#020617', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1000, atk: 210, def: 35, spd: 3.5, attackRange: 1200 }, color: '#7c3aed',
  },
  {
    id: 'ssr_fire_ash', name: '불꽃의 잿더미', nameKey: 'heroes.ssr_fire_ash.name', grade: 'LR', role: 'ranged_dps', raceName: '정령', elementName: '화염', starRating: 1,
    lore: '화염의 땅에서 태어난 파괴의 화신. 그가 걷는 모든 땅은 잿더미로 변하며, 공기조차 불타오른다.', loreKey: 'heroes.ssr_fire_ash.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'fire_ash_inferno', name: '지옥불', nameKey: 'heroes.ssr_fire_ash.routes.fire_ash_inferno.name', color: '#ea580c', role: 'ranged_dps',
        uniqueVariant: { name: '작열', nameKey: 'heroes.ssr_fire_ash.routes.fire_ash_inferno.variantName', descriptionTemplate: '모든 공격이 주변에 {value}% 피해를 전파하며 화상을 입힙니다.', descriptionTemplateKey: 'heroes.ssr_fire_ash.routes.fire_ash_inferno.variantDesc' },
        skills: [
          { id: 'ssr_fire_immolation_lr', name: '제물', nameKey: 'heroes.ssr_fire_ash.skills.immolation.name', description: '지속적인 화염 피해 및 받는 화염 피해 증가', descriptionKey: 'heroes.ssr_fire_ash.skills.immolation.desc', color: '#f97316', isShared: false, cost: 500 },
          { id: 'ssr_fire_meteor_lr', name: '운석 낙하', nameKey: 'heroes.ssr_fire_ash.skills.meteor.name', description: '타겟 위치에 거대 메테오 투하 ATK×8 피해', descriptionKey: 'heroes.ssr_fire_ash.skills.meteor.desc', color: '#ea580c', isShared: false, cost: 800 },
          { id: 'ssr_fire_conflagrate_lr', name: '점화', nameKey: 'heroes.ssr_fire_ash.skills.conflagrate.name', description: '화상 입은 적을 즉시 폭발시켜 ATK×10 피해', descriptionKey: 'heroes.ssr_fire_ash.skills.conflagrate.desc', color: '#c2410c', isShared: false, cost: 1200 },
          { id: 'ssr_fire_living_bomb', name: '살아있는 폭탄', nameKey: 'heroes.ssr_fire_ash.skills.living_bomb.name', description: '적 1명을 폭탄으로 만듬: 5초 후 거대 폭발', descriptionKey: 'heroes.ssr_fire_ash.skills.living_bomb.desc', color: '#991b1b', isShared: false, cost: 1500 },
          { id: 'ssr_fire_supernova_lr', name: '초신성', nameKey: 'heroes.ssr_fire_ash.skills.supernova.name', description: '자신을 중심으로 화면 전체 ATK×20 화염 피해', descriptionKey: 'heroes.ssr_fire_ash.skills.supernova.desc', color: '#7c2d12', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'fire_ash_ember', name: '잔불', nameKey: 'heroes.ssr_fire_ash.routes.fire_ash_ember.name', color: '#f87171', role: 'melee_dps',
        uniqueVariant: { name: '잿더미의 복수', nameKey: 'heroes.ssr_fire_ash.routes.fire_ash_ember.variantName', descriptionTemplate: '피격 시 {value}% 확률로 공격자에게 강력한 화염 폭발 반격.', descriptionTemplateKey: 'heroes.ssr_fire_ash.routes.fire_ash_ember.variantDesc' },
        skills: [
          { id: 'ssr_fire_ember_strike', name: '잿더미 휘두르기', nameKey: 'heroes.ssr_fire_ash.skills.ember_strike.name', description: '주변 모든 적 ATK×5 화염 피해', descriptionKey: 'heroes.ssr_fire_ash.skills.ember_strike.desc', color: '#fca5a5', isShared: false, cost: 500 },
          { id: 'ssr_fire_lava_shield', name: '용암 보호막', nameKey: 'heroes.ssr_fire_ash.skills.lava_shield.name', description: '10초간 피해감소 30% 및 근접 적 화상', descriptionKey: 'heroes.ssr_fire_ash.skills.lava_shield.desc', color: '#f87171', isShared: false, cost: 800 },
          { id: 'ssr_fire_volcano', name: '발끝의 화산', nameKey: 'heroes.ssr_fire_ash.skills.volcano.name', description: '자신 위치에 화산 생성: 15초간 주변 지속 폭발', descriptionKey: 'heroes.ssr_fire_ash.skills.volcano.desc', color: '#ef4444', isShared: false, cost: 1200 },
          { id: 'ssr_fire_fire_dash', name: '화염 돌진', nameKey: 'heroes.ssr_fire_ash.skills.fire_dash.name', description: '경로의 모든 적을 불태우며 이동 ATK×6', descriptionKey: 'heroes.ssr_fire_ash.skills.fire_dash.desc', color: '#dc2626', isShared: false, cost: 1500 },
          { id: 'ssr_fire_avatar_of_ash', name: '잿더미의 화신', nameKey: 'heroes.ssr_fire_ash.skills.avatar_of_ash.name', description: '20초간 무적 및 주변 모든 적 매초 ATK×3 피해', descriptionKey: 'heroes.ssr_fire_ash.skills.avatar_of_ash.desc', color: '#991b1b', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1100, atk: 220, def: 30, spd: 3, attackRange: 1000 }, color: '#ea580c',
  },
  {
    id: 'ssr_ice_queen', name: '서리눈송이 여왕', nameKey: 'heroes.ssr_ice_queen.name', grade: 'LR', role: 'cc', raceName: '엘프', elementName: '서리', starRating: 1,
    lore: '얼음 나라의 냉혹한 통치자. 그녀의 숨결 한 번에 전장은 영원한 겨울로 뒤덮인다.', loreKey: 'heroes.ssr_ice_queen.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'ice_queen_frost', name: '빙결', nameKey: 'heroes.ssr_ice_queen.routes.ice_queen_frost.name', color: '#0ea5e9', role: 'cc',
        uniqueVariant: { name: '절대 영도', nameKey: 'heroes.ssr_ice_queen.routes.ice_queen_frost.variantName', descriptionTemplate: '슬로우 효과 {value}% 강화 및 빙결 시간 증가.', descriptionTemplateKey: 'heroes.ssr_ice_queen.routes.ice_queen_frost.variantDesc' },
        skills: [
          { id: 'ssr_ice_frost_nova_lr', name: '동결 파동', nameKey: 'heroes.ssr_ice_queen.skills.frost_nova.name', description: '화면 전체 적 3초 빙결 및 ATK×4 피해', descriptionKey: 'heroes.ssr_ice_queen.skills.frost_nova.desc', color: '#67e8f9', isShared: false, cost: 500 },
          { id: 'ssr_ice_barrier_lr', name: '얼음 보호막', nameKey: 'heroes.ssr_ice_queen.skills.barrier.name', description: '아군 전체에게 HP 25% 보호막 + 피격 적 슬로우', descriptionKey: 'heroes.ssr_ice_queen.skills.barrier.desc', color: '#0ea5e9', isShared: false, cost: 800 },
          { id: 'ssr_ice_blizzard_lr', name: '광역 눈보라', nameKey: 'heroes.ssr_ice_queen.skills.blizzard.name', description: '15초간 전장 눈보라: 매초 20% 슬로우 중첩 및 지속 피해', descriptionKey: 'heroes.ssr_ice_queen.skills.blizzard.desc', color: '#0284c7', isShared: false, cost: 1200 },
          { id: 'ssr_ice_frozen_statue', name: '얼음 조각상', nameKey: 'heroes.ssr_ice_queen.skills.frozen_statue.name', description: '가장 강한 적 1명을 10초간 완전 봉쇄', descriptionKey: 'heroes.ssr_ice_queen.skills.frozen_statue.desc', color: '#0369a1', isShared: false, cost: 1500 },
          { id: 'ssr_ice_frozen_orb_lr', name: '서리의 폭풍', nameKey: 'heroes.ssr_ice_queen.skills.frozen_orb.name', description: '거대 얼음 구슬이 폭발하며 전장 전체 적 즉사 (보스 ATK×20)', descriptionKey: 'heroes.ssr_ice_queen.skills.frozen_orb.desc', color: '#075985', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'ice_queen_shard', name: '빙편', nameKey: 'heroes.ssr_ice_queen.routes.ice_queen_shard.name', color: '#38bdf8', role: 'ranged_dps',
        uniqueVariant: { name: '얼음 파편', nameKey: 'heroes.ssr_ice_queen.routes.ice_queen_shard.variantName', descriptionTemplate: '공격 시 {value}% 확률로 3개의 얼음 화살 추가 발사.', descriptionTemplateKey: 'heroes.ssr_ice_queen.routes.ice_queen_shard.variantDesc' },
        skills: [
          { id: 'ssr_ice_shard_barrage', name: '얼음 조각 세례', nameKey: 'heroes.ssr_ice_queen.skills.shard_barrage.name', description: '적에게 무수한 파편 발사 ATK×1.5 × 8연타', descriptionKey: 'heroes.ssr_ice_queen.skills.shard_barrage.desc', color: '#7dd3fc', isShared: false, cost: 500 },
          { id: 'ssr_ice_cold_snap', name: '매서운 추위', nameKey: 'heroes.ssr_ice_queen.skills.cold_snap.name', description: '패시브: 자신의 모든 냉기 피해 40% 증가', descriptionKey: 'heroes.ssr_ice_queen.skills.cold_snap.desc', color: '#38bdf8', isShared: false, cost: 800 },
          { id: 'ssr_ice_glacier_spike', name: '빙하 창', nameKey: 'heroes.ssr_ice_queen.skills.glacier_spike.name', description: '거대 빙하 창을 투척하여 경로의 모든 적 관통 피해', descriptionKey: 'heroes.ssr_ice_queen.skills.glacier_spike.desc', color: '#0ea5e9', isShared: false, cost: 1200 },
          { id: 'ssr_ice_water_elemental', name: '냉기 정령 군단', nameKey: 'heroes.ssr_ice_queen.skills.water_elemental.name', description: '냉기 정령 3마리 소환 (원딜, 슬로우 공격)', descriptionKey: 'heroes.ssr_ice_queen.skills.water_elemental.desc', color: '#0284c7', isShared: false, cost: 1500,
            summonStats: { displayName: '냉기 정령', displayNameKey: 'heroes.ssr_ice_queen.summons.frost_elemental.name', hp: 400, atk: 100, def: 15, spd: 2, role: 'ranged_dps', attackRange: 600, duration: 25 } },
          { id: 'ssr_ice_absolute_zero', name: '심연의 결빙', nameKey: 'heroes.ssr_ice_queen.skills.absolute_zero.name', description: '전장의 모든 존재를 정지시키고 ATK×15 피해', descriptionKey: 'heroes.ssr_ice_queen.skills.absolute_zero.desc', color: '#1e3a8a', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 950, atk: 165, def: 35, spd: 3, attackRange: 1500 }, color: '#0ea5e9',
  },
  {
    id: 'ssr_death_knight', name: '죽음의 기사', nameKey: 'heroes.ssr_death_knight.name', grade: 'LR', role: 'tank', raceName: '언데드', elementName: '암흑', starRating: 1,
    lore: '버림받은 도시를 지키는 불멸의 기사. 죽음은 그에게 끝이 아닌 새로운 시작일 뿐이다.', loreKey: 'heroes.ssr_death_knight.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'death_knight_blood', name: '혈기', nameKey: 'heroes.ssr_death_knight.routes.death_knight_blood.name', color: '#991b1b', role: 'tank',
        uniqueVariant: { name: '사후 경직', nameKey: 'heroes.ssr_death_knight.routes.death_knight_blood.variantName', descriptionTemplate: '받는 피해의 {value}%를 HP 회복으로 전환합니다.', descriptionTemplateKey: 'heroes.ssr_death_knight.routes.death_knight_blood.variantDesc' },
        skills: [
          { id: 'ssr_dk_death_strike', name: '죽음의 일격', nameKey: 'heroes.ssr_death_knight.skills.death_strike.name', description: '단일 ATK×6 피해 및 입힌 피해 50% 회복', descriptionKey: 'heroes.ssr_death_knight.skills.death_strike.desc', color: '#b91c1c', isShared: false, cost: 500 },
          { id: 'ssr_dk_blood_boil', name: '피의 소용돌이', nameKey: 'heroes.ssr_death_knight.skills.blood_boil.name', description: '주변 모든 적 ATK×4 피해 및 출혈 부여', descriptionKey: 'heroes.ssr_death_knight.skills.blood_boil.desc', color: '#991b1b', isShared: false, cost: 800 },
          { id: 'ssr_dk_vampiric_blood', name: '흡혈귀의 피', nameKey: 'heroes.ssr_death_knight.skills.vampiric_blood.name', description: '10초간 최대 HP 50% 증가 및 치유량 2배', descriptionKey: 'heroes.ssr_death_knight.skills.vampiric_blood.desc', color: '#7f1d1d', isShared: false, cost: 1200 },
          { id: 'ssr_dk_rune_weapon', name: '춤추는 룬 무기', nameKey: 'heroes.ssr_death_knight.skills.rune_weapon.name', description: '공격력을 보조하고 피해를 막아주는 룬 무기 소환', descriptionKey: 'heroes.ssr_death_knight.skills.rune_weapon.desc', color: '#450a0a', isShared: false, cost: 1500 },
          { id: 'ssr_dk_purgatory', name: '연옥', nameKey: 'heroes.ssr_death_knight.skills.purgatory.name', description: '사망 시 무적으로 부활하며 15초간 입힌 피해만큼 HP 회복', descriptionKey: 'heroes.ssr_death_knight.skills.purgatory.desc', color: '#000000', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'death_knight_unholy', name: '부정', nameKey: 'heroes.ssr_death_knight.routes.death_knight_unholy.name', color: '#166534', role: 'melee_dps',
        uniqueVariant: { name: '부패의 손길', nameKey: 'heroes.ssr_death_knight.routes.death_knight_unholy.variantName', descriptionTemplate: '공격 시 {value}% 확률로 적에게 영구적인 방어력 10% 감소 부여(최대 5중첩).', descriptionTemplateKey: 'heroes.ssr_death_knight.routes.death_knight_unholy.variantDesc' },
        skills: [
          { id: 'ssr_dk_death_grip', name: '죽음의 손아귀', nameKey: 'heroes.ssr_death_knight.skills.death_grip.name', description: '가장 먼 적을 앞으로 당겨오고 3초 기절', descriptionKey: 'heroes.ssr_death_knight.skills.death_grip.desc', color: '#94a3b8', isShared: false, cost: 500 },
          { id: 'ssr_dk_anti_magic_shell_lr', name: '대마법 보호막', nameKey: 'heroes.ssr_death_knight.skills.anti_magic_shell.name', description: '아군 전체 5초간 모든 마법 피해 무효화', descriptionKey: 'heroes.ssr_death_knight.skills.anti_magic_shell.desc', color: '#065f46', isShared: false, cost: 800 },
          { id: 'ssr_dk_outbreak', name: '돌발 열병', nameKey: 'heroes.ssr_death_knight.skills.outbreak.name', description: '모든 적에게 즉시 강력한 질병(DoT) 전파', descriptionKey: 'heroes.ssr_death_knight.skills.outbreak.desc', color: '#166534', isShared: false, cost: 1200 },
          { id: 'ssr_dk_summon_abom', name: '누더기골렘 소환', nameKey: 'heroes.ssr_death_knight.skills.summon_abom.name', description: '거대한 누더기골렘 1명 소환 (상시 탱커)', descriptionKey: 'heroes.ssr_death_knight.skills.summon_abom.desc', color: '#14532d', isShared: false, cost: 1500,
            summonStats: { displayName: '누더기골렘', displayNameKey: 'heroes.ssr_death_knight.summons.abomination.name', hp: 1500, atk: 100, def: 60, spd: 2, role: 'tank', attackRange: 60, duration: 0 } },
          { id: 'ssr_dk_army_of_dead_lr2', name: '사멸의 군단', nameKey: 'heroes.ssr_death_knight.skills.army_of_dead.name', description: '구울 15마리를 소환하여 전장 초토화', descriptionKey: 'heroes.ssr_death_knight.skills.army_of_dead.desc', color: '#1e293b', isShared: false, cost: 3000, isFinal: true,
            summonStats: { displayName: '망자', displayNameKey: 'heroes.ssr_death_knight.summons.undead.name', hp: 300, atk: 60, def: 10, spd: 4.5, role: 'melee_dps', attackRange: 45, duration: 20 } },
        ],
      },
    ],
    baseStats: { hp: 2500, atk: 120, def: 95, spd: 2.5, attackRange: 55 }, color: '#64748b',
  },
  {
    id: 'ssr_poison_mancer', name: '맹독술사', nameKey: 'heroes.ssr_poison_mancer.name', grade: 'LR', role: 'ranged_dps', raceName: '트롤', elementName: '독', starRating: 1,
    lore: '맹독의 늪지대에서 금지된 술법을 익힌 자. 그의 역병은 생명이 있는 모든 것을 썩게 만든다.', loreKey: 'heroes.ssr_poison_mancer.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'venomancer_plague', name: '역병', nameKey: 'heroes.ssr_poison_mancer.routes.venomancer_plague.name', color: '#10b981', role: 'ranged_dps',
        uniqueVariant: { name: '맹독 확산', nameKey: 'heroes.ssr_poison_mancer.routes.venomancer_plague.variantName', descriptionTemplate: '독 피해 시 {value}% 확률로 대상에게 추가 맹독 폭발 발생.', descriptionTemplateKey: 'heroes.ssr_poison_mancer.routes.venomancer_plague.variantDesc' },
        skills: [
          { id: 'ssr_poison_plague_cloud_lr', name: '역병 구름', nameKey: 'heroes.ssr_poison_mancer.skills.plague_cloud.name', description: '넓은 범위 지속 독 피해 및 방어력 30% 감소', descriptionKey: 'heroes.ssr_poison_mancer.skills.plague_cloud.desc', color: '#10b981', isShared: false, cost: 500 },
          { id: 'ssr_poison_venomous_gale_lr', name: '독성 돌풍', nameKey: 'heroes.ssr_poison_mancer.skills.venomous_gale.name', description: '직선 적들에게 ATK×5 피해 및 3초 속박', descriptionKey: 'heroes.ssr_poison_mancer.skills.venomous_gale.desc', color: '#059669', isShared: false, cost: 800 },
          { id: 'ssr_poison_contagion_lr', name: '전염', nameKey: 'heroes.ssr_poison_mancer.skills.contagion.name', description: '중독된 적이 죽으면 주변 적에게 강력한 독 전이', descriptionKey: 'heroes.ssr_poison_mancer.skills.contagion.desc', color: '#064e3b', isShared: false, cost: 1200 },
          { id: 'ssr_poison_toxic_injection', name: '독극물 주입', nameKey: 'heroes.ssr_poison_mancer.skills.toxic_injection.name', description: '패시브: 자신의 모든 공격에 강력한 지속 독 피해 추가', descriptionKey: 'heroes.ssr_poison_mancer.skills.toxic_injection.desc', color: '#065f46', isShared: false, cost: 1500 },
          { id: 'ssr_poison_epidemic_lr', name: '대역병', nameKey: 'heroes.ssr_poison_mancer.skills.epidemic.name', description: '전장의 모든 적 즉시 중독 및 HP 50% 피해 (보스 ATK×15)', descriptionKey: 'heroes.ssr_poison_mancer.skills.epidemic.desc', color: '#022c22', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'venomancer_voodoo', name: '부두', nameKey: 'heroes.ssr_poison_mancer.routes.venomancer_voodoo.name', color: '#166534', role: 'cc',
        uniqueVariant: { name: '어둠의 저주', nameKey: 'heroes.ssr_poison_mancer.routes.venomancer_voodoo.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상을 5초간 개구리로 변이시킵니다.', descriptionTemplateKey: 'heroes.ssr_poison_mancer.routes.venomancer_voodoo.variantDesc' },
        skills: [
          { id: 'ssr_poison_hex_totem', name: '주술 토템', nameKey: 'heroes.ssr_poison_mancer.skills.hex_totem.name', description: '주변 적들을 주기적으로 변이시키는 토템 소환', descriptionKey: 'heroes.ssr_poison_mancer.skills.hex_totem.desc', color: '#4ade80', isShared: false, cost: 500 },
          { id: 'ssr_poison_voodoo_curse', name: '부두의 저주', nameKey: 'heroes.ssr_poison_mancer.skills.voodoo_curse.name', description: '적 3명에게 받는 피해 50% 증가 디버프 부여', descriptionKey: 'heroes.ssr_poison_mancer.skills.voodoo_curse.desc', color: '#22c55e', isShared: false, cost: 800 },
          { id: 'ssr_poison_shadow_voodoo', name: '그림자 부두', nameKey: 'heroes.ssr_poison_mancer.skills.shadow_voodoo.name', description: '아군 전체에게 공격 시 20% 흡혈 효과 부여 10초', descriptionKey: 'heroes.ssr_poison_mancer.skills.shadow_voodoo.desc', color: '#16a34a', isShared: false, cost: 1200 },
          { id: 'ssr_poison_zombie_army', name: '좀비 군단', nameKey: 'heroes.ssr_poison_mancer.skills.zombie_army.name', description: '느리지만 강력한 좀비 10마리 소환', descriptionKey: 'heroes.ssr_poison_mancer.skills.zombie_army.desc', color: '#14532d', isShared: false, cost: 1500,
            summonStats: { displayName: '좀비', displayNameKey: 'heroes.ssr_poison_mancer.summons.zombie.name', hp: 500, atk: 80, def: 20, spd: 1.5, role: 'melee_dps', attackRange: 45, duration: 25 } },
          { id: 'ssr_poison_death_ritual', name: '죽음의 의식', nameKey: 'heroes.ssr_poison_mancer.skills.death_ritual.name', description: '가장 강력한 적 1명을 즉사시킴 (보스 최대HP 30% 피해)', descriptionKey: 'heroes.ssr_poison_mancer.skills.death_ritual.desc', color: '#052e16', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1000, atk: 140, def: 40, spd: 3.5, attackRange: 1100, attackCooldown: 0.45 }, color: '#10b981',
  },
  {
    id: 'ssr_merc_king', name: '용병왕', nameKey: 'heroes.ssr_merc_king.name', grade: 'LR', role: 'melee_dps', raceName: '인간', elementName: '바람', starRating: 1,
    lore: '모든 용병들이 경외하는 전장의 지배자. 돈과 전략만 있다면 어떤 전쟁도 승리로 이끈다.', loreKey: 'heroes.ssr_merc_king.lore',
    uniqueSkill: { baseValues: [20, 30, 40, 50, 60], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'merc_king_tactics', name: '전술', nameKey: 'heroes.ssr_merc_king.routes.merc_king_tactics.name', color: '#d97706', role: 'melee_dps',
        uniqueVariant: { name: '전투 지휘', nameKey: 'heroes.ssr_merc_king.routes.merc_king_tactics.variantName', descriptionTemplate: '아군 전체 공격속도 {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_merc_king.routes.merc_king_tactics.variantDesc' },
        skills: [
          { id: 'ssr_merc_war_cry', name: '승리의 함성', nameKey: 'heroes.ssr_merc_king.skills.war_cry.name', description: '10초간 아군 전체 공격력 30% 증가', descriptionKey: 'heroes.ssr_merc_king.skills.war_cry.desc', color: '#fbbf24', isShared: false, cost: 500 },
          { id: 'ssr_merc_bounty_hunt', name: '현상금 사냥', nameKey: 'heroes.ssr_merc_king.skills.bounty_hunt.name', description: '적 처치 시 획득 골드 2배 증가 (영구)', descriptionKey: 'heroes.ssr_merc_king.skills.bounty_hunt.desc', color: '#d97706', isShared: false, cost: 800 },
          { id: 'ssr_merc_tactical_strike', name: '전술적 일격', nameKey: 'heroes.ssr_merc_king.skills.tactical_strike.name', description: '강적 단일 ATK×10 물리 피해', descriptionKey: 'heroes.ssr_merc_king.skills.tactical_strike.desc', color: '#92400e', isShared: false, cost: 1200 },
          { id: 'ssr_merc_recruit', name: '용병 고용', nameKey: 'heroes.ssr_merc_king.skills.recruit.name', description: '강화 용병 2명 추가 소환 (상시 유지)', descriptionKey: 'heroes.ssr_merc_king.skills.recruit.desc', color: '#b45309', isShared: false, cost: 1500,
            summonStats: { displayName: '강화 용병', displayNameKey: 'heroes.ssr_merc_king.summons.elite_merc.name', hp: 600, atk: 150, def: 40, spd: 4, role: 'melee_dps', attackRange: 45, duration: 0 } },
          { id: 'ssr_merc_kings_army', name: '용병단 소환', nameKey: 'heroes.ssr_merc_king.skills.kings_army.name', description: '정예 용병 5명을 소환하여 20초간 함께 전투', descriptionKey: 'heroes.ssr_merc_king.skills.kings_army.desc', color: '#451a03', isShared: false, cost: 3000, isFinal: true,
            summonStats: { displayName: '정예 용병', displayNameKey: 'heroes.ssr_merc_king.summons.veteran_merc.name', hp: 800, atk: 200, def: 50, spd: 4.5, role: 'melee_dps', attackRange: 45, duration: 20 } },
        ],
      },
      {
        id: 'merc_king_assassin', name: '암살', nameKey: 'heroes.ssr_merc_king.routes.merc_king_assassin.name', color: '#4c0519', role: 'melee_dps',
        uniqueVariant: { name: '비정한 거래', nameKey: 'heroes.ssr_merc_king.routes.merc_king_assassin.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상의 방어력 50% 무시.', descriptionTemplateKey: 'heroes.ssr_merc_king.routes.merc_king_assassin.variantDesc' },
        skills: [
          { id: 'ssr_merc_poison_blade', name: '독 묻은 칼날', nameKey: 'heroes.ssr_merc_king.skills.poison_blade.name', description: '단일 ATK×4 + 강력한 독 DoT', descriptionKey: 'heroes.ssr_merc_king.skills.poison_blade.desc', color: '#be123c', isShared: false, cost: 500 },
          { id: 'ssr_merc_shadow_step', name: '그림자 추적', nameKey: 'heroes.ssr_merc_king.skills.shadow_step.name', description: '대상 뒤로 이동 후 ATK×6 피해', descriptionKey: 'heroes.ssr_merc_king.skills.shadow_step.desc', color: '#9f1239', isShared: false, cost: 800 },
          { id: 'ssr_merc_blood_money', name: '피의 대가', nameKey: 'heroes.ssr_merc_king.skills.blood_money.name', description: '패시브: 공격 시 피해량의 20% 골드 획득', descriptionKey: 'heroes.ssr_merc_king.skills.blood_money.desc', color: '#881337', isShared: false, cost: 1200 },
          { id: 'ssr_merc_execution', name: '단두대', nameKey: 'heroes.ssr_merc_king.skills.execution.name', description: 'HP 30% 이하 적 즉사 (보스 대량 피해)', descriptionKey: 'heroes.ssr_merc_king.skills.execution.desc', color: '#4c0519', isShared: false, cost: 1500 },
          { id: 'ssr_merc_contract_kill', name: '살인 계약', nameKey: 'heroes.ssr_merc_king.skills.contract_kill.name', description: '모든 적에게 계약 표식: 10초 후 ATK×20 피해', descriptionKey: 'heroes.ssr_merc_king.skills.contract_kill.desc', color: '#2e1065', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1200, atk: 160, def: 55, spd: 4.5, attackRange: 45 }, color: '#d97706',
  },
  {
    id: 'ssr_ele_scholar', name: '정령학자', nameKey: 'heroes.ssr_ele_scholar.name', grade: 'LR', role: 'cc', raceName: '인간', elementName: '빛', starRating: 1,
    lore: '모든 정령의 힘을 학술적으로 완성한 대마법사. 속성의 상성을 이용하여 전장을 지배한다.', loreKey: 'heroes.ssr_ele_scholar.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'ele_master_theory', name: '원소학', nameKey: 'heroes.ssr_ele_scholar.routes.ele_master_theory.name', color: '#06b6d4', role: 'cc',
        uniqueVariant: { name: '정령의 공명', nameKey: 'heroes.ssr_ele_scholar.routes.ele_master_theory.variantName', descriptionTemplate: '모든 시너지 효과 {value}% 강화.', descriptionTemplateKey: 'heroes.ssr_ele_scholar.routes.ele_master_theory.variantDesc' },
        skills: [
          { id: 'ssr_ele_elemental_shift', name: '원소 치환', nameKey: 'heroes.ssr_ele_scholar.skills.elemental_shift.name', description: '자신의 공격 속성 무작위 변경 및 피해 20% 증가', descriptionKey: 'heroes.ssr_ele_scholar.skills.elemental_shift.desc', color: '#67e8f9', isShared: false, cost: 500 },
          { id: 'ssr_ele_prismatic_beam', name: '프리즘 빔', nameKey: 'heroes.ssr_ele_scholar.skills.prismatic_beam.name', description: '적 3명에게 3가지 속성 피해 동시 적용 ATK×4', descriptionKey: 'heroes.ssr_ele_scholar.skills.prismatic_beam.desc', color: '#06b6d4', isShared: false, cost: 800 },
          { id: 'ssr_ele_catalyst', name: '촉매 반응', nameKey: 'heroes.ssr_ele_scholar.skills.catalyst.name', description: '적의 해로운 효과 지속시간 2배 증가', descriptionKey: 'heroes.ssr_ele_scholar.skills.catalyst.desc', color: '#0891b2', isShared: false, cost: 1200 },
          { id: 'ssr_ele_arcane_intellect', name: '신비한 지능', nameKey: 'heroes.ssr_ele_scholar.skills.arcane_intellect.name', description: '아군 전체 스킬 피해 30% 증가 [패시브]', descriptionKey: 'heroes.ssr_ele_scholar.skills.arcane_intellect.desc', color: '#0e7490', isShared: false, cost: 1500 },
          { id: 'ssr_ele_elemental_overload', name: '원소 과부하', nameKey: 'heroes.ssr_ele_scholar.skills.elemental_overload.name', description: '화면 전체에 4대 원소 대폭발 발생 ATK×12', descriptionKey: 'heroes.ssr_ele_scholar.skills.elemental_overload.desc', color: '#155e75', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'ele_master_battle', name: '전투마법', nameKey: 'heroes.ssr_ele_scholar.routes.ele_master_battle.name', color: '#1e40af', role: 'ranged_dps',
        uniqueVariant: { name: '마력 폭주', nameKey: 'heroes.ssr_ele_scholar.routes.ele_master_battle.variantName', descriptionTemplate: '공격 시 {value}% 확률로 쿨타임 중인 스킬 하나 초기화.', descriptionTemplateKey: 'heroes.ssr_ele_scholar.routes.ele_master_battle.variantDesc' },
        skills: [
          { id: 'ssr_ele_arcane_blast', name: '비전 작렬', nameKey: 'heroes.ssr_ele_scholar.skills.arcane_blast.name', description: '단일 ATK×6 피해 + 다음 작렬 강화', descriptionKey: 'heroes.ssr_ele_scholar.skills.arcane_blast.desc', color: '#3b82f6', isShared: false, cost: 500 },
          { id: 'ssr_ele_frost_fire_bolt', name: '냉기화염 화살', nameKey: 'heroes.ssr_ele_scholar.skills.frost_fire_bolt.name', description: '냉기+화염 복합 피해 및 슬로우', descriptionKey: 'heroes.ssr_ele_scholar.skills.frost_fire_bolt.desc', color: '#2563eb', isShared: false, cost: 800 },
          { id: 'ssr_ele_mirror_image', name: '환영 분신', nameKey: 'heroes.ssr_ele_scholar.skills.mirror_image.name', description: '자신과 동일한 공격력을 가진 분신 2개 소환', descriptionKey: 'heroes.ssr_ele_scholar.skills.mirror_image.desc', color: '#1d4ed8', isShared: false, cost: 1200,
            summonStats: { displayName: '마법사 분신', displayNameKey: 'heroes.ssr_ele_scholar.summons.mage_clone.name', hp: 300, atk: 100, def: 10, spd: 0, role: 'ranged_dps', attackRange: 1000, duration: 15 } },
          { id: 'ssr_ele_focus_magic', name: '마력 집중', nameKey: 'heroes.ssr_ele_scholar.skills.focus_magic.name', description: '10초간 자신의 공격속도 100% 증가', descriptionKey: 'heroes.ssr_ele_scholar.skills.focus_magic.desc', color: '#1e40af', isShared: false, cost: 1500 },
          { id: 'ssr_ele_greater_pyro', name: '대지옥불 작렬', nameKey: 'heroes.ssr_ele_scholar.skills.greater_pyro.name', description: '대상 적 전체 최대HP 35% 피해', descriptionKey: 'heroes.ssr_ele_scholar.skills.greater_pyro.desc', color: '#1e3a8a', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 850, atk: 150, def: 35, spd: 3, attackRange: 1300 }, color: '#06b6d4',
  },
  {
    id: 'ssr_sea_ruler', name: '심해의 지배자', nameKey: 'heroes.ssr_sea_ruler.name', grade: 'LR', role: 'healer', raceName: '나이트본', elementName: '물', starRating: 1,
    lore: '가라앉은 신전의 영원한 수호신. 바다의 생명력과 파괴적인 해일을 동시에 다스린다.', loreKey: 'heroes.ssr_sea_ruler.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 70, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'sea_ruler_tide', name: '해일', nameKey: 'heroes.ssr_sea_ruler.routes.sea_ruler_tide.name', color: '#0284c7', role: 'healer',
        uniqueVariant: { name: '생명의 파도', nameKey: 'heroes.ssr_sea_ruler.routes.sea_ruler_tide.variantName', descriptionTemplate: '힐 시 {value}% 확률로 아군 전체에게 추가 힐.', descriptionTemplateKey: 'heroes.ssr_sea_ruler.routes.sea_ruler_tide.variantDesc' },
        skills: [
          { id: 'ssr_sea_tsunami', name: '거대 해일', nameKey: 'heroes.ssr_sea_ruler.skills.tsunami.name', description: '적들을 멀리 밀쳐내고 ATK×5 물 피해', descriptionKey: 'heroes.ssr_sea_ruler.skills.tsunami.desc', color: '#38bdf8', isShared: false, cost: 500 },
          { id: 'ssr_sea_healing_tide', name: '치유의 조물', nameKey: 'heroes.ssr_sea_ruler.skills.healing_tide.name', description: '15초간 아군 전체 매초 3% 회복 토템 소환', descriptionKey: 'heroes.ssr_sea_ruler.skills.healing_tide.desc', color: '#0ea5e9', isShared: false, cost: 800 },
          { id: 'ssr_sea_water_shield', name: '심해의 가호', nameKey: 'heroes.ssr_sea_ruler.skills.water_shield.name', description: '아군 전체 방어력 40% 증가 및 보호막 부여', descriptionKey: 'heroes.ssr_sea_ruler.skills.water_shield.desc', color: '#0284c7', isShared: false, cost: 1200 },
          { id: 'ssr_sea_cleanse', name: '정화의 물결', nameKey: 'heroes.ssr_sea_ruler.skills.cleanse.name', description: '아군 전체 디버프 제거 및 ATK×6 치유', descriptionKey: 'heroes.ssr_sea_ruler.skills.cleanse.desc', color: '#0e7490', isShared: false, cost: 1500 },
          { id: 'ssr_sea_blessing_of_abyss', name: '심해의 축복', nameKey: 'heroes.ssr_sea_ruler.skills.blessing_of_abyss.name', description: '아군 전체 10초간 무적 및 완전 회복', descriptionKey: 'heroes.ssr_sea_ruler.skills.blessing_of_abyss.desc', color: '#075985', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'sea_ruler_abyss', name: '심연', nameKey: 'heroes.ssr_sea_ruler.routes.sea_ruler_abyss.name', color: '#1e3a8a', role: 'ranged_dps',
        uniqueVariant: { name: '심연의 공포', nameKey: 'heroes.ssr_sea_ruler.routes.sea_ruler_abyss.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상을 3초간 공포(이동불가) 상태로 만듭니다.', descriptionTemplateKey: 'heroes.ssr_sea_ruler.routes.sea_ruler_abyss.variantDesc' },
        skills: [
          { id: 'ssr_sea_abyss_bolt', name: '심연의 화살', nameKey: 'heroes.ssr_sea_ruler.skills.abyss_bolt.name', description: '단일 ATK×7 암흑+물 복합 피해', descriptionKey: 'heroes.ssr_sea_ruler.skills.abyss_bolt.desc', color: '#3b82f6', isShared: false, cost: 500 },
          { id: 'ssr_sea_crushing_depths', name: '압착', nameKey: 'heroes.ssr_sea_ruler.skills.crushing_depths.name', description: '대상의 이동속도를 90% 감소시키고 지속 피해', descriptionKey: 'heroes.ssr_sea_ruler.skills.crushing_depths.desc', color: '#2563eb', isShared: false, cost: 800 },
          { id: 'ssr_sea_summon_kraken', name: '크라켄의 촉수', nameKey: 'heroes.ssr_sea_ruler.skills.summon_kraken.name', description: '심연의 촉수 3개를 소환하여 무작위 적 공격', descriptionKey: 'heroes.ssr_sea_ruler.skills.summon_kraken.desc', color: '#1d4ed8', isShared: false, cost: 1200,
            summonStats: { displayName: '심연의 촉수', displayNameKey: 'heroes.ssr_sea_ruler.summons.tentacle.name', hp: 500, atk: 120, def: 20, spd: 0, role: 'ranged_dps', attackRange: 500, duration: 20 } },
          { id: 'ssr_sea_maelstrom', name: '대소용돌이', nameKey: 'heroes.ssr_sea_ruler.skills.maelstrom.name', description: '모든 적을 중앙으로 끌어당기며 ATK×5 피해', descriptionKey: 'heroes.ssr_sea_ruler.skills.maelstrom.desc', color: '#1e40af', isShared: false, cost: 1500 },
          { id: 'ssr_sea_eye_of_storm', name: '심연의 눈', nameKey: 'heroes.ssr_sea_ruler.skills.eye_of_storm.name', description: '심연의 눈 소환: 20초간 전장 전체 적 지속 피해 및 침묵', descriptionKey: 'heroes.ssr_sea_ruler.skills.eye_of_storm.desc', color: '#1e3a8a', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1000, atk: 75, def: 45, spd: 3, attackRange: 800 }, color: '#0284c7',
  },
  {
    id: 'ssr_arch_angel', name: '대천사', nameKey: 'heroes.ssr_arch_angel.name', grade: 'LR', role: 'healer', raceName: '드레나이', elementName: '빛', starRating: 1,
    lore: '천공의 성채에서 내려온 신성한 존재.', loreKey: 'heroes.ssr_arch_angel.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'arch_angel_holy', name: '신성', nameKey: 'heroes.ssr_arch_angel.routes.arch_angel_holy.name', color: '#fbbf24', role: 'healer',
        uniqueVariant: { name: '성스러운 가호', nameKey: 'heroes.ssr_arch_angel.routes.arch_angel_holy.variantName', descriptionTemplate: '아군 사망 시 {value}% 확률로 즉시 부활 및 치유량 증가.', descriptionTemplateKey: 'heroes.ssr_arch_angel.routes.arch_angel_holy.variantDesc' },
        skills: [
          { id: 'ssr_angel_holy_light', name: '천상의 빛', nameKey: 'heroes.ssr_arch_angel.skills.holy_light.name', description: '가장 낮은 HP 아군 즉시 완전 회복', descriptionKey: 'heroes.ssr_arch_angel.skills.holy_light.desc', color: '#fef08a', isShared: false, cost: 500 },
          { id: 'ssr_angel_hymn', name: '신성한 찬가', nameKey: 'heroes.ssr_arch_angel.skills.hymn.name', description: '15초간 매초 아군 전체 HP 5% 회복', descriptionKey: 'heroes.ssr_arch_angel.skills.hymn.desc', color: '#fde68a', isShared: false, cost: 800 },
          { id: 'ssr_angel_salvation', name: '구원', nameKey: 'heroes.ssr_arch_angel.skills.salvation.name', description: '사망 아군 전원 HP 100% 부활 (판당 1회)', descriptionKey: 'heroes.ssr_arch_angel.skills.salvation.desc', color: '#fbbf24', isShared: false, cost: 1200 },
          { id: 'ssr_angel_shield', name: '신의 권능: 보호막', nameKey: 'heroes.ssr_arch_angel.skills.shield.name', description: '아군 전체에게 거대 보호막 부여', descriptionKey: 'heroes.ssr_arch_angel.skills.shield.desc', color: '#d97706', isShared: false, cost: 1500 },
          { id: 'ssr_angel_absolute_salvation', name: '신성한 구원', nameKey: 'heroes.ssr_arch_angel.skills.absolute_salvation.name', description: '30초간 아군 전체 무적 + 완전 회복', descriptionKey: 'heroes.ssr_arch_angel.skills.absolute_salvation.desc', color: '#a16207', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'arch_angel_judgement', name: '심판', nameKey: 'heroes.ssr_arch_angel.routes.arch_angel_judgement.name', color: '#ea580c', role: 'ranged_dps',
        uniqueVariant: { name: '빛의 심판', nameKey: 'heroes.ssr_arch_angel.routes.arch_angel_judgement.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상에게 신성 폭발 발생.', descriptionTemplateKey: 'heroes.ssr_arch_angel.routes.arch_angel_judgement.variantDesc' },
        skills: [
          { id: 'ssr_angel_arrow', name: '천상의 화살', nameKey: 'heroes.ssr_arch_angel.skills.arrow.name', description: '단일 대상 ATK×6 신성 피해', descriptionKey: 'heroes.ssr_arch_angel.skills.arrow.desc', color: '#fdba74', isShared: false, cost: 500 },
          { id: 'ssr_angel_blade', name: '심판의 칼날', nameKey: 'heroes.ssr_arch_angel.skills.blade.name', description: '적 3명에게 신성 칼날 투척 ATK×4', descriptionKey: 'heroes.ssr_arch_angel.skills.blade.desc', color: '#f97316', isShared: false, cost: 800 },
          { id: 'ssr_angel_burst', name: '빛의 분출', nameKey: 'heroes.ssr_arch_angel.skills.burst.name', description: '타겟 주위 광역 ATK×5 신성 피해', descriptionKey: 'heroes.ssr_arch_angel.skills.burst.desc', color: '#ea580c', isShared: false, cost: 1200 },
          { id: 'ssr_angel_wings', name: '응징의 날개', nameKey: 'heroes.ssr_arch_angel.skills.wings.name', description: '20초간 공격력 2배 및 모든 공격 광역화', descriptionKey: 'heroes.ssr_arch_angel.skills.wings.desc', color: '#c2410c', isShared: false, cost: 1500 },
          { id: 'ssr_angel_judgement_day', name: '심판의 날', nameKey: 'heroes.ssr_arch_angel.skills.judgement_day.name', description: '모든 적에게 ATK 1500% 신성 피해 및 정화', descriptionKey: 'heroes.ssr_arch_angel.skills.judgement_day.desc', color: '#7c2d12', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1200, atk: 60, def: 60, spd: 3, attackRange: 1000 }, color: '#fbbf24',
  },
  {
    id: 'ssr_demon_lord', name: '파멸의 악마군주', nameKey: 'heroes.ssr_demon_lord.name', grade: 'LR', role: 'melee_dps', raceName: '악마', elementName: '화염', starRating: 1,
    lore: '균열을 넘어온 지옥의 사령관. 불타는 군단을 지휘하며 적의 영혼을 파괴한다.', loreKey: 'heroes.ssr_demon_lord.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'demon_lord_chaos', name: '파멸', nameKey: 'heroes.ssr_demon_lord.routes.demon_lord_chaos.name', color: '#9f1239', role: 'melee_dps',
        uniqueVariant: { name: '혼돈의 일격', nameKey: 'heroes.ssr_demon_lord.routes.demon_lord_chaos.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상에게 3배 피해.', descriptionTemplateKey: 'heroes.ssr_demon_lord.routes.demon_lord_chaos.variantDesc' },
        skills: [
          { id: 'ssr_demon_fel_strike', name: '지옥 베기', nameKey: 'heroes.ssr_demon_lord.skills.fel_strike.name', description: '전방 모든 적에게 ATK×5 화염 피해', descriptionKey: 'heroes.ssr_demon_lord.skills.fel_strike.desc', color: '#f43f5e', isShared: false, cost: 500 },
          { id: 'ssr_demon_summon_infernal', name: '지옥불 정령 소환', nameKey: 'heroes.ssr_demon_lord.skills.summon_infernal.name', description: '지옥불 정령 소환 (25초, 탱커)', descriptionKey: 'heroes.ssr_demon_lord.skills.summon_infernal.desc', color: '#e11d48', isShared: false, cost: 800,
            summonStats: { displayName: '지옥불 정령', displayNameKey: 'heroes.ssr_demon_lord.summons.infernal.name', hp: 1200, atk: 100, def: 60, spd: 2, role: 'tank', attackRange: 60, duration: 25 } },
          { id: 'ssr_demon_chaos_aura', name: '혼돈의 오라', nameKey: 'heroes.ssr_demon_lord.skills.chaos_aura.name', description: '패시브: 주변 적 이동속도 30% 감소 및 지속 피해', descriptionKey: 'heroes.ssr_demon_lord.skills.chaos_aura.desc', color: '#9f1239', isShared: false, cost: 1200 },
          { id: 'ssr_demon_soul_rend', name: '영혼 분쇄', nameKey: 'heroes.ssr_demon_lord.skills.soul_rend.name', description: '단일 대상 ATK×10 암흑 피해 + 5초간 받는 피해 증가', descriptionKey: 'heroes.ssr_demon_lord.skills.soul_rend.desc', color: '#881337', isShared: false, cost: 1500 },
          { id: 'ssr_demon_world_ender', name: '세계의 종말', nameKey: 'heroes.ssr_demon_lord.skills.world_ender.name', description: '전장 전체 거대 폭발 ATK×15 피해', descriptionKey: 'heroes.ssr_demon_lord.skills.world_ender.desc', color: '#4c0519', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'demon_lord_summon', name: '군주', nameKey: 'heroes.ssr_demon_lord.routes.demon_lord_summon.name', color: '#4c0519', role: 'melee_dps',
        uniqueVariant: { name: '악마의 권능', nameKey: 'heroes.ssr_demon_lord.routes.demon_lord_summon.variantName', descriptionTemplate: '소환수가 소환된 동안 자신의 공격속도 {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_demon_lord.routes.demon_lord_summon.variantDesc' },
        skills: [
          { id: 'ssr_demon_summon_imp', name: '임프 무리', nameKey: 'heroes.ssr_demon_lord.skills.summon_imp.name', description: '임프 5마리 즉시 소환 (원딜)', descriptionKey: 'heroes.ssr_demon_lord.skills.summon_imp.desc', color: '#fda4af', isShared: false, cost: 500,
            summonStats: { displayName: '지옥 임프', displayNameKey: 'heroes.ssr_demon_lord.summons.imp.name', hp: 200, atk: 60, def: 5, spd: 3, role: 'ranged_dps', attackRange: 500, duration: 20 } },
          { id: 'ssr_demon_fel_guard', name: '지옥수호병', nameKey: 'heroes.ssr_demon_lord.skills.fel_guard.name', description: '강력한 지옥수호병 1명 소환 (상시)', descriptionKey: 'heroes.ssr_demon_lord.skills.fel_guard.desc', color: '#f43f5e', isShared: false, cost: 800,
            summonStats: { displayName: '지옥수호병', displayNameKey: 'heroes.ssr_demon_lord.summons.guardian.name', hp: 800, atk: 150, def: 40, spd: 4, role: 'melee_dps', attackRange: 45, duration: 0 } },
          { id: 'ssr_demon_demonic_empowerment', name: '악마 강화', nameKey: 'heroes.ssr_demon_lord.skills.demonic_empowerment.name', description: '15초간 소환수들의 공격력 2배 증가', descriptionKey: 'heroes.ssr_demon_lord.skills.demonic_empowerment.desc', color: '#e11d48', isShared: false, cost: 1200 },
          { id: 'ssr_demon_portal', name: '관문 개방', nameKey: 'heroes.ssr_demon_lord.skills.portal.name', description: '무작위 악마들이 쏟아져 나오는 관문 소환', descriptionKey: 'heroes.ssr_demon_lord.skills.portal.desc', color: '#9f1239', isShared: false, cost: 1500 },
          { id: 'ssr_demon_legion_commander', name: '군단의 지휘관', nameKey: 'heroes.ssr_demon_lord.skills.legion_commander.name', description: '10명의 정예 악마 병사 소환 및 전격 돌격', descriptionKey: 'heroes.ssr_demon_lord.skills.legion_commander.desc', color: '#4c0519', isShared: false, cost: 3000, isFinal: true,
            summonStats: { displayName: '정예 악마병', displayNameKey: 'heroes.ssr_demon_lord.summons.elite_demon.name', hp: 400, atk: 100, def: 20, spd: 5, role: 'melee_dps', attackRange: 45, duration: 15 } },
        ],
      },
    ],
    baseStats: { hp: 1800, atk: 180, def: 60, spd: 4, attackRange: 50 }, color: '#9f1239',
  },
  {
    id: 'ssr_dragon_aspect', name: '고대 드래곤 위상', nameKey: 'heroes.ssr_dragon_aspect.name', grade: 'LR', role: 'ranged_dps', raceName: '드렉티르', elementName: '용', starRating: 1,
    lore: '용의 탑 정점에 군림하는 태초의 용.', loreKey: 'heroes.ssr_dragon_aspect.lore',
    uniqueSkill: { baseValues: [50, 100, 150, 200, 300], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'dragon_god_time', name: '시간', nameKey: 'heroes.ssr_dragon_aspect.routes.dragon_god_time.name', color: '#a855f7', role: 'cc',
        uniqueVariant: { name: '시간의 지배자', nameKey: 'heroes.ssr_dragon_aspect.routes.dragon_god_time.variantName', descriptionTemplate: '스킬 사용 시 {value}% 확률로 적들의 시간을 정지시킵니다.', descriptionTemplateKey: 'heroes.ssr_dragon_aspect.routes.dragon_god_time.variantDesc' },
        skills: [
          { id: 'ssr_dragon_breath_time', name: '오색 숨결', nameKey: 'heroes.ssr_dragon_aspect.skills.breath_time.name', description: '5가지 속성의 복합 브레스 발사 (광역)', descriptionKey: 'heroes.ssr_dragon_aspect.skills.breath_time.desc', color: '#ef4444', isShared: false, cost: 500 },
          { id: 'ssr_dragon_time_warp', name: '시간 왜곡', nameKey: 'heroes.ssr_dragon_aspect.skills.time_warp.name', description: '전장의 적들을 10초간 80% 슬로우', descriptionKey: 'heroes.ssr_dragon_aspect.skills.time_warp.desc', color: '#c084fc', isShared: false, cost: 800 },
          { id: 'ssr_dragon_sand_trap', name: '모래 늪', nameKey: 'heroes.ssr_dragon_aspect.skills.sand_trap.name', description: '지정 위치 적들을 끌어당기고 속박', descriptionKey: 'heroes.ssr_dragon_aspect.skills.sand_trap.desc', color: '#9333ea', isShared: false, cost: 1200 },
          { id: 'ssr_dragon_rewind', name: '시간 역행', nameKey: 'heroes.ssr_dragon_aspect.skills.rewind.name', description: '아군 전체 스킬 쿨타임 50% 단축', descriptionKey: 'heroes.ssr_dragon_aspect.skills.rewind.desc', color: '#7e22ce', isShared: false, cost: 1500 },
          { id: 'ssr_dragon_time_stop', name: '시간 정지', nameKey: 'heroes.ssr_dragon_aspect.skills.time_stop.name', description: '모든 적 8초간 완전 정지', descriptionKey: 'heroes.ssr_dragon_aspect.skills.time_stop.desc', color: '#6b21a8', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'dragon_god_fire', name: '파괴', nameKey: 'heroes.ssr_dragon_aspect.routes.dragon_god_fire.name', color: '#dc2626', role: 'ranged_dps',
        uniqueVariant: { name: '대격변', nameKey: 'heroes.ssr_dragon_aspect.routes.dragon_god_fire.variantName', descriptionTemplate: '공격 시 {value}% 확률로 추가 화염 폭발 발생.', descriptionTemplateKey: 'heroes.ssr_dragon_aspect.routes.dragon_god_fire.variantDesc' },
        skills: [
          { id: 'ssr_dragon_fire_breath', name: '불타는 숨결', nameKey: 'heroes.ssr_dragon_aspect.skills.fire_breath.name', description: '전방 넓은 범위 ATK×10 화염 피해', descriptionKey: 'heroes.ssr_dragon_aspect.skills.fire_breath.desc', color: '#f97316', isShared: false, cost: 500 },
          { id: 'ssr_dragon_magic_spark', name: '마력의 불꽃', nameKey: 'heroes.ssr_dragon_aspect.skills.magic_spark.name', description: '적 5명에게 전이되는 불꽃 탄환 발사', descriptionKey: 'heroes.ssr_dragon_aspect.skills.magic_spark.desc', color: '#ef4444', isShared: false, cost: 800 },
          { id: 'ssr_dragon_aspect_rage', name: '용의 분노', nameKey: 'heroes.ssr_dragon_aspect.skills.aspect_rage.name', description: '15초간 자신의 공격력 2배 증가', descriptionKey: 'heroes.ssr_dragon_aspect.skills.aspect_rage.desc', color: '#dc2626', isShared: false, cost: 1200 },
          { id: 'ssr_dragon_upheaval', name: '지각 변동', nameKey: 'heroes.ssr_dragon_aspect.skills.upheaval.name', description: '지면을 들어올려 전장 전체 ATK×8 피해+기절', descriptionKey: 'heroes.ssr_dragon_aspect.skills.upheaval.desc', color: '#b91c1c', isShared: false, cost: 1500 },
          { id: 'ssr_dragon_cataclysm', name: '대격변', nameKey: 'heroes.ssr_dragon_aspect.skills.cataclysm.name', description: '전장을 완전히 불태워 모든 적 소멸 (보스 피해 2000%)', descriptionKey: 'heroes.ssr_dragon_aspect.skills.cataclysm.desc', color: '#7f1d1d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 3000, atk: 250, def: 120, spd: 3, attackRange: 2000 }, color: '#dc2626',
  },
  // ── 메카닉 영웅 ──────────────────────────────────────────────
  // 메카닉 시스템: 직접 공격 없음, 포탑(벽 위)이 딜, 메카닉은 포탑·벽 수리 전담
  {
    id: 'scrapbom', name: '스크랩봄', nameKey: 'heroes.scrapbom.name', grade: 'SR', role: 'mechanic',
    raceName: '고블린', elementName: '화염', starRating: 1,
    lore: '고철과 화약으로 빚은 화염 포탑을 벽 위에 고정하는 고블린 엔지니어. 포탑이 전선을 지키는 동안 자신은 포탑과 벽 수리에만 집중한다.', loreKey: 'heroes.scrapbom.lore',
    uniqueSkill: { baseValues: [0, 10, 20, 35, 55], unit: '%' }, // 포탑 ATK 보너스 (성급당)
    starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      {
        id: 'scrapbom_turret', name: '포탑강화', nameKey: 'heroes.scrapbom.routes.turret.name', color: '#f97316', role: 'mechanic',
        uniqueVariant: { 
          name: '화염 포탑 마스터', nameKey: 'heroes.scrapbom.routes.turret.variantName',
          descriptionTemplate: '포탑 공격력 성급당 {value}% 추가 증가.', descriptionTemplateKey: 'heroes.scrapbom.routes.turret.variantDesc'
        },
        skills: [
          { id: 'scrapbom_overcharge', name: '과부하 탄약', nameKey: 'heroes.scrapbom.skills.overcharge.name', description: '포탑 공격력 +30%', descriptionKey: 'heroes.scrapbom.skills.overcharge.desc', color: '#f97316', isShared: false, cost: 200 },
          { id: 'scrapbom_turret_armor', name: '중장갑 코팅', nameKey: 'heroes.scrapbom.skills.turret_armor.name', description: '포탑 방어력 +40, HP +30%', descriptionKey: 'heroes.scrapbom.skills.turret_armor.desc', color: '#ea580c', isShared: false, cost: 350 },
          { id: 'scrapbom_splash', name: '폭발 확산탄', nameKey: 'heroes.scrapbom.skills.splash.name', description: '포탑 공격이 반경 80px 광역 화염 피해 적용', descriptionKey: 'heroes.scrapbom.skills.splash.desc', color: '#c2410c', isShared: false, cost: 500 },
          { id: 'scrapbom_multi_turret', name: '다중 포탑', nameKey: 'heroes.scrapbom.skills.multi_turret.name', description: '화염 포탑 1기 추가 소환 (총 2기 상시 유지)', descriptionKey: 'heroes.scrapbom.skills.multi_turret.desc', color: '#7c2d12', isShared: false, cost: 1200, isFinal: true },
        ],
      },
      {
        id: 'scrapbom_heal', name: '힐강화', nameKey: 'heroes.scrapbom.routes.heal.name', color: '#06b6d4', role: 'mechanic',
        uniqueVariant: { 
          name: '긴급 수리 시스템', nameKey: 'heroes.scrapbom.routes.heal.variantName',
          descriptionTemplate: '포탑/벽 수리량 성급당 {value}% 추가 증가.', descriptionTemplateKey: 'heroes.scrapbom.routes.heal.variantDesc'
        },
        skills: [
          { id: 'scrapbom_fast_repair', name: '급속 수리', nameKey: 'heroes.scrapbom.skills.fast_repair.name', description: '수리 쿨다운 1초 단축 (3초→2초)', descriptionKey: 'heroes.scrapbom.skills.fast_repair.desc', color: '#22d3ee', isShared: false, cost: 200 },
          { id: 'scrapbom_repair_amp', name: '수리 증폭', nameKey: 'heroes.scrapbom.skills.repair_amp.name', description: '포탑/벽 수리량 +40%', descriptionKey: 'heroes.scrapbom.skills.repair_amp.desc', color: '#0891b2', isShared: false, cost: 350 },
          { id: 'scrapbom_emergency_repair', name: '긴급 재건', nameKey: 'heroes.scrapbom.skills.emergency_repair.name', description: 'HP 30% 이하 포탑/벽 수리 시 2배 수리', descriptionKey: 'heroes.scrapbom.skills.emergency_repair.desc', color: '#0e7490', isShared: false, cost: 500 },
          { id: 'scrapbom_fortress', name: '요새화', nameKey: 'heroes.scrapbom.skills.fortress.name', description: '수리 후 5초간 포탑·벽 방어력 +60', descriptionKey: 'heroes.scrapbom.skills.fortress.desc', color: '#164e63', isShared: false, cost: 1200, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 520, atk: 95, def: 22, spd: 2.5, attackRange: 0 },
    color: '#f97316',
  },
  {
    id: 'coilzak', name: '코일젝', nameKey: 'heroes.coilzak.name', grade: 'SR', role: 'mechanic',
    raceName: '노움', elementName: '번개', starRating: 1,
    lore: '번개 코일을 달아 만든 전격 포탑을 벽에 고정하는 노움 발명가. 포탑이 전장을 지배하는 동안 자신은 포탑과 벽을 끊임없이 수리한다.', loreKey: 'heroes.coilzak.lore',
    uniqueSkill: { baseValues: [0, 10, 20, 35, 55], unit: '%' }, // 포탑 ATK 보너스 (성급당)
    starUpgradeCosts: [200, 500, 1000, 3000],
    classRoutes: [
      {
        id: 'coilzak_turret', name: '포탑강화', nameKey: 'heroes.coilzak.routes.turret.name', color: '#eab308', role: 'mechanic',
        uniqueVariant: { 
          name: '전격 포탑 마스터', nameKey: 'heroes.coilzak.routes.turret.variantName',
          descriptionTemplate: '포탑 공격력 성급당 {value}% 추가 증가.', descriptionTemplateKey: 'heroes.coilzak.routes.turret.variantDesc'
        },
        skills: [
          { id: 'coilzak_overvolt', name: '과전압 코일', nameKey: 'heroes.coilzak.skills.overvolt.name', description: '포탑 공격력 +30%', descriptionKey: 'heroes.coilzak.skills.overvolt.desc', color: '#facc15', isShared: false, cost: 200 },
          { id: 'coilzak_range_amp', name: '사거리 확장', nameKey: 'heroes.coilzak.skills.range_amp.name', description: '포탑 사거리 +250px', descriptionKey: 'heroes.coilzak.skills.range_amp.desc', color: '#eab308', isShared: false, cost: 350 },
          { id: 'coilzak_chain_lightning', name: '연쇄 전격', nameKey: 'heroes.coilzak.skills.chain_lightning.name', description: '포탑 공격이 2명 추가 적에게 연쇄 피해', descriptionKey: 'heroes.coilzak.skills.chain_lightning.desc', color: '#ca8a04', isShared: false, cost: 500 },
          { id: 'coilzak_triple_turret', name: '다중 포탑 폭풍', nameKey: 'heroes.coilzak.skills.triple_turret.name', description: '번개 포탑 2기 추가 소환 (총 3기 상시 유지)', descriptionKey: 'heroes.coilzak.skills.triple_turret.desc', color: '#854d0e', isShared: false, cost: 1200, isFinal: true },
        ],
      },
      {
        id: 'coilzak_heal', name: '힐강화', nameKey: 'heroes.coilzak.routes.heal.name', color: '#06b6d4', role: 'mechanic',
        uniqueVariant: { 
          name: '엔지니어링 마스터리', nameKey: 'heroes.coilzak.routes.heal.variantName',
          descriptionTemplate: '포탑/벽 수리량 성급당 {value}% 추가 증가.', descriptionTemplateKey: 'heroes.coilzak.routes.heal.variantDesc'
        },
        skills: [
          { id: 'coilzak_drone', name: '수리 드론', nameKey: 'heroes.coilzak.skills.drone.name', description: '패시브: 4초마다 벽 자동 소량 수리', descriptionKey: 'heroes.coilzak.skills.drone.desc', color: '#22d3ee', isShared: false, cost: 200 },
          { id: 'coilzak_barrier_charge', name: '방어막 충전', nameKey: 'heroes.coilzak.skills.barrier_charge.name', description: '수리 시 포탑에 소형 보호막 부여', descriptionKey: 'heroes.coilzak.skills.barrier_charge.desc', color: '#0891b2', isShared: false, cost: 350 },
          { id: 'coilzak_mastery', name: '엔지니어링 마스터리', nameKey: 'heroes.coilzak.skills.mastery.name', description: '포탑/벽 수리량 +40%', descriptionKey: 'heroes.coilzak.skills.mastery.desc', color: '#0e7490', isShared: false, cost: 500 },
          { id: 'coilzak_auto_rebuild', name: '자동 재건 시스템', nameKey: 'heroes.coilzak.skills.auto_rebuild.name', description: '포탑 파괴 즉시 재건, 수리 쿨타임 -2초', descriptionKey: 'heroes.coilzak.skills.auto_rebuild.desc', color: '#164e63', isShared: false, cost: 1200, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 480, atk: 88, def: 18, spd: 2.8, attackRange: 0 },
    color: '#06b6d4',
  },
  // ── 조합 업적 보상 AR 영웅 (25인) ──────────────────────────────────────
  // 역할 전문화 6인
  {
    id: 'ssr_iron_guardian', name: '아이언가더', nameKey: 'heroes.ssr_iron_guardian.name', grade: 'AR', role: 'tank', raceName: '인간', elementName: '빛', starRating: 1,
    lore: '전장에서 결코 쓰러지지 않는 불멸의 수호자. 그의 방패는 아군을 지키는 가장 견고한 성벽이다.', loreKey: 'heroes.ssr_iron_guardian.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'iron_guardian_bulwark', name: '철벽', nameKey: 'heroes.ssr_iron_guardian.routes.iron_guardian_bulwark.name', color: '#6366f1', role: 'tank',
        uniqueVariant: { name: '불굴', nameKey: 'heroes.ssr_iron_guardian.routes.iron_guardian_bulwark.variantName', descriptionTemplate: '받는 피해 {value}% 감소 및 방어력 증가.', descriptionTemplateKey: 'heroes.ssr_iron_guardian.routes.iron_guardian_bulwark.variantDesc' },
        skills: [
          { id: 'ig_shield_blast', name: '방패 폭발', nameKey: 'heroes.ssr_iron_guardian.skills.shield_blast.name', description: '주변 120px 적 ATK×4 피해 및 2초 기절', descriptionKey: 'heroes.ssr_iron_guardian.skills.shield_blast.desc', color: '#818cf8', isShared: false, cost: 500 },
          { id: 'ig_iron_skin', name: '철벽 갑옷', nameKey: 'heroes.ssr_iron_guardian.skills.iron_skin.name', description: '10초간 받는 피해 50% 감소 및 DEF +50', descriptionKey: 'heroes.ssr_iron_guardian.skills.iron_skin.desc', color: '#6366f1', isShared: false, cost: 800 },
          { id: 'ig_taunt_cry', name: '도전의 함성', nameKey: 'heroes.ssr_iron_guardian.skills.taunt_cry.name', description: '모든 적 어그로 집중 + 5초간 무적', descriptionKey: 'heroes.ssr_iron_guardian.skills.taunt_cry.desc', color: '#4f46e5', isShared: false, cost: 1200 },
          { id: 'ig_guardian_aura', name: '수호의 오라', nameKey: 'heroes.ssr_iron_guardian.skills.guardian_aura.name', description: '패시브: 주변 아군 방어력 +30', descriptionKey: 'heroes.ssr_iron_guardian.skills.guardian_aura.desc', color: '#4338ca', isShared: false, cost: 1500 },
          { id: 'ig_indomitable', name: '불굴의 수호자', nameKey: 'heroes.ssr_iron_guardian.skills.indomitable.name', description: 'HP 1 이하로 내려가지 않음 10초 + 전장 광역 격파', descriptionKey: 'heroes.ssr_iron_guardian.skills.indomitable.desc', color: '#3730a3', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'iron_guardian_justice', name: '응징', nameKey: 'heroes.ssr_iron_guardian.routes.iron_guardian_justice.name', color: '#f59e0b', role: 'melee_dps',
        uniqueVariant: { name: '징벌의 방패', nameKey: 'heroes.ssr_iron_guardian.routes.iron_guardian_justice.variantName', descriptionTemplate: '방어력의 {value}% 만큼 공격력이 추가로 증가합니다.', descriptionTemplateKey: 'heroes.ssr_iron_guardian.routes.iron_guardian_justice.variantDesc' },
        skills: [
          { id: 'ig_justice_strike', name: '정의의 일격', nameKey: 'heroes.ssr_iron_guardian.skills.justice_strike.name', description: '단일 ATK×8 신성 피해', descriptionKey: 'heroes.ssr_iron_guardian.skills.justice_strike.desc', color: '#fbbf24', isShared: false, cost: 500 },
          { id: 'ig_holy_shield_throw', name: '성스러운 방패', nameKey: 'heroes.ssr_iron_guardian.skills.holy_shield_throw.name', description: '적 3명에게 튕기는 방패 투척 ATK×5', descriptionKey: 'heroes.ssr_iron_guardian.skills.holy_shield_throw.desc', color: '#f59e0b', isShared: false, cost: 800 },
          { id: 'ig_retribution_aura', name: '응징의 오라', nameKey: 'heroes.ssr_iron_guardian.skills.retribution_aura.name', description: '아군 피격 시 공격자에게 ATK 50% 반격', descriptionKey: 'heroes.ssr_iron_guardian.skills.retribution_aura.desc', color: '#d97706', isShared: false, cost: 1200 },
          { id: 'ig_consecration', name: '신성한 대지', nameKey: 'heroes.ssr_iron_guardian.skills.consecration.name', description: '바닥에 신성한 지대를 깔아 지속 피해', descriptionKey: 'heroes.ssr_iron_guardian.skills.consecration.desc', color: '#b45309', isShared: false, cost: 1500 },
          { id: 'ig_avenging_wrath', name: '응징의 격노', nameKey: 'heroes.ssr_iron_guardian.skills.avenging_wrath.name', description: '20초간 공격력 2배 및 모든 공격이 폭발', descriptionKey: 'heroes.ssr_iron_guardian.skills.avenging_wrath.desc', color: '#7c2d12', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 2500, atk: 85, def: 130, spd: 2.5, attackRange: 55 }, color: '#6366f1',
  },
  {
    id: 'ssr_blade_lord', name: '블레이드로드', nameKey: 'heroes.ssr_blade_lord.name', grade: 'AR', role: 'melee_dps', raceName: '언데드', elementName: '암흑', starRating: 1,
    lore: '죽음에서 태어난 무한 칼날의 군주. 그의 검무가 시작되면 적의 숨소리조차 멈춘다.', loreKey: 'heroes.ssr_blade_lord.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'blade_lord_annihilation', name: '절멸', nameKey: 'heroes.ssr_blade_lord.routes.blade_lord_annihilation.name', color: '#dc2626', role: 'melee_dps',
        uniqueVariant: { name: '암흑 연격', nameKey: 'heroes.ssr_blade_lord.routes.blade_lord_annihilation.variantName', descriptionTemplate: '공격 시 {value}% 확률로 5연타 피해를 입힙니다.', descriptionTemplateKey: 'heroes.ssr_blade_lord.routes.blade_lord_annihilation.variantDesc' },
        skills: [
          { id: 'bl_shadow_barrage', name: '그림자 연격', nameKey: 'heroes.ssr_blade_lord.skills.shadow_barrage.name', description: '적에게 ATK×2 피해 5회 연속 적용', descriptionKey: 'heroes.ssr_blade_lord.skills.shadow_barrage.desc', color: '#f87171', isShared: false, cost: 500 },
          { id: 'bl_execution_blade', name: '처형의 날', nameKey: 'heroes.ssr_blade_lord.skills.execution_blade.name', description: 'HP 30% 이하 적 즉사, 보스는 ATK×10 피해', descriptionKey: 'heroes.ssr_blade_lord.skills.execution_blade.desc', color: '#ef4444', isShared: false, cost: 800 },
          { id: 'bl_blood_aura', name: '혈오라', nameKey: 'heroes.ssr_blade_lord.skills.blood_aura.name', description: '패시브: 주변 모든 아군 피해의 20% 흡혈', descriptionKey: 'heroes.ssr_blade_lord.skills.blood_aura.desc', color: '#b91c1c', isShared: false, cost: 1200 },
          { id: 'bl_blade_dance', name: '무한의 검무', nameKey: 'heroes.ssr_blade_lord.skills.blade_dance.name', description: '적 사이를 빠르게 이동하며 ATK×6 피해', descriptionKey: 'heroes.ssr_blade_lord.skills.blade_dance.desc', color: '#991b1b', isShared: false, cost: 1500 },
          { id: 'bl_endless_slash', name: '무한 베기', nameKey: 'heroes.ssr_blade_lord.skills.endless_slash.name', description: '10초간 공격 쿨다운 0, 모든 피해 2.5배', descriptionKey: 'heroes.ssr_blade_lord.skills.endless_slash.desc', color: '#7f1d1d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'blade_lord_reaper', name: '사신', nameKey: 'heroes.ssr_blade_lord.routes.blade_lord_reaper.name', color: '#1e293b', role: 'melee_dps',
        uniqueVariant: { name: '영혼 수확', nameKey: 'heroes.ssr_blade_lord.routes.blade_lord_reaper.variantName', descriptionTemplate: '적 처치 시 {value}% 확률로 공격력 영구 +1 (최대 200).', descriptionTemplateKey: 'heroes.ssr_blade_lord.routes.blade_lord_reaper.variantDesc' },
        skills: [
          { id: 'bl_soul_reap', name: '영혼 수확', nameKey: 'heroes.ssr_blade_lord.skills.soul_reap.name', description: '단일 ATK×12 암흑 피해', descriptionKey: 'heroes.ssr_blade_lord.skills.soul_reap.desc', color: '#475569', isShared: false, cost: 500 },
          { id: 'bl_death_grip_bl', name: '죽음의 손길', nameKey: 'heroes.ssr_blade_lord.skills.death_grip.name', description: '적 1명을 끌어당겨 3초간 속박', descriptionKey: 'heroes.ssr_blade_lord.skills.death_grip.desc', color: '#334155', isShared: false, cost: 800 },
          { id: 'bl_fear_shout', name: '공포의 포효', nameKey: 'heroes.ssr_blade_lord.skills.fear_shout.name', description: '주변 모든 적 4초간 공포 상태', descriptionKey: 'heroes.ssr_blade_lord.skills.fear_shout.desc', color: '#1e293b', isShared: false, cost: 1200 },
          { id: 'bl_summon_specter', name: '망령의 부름', nameKey: 'heroes.ssr_blade_lord.skills.summon_specter.name', description: '자신의 그림자를 망령으로 소환 (상시)', descriptionKey: 'heroes.ssr_blade_lord.skills.summon_specter.desc', color: '#0f172a', isShared: false, cost: 1500,
            summonStats: { displayName: '칼날 망령', displayNameKey: 'heroes.ssr_blade_lord.summons.blade_wraith.name', hp: 500, atk: 150, def: 20, spd: 5, role: 'melee_dps', attackRange: 45, duration: 0 } },
          { id: 'bl_reapers_toll', name: '사신의 종소리', nameKey: 'heroes.ssr_blade_lord.skills.reapers_toll.name', description: '전장 전체 적에게 ATK×20 암흑 피해', descriptionKey: 'heroes.ssr_blade_lord.skills.reapers_toll.desc', color: '#020617', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1500, atk: 250, def: 45, spd: 5.5, attackRange: 50 }, color: '#dc2626',
  },
  {
    id: 'ssr_golden_archer', name: '황금 사수', nameKey: 'heroes.ssr_golden_archer.name', grade: 'AR', role: 'ranged_dps', raceName: '인간', elementName: '빛', starRating: 1,
    lore: '빗나가지 않는 황금 화살의 전설적인 궁수. 그의 화살은 하늘조차 꿰뚫는다.', loreKey: 'heroes.ssr_golden_archer.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'golden_archer_marksman', name: '황금사격', nameKey: 'heroes.ssr_golden_archer.routes.golden_archer_marksman.name', color: '#f59e0b', role: 'ranged_dps',
        uniqueVariant: { name: '황금 화살', nameKey: 'heroes.ssr_golden_archer.routes.golden_archer_marksman.variantName', descriptionTemplate: '공격이 빗나가지 않으며 피해 {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_golden_archer.routes.golden_archer_marksman.variantDesc' },
        skills: [
          { id: 'ga_golden_arrow', name: '황금 화살', nameKey: 'heroes.ssr_golden_archer.skills.golden_arrow.name', description: '단일 ATK×10 빛 피해 및 3초 기절', descriptionKey: 'heroes.ssr_golden_archer.skills.golden_arrow.desc', color: '#fde68a', isShared: false, cost: 500 },
          { id: 'ga_rapid_fire', name: '황금 연사', nameKey: 'heroes.ssr_golden_archer.skills.rapid_fire.name', description: '10초간 공격속도 3배 증가', descriptionKey: 'heroes.ssr_golden_archer.skills.rapid_fire.desc', color: '#fbbf24', isShared: false, cost: 800 },
          { id: 'ga_eagle_eye', name: '독수리의 눈', nameKey: 'heroes.ssr_golden_archer.skills.eagle_eye.name', description: '패시브: 사거리 무한, 관통 투사체 3발 발사', descriptionKey: 'heroes.ssr_golden_archer.skills.eagle_eye.desc', color: '#d97706', isShared: false, cost: 1200 },
          { id: 'ga_star_shot', name: '별빛 사격', nameKey: 'heroes.ssr_golden_archer.skills.star_shot.name', description: '타겟 주위 모든 적에게 ATK×6 폭발 피해', descriptionKey: 'heroes.ssr_golden_archer.skills.star_shot.desc', color: '#b45309', isShared: false, cost: 1500 },
          { id: 'ga_golden_shower', name: '황금 소나기', nameKey: 'heroes.ssr_golden_archer.skills.golden_shower.name', description: '전장 전체에 황금 화살 100발 난사 ATK×15', descriptionKey: 'heroes.ssr_golden_archer.skills.golden_shower.desc', color: '#92400e', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'golden_archer_beast', name: '야수', nameKey: 'heroes.ssr_golden_archer.routes.golden_archer_beast.name', color: '#16a34a', role: 'ranged_dps',
        uniqueVariant: { name: '황금 유대', nameKey: 'heroes.ssr_golden_archer.routes.golden_archer_beast.variantName', descriptionTemplate: '소환된 야수의 공격력이 자신의 공격력의 {value}% 만큼 증가.', descriptionTemplateKey: 'heroes.ssr_golden_archer.routes.golden_archer_beast.variantDesc' },
        skills: [
          { id: 'ga_summon_griffin', name: '황금 그리핀', nameKey: 'heroes.ssr_golden_archer.skills.summon_griffin.name', description: '그리핀 소환 (상시 원딜)', descriptionKey: 'heroes.ssr_golden_archer.skills.summon_griffin.desc', color: '#4ade80', isShared: false, cost: 500,
            summonStats: { displayName: '황금 그리핀', displayNameKey: 'heroes.ssr_golden_archer.summons.griffin.name', hp: 600, atk: 180, def: 30, spd: 4, role: 'ranged_dps', attackRange: 600, duration: 0 } },
          { id: 'ga_beast_wrath', name: '야수의 격노', nameKey: 'heroes.ssr_golden_archer.skills.beast_wrath.name', description: '15초간 소환수 공격력 2배 및 공속 증가', descriptionKey: 'heroes.ssr_golden_archer.skills.beast_wrath.desc', color: '#22c55e', isShared: false, cost: 800 },
          { id: 'ga_serpent_sting', name: '황금 독사', nameKey: 'heroes.ssr_golden_archer.skills.serpent_sting.name', description: '적 전체 중독 및 10초간 지속 피해', descriptionKey: 'heroes.ssr_golden_archer.skills.serpent_sting.desc', color: '#16a34a', isShared: false, cost: 1200 },
          { id: 'ga_multi_shot', name: '멀티 샷', nameKey: 'heroes.ssr_golden_archer.skills.multi_shot.name', description: '한 번에 5발의 화살을 발사하여 무작위 적 공격', descriptionKey: 'heroes.ssr_golden_archer.skills.multi_shot.desc', color: '#15803d', isShared: false, cost: 1500 },
          { id: 'ga_stampede', name: '야수 무리', nameKey: 'heroes.ssr_golden_archer.skills.stampede.name', description: '무수한 야수들이 전장을 휩쓸며 ATK×12 피해', descriptionKey: 'heroes.ssr_golden_archer.skills.stampede.desc', color: '#14532d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1100, atk: 210, def: 30, spd: 3.5, attackRange: 1600 }, color: '#f59e0b',
  },
  {
    id: 'ssr_arch_priest', name: '빛의 대사제', nameKey: 'heroes.ssr_arch_priest.name', grade: 'AR', role: 'healer', raceName: '드레나이', elementName: '신성', starRating: 1,
    lore: '신의 목소리를 직접 전달하는 최고위 사제. 그의 축복 아래 죽음조차 힘을 잃는다.', loreKey: 'heroes.ssr_arch_priest.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'arch_priest_holy', name: '신성', nameKey: 'heroes.ssr_arch_priest.routes.arch_priest_holy.name', color: '#fde047', role: 'healer',
        uniqueVariant: { name: '성스러운 기적', nameKey: 'heroes.ssr_arch_priest.routes.arch_priest_holy.variantName', descriptionTemplate: '힐 시 {value}% 확률로 아군 전체에게 보호막 부여.', descriptionTemplateKey: 'heroes.ssr_arch_priest.routes.arch_priest_holy.variantDesc' },
        skills: [
          { id: 'ap_miracle_heal', name: '기적의 치유', nameKey: 'heroes.ssr_arch_priest.skills.miracle_heal.name', description: '모든 아군 즉시 HP 50% 회복', descriptionKey: 'heroes.ssr_arch_priest.skills.miracle_heal.desc', color: '#fef9c3', isShared: false, cost: 500 },
          { id: 'ap_divine_hymn', name: '신성한 찬가', nameKey: 'heroes.ssr_arch_priest.skills.divine_hymn.name', description: '20초간 매초 아군 전체 HP 5% 회복', descriptionKey: 'heroes.ssr_arch_priest.skills.divine_hymn.desc', color: '#facc15', isShared: false, cost: 800 },
          { id: 'ap_resurrection_light', name: '부활의 빛', nameKey: 'heroes.ssr_arch_priest.skills.resurrection_light.name', description: '사망 아군 전원 HP 100% 즉시 부활 (판당 1회)', descriptionKey: 'heroes.ssr_arch_priest.skills.resurrection_light.desc', color: '#eab308', isShared: false, cost: 1200 },
          { id: 'ap_guardian_spirit', name: '수호 영혼', nameKey: 'heroes.ssr_arch_priest.skills.guardian_spirit.name', description: '가장 낮은 HP 아군을 10초간 무적으로 만듬', descriptionKey: 'heroes.ssr_arch_priest.skills.guardian_spirit.desc', color: '#ca8a04', isShared: false, cost: 1500 },
          { id: 'ap_salvation', name: '신성한 구원', nameKey: 'heroes.ssr_arch_priest.skills.salvation.name', description: '30초간 아군 전체 무적 + 모든 디버프 제거 + 완전 회복', descriptionKey: 'heroes.ssr_arch_priest.skills.salvation.desc', color: '#a16207', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'arch_priest_shadow', name: '그림자', nameKey: 'heroes.ssr_arch_priest.routes.arch_priest_shadow.name', color: '#4c1d95', role: 'ranged_dps',
        uniqueVariant: { name: '어둠의 권능', nameKey: 'heroes.ssr_arch_priest.routes.arch_priest_shadow.variantName', descriptionTemplate: '공격 시 입힌 피해의 {value}% 만큼 아군 전체를 치유합니다.', descriptionTemplateKey: 'heroes.ssr_arch_priest.routes.arch_priest_shadow.variantDesc' },
        skills: [
          { id: 'ap_shadow_word_pain', name: '고통', nameKey: 'heroes.ssr_arch_priest.skills.shadow_word_pain.name', description: '강력한 암흑 DoT 및 5초간 받는 피해 30% 증가', descriptionKey: 'heroes.ssr_arch_priest.skills.shadow_word_pain.desc', color: '#7c3aed', isShared: false, cost: 500 },
          { id: 'ap_mind_blast', name: '정신 폭발', nameKey: 'heroes.ssr_arch_priest.skills.mind_blast.name', description: '단일 ATK×10 암흑 피해 + 쿨타임 초기화 확률', descriptionKey: 'heroes.ssr_arch_priest.skills.mind_blast.desc', color: '#6d28d9', isShared: false, cost: 800 },
          { id: 'ap_vampiric_touch', name: '흡혈의 손길', nameKey: 'heroes.ssr_arch_priest.skills.vampiric_touch.name', description: '패시브: 자신의 모든 공격에 30% 흡혈 효과 추가', descriptionKey: 'heroes.ssr_arch_priest.skills.vampiric_touch.desc', color: '#5b21b6', isShared: false, cost: 1200 },
          { id: 'ap_void_eruption', name: '공허 분출', nameKey: 'heroes.ssr_arch_priest.skills.void_eruption.name', description: '타겟 주변 광역 ATK×8 암흑 피해', descriptionKey: 'heroes.ssr_arch_priest.skills.void_eruption.desc', color: '#4c1d95', isShared: false, cost: 1500 },
          { id: 'ap_dark_ascension', name: '공허 승천', nameKey: 'heroes.ssr_arch_priest.skills.dark_ascension.name', description: '20초간 공격력 3배 및 모든 공격이 3개로 분산', descriptionKey: 'heroes.ssr_arch_priest.skills.dark_ascension.desc', color: '#2e1065', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1200, atk: 75, def: 70, spd: 3, attackRange: 900 }, color: '#fde047',
  },
  {
    id: 'ssr_seal_mage', name: '봉인의 술사', nameKey: 'heroes.ssr_seal_mage.name', grade: 'AR', role: 'cc', raceName: '나이트본', elementName: '비전', starRating: 1,
    lore: '고대 봉인술의 계승자. 그 앞에선 어떤 강력한 적이라도 한낱 허수아비일 뿐이다.', loreKey: 'heroes.ssr_seal_mage.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'seal_mage_seal', name: '봉인', nameKey: 'heroes.ssr_seal_mage.routes.seal_mage_seal.name', color: '#7c3aed', role: 'cc',
        uniqueVariant: { name: '완전 봉인', nameKey: 'heroes.ssr_seal_mage.routes.seal_mage_seal.variantName', descriptionTemplate: '기절 및 무력화 상태인 적에게 입히는 피해가 {value}% 증가합니다.', descriptionTemplateKey: 'heroes.ssr_seal_mage.routes.seal_mage_seal.variantDesc' },
        skills: [
          { id: 'sm_void_seal', name: '공허 봉인', nameKey: 'heroes.ssr_seal_mage.skills.void_seal.name', description: '전체 적 5초 완전 봉인(이동/공격 불가)', descriptionKey: 'heroes.ssr_seal_mage.skills.void_seal.desc', color: '#a78bfa', isShared: false, cost: 500 },
          { id: 'sm_time_warp', name: '시간 왜곡', nameKey: 'heroes.ssr_seal_mage.skills.time_warp.name', description: '적 이동속도/공격속도 90% 감소 10초', descriptionKey: 'heroes.ssr_seal_mage.skills.time_warp.desc', color: '#8b5cf6', isShared: false, cost: 800 },
          { id: 'sm_arcane_shackle', name: '비전 속박', nameKey: 'heroes.ssr_seal_mage.skills.arcane_shackle.name', description: '타겟 주변 200px 모든 적 8초 속박', descriptionKey: 'heroes.ssr_seal_mage.skills.arcane_shackle.desc', color: '#7c3aed', isShared: false, cost: 1200 },
          { id: 'sm_mass_polymorph', name: '대규모 변이', nameKey: 'heroes.ssr_seal_mage.skills.mass_polymorph.name', description: '모든 적을 10초간 양으로 변이', descriptionKey: 'heroes.ssr_seal_mage.skills.mass_polymorph.desc', color: '#6d28d9', isShared: false, cost: 1500 },
          { id: 'sm_absolute_seal', name: '무결의 봉인', nameKey: 'heroes.ssr_seal_mage.skills.absolute_seal.name', description: '가장 강한 적 1명을 영구 봉인 (보스는 60초)', descriptionKey: 'heroes.ssr_seal_mage.skills.absolute_seal.desc', color: '#4c1d95', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'seal_mage_arcane', name: '비전', nameKey: 'heroes.ssr_seal_mage.routes.seal_mage_arcane.name', color: '#3b82f6', role: 'cc',
        uniqueVariant: { name: '비전 증폭', nameKey: 'heroes.ssr_seal_mage.routes.seal_mage_arcane.variantName', descriptionTemplate: '공격 시 {value}% 확률로 쿨타임이 50% 이상 감소합니다.', descriptionTemplateKey: 'heroes.ssr_seal_mage.routes.seal_mage_arcane.variantDesc' },
        skills: [
          { id: 'sm_arcane_blast', name: '비전 작렬', nameKey: 'heroes.ssr_seal_mage.skills.arcane_blast.name', description: '단일 ATK×8 비전 피해', descriptionKey: 'heroes.ssr_seal_mage.skills.arcane_blast.desc', color: '#60a5fa', isShared: false, cost: 500 },
          { id: 'sm_arcane_missiles', name: '비전 화살', nameKey: 'heroes.ssr_seal_mage.skills.arcane_missiles.name', description: '적 1명에게 10연발 화살 발사 각 ATK×1.5', descriptionKey: 'heroes.ssr_seal_mage.skills.arcane_missiles.desc', color: '#3b82f6', isShared: false, cost: 800 },
          { id: 'sm_arcane_power', name: '신비의 마력', nameKey: 'heroes.ssr_seal_mage.skills.arcane_power.name', description: '15초간 자신의 스킬 피해 2배 증가', descriptionKey: 'heroes.ssr_seal_mage.skills.arcane_power.desc', color: '#2563eb', isShared: false, cost: 1200 },
          { id: 'sm_blink_strike', name: '점멸 타격', nameKey: 'heroes.ssr_seal_mage.skills.blink_strike.name', description: '순간이동하며 5명의 적에게 각각 ATK×6 피해', descriptionKey: 'heroes.ssr_seal_mage.skills.blink_strike.desc', color: '#1d4ed8', isShared: false, cost: 1500 },
          { id: 'sm_arcane_barrage', name: '비전의 홍수', nameKey: 'heroes.ssr_seal_mage.skills.arcane_barrage.name', description: '전장 전체 무수한 비전 화살 폭격 ATK×20', descriptionKey: 'heroes.ssr_seal_mage.skills.arcane_barrage.desc', color: '#1e3a8a', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1000, atk: 180, def: 35, spd: 3, attackRange: 1300 }, color: '#7c3aed',
  },
  {
    id: 'ssr_field_commander', name: '전장의 지휘관', nameKey: 'heroes.ssr_field_commander.name', grade: 'AR', role: 'tank', raceName: '인간', elementName: '빛', starRating: 1,
    lore: '다섯 직종을 완벽히 이해하는 전설적인 지휘관. 그의 깃발 아래 아군은 무적의 군단이 된다.', loreKey: 'heroes.ssr_field_commander.lore',
    uniqueSkill: { baseValues: [15, 22, 30, 40, 60], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'field_commander_tactic', name: '지휘', nameKey: 'heroes.ssr_field_commander.routes.field_commander_tactic.name', color: '#0ea5e9', role: 'tank',
        uniqueVariant: { name: '완벽한 편성', nameKey: 'heroes.ssr_field_commander.routes.field_commander_tactic.variantName', descriptionTemplate: '아군 전체 모든 능력치 {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_field_commander.routes.field_commander_tactic.variantDesc' },
        skills: [
          { id: 'fc_tactical_order', name: '전술 지시', nameKey: 'heroes.ssr_field_commander.skills.tactical_order.name', description: '15초간 아군 전체 공격력/방어력 50% 증가', descriptionKey: 'heroes.ssr_field_commander.skills.tactical_order.desc', color: '#7dd3fc', isShared: false, cost: 500 },
          { id: 'fc_rally', name: '방어 집결', nameKey: 'heroes.ssr_field_commander.skills.rally.name', description: '아군 전체 즉시 HP 50% 회복 및 5초 무적', descriptionKey: 'heroes.ssr_field_commander.skills.rally.desc', color: '#38bdf8', isShared: false, cost: 800 },
          { id: 'fc_combined_assault', name: '연합 공격', nameKey: 'heroes.ssr_field_commander.skills.combined_assault.name', description: '아군 전체 다음 3회 공격 ATK 5배 보장 치명타', descriptionKey: 'heroes.ssr_field_commander.skills.combined_assault.desc', color: '#0ea5e9', isShared: false, cost: 1200 },
          { id: 'fc_banner_of_victory', name: '승리의 기치', nameKey: 'heroes.ssr_field_commander.skills.banner_of_victory.name', description: '전장에 깃발 소환: 주변 아군 공속 100% 증가', descriptionKey: 'heroes.ssr_field_commander.skills.banner_of_victory.desc', color: '#0284c7', isShared: false, cost: 1500 },
          { id: 'fc_heroic_charge', name: '영웅적 돌격', nameKey: 'heroes.ssr_field_commander.skills.heroic_charge.name', description: '전군 돌격: 모든 적 ATK×15 피해 및 20초간 아군 광분', descriptionKey: 'heroes.ssr_field_commander.skills.heroic_charge.desc', color: '#0369a1', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'field_commander_bravery', name: '용맹', nameKey: 'heroes.ssr_field_commander.routes.field_commander_bravery.name', color: '#ef4444', role: 'melee_dps',
        uniqueVariant: { name: '지휘관의 용기', nameKey: 'heroes.ssr_field_commander.routes.field_commander_bravery.variantName', descriptionTemplate: '자신의 공격력 {value}% 만큼 주변 아군의 공격력이 증가합니다.', descriptionTemplateKey: 'heroes.ssr_field_commander.routes.field_commander_bravery.variantDesc' },
        skills: [
          { id: 'fc_brave_strike', name: '용맹한 일격', nameKey: 'heroes.ssr_field_commander.skills.brave_strike.name', description: '단일 ATK×12 피해 및 3초 기절', descriptionKey: 'heroes.ssr_field_commander.skills.brave_strike.desc', color: '#f87171', isShared: false, cost: 500 },
          { id: 'fc_battle_shout', name: '전투의 외침', nameKey: 'heroes.ssr_field_commander.skills.battle_shout.name', description: '아군 전체 공격력 +100 영구 증가 (중첩 가능)', descriptionKey: 'heroes.ssr_field_commander.skills.battle_shout.desc', color: '#ef4444', isShared: false, cost: 800 },
          { id: 'fc_blade_of_honor', name: '명예의 검', nameKey: 'heroes.ssr_field_commander.skills.blade_of_honor.name', description: '패시브: 자신의 모든 물리 피해 50% 증가', descriptionKey: 'heroes.ssr_field_commander.skills.blade_of_honor.desc', color: '#dc2626', isShared: false, cost: 1200 },
          { id: 'fc_vanguard', name: '선봉장', nameKey: 'heroes.ssr_field_commander.skills.vanguard.name', description: '가장 앞에서 싸우며 10초간 받는 피해 80% 반사', descriptionKey: 'heroes.ssr_field_commander.skills.vanguard.desc', color: '#b91c1c', isShared: false, cost: 1500 },
          { id: 'fc_war_lord_wrath', name: '지휘관의 진노', nameKey: 'heroes.ssr_field_commander.skills.war_lord_wrath.name', description: '전장 전체 적 ATK×25 피해 및 아군 전체 힐', descriptionKey: 'heroes.ssr_field_commander.skills.war_lord_wrath.desc', color: '#7f1d1d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 2200, atk: 125, def: 95, spd: 3.5, attackRange: 60 }, color: '#0ea5e9',
  },
  // 원소 전문화 9인
  {
    id: 'ssr_shadow_lord', name: '어둠의 군주', nameKey: 'heroes.ssr_shadow_lord.name', grade: 'AR', role: 'ranged_dps', raceName: '언데드', elementName: '암흑', starRating: 1,
    lore: '모든 그림자를 지배하는 어둠의 절대자. 그의 눈길이 머무는 곳엔 오직 공포와 파멸뿐이다.', loreKey: 'heroes.ssr_shadow_lord.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'shadow_lord_absolute', name: '절대 암흑', nameKey: 'heroes.ssr_shadow_lord.routes.shadow_lord_absolute.name', color: '#1e1b4b', role: 'ranged_dps',
        uniqueVariant: { name: '암흑의 지배', nameKey: 'heroes.ssr_shadow_lord.routes.shadow_lord_absolute.variantName', descriptionTemplate: '암흑 피해 {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_shadow_lord.routes.shadow_lord_absolute.variantDesc' },
        skills: [
          { id: 'sl_dark_spread', name: '어둠 확산', nameKey: 'heroes.ssr_shadow_lord.skills.dark_spread.name', description: '모든 적에게 10초간 암흑 DoT 적용 (ATK 100%/초)', descriptionKey: 'heroes.ssr_shadow_lord.skills.dark_spread.desc', color: '#4c1d95', isShared: false, cost: 500 },
          { id: 'sl_shadow_burst', name: '그림자 폭발', nameKey: 'heroes.ssr_shadow_lord.skills.shadow_burst.name', description: '타겟 주변 150px 모든 적 ATK×6 암흑 피해', descriptionKey: 'heroes.ssr_shadow_lord.skills.shadow_burst.desc', color: '#6d28d9', isShared: false, cost: 800 },
          { id: 'sl_soul_drain', name: '영혼 흡수', nameKey: 'heroes.ssr_shadow_lord.skills.soul_drain.name', description: '패시브: 모든 피해의 30%를 자신에게 흡혈', descriptionKey: 'heroes.ssr_shadow_lord.skills.soul_drain.desc', color: '#7c3aed', isShared: false, cost: 1200 },
          { id: 'sl_curse_of_doom', name: '파멸의 저주', nameKey: 'heroes.ssr_shadow_lord.skills.curse_of_doom.name', description: '적 1명에게 15초 후 ATK×30 피해', descriptionKey: 'heroes.ssr_shadow_lord.skills.curse_of_doom.desc', color: '#4c1d95', isShared: false, cost: 1500 },
          { id: 'sl_dark_dominion', name: '암흑의 지배', nameKey: 'heroes.ssr_shadow_lord.skills.dark_dominion.name', description: '전장 암흑화: 모든 적 DEF 0, ATK 0이 되어 10초간 일방적 학살', descriptionKey: 'heroes.ssr_shadow_lord.skills.dark_dominion.desc', color: '#2e1065', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'shadow_lord_terror', name: '공포', nameKey: 'heroes.ssr_shadow_lord.routes.shadow_lord_terror.name', color: '#4c1d95', role: 'cc',
        uniqueVariant: { name: '공포의 지배', nameKey: 'heroes.ssr_shadow_lord.routes.shadow_lord_terror.variantName', descriptionTemplate: '공격 시 {value}% 확률로 적을 2초간 공포 상태로 만듭니다.', descriptionTemplateKey: 'heroes.ssr_shadow_lord.routes.shadow_lord_terror.variantDesc' },
        skills: [
          { id: 'sl_fear_wave', name: '공포의 파동', nameKey: 'heroes.ssr_shadow_lord.skills.fear_wave.name', description: '전방 모든 적에게 공포 3초 + ATK×4 피해', descriptionKey: 'heroes.ssr_shadow_lord.skills.fear_wave.desc', color: '#7c3aed', isShared: false, cost: 500 },
          { id: 'sl_nightmare', name: '악몽', nameKey: 'heroes.ssr_shadow_lord.skills.nightmare.name', description: '가장 강력한 적 1명을 8초간 수면 상태로 만듬', descriptionKey: 'heroes.ssr_shadow_lord.skills.nightmare.desc', color: '#6d28d9', isShared: false, cost: 800 },
          { id: 'sl_mind_shatter', name: '정신 붕괴', nameKey: 'heroes.ssr_shadow_lord.skills.mind_shatter.name', description: '대상 적 전체 ATK×8 피해 및 침묵 5초', descriptionKey: 'heroes.ssr_shadow_lord.skills.mind_shatter.desc', color: '#4c1d95', isShared: false, cost: 1200 },
          { id: 'sl_summon_horror', name: '공포의 환영', nameKey: 'heroes.ssr_shadow_lord.skills.summon_horror.name', description: '적의 공포를 실체화한 환영 소환 (CC)', descriptionKey: 'heroes.ssr_shadow_lord.skills.summon_horror.desc', color: '#312e81', isShared: false, cost: 1500,
            summonStats: { displayName: '심연의 환영', displayNameKey: 'heroes.ssr_shadow_lord.summons.shadow_image.name', hp: 400, atk: 80, def: 15, spd: 3, role: 'cc', attackRange: 45, duration: 20 } },
          { id: 'sl_world_of_fear', name: '공포의 세계', nameKey: 'heroes.ssr_shadow_lord.skills.world_of_fear.name', description: '전장 전체 적을 10초간 조종 불능 상태로 만듬', descriptionKey: 'heroes.ssr_shadow_lord.skills.world_of_fear.desc', color: '#1e1b4b', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1000, atk: 220, def: 35, spd: 3, attackRange: 1400 }, color: '#1e1b4b',
  },
  {
    id: 'ssr_light_pope', name: '빛의 교황', nameKey: 'heroes.ssr_light_pope.name', grade: 'AR', role: 'healer', raceName: '인간', elementName: '신성', starRating: 1,
    lore: '빛의 교단 최고 수장. 그의 신성은 전장을 정화하고 아군을 무적의 군단으로 만든다.', loreKey: 'heroes.ssr_light_pope.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'light_pope_sanctity', name: '신성', nameKey: 'heroes.ssr_light_pope.routes.light_pope_sanctity.name', color: '#fbbf24', role: 'healer',
        uniqueVariant: { name: '교황의 강복', nameKey: 'heroes.ssr_light_pope.routes.light_pope_sanctity.variantName', descriptionTemplate: '힐량 {value}% 증가 및 모든 힐 전파.', descriptionTemplateKey: 'heroes.ssr_light_pope.routes.light_pope_sanctity.variantDesc' },
        skills: [
          { id: 'lp_holy_hope', name: '성스러운 희망', nameKey: 'heroes.ssr_light_pope.skills.holy_hope.name', description: '모든 아군 HP 완전 회복 + 10초간 피해 30% 감소', descriptionKey: 'heroes.ssr_light_pope.skills.holy_hope.desc', color: '#fef9c3', isShared: false, cost: 500 },
          { id: 'lp_celestial_hymn', name: '천상의 찬가', nameKey: 'heroes.ssr_light_pope.skills.celestial_hymn.name', description: '20초간 매초 아군 전체 최대HP의 5% 회복', descriptionKey: 'heroes.ssr_light_pope.skills.celestial_hymn.desc', color: '#fde68a', isShared: false, cost: 800 },
          { id: 'lp_miracle', name: '기적', nameKey: 'heroes.ssr_light_pope.skills.miracle.name', description: '사망 아군 전원 HP 100% 부활 + 5초 무적 (판당 1회)', descriptionKey: 'heroes.ssr_light_pope.skills.miracle.desc', color: '#fbbf24', isShared: false, cost: 1200 },
          { id: 'lp_divine_judgement', name: '신의 심판', nameKey: 'heroes.ssr_light_pope.skills.divine_judgement.name', description: '모든 적 기절 3초 + 전체 아군 치유', descriptionKey: 'heroes.ssr_light_pope.skills.divine_judgement.desc', color: '#ca8a04', isShared: false, cost: 1500 },
          { id: 'lp_holy_avatar', name: '신성의 화신', nameKey: 'heroes.ssr_light_pope.skills.holy_avatar.name', description: '자신이 완전한 신성 화신 변신: 모든 능력 3배, 30초 지속', descriptionKey: 'heroes.ssr_light_pope.skills.holy_avatar.desc', color: '#78350f', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'light_pope_inquisition', name: '이단심문', nameKey: 'heroes.ssr_light_pope.routes.light_pope_inquisition.name', color: '#ea580c', role: 'ranged_dps',
        uniqueVariant: { name: '이단의 불꽃', nameKey: 'heroes.ssr_light_pope.routes.light_pope_inquisition.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상을 정화하여 ATK×5 추가 피해.', descriptionTemplateKey: 'heroes.ssr_light_pope.routes.light_pope_inquisition.variantDesc' },
        skills: [
          { id: 'lp_purge', name: '정화', nameKey: 'heroes.ssr_light_pope.skills.purge.name', description: '대상 적 모든 버프 해제 및 ATK×8 신성 피해', descriptionKey: 'heroes.ssr_light_pope.skills.purge.desc', color: '#fdba74', isShared: false, cost: 500 },
          { id: 'lp_holy_fire', name: '신성한 불꽃', nameKey: 'heroes.ssr_light_pope.skills.holy_fire.name', description: '지속적인 신성 피해 및 아군 힐', descriptionKey: 'heroes.ssr_light_pope.skills.holy_fire.desc', color: '#f97316', isShared: false, cost: 800 },
          { id: 'lp_inquisition_seal', name: '심문의 인장', nameKey: 'heroes.ssr_light_pope.skills.inquisition_seal.name', description: '대상에게 인장을 부여하여 받는 모든 피해 2배 증가', descriptionKey: 'heroes.ssr_light_pope.skills.inquisition_seal.desc', color: '#ea580c', isShared: false, cost: 1200 },
          { id: 'lp_light_lance', name: '빛의 창', nameKey: 'heroes.ssr_light_pope.skills.light_lance.name', description: '관통하는 거대 빛의 창 투척 ATK×12', descriptionKey: 'heroes.ssr_light_pope.skills.light_lance.desc', color: '#c2410c', isShared: false, cost: 1500 },
          { id: 'lp_divine_wrath', name: '신의 진노', nameKey: 'heroes.ssr_light_pope.skills.divine_wrath.name', description: '전장 전체에 빛의 소나기 투하: 모든 적 50% 즉사', descriptionKey: 'heroes.ssr_light_pope.skills.divine_wrath.desc', color: '#7c2d12', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1200, atk: 75, def: 60, spd: 3, attackRange: 800 }, color: '#fbbf24',
  },
  {
    id: 'ssr_fire_seer', name: '화염의 선견자', nameKey: 'heroes.ssr_fire_seer.name', grade: 'AR', role: 'ranged_dps', raceName: '정령', elementName: '화염', starRating: 1,
    lore: '미래의 불꽃을 보는 화염 예언자. 전장의 모든 흐름을 화염의 예언으로 뒤바꾼다.', loreKey: 'heroes.ssr_fire_seer.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'fire_seer_prophecy', name: '예언', nameKey: 'heroes.ssr_fire_seer.routes.fire_seer_prophecy.name', color: '#dc2626', role: 'ranged_dps',
        uniqueVariant: { name: '화염 예언', nameKey: 'heroes.ssr_fire_seer.routes.fire_seer_prophecy.variantName', descriptionTemplate: '스킬 피해 {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_fire_seer.routes.fire_seer_prophecy.variantDesc' },
        skills: [
          { id: 'fs_prophecy_flame', name: '불꽃 예언', nameKey: 'heroes.ssr_fire_seer.skills.prophecy_flame.name', description: '다음 10초간 적의 이동을 방해하는 불꽃 함정 설치', descriptionKey: 'heroes.ssr_fire_seer.skills.prophecy_flame.desc', color: '#f87171', isShared: false, cost: 500 },
          { id: 'fs_holy_flame', name: '화염 선포', nameKey: 'heroes.ssr_fire_seer.skills.holy_flame.name', description: '전체 적에게 화상 부여: 10초간 ATK 100%/초', descriptionKey: 'heroes.ssr_fire_seer.skills.holy_flame.desc', color: '#ef4444', isShared: false, cost: 800 },
          { id: 'fs_purifying_fire', name: '정화의 불꽃', nameKey: 'heroes.ssr_fire_seer.skills.purifying_fire.name', description: '가장 강력한 적 1명에게 ATK×15 정화 화염 피해', descriptionKey: 'heroes.ssr_fire_seer.skills.purifying_fire.desc', color: '#b91c1c', isShared: false, cost: 1200 },
          { id: 'fs_flame_vision', name: '불꽃의 통찰', nameKey: 'heroes.ssr_fire_seer.skills.flame_vision.name', description: '패시브: 아군 전체 치명타 확률 +20%', descriptionKey: 'heroes.ssr_fire_seer.skills.flame_vision.desc', color: '#991b1b', isShared: false, cost: 1500 },
          { id: 'fs_solar_burst', name: '태양 폭발', nameKey: 'heroes.ssr_fire_seer.skills.solar_burst.name', description: '태양 에너지 집중 폭발: 전장 전체 ATK×15 화염 피해', descriptionKey: 'heroes.ssr_fire_seer.skills.solar_burst.desc', color: '#7f1d1d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'fire_seer_elemental', name: '정령', nameKey: 'heroes.ssr_fire_seer.routes.fire_seer_elemental.name', color: '#f97316', role: 'ranged_dps',
        uniqueVariant: { name: '정령의 격노', nameKey: 'heroes.ssr_fire_seer.routes.fire_seer_elemental.variantName', descriptionTemplate: '공격 시 {value}% 확률로 타겟 주변에 화염 정령 폭발 발생.', descriptionTemplateKey: 'heroes.ssr_fire_seer.routes.fire_seer_elemental.variantDesc' },
        skills: [
          { id: 'fs_lava_burst', name: '용암 폭발', nameKey: 'heroes.ssr_fire_seer.skills.lava_burst.name', description: '단일 ATK×8 확정 치명타 피해', descriptionKey: 'heroes.ssr_fire_seer.skills.lava_burst.desc', color: '#fb923c', isShared: false, cost: 500 },
          { id: 'fs_flame_shield', name: '불타는 갑옷', nameKey: 'heroes.ssr_fire_seer.skills.flame_shield.name', description: '아군 전체 방어력 +40 및 근접 공격 반사', descriptionKey: 'heroes.ssr_fire_seer.skills.flame_shield.desc', color: '#f97316', isShared: false, cost: 800 },
          { id: 'fs_summon_fire_ele', name: '불의 정령 소환', nameKey: 'heroes.ssr_fire_seer.skills.summon_fire_ele.name', description: '강력한 불의 정령 2마리 소환 (상시)', descriptionKey: 'heroes.ssr_fire_seer.skills.summon_fire_ele.desc', color: '#ea580c', isShared: false, cost: 1200,
            summonStats: { displayName: '불의 정령', displayNameKey: 'heroes.ssr_fire_seer.summons.fire_elemental.name', hp: 600, atk: 150, def: 30, spd: 3, role: 'ranged_dps', attackRange: 600, duration: 0 } },
          { id: 'fs_fire_tempest', name: '화염의 태풍', nameKey: 'heroes.ssr_fire_seer.skills.fire_tempest.name', description: '전장에 거대한 불의 회오리 소환: 적을 끌어당기고 불태움', descriptionKey: 'heroes.ssr_fire_seer.skills.fire_tempest.desc', color: '#c2410c', isShared: false, cost: 1500 },
          { id: 'fs_cataclysm_seer', name: '대격변의 예언', nameKey: 'heroes.ssr_fire_seer.skills.cataclysm_seer.name', description: '세상의 종말을 부르는 화염 폭격: 모든 적 소멸', descriptionKey: 'heroes.ssr_fire_seer.skills.cataclysm_seer.desc', color: '#7c2d12', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1000, atk: 245, def: 30, spd: 3, attackRange: 1200 }, color: '#dc2626',
  },
  {
    id: 'ssr_forest_king', name: '숲의 정령왕', nameKey: 'heroes.ssr_forest_king.name', grade: 'AR', role: 'tank', raceName: '밤엘프', elementName: '자연', starRating: 1,
    lore: '숲 전체를 몸으로 삼는 자연의 수호신. 그의 뿌리가 닿는 곳은 곧 그의 영토다.', loreKey: 'heroes.ssr_forest_king.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'forest_king_nature', name: '자연 수호', nameKey: 'heroes.ssr_forest_king.routes.forest_king_nature.name', color: '#16a34a', role: 'tank',
        uniqueVariant: { name: '고대 수호', nameKey: 'heroes.ssr_forest_king.routes.forest_king_nature.variantName', descriptionTemplate: '받는 피해 {value}% 감소 및 매초 HP 1% 회복.', descriptionTemplateKey: 'heroes.ssr_forest_king.routes.forest_king_nature.variantDesc' },
        skills: [
          { id: 'fk_nature_barrier', name: '자연의 장벽', nameKey: 'heroes.ssr_forest_king.skills.nature_barrier.name', description: '15초간 모든 아군에게 HP 30% 보호막 + 속박 면역', descriptionKey: 'heroes.ssr_forest_king.skills.nature_barrier.desc', color: '#4ade80', isShared: false, cost: 500 },
          { id: 'fk_vine_entangle', name: '덩굴 속박', nameKey: 'heroes.ssr_forest_king.skills.vine_entangle.name', description: '모든 적 10초 속박 + ATK×1/초 자연 피해', descriptionKey: 'heroes.ssr_forest_king.skills.vine_entangle.desc', color: '#22c55e', isShared: false, cost: 800 },
          { id: 'fk_world_tree', name: '생명의 나무', nameKey: 'heroes.ssr_forest_king.skills.world_tree.name', description: '20초간 아군 전체 매초 HP 5% 회복 + DEF +50', descriptionKey: 'heroes.ssr_forest_king.skills.world_tree.desc', color: '#16a34a', isShared: false, cost: 1200 },
          { id: 'fk_ironbark', name: '무쇠껍질', nameKey: 'heroes.ssr_forest_king.skills.ironbark.name', description: '아군 전체 10초간 피해 50% 감소', descriptionKey: 'heroes.ssr_forest_king.skills.ironbark.desc', color: '#15803d', isShared: false, cost: 1500 },
          { id: 'fk_forest_wrath', name: '숲의 분노', nameKey: 'heroes.ssr_forest_king.skills.forest_wrath.name', description: '전장 전체 나무 괴수 소환: ATK×10 광역 피해 + 5초 기절', descriptionKey: 'heroes.ssr_forest_king.skills.forest_wrath.desc', color: '#14532d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'forest_king_wild', name: '야생', nameKey: 'heroes.ssr_forest_king.routes.forest_king_wild.name', color: '#854d0e', role: 'melee_dps',
        uniqueVariant: { name: '야생의 힘', nameKey: 'heroes.ssr_forest_king.routes.forest_king_wild.variantName', descriptionTemplate: '공격 시 {value}% 확률로 2초간 공격속도가 200% 증가합니다.', descriptionTemplateKey: 'heroes.ssr_forest_king.routes.forest_king_wild.variantDesc' },
        skills: [
          { id: 'fk_feral_strike', name: '야생의 타격', nameKey: 'heroes.ssr_forest_king.skills.feral_strike.name', description: '단일 ATK×12 물리 피해 + 출혈', descriptionKey: 'heroes.ssr_forest_king.skills.feral_strike.desc', color: '#a16207', isShared: false, cost: 500 },
          { id: 'fk_roar_of_beast', name: '맹수의 포효', nameKey: 'heroes.ssr_forest_king.skills.roar_of_beast.name', description: '아군 전체 공격력 +50% 및 이동속도 증가', descriptionKey: 'heroes.ssr_forest_king.skills.roar_of_beast.desc', color: '#854d0e', isShared: false, cost: 800 },
          { id: 'fk_summon_ancient', name: '고대 정령 소환', nameKey: 'heroes.ssr_forest_king.skills.summon_ancient.name', description: '강력한 고대 정령 1명 소환 (상시 탱커)', descriptionKey: 'heroes.ssr_forest_king.skills.summon_ancient.desc', color: '#713f12', isShared: false, cost: 1200,
            summonStats: { displayName: '고대 정령', displayNameKey: 'heroes.ssr_forest_king.summons.ancient_spirit.name', hp: 1500, atk: 120, def: 80, spd: 2, role: 'tank', attackRange: 60, duration: 0 } },
          { id: 'fk_wild_growth_atk', name: '야생 성장(공격)', nameKey: 'heroes.ssr_forest_king.skills.wild_growth_atk.name', description: '패시브: 아군 공격 시 {value}% 확률로 추가 자연 피해', descriptionKey: 'heroes.ssr_forest_king.skills.wild_growth_atk.desc', color: '#422006', isShared: false, cost: 1500 },
          { id: 'fk_wrath_of_nature', name: '자연의 격노', nameKey: 'heroes.ssr_forest_king.skills.wrath_of_nature.name', description: '전장 전체 태풍 소환: 적들을 띄워 올리고 ATK×15 피해', descriptionKey: 'heroes.ssr_forest_king.skills.wrath_of_nature.desc', color: '#1a2e05', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 2200, atk: 105, def: 110, spd: 2.5, attackRange: 60 }, color: '#16a34a',
  },
  {
    id: 'ssr_glacier_overlord', name: '빙하의 지배자', nameKey: 'heroes.ssr_glacier_overlord.name', grade: 'AR', role: 'cc', raceName: '엘프', elementName: '서리', starRating: 1,
    lore: '세상을 얼려버릴 수 있는 빙하의 절대 지배자. 그의 숨결 아래 시간조차 얼어붙는다.', loreKey: 'heroes.ssr_glacier_overlord.lore',
    uniqueSkill: { baseValues: [25, 40, 60, 85, 120], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'glacier_overlord_absolute', name: '절대 빙결', nameKey: 'heroes.ssr_glacier_overlord.routes.glacier_overlord_absolute.name', color: '#0284c7', role: 'cc',
        uniqueVariant: { name: '절대 영도', nameKey: 'heroes.ssr_glacier_overlord.routes.glacier_overlord_absolute.variantName', descriptionTemplate: '슬로우 효과 {value}% 강화 및 빙결 상태 적 추가 피해.', descriptionTemplateKey: 'heroes.ssr_glacier_overlord.routes.glacier_overlord_absolute.variantDesc' },
        skills: [
          { id: 'go_absolute_freeze', name: '절대 빙결', nameKey: 'heroes.ssr_glacier_overlord.skills.absolute_freeze.name', description: '모든 적 10초 완전 동결 (완전 정지)', descriptionKey: 'heroes.ssr_glacier_overlord.skills.absolute_freeze.desc', color: '#7dd3fc', isShared: false, cost: 500 },
          { id: 'go_glacier_move', name: '빙하 이동', nameKey: 'heroes.ssr_glacier_overlord.skills.glacier_move.name', description: '빙하를 생성하며 이동, 경로의 모든 적 즉시 빙결', descriptionKey: 'heroes.ssr_glacier_overlord.skills.glacier_move.desc', color: '#38bdf8', isShared: false, cost: 800 },
          { id: 'go_permafrost', name: '영구 결빙', nameKey: 'heroes.ssr_glacier_overlord.skills.permafrost.name', description: '적들에게 영구 40% 슬로우 부여 (해제 불가)', descriptionKey: 'heroes.ssr_glacier_overlord.skills.permafrost.desc', color: '#0ea5e9', isShared: false, cost: 1200 },
          { id: 'go_frost_armor_aura', name: '한기 갑옷 오라', nameKey: 'heroes.ssr_glacier_overlord.skills.frost_armor_aura.name', description: '패시브: 아군 전체 방어력 +50 및 피격 적 슬로우', descriptionKey: 'heroes.ssr_glacier_overlord.skills.frost_armor_aura.desc', color: '#0284c7', isShared: false, cost: 1500 },
          { id: 'go_ice_age', name: '빙하기', nameKey: 'heroes.ssr_glacier_overlord.skills.ice_age.name', description: '전장 전체 빙하기 도래: 모든 적 즉사 (보스는 ATK×30 피해)', descriptionKey: 'heroes.ssr_glacier_overlord.skills.ice_age.desc', color: '#075985', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'glacier_overlord_shatter', name: '파쇄', nameKey: 'heroes.ssr_glacier_overlord.routes.glacier_overlord_shatter.name', color: '#1e40af', role: 'ranged_dps',
        uniqueVariant: { name: '빙결 파쇄', nameKey: 'heroes.ssr_glacier_overlord.routes.glacier_overlord_shatter.variantName', descriptionTemplate: '냉기 피해 시 {value}% 확률로 대상에게 최대 HP의 10% 추가 피해.', descriptionTemplateKey: 'heroes.ssr_glacier_overlord.routes.glacier_overlord_shatter.variantDesc' },
        skills: [
          { id: 'go_ice_spear', name: '얼음 창', nameKey: 'heroes.ssr_glacier_overlord.skills.ice_spear.name', description: '빙결된 적에게 3배의 피해를 입히는 창 투척', descriptionKey: 'heroes.ssr_glacier_overlord.skills.ice_spear.desc', color: '#60a5fa', isShared: false, cost: 500 },
          { id: 'go_shatter_burst', name: '산산조각', nameKey: 'heroes.ssr_glacier_overlord.skills.shatter_burst.name', description: '대상 적 전체 빙결 해제 및 폭발 피해 ATK×12', descriptionKey: 'heroes.ssr_glacier_overlord.skills.shatter_burst.desc', color: '#3b82f6', isShared: false, cost: 800 },
          { id: 'go_cold_heart', name: '냉정한 심장', nameKey: 'heroes.ssr_glacier_overlord.skills.cold_heart.name', description: '패시브: 자신의 모든 냉기 피해 60% 증가', descriptionKey: 'heroes.ssr_glacier_overlord.skills.cold_heart.desc', color: '#2563eb', isShared: false, cost: 1200 },
          { id: 'go_hailstorm', name: '우박 폭풍', nameKey: 'heroes.ssr_glacier_overlord.skills.hailstorm.name', description: '전장에 거대 우박 투하: 적 기절 및 지속 피해', descriptionKey: 'heroes.ssr_glacier_overlord.skills.hailstorm.desc', color: '#1d4ed8', isShared: false, cost: 1500 },
          { id: 'go_absolute_zero_burst', name: '절대영도 폭발', nameKey: 'heroes.ssr_glacier_overlord.skills.absolute_zero_burst.name', description: '전장 전체를 즉시 파쇄: 모든 적 ATK×25 피해', descriptionKey: 'heroes.ssr_glacier_overlord.skills.absolute_zero_burst.desc', color: '#1e3a8a', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1100, atk: 165, def: 45, spd: 3, attackRange: 1200 }, color: '#0284c7',
  },
  {
    id: 'ssr_dragon_tamer', name: '드래곤 조련사', nameKey: 'heroes.ssr_dragon_tamer.name', grade: 'AR', role: 'melee_dps', raceName: '인간', elementName: '불꽃', starRating: 1,
    lore: '용과 하나가 된 전설의 드래곤 기사. 그의 명령 한 번에 고대의 용들이 움직인다.', loreKey: 'heroes.ssr_dragon_tamer.lore',
    uniqueSkill: { baseValues: [25, 40, 60, 85, 120], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'dragon_tamer_knight', name: '용기사', nameKey: 'heroes.ssr_dragon_tamer.routes.dragon_tamer_knight.name', color: '#dc2626', role: 'melee_dps',
        uniqueVariant: { name: '용의 힘', nameKey: 'heroes.ssr_dragon_tamer.routes.dragon_tamer_knight.variantName', descriptionTemplate: '공격력 {value}% 증가 및 모든 공격에 화염 폭발 추가.', descriptionTemplateKey: 'heroes.ssr_dragon_tamer.routes.dragon_tamer_knight.variantDesc' },
        skills: [
          { id: 'dt_dragon_command', name: '용 명령', nameKey: 'heroes.ssr_dragon_tamer.skills.dragon_command.name', description: '동료 용에게 공격 명령: 화염 브레스 ATK×8 광역', descriptionKey: 'heroes.ssr_dragon_tamer.skills.dragon_command.desc', color: '#f97316', isShared: false, cost: 500 },
          { id: 'dt_fire_whip', name: '화염 채찍', nameKey: 'heroes.ssr_dragon_tamer.skills.fire_whip.name', description: '전방 직선 적 전체 ATK×6 화염 피해 + 화상', descriptionKey: 'heroes.ssr_dragon_tamer.skills.fire_whip.desc', color: '#ef4444', isShared: false, cost: 800 },
          { id: 'dt_dragon_aura_lr', name: '용의 오라', nameKey: 'heroes.ssr_dragon_tamer.skills.dragon_aura.name', description: '패시브: 아군 전체 공격력 40% 증가, 피해 20% 감소', descriptionKey: 'heroes.ssr_dragon_tamer.skills.dragon_aura.desc', color: '#dc2626', isShared: false, cost: 1200 },
          { id: 'dt_dragon_flight', name: '용의 비상', nameKey: 'heroes.ssr_dragon_tamer.skills.dragon_flight.name', description: '10초간 무적 및 공격력 2배 증가', descriptionKey: 'heroes.ssr_dragon_tamer.skills.dragon_flight.desc', color: '#b91c1c', isShared: false, cost: 1500 },
          { id: 'dt_ancient_dragon_summon', name: '고대 용 소환', nameKey: 'heroes.ssr_dragon_tamer.skills.ancient_dragon_summon.name', description: '고대 드래곤 소환 (상시 원딜, 강력한 브레스)', descriptionKey: 'heroes.ssr_dragon_tamer.skills.ancient_dragon_summon.desc', color: '#7f1d1d', isShared: false, cost: 3000, isFinal: true,
            summonStats: { displayName: '고대 드래곤', displayNameKey: 'heroes.ssr_dragon_tamer.summons.ancient_dragon.name', hp: 3000, atk: 400, def: 100, spd: 2, role: 'ranged_dps', attackRange: 1000, duration: 0 } },
        ],
      },
      {
        id: 'dragon_tamer_tamer', name: '조련사', nameKey: 'heroes.ssr_dragon_tamer.routes.dragon_tamer_tamer.name', color: '#16a34a', role: 'ranged_dps',
        uniqueVariant: { name: '용의 결속', nameKey: 'heroes.ssr_dragon_tamer.routes.dragon_tamer_tamer.variantName', descriptionTemplate: '소환수가 입히는 피해의 {value}% 만큼 자신의 공격력이 영구 증가합니다 (최대 300%).', descriptionTemplateKey: 'heroes.ssr_dragon_tamer.routes.dragon_tamer_tamer.variantDesc' },
        skills: [
          { id: 'dt_spawn_dragonling', name: '새끼 용 군단', nameKey: 'heroes.ssr_dragon_tamer.skills.spawn_dragonling.name', description: '새끼 용 5마리 소환 (20초, 원딜)', descriptionKey: 'heroes.ssr_dragon_tamer.skills.spawn_dragonling.desc', color: '#4ade80', isShared: false, cost: 500,
            summonStats: { displayName: '새끼 용', displayNameKey: 'heroes.ssr_dragon_tamer.summons.whelp.name', hp: 300, atk: 80, def: 15, spd: 4, role: 'ranged_dps', attackRange: 500, duration: 20 } },
          { id: 'dt_taming_beast', name: '야수 길들이기', nameKey: 'heroes.ssr_dragon_tamer.skills.taming_beast.name', description: '적 1명을 길들여 15초간 아군으로 만듬', descriptionKey: 'heroes.ssr_dragon_tamer.skills.taming_beast.desc', color: '#22c55e', isShared: false, cost: 800 },
          { id: 'dt_nature_blessing', name: '자연의 축복', nameKey: 'heroes.ssr_dragon_tamer.skills.nature_blessing.name', description: '아군 소환수 전원 완전 회복 및 10초간 강화', descriptionKey: 'heroes.ssr_dragon_tamer.skills.nature_blessing.desc', color: '#16a34a', isShared: false, cost: 1200 },
          { id: 'dt_dragon_nest', name: '용의 둥지', nameKey: 'heroes.ssr_dragon_tamer.skills.dragon_nest.name', description: '전장에 둥지 소환: 매 3초마다 새끼 용 1마리 자동 생성', descriptionKey: 'heroes.ssr_dragon_tamer.skills.dragon_nest.desc', color: '#15803d', isShared: false, cost: 1500 },
          { id: 'dt_summon_dragon_aspect', name: '용의 군주 소환', nameKey: 'heroes.ssr_dragon_tamer.skills.summon_dragon_aspect.name', description: '전설의 용의 위상 소환: 전장 전체 초토화', descriptionKey: 'heroes.ssr_dragon_tamer.skills.summon_dragon_aspect.desc', color: '#14532d', isShared: false, cost: 3000, isFinal: true,
            summonStats: { displayName: '용의 위상', displayNameKey: 'heroes.ssr_dragon_tamer.summons.aspect.name', hp: 5000, atk: 600, def: 150, spd: 3, role: 'ranged_dps', attackRange: 1500, duration: 30 } },
        ],
      },
    ],
    baseStats: { hp: 1300, atk: 220, def: 55, spd: 4.5, attackRange: 55 }, color: '#dc2626',
  },
  {
    id: 'ssr_thunder_god', name: '천둥신', nameKey: 'heroes.ssr_thunder_god.name', grade: 'AR', role: 'ranged_dps', raceName: '잔달라 트롤', elementName: '번개', starRating: 1,
    lore: '하늘을 지배하는 폭풍의 신. 그의 번개는 적의 심장을 꿰뚫고 전장을 마비시킨다.', loreKey: 'heroes.ssr_thunder_god.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'thunder_god_storm', name: '폭풍 지배', nameKey: 'heroes.ssr_thunder_god.routes.thunder_god_storm.name', color: '#facc15', role: 'ranged_dps',
        uniqueVariant: { name: '천둥의 지배', nameKey: 'heroes.ssr_thunder_god.routes.thunder_god_storm.variantName', descriptionTemplate: '번개 피해 {value}% 증가 및 모든 공격에 감전 효과 추가.', descriptionTemplateKey: 'heroes.ssr_thunder_god.routes.thunder_god_storm.variantDesc' },
        skills: [
          { id: 'tg_divine_lightning_lr', name: '신성한 번개', nameKey: 'heroes.ssr_thunder_god.skills.divine_lightning.name', description: '적 1명에게 ATK×10 번개 피해 + 주변 5명 연쇄', descriptionKey: 'heroes.ssr_thunder_god.skills.divine_lightning.desc', color: '#fde68a', isShared: false, cost: 500 },
          { id: 'tg_thunder_storm_lr', name: '번개 폭풍', nameKey: 'heroes.ssr_thunder_god.skills.thunder_storm.name', description: '15초간 전장 전체에 무차별 낙뢰 (ATK 300%/초)', descriptionKey: 'heroes.ssr_thunder_god.skills.thunder_storm.desc', color: '#facc15', isShared: false, cost: 800 },
          { id: 'tg_lightning_shield_lr', name: '번개 보호막', nameKey: 'heroes.ssr_thunder_god.skills.lightning_shield.name', description: '아군 전체 피격 시 적에게 ATK 100% 번개 반격', descriptionKey: 'heroes.ssr_thunder_god.skills.lightning_shield.desc', color: '#eab308', isShared: false, cost: 1200 },
          { id: 'tg_static_charge', name: '정전기 집중', nameKey: 'heroes.ssr_thunder_god.skills.static_charge.name', description: '패시브: 자신의 모든 공격속도 50% 증가', descriptionKey: 'heroes.ssr_thunder_god.skills.static_charge.desc', color: '#ca8a04', isShared: false, cost: 1500 },
          { id: 'tg_world_thunder_lr', name: '천지개벽', nameKey: 'heroes.ssr_thunder_god.skills.world_thunder.name', description: '하늘을 열어 전장 전체 번개 폭우: 모든 적 5초 기절 및 격파', descriptionKey: 'heroes.ssr_thunder_god.skills.world_thunder.desc', color: '#a16207', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'thunder_god_thunder', name: '뇌신', nameKey: 'heroes.ssr_thunder_god.routes.thunder_god_thunder.name', color: '#a16207', role: 'cc',
        uniqueVariant: { name: '감전사', nameKey: 'heroes.ssr_thunder_god.routes.thunder_god_thunder.variantName', descriptionTemplate: '감전된 적이 공격할 때마다 {value}% 확률로 자신에게 ATK×3 피해를 입힙니다.', descriptionTemplateKey: 'heroes.ssr_thunder_god.routes.thunder_god_thunder.variantDesc' },
        skills: [
          { id: 'tg_thunder_clap', name: '천둥 벼락', nameKey: 'heroes.ssr_thunder_god.skills.thunder_clap.name', description: '주변 모든 적 4초 기절 + ATK×6 피해', descriptionKey: 'heroes.ssr_thunder_god.skills.thunder_clap.desc', color: '#fbbf24', isShared: false, cost: 500 },
          { id: 'tg_overload', name: '과부하', nameKey: 'heroes.ssr_thunder_god.skills.overload.name', description: '적 3명을 연결하여 매초 기절 및 피해 중첩', descriptionKey: 'heroes.ssr_thunder_god.skills.overload.desc', color: '#d97706', isShared: false, cost: 800 },
          { id: 'tg_storm_cloud', name: '폭풍 구름', nameKey: 'heroes.ssr_thunder_god.skills.storm_cloud.name', description: '지정 위치 적들의 이동/공격속도 80% 감소', descriptionKey: 'heroes.ssr_thunder_god.skills.storm_cloud.desc', color: '#b45309', isShared: false, cost: 1200 },
          { id: 'tg_lightning_rod', name: '피뢰침', nameKey: 'heroes.ssr_thunder_god.skills.lightning_rod.name', description: '가장 강한 적 1명에게 낙뢰 집중: 10초간 지속 기절', descriptionKey: 'heroes.ssr_thunder_god.skills.lightning_rod.desc', color: '#92400e', isShared: false, cost: 1500 },
          { id: 'tg_god_of_thunder', name: '뇌신의 강림', nameKey: 'heroes.ssr_thunder_god.skills.god_of_thunder.name', description: '자신이 번개 거인으로 변신: 20초간 주변 모든 적 자동 감전 소멸', descriptionKey: 'heroes.ssr_thunder_god.skills.god_of_thunder.desc', color: '#451a03', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1100, atk: 230, def: 35, spd: 3, attackRange: 1600, attackCooldown: 0.45 }, color: '#facc15',
  },
  {
    id: 'ssr_storm_avatar', name: '폭풍의 화신', nameKey: 'heroes.ssr_storm_avatar.name', grade: 'AR', role: 'melee_dps', raceName: '야수족', elementName: '바람', starRating: 1,
    lore: '폭풍 그 자체가 된 전사. 그의 검날은 바람보다 빠르고 태풍보다 강력하다.', loreKey: 'heroes.ssr_storm_avatar.lore',
    uniqueSkill: { baseValues: [25, 40, 60, 85, 120], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'storm_avatar_incarnate', name: '폭풍 화신', nameKey: 'heroes.ssr_storm_avatar.routes.storm_avatar_incarnate.name', color: '#84cc16', role: 'melee_dps',
        uniqueVariant: { name: '폭풍의 분노', nameKey: 'heroes.ssr_storm_avatar.routes.storm_avatar_incarnate.variantName', descriptionTemplate: '이동속도 {value}% 및 공격력 동일 비율 증가.', descriptionTemplateKey: 'heroes.ssr_storm_avatar.routes.storm_avatar_incarnate.variantDesc' },
        skills: [
          { id: 'sa_whirlwind_slash_lr', name: '회오리 베기', nameKey: 'heroes.ssr_storm_avatar.skills.whirlwind_slash.name', description: '주변 전체 회전 공격 ATK×5 + 5초 슬로우', descriptionKey: 'heroes.ssr_storm_avatar.skills.whirlwind_slash.desc', color: '#bef264', isShared: false, cost: 500 },
          { id: 'sa_storm_strike_lr', name: '폭풍 강타', nameKey: 'heroes.ssr_storm_avatar.skills.storm_strike.name', description: '초고속 돌진 후 ATK×10 단일 공격', descriptionKey: 'heroes.ssr_storm_avatar.skills.storm_strike.desc', color: '#a3e635', isShared: false, cost: 800 },
          { id: 'sa_wind_blessing_lr', name: '바람의 축복', nameKey: 'heroes.ssr_storm_avatar.skills.wind_blessing.name', description: '아군 전체 이속/공속 60% 증가 15초', descriptionKey: 'heroes.ssr_storm_avatar.skills.wind_blessing.desc', color: '#65a30d', isShared: false, cost: 1200 },
          { id: 'sa_eye_of_tempest', name: '태풍의 눈', nameKey: 'heroes.ssr_storm_avatar.skills.eye_of_tempest.name', description: '주변 모든 적을 자신에게 끌어당기며 ATK×8 피해', descriptionKey: 'heroes.ssr_storm_avatar.skills.eye_of_tempest.desc', color: '#4d7c0f', isShared: false, cost: 1500 },
          { id: 'sa_storm_incarnate_lr', name: '진정한 폭풍 화신', nameKey: 'heroes.ssr_storm_avatar.skills.storm_incarnate.name', description: '15초간 폭풍 변신: 무적 + 매 0.2초 주변 모든 적 격파', descriptionKey: 'heroes.ssr_storm_avatar.skills.storm_incarnate.desc', color: '#3f6212', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'storm_avatar_cyclone', name: '싸이클론', nameKey: 'heroes.ssr_storm_avatar.routes.storm_avatar_cyclone.name', color: '#22c55e', role: 'cc',
        uniqueVariant: { name: '바람의 장난', nameKey: 'heroes.ssr_storm_avatar.routes.storm_avatar_cyclone.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상을 3초간 공중으로 띄워 올립니다.', descriptionTemplateKey: 'heroes.ssr_storm_avatar.routes.storm_avatar_cyclone.variantDesc' },
        skills: [
          { id: 'sa_cyclone', name: '싸이클론', nameKey: 'heroes.ssr_storm_avatar.skills.cyclone.name', description: '적 3명을 6초간 공중으로 띄워 무력화', descriptionKey: 'heroes.ssr_storm_avatar.skills.cyclone.desc', color: '#86efac', isShared: false, cost: 500 },
          { id: 'sa_gust', name: '강풍', nameKey: 'heroes.ssr_storm_avatar.skills.gust.name', description: '전방의 모든 적을 화면 끝까지 밀쳐냄', descriptionKey: 'heroes.ssr_storm_avatar.skills.gust.desc', color: '#4ade80', isShared: false, cost: 800 },
          { id: 'sa_wind_wall', name: '바람의 벽', nameKey: 'heroes.ssr_storm_avatar.skills.wind_wall.name', description: '아군 앞에 바람 장벽 소환: 모든 투사체 무효화 10초', descriptionKey: 'heroes.ssr_storm_avatar.skills.wind_wall.desc', color: '#22c55e', isShared: false, cost: 1200 },
          { id: 'sa_tornado', name: '거대 토네이도', nameKey: 'heroes.ssr_storm_avatar.skills.tornado.name', description: '전장을 휩쓰는 토네이도 소환: 적들을 무작위 위치로 비산', descriptionKey: 'heroes.ssr_storm_avatar.skills.tornado.desc', color: '#16a34a', isShared: false, cost: 1500 },
          { id: 'sa_hurricane', name: '절대 허리케인', nameKey: 'heroes.ssr_storm_avatar.skills.hurricane.name', description: '전장 전체를 초토화하는 허리케인: 모든 적 소멸', descriptionKey: 'heroes.ssr_storm_avatar.skills.hurricane.desc', color: '#14532d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1300, atk: 225, def: 45, spd: 7, attackRange: 55 }, color: '#84cc16',
  },
  {
    id: 'ssr_plague_lord', name: '역병의 지배자', nameKey: 'heroes.ssr_plague_lord.name', grade: 'AR', role: 'ranged_dps', raceName: '트롤', elementName: '독', starRating: 1,
    lore: '세상 모든 생명을 독으로 지배하는 역병의 군주. 그의 숨결 한 번에 제국이 무너졌다.', loreKey: 'heroes.ssr_plague_lord.lore',
    uniqueSkill: { baseValues: [25, 40, 60, 85, 120], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'plague_lord_absolute', name: '역병 지배', nameKey: 'heroes.ssr_plague_lord.routes.plague_lord_absolute.name', color: '#4d7c0f', role: 'ranged_dps',
        uniqueVariant: { name: '역병 지배', nameKey: 'heroes.ssr_plague_lord.routes.plague_lord_absolute.variantName', descriptionTemplate: '독 피해 {value}% 증가 및 모든 공격에 치명적 역병 부여.', descriptionTemplateKey: 'heroes.ssr_plague_lord.routes.plague_lord_absolute.variantDesc' },
        skills: [
          { id: 'pl_plague_spread_lr', name: '역병 전파', nameKey: 'heroes.ssr_plague_lord.skills.plague_spread.name', description: '모든 적에게 역병 부여: 15초간 ATK 120%/초 독 피해', descriptionKey: 'heroes.ssr_plague_lord.skills.plague_spread.desc', color: '#86efac', isShared: false, cost: 500 },
          { id: 'pl_toxic_cloud_lr', name: '독기 구름', nameKey: 'heroes.ssr_plague_lord.skills.toxic_cloud.name', description: '전장 전체에 독기 구름: 20초간 적 HP 8%/초 감소', descriptionKey: 'heroes.ssr_plague_lord.skills.toxic_cloud.desc', color: '#4ade80', isShared: false, cost: 800 },
          { id: 'pl_corpse_burst_lr', name: '시체 폭발', nameKey: 'heroes.ssr_plague_lord.skills.corpse_burst.name', description: '죽은 적 시체 폭발: 주변 ATK×6 + 독 전파', descriptionKey: 'heroes.ssr_plague_lord.skills.corpse_burst.desc', color: '#22c55e', isShared: false, cost: 1200 },
          { id: 'pl_epidemic_passive', name: '대역병의 인도자', nameKey: 'heroes.ssr_plague_lord.skills.epidemic_passive.name', description: '패시브: 중독된 적이 죽을 때마다 아군 전체 5% 힐', descriptionKey: 'heroes.ssr_plague_lord.skills.epidemic_passive.desc', color: '#16a34a', isShared: false, cost: 1500 },
          { id: 'pl_plague_dominion_lr', name: '역병의 지배자', nameKey: 'heroes.ssr_plague_lord.skills.plague_dominion.name', description: '전장 역병화: 모든 적 즉시 HP 1로 감소 및 기절 10초', descriptionKey: 'heroes.ssr_plague_lord.skills.plague_dominion.desc', color: '#14532d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'plague_lord_undead', name: '강령', nameKey: 'heroes.ssr_plague_lord.routes.plague_lord_undead.name', color: '#1e3a1e', role: 'melee_dps',
        uniqueVariant: { name: '죽음의 군주', nameKey: 'heroes.ssr_plague_lord.routes.plague_lord_undead.variantName', descriptionTemplate: '소환수가 입힌 피해의 {value}% 만큼 자신의 HP가 회복됩니다.', descriptionTemplateKey: 'heroes.ssr_plague_lord.routes.plague_lord_undead.variantDesc' },
        skills: [
          { id: 'pl_summon_ghoul', name: '구울 소환', nameKey: 'heroes.ssr_plague_lord.skills.summon_ghoul.name', description: '강화 구울 3마리 소환 (상시 근딜)', descriptionKey: 'heroes.ssr_plague_lord.skills.summon_ghoul.desc', color: '#3f6212', isShared: false, cost: 500,
            summonStats: { displayName: '강화 구울', displayNameKey: 'heroes.ssr_plague_lord.summons.elite_ghoul.name', hp: 500, atk: 100, def: 20, spd: 4, role: 'melee_dps', attackRange: 45, duration: 0 } },
          { id: 'pl_raise_abom', name: '누더기골렘 소환', nameKey: 'heroes.ssr_plague_lord.skills.raise_abom.name', description: '거대한 누더기골렘 소환 (25초, 탱커)', descriptionKey: 'heroes.ssr_plague_lord.skills.raise_abom.desc', color: '#1a2e05', isShared: false, cost: 800,
            summonStats: { displayName: '누더기골렘', displayNameKey: 'heroes.ssr_plague_lord.summons.abomination.name', hp: 2000, atk: 120, def: 80, spd: 2, role: 'tank', attackRange: 60, duration: 25 } },
          { id: 'pl_death_pact', name: '죽음의 서약', nameKey: 'heroes.ssr_plague_lord.skills.death_pact.name', description: '소환수 하나를 희생하여 자신의 HP 완전 회복', descriptionKey: 'heroes.ssr_plague_lord.skills.death_pact.desc', color: '#052e16', isShared: false, cost: 1200 },
          { id: 'pl_unholy_frenzy', name: '부정의 광기', nameKey: 'heroes.ssr_plague_lord.skills.unholy_frenzy.name', description: '15초간 소환수 및 자신의 공격속도 150% 증가', descriptionKey: 'heroes.ssr_plague_lord.skills.unholy_frenzy.desc', color: '#31511e', isShared: false, cost: 1500 },
          { id: 'pl_army_of_undead', name: '언데드 대군세', nameKey: 'heroes.ssr_plague_lord.skills.army_of_undead.name', description: '전장에 무수한 망자 소환 (30마리) 및 총공격', descriptionKey: 'heroes.ssr_plague_lord.skills.army_of_undead.desc', color: '#020617', isShared: false, cost: 3000, isFinal: true,
            summonStats: { displayName: '망자', displayNameKey: 'heroes.ssr_plague_lord.summons.undead.name', hp: 300, atk: 70, def: 10, spd: 4.5, role: 'melee_dps', attackRange: 45, duration: 20 } },
        ],
      },
    ],
    baseStats: { hp: 1100, atk: 85, def: 40, spd: 3, attackRange: 1100, attackCooldown: 0.4 }, color: '#4d7c0f',
  },
  // 종족 전문화 10인 (AR) → 사실상 LR급 성능이나 AR로 분류되어 있음. LR로 승격 검토.
  // 여기서는 사용자의 요청에 따라 LR급으로 취급하여 5스킬 체계로 변경.
  {
    id: 'ssr_lich_king', name: '리치왕', nameKey: 'heroes.ssr_lich_king.name', grade: 'LR', role: 'tank', raceName: '언데드', elementName: '서리', starRating: 1,
    lore: '모든 언데드의 왕. 그가 지나간 곳엔 영원한 겨울이 남는다.', loreKey: 'heroes.ssr_lich_king.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'lich_king_frost', name: '냉기', nameKey: 'heroes.ssr_lich_king.routes.lich_king_frost.name', color: '#0ea5e9', role: 'tank',
        uniqueVariant: { name: '리치왕의 의지', nameKey: 'heroes.ssr_lich_king.routes.lich_king_frost.variantName', descriptionTemplate: '받는 피해 {value}% 반사 및 서리 피해 증가.', descriptionTemplateKey: 'heroes.ssr_lich_king.routes.lich_king_frost.variantDesc' },
        skills: [
          { id: 'lk_frost_aura', name: '빙결의 오라', nameKey: 'heroes.ssr_lich_king.skills.frost_aura.name', description: '주변 200px 적 이동속도 70% 감소', descriptionKey: 'heroes.ssr_lich_king.skills.frost_aura.desc', color: '#bae6fd', isShared: false, cost: 500 },
          { id: 'lk_death_touch', name: '죽음의 손길', nameKey: 'heroes.ssr_lich_king.skills.death_touch.name', description: '단일 ATK×8 피해, 5초 완전 기절', descriptionKey: 'heroes.ssr_lich_king.skills.death_touch.desc', color: '#7dd3fc', isShared: false, cost: 800 },
          { id: 'lk_obliterate', name: '절멸', nameKey: 'heroes.ssr_lich_king.skills.obliterate.name', description: '방어 무시 강력한 2연타 ATK×6', descriptionKey: 'heroes.ssr_lich_king.skills.obliterate.desc', color: '#38bdf8', isShared: false, cost: 1200 },
          { id: 'lk_remorseless_winter', name: '냉혈한의 겨울', nameKey: 'heroes.ssr_lich_king.skills.remorseless_winter.name', description: '10초간 주변 적 지속 피해 및 빙결', descriptionKey: 'heroes.ssr_lich_king.skills.remorseless_winter.desc', color: '#0ea5e9', isShared: false, cost: 1500 },
          { id: 'lk_lich_wrath', name: '리치왕의 진노', nameKey: 'heroes.ssr_lich_king.skills.lich_wrath.name', description: '전장 전체 ATK 1500% 서리 피해 + 영구 슬로우', descriptionKey: 'heroes.ssr_lich_king.skills.lich_wrath.desc', color: '#0369a1', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'lich_king_unholy', name: '부정', nameKey: 'heroes.ssr_lich_king.routes.lich_king_unholy.name', color: '#4d7c0f', role: 'melee_dps',
        uniqueVariant: { name: '사멸의 인도자', nameKey: 'heroes.ssr_lich_king.routes.lich_king_unholy.variantName', descriptionTemplate: '소환수의 공격력 {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_lich_king.routes.lich_king_unholy.variantDesc' },
        skills: [
          { id: 'lk_agony', name: '고통의 저주', nameKey: 'heroes.ssr_lich_king.skills.agony.name', description: '점증하는 강력한 지속 암흑 피해', descriptionKey: 'heroes.ssr_lich_king.skills.agony.desc', color: '#84cc16', isShared: false, cost: 500 },
          { id: 'lk_ghoul_army', name: '구울 소환', nameKey: 'heroes.ssr_lich_king.skills.ghoul_army.name', description: '강화 구울 4마리 즉시 소환', descriptionKey: 'heroes.ssr_lich_king.skills.ghoul_army.desc', color: '#65a30d', isShared: false, cost: 800,
            summonStats: { displayName: '강화 구울', displayNameKey: 'heroes.ssr_lich_king.summons.elite_ghoul.name', hp: 400, atk: 80, def: 15, spd: 4, role: 'melee_dps', attackRange: 45, duration: 25 } },
          { id: 'lk_corpse_explosion', name: '시체 폭발', nameKey: 'heroes.ssr_lich_king.skills.corpse_explosion.name', description: '죽은 적 시체 폭발 ATK×10 피해', descriptionKey: 'heroes.ssr_lich_king.skills.corpse_explosion.desc', color: '#4ade80', isShared: false, cost: 1200 },
          { id: 'lk_gargoyle', name: '가고일 소환', nameKey: 'heroes.ssr_lich_king.skills.gargoyle.name', description: '하늘에서 지원 사격하는 가고일 소환', descriptionKey: 'heroes.ssr_lich_king.skills.gargoyle.desc', color: '#166534', isShared: false, cost: 1500,
            summonStats: { displayName: '가고일', displayNameKey: 'heroes.ssr_lich_king.summons.gargoyle.name', hp: 500, atk: 150, def: 20, spd: 3, role: 'ranged_dps', attackRange: 600, duration: 30 } },
          { id: 'lk_army_of_dead_lr', name: '사멸의 군단', nameKey: 'heroes.ssr_lich_king.skills.army_of_dead.name', description: '언데드 군단 20마리 소환 및 전장 초토화', descriptionKey: 'heroes.ssr_lich_king.skills.army_of_dead.desc', color: '#14532d', isShared: false, cost: 3000, isFinal: true,
            summonStats: { displayName: '군단 망자', displayNameKey: 'heroes.ssr_lich_king.summons.army.name', hp: 300, atk: 70, def: 10, spd: 4.5, role: 'melee_dps', attackRange: 45, duration: 20 } },
        ],
      },
    ],
    baseStats: { hp: 3500, atk: 150, def: 120, spd: 2.5, attackRange: 65 }, color: '#0ea5e9',
  },
  {
    id: 'ssr_high_chieftain', name: '고위 족장', nameKey: 'heroes.ssr_high_chieftain.name', grade: 'AR', role: 'tank', raceName: '타우렌', elementName: '자연', starRating: 1,
    lore: '모든 타우렌 부족을 통합한 최고위 족장. 그의 포효는 아군에게 용기를, 적에게는 공포를 선사한다.', loreKey: 'heroes.ssr_high_chieftain.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'high_chieftain_rally', name: '결집', nameKey: 'heroes.ssr_high_chieftain.routes.high_chieftain_rally.name', color: '#a16207', role: 'tank',
        uniqueVariant: { name: '대지의 군주', nameKey: 'heroes.ssr_high_chieftain.routes.high_chieftain_rally.variantName', descriptionTemplate: '아군 전체 최대 HP {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_high_chieftain.routes.high_chieftain_rally.variantDesc' },
        skills: [
          { id: 'hc_earth_burst', name: '대지의 폭발', nameKey: 'heroes.ssr_high_chieftain.skills.earth_burst.name', description: '주변 200px 적 ATK×5 피해 및 4초 기절', descriptionKey: 'heroes.ssr_high_chieftain.skills.earth_burst.desc', color: '#fde68a', isShared: false, cost: 500 },
          { id: 'hc_stomp_lr', name: '발구르기 충격', nameKey: 'heroes.ssr_high_chieftain.skills.stomp.name', description: '전장 전체 적 2초 기절 및 넉백', descriptionKey: 'heroes.ssr_high_chieftain.skills.stomp.desc', color: '#fbbf24', isShared: false, cost: 800 },
          { id: 'hc_chieftain_will', name: '족장의 의지', nameKey: 'heroes.ssr_high_chieftain.skills.chieftain_will.name', description: '아군 전체 HP 50% 즉시 회복 및 20초간 DEF +60', descriptionKey: 'heroes.ssr_high_chieftain.skills.chieftain_will.desc', color: '#d97706', isShared: false, cost: 1200 },
          { id: 'hc_ancestral_protection', name: '선조의 가호', nameKey: 'heroes.ssr_high_chieftain.skills.ancestral_protection.name', description: '사망한 아군 1명을 HP 100%로 즉시 부활', descriptionKey: 'heroes.ssr_high_chieftain.skills.ancestral_protection.desc', color: '#b45309', isShared: false, cost: 1500 },
          { id: 'hc_tauren_rally_lr', name: '타우렌 결집', nameKey: 'heroes.ssr_high_chieftain.skills.tauren_rally.name', description: '타우렌 계열 영웅 전원 15초간 무적 및 공격력 2배', descriptionKey: 'heroes.ssr_high_chieftain.skills.tauren_rally.desc', color: '#78350f', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'high_chieftain_warrior', name: '투사', nameKey: 'heroes.ssr_high_chieftain.routes.high_chieftain_warrior.name', color: '#92400e', role: 'melee_dps',
        uniqueVariant: { name: '족장의 분노', nameKey: 'heroes.ssr_high_chieftain.routes.high_chieftain_warrior.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상에게 ATK×5 추가 물리 피해.', descriptionTemplateKey: 'heroes.ssr_high_chieftain.routes.high_chieftain_warrior.variantDesc' },
        skills: [
          { id: 'hc_brutal_strike', name: '무자비한 타격', nameKey: 'heroes.ssr_high_chieftain.skills.brutal_strike.name', description: '단일 ATK×10 피해 및 방어력 무시', descriptionKey: 'heroes.ssr_high_chieftain.skills.brutal_strike.desc', color: '#7c2d12', isShared: false, cost: 500 },
          { id: 'hc_war_cry', name: '전쟁의 외침', nameKey: 'heroes.ssr_high_chieftain.skills.war_cry.name', description: '15초간 아군 전체 공격력 50% 증가', descriptionKey: 'heroes.ssr_high_chieftain.skills.war_cry.desc', color: '#92400e', isShared: false, cost: 800 },
          { id: 'hc_blood_thirst', name: '피의 갈증', nameKey: 'heroes.ssr_high_chieftain.skills.blood_thirst.name', description: '패시브: 자신의 모든 공격에 20% 흡혈 부여', descriptionKey: 'heroes.ssr_high_chieftain.skills.blood_thirst.desc', color: '#78350f', isShared: false, cost: 1200 },
          { id: 'hc_heroic_leap', name: '영웅의 도약', nameKey: 'heroes.ssr_high_chieftain.skills.heroic_leap.name', description: '타겟 위치로 도약하여 ATK×8 광역 피해 및 기절', descriptionKey: 'heroes.ssr_high_chieftain.skills.heroic_leap.desc', color: '#451a03', isShared: false, cost: 1500 },
          { id: 'hc_avatar_of_war', name: '전쟁의 화신', nameKey: 'heroes.ssr_high_chieftain.skills.avatar_of_war.name', description: '20초간 거대화: 공격력 3배, 모든 공격 광역화', descriptionKey: 'heroes.ssr_high_chieftain.skills.avatar_of_war.desc', color: '#000000', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 2400, atk: 130, def: 110, spd: 2.5, attackRange: 60, attackCooldown: 2.5 }, color: '#a16207',
  },
  {
    id: 'ssr_goblin_emperor', name: '고블린 황제', nameKey: 'heroes.ssr_goblin_emperor.name', grade: 'AR', role: 'tank', raceName: '고블린', elementName: '번개', starRating: 1,
    lore: '무수한 기계와 골드를 거느린 고블린들의 황제. 그의 부귀영화는 곧 그의 무력이 된다.', loreKey: 'heroes.ssr_goblin_emperor.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'goblin_emperor_dominion', name: '황제 지배', nameKey: 'heroes.ssr_goblin_emperor.routes.goblin_emperor_dominion.name', color: '#eab308', role: 'tank',
        uniqueVariant: { name: '황제의 갑옷', nameKey: 'heroes.ssr_goblin_emperor.routes.goblin_emperor_dominion.variantName', descriptionTemplate: '받는 피해 {value}% 감소 및 피격 시 골드 획득.', descriptionTemplateKey: 'heroes.ssr_goblin_emperor.routes.goblin_emperor_dominion.variantDesc' },
        skills: [
          { id: 'ge_golden_army', name: '황금 군단', nameKey: 'heroes.ssr_goblin_emperor.skills.golden_army.name', description: '기계 병사 5명 소환 (상시 근딜)', descriptionKey: 'heroes.ssr_goblin_emperor.skills.golden_army.desc', color: '#fde68a', isShared: false, cost: 500,
            summonStats: { displayName: '기계 병사', displayNameKey: 'heroes.ssr_goblin_emperor.summons.mech_soldier.name', hp: 400, atk: 100, def: 20, spd: 4, role: 'melee_dps', attackRange: 45, duration: 0 } },
          { id: 'ge_rocket_armor', name: '로켓 갑옷', nameKey: 'heroes.ssr_goblin_emperor.skills.rocket_armor.name', description: '10초간 자신 무적 및 피격 시 로켓 반격', descriptionKey: 'heroes.ssr_goblin_emperor.skills.rocket_armor.desc', color: '#facc15', isShared: false, cost: 800 },
          { id: 'ge_goblin_empire', name: '고블린 제국', nameKey: 'heroes.ssr_goblin_emperor.skills.goblin_empire.name', description: '전장 전체 기계 함정: 적 밟으면 ATK×8 폭발', descriptionKey: 'heroes.ssr_goblin_emperor.skills.goblin_empire.desc', color: '#eab308', isShared: false, cost: 1200 },
          { id: 'ge_repair_bots', name: '수리 로봇', nameKey: 'heroes.ssr_goblin_emperor.skills.repair_bots.name', description: '아군 전체의 소환수 및 벽을 즉시 50% 수리', descriptionKey: 'heroes.ssr_goblin_emperor.skills.repair_bots.desc', color: '#ca8a04', isShared: false, cost: 1500 },
          { id: 'ge_emperor_decree', name: '황제의 칙령', nameKey: 'heroes.ssr_goblin_emperor.skills.emperor_decree.name', description: '모든 적 강제 소환 후 ATK×15 전방위 폭격', descriptionKey: 'heroes.ssr_goblin_emperor.skills.emperor_decree.desc', color: '#92400e', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'goblin_emperor_wealth', name: '부귀', nameKey: 'heroes.ssr_goblin_emperor.routes.goblin_emperor_wealth.name', color: '#84cc16', role: 'ranged_dps',
        uniqueVariant: { name: '황금의 힘', nameKey: 'heroes.ssr_goblin_emperor.routes.goblin_emperor_wealth.variantName', descriptionTemplate: '공격 시 {value}% 확률로 적을 황금 동상으로 만듭니다 (기절 3초).', descriptionTemplateKey: 'heroes.ssr_goblin_emperor.routes.goblin_emperor_wealth.variantDesc' },
        skills: [
          { id: 'ge_gold_blast', name: '황금 폭발', nameKey: 'heroes.ssr_goblin_emperor.skills.gold_blast.name', description: '단일 ATK×8 신성 피해 + 골드 드랍', descriptionKey: 'heroes.ssr_goblin_emperor.skills.gold_blast.desc', color: '#bef264', isShared: false, cost: 500 },
          { id: 'ge_tax_collection', name: '세금 징수', nameKey: 'heroes.ssr_goblin_emperor.skills.tax_collection.name', description: '모든 적에게 피해를 입히고 총 피해량의 10% 골드 획득', descriptionKey: 'heroes.ssr_goblin_emperor.skills.tax_collection.desc', color: '#a3e635', isShared: false, cost: 800 },
          { id: 'ge_mercenary_contract', name: '용병 계약', nameKey: 'heroes.ssr_goblin_emperor.skills.mercenary_contract.name', description: '강력한 정예 용병 2명 소환 (상시 원딜)', descriptionKey: 'heroes.ssr_goblin_emperor.skills.mercenary_contract.desc', color: '#84cc16', isShared: false, cost: 1200,
            summonStats: { displayName: '정예 용병', displayNameKey: 'heroes.ssr_goblin_emperor.summons.elite_merc.name', hp: 600, atk: 180, def: 30, spd: 3.5, role: 'ranged_dps', attackRange: 600, duration: 0 } },
          { id: 'ge_stock_market', name: '주식 폭등', nameKey: 'heroes.ssr_goblin_emperor.skills.stock_market.name', description: '15초간 아군 전체 모든 능력치 50% 증가', descriptionKey: 'heroes.ssr_goblin_emperor.skills.stock_market.desc', color: '#65a30d', isShared: false, cost: 1500 },
          { id: 'ge_golden_rain', name: '황금의 비', nameKey: 'heroes.ssr_goblin_emperor.skills.golden_rain.name', description: '하늘에서 거대 금괴 투하: 모든 적 즉사 확률', descriptionKey: 'heroes.ssr_goblin_emperor.skills.golden_rain.desc', color: '#3f6212', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1500, atk: 60, def: 100, spd: 3.5, attackRange: 60, attackCooldown: 0.4 }, color: '#eab308',
  },
  {
    id: 'ssr_blood_prince', name: '선혈의 왕자', nameKey: 'heroes.ssr_blood_prince.name', grade: 'AR', role: 'melee_dps', raceName: '블러드엘프', elementName: '불꽃', starRating: 1,
    lore: '불타는 피의 힘을 완전히 해방한 선혈의 왕자. 그의 분노는 아군조차 두렵게 만든다.', loreKey: 'heroes.ssr_blood_prince.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'blood_prince_liberation', name: '선혈 해방', nameKey: 'heroes.ssr_blood_prince.routes.blood_prince_liberation.name', color: '#e11d48', role: 'melee_dps',
        uniqueVariant: { name: '선혈의 광기', nameKey: 'heroes.ssr_blood_prince.routes.blood_prince_liberation.variantName', descriptionTemplate: '잃은 체력 1%당 공격력 {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_blood_prince.routes.blood_prince_liberation.variantDesc' },
        skills: [
          { id: 'bp_blood_slash', name: '혈화 베기', nameKey: 'heroes.ssr_blood_prince.skills.blood_slash.name', description: '자신 HP 10% 소모, ATK×10 혈화 피해', descriptionKey: 'heroes.ssr_blood_prince.skills.blood_slash.desc', color: '#fda4af', isShared: false, cost: 500 },
          { id: 'bp_crimson_thirst', name: '선혈의 갈증', nameKey: 'heroes.ssr_blood_prince.skills.crimson_thirst.name', description: '15초간 모든 피해 100% 흡혈 + 공속 2배', descriptionKey: 'heroes.ssr_blood_prince.skills.crimson_thirst.desc', color: '#f43f5e', isShared: false, cost: 800 },
          { id: 'bp_flame_blade_lr', name: '불꽃 피의 칼날', nameKey: 'heroes.ssr_blood_prince.skills.flame_blade.name', description: '전방 직선 모든 적 ATK×8 화염 피해', descriptionKey: 'heroes.ssr_blood_prince.skills.flame_blade.desc', color: '#e11d48', isShared: false, cost: 1200 },
          { id: 'bp_blood_boil', name: '피의 끓음', nameKey: 'heroes.ssr_blood_prince.skills.blood_boil.name', description: '모든 적에게 지속 출혈 피해 및 50% 슬로우', descriptionKey: 'heroes.ssr_blood_prince.skills.blood_boil.desc', color: '#be123c', isShared: false, cost: 1500 },
          { id: 'bp_blood_lord', name: '피의 군주', nameKey: 'heroes.ssr_blood_prince.skills.blood_lord.name', description: '혈액 변신: 20초간 무적 + 흡혈 + 공격력 3배', descriptionKey: 'heroes.ssr_blood_prince.skills.blood_lord.desc', color: '#881337', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'blood_prince_vampire', name: '흡혈', nameKey: 'heroes.ssr_blood_prince.routes.blood_prince_vampire.name', color: '#9f1239', role: 'melee_dps',
        uniqueVariant: { name: '흡혈의 정수', nameKey: 'heroes.ssr_blood_prince.routes.blood_prince_vampire.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상의 최대 HP 5%를 흡수합니다.', descriptionTemplateKey: 'heroes.ssr_blood_prince.routes.blood_prince_vampire.variantDesc' },
        skills: [
          { id: 'bp_vampiric_bite', name: '흡혈의 물어뜯기', nameKey: 'heroes.ssr_blood_prince.skills.vampiric_bite.name', description: '단일 ATK×12 피해 및 HP 30% 회복', descriptionKey: 'heroes.ssr_blood_prince.skills.vampiric_bite.desc', color: '#f43f5e', isShared: false, cost: 500 },
          { id: 'bp_swarming_bats', name: '박쥐 떼 소환', nameKey: 'heroes.ssr_blood_prince.skills.swarming_bats.name', description: '박쥐 떼를 소환하여 전장 전체 적 지속 피해', descriptionKey: 'heroes.ssr_blood_prince.skills.swarming_bats.desc', color: '#e11d48', isShared: false, cost: 800 },
          { id: 'bp_essence_drain', name: '정수 흡수', nameKey: 'heroes.ssr_blood_prince.skills.essence_drain.name', description: '적 3명에게 빨대를 꽂아 HP를 지속적으로 갈취', descriptionKey: 'heroes.ssr_blood_prince.skills.essence_drain.desc', color: '#9f1239', isShared: false, cost: 1200 },
          { id: 'bp_mist_form', name: '안개 형상', nameKey: 'heroes.ssr_blood_prince.skills.mist_form.name', description: '10초간 모든 공격 회피 및 주변 적 지속 피해', descriptionKey: 'heroes.ssr_blood_prince.skills.mist_form.desc', color: '#881337', isShared: false, cost: 1500 },
          { id: 'bp_night_ritual', name: '한밤의 의식', nameKey: 'heroes.ssr_blood_prince.skills.night_ritual.name', description: '전장 전체 적 구속 및 ATK×20 암흑 피해', descriptionKey: 'heroes.ssr_blood_prince.skills.night_ritual.desc', color: '#4c0519', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1200, atk: 240, def: 40, spd: 6, attackRange: 55 }, color: '#e11d48',
  },
  {
    id: 'ssr_royal_captain', name: '왕실 기사단장', nameKey: 'heroes.ssr_royal_captain.name', grade: 'AR', role: 'tank', raceName: '인간', elementName: '신성', starRating: 1,
    lore: '왕국 최강의 기사. 기사단을 이끄는 신성한 수호자이며 충성심의 상징이다.', loreKey: 'heroes.ssr_royal_captain.lore',
    uniqueSkill: { baseValues: [15, 25, 35, 50, 75], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'royal_captain_order', name: '기사단', nameKey: 'heroes.ssr_royal_captain.routes.royal_captain_order.name', color: '#fbbf24', role: 'tank',
        uniqueVariant: { name: '기사단의 맹세', nameKey: 'heroes.ssr_royal_captain.routes.royal_captain_order.variantName', descriptionTemplate: '아군 전체 방어력 {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_royal_captain.routes.royal_captain_order.variantDesc' },
        skills: [
          { id: 'rc_knights_oath_lr', name: '기사단의 결속', nameKey: 'heroes.ssr_royal_captain.skills.knights_oath.name', description: '아군 전체 HP 30% 신성 보호막 부여 (15초)', descriptionKey: 'heroes.ssr_royal_captain.skills.knights_oath.desc', color: '#fef08a', isShared: false, cost: 500 },
          { id: 'rc_royal_shield_lr', name: '왕실의 방패', nameKey: 'heroes.ssr_royal_captain.skills.royal_shield.name', description: '20초간 아군 전체 받는 피해 50% 차단', descriptionKey: 'heroes.ssr_royal_captain.skills.royal_shield.desc', color: '#fde68a', isShared: false, cost: 800 },
          { id: 'rc_rally_horn_lr', name: '집결의 나팔', nameKey: 'heroes.ssr_royal_captain.skills.rally_horn.name', description: '아군 전체 부활 및 30초간 모든 능력치 강화', descriptionKey: 'heroes.ssr_royal_captain.skills.rally_horn.desc', color: '#fbbf24', isShared: false, cost: 1200 },
          { id: 'rc_holy_charge', name: '신성한 돌격', nameKey: 'heroes.ssr_royal_captain.skills.holy_charge.name', description: '적진을 돌파하여 모든 적 3초 기절 + ATK×6 피해', descriptionKey: 'heroes.ssr_royal_captain.skills.holy_charge.desc', color: '#d97706', isShared: false, cost: 1500 },
          { id: 'rc_paladin_fury_lr', name: '성기사의 분노', nameKey: 'heroes.ssr_royal_captain.skills.paladin_fury.name', description: '15초간 무적 + ATK 5배 + 모든 공격 광역화', descriptionKey: 'heroes.ssr_royal_captain.skills.paladin_fury.desc', color: '#a16207', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'royal_captain_honor', name: '명예', nameKey: 'heroes.ssr_royal_captain.routes.royal_captain_honor.name', color: '#f59e0b', role: 'melee_dps',
        uniqueVariant: { name: '명예의 결투', nameKey: 'heroes.ssr_royal_captain.routes.royal_captain_honor.variantName', descriptionTemplate: '보스에게 입히는 피해 {value}% 증가.', descriptionTemplateKey: 'heroes.ssr_royal_captain.routes.royal_captain_honor.variantDesc' },
        skills: [
          { id: 'rc_duel_challenge', name: '결투 신청', nameKey: 'heroes.ssr_royal_captain.skills.duel_challenge.name', description: '가장 강한 적 1명과 1:1 결투 (적 약화, 자신 강화)', descriptionKey: 'heroes.ssr_royal_captain.skills.duel_challenge.desc', color: '#fbbf24', isShared: false, cost: 500 },
          { id: 'rc_sword_of_light', name: '빛의 검', nameKey: 'heroes.ssr_royal_captain.skills.sword_of_light.name', description: '단일 ATK×12 신성 피해 + 5초간 침묵', descriptionKey: 'heroes.ssr_royal_captain.skills.sword_of_light.desc', color: '#f59e0b', isShared: false, cost: 800 },
          { id: 'rc_victory_shout', name: '승리의 외침', nameKey: 'heroes.ssr_royal_captain.skills.victory_shout.name', description: '적 처치 시 아군 전체 공격력 +10% (무제한 중첩)', descriptionKey: 'heroes.ssr_royal_captain.skills.victory_shout.desc', color: '#d97706', isShared: false, cost: 1200 },
          { id: 'rc_divine_storm_rc', name: '신성한 폭풍', nameKey: 'heroes.ssr_royal_captain.skills.divine_storm.name', description: '주변 광역 ATK×8 피해 및 아군 힐', descriptionKey: 'heroes.ssr_royal_captain.skills.divine_storm.desc', color: '#b45309', isShared: false, cost: 1500 },
          { id: 'rc_kings_justice', name: '국왕의 심판', nameKey: 'heroes.ssr_royal_captain.skills.kings_justice.name', description: '모든 적 즉시 HP 30% 감소 (보스 ATK×20)', descriptionKey: 'heroes.ssr_royal_captain.skills.kings_justice.desc', color: '#7c2d12', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1800, atk: 135, def: 100, spd: 3, attackRange: 55 }, color: '#fbbf24',
  },
  {
    id: 'ssr_orc_great_chief', name: '오크 대족장', nameKey: 'heroes.ssr_orc_great_chief.name', grade: 'AR', role: 'melee_dps', raceName: '오크', elementName: '화염', starRating: 1,
    lore: '오크 전 부족을 통일한 전쟁의 화신. 그의 도끼가 닿는 곳엔 승리만이 남는다.', loreKey: 'heroes.ssr_orc_great_chief.lore',
    uniqueSkill: { baseValues: [25, 40, 60, 85, 120], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'orc_great_chief_war', name: '전쟁의 신', nameKey: 'heroes.ssr_orc_great_chief.routes.orc_great_chief_war.name', color: '#b91c1c', role: 'melee_dps',
        uniqueVariant: { name: '대족장의 검', nameKey: 'heroes.ssr_orc_great_chief.routes.orc_great_chief_war.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상에게 4배 피해.', descriptionTemplateKey: 'heroes.ssr_orc_great_chief.routes.orc_great_chief_war.variantDesc' },
        skills: [
          { id: 'ogc_chief_blade_lr', name: '대족장의 검', nameKey: 'heroes.ssr_orc_great_chief.skills.chief_blade.name', description: '전방 부채꼴 광역 ATK×8 화염 피해', descriptionKey: 'heroes.ssr_orc_great_chief.skills.chief_blade.desc', color: '#f87171', isShared: false, cost: 500 },
          { id: 'ogc_war_charge_lr', name: '살육의 돌격', nameKey: 'heroes.ssr_orc_great_chief.skills.war_charge.name', description: '전방 직선 돌격: 충돌 적 ATK×10 + 3초 기절', descriptionKey: 'heroes.ssr_orc_great_chief.skills.war_charge.desc', color: '#ef4444', isShared: false, cost: 800 },
          { id: 'ogc_chiefs_will_lr', name: '족장의 의지', nameKey: 'heroes.ssr_orc_great_chief.skills.chiefs_will.name', description: '20초간 공격력 2.5배 + 피해 면역 50%', descriptionKey: 'heroes.ssr_orc_great_chief.skills.chiefs_will.desc', color: '#dc2626', isShared: false, cost: 1200 },
          { id: 'ogc_executioner', name: '집행자', nameKey: 'heroes.ssr_orc_great_chief.skills.executioner.name', description: '패시브: HP 50% 이하 적에게 입히는 피해 2배', descriptionKey: 'heroes.ssr_orc_great_chief.skills.executioner.desc', color: '#b91c1c', isShared: false, cost: 1500 },
          { id: 'ogc_war_cry_lr', name: '전쟁의 포효', nameKey: 'heroes.ssr_orc_great_chief.skills.war_cry.name', description: '전장 전체 적 ATK×15 피해 + 아군 전체 공속 100%', descriptionKey: 'heroes.ssr_orc_great_chief.skills.war_cry.desc', color: '#7f1d1d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'orc_great_chief_honor', name: '명예', nameKey: 'heroes.ssr_orc_great_chief.routes.orc_great_chief_honor.name', color: '#7c2d12', role: 'tank',
        uniqueVariant: { name: '오크의 자부심', nameKey: 'heroes.ssr_orc_great_chief.routes.orc_great_chief_honor.variantName', descriptionTemplate: '아군 전체 방어력 {value}% 증가 및 모든 디버프 면역.', descriptionTemplateKey: 'heroes.ssr_orc_great_chief.routes.orc_great_chief_honor.variantDesc' },
        skills: [
          { id: 'ogc_iron_skin', name: '무쇠 피부', nameKey: 'heroes.ssr_orc_great_chief.skills.iron_skin.name', description: '패시브: 자신의 방어력 +100 증가', descriptionKey: 'heroes.ssr_orc_great_chief.skills.iron_skin.desc', color: '#92400e', isShared: false, cost: 500 },
          { id: 'ogc_ancestral_shield', name: '선조의 방패', nameKey: 'heroes.ssr_orc_great_chief.skills.ancestral_shield.name', description: '아군 전체에게 거대 보호막 및 힐', descriptionKey: 'heroes.ssr_orc_great_chief.skills.ancestral_shield.desc', color: '#b45309', isShared: false, cost: 800 },
          { id: 'ogc_taunt_master', name: '황야의 도발', nameKey: 'heroes.ssr_orc_great_chief.skills.taunt_master.name', description: '모든 적을 자신에게 집중 + 8초간 무적', descriptionKey: 'heroes.ssr_orc_great_chief.skills.taunt_master.desc', color: '#78350f', isShared: false, cost: 1200 },
          { id: 'ogc_earth_breaker', name: '대지 파괴', nameKey: 'heroes.ssr_orc_great_chief.skills.earth_breaker.name', description: '전방 넓은 범위 기절 5초 + 넉백', descriptionKey: 'heroes.ssr_orc_great_chief.skills.earth_breaker.desc', color: '#451a03', isShared: false, cost: 1500 },
          { id: 'ogc_horde_unity', name: '호드의 단결', nameKey: 'heroes.ssr_orc_great_chief.skills.horde_unity.name', description: '전체 아군 공격력/방어력 3배 증가 20초', descriptionKey: 'heroes.ssr_orc_great_chief.skills.horde_unity.desc', color: '#000000', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 2000, atk: 275, def: 60, spd: 4.5, attackRange: 60, attackCooldown: 1.8 }, color: '#b91c1c',
  },
  {
    id: 'ssr_witch_king', name: '부두술왕', nameKey: 'heroes.ssr_witch_king.name', grade: 'AR', role: 'cc', raceName: '트롤', elementName: '독', starRating: 1,
    lore: '수천 년 부두 의식의 결정체. 그의 저주는 죽음보다 깊은 고통을 선사한다.', loreKey: 'heroes.ssr_witch_king.lore',
    uniqueSkill: { baseValues: [20, 35, 50, 75, 100], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'witch_king_curse', name: '저주', nameKey: 'heroes.ssr_witch_king.routes.witch_king_curse.name', color: '#166534', role: 'cc',
        uniqueVariant: { name: '대부두 저주', nameKey: 'heroes.ssr_witch_king.routes.witch_king_curse.variantName', descriptionTemplate: '저주 지속시간 {value}% 증가 및 감염 효과.', descriptionTemplateKey: 'heroes.ssr_witch_king.routes.witch_king_curse.variantDesc' },
        skills: [
          { id: 'wk_voodoo_doll_lr', name: '대부두 인형', nameKey: 'heroes.ssr_witch_king.skills.voodoo_doll.name', description: '적 1명 받는 피해 3배 증가 15초', descriptionKey: 'heroes.ssr_witch_king.skills.voodoo_doll.desc', color: '#4ade80', isShared: false, cost: 500 },
          { id: 'wk_spirit_raise_lr', name: '정령 강령', nameKey: 'heroes.ssr_witch_king.skills.spirit_raise.name', description: '죽은 적을 정령으로 소환 (상시 유지)', descriptionKey: 'heroes.ssr_witch_king.skills.spirit_raise.desc', color: '#22c55e', isShared: false, cost: 800,
            summonStats: { displayName: '부두 정령', displayNameKey: 'heroes.ssr_witch_king.summons.voodoo_spirit.name', hp: 400, atk: 80, def: 10, spd: 4.5, role: 'melee_dps', attackRange: 45, duration: 0 } },
          { id: 'wk_toxic_ritual_lr', name: '독성 의식', nameKey: 'heroes.ssr_witch_king.skills.toxic_ritual.name', description: '전체 적 중독 + 15초간 회복 불가', descriptionKey: 'heroes.ssr_witch_king.skills.toxic_ritual.desc', color: '#16a34a', isShared: false, cost: 1200 },
          { id: 'wk_voodoo_hex', name: '광역 주술', nameKey: 'heroes.ssr_witch_king.skills.voodoo_hex.name', description: '모든 적 8초간 개구리로 변이', descriptionKey: 'heroes.ssr_witch_king.skills.voodoo_hex.desc', color: '#15803d', isShared: false, cost: 1500 },
          { id: 'wk_death_dance_lr', name: '죽음의 춤', nameKey: 'heroes.ssr_witch_king.skills.death_dance.name', description: '전장 전체 부두 의식: 모든 적 소멸 확률', descriptionKey: 'heroes.ssr_witch_king.skills.death_dance.desc', color: '#14532d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'witch_king_shadow', name: '어둠', nameKey: 'heroes.ssr_witch_king.routes.witch_king_shadow.name', color: '#4c1d95', role: 'ranged_dps',
        uniqueVariant: { name: '그림자 습격', nameKey: 'heroes.ssr_witch_king.routes.witch_king_shadow.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상에게 암흑 까마귀 떼를 보내 지속 피해를 입힙니다.', descriptionTemplateKey: 'heroes.ssr_witch_king.routes.witch_king_shadow.variantDesc' },
        skills: [
          { id: 'wk_shadow_bolt', name: '그림자 화살', nameKey: 'heroes.ssr_witch_king.skills.shadow_bolt.name', description: '단일 ATK×8 암흑 피해', descriptionKey: 'heroes.ssr_witch_king.skills.shadow_bolt.desc', color: '#7c3aed', isShared: false, cost: 500 },
          { id: 'wk_dark_totem', name: '어둠의 토템', nameKey: 'heroes.ssr_witch_king.skills.dark_totem.name', description: '주변 적 공격력 50% 감소 토템 소환', descriptionKey: 'heroes.ssr_witch_king.skills.dark_totem.desc', color: '#6d28d9', isShared: false, cost: 800 },
          { id: 'wk_soul_harvest', name: '영혼 수확', nameKey: 'heroes.ssr_witch_king.skills.soul_harvest.name', description: '적 처치 시마다 아군 전체 공격력 +5% 영구 (최대 50%)', descriptionKey: 'heroes.ssr_witch_king.skills.soul_harvest.desc', color: '#5b21b6', isShared: false, cost: 1200 },
          { id: 'wk_night_fall', name: '황혼의 부름', nameKey: 'heroes.ssr_witch_king.skills.night_fall.name', description: '모든 적 실명 10초 및 지속 암흑 피해', descriptionKey: 'heroes.ssr_witch_king.skills.night_fall.desc', color: '#4c1d95', isShared: false, cost: 1500 },
          { id: 'wk_abyss_ritual', name: '심연의 의식', nameKey: 'heroes.ssr_witch_king.skills.abyss_ritual.name', description: '전장을 심연으로 뒤덮어 적들 즉사 및 아군 완전 회복', descriptionKey: 'heroes.ssr_witch_king.skills.abyss_ritual.desc', color: '#2e1065', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1200, atk: 125, def: 40, spd: 3.5, attackRange: 1200, attackCooldown: 0.45 }, color: '#166534',
  },
  {
    id: 'ssr_golden_panda', name: '황금빛 판다', nameKey: 'heroes.ssr_golden_panda.name', grade: 'AR', role: 'tank', raceName: '판다렌', elementName: '물', starRating: 1,
    lore: '황금 축복을 받은 전설의 판다. 싸울수록 강해지며 그 끝은 아무도 모른다.', loreKey: 'heroes.ssr_golden_panda.lore',
    uniqueSkill: { baseValues: [25, 40, 60, 85, 120], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'golden_panda_brew', name: '황금 양조', nameKey: 'heroes.ssr_golden_panda.routes.golden_panda_brew.name', color: '#f59e0b', role: 'tank',
        uniqueVariant: { name: '황금 술법', nameKey: 'heroes.ssr_golden_panda.routes.golden_panda_brew.variantName', descriptionTemplate: '피격 시 {value}% 확률로 피해 반사 및 자신 힐.', descriptionTemplateKey: 'heroes.ssr_golden_panda.routes.golden_panda_brew.variantDesc' },
        skills: [
          { id: 'gp_golden_brew_lr', name: '황금 양조', nameKey: 'heroes.ssr_golden_panda.skills.golden_brew.name', description: '황금 술을 마셔 20초간 무적 및 HP 완전 회복', descriptionKey: 'heroes.ssr_golden_panda.skills.golden_brew.desc', color: '#fde68a', isShared: false, cost: 500 },
          { id: 'gp_stagger_gold', name: '황금 시간차', nameKey: 'heroes.ssr_golden_panda.skills.stagger_gold.name', description: '받는 피해 80%를 20초간 나누어 입음', descriptionKey: 'heroes.ssr_golden_panda.skills.stagger_gold.desc', color: '#fbbf24', isShared: false, cost: 800 },
          { id: 'gp_storm_earth_fire_lr', name: '폭풍 대지 불', nameKey: 'heroes.ssr_golden_panda.skills.storm_earth_fire.name', description: '분신 3개 소환 (각 80% 스탯, 상시)', descriptionKey: 'heroes.ssr_golden_panda.skills.storm_earth_fire.desc', color: '#f59e0b', isShared: false, cost: 1200,
            summonStats: { displayName: '황금 분신', displayNameKey: 'heroes.ssr_golden_panda.summons.golden_clone.name', hp: 1000, atk: 150, def: 50, spd: 4, role: 'melee_dps', attackRange: 50, duration: 0 } },
          { id: 'gp_breath_of_fire_gold', name: '황금 불의 숨결', nameKey: 'heroes.ssr_golden_panda.skills.breath_of_fire_gold.name', description: '전방 거대 화염 방사: 적 격파 및 지속 피해', descriptionKey: 'heroes.ssr_golden_panda.skills.breath_of_fire_gold.desc', color: '#d97706', isShared: false, cost: 1500 },
          { id: 'gp_golden_wave_lr', name: '황금 판다의 파동', nameKey: 'heroes.ssr_golden_panda.skills.golden_wave.name', description: '황금 에너지 폭발: 모든 적 즉사 확률 및 아군 완전 부활', descriptionKey: 'heroes.ssr_golden_panda.skills.golden_wave.desc', color: '#92400e', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'golden_panda_zen', name: '명상', nameKey: 'heroes.ssr_golden_panda.routes.golden_panda_zen.name', color: '#06b6d4', role: 'cc',
        uniqueVariant: { name: '선(Zen)의 경지', nameKey: 'heroes.ssr_golden_panda.routes.golden_panda_zen.variantName', descriptionTemplate: '모든 아군에게 해로운 효과 면역 및 방어력 {value} 증가.', descriptionTemplateKey: 'heroes.ssr_golden_panda.routes.golden_panda_zen.variantDesc' },
        skills: [
          { id: 'gp_zen_meditation', name: '명상', nameKey: 'heroes.ssr_golden_panda.skills.zen_meditation.name', description: '10초간 아군 전체 받는 피해 80% 감소', descriptionKey: 'heroes.ssr_golden_panda.skills.zen_meditation.desc', color: '#67e8f9', isShared: false, cost: 500 },
          { id: 'gp_mist_barrier', name: '안개 장벽', nameKey: 'heroes.ssr_golden_panda.skills.mist_barrier.name', description: '전장에 안개를 깔아 적 명중률 90% 감소 15초', descriptionKey: 'heroes.ssr_golden_panda.skills.mist_barrier.desc', color: '#22d3ee', isShared: false, cost: 800 },
          { id: 'gp_chi_surge', name: '기 파동', nameKey: 'heroes.ssr_golden_panda.skills.chi_surge.name', description: '적들을 밀쳐내고 아군 전체 마나(스킬쿨) 회복', descriptionKey: 'heroes.ssr_golden_panda.skills.chi_surge.desc', color: '#0891b2', isShared: false, cost: 1200 },
          { id: 'gp_peace_ring', name: '평화의 고리', nameKey: 'heroes.ssr_golden_panda.skills.peace_ring.name', description: '적들을 고리 밖으로 쫓아내고 진입 불가 10초', descriptionKey: 'heroes.ssr_golden_panda.skills.peace_ring.desc', color: '#0e7490', isShared: false, cost: 1500 },
          { id: 'gp_transcendence', name: '해탈', nameKey: 'heroes.ssr_golden_panda.skills.transcendence.name', description: '전장의 모든 적을 15초간 정지시키고 정화', descriptionKey: 'heroes.ssr_golden_panda.skills.transcendence.desc', color: '#164e63', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 2500, atk: 110, def: 115, spd: 3, attackRange: 60 }, color: '#f59e0b',
  },
  {
    id: 'ssr_primordial_dragon_heir', name: '고룡의 후예', nameKey: 'heroes.ssr_primordial_dragon_heir.name', grade: 'AR', role: 'ranged_dps', raceName: '드렉티르', elementName: '용', starRating: 1,
    lore: '태초의 드래곤 혈통이 깨어난 자. 그의 몸 안엔 다섯 위상의 힘이 소용돌이친다.', loreKey: 'heroes.ssr_primordial_dragon_heir.lore',
    uniqueSkill: { baseValues: [50, 100, 150, 200, 300], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'primordial_dragon_awakening', name: '고룡 각성', nameKey: 'heroes.ssr_primordial_dragon_heir.routes.primordial_dragon_awakening.name', color: '#dc2626', role: 'ranged_dps',
        uniqueVariant: { name: '고룡의 피', nameKey: 'heroes.ssr_primordial_dragon_heir.routes.primordial_dragon_awakening.variantName', descriptionTemplate: '스킬 피해 {value}% 증가 및 모든 원소 시너지 활성화.', descriptionTemplateKey: 'heroes.ssr_primordial_dragon_heir.routes.primordial_dragon_awakening.variantDesc' },
        skills: [
          { id: 'pdh_ancient_breath_lr', name: '원시 용의 숨결', nameKey: 'heroes.ssr_primordial_dragon_heir.skills.ancient_breath.name', description: '5속성 복합 브레스: 전방 모든 적 ATK×10 피해', descriptionKey: 'heroes.ssr_primordial_dragon_heir.skills.ancient_breath.desc', color: '#f97316', isShared: false, cost: 500 },
          { id: 'pdh_ancient_summon_lr', name: '고룡의 소환', nameKey: 'heroes.ssr_primordial_dragon_heir.skills.ancient_summon.name', description: '원시 드래곤 2마리 소환 (상시 원딜)', descriptionKey: 'heroes.ssr_primordial_dragon_heir.skills.ancient_summon.desc', color: '#ef4444', isShared: false, cost: 800,
            summonStats: { displayName: '원시 드래곤', displayNameKey: 'heroes.ssr_primordial_dragon_heir.summons.primordial_dragon.name', hp: 2000, atk: 300, def: 80, spd: 2.5, role: 'ranged_dps', attackRange: 800, duration: 0 } },
          { id: 'pdh_primordial_flame_lr', name: '태고의 불꽃', nameKey: 'heroes.ssr_primordial_dragon_heir.skills.primordial_flame.name', description: '전장 전체 ATK×15 복합 속성 피해', descriptionKey: 'heroes.ssr_primordial_dragon_heir.skills.primordial_flame.desc', color: '#dc2626', isShared: false, cost: 1200 },
          { id: 'pdh_dragon_form', name: '용 형상', nameKey: 'heroes.ssr_primordial_dragon_heir.skills.dragon_form.name', description: '패시브: 자신의 모든 능력치 50% 영구 증가', descriptionKey: 'heroes.ssr_primordial_dragon_heir.skills.dragon_form.desc', color: '#b91c1c', isShared: false, cost: 1500 },
          { id: 'pdh_great_awakening_lr', name: '대각성', nameKey: 'heroes.ssr_primordial_dragon_heir.skills.great_awakening.name', description: '30초간 모든 능력 5배 + 무적 + 전장 초토화', descriptionKey: 'heroes.ssr_primordial_dragon_heir.skills.great_awakening.desc', color: '#7f1d1d', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'primordial_dragon_aspect', name: '위상', nameKey: 'heroes.ssr_primordial_dragon_heir.routes.primordial_dragon_aspect.name', color: '#a855f7', role: 'cc',
        uniqueVariant: { name: '위상의 권능', nameKey: 'heroes.ssr_primordial_dragon_heir.routes.primordial_dragon_aspect.variantName', descriptionTemplate: '공격 시 {value}% 확률로 대상에게 무작위 위상의 저주를 겁니다.', descriptionTemplateKey: 'heroes.ssr_primordial_dragon_heir.routes.primordial_dragon_aspect.variantDesc' },
        skills: [
          { id: 'pdh_time_stop', name: '시간 정지', nameKey: 'heroes.ssr_primordial_dragon_heir.skills.time_stop.name', description: '모든 적 5초간 완전 정지', descriptionKey: 'heroes.ssr_primordial_dragon_heir.skills.time_stop.desc', color: '#d8b4fe', isShared: false, cost: 500 },
          { id: 'pdh_nature_binding', name: '자연의 결속', nameKey: 'heroes.ssr_primordial_dragon_heir.skills.nature_binding.name', description: '적 전체 8초간 속박 및 독 피해', descriptionKey: 'heroes.ssr_primordial_dragon_heir.skills.nature_binding.desc', color: '#c084fc', isShared: false, cost: 800 },
          { id: 'pdh_frost_prison', name: '서리 감옥', nameKey: 'heroes.ssr_primordial_dragon_heir.skills.frost_prison.name', description: '가장 강한 적 3명을 10초간 빙결', descriptionKey: 'heroes.ssr_primordial_dragon_heir.skills.frost_prison.desc', color: '#a855f7', isShared: false, cost: 1200 },
          { id: 'pdh_arcane_surge', name: '비전 급류', nameKey: 'heroes.ssr_primordial_dragon_heir.skills.arcane_surge.name', description: '모든 적 침묵 8초 및 스킬 쿨타임 증가', descriptionKey: 'heroes.ssr_primordial_dragon_heir.skills.arcane_surge.desc', color: '#9333ea', isShared: false, cost: 1500 },
          { id: 'pdh_aspect_union', name: '위상의 결집', nameKey: 'heroes.ssr_primordial_dragon_heir.skills.aspect_union.name', description: '다섯 위상의 힘을 하나로: 전장 모든 적 즉사 확률 50%', descriptionKey: 'heroes.ssr_primordial_dragon_heir.skills.aspect_union.desc', color: '#6b21a8', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1200, atk: 265, def: 50, spd: 3.5, attackRange: 1900 }, color: '#dc2626',
  },
  {
    id: 'ssr_eternal_elf_king', name: '영원의 엘프 왕', nameKey: 'heroes.ssr_eternal_elf_king.name', grade: 'AR', role: 'ranged_dps', raceName: '엘프', elementName: '비전', starRating: 1,
    lore: '모든 엘프 혈통을 초월한 영원한 왕. 비전의 정수 그 자체인 존재다.', loreKey: 'heroes.ssr_eternal_elf_king.lore',
    uniqueSkill: { baseValues: [25, 40, 60, 85, 120], unit: '%' }, starUpgradeCosts: [1000, 2000, 5000, 10000],
    classRoutes: [
      {
        id: 'eternal_elf_arcane', name: '영원의 비전', nameKey: 'heroes.ssr_eternal_elf_king.routes.eternal_elf_arcane.name', color: '#a855f7', role: 'cc',
        uniqueVariant: { name: '비전의 왕', nameKey: 'heroes.ssr_eternal_elf_king.routes.eternal_elf_arcane.variantName', descriptionTemplate: '비전 피해 {value}% 증가 및 모든 투사체 관통 부여.', descriptionTemplateKey: 'heroes.ssr_eternal_elf_king.routes.eternal_elf_arcane.variantDesc' },
        skills: [
          { id: 'eek_eternal_arrow_lr', name: '영원의 화살', nameKey: 'heroes.ssr_eternal_elf_king.skills.eternal_arrow.name', description: '전장 전체 관통하는 비전 화살 ATK×10', descriptionKey: 'heroes.ssr_eternal_elf_king.skills.eternal_arrow.desc', color: '#d8b4fe', isShared: false, cost: 500 },
          { id: 'eek_elf_essence_lr', name: '엘프의 정수', nameKey: 'heroes.ssr_eternal_elf_king.skills.elf_essence.name', description: '엘프 아군 전체 모든 능력 100% 증폭 20초', descriptionKey: 'heroes.ssr_eternal_elf_king.skills.elf_essence.desc', color: '#c084fc', isShared: false, cost: 800 },
          { id: 'eek_starfall_barrage_lr', name: '별빛 소나기', nameKey: 'heroes.ssr_eternal_elf_king.skills.starfall_barrage.name', description: '하늘에서 비전 별빛 50발 폭격 ATK×4', descriptionKey: 'heroes.ssr_eternal_elf_king.skills.starfall_barrage.desc', color: '#a855f7', isShared: false, cost: 1200 },
          { id: 'eek_arcane_mastery', name: '비전의 통달', nameKey: 'heroes.ssr_eternal_elf_king.skills.arcane_mastery.name', description: '패시브: 자신의 모든 스킬 쿨타임 50% 감소', descriptionKey: 'heroes.ssr_eternal_elf_king.skills.arcane_mastery.desc', color: '#9333ea', isShared: false, cost: 1500 },
          { id: 'eek_eternal_verdict_lr', name: '만년의 선고', nameKey: 'heroes.ssr_eternal_elf_king.skills.eternal_verdict.name', description: '모든 적 즉시 HP 1로 감소 및 영구 슬로우 90%', descriptionKey: 'heroes.ssr_eternal_elf_king.skills.eternal_verdict.desc', color: '#6b21a8', isShared: false, cost: 3000, isFinal: true },
        ],
      },
      {
        id: 'eternal_elf_night', name: '밤의 지배', nameKey: 'heroes.ssr_eternal_elf_king.routes.eternal_elf_night.name', color: '#1e1b4b', role: 'cc',
        uniqueVariant: { name: '달빛의 가호', nameKey: 'heroes.ssr_eternal_elf_king.routes.eternal_elf_night.variantName', descriptionTemplate: '아군 전체 초당 {value}% 회복 및 회피율 20% 증가.', descriptionTemplateKey: 'heroes.ssr_eternal_elf_king.routes.eternal_elf_night.variantDesc' },
        skills: [
          { id: 'eek_moonlight', name: '달빛 섬광', nameKey: 'heroes.ssr_eternal_elf_king.skills.moonlight.name', description: '전장 전체 적 침묵 5초 및 지속 피해', descriptionKey: 'heroes.ssr_eternal_elf_king.skills.moonlight.desc', color: '#4338ca', isShared: false, cost: 500 },
          { id: 'eek_night_embrace', name: '밤의 포옹', nameKey: 'heroes.ssr_eternal_elf_king.skills.night_embrace.name', description: '아군 전체 10초간 무적 및 모든 디버프 면역', descriptionKey: 'heroes.ssr_eternal_elf_king.skills.night_embrace.desc', color: '#3730a3', isShared: false, cost: 800 },
          { id: 'eek_summon_sentinel', name: '밤의 파수꾼 소환', nameKey: 'heroes.ssr_eternal_elf_king.skills.summon_sentinel.name', description: '파수꾼 3명 소환 (상시 원딜, 스턴 공격)', descriptionKey: 'heroes.ssr_eternal_elf_king.skills.summon_sentinel.desc', color: '#312e81', isShared: false, cost: 1200,
            summonStats: { displayName: '밤의 파수꾼', displayNameKey: 'heroes.ssr_eternal_elf_king.summons.night_warden.name', hp: 500, atk: 120, def: 20, spd: 4, role: 'ranged_dps', attackRange: 800, duration: 0 } },
          { id: 'eek_falling_star', name: '추락하는 별', nameKey: 'heroes.ssr_eternal_elf_king.skills.falling_star.name', description: '거대 운석 소환: 적 전체 10초 기절 및 ATK×12 피해', descriptionKey: 'heroes.ssr_eternal_elf_king.skills.falling_star.desc', color: '#1e1b4b', isShared: false, cost: 1500 },
          { id: 'eek_eternal_night', name: '영원한 밤', nameKey: 'heroes.ssr_eternal_elf_king.skills.eternal_night.name', description: '전장을 암흑으로 뒤덮어 모든 적 소멸 및 아군 부활', descriptionKey: 'heroes.ssr_eternal_elf_king.skills.eternal_night.desc', color: '#020617', isShared: false, cost: 3000, isFinal: true },
        ],
      },
    ],
    baseStats: { hp: 1100, atk: 235, def: 40, spd: 3.5, attackRange: 1500 }, color: '#a855f7',
  },
];

// ========================
// Utility Functions
// ========================

export const STAR_MULT = [1.0, 1.10, 1.25, 1.45, 1.70] as const;

export const ROLE_ATTACK_COOLDOWN: Record<string, number> = {
  tank: 1.2, melee_dps: 0.7, ranged_dps: 0.7, cc: 2.0, healer: 1.8, mechanic: 1.1,
};

/**
 * 영웅의 최종 공격 쿨타임과 DPS를 계산합니다.
 */
export function calcHeroCombatStats(
  hero: HeroDefinition,
  starRating: number,
  activeRouteId?: string,
  overrideRole?: string,
) {
  const star = Math.max(1, Math.min(5, starRating));
  const mult = STAR_MULT[(star - 1) as 0 | 1 | 2 | 3 | 4];
  const route = activeRouteId ? hero.classRoutes.find(r => r.id === activeRouteId) ?? hero.classRoutes[0] : hero.classRoutes[0];
  const finalRole = overrideRole ?? route.role ?? hero.role;
  
  const roleAtkMult = finalRole === 'ranged_dps' ? 2.0 : 1.0;
  const finalAtk = Math.round(hero.baseStats.atk * mult * roleAtkMult);

  const baseCooldown = hero.baseStats.attackCooldown ?? ROLE_ATTACK_COOLDOWN[finalRole] ?? 1.5;
  const starBonus = hero.starAtkSpeedBonus || 0;
  const attackCooldown = parseFloat((baseCooldown / (1 + starBonus * (star - 1))).toFixed(3));
  
  const dps = Math.round(finalAtk / attackCooldown);

  return { finalRole, finalAtk, attackCooldown, dps };
}

/** 현재 성급 수치 반환 */
export function getUniqueValue(hero: HeroDefinition, star: 1 | 2 | 3 | 4 | 5): number {
  return hero.uniqueSkill.baseValues[star - 1];
}

/**
 * 성급별 기본 능력치 배율 반환
 * 공식: 1 + starRating × 0.05
 * 1성=+5%, 2성=+10%, 3성=+15%, 4성=+20%, 5성=+25%
 */
export function getStarStatMultiplier(star: number): number {
  const s = Math.max(1, Math.min(5, star));
  return 1 + s * 0.05;
}

/**
 * 성급 적용된 기본 스탯 반환 (HP, ATK, DEF, SPD 모두 적용)
 * HeroesPage 표시용
 */
export function getScaledBaseStats(hero: HeroDefinition, star: number) {
  const mult = getStarStatMultiplier(star);
  return {
    hp:  Math.round(hero.baseStats.hp  * mult),
    atk: Math.round(hero.baseStats.atk * mult),
    def: Math.round(hero.baseStats.def * mult),
    spd: parseFloat((hero.baseStats.spd * mult).toFixed(2)),
  };
}

/** 루트 ID로 루트 조회 */
export function getRouteById(hero: HeroDefinition, routeId: string): ClassRoute | undefined {
  return hero.classRoutes.find((r) => r.id === routeId);
}

/** 현재 루트 활성화 상태에서의 고유스킬 설명 반환 */
export function getActiveUniqueDescription(
  hero: HeroDefinition,
  activeRouteId: string
): { name: string; description: string } {
  const route = getRouteById(hero, activeRouteId) ?? hero.classRoutes[0];
  const value = getUniqueValue(hero, hero.starRating);
  const description = route.uniqueVariant.descriptionTemplate
    .replace('{value}', String(value))
    .replace('{unit}', hero.uniqueSkill.unit);
  return { name: route.uniqueVariant.name, description };
}

/** 모든 루트의 스킬을 합쳐 반환 (장착 후보 목록) */
export function getAllAvailableSkills(hero: HeroDefinition): RouteSkill[] {
  return hero.classRoutes.flatMap((r) => r.skills);
}

/** 역할 한글 레이블 */
export const ROLE_LABELS: Record<string, string> = {
  tank: '탱커',
  melee_dps: '근접 딜러',
  ranged_dps: '원거리 딜러',
  cc: 'CC',
  healer: '힐러',
  mechanic: '메카닉',
  all: '올라운더',
};

/**
 * 주인공의 현재 활성 루트에서 게임 역할을 반환합니다.
 * isProtagonist가 false거나 routeRoles가 없으면 hero.role을 반환.
 */
export function getProtagonistRole(hero: HeroDefinition, activeRouteId: string): Role {
  if (hero.isProtagonist && hero.routeRoles) {
    return hero.routeRoles[activeRouteId] ?? hero.role;
  }
  return hero.role;
}


/** 역할 색상 */
export const ROLE_COLORS: Record<string, string> = {
  tank: '#3b82f6',
  melee_dps: '#ef4444',
  ranged_dps: '#f59e0b',
  cc: '#a855f7',
  healer: '#22c55e',
  mechanic: '#06b6d4',
};

/** 등급 색상 */
export const GRADE_COLORS: Record<HeroGrade, string> = {
  R: '#9ca3af',
  SR: '#f59e0b',
  SSR: '#ec4899',
  AR: '#22d3ee',
  LR: '#fbbf24',
};

/** /public/graphic/ 폴더에 PNG 파일이 존재하는 영웅 ID 목록 */
export const HERO_GRAPHIC_IDS = new Set<string>([
  'gardu', 'gazro', 'gray', 'grelcal', 'nostferatu', 'nog',
  'daulgard', 'durga', 'dizgarldo', 'larisian', 'rakan', 'lombardo',
  'lili', 'limu', 'liasian', 'rix', 'magatha', 'maraad', 'maiev', 'malfu',
  'mokra', 'muyeong_salk', 'baine', 'benedict', 'velen', 'voljin',
  'xianghua', 'seori_garam', 'sylva', 'anub', 'arthur', 'aeina',
  'yeshtalktion', 'ultrion', 'ireneerpiria', 'yrel', 'iyena',
  'zedah', 'jainaro', 'zuljin', 'cheondung_garam', 'chen',
  'kalishan', 'kaern_dinohouf', 'keltu', 'quinchai', 'crow',
  'taran', 'tutankaton', 'trontum', 'tyran', 'feldah',
  'pilji_bangkril', 'hamul', 'howl', 'heln_dinohouf',
]);
