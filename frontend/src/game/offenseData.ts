export interface StageDefender {
  name: string;
  displayName: string;
  defenderRole: 'tank' | 'melee_dps' | 'ranged_dps' | 'cc' | 'healer';
  defType: 'normal' | 'leader' | 'soldier';
  hp: number;
  atk: number;
  def: number;
  speed: number;
  isRanged: boolean;
  color: string;
  startX: number;
  startY: number;
  hidesBehindWall?: boolean;
  hasCleave?: boolean;
  auraDamage?: number;
  auraRadius?: number;
}

export interface StageDefinition {
  id: number; // 1~N (글로벌 스테이지 ID)
  regionId: string;
  name: string;
  isBossStage: boolean;
  stageSubIndex: number;
  theme: string;
  themeColor: string;
  description: string;
  gimmick?: 'hidden_ranged';
  normalDefenders: StageDefender[];
  eliteExtra: StageDefender[];
}

export interface RegionDefinition {
  id: string;
  sectorId: string;
  name: string;
  themeColor: string;
  description: string;
  clearRewardDisplay: string; // "SSR 영웅: ???"
  rewardHeroId: string;       // 실제 지급할 영웅 ID (heroData.ts)
  stages: StageDefinition[];
}

export interface SectorDefinition {
  id: string;
  name: string;
  description: string;
  regions: RegionDefinition[];
  completionReward: { gold: number; crystals: number };
}

