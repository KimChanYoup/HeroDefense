import type { WaveConfig } from './types';
import { WAVE_HP_SCALE, WAVE_ATK_SCALE, COLORS } from './constants';

// ================================================================
// 몬스터 기본 스탯 정의
// ================================================================

const MONSTER_BASE = {
  // ── 고블린 계열 (빠르고 약함, 초반) ──────────────────────────
  goblin:          { name: 'goblin',          displayName: '고블린',          hp: 100,  atk: 15, def: 5,  speed: 3.0, isRanged: false, color: '#6B7280', attackCooldown: 0.7 },
  goblin_slinger:  { name: 'goblin_slinger',  displayName: '고블린 돌팔매병', hp: 70,   atk: 22, def: 3,  speed: 3.0, isRanged: true,  color: '#52525B', attackCooldown: 1.0 },
  hobgoblin:       { name: 'hobgoblin',       displayName: '홉고블린',        hp: 150,  atk: 25, def: 10, speed: 2.8, isRanged: false, color: '#4B5563', attackCooldown: 0.8 },
  goblin_crossbow: { name: 'goblin_crossbow', displayName: '고블린 석궁병',   hp: 110,  atk: 38, def: 8,  speed: 2.8, isRanged: true,  color: '#3F3F46', attackCooldown: 1.2 },
  goblin_mutant:   { name: 'goblin_mutant',   displayName: '돌연변이 고블린', hp: 250,  atk: 40, def: 15, speed: 3.2, isRanged: false, color: '#374151', attackCooldown: 0.7 },
  goblin_shaman:   { name: 'goblin_shaman',   displayName: '고블린 주술사',   hp: 200,  atk: 50, def: 10, speed: 2.5, isRanged: true,  color: '#27272A', attackCooldown: 1.4 },

  // ── 해골/언데드 계열 ──────────────────────────────────────────
  skeleton:        { name: 'skeleton',        displayName: '해골 병사',       hp: 80,   atk: 20, def: 5,  speed: 2.5, isRanged: false, color: '#D1D5DB', attackCooldown: 1.0 },
  skeleton_archer: { name: 'skeleton_archer', displayName: '해골 궁수',       hp: 65,   atk: 28, def: 3,  speed: 2.3, isRanged: true,  color: '#E5E7EB', attackCooldown: 1.0 },
  war_skeleton:    { name: 'war_skeleton',    displayName: '전쟁 해골',       hp: 120,  atk: 30, def: 10, speed: 2.5, isRanged: false, color: '#9CA3AF', attackCooldown: 0.9 },
  bone_sniper:     { name: 'bone_sniper',     displayName: '뼈 저격수',       hp: 100,  atk: 55, def: 8,  speed: 2.2, isRanged: true,  color: '#CBD5E1', attackCooldown: 1.4 },
  skull_knight:    { name: 'skull_knight',    displayName: '스컬 나이트',     hp: 180,  atk: 45, def: 15, speed: 2.2, isRanged: false, color: '#6B7280', attackCooldown: 1.0 },
  death_knight:    { name: 'death_knight',    displayName: '죽음의 기사',     hp: 350,  atk: 70, def: 25, speed: 2.0, isRanged: false, color: '#4B5563', attackCooldown: 1.0 },
  deathly_marksman:{ name: 'deathly_marksman',displayName: '죽음의 사수',     hp: 280,  atk: 90, def: 15, speed: 2.0, isRanged: true,  color: '#94A3B8', attackCooldown: 1.5 },
  dark_archer:     { name: 'dark_archer',     displayName: '암흑 궁수',       hp: 120,  atk: 30, def: 5,  speed: 3.0, isRanged: true,  color: '#7C3AED', attackCooldown: 1.0 },
  necromancer:     { name: 'necromancer',     displayName: '네크로맨서',      hp: 300,  atk: 50, def: 15, speed: 2.5, isRanged: true,  color: '#4C1D95', attackCooldown: 1.5 },
  sniper:          { name: 'sniper',          displayName: '정예 저격수',     hp: 220,  atk: 55, def: 10, speed: 3.0, isRanged: true,  color: '#5B21B6', attackCooldown: 1.3 },
  lich:            { name: 'lich',            displayName: '리치',            hp: 600,  atk: 80, def: 30, speed: 2.0, isRanged: true,  color: '#312E81', attackCooldown: 1.5 },

  // ── 골렘 계열 (낮은 체력, 높은 방어력 → 다단히트 특화) ────────
  wood_golem:      { name: 'wood_golem',      displayName: '나무 골렘',       hp: 60,   atk: 25, def: 30, speed: 1.5, isRanged: false, color: '#8B5A2B', attackCooldown: 1.5 },
  rock_hurler:     { name: 'rock_hurler',     displayName: '바위 투척 골렘',  hp: 70,   atk: 30, def: 40, speed: 1.3, isRanged: true,  color: '#A8A29E', attackCooldown: 1.6 },
  stone_golem:     { name: 'stone_golem',     displayName: '돌 골렘',         hp: 90,   atk: 40, def: 60, speed: 1.2, isRanged: false, color: '#737373', attackCooldown: 1.8 },
  magma_hurler:    { name: 'magma_hurler',    displayName: '용암 투척 골렘',  hp: 120,  atk: 55, def: 80, speed: 1.0, isRanged: true,  color: '#EA580C', attackCooldown: 1.8 },
  iron_golem:      { name: 'iron_golem',      displayName: '철 골렘',         hp: 150,  atk: 55, def: 100,speed: 1.0, isRanged: false, color: '#A3A3A3', attackCooldown: 2.0 },
  crystal_golem:   { name: 'crystal_golem',   displayName: '수정 골렘',       hp: 200,  atk: 75, def: 120,speed: 0.9, isRanged: true,  color: '#6EE7F7', attackCooldown: 1.8 },
  gold_golem:      { name: 'gold_golem',      displayName: '금 골렘',         hp: 200,  atk: 70, def: 150,speed: 1.0, isRanged: false, color: '#FCD34D', attackCooldown: 2.0 },
  diamond_golem:   { name: 'diamond_golem',   displayName: '다이아 골렘',     hp: 300,  atk: 90, def: 250,speed: 0.8, isRanged: false, color: '#6EE7B7', attackCooldown: 2.0 },

  // ── 살덩이/언데드 계열 (높은 체력, 낮은 방어력 → 강한 한방 특화) ─
  flesh_hulk:      { name: 'flesh_hulk',      displayName: '살덩이 헐크',     hp: 800,  atk: 35, def: 0,  speed: 1.5, isRanged: false, color: '#B91C1C', attackCooldown: 1.0 },
  abomination:     { name: 'abomination',     displayName: '누더기 골렘',     hp: 1500, atk: 50, def: 5,  speed: 1.2, isRanged: false, color: '#991B1B', attackCooldown: 1.2 },
  plague_beast:    { name: 'plague_beast',    displayName: '역병 괴수',       hp: 2500, atk: 70, def: 10, speed: 1.0, isRanged: false, color: '#7F1D1D', attackCooldown: 1.3 },

  // ── 야수/거미 계열 (빠른 기동, 물량 압박) ────────────────────
  cave_spider:     { name: 'cave_spider',     displayName: '동굴 거미',       hp: 80,   atk: 30, def: 3,  speed: 4.5, isRanged: false, color: '#57534E', attackCooldown: 0.6 },
  wolf:            { name: 'wolf',            displayName: '늑대',            hp: 120,  atk: 25, def: 5,  speed: 5.0, isRanged: false, color: '#92400E', attackCooldown: 0.7 },
  venom_spider:    { name: 'venom_spider',    displayName: '독 거미',         hp: 130,  atk: 45, def: 5,  speed: 4.0, isRanged: true,  color: '#365314', attackCooldown: 0.9 },
  giant_spider:    { name: 'giant_spider',    displayName: '거대 거미',       hp: 280,  atk: 55, def: 10, speed: 3.5, isRanged: false, color: '#44403C', attackCooldown: 0.7 },
  dire_wolf:       { name: 'dire_wolf',       displayName: '다이어 울프',     hp: 250,  atk: 40, def: 12, speed: 5.5, isRanged: false, color: '#78350F', attackCooldown: 0.6 },

  // ── 오크/트롤 계열 (밸런스형 브루저) ─────────────────────────
  orc_grunt:       { name: 'orc_grunt',       displayName: '오크 돌격병',     hp: 400,  atk: 40, def: 25, speed: 2.2, isRanged: false, color: '#059669', attackCooldown: 1.0 },
  orc_shaman:      { name: 'orc_shaman',      displayName: '오크 주술사',     hp: 320,  atk: 55, def: 20, speed: 2.0, isRanged: true,  color: '#065F46', attackCooldown: 1.5 },
  orc_warrior:     { name: 'orc_warrior',     displayName: '오크 전사',       hp: 700,  atk: 60, def: 40, speed: 2.0, isRanged: false, color: '#047857', attackCooldown: 1.0 },
  troll_warrior:   { name: 'troll_warrior',   displayName: '트롤 전사',       hp: 900,  atk: 85, def: 35, speed: 1.8, isRanged: false, color: '#15803D', attackCooldown: 1.2 },
  troll_shaman:    { name: 'troll_shaman',    displayName: '트롤 주술사',     hp: 650,  atk: 70, def: 25, speed: 1.5, isRanged: true,  color: '#166534', attackCooldown: 1.6 },

  // ── 정령 계열 (원소별 특성) ───────────────────────────────────
  fire_spirit:     { name: 'fire_spirit',     displayName: '화염 정령',       hp: 150,  atk: 50, def: 0,  speed: 3.5, isRanged: false, color: '#F97316', attackCooldown: 0.7 },
  wind_spirit:     { name: 'wind_spirit',     displayName: '바람 정령',       hp: 90,   atk: 35, def: 0,  speed: 6.0, isRanged: false, color: '#BAE6FD', attackCooldown: 0.5 },
  ice_spirit:      { name: 'ice_spirit',      displayName: '냉기 정령',       hp: 130,  atk: 40, def: 15, speed: 2.5, isRanged: false, color: '#67E8F9', attackCooldown: 0.9 },
  lightning_spirit:{ name: 'lightning_spirit',displayName: '번개 정령',       hp: 100,  atk: 60, def: 0,  speed: 4.0, isRanged: true,  color: '#FDE047', attackCooldown: 0.6 },
  poison_spirit:   { name: 'poison_spirit',   displayName: '독 정령',         hp: 200,  atk: 45, def: 5,  speed: 3.0, isRanged: false, color: '#86EFAC', attackCooldown: 0.8 },
  lava_elemental:  { name: 'lava_elemental',  displayName: '용암 정령',       hp: 500,  atk: 95, def: 20, speed: 1.5, isRanged: false, color: '#DC2626', attackCooldown: 1.2 },
  frost_elemental: { name: 'frost_elemental', displayName: '서리 정령',       hp: 450,  atk: 80, def: 35, speed: 2.0, isRanged: false, color: '#38BDF8', attackCooldown: 1.3 },
  storm_elemental: { name: 'storm_elemental', displayName: '폭풍 정령',       hp: 400,  atk: 100,def: 15, speed: 3.0, isRanged: true,  color: '#7C3AED', attackCooldown: 0.8 },
  void_spirit:     { name: 'void_spirit',     displayName: '공허 정령',       hp: 350,  atk: 75, def: 20, speed: 2.5, isRanged: true,  color: '#6D28D9', attackCooldown: 1.0 },

  // ── 암흑/공허 계열 (어둠 속의 위협) ──────────────────────────
  shadow_stalker:  { name: 'shadow_stalker',  displayName: '그림자 침략자',   hp: 200,  atk: 60, def: 5,  speed: 4.0, isRanged: false, color: '#312E81', attackCooldown: 0.7 },
  dark_mage:       { name: 'dark_mage',       displayName: '암흑 마법사',     hp: 270,  atk: 65, def: 10, speed: 2.5, isRanged: true,  color: '#6B21A8', attackCooldown: 1.2 },
  void_crawler:    { name: 'void_crawler',    displayName: '공허 추적자',     hp: 400,  atk: 80, def: 15, speed: 3.0, isRanged: false, color: '#2E1065', attackCooldown: 0.8 },
  plague_mage:     { name: 'plague_mage',     displayName: '역병 마법사',     hp: 380,  atk: 75, def: 15, speed: 2.0, isRanged: true,  color: '#14532D', attackCooldown: 1.5 },
  abyss_horror:    { name: 'abyss_horror',    displayName: '심연의 공포',     hp: 700,  atk: 100,def: 25, speed: 2.5, isRanged: false, color: '#0F172A', attackCooldown: 0.9 },
};

