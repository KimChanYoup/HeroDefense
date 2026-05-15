// Canvas dimensions
export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 500;

// Field layout (horizontal)
// 벽(방어선): 영웅 활동범위(120~500) 1/4 지점 = 120 + 380/4 = 215
export const TOWER_X = 215;          // Wall (방어선) position
export const WALL_AGGRO_RANGE = 140; // 벽 어그로 반응 반경: 이 범위 내 어그로 없는 몬스터는 벽 우선 공격
export const HERO_MIN_X = 120;       // Hero placement zone start
export const HERO_MAX_X = 500;       // Hero placement zone end
export const MONSTER_SPAWN_X = CANVAS_WIDTH + 30; // Monsters spawn off-screen right
export const OFFENSE_WALL_X = 850; // Enemy wall position (offense mode) - moved forward for better backline protection
export const FIELD_Y_MIN = 60;       // Top boundary
export const FIELD_Y_MAX = CANVAS_HEIGHT - 60; // Bottom boundary
export const FIELD_Y_CENTER = CANVAS_HEIGHT / 2;

// Tower / Wall
export const TOWER_HP = 2000; // 방어선 HP (자주 공격받으므로 증가)
export const TOWER_WIDTH = 60;
export const TOWER_HEIGHT = 200;

// Combat
export const BASE_ATTACK_COOLDOWN = 1.0; // seconds
export const MELEE_ATTACK_RANGE = 50;
export const RANGED_ATTACK_RANGE = 250;
export const HEAL_RANGE = 300;

// Wave timing
export const WAVE_PREP_TIME = 3; // seconds between waves
export const MONSTERS_PER_WAVE_BASE = 5;
export const WAVE_HP_SCALE = 1.15; // HP multiplier per wave
export const WAVE_ATK_SCALE = 1.1;

// Visual
export const HERO_SIZE = 22;
export const MONSTER_SIZE = 18;
export const BOSS_SIZE = 35;
export const ELITE_SIZE = 24;

// Colors
export const COLORS = {
  tank: '#3B82F6',       // blue
  melee_dps: '#EF4444',  // red
  ranged_dps: '#F97316',  // orange
  healer: '#22C55E',     // green
  cc: '#A855F7',         // purple
  monster_normal: '#9CA3AF',
  monster_elite: '#FBBF24',
  monster_boss: '#DC2626',
  tower: '#8B5CF6',
  hp_bar_bg: '#1F2937',
  hp_bar_fill: '#22C55E',
  hp_bar_low: '#EF4444',
  mana_bar: '#3B82F6',
  ground: '#1a1a2e',
  grid: '#16213e',
};