// 자동 생성을 위한 14개 랜드의 메타 데이터
const REGION_METADATA = [
  // Sector 1: 야성과 명예
  { id: 'goblin', sectorId: 'sector_1', name: '고블린 영지', themeColor: '#84cc16', desc: '탐욕스러운 고블린들이 숨어있는 숲과 광산.', stageCount: 5, maxNormal: 8, baseHp: 900, baseAtk: 35, baseDef: 12, reward: 'LR 영웅: 고블린 워치프', rewardHeroId: 'ssr_goblin_warchief' },
  { id: 'orc', sectorId: 'sector_1', name: '오크의 메마른 황야', themeColor: '#16a34a', desc: '척박한 대지를 뚫고 살아남은 오크 전사들의 땅.', stageCount: 6, maxNormal: 9, baseHp: 1200, baseAtk: 45, baseDef: 15, reward: 'LR 영웅: 오크 검귀', rewardHeroId: 'ssr_orc_blademaster' },
  { id: 'tauren', sectorId: 'sector_1', name: '타우렌의 붉은 봉우리', themeColor: '#a16207', desc: '거대한 타우렌들이 자연을 수호하는 험준한 산맥.', stageCount: 5, maxNormal: 10, baseHp: 1500, baseAtk: 55, baseDef: 20, reward: 'LR 영웅: 붉은갈기 족장', rewardHeroId: 'ssr_tauren_chieftain' },

  // Sector 2: 뒤틀린 마력
  { id: 'darkelf', sectorId: 'sector_2', name: '다크엘프의 그림자 숲', themeColor: '#7c3aed', desc: '은신과 기습에 능한 다크엘프들의 어두운 영토.', stageCount: 6, maxNormal: 11, baseHp: 1800, baseAtk: 70, baseDef: 22, reward: 'LR 영웅: 그림자 군주', rewardHeroId: 'ssr_darkelf_lord', gimmick: 'hidden_ranged' },
  { id: 'fire', sectorId: 'sector_2', name: '화염의 땅', themeColor: '#ea580c', desc: '끓어오르는 용암과 불길의 정령들이 지배하는 곳.', stageCount: 7, maxNormal: 12, baseHp: 2200, baseAtk: 85, baseDef: 25, reward: 'LR 영웅: 불꽃의 잿더미', rewardHeroId: 'ssr_fire_ash' },
  { id: 'ice', sectorId: 'sector_2', name: '얼음 나라', themeColor: '#0ea5e9', desc: '모든 것이 얼어붙은 극한의 땅. 얼음 마법사들의 본거지.', stageCount: 7, maxNormal: 13, baseHp: 2700, baseAtk: 100, baseDef: 30, reward: 'LR 영웅: 서리눈송이 여왕', rewardHeroId: 'ssr_ice_queen' },

  // Sector 3: 죽음의 고동
  { id: 'undead', sectorId: 'sector_3', name: '언데드의 버림받은 도시', themeColor: '#64748b', desc: '역병과 죽음이 도사리는 파멸된 고대 도시.', stageCount: 8, maxNormal: 13, baseHp: 3300, baseAtk: 120, baseDef: 35, reward: 'LR 영웅: 죽음의 기사', rewardHeroId: 'ssr_death_knight', gimmick: 'hidden_ranged' },
  { id: 'poison', sectorId: 'sector_3', name: '맹독의 늪지대', themeColor: '#10b981', desc: '치명적인 독기를 품은 괴수들이 우글거리는 늪.', stageCount: 8, maxNormal: 14, baseHp: 4000, baseAtk: 145, baseDef: 40, reward: 'LR 영웅: 맹독술사', rewardHeroId: 'ssr_poison_mancer' },
  { id: 'mercenary', sectorId: 'sector_3', name: '혼돈의 용병 주둔지', themeColor: '#d97706', desc: '수많은 종족이 모인 최정예 무법자들의 집결지.', stageCount: 9, maxNormal: 14, baseHp: 4800, baseAtk: 175, baseDef: 45, reward: 'LR 영웅: 용병왕', rewardHeroId: 'ssr_merc_king' },

  // Sector 4: 초월적 원소
  { id: 'elemental', sectorId: 'sector_4', name: '정령의 안식처', themeColor: '#06b6d4', desc: '세상의 근원을 이루는 4대 정령들이 모인 성소.', stageCount: 9, maxNormal: 15, baseHp: 5700, baseAtk: 210, baseDef: 50, reward: 'LR 영웅: 정령학자', rewardHeroId: 'ssr_ele_scholar' },
  { id: 'sea', sectorId: 'sector_4', name: '심해의 신전', themeColor: '#0284c7', desc: '해저 깊은 곳에 잠든 고대 수호자들의 신전.', stageCount: 10, maxNormal: 15, baseHp: 6800, baseAtk: 250, baseDef: 55, reward: 'LR 영웅: 심해의 지배자', rewardHeroId: 'ssr_sea_ruler', gimmick: 'hidden_ranged' },
  { id: 'sky', sectorId: 'sector_4', name: '천공의 성채', themeColor: '#eab308', desc: '구름 위를 떠다니는 신성한 천사들의 요새.', stageCount: 10, maxNormal: 16, baseHp: 8100, baseAtk: 300, baseDef: 60, reward: 'LR 영웅: 대천사', rewardHeroId: 'ssr_arch_angel' },

  // Sector 5: 신화의 끝
  { id: 'demon', sectorId: 'sector_5', name: '악마의 균열', themeColor: '#9f1239', desc: '차원이 찢어지며 악마 군단이 쏟아져 나오는 균열.', stageCount: 12, maxNormal: 17, baseHp: 9600, baseAtk: 360, baseDef: 65, reward: 'LR 영웅: 파멸의 악마군주', rewardHeroId: 'ssr_demon_lord', gimmick: 'hidden_ranged' },
  { id: 'dragon', sectorId: 'sector_5', name: '용의 탑', themeColor: '#dc2626', desc: '모든 생명체의 정점, 드래곤들이 둥지를 튼 거대한 탑.', stageCount: 14, maxNormal: 18, baseHp: 11500, baseAtk: 430, baseDef: 75, reward: 'LR 영웅: 고대 드래곤 위상', rewardHeroId: 'ssr_dragon_aspect', gimmick: 'hidden_ranged' },
];