// ================================================================
// 보스 기본 스탯 정의
// ================================================================

const BOSS_BASE = {
  troll_warlord:   { name: 'troll_warlord',   displayName: '트롤 전쟁군주',   hp: 2000, atk: 60,  def: 40,  speed: 2.0, isRanged: false, color: COLORS.monster_boss, attackCooldown: 1.2 },
  lich_king:       { name: 'lich_king',       displayName: '리치 군주',       hp: 3000, atk: 80,  def: 50,  speed: 1.5, isRanged: true,  color: '#1E3A5F',           attackCooldown: 1.5 },
  fire_lord:       { name: 'fire_lord',       displayName: '화염 군주',       hp: 4000, atk: 90,  def: 25,  speed: 1.8, isRanged: true,  color: '#DC2626',           attackCooldown: 1.2 },
  frost_king:      { name: 'frost_king',      displayName: '냉기 왕',         hp: 4500, atk: 75,  def: 80,  speed: 1.2, isRanged: false, color: '#0EA5E9',           attackCooldown: 1.5 },
  void_walker:     { name: 'void_walker',     displayName: '공허의 보행자',   hp: 5000, atk: 100, def: 60,  speed: 1.2, isRanged: false, color: '#2D1B69',           attackCooldown: 1.2 },
  titanium_golem:  { name: 'titanium_golem',  displayName: '티타늄 골렘',     hp: 1500, atk: 120, def: 400, speed: 0.8, isRanged: false, color: '#94A3B8',           attackCooldown: 2.0 },
  thunder_tyrant:  { name: 'thunder_tyrant',  displayName: '폭풍 폭군',       hp: 7000, atk: 120, def: 50,  speed: 2.0, isRanged: true,  color: '#7C3AED',           attackCooldown: 0.8 },
  flesh_giant:     { name: 'flesh_giant',     displayName: '거대 살덩이',     hp: 15000,atk: 90,  def: 10,  speed: 1.0, isRanged: false, color: '#7F1D1D',           attackCooldown: 1.0 },
  void_dragon:     { name: 'void_dragon',     displayName: '공허 드래곤',     hp: 10000,atk: 150, def: 80,  speed: 1.5, isRanged: true,  color: '#0F172A',           attackCooldown: 1.0 },
};

