// ================================================================
// 몬스터 도감 데이터
// ================================================================

export type MonsterTier = '초급' | '중급' | '고급' | '최강';

export interface MonsterBookEntry {
  name: string;
  displayName: string;
  displayNameKey?: string;
  category: string;
  categoryKey?: string;
  tier: MonsterTier;
  monsterType: 'normal' | 'elite' | 'boss';
  description: string;
  descriptionKey?: string;
  tip: string;
  tipKey?: string;
  firstSeenWave: number;
  // 기본 스탯 (웨이브 스케일링 전)
  hp: number;
  atk: number;
  def: number;
  speed: number;
  isRanged: boolean;
  color: string;
}

export const MONSTER_CATEGORIES = [
  '전체',
  '고블린 계열',
  '해골/언데드 계열',
  '골렘 계열',
  '언데드 거인 계열',
  '야수 계열',
  '오크/트롤 계열',
  '정령 계열',
  '암흑/공허 계열',
  '보스',
] as const;

export const MONSTER_BOOK: MonsterBookEntry[] = [
  // ── 고블린 계열 ──────────────────────────────────────────────
  {
    name: 'goblin', displayName: '고블린', displayNameKey: 'monsters.goblin.displayName', category: '고블린 계열', categoryKey: 'monsterCategories.goblin', tier: '초급', monsterType: 'normal',
    hp: 100, atk: 15, def: 5, speed: 3.0, isRanged: false, color: '#6B7280',
    firstSeenWave: 1,
    description: '숲 속 쓰레기 더미에서 태어난 듯한 작은 야만족. 개별 위협은 낮지만 무리 지어 방어선을 흐트러뜨린다.', descriptionKey: 'monsters.goblin.description',
    tip: '초반에 등장하는 가장 기본적인 적. 근거리 영웅 1~2명만 있어도 무난히 처리된다. 물량으로 밀어붙이니 광역기를 아끼지 마라.', tipKey: 'monsters.goblin.tip',
  },
  {
    name: 'goblin_slinger', displayName: '고블린 돌팔매병', displayNameKey: 'monsters.goblin_slinger.displayName', category: '고블린 계열', categoryKey: 'monsterCategories.goblin', tier: '초급', monsterType: 'normal',
    hp: 70, atk: 22, def: 3, speed: 3.0, isRanged: true, color: '#52525B',
    firstSeenWave: 3,
    description: '돌을 던져 원거리 공격을 하는 고블린. 가냘프지만 집단으로 원딜 영웅을 노린다.', descriptionKey: 'monsters.goblin_slinger.description',
    tip: '원거리 적. 탱커를 뛰어넘어 후방 영웅을 노리는 패턴에 주의. CC 영웅으로 이동을 막으면 효과적이다.', tipKey: 'monsters.goblin_slinger.tip',
  },
  {
    name: 'hobgoblin', displayName: '홉고블린', displayNameKey: 'monsters.hobgoblin.displayName', category: '고블린 계열', categoryKey: 'monsterCategories.goblin', tier: '초급', monsterType: 'normal',
    hp: 150, atk: 25, def: 10, speed: 2.8, isRanged: false, color: '#4B5563',
    firstSeenWave: 6,
    description: '고블린보다 덩치가 크고 지능도 높다. 몽둥이 한 방에 웬만한 영웅이 비틀거린다.', descriptionKey: 'monsters.hobgoblin.description',
    tip: '고블린의 강화형. 체력과 공격력이 올라갔다. 탱커를 전면에 배치해 어그로를 집중시켜라.', tipKey: 'monsters.hobgoblin.tip',
  },
  {
    name: 'goblin_crossbow', displayName: '고블린 석궁병', displayNameKey: 'monsters.goblin_crossbow.displayName', category: '고블린 계열', categoryKey: 'monsterCategories.goblin', tier: '초급', monsterType: 'normal',
    hp: 110, atk: 38, def: 8, speed: 2.8, isRanged: true, color: '#3F3F46',
    firstSeenWave: 6,
    description: '장거리 석궁으로 치명적인 볼트를 날린다. 전선 후방에 위치해 아군 원딜을 괴롭힌다.', descriptionKey: 'monsters.goblin_crossbow.description',
    tip: '원거리 공격력이 상당히 높다. CC 스킬로 묶거나 빠른 원딜 영웅으로 우선 제거하라.', tipKey: 'monsters.goblin_crossbow.tip',
  },
  {
    name: 'goblin_sapper', displayName: '고블린 자폭병', displayNameKey: 'monsters.goblin_sapper.displayName', category: '고블린 계열', categoryKey: 'monsterCategories.goblin', tier: '중급', monsterType: 'normal',
    hp: 1500, atk: 0, def: 10, speed: 3.5, isRanged: false, color: '#F97316',
    firstSeenWave: 999,
    description: '폭발물을 가득 안고 미친 듯이 벽을 향해 돌진하는 자폭 특공대. 영웅은 안중에도 없다. 오직 벽이 목표.', descriptionKey: 'monsters.goblin_sapper.description',
    tip: '절대 방치하면 안 된다. 벽에 닿는 순간 최대 체력의 50%를 날려버린다. CC 캐릭터가 최우선으로 스턴을 걸어야 한다.', tipKey: 'monsters.goblin_sapper.tip',
  },
  {
    name: 'sapper_commander', displayName: '자폭 지휘관', displayNameKey: 'monsters.sapper_commander.displayName', category: '고블린 계열', categoryKey: 'monsterCategories.goblin', tier: '최강', monsterType: 'boss',
    hp: 8000, atk: 50, def: 40, speed: 2.0, isRanged: false, color: '#7C2D12',
    firstSeenWave: 999,
    description: '자폭 부대를 이끄는 광기 넘치는 지휘관. 자신도 폭탄을 짊어지고 돌진하며 부하들을 소환한다.', descriptionKey: 'monsters.sapper_commander.description',
    tip: '보스 자신도 자폭병이라 벽에 닿으면 대량의 피해를 준다. 광폭화 전에 CC를 집중시키고 빠르게 제거하라.', tipKey: 'monsters.sapper_commander.tip',
  },
  {
    name: 'goblin_mutant', displayName: '돌연변이 고블린', displayNameKey: 'monsters.goblin_mutant.displayName', category: '고블린 계열', categoryKey: 'monsterCategories.goblin', tier: '중급', monsterType: 'normal',
    hp: 250, atk: 40, def: 15, speed: 3.2, isRanged: false, color: '#374151',
    firstSeenWave: 11,
    description: '알 수 없는 약물로 인해 몸이 비정상적으로 커진 고블린. 빠르고 난폭하며 눈빛이 흐릿하다.', descriptionKey: 'monsters.goblin_mutant.description',
    tip: '빠른 이동 속도와 높은 체력이 특징. 방어선을 뚫기 전 CC로 발을 묶어야 한다.', tipKey: 'monsters.goblin_mutant.tip',
  },
  {
    name: 'goblin_shaman', displayName: '고블린 주술사', displayNameKey: 'monsters.goblin_shaman.displayName', category: '고블린 계열', categoryKey: 'monsterCategories.goblin', tier: '중급', monsterType: 'normal',
    hp: 200, atk: 50, def: 10, speed: 2.5, isRanged: true, color: '#27272A',
    firstSeenWave: 11,
    description: '원시적인 독 마법을 사용하는 부족 주술사. 독 안개를 뿜어 아군을 서서히 약화시킨다.', descriptionKey: 'monsters.goblin_shaman.description',
    tip: '원거리 주술 공격으로 힐러에게 부담을 준다. 아군 뒤에서 안전하게 딜하니 우선 처치 대상으로 지정하라.', tipKey: 'monsters.goblin_shaman.tip',
  },

  // ── 해골/언데드 계열 ──────────────────────────────────────────
  {
    name: 'skeleton', displayName: '해골 병사', displayNameKey: 'monsters.skeleton.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '초급', monsterType: 'normal',
    hp: 80, atk: 20, def: 5, speed: 2.5, isRanged: false, color: '#D1D5DB',
    firstSeenWave: 1,
    description: '마법으로 소환된 최하급 언데드. 뼈만 남은 몸이지만 검을 휘두르는 본능은 살아있다.', descriptionKey: 'monsters.skeleton.description',
    tip: '고블린과 함께 초반에 등장하는 기본 근접 적. 어떤 영웅이든 무난히 처리 가능하다.', tipKey: 'monsters.skeleton.tip',
  },
  {
    name: 'skeleton_archer', displayName: '해골 궁수', displayNameKey: 'monsters.skeleton_archer.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '초급', monsterType: 'normal',
    hp: 65, atk: 28, def: 3, speed: 2.3, isRanged: true, color: '#E5E7EB',
    firstSeenWave: 2,
    description: '활 솜씨를 기억하는 해골 병사. 수풀 너머에서 날아오는 화살에 아군이 속수무책으로 쓰러진다.', descriptionKey: 'monsters.skeleton_archer.description',
    tip: '원거리 초반 적. CC 또는 원딜 영웅으로 전열 영웅 뒤의 해골 궁수를 노려라.', tipKey: 'monsters.skeleton_archer.tip',
  },
  {
    name: 'war_skeleton', displayName: '전쟁 해골', displayNameKey: 'monsters.war_skeleton.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '초급', monsterType: 'normal',
    hp: 120, atk: 30, def: 10, speed: 2.5, isRanged: false, color: '#9CA3AF',
    firstSeenWave: 6,
    description: '전쟁터에서 쓰러진 병사의 혼이 갑옷 채 깨어났다. 실력은 살아있던 때와 다름없다.', descriptionKey: 'monsters.war_skeleton.description',
    tip: '기본 해골보다 체력과 공격력이 높다. 일반 해골 물량 사이에 섞여 탱커를 지치게 하니 우선 제거하라.', tipKey: 'monsters.war_skeleton.tip',
  },
  {
    name: 'bone_sniper', displayName: '뼈 저격수', displayNameKey: 'monsters.bone_sniper.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '중급', monsterType: 'normal',
    hp: 100, atk: 55, def: 8, speed: 2.2, isRanged: true, color: '#CBD5E1',
    firstSeenWave: 11,
    description: '저격을 특기로 하던 해골. 놀라운 사거리로 힐러와 원딜을 우선 노린다.', descriptionKey: 'monsters.bone_sniper.description',
    tip: '사거리가 매우 길다. 힐러를 먼저 조준하니 방어선 뒤에 힐러를 숨기거나 빠르게 처치하라.', tipKey: 'monsters.bone_sniper.tip',
  },
  {
    name: 'skull_knight', displayName: '스컬 나이트', displayNameKey: 'monsters.skull_knight.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '중급', monsterType: 'normal',
    hp: 180, atk: 45, def: 15, speed: 2.2, isRanged: false, color: '#6B7280',
    firstSeenWave: 11,
    description: '기사의 기억과 투지를 간직한 고급 언데드. 중장 갑옷 파편 위로 이상한 기운이 맴돈다.', descriptionKey: 'monsters.skull_knight.description',
    tip: '방어력과 체력을 겸비한 중급 근접 적. 탱커로 어그로를 유지하면서 딜러로 꾸준히 공략하라.', tipKey: 'monsters.skull_knight.tip',
  },
  {
    name: 'death_knight', displayName: '죽음의 기사', displayNameKey: 'monsters.death_knight.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '중급', monsterType: 'normal',
    hp: 350, atk: 70, def: 25, speed: 2.0, isRanged: false, color: '#4B5563',
    firstSeenWave: 16,
    description: '어둠의 힘에 굴복한 성기사. 일격에 아군을 쓰러뜨릴 만큼 강하고, 죽음의 오라를 두르고 있다.', descriptionKey: 'monsters.death_knight.description',
    tip: '강력한 공격과 높은 방어력. 소환 스킬이 있는 영웅이나 CC를 조합해 대응하라.', tipKey: 'monsters.death_knight.tip',
  },
  {
    name: 'deathly_marksman', displayName: '죽음의 사수', displayNameKey: 'monsters.deathly_marksman.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '고급', monsterType: 'normal',
    hp: 280, atk: 90, def: 15, speed: 2.0, isRanged: true, color: '#94A3B8',
    firstSeenWave: 21,
    description: '죽어서도 활시위를 당기는 정예 저격수. 살아있을 때보다 정확도가 더 높다고 한다.', descriptionKey: 'monsters.deathly_marksman.description',
    tip: '높은 공격력의 원거리 정예. 이동 속도가 느려 CC로 묶기 쉽다. 즉시 처치가 최선.', tipKey: 'monsters.deathly_marksman.tip',
  },
  {
    name: 'dark_archer', displayName: '암흑 궁수', displayNameKey: 'monsters.dark_archer.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '중급', monsterType: 'normal',
    hp: 120, atk: 30, def: 5, speed: 3.0, isRanged: true, color: '#7C3AED',
    firstSeenWave: 16,
    description: '어둠의 기운을 화살에 담아 쏘는 언데드. 빠른 이동 속도로 기회를 노린다.', descriptionKey: 'monsters.dark_archer.description',
    tip: '빠른 원거리 적. 방어력이 낮아 처치는 쉽지만 원딜 영웅에 접근하기 전 CC로 막아야 한다.', tipKey: 'monsters.dark_archer.tip',
  },
  {
    name: 'necromancer', displayName: '네크로맨서', displayNameKey: 'monsters.necromancer.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '중급', monsterType: 'normal',
    hp: 300, atk: 50, def: 15, speed: 2.5, isRanged: true, color: '#4C1D95',
    firstSeenWave: 6,
    description: '죽은 자를 소환하는 강력한 마법사. 배후에서 지원하며 언데드 군세를 불린다.', descriptionKey: 'monsters.necromancer.description',
    tip: '방치하면 주변에 언데드가 계속 소환된다. 원거리 딜러로 최우선 제거하라.', tipKey: 'monsters.necromancer.tip',
  },
  {
    name: 'sniper', displayName: '정예 저격수', displayNameKey: 'monsters.sniper.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '고급', monsterType: 'normal',
    hp: 220, atk: 55, def: 10, speed: 3.0, isRanged: true, color: '#5B21B6',
    firstSeenWave: 21,
    description: '사망의 세계에서 더욱 예리해진 저격의 달인. 단 한 발로 아군 핵심 영웅을 쓰러뜨린다.', descriptionKey: 'monsters.sniper.description',
    tip: '빠른 속도와 높은 딜 조합이 위협적이다. 탱커로 어그로를 잡아 원딜·힐러를 보호하라.', tipKey: 'monsters.sniper.tip',
  },
  {
    name: 'lich', displayName: '리치', displayNameKey: 'monsters.lich.displayName', category: '해골/언데드 계열', categoryKey: 'monsterCategories.skeleton', tier: '고급', monsterType: 'normal',
    hp: 600, atk: 80, def: 30, speed: 2.0, isRanged: true, color: '#312E81',
    firstSeenWave: 26,
    description: '불사의 마법으로 스스로를 언데드로 만든 강대한 마법사. 강력한 주문으로 전장 전체를 위협한다.', descriptionKey: 'monsters.lich.description',
    tip: '매우 높은 체력과 방어력. CC로 이동을 막고 집중 딜로 빠르게 제거하라. 자칫 방치하면 파티가 무너진다.', tipKey: 'monsters.lich.tip',
  },

  // ── 골렘 계열 ──────────────────────────────────────────────────
  {
    name: 'wood_golem', displayName: '나무 골렘', displayNameKey: 'monsters.wood_golem.displayName', category: '골렘 계열', categoryKey: 'monsterCategories.golem', tier: '초급', monsterType: 'elite',
    hp: 60, atk: 25, def: 30, speed: 1.5, isRanged: false, color: '#8B5A2B',
    firstSeenWave: 4,
    description: '나무가 마법으로 깨어난 원시적인 골렘. 체력은 낮지만 단단한 외피가 일격의 피해를 막아낸다.', descriptionKey: 'monsters.wood_golem.description',
    tip: '골렘 계열의 핵심: 체력은 낮고 방어력은 매우 높다. 다중 타격 스킬이나 방어 무시 스킬로 공략하라.', tipKey: 'monsters.wood_golem.tip',
  },
  {
    name: 'rock_hurler', displayName: '바위 투척 골렘', displayNameKey: 'monsters.rock_hurler.displayName', category: '골렘 계열', categoryKey: 'monsterCategories.golem', tier: '중급', monsterType: 'elite',
    hp: 70, atk: 30, def: 40, speed: 1.3, isRanged: true, color: '#A8A29E',
    firstSeenWave: 11,
    description: '바위를 집어 던지는 골렘. 원거리에서 돌을 투척해 방어선 뒤쪽까지 피해를 준다.', descriptionKey: 'monsters.rock_hurler.description',
    tip: '원거리 고방어 골렘. 다중 타격 스킬이 필수. 이동이 느려 방어선 형성에 여유가 있다.', tipKey: 'monsters.rock_hurler.tip',
  },
  {
    name: 'stone_golem', displayName: '돌 골렘', displayNameKey: 'monsters.stone_golem.displayName', category: '골렘 계열', categoryKey: 'monsterCategories.golem', tier: '중급', monsterType: 'elite',
    hp: 90, atk: 40, def: 60, speed: 1.2, isRanged: false, color: '#737373',
    firstSeenWave: 6,
    description: '산에서 깎아낸 거대한 돌로 만들어진 골렘. 일반 무기로는 거의 흠집도 내지 못한다.', descriptionKey: 'monsters.stone_golem.description',
    tip: '방어력 60! 단순 공격은 최소 피해만 입힌다. 다단 히트 스킬 또는 방어 무시 시너지를 활용하라.', tipKey: 'monsters.stone_golem.tip',
  },
  {
    name: 'magma_hurler', displayName: '용암 투척 골렘', displayNameKey: 'monsters.magma_hurler.displayName', category: '골렘 계열', categoryKey: 'monsterCategories.golem', tier: '중급', monsterType: 'elite',
    hp: 120, atk: 55, def: 80, speed: 1.0, isRanged: true, color: '#EA580C',
    firstSeenWave: 16,
    description: '내부에 용암이 흐르는 골렘. 던지는 용암 덩어리가 땅에 닿으면 화염 웅덩이를 만든다.', descriptionKey: 'monsters.magma_hurler.description',
    tip: '방어력 80의 원거리 골렘. 용암 투척은 주변 영웅에게도 피해를 줄 수 있다. 다단 히트가 핵심.', tipKey: 'monsters.magma_hurler.tip',
  },
  {
    name: 'iron_golem', displayName: '철 골렘', displayNameKey: 'monsters.iron_golem.displayName', category: '골렘 계열', categoryKey: 'monsterCategories.golem', tier: '고급', monsterType: 'elite',
    hp: 150, atk: 55, def: 100, speed: 1.0, isRanged: false, color: '#A3A3A3',
    firstSeenWave: 11,
    description: '용광로에서 직접 주조된 철제 골렘. 방어력 100으로 대부분의 물리 공격을 무효화한다.', descriptionKey: 'monsters.iron_golem.description',
    tip: '방어력 100. 일반 물리 딜은 거의 의미 없다. 마법 피해 스킬이나 다단 히트 전문 영웅이 필요하다.', tipKey: 'monsters.iron_golem.tip',
  },
  {
    name: 'crystal_golem', displayName: '수정 골렘', displayNameKey: 'monsters.crystal_golem.displayName', category: '골렘 계열', categoryKey: 'monsterCategories.golem', tier: '고급', monsterType: 'elite',
    hp: 200, atk: 75, def: 120, speed: 0.9, isRanged: true, color: '#6EE7F7',
    firstSeenWave: 16,
    description: '순수한 마법 수정으로 형성된 골렘. 원거리에서 마력빔을 발사하고 방어력도 엄청나다.', descriptionKey: 'monsters.crystal_golem.description',
    tip: '방어력 120의 원거리 골렘. 소환수로 물량 어그로를 분산시키고 다단 히트 딜러로 집중 공략하라.', tipKey: 'monsters.crystal_golem.tip',
  },
  {
    name: 'gold_golem', displayName: '금 골렘', displayNameKey: 'monsters.gold_golem.displayName', category: '골렘 계열', categoryKey: 'monsterCategories.golem', tier: '고급', monsterType: 'elite',
    hp: 200, atk: 70, def: 150, speed: 1.0, isRanged: false, color: '#FCD34D',
    firstSeenWave: 21,
    description: '황금으로 빚어진 골렘. 방어력 150으로 전장에서 가장 단단한 존재 중 하나다.', descriptionKey: 'monsters.gold_golem.description',
    tip: '방어력 150! 집중 다단 히트와 방어 무시 시너지가 필수. 시간이 걸려도 꼭 처치하라.', tipKey: 'monsters.gold_golem.tip',
  },
  {
    name: 'diamond_golem', displayName: '다이아 골렘', displayNameKey: 'monsters.diamond_golem.displayName', category: '골렘 계열', categoryKey: 'monsterCategories.golem', tier: '최강', monsterType: 'elite',
    hp: 300, atk: 90, def: 250, speed: 0.8, isRanged: false, color: '#6EE7B7',
    firstSeenWave: 26,
    description: '완벽한 다이아몬드 격자 구조로 이루어진 골렘. 방어력 250으로 사실상 무적에 가깝다.', descriptionKey: 'monsters.diamond_golem.description',
    tip: '방어력 250! 다단 히트 전문 영웅 없이는 처치 불가능에 가깝다. 다이아 골렘 전용 파티 구성을 고려하라.', tipKey: 'monsters.diamond_golem.tip',
  },

  // ── 언데드 거인 계열 ───────────────────────────────────────────
  {
    name: 'flesh_hulk', displayName: '살덩이 헐크', displayNameKey: 'monsters.flesh_hulk.displayName', category: '언데드 거인 계열', categoryKey: 'monsterCategories.giant', tier: '고급', monsterType: 'elite',
    hp: 800, atk: 35, def: 0, speed: 1.5, isRanged: false, color: '#B91C1C',
    firstSeenWave: 21,
    description: '여러 시체를 꿰매어 만든 거대한 괴물. HP 800에 방어력은 없어 강한 한 방에 취약하다.', descriptionKey: 'monsters.flesh_hulk.description',
    tip: '체력이 매우 높지만 방어력은 0. 단일 강타 딜러나 처형 스킬로 순식간에 쓰러뜨릴 수 있다.', tipKey: 'monsters.flesh_hulk.tip',
  },
  {
    name: 'abomination', displayName: '누더기 골렘', displayNameKey: 'monsters.abomination.displayName', category: '언데드 거인 계열', categoryKey: 'monsterCategories.giant', tier: '최강', monsterType: 'elite',
    hp: 1500, atk: 50, def: 5, speed: 1.2, isRanged: false, color: '#991B1B',
    firstSeenWave: 26,
    description: '수백 개의 시체 조각이 뒤엉킨 거대한 혐오 존재. HP 1500, 역병 냄새가 주변을 오염시킨다.', descriptionKey: 'monsters.abomination.description',
    tip: '체력 1500에 방어력 5. 강한 한 방 딜러와 힐러를 함께 운용해야 한다. 혼자 두면 타워까지 뚫는다.', tipKey: 'monsters.abomination.tip',
  },
  {
    name: 'plague_beast', displayName: '역병 괴수', displayNameKey: 'monsters.plague_beast.displayName', category: '언데드 거인 계열', categoryKey: 'monsterCategories.giant', tier: '최강', monsterType: 'elite',
    hp: 2500, atk: 70, def: 10, speed: 1.0, isRanged: false, color: '#7F1D1D',
    firstSeenWave: 26,
    description: '역병으로 인해 변이된 거대 언데드. HP 2500, 접근 시 역병 구름으로 아군 HP를 갉아먹는다.', descriptionKey: 'monsters.plague_beast.description',
    tip: '체력 2500! 아군 전체 화력을 집중하라. 힐러가 없으면 역병 피해로 파티 전체가 쓰러진다.', tipKey: 'monsters.plague_beast.tip',
  },

  // ── 야수 계열 ──────────────────────────────────────────────────
  {
    name: 'cave_spider', displayName: '동굴 거미', displayNameKey: 'monsters.cave_spider.displayName', category: '야수 계열', categoryKey: 'monsterCategories.beast', tier: '초급', monsterType: 'normal',
    hp: 80, atk: 30, def: 3, speed: 4.5, isRanged: false, color: '#57534E',
    firstSeenWave: 11,
    description: '어두운 동굴에서 기어 나온 거대 거미. 속도 4.5로 방어선을 순식간에 뚫는다.', descriptionKey: 'monsters.cave_spider.description',
    tip: '매우 빠른 이동 속도. CC 스킬로 발을 묶지 않으면 탱커를 뛰어넘어 타워로 돌진한다.', tipKey: 'monsters.cave_spider.tip',
  },
  {
    name: 'wolf', displayName: '늑대', displayNameKey: 'monsters.wolf.displayName', category: '야수 계열', categoryKey: 'monsterCategories.beast', tier: '초급', monsterType: 'normal',
    hp: 120, atk: 25, def: 5, speed: 5.0, isRanged: false, color: '#92400E',
    firstSeenWave: 6,
    description: '무리 지어 달리는 야생 늑대. 속도 5.0의 맹수. 무리가 합쳐지면 어떤 방어선도 뚫는다.', descriptionKey: 'monsters.wolf.description',
    tip: '빠른 속도와 물량. CC + 광역기로 초반에 집단을 쓸어내라. 개별 처리는 느리다.', tipKey: 'monsters.wolf.tip',
  },
  {
    name: 'venom_spider', displayName: '독 거미', displayNameKey: 'monsters.venom_spider.displayName', category: '야수 계열', categoryKey: 'monsterCategories.beast', tier: '중급', monsterType: 'normal',
    hp: 130, atk: 45, def: 5, speed: 4.0, isRanged: true, color: '#365314',
    firstSeenWave: 16,
    description: '독낭이 부풀어 오른 거미. 원거리에서 독 실을 뱉어 아군을 독에 중독시킨다.', descriptionKey: 'monsters.venom_spider.description',
    tip: '원거리 독 공격으로 힐러 부담을 증가시킨다. 야수 계열은 원딜보다 근딜로 처리가 빠르다.', tipKey: 'monsters.venom_spider.tip',
  },
  {
    name: 'giant_spider', displayName: '거대 거미', displayNameKey: 'monsters.giant_spider.displayName', category: '야수 계열', categoryKey: 'monsterCategories.beast', tier: '중급', monsterType: 'normal',
    hp: 280, atk: 55, def: 10, speed: 3.5, isRanged: false, color: '#44403C',
    firstSeenWave: 16,
    description: '성인 남성보다 큰 독거미. 속도는 약간 느려졌지만 강인한 외골격이 피해를 줄여준다.', descriptionKey: 'monsters.giant_spider.description',
    tip: '동굴 거미의 강화형. 높은 체력에 빠른 속도가 위협적이다. CC 우선 후 집중 딜로 처리하라.', tipKey: 'monsters.giant_spider.tip',
  },
  {
    name: 'dire_wolf', displayName: '다이어 울프', displayNameKey: 'monsters.dire_wolf.displayName', category: '야수 계열', categoryKey: 'monsterCategories.beast', tier: '중급', monsterType: 'normal',
    hp: 250, atk: 40, def: 12, speed: 5.5, isRanged: false, color: '#78350F',
    firstSeenWave: 16,
    description: '고대 마법에 의해 강화된 늑대. 속도 5.5로 전장에서 가장 빠른 지상 유닛 중 하나다.', descriptionKey: 'monsters.dire_wolf.description',
    tip: '전장에서 가장 빠른 적. CC 없이는 방어선이 무너진다. 빙결/기절 스킬이 필수다.', tipKey: 'monsters.dire_wolf.tip',
  },

  // ── 오크/트롤 계열 ─────────────────────────────────────────────
  {
    name: 'orc_grunt', displayName: '오크 돌격병', displayNameKey: 'monsters.orc_grunt.displayName', category: '오크/트롤 계열', categoryKey: 'monsterCategories.orc', tier: '중급', monsterType: 'normal',
    hp: 400, atk: 40, def: 25, speed: 2.2, isRanged: false, color: '#059669',
    firstSeenWave: 16,
    description: '전쟁에 길들여진 오크 보병. 체력과 방어력을 겸비한 균형 잡힌 강적.', descriptionKey: 'monsters.orc_grunt.description',
    tip: '체력 400, 방어력 25의 균형형. 탱커 1명이 막기엔 벅차다. 소환수로 어그로를 분산하라.', tipKey: 'monsters.orc_grunt.tip',
  },
  {
    name: 'orc_shaman', displayName: '오크 주술사', displayNameKey: 'monsters.orc_shaman.displayName', category: '오크/트롤 계열', categoryKey: 'monsterCategories.orc', tier: '중급', monsterType: 'normal',
    hp: 320, atk: 55, def: 20, speed: 2.0, isRanged: true, color: '#065F46',
    firstSeenWave: 16,
    description: '부족의 주술사. 번개 주문과 독 안개로 아군을 지원하며 원거리에서 안전하게 활동한다.', descriptionKey: 'monsters.orc_shaman.description',
    tip: '오크 돌격병 뒤에 숨어 안전하게 딜한다. 주술사부터 처치해야 아군 피해를 줄일 수 있다.', tipKey: 'monsters.orc_shaman.tip',
  },
  {
    name: 'orc_warrior', displayName: '오크 전사', displayNameKey: 'monsters.orc_warrior.displayName', category: '오크/트롤 계열', categoryKey: 'monsterCategories.orc', tier: '고급', monsterType: 'normal',
    hp: 700, atk: 60, def: 40, speed: 2.0, isRanged: false, color: '#047857',
    firstSeenWave: 21,
    description: '수십 번의 전투에서 살아남은 오크 정예 전사. 체력 700에 강력한 일격은 탱커도 금방 쓰러뜨린다.', descriptionKey: 'monsters.orc_warrior.description',
    tip: '체력 700, 방어력 40의 강력한 근접 적. 탱커 2명이 필요할 수 있다. 힐러 지원을 아끼지 마라.', tipKey: 'monsters.orc_warrior.tip',
  },
  {
    name: 'troll_warrior', displayName: '트롤 전사', displayNameKey: 'monsters.troll_warrior.displayName', category: '오크/트롤 계열', categoryKey: 'monsterCategories.orc', tier: '고급', monsterType: 'normal',
    hp: 900, atk: 85, def: 35, speed: 1.8, isRanged: false, color: '#15803D',
    firstSeenWave: 21,
    description: '재생 능력을 가진 트롤 전사. 체력 900에 방어력 35, 죽이는 데 집중적인 화력이 필요하다.', descriptionKey: 'monsters.troll_warrior.description',
    tip: '체력 900! 재생력이 있어 딜이 끊기면 회복될 수 있다. 집중 화력으로 끊임없이 공격하라.', tipKey: 'monsters.troll_warrior.tip',
  },
  {
    name: 'troll_shaman', displayName: '트롤 주술사', displayNameKey: 'monsters.troll_shaman.displayName', category: '오크/트롤 계열', categoryKey: 'monsterCategories.orc', tier: '고급', monsterType: 'normal',
    hp: 650, atk: 70, def: 25, speed: 1.5, isRanged: true, color: '#166534',
    firstSeenWave: 21,
    description: '고대 주술로 아군 트롤을 치유하고 강화하는 주술사. 전장 후방에서 전투를 조율한다.', descriptionKey: 'monsters.troll_shaman.description',
    tip: '원거리에서 아군 트롤을 힐하고 강화한다. 즉시 처치가 최우선. CC로 묶고 집중 딜하라.', tipKey: 'monsters.troll_shaman.tip',
  },

  // ── 정령 계열 ───────────────────────────────────────────────────
  {
    name: 'fire_spirit', displayName: '화염 정령', displayNameKey: 'monsters.fire_spirit.displayName', category: '정령 계열', categoryKey: 'monsterCategories.elemental', tier: '초급', monsterType: 'normal',
    hp: 150, atk: 50, def: 0, speed: 3.5, isRanged: false, color: '#F97316',
    firstSeenWave: 7,
    description: '불꽃에서 태어난 정령. 방어력이 없고 체력도 낮지만 빠른 속도와 화염 공격이 위협적이다.', descriptionKey: 'monsters.fire_spirit.description',
    tip: '방어력 0이라 처치는 쉽지만 수가 많으면 타워를 빠르게 위협한다. 광역기로 쓸어내라.', tipKey: 'monsters.fire_spirit.tip',
  },
  {
    name: 'wind_spirit', displayName: '바람 정령', displayNameKey: 'monsters.wind_spirit.displayName', category: '정령 계열', categoryKey: 'monsterCategories.elemental', tier: '중급', monsterType: 'normal',
    hp: 90, atk: 35, def: 0, speed: 6.0, isRanged: false, color: '#BAE6FD',
    firstSeenWave: 9,
    description: '바람 자체가 의지를 가진 존재. 속도 6.0으로 전장에서 가장 빠른 적이다.', descriptionKey: 'monsters.wind_spirit.description',
    tip: '속도 6.0! 탱커를 무시하고 타워로 직행할 수 있다. CC 필수. 빙결 스킬이 없으면 막기 어렵다.', tipKey: 'monsters.wind_spirit.tip',
  },
  {
    name: 'ice_spirit', displayName: '냉기 정령', displayNameKey: 'monsters.ice_spirit.displayName', category: '정령 계열', categoryKey: 'monsterCategories.elemental', tier: '중급', monsterType: 'normal',
    hp: 130, atk: 40, def: 15, speed: 2.5, isRanged: false, color: '#67E8F9',
    firstSeenWave: 12,
    description: '얼음 결정으로 이루어진 정령. 공격마다 명중한 영웅의 이동 속도를 저하시킨다.', descriptionKey: 'monsters.ice_spirit.description',
    tip: '냉기 공격으로 아군 영웅을 슬로우시킨다. 힐러가 슬로우에 걸리면 치료가 늦어지니 주의.', tipKey: 'monsters.ice_spirit.tip',
  },
  {
    name: 'lightning_spirit', displayName: '번개 정령', displayNameKey: 'monsters.lightning_spirit.displayName', category: '정령 계열', categoryKey: 'monsterCategories.elemental', tier: '중급', monsterType: 'normal',
    hp: 100, atk: 60, def: 0, speed: 4.0, isRanged: true, color: '#FDE047',
    firstSeenWave: 11,
    description: '전기 에너지가 응집된 정령. 빠른 속도로 접근해 번개로 공격하며 근처 아군에게도 감전 피해를 준다.', descriptionKey: 'monsters.lightning_spirit.description',
    tip: '원거리 번개 공격. 방어력 0으로 처치는 쉽다. 빠른 속도로 원딜 영웅을 노리는 패턴을 주의.', tipKey: 'monsters.lightning_spirit.tip',
  },
  {
    name: 'poison_spirit', displayName: '독 정령', displayNameKey: 'monsters.poison_spirit.displayName', category: '정령 계열', categoryKey: 'monsterCategories.elemental', tier: '중급', monsterType: 'normal',
    hp: 200, atk: 45, def: 5, speed: 3.0, isRanged: false, color: '#86EFAC',
    firstSeenWave: 17,
    description: '독기가 응집된 정령. 접촉만으로도 중독을 유발하며 천천히 모든 아군 영웅의 체력을 갉아먹는다.', descriptionKey: 'monsters.poison_spirit.description',
    tip: '독 오라로 근처 아군이 지속 피해를 받는다. 힐러의 부담이 급증하니 빠르게 처치하라.', tipKey: 'monsters.poison_spirit.tip',
  },
  {
    name: 'lava_elemental', displayName: '용암 정령', displayNameKey: 'monsters.lava_elemental.displayName', category: '정령 계열', categoryKey: 'monsterCategories.elemental', tier: '고급', monsterType: 'elite',
    hp: 500, atk: 95, def: 20, speed: 1.5, isRanged: false, color: '#DC2626',
    firstSeenWave: 19,
    description: '용암이 의지를 얻은 존재. 체력 500에 강력한 화염 타격을 날린다. 근처에만 있어도 뜨겁다.', descriptionKey: 'monsters.lava_elemental.description',
    tip: '체력 500의 고급 정령. 강한 공격력으로 탱커도 빠르게 무너뜨린다. 힐 지원 필수.', tipKey: 'monsters.lava_elemental.tip',
  },
  {
    name: 'frost_elemental', displayName: '서리 정령', displayNameKey: 'monsters.frost_elemental.displayName', category: '정령 계열', categoryKey: 'monsterCategories.elemental', tier: '고급', monsterType: 'elite',
    hp: 450, atk: 80, def: 35, speed: 2.0, isRanged: false, color: '#38BDF8',
    firstSeenWave: 21,
    description: '극한의 냉기를 품은 정령. 공격마다 광역 슬로우를 부여하며 방어도 철저하다.', descriptionKey: 'monsters.frost_elemental.description',
    tip: '체력 450, 방어력 35의 고급 정령. 광역 슬로우로 아군 전체가 느려진다. CC 영웅으로 역슬로우하라.', tipKey: 'monsters.frost_elemental.tip',
  },
  {
    name: 'storm_elemental', displayName: '폭풍 정령', displayNameKey: 'monsters.storm_elemental.displayName', category: '정령 계열', categoryKey: 'monsterCategories.elemental', tier: '고급', monsterType: 'elite',
    hp: 400, atk: 100, def: 15, speed: 3.0, isRanged: true, color: '#7C3AED',
    firstSeenWave: 23,
    description: '폭풍과 번개를 지휘하는 정령. 원거리에서 연쇄 번개로 여러 아군에게 동시 피해를 준다.', descriptionKey: 'monsters.storm_elemental.description',
    tip: '연쇄 번개로 여러 영웅에게 동시 피해. 파티 내 방어력 높은 영웅이 앞에 서야 피해를 분산할 수 있다.', tipKey: 'monsters.storm_elemental.tip',
  },
  {
    name: 'void_spirit', displayName: '공허 정령', displayNameKey: 'monsters.void_spirit.displayName', category: '정령 계열', categoryKey: 'monsterCategories.elemental', tier: '고급', monsterType: 'normal',
    hp: 350, atk: 75, def: 20, speed: 2.5, isRanged: true, color: '#6D28D9',
    firstSeenWave: 21,
    description: '현실 너머 공허에서 온 존재. 원거리 공허 광선으로 방어력을 무시하는 순수 마법 피해를 준다.', descriptionKey: 'monsters.void_spirit.description',
    tip: '공허 공격은 방어력을 무시한다. 체력이 많은 탱커를 전면에 세우고 힐러를 항상 대기시켜라.', tipKey: 'monsters.void_spirit.tip',
  },

  // ── 암흑/공허 계열 ─────────────────────────────────────────────
  {
    name: 'shadow_stalker', displayName: '그림자 침략자', displayNameKey: 'monsters.shadow_stalker.displayName', category: '암흑/공허 계열', categoryKey: 'monsterCategories.dark', tier: '고급', monsterType: 'normal',
    hp: 200, atk: 60, def: 5, speed: 4.0, isRanged: false, color: '#312E81',
    firstSeenWave: 21,
    description: '어둠 속에서 은신하다 기습하는 암살자. 속도 4.0으로 아군 뒤쪽 원딜·힐러를 노린다.', descriptionKey: 'monsters.shadow_stalker.description',
    tip: '빠른 속도로 취약한 영웅을 노린다. CC 영웅이 필수. 암살당하기 전에 먼저 눈으로 추적하라.', tipKey: 'monsters.shadow_stalker.tip',
  },
  {
    name: 'dark_mage', displayName: '암흑 마법사', displayNameKey: 'monsters.dark_mage.displayName', category: '암흑/공허 계열', categoryKey: 'monsterCategories.dark', tier: '고급', monsterType: 'normal',
    hp: 270, atk: 65, def: 10, speed: 2.5, isRanged: true, color: '#6B21A8',
    firstSeenWave: 26,
    description: '어둠의 마력을 능숙하게 다루는 마법사. 저주와 어둠의 화염으로 아군 전체를 위협한다.', descriptionKey: 'monsters.dark_mage.description',
    tip: '원거리 마법 공격으로 방어력을 어느 정도 무시한다. 즉시 처치를 목표로 하라.', tipKey: 'monsters.dark_mage.tip',
  },
  {
    name: 'void_crawler', displayName: '공허 추적자', displayNameKey: 'monsters.void_crawler.displayName', category: '암흑/공허 계열', categoryKey: 'monsterCategories.dark', tier: '고급', monsterType: 'normal',
    hp: 400, atk: 80, def: 15, speed: 3.0, isRanged: false, color: '#2E1065',
    firstSeenWave: 26,
    description: '공허 차원에서 기어 나온 거미 형태의 존재. 체력 400에 빠른 속도로 탱커를 뚫고 들어온다.', descriptionKey: 'monsters.void_crawler.description',
    tip: '체력 400의 고속 근접 적. 탱커가 어그로를 유지하기 어렵다. CC와 소환수를 함께 활용하라.', tipKey: 'monsters.void_crawler.tip',
  },
  {
    name: 'plague_mage', displayName: '역병 마법사', displayNameKey: 'monsters.plague_mage.displayName', category: '암흑/공허 계열', categoryKey: 'monsterCategories.dark', tier: '고급', monsterType: 'normal',
    hp: 380, atk: 75, def: 15, speed: 2.0, isRanged: true, color: '#14532D',
    firstSeenWave: 26,
    description: '역병을 마법으로 조율하는 어둠의 마법사. 원거리에서 역병을 퍼뜨려 아군을 서서히 죽게 만든다.', descriptionKey: 'monsters.plague_mage.description',
    tip: '역병 공격으로 지속 피해를 준다. 힐러 부담이 극도로 증가하니 다른 적보다 우선 처치하라.', tipKey: 'monsters.plague_mage.tip',
  },
  {
    name: 'abyss_horror', displayName: '심연의 공포', displayNameKey: 'monsters.abyss_horror.displayName', category: '암흑/공허 계열', categoryKey: 'monsterCategories.dark', tier: '최강', monsterType: 'normal',
    hp: 700, atk: 100, def: 25, speed: 2.5, isRanged: false, color: '#0F172A',
    firstSeenWave: 26,
    description: '현실의 경계를 찢고 나온 공허의 현현. 체력 700에 무자비한 공격으로 방어선을 붕괴시킨다.', descriptionKey: 'monsters.abyss_horror.description',
    tip: '체력 700, 방어력 25의 최고급 근접 적. 탱커 2명 + 힐러 지원 없이는 무너진다. 보스 웨이브 전 만반의 준비를.', tipKey: 'monsters.abyss_horror.tip',
  },

  // ── 보스 ─────────────────────────────────────────────────────
  {
    name: 'troll_warlord', displayName: '트롤 전쟁군주', displayNameKey: 'monsters.troll_warlord.displayName', category: '보스', categoryKey: 'monsterCategories.boss', tier: '최강', monsterType: 'boss',
    hp: 2000, atk: 60, def: 40, speed: 2.0, isRanged: false, color: '#D97706',
    firstSeenWave: 5,
    description: '트롤 부족의 최고 지도자. 어픽스: 분노 — HP가 30% 이하가 되면 공격력이 2배로 증가한다.', descriptionKey: 'monsters.troll_warlord.description',
    tip: 'Wave 5 보스. 분노 전환 전에 빠르게 HP를 낮춰야 한다. 힐러와 CC가 없으면 분노 상태에서 탱커도 순식간에 쓰러진다.', tipKey: 'monsters.troll_warlord.tip',
  },
  {
    name: 'lich_king', displayName: '리치 군주', displayNameKey: 'monsters.lich_king.displayName', category: '보스', categoryKey: 'monsterCategories.boss', tier: '최강', monsterType: 'boss',
    hp: 3000, atk: 80, def: 50, speed: 1.5, isRanged: true, color: '#1E3A5F',
    firstSeenWave: 10,
    description: '언데드의 왕. 어픽스: 소환 — 주기적으로 언데드 병사를 소환하고 아군 어그로를 빼앗는다.', descriptionKey: 'monsters.lich_king.description',
    tip: 'Wave 10 보스. 소환된 언데드가 탱커 어그로를 분산시킨다. 광역기로 소환수를 빠르게 제거하라.', tipKey: 'monsters.lich_king.tip',
  },
  {
    name: 'fire_lord', displayName: '화염 군주', displayNameKey: 'monsters.fire_lord.displayName', category: '보스', categoryKey: 'monsterCategories.boss', tier: '최강', monsterType: 'boss',
    hp: 4000, atk: 90, def: 25, speed: 1.8, isRanged: true, color: '#DC2626',
    firstSeenWave: 15,
    description: '화염의 군주. 어픽스: AOE 강타 — 주기적으로 아군 전체에 폭발 피해를 가한다.', descriptionKey: 'monsters.fire_lord.description',
    tip: 'Wave 15 보스. AOE 강타 판정이 매우 넓다. 힐러가 없으면 불가능에 가까운 전투. CC로 강타를 방해하라.', tipKey: 'monsters.fire_lord.tip',
  },
  {
    name: 'frost_king', displayName: '냉기 왕', displayNameKey: 'monsters.frost_king.displayName', category: '보스', categoryKey: 'monsterCategories.boss', tier: '최강', monsterType: 'boss',
    hp: 4500, atk: 75, def: 80, speed: 1.2, isRanged: false, color: '#0EA5E9',
    firstSeenWave: 20,
    description: '영원한 겨울을 지배하는 냉기의 왕. 어픽스: 분노 — 방어력 80으로 물리 공격을 거의 흡수한다.', descriptionKey: 'monsters.frost_king.description',
    tip: 'Wave 20 보스. 방어력 80! 마법 딜러나 다단 히트 영웅이 없으면 처치 불가. 분노 전 집중 공략.', tipKey: 'monsters.frost_king.tip',
  },
  {
    name: 'titanium_golem', displayName: '티타늄 골렘', displayNameKey: 'monsters.titanium_golem.displayName', category: '보스', categoryKey: 'monsterCategories.boss', tier: '최강', monsterType: 'boss',
    hp: 1500, atk: 120, def: 400, speed: 0.8, isRanged: false, color: '#94A3B8',
    firstSeenWave: 25,
    description: '전장 역사상 가장 단단한 존재. HP 1500에 방어력 400. 어픽스: AOE 강타로 지진을 일으킨다.', descriptionKey: 'monsters.titanium_golem.description',
    tip: 'Wave 25 보스. 방어력 400!!! 다단 히트 전문 영웅 없이는 처치 불가. 파티 전체에 다단 히트 스킬이 필요하다.', tipKey: 'monsters.titanium_golem.tip',
  },
  {
    name: 'void_walker', displayName: '공허의 보행자', displayNameKey: 'monsters.void_walker.displayName', category: '보스', categoryKey: 'monsterCategories.boss', tier: '최강', monsterType: 'boss',
    hp: 5000, atk: 100, def: 60, speed: 1.2, isRanged: false, color: '#2D1B69',
    firstSeenWave: 30,
    description: '공허 차원과 현실 세계를 넘나드는 존재. 어픽스: 분노 — HP 5000에 방어력 무시 공격.', descriptionKey: 'monsters.void_walker.description',
    tip: 'Wave 30 보스. 체력 5000! 분노 전환이 빠르다. 고딜 원거리 파티로 최단 시간 내 처치가 최선.', tipKey: 'monsters.void_walker.tip',
  },
  {
    name: 'thunder_tyrant', displayName: '폭풍 폭군', displayNameKey: 'monsters.thunder_tyrant.displayName', category: '보스', categoryKey: 'monsterCategories.boss', tier: '최강', monsterType: 'boss',
    hp: 7000, atk: 120, def: 50, speed: 2.0, isRanged: true, color: '#7C3AED',
    firstSeenWave: 35,
    description: '번개와 폭풍을 지배하는 압도적인 존재. 어픽스: AOE 강타 — 번개 폭풍을 일으켜 전장을 초토화.', descriptionKey: 'monsters.thunder_tyrant.description',
    tip: 'Wave 35 보스. 빠른 속도와 원거리 공격 조합. AOE 강타의 범위가 매우 넓다. 힐러 2명 이상을 준비하라.', tipKey: 'monsters.thunder_tyrant.tip',
  },
  {
    name: 'flesh_giant', displayName: '거대 살덩이', displayNameKey: 'monsters.flesh_giant.displayName', category: '보스', categoryKey: 'monsterCategories.boss', tier: '최강', monsterType: 'boss',
    hp: 15000, atk: 90, def: 10, speed: 1.0, isRanged: false, color: '#7F1D1D',
    firstSeenWave: 40,
    description: '수천 개의 시체를 뭉쳐 만든 거대한 언데드. HP 15000의 역대 최고 체력. 분노 상태에선 멈출 수 없다.', descriptionKey: 'monsters.flesh_giant.description',
    tip: 'Wave 40 보스. 체력 15000!! 방어력은 낮지만 체력이 압도적. 힐러 + 처형 스킬이 필수. 지구전 준비를.', tipKey: 'monsters.flesh_giant.tip',
  },
  {
    name: 'void_dragon', displayName: '공허 드래곤', displayNameKey: 'monsters.void_dragon.displayName', category: '보스', categoryKey: 'monsterCategories.boss', tier: '최강', monsterType: 'boss',
    hp: 10000, atk: 150, def: 80, speed: 1.5, isRanged: true, color: '#0F172A',
    firstSeenWave: 45,
    description: '공허에서 깨어난 드래곤. HP 10000에 방어력 80, 원거리 공허 브레스와 AOE 강타를 함께 사용한다.', descriptionKey: 'monsters.void_dragon.description',
    tip: 'Wave 45+ 보스. 공허 드래곤은 모든 전략이 필요한 최종 보스. 탱커-힐러-딜러 완벽한 균형 파티만이 상대할 수 있다.', tipKey: 'monsters.void_dragon.tip',
  },
];

// localStorage 유틸리티
export function loadKilledMonsters(userId: number): Set<string> {
  try {
    const raw = localStorage.getItem(`monster_kills_${userId}`);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch { return new Set(); }
}

export function saveKilledMonsters(userId: number, set: Set<string>): void {
  localStorage.setItem(`monster_kills_${userId}`, JSON.stringify([...set]));
}

export function addMonsterKill(userId: number, monsterName: string): void {
  const set = loadKilledMonsters(userId);
  if (!set.has(monsterName)) {
    set.add(monsterName);
    saveKilledMonsters(userId, set);
  }
}