export const SECTORS: SectorDefinition[] = [
  { id: 'sector_1', name: '제 1구역: 야성과 명예의 땅', description: '거친 야생에서 살아남은 전사들의 영토입니다.', completionReward: { gold: 20000, crystals: 500 }, regions: [] },
  { id: 'sector_2', name: '제 2구역: 뒤틀린 마력의 근원', description: '강력하고 위험한 마법의 힘이 소용돌이치는 곳입니다.', completionReward: { gold: 40000, crystals: 1000 }, regions: [] },
  { id: 'sector_3', name: '제 3구역: 죽음과 부패의 유산', description: '한때 번영했으나 이제는 죽음만이 남은 도시들입니다.', completionReward: { gold: 70000, crystals: 1500 }, regions: [] },
  { id: 'sector_4', name: '제 4구역: 초월적인 원소의 성소', description: '필멸자의 발길이 닿기 힘든 신비로운 자연의 영역입니다.', completionReward: { gold: 120000, crystals: 2500 }, regions: [] },
  { id: 'sector_5', name: '제 5구역: 최후의 균열과 위상', description: '세상의 끝, 가장 강력한 존재들이 버티고 있는 마지막 관문입니다.', completionReward: { gold: 250000, crystals: 5000 }, regions: [] },
];

const ROLES = [
  { role: 'tank', hpMult: 1.5, atkMult: 0.8, defMult: 1.5, speed: 2.5, isRanged: false, color: '#3B82F6', startX: 750, yVariants: [180, 340] },
  { role: 'melee_dps', hpMult: 1.0, atkMult: 1.2, defMult: 1.0, speed: 3.5, isRanged: false, color: '#EF4444', startX: 750, yVariants: [260, 300] },
  { role: 'ranged_dps', hpMult: 0.7, atkMult: 1.4, defMult: 0.6, speed: 1.0, isRanged: true, color: '#F97316', startX: 1050, yVariants: [200, 340, 160] },
  { role: 'cc', hpMult: 0.8, atkMult: 1.1, defMult: 0.7, speed: 1.0, isRanged: true, color: '#A855F7', startX: 1050, yVariants: [250, 420] },
  { role: 'healer', hpMult: 0.9, atkMult: 0.5, defMult: 0.8, speed: 0.5, isRanged: true, color: '#22C55E', startX: 1050, yVariants: [330, 380, 140] },
];

const DEFENDER_ROLE_LABEL: Record<string, string> = {
  tank: '탱커', melee_dps: '근딜', ranged_dps: '원딜', cc: 'CC', healer: '힐러',
};

// ── 슬롯 우선순위 (인덱스 = 몇 번째로 배치될 역할) ─────────────────────────
// 0~17: 일반 모드 (4~18명)
// 18~23: 정예 전용 추가 슬롯 (2~6명 추가)
type DefRole = 'tank' | 'melee_dps' | 'ranged_dps' | 'cc' | 'healer';
const SLOT_PRIORITY: DefRole[] = [
  // 필수 4명
  'tank', 'melee_dps', 'ranged_dps', 'healer',
  // 5~8명
  'cc', 'melee_dps', 'tank', 'ranged_dps',
  // 9~12명
  'healer', 'cc', 'melee_dps', 'ranged_dps',
  // 13~16명
  'tank', 'melee_dps', 'cc', 'ranged_dps',
  // 17~18명
  'healer', 'melee_dps',
  // 정예 전용 19~24
  'tank', 'healer', 'melee_dps', 'ranged_dps', 'cc', 'melee_dps',
];

/** Y좌표를 count 수만큼 필드 안에서 균등 분배 */
function spreadY(count: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [260];
  const yMin = 100, yMax = 420;
  return Array.from({ length: count }, (_, i) =>
    Math.round(yMin + (i / (count - 1)) * (yMax - yMin)),
  );
}