// ================================================================
// 헬퍼: 웨이브 스케일
// ================================================================

function scaled(base: number, wave: number, scale: number): number {
  return Math.round(base * Math.pow(scale, wave - 1));
}

type MonsterDef = typeof MONSTER_BASE[keyof typeof MONSTER_BASE];

function m(
  base: MonsterDef,
  type: 'normal' | 'elite' | 'boss',
  count: number,
  wave: number,
  infHpAdd: number,
  infAtkAdd: number,
): WaveConfig['monsters'][number] {
  return {
    type,
    name: base.name,
    displayName: base.displayName,
    hp: Math.round(scaled(base.hp, Math.min(wave, 30), WAVE_HP_SCALE)) + infHpAdd,
    atk: Math.round(scaled(base.atk, Math.min(wave, 30), WAVE_ATK_SCALE)) + infAtkAdd,
    def: base.def,
    speed: base.speed,
    isRanged: base.isRanged,
    color: base.color,
    count,
    attackCooldown: base.attackCooldown,
  };
}

// ================================================================
// 웨이브 생성기
// ================================================================

export function generateWave(waveNumber: number, aiScale = 1.0): WaveConfig {
  const monsters: WaveConfig['monsters'] = [];

  // ══════════════════════════════════════════════════════════════
  // ★★★ 웨이브 1000: 최종 결전 — 5만번째 웨이브 스펙의 보스 500마리
  // ══════════════════════════════════════════════════════════════
  if (waveNumber === 1000) {
    const FINAL_TIER = 50000;
    const finalOver30 = FINAL_TIER - 30; // 49,970
    const finalBossHpAdd  = finalOver30 * 500;  // 24,985,000
    const finalBossAtkAdd = finalOver30 * 10;   //    499,700

    const finalBossList: { boss: typeof BOSS_BASE[keyof typeof BOSS_BASE]; affix: 'enrage' | 'heal_aura' | 'summon' | 'aoe_slam'; count: number }[] = [
      { boss: BOSS_BASE.troll_warlord,  affix: 'enrage',   count: 55 },
      { boss: BOSS_BASE.lich_king,      affix: 'summon',   count: 55 },
      { boss: BOSS_BASE.fire_lord,      affix: 'aoe_slam', count: 55 },
      { boss: BOSS_BASE.frost_king,     affix: 'enrage',   count: 55 },
      { boss: BOSS_BASE.titanium_golem, affix: 'aoe_slam', count: 55 },
      { boss: BOSS_BASE.void_walker,    affix: 'enrage',   count: 55 },
      { boss: BOSS_BASE.thunder_tyrant, affix: 'aoe_slam', count: 55 },
      { boss: BOSS_BASE.flesh_giant,    affix: 'enrage',   count: 55 },
      { boss: BOSS_BASE.void_dragon,    affix: 'aoe_slam', count: 60 }, // 55×8 + 60 = 500마리
    ];

    // AI 모드: 1000마리 (일반의 2배)
    if (aiScale > 1.0) {
      for (const entry of finalBossList) { entry.count = Math.round(entry.count * 2); }
    }

    for (const { boss, affix, count } of finalBossList) {
      monsters.push({
        type: 'boss',
        name: boss.name,
        displayName: boss.displayName,
        hp:  Math.round(scaled(boss.hp,  30, WAVE_HP_SCALE)) + finalBossHpAdd,
        atk: Math.round(scaled(boss.atk, 30, WAVE_ATK_SCALE)) + finalBossAtkAdd,
        def: boss.def,
        speed: boss.speed,
        isRanged: boss.isRanged,
        color: boss.color,
        count,
        affix,
        attackCooldown: boss.attackCooldown,
      });
    }

    return { waveNumber, monsters };
  }

  const isBossWave = waveNumber % 5 === 0;
  // 무한모드(wave > 30): 합산 방식 — 웨이브당 HP +50, ATK +2 고정 추가
  const infOver30 = waveNumber > 30 ? waveNumber - 30 : 0;
  const infHpAdd  = Math.round(infOver30 * 50  * aiScale);
  const infAtkAdd = Math.round(infOver30 * 2   * aiScale);
  // 보스는 규모가 크므로 더 큰 고정값 사용
  const bossInfHpAdd  = Math.round(infOver30 * 500 * aiScale);
  const bossInfAtkAdd = Math.round(infOver30 * 10  * aiScale);

  // ────────────────────────────────────────
  // ★ 보스 웨이브 (5의 배수)
  // ────────────────────────────────────────
  if (isBossWave) {
    const bossTier = Math.floor(waveNumber / 5);
    const bossIdx = (bossTier - 1) % 9;

    const BOSS_TABLE: { boss: typeof BOSS_BASE[keyof typeof BOSS_BASE]; affix: 'enrage' | 'heal_aura' | 'summon' | 'aoe_slam' }[] = [
      { boss: BOSS_BASE.troll_warlord,  affix: 'enrage'    },  // 5
      { boss: BOSS_BASE.lich_king,      affix: 'summon'    },  // 10
      { boss: BOSS_BASE.fire_lord,      affix: 'aoe_slam'  },  // 15
      { boss: BOSS_BASE.frost_king,     affix: 'enrage'    },  // 20
      { boss: BOSS_BASE.titanium_golem, affix: 'aoe_slam'  },  // 25
      { boss: BOSS_BASE.void_walker,    affix: 'enrage'    },  // 30
      { boss: BOSS_BASE.thunder_tyrant, affix: 'aoe_slam'  },  // 35
      { boss: BOSS_BASE.flesh_giant,    affix: 'enrage'    },  // 40
      { boss: BOSS_BASE.void_dragon,    affix: 'aoe_slam'  },  // 45+
    ];

    const entry = BOSS_TABLE[bossIdx];
    const { boss, affix } = entry;

    monsters.push({
      type: 'boss',
      name: boss.name,
      displayName: boss.displayName,
      hp: Math.round(scaled(boss.hp, Math.min(waveNumber, 30), WAVE_HP_SCALE)) + bossInfHpAdd,
      atk: Math.round(scaled(boss.atk, Math.min(waveNumber, 30), WAVE_ATK_SCALE)) + bossInfAtkAdd,
      def: boss.def,
      speed: boss.speed,
      isRanged: boss.isRanged,
      color: boss.color,
      count: 1,
      affix,
      attackCooldown: boss.attackCooldown,
    });

    // 보스 호위대 (웨이브에 맞는 근접 + 원거리 혼합)
    const escortCount = Math.min(4 + Math.floor(waveNumber / 5), 12);
    const rangedEscortCount = Math.max(1, Math.floor(escortCount / 3));
    const meleeEscortCount = escortCount - rangedEscortCount;

    let meleeEscort: MonsterDef;
    let rangedEscort: MonsterDef;

    if (waveNumber <= 10) {
      meleeEscort = MONSTER_BASE.skeleton;
      rangedEscort = MONSTER_BASE.skeleton_archer;
    } else if (waveNumber <= 15) {
      meleeEscort = MONSTER_BASE.war_skeleton;
      rangedEscort = MONSTER_BASE.bone_sniper;
    } else if (waveNumber <= 20) {
      meleeEscort = MONSTER_BASE.skull_knight;
      rangedEscort = MONSTER_BASE.dark_archer;
    } else if (waveNumber <= 25) {
      meleeEscort = MONSTER_BASE.death_knight;
      rangedEscort = MONSTER_BASE.deathly_marksman;
    } else if (waveNumber <= 30) {
      meleeEscort = MONSTER_BASE.orc_warrior;
      rangedEscort = MONSTER_BASE.troll_shaman;
    } else {
      meleeEscort = MONSTER_BASE.abyss_horror;
      rangedEscort = MONSTER_BASE.plague_mage;
    }

    monsters.push(m(meleeEscort, 'normal', meleeEscortCount, waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(rangedEscort, 'normal', rangedEscortCount, waveNumber, infHpAdd, infAtkAdd));

    return { waveNumber, monsters };
  }

  // ────────────────────────────────────────
  // ★ 일반 웨이브 — 단계별 테마 구성
  // ────────────────────────────────────────
  const base = Math.floor(4 + waveNumber * 1.2);

  // ══ Phase 1 (Wave 1~4): 고블린 & 해골 ══════════════════════
  if (waveNumber <= 4) {
    // 전선: 고블린 물량
    monsters.push(m(MONSTER_BASE.goblin, 'normal', Math.ceil(base * 0.5), waveNumber, infHpAdd, infAtkAdd));
    // 측면: 해골 병사
    monsters.push(m(MONSTER_BASE.skeleton, 'normal', Math.ceil(base * 0.3), waveNumber, infHpAdd, infAtkAdd));
    if (waveNumber >= 2) {
      // 원거리: 해골 궁수 등장
      monsters.push(m(MONSTER_BASE.skeleton_archer, 'normal', Math.max(1, Math.ceil(base * 0.15)), waveNumber, infHpAdd, infAtkAdd));
    }
    if (waveNumber >= 3) {
      // 원거리: 고블린 돌팔매병 등장
      monsters.push(m(MONSTER_BASE.goblin_slinger, 'normal', Math.max(1, Math.ceil(base * 0.15)), waveNumber, infHpAdd, infAtkAdd));
    }
    if (waveNumber >= 4) {
      // 특수: 나무 골렘 (방어형)
      monsters.push(m(MONSTER_BASE.wood_golem, 'elite', 1, waveNumber, infHpAdd, infAtkAdd));
    }
  }

  // ══ Phase 2 (Wave 6~9): 강화 물량 + 정령 등장 ══════════════
  else if (waveNumber <= 9) {
    // 전선: 홉고블린 + 늑대 (빠른 접근)
    monsters.push(m(MONSTER_BASE.hobgoblin, 'normal', Math.ceil(base * 0.25), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.wolf, 'normal', Math.ceil(base * 0.2), waveNumber, infHpAdd, infAtkAdd));
    // 전선 2: 전쟁 해골
    monsters.push(m(MONSTER_BASE.war_skeleton, 'normal', Math.ceil(base * 0.2), waveNumber, infHpAdd, infAtkAdd));
    // 원거리: 고블린 석궁병 + 해골 궁수
    monsters.push(m(MONSTER_BASE.goblin_crossbow, 'normal', Math.ceil(base * 0.15), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.skeleton_archer, 'normal', Math.ceil(base * 0.1), waveNumber, infHpAdd, infAtkAdd));
    // 정예: 돌 골렘 (고방어)
    monsters.push(m(MONSTER_BASE.stone_golem, 'elite', Math.max(1, Math.ceil(base * 0.05)), waveNumber, infHpAdd, infAtkAdd));
    if (waveNumber >= 7) {
      // 정령: 화염 정령 (빠른 돌격형)
      monsters.push(m(MONSTER_BASE.fire_spirit, 'normal', Math.max(1, Math.ceil(base * 0.05)), waveNumber, infHpAdd, infAtkAdd));
    }
    if (waveNumber >= 9) {
      // 정령: 바람 정령 (초고속)
      monsters.push(m(MONSTER_BASE.wind_spirit, 'normal', Math.max(2, Math.ceil(base * 0.05)), waveNumber, infHpAdd, infAtkAdd));
    }
  }

  // ══ Phase 3 (Wave 11~14): 골렘 & 원거리 압박 ══════════════
  else if (waveNumber <= 14) {
    // 전선: 돌연변이 고블린 + 동굴 거미 (빠른 근접)
    monsters.push(m(MONSTER_BASE.goblin_mutant, 'normal', Math.ceil(base * 0.2), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.cave_spider, 'normal', Math.ceil(base * 0.2), waveNumber, infHpAdd, infAtkAdd));
    // 전선 2: 스컬 나이트
    monsters.push(m(MONSTER_BASE.skull_knight, 'normal', Math.ceil(base * 0.15), waveNumber, infHpAdd, infAtkAdd));
    // 원거리 삼중: 뼈 저격수 + 고블린 주술사 + 번개 정령
    monsters.push(m(MONSTER_BASE.bone_sniper, 'normal', Math.ceil(base * 0.12), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.goblin_shaman, 'normal', Math.ceil(base * 0.1), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.lightning_spirit, 'normal', Math.ceil(base * 0.08), waveNumber, infHpAdd, infAtkAdd));
    // 정예: 철 골렘 + 바위 투척 골렘 (원거리 고방어)
    monsters.push(m(MONSTER_BASE.iron_golem, 'elite', Math.max(1, Math.ceil(base * 0.08)), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.rock_hurler, 'elite', Math.max(1, Math.ceil(base * 0.07)), waveNumber, infHpAdd, infAtkAdd));
    if (waveNumber >= 12) {
      monsters.push(m(MONSTER_BASE.ice_spirit, 'normal', Math.ceil(base * 0.06), waveNumber, infHpAdd, infAtkAdd));
    }
    if (waveNumber >= 14) {
      monsters.push(m(MONSTER_BASE.fire_spirit, 'normal', Math.ceil(base * 0.06), waveNumber, infHpAdd, infAtkAdd));
    }
  }

  // ══ Phase 4 (Wave 16~19): 오크/트롤 & 독 거미 & 용암 ══════
  else if (waveNumber <= 19) {
    // 전선: 오크 돌격병 + 다이어 울프 (빠른 맹수)
    monsters.push(m(MONSTER_BASE.orc_grunt, 'normal', Math.ceil(base * 0.2), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.dire_wolf, 'normal', Math.ceil(base * 0.15), waveNumber, infHpAdd, infAtkAdd));
    // 전선 2: 죽음의 기사 + 거대 거미
    monsters.push(m(MONSTER_BASE.death_knight, 'normal', Math.ceil(base * 0.12), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.giant_spider, 'normal', Math.ceil(base * 0.1), waveNumber, infHpAdd, infAtkAdd));
    // 원거리: 오크 주술사 + 독 거미 + 용암 투척 골렘
    monsters.push(m(MONSTER_BASE.orc_shaman, 'normal', Math.ceil(base * 0.1), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.venom_spider, 'normal', Math.ceil(base * 0.1), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.magma_hurler, 'elite', Math.max(1, Math.ceil(base * 0.08)), waveNumber, infHpAdd, infAtkAdd));
    // 정예: 수정 골렘 (원거리 + 고방어)
    monsters.push(m(MONSTER_BASE.crystal_golem, 'elite', Math.max(1, Math.ceil(base * 0.06)), waveNumber, infHpAdd, infAtkAdd));
    // 정령
    if (waveNumber >= 17) {
      monsters.push(m(MONSTER_BASE.poison_spirit, 'normal', Math.ceil(base * 0.05), waveNumber, infHpAdd, infAtkAdd));
    }
    if (waveNumber >= 19) {
      monsters.push(m(MONSTER_BASE.lava_elemental, 'elite', Math.max(1, Math.ceil(base * 0.04)), waveNumber, infHpAdd, infAtkAdd));
    }
  }

  // ══ Phase 5 (Wave 21~24): 트롤 & 공허 & 죽음의 사수 ════════
  else if (waveNumber <= 24) {
    // 전선: 트롤 전사 + 오크 전사 + 그림자 침략자
    monsters.push(m(MONSTER_BASE.troll_warrior, 'normal', Math.ceil(base * 0.18), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.orc_warrior, 'normal', Math.ceil(base * 0.15), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.shadow_stalker, 'normal', Math.ceil(base * 0.12), waveNumber, infHpAdd, infAtkAdd));
    // 원거리: 트롤 주술사 + 죽음의 사수 + 공허 정령
    monsters.push(m(MONSTER_BASE.troll_shaman, 'normal', Math.ceil(base * 0.1), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.deathly_marksman, 'normal', Math.ceil(base * 0.1), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.void_spirit, 'normal', Math.ceil(base * 0.08), waveNumber, infHpAdd, infAtkAdd));
    // 정예: 금 골렘 + 살덩이 헐크
    monsters.push(m(MONSTER_BASE.gold_golem, 'elite', Math.max(1, Math.ceil(base * 0.07)), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.flesh_hulk, 'elite', Math.max(1, Math.ceil(base * 0.07)), waveNumber, infHpAdd, infAtkAdd));
    // 정령
    monsters.push(m(MONSTER_BASE.frost_elemental, 'elite', Math.max(1, Math.ceil(base * 0.05)), waveNumber, infHpAdd, infAtkAdd));
    if (waveNumber >= 23) {
      monsters.push(m(MONSTER_BASE.storm_elemental, 'elite', Math.max(1, Math.ceil(base * 0.05)), waveNumber, infHpAdd, infAtkAdd));
    }
  }

  // ══ Phase 6 (Wave 26~29): 최고 티어 — 공허 & 역병 ══════════
  else if (waveNumber <= 29) {
    // 전선: 공허 추적자 + 심연의 공포 (강력한 어둠 계열)
    monsters.push(m(MONSTER_BASE.void_crawler, 'normal', Math.ceil(base * 0.18), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.abyss_horror, 'normal', Math.ceil(base * 0.12), waveNumber, infHpAdd, infAtkAdd));
    // 전선 2: 트롤 전사 + 그림자 침략자
    monsters.push(m(MONSTER_BASE.troll_warrior, 'normal', Math.ceil(base * 0.12), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.shadow_stalker, 'normal', Math.ceil(base * 0.1), waveNumber, infHpAdd, infAtkAdd));
    // 원거리: 역병 마법사 + 암흑 마법사 + 리치
    monsters.push(m(MONSTER_BASE.plague_mage, 'normal', Math.ceil(base * 0.1), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.dark_mage, 'normal', Math.ceil(base * 0.08), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.lich, 'normal', Math.ceil(base * 0.07), waveNumber, infHpAdd, infAtkAdd));
    // 정예: 다이아 골렘 + 역병 괴수
    monsters.push(m(MONSTER_BASE.diamond_golem, 'elite', Math.max(1, Math.ceil(base * 0.06)), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.plague_beast, 'elite', Math.max(1, Math.ceil(base * 0.05)), waveNumber, infHpAdd, infAtkAdd));
    // 정령: 공허 + 폭풍 (최고 위협)
    monsters.push(m(MONSTER_BASE.void_spirit, 'normal', Math.ceil(base * 0.06), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.storm_elemental, 'elite', Math.max(1, Math.ceil(base * 0.06)), waveNumber, infHpAdd, infAtkAdd));
  }

  // ══ Phase 7 (Wave 31~): 무한 모드 — 모든 티어 혼합 ══════════
  else {
    // 물량: 빠른 전선 3종
    monsters.push(m(MONSTER_BASE.shadow_stalker,  'normal', Math.ceil(base * 0.1), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.void_crawler,    'normal', Math.ceil(base * 0.08), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.dire_wolf,       'normal', Math.ceil(base * 0.07), waveNumber, infHpAdd, infAtkAdd));
    // 중거리 브루저
    monsters.push(m(MONSTER_BASE.abyss_horror,   'normal', Math.ceil(base * 0.08), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.troll_warrior,   'normal', Math.ceil(base * 0.07), waveNumber, infHpAdd, infAtkAdd));
    // 원거리: 5종
    monsters.push(m(MONSTER_BASE.plague_mage,     'normal', Math.ceil(base * 0.07), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.storm_elemental, 'normal', Math.ceil(base * 0.07), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.void_spirit,     'normal', Math.ceil(base * 0.06), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.deathly_marksman,'normal', Math.ceil(base * 0.06), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.troll_shaman,    'normal', Math.ceil(base * 0.05), waveNumber, infHpAdd, infAtkAdd));
    // 정예: 고방어 + 고체력
    monsters.push(m(MONSTER_BASE.diamond_golem,  'elite', Math.max(1, Math.ceil(base * 0.05)), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.plague_beast,    'elite', Math.max(1, Math.ceil(base * 0.04)), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.lava_elemental,  'elite', Math.max(1, Math.ceil(base * 0.04)), waveNumber, infHpAdd, infAtkAdd));
    monsters.push(m(MONSTER_BASE.frost_elemental, 'elite', Math.max(1, Math.ceil(base * 0.04)), waveNumber, infHpAdd, infAtkAdd));
  }

  return { waveNumber, monsters };
}

/** AI 협동 무한모드 전용 웨이브 생성기 (일반 대비 2.5배 강화) */
export function makeAIInfiniteWaveGenerator(): (wave: number) => WaveConfig {
  return (wave: number) => generateWave(wave, 2.5);
}