/** roles 배열을 받아 전선/후방으로 나눠 Y 좌표를 배분한 수비대 목록 생성 */
function buildDefenders(
  roles: DefRole[],
  meta: typeof REGION_METADATA[number],
  stageMult: number,
  nameSuffix: string,
  bossOverride?: { displayName: string; hpMult: number; atkMult: number; defMult: number; colorOverride: string; hasCleave: boolean; auraDamage?: number; defType?: 'leader' | 'soldier' },
): StageDefender[] {
  // 전선(tank/melee) 과 후방(ranged/cc/healer) 으로 분리
  const frontRoles = roles.filter(r => r === 'tank' || r === 'melee_dps');
  const backRoles  = roles.filter(r => r !== 'tank' && r !== 'melee_dps');
  const frontYs = spreadY(frontRoles.length);
  const backYs  = spreadY(backRoles.length);

  let fi = 0, bi = 0;
  return roles.map((role, idx) => {
    const isFront = role === 'tank' || role === 'melee_dps';
    const roleDef = ROLES.find(x => x.role === role)!;
    const y = isFront ? frontYs[fi++] : backYs[bi++];

    const hpMult   = bossOverride ? bossOverride.hpMult   : roleDef.hpMult;
    const atkMult  = bossOverride ? bossOverride.atkMult  : roleDef.atkMult;
    const defMult  = bossOverride ? bossOverride.defMult  : roleDef.defMult;
    const color    = bossOverride ? bossOverride.colorOverride : roleDef.color;
    const displayName = bossOverride
      ? `${bossOverride.displayName}`
      : `${meta.name} ${DEFENDER_ROLE_LABEL[role]}`;

    return {
      name: `${meta.id}_${role}_${nameSuffix}_${idx}`,
      displayName,
      defenderRole: role,
      defType: bossOverride ? (bossOverride.defType ?? 'soldier') : 'normal',
      hp:    Math.floor(meta.baseHp  * hpMult  * stageMult),
      atk:   Math.floor(meta.baseAtk * atkMult * stageMult),
      def:   Math.floor(meta.baseDef * defMult * stageMult),
      speed: roleDef.speed,
      isRanged: roleDef.isRanged,
      color,
      startX: isFront ? 750 : 1050,
      startY: y,
      hidesBehindWall: !isFront,
      hasCleave: bossOverride ? bossOverride.hasCleave : role === 'tank',
      auraDamage: bossOverride?.auraDamage,
      auraRadius: bossOverride?.auraDamage ? 180 : undefined,
    };
  });
}

// ── 동적 생성 엔진 ────────────────────────────────────────────────────────────
export const REGIONS: RegionDefinition[] = [];
let globalStageId = 1;

for (const meta of REGION_METADATA) {
  const stages: StageDefinition[] = [];
  const stageGrowthRate = 1.08;

  for (let s = 1; s <= meta.stageCount; s++) {
    const isBossStage = s === meta.stageCount;
    const stageMult = Math.pow(stageGrowthRate, s - 1);

    // ── 수비대 수량 계산: 랜드 내 스테이지 위치 기준 4명 → maxNormal명 선형 스케일 ──
    const progress = meta.stageCount > 1 ? (s - 1) / (meta.stageCount - 1) : 0; // 0 ~ 1
    const normalCount = Math.round(4 + progress * (meta.maxNormal - 4));          // 4 ~ maxNormal
    // 보스 스테이지는 +1 추가 (최대 18)
    const actualNormalCount = Math.min(18, isBossStage ? normalCount + 1 : normalCount);

    // ── 정예 전용 추가 수량: 일반 대비 +2 ~ +6 ──
    const eliteExtraCount = Math.min(6, Math.max(2, Math.round(actualNormalCount * 0.3)));

    // 일반 수비대
    const normalRoles = SLOT_PRIORITY.slice(0, actualNormalCount);
    const normalDefenders = buildDefenders(normalRoles, meta, stageMult, `n${s}`);

    // 정예 전용 추가 수비대
    const eliteRoles = SLOT_PRIORITY.slice(18, 18 + eliteExtraCount);

    // 보스 스테이지 오라 설정
    let bossBossAura = 0;
    if (isBossStage) {
      if (meta.id === 'fire' || meta.id === 'demon') bossBossAura = Math.floor(meta.baseAtk * 0.4);
      else if (meta.id === 'dragon')                 bossBossAura = Math.floor(meta.baseAtk * 0.6);
      else if (meta.id === 'undead' || meta.id === 'void') bossBossAura = Math.floor(meta.baseAtk * 0.3);
    }

    const eliteExtra = buildDefenders(
      eliteRoles,
      meta,
      stageMult * (isBossStage ? 1.5 : 1.0),
      `e${s}`,
      {
        displayName: isBossStage ? `${meta.name} 우두머리` : `${meta.name} 정예병`,
        defType: isBossStage ? 'leader' : 'soldier',
        hpMult:  1.4,
        atkMult: 1.2,
        defMult: 1.2,
        colorOverride: isBossStage ? '#93C5FD' : '#F87171',
        hasCleave: isBossStage,
        auraDamage: (isBossStage && bossBossAura > 0) ? bossBossAura : undefined,
      },
    );

    stages.push({
      id: globalStageId,
      regionId: meta.id,
      name: isBossStage ? `${meta.name} 최심부` : `${meta.name} 외곽 ${s}구역`,
      isBossStage,
      stageSubIndex: s,
      theme: meta.id,
      themeColor: meta.themeColor,
      description: isBossStage
        ? `이 랜드의 우두머리가 버티고 있습니다. 최후의 전투를 준비하세요!`
        : `${meta.name}의 수비대가 진을 치고 있습니다.`,
      gimmick: meta.gimmick as any,
      normalDefenders,
      eliteExtra,
    });
    globalStageId++;
  }

  const region: RegionDefinition = {
    id: meta.id,
    sectorId: meta.sectorId,
    name: meta.name,
    themeColor: meta.themeColor,
    description: meta.desc,
    clearRewardDisplay: meta.reward,
    rewardHeroId: meta.rewardHeroId,
    stages,
  };
  REGIONS.push(region);

  const sector = SECTORS.find(sc => sc.id === meta.sectorId);
  if (sector) sector.regions.push(region);
}

// ── 무한 던전 모드 ─────────────────────────────────────────────────────────────
/**
 * 무한 던전 — 깊이(depth)에 따라 동적으로 생성되는 스테이지
 * - 수비대 수: min(18, 3 + depth)
 * - 스탯: 기본값 × 1.10^(depth-1) (매 층 10% 증가)
 * - 테마: depth % 14 로 순환
 * - 마일스톤(depth % 5 == 0): 강화 수호자 + 오라 기믹
 */
export function generateInfiniteDungeon(depth: number): StageDefinition {
  const themeIdx = (depth - 1) % REGION_METADATA.length;
  const baseMeta = REGION_METADATA[themeIdx];
  const statMult = Math.pow(1.10, depth - 1);

  // 스탯 배율 적용한 synthetic meta
  const meta = {
    ...baseMeta,
    baseHp:  Math.floor(900  * statMult),
    baseAtk: Math.floor(35   * statMult),
    baseDef: Math.floor(12   * statMult),
  };

  const normalCount    = Math.min(18, 3 + depth);
  const eliteExtraCount = Math.min(6, Math.max(2, Math.round(normalCount * 0.3)));
  const isMilestone    = depth % 5 === 0;

  const normalRoles   = SLOT_PRIORITY.slice(0, normalCount);
  const normalDefenders = buildDefenders(normalRoles, meta, 1.0, `inf${depth}`);

  const eliteRoles = SLOT_PRIORITY.slice(18, 18 + eliteExtraCount);
  const eliteExtra = buildDefenders(
    eliteRoles, meta, 1.0, `einf${depth}`,
    {
      displayName:   isMilestone ? `${baseMeta.name} 수호자` : `${baseMeta.name} 정예병`,
      defType:       isMilestone ? 'leader' : 'soldier',
      hpMult:        isMilestone ? 2.2 : 1.4,
      atkMult:       isMilestone ? 1.6 : 1.2,
      defMult:       1.2,
      colorOverride: isMilestone ? '#93C5FD' : '#F87171',
      hasCleave:     isMilestone,
      auraDamage:    isMilestone ? Math.floor(meta.baseAtk * 0.45) : undefined,
    },
  );

  return {
    id:          -depth,
    regionId:    baseMeta.id,
    name:        isMilestone ? `심층 ${depth}층` : `${depth}층`,
    isBossStage: isMilestone,
    stageSubIndex: depth,
    theme:       baseMeta.id,
    themeColor:  isMilestone ? '#f59e0b' : baseMeta.themeColor,
    description: isMilestone
      ? `${baseMeta.name}의 강력한 수호자들이 지키는 심층 던전!`
      : `${baseMeta.name}의 어둠 속 깊은 곳. 수비대가 강화되었다.`,
    gimmick:     depth >= 3 ? 'hidden_ranged' : undefined,
    normalDefenders,
    eliteExtra,
  };
}
