/**
 * AIEngine - Extends the game with AI-controlled hero party selection
 * The AI analyzes available synergies and picks an optimal party composition.
 * Used for the "AI Opponent" bonus module.
 */
import { GameEngine, GameOptions } from './GameEngine';
import type { GameHero, Role } from './types';
import { COLORS, HERO_MAX_X, HERO_MIN_X, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_SIZE } from './constants';

// AI party configurations - each represents a different AI strategy
// threatMult is crucial for aggro system
const AI_PARTY_CONFIGS = [
  // Strategy 1: Full Orc Fire Synergy - Maximum HP and ATK
  [
    { name: '오크 방어 전사', role: 'tank' as const, specName: '방어', className: '전사', raceName: '오크', elementName: '화염', maxHp: 900, hp: 900, atk: 35, def: 65, speed: 2, attackRange: 40, aggroRadius: 130, attackCooldown: 1.2, color: COLORS.tank, size: HERO_SIZE + 4, threatMult: 2.0 },
    { name: '오크 광전사', role: 'melee_dps' as const, specName: '분노', className: '전사', raceName: '오크', elementName: '화염', maxHp: 550, hp: 550, atk: 90, def: 28, speed: 4, attackRange: 40, aggroRadius: 0, attackCooldown: 0.65, color: COLORS.melee_dps, size: HERO_SIZE, threatMult: 1.0 },
    { name: '오크 불꽃술사', role: 'ranged_dps' as const, specName: '화염', className: '마법사', raceName: '오크', elementName: '화염', maxHp: 380, hp: 380, atk: 110, def: 12, speed: 3, attackRange: 1500, aggroRadius: 0, attackCooldown: 1.4, color: COLORS.ranged_dps, size: HERO_SIZE, threatMult: 1.0 },
    { name: '오크 격류술사', role: 'cc' as const, specName: '냉기', className: '마법사', raceName: '오크', elementName: '냉기', maxHp: 380, hp: 380, atk: 65, def: 14, speed: 3, attackRange: 1500, aggroRadius: 0, attackCooldown: 1.9, color: COLORS.cc, size: HERO_SIZE, threatMult: 1.0 },
    { name: '오크 오라힐러', role: 'healer' as const, specName: '신성', className: '사제', raceName: '오크', elementName: '신성', maxHp: 430, hp: 430, atk: 25, def: 18, speed: 3, attackRange: 600, aggroRadius: 0, attackCooldown: 1.7, color: COLORS.healer, size: HERO_SIZE, threatMult: 1.0 },
  ],
  // Strategy 2: Human Elite - High ATK bonus
  [
    { name: '인간 기사', role: 'tank' as const, specName: '방어', className: '전사', raceName: '인간', elementName: '신성', maxHp: 820, hp: 820, atk: 32, def: 62, speed: 2, attackRange: 42, aggroRadius: 125, attackCooldown: 1.15, color: COLORS.tank, size: HERO_SIZE + 4, threatMult: 2.0 },
    { name: '인간 암살자', role: 'melee_dps' as const, specName: '암흑', className: '도적', raceName: '인간', elementName: '암흑', maxHp: 480, hp: 480, atk: 85, def: 22, speed: 4, attackRange: 38, aggroRadius: 0, attackCooldown: 0.68, color: COLORS.melee_dps, size: HERO_SIZE, threatMult: 1.0 },
    { name: '인간 화염술사', role: 'ranged_dps' as const, specName: '화염', className: '마법사', raceName: '인간', elementName: '화염', maxHp: 360, hp: 360, atk: 105, def: 11, speed: 3, attackRange: 1500, aggroRadius: 0, attackCooldown: 1.45, color: COLORS.ranged_dps, size: HERO_SIZE, threatMult: 1.0 },
    { name: '인간 빙결사', role: 'cc' as const, specName: '냉기', className: '마법사', raceName: '인간', elementName: '냉기', maxHp: 375, hp: 375, atk: 62, def: 13, speed: 3, attackRange: 1500, aggroRadius: 0, attackCooldown: 1.95, color: COLORS.cc, size: HERO_SIZE, threatMult: 1.0 },
    { name: '인간 사제', role: 'healer' as const, specName: '신성', className: '사제', raceName: '인간', elementName: '신성', maxHp: 410, hp: 410, atk: 22, def: 16, speed: 3, attackRange: 600, aggroRadius: 0, attackCooldown: 1.75, color: COLORS.healer, size: HERO_SIZE, threatMult: 1.0 },
  ],
];

// Faction-based AI Parties (Unlocked by clearing lands in Offense Mode)
export const AI_FACTIONS = [
  { id: 'goblin', name: '고블린 무역사단', nameKey: 'aiGame.factions.goblin', race: '고블린', regionId: 'goblin' },
  { id: 'orc', name: '호드 군단', nameKey: 'aiGame.factions.orc', race: '오크', regionId: 'orc' },
  { id: 'tauren', name: '타우렌 부족', nameKey: 'aiGame.factions.tauren', race: '타우렌', regionId: 'tauren' },
  { id: 'elf', name: '그림자 엘프', nameKey: 'aiGame.factions.elf', race: '엘프', regionId: 'darkelf' },
  { id: 'undead', name: '언데드 스컬지', nameKey: 'aiGame.factions.undead', race: '언데드', regionId: 'undead' },
  { id: 'troll', name: '트롤 부두단', nameKey: 'aiGame.factions.troll', race: '트롤', regionId: 'poison' },
  { id: 'human', name: '인간 용병단', nameKey: 'aiGame.factions.human', race: '인간', regionId: 'mercenary' },
];

/**
 * Generates a full racial party based on the faction race.
 * This ensures the 5-hero racial synergy is always active for factions.
 */
function createRacialParty(race: string): any[] {
  const roles: Role[] = ['tank', 'melee_dps', 'ranged_dps', 'cc', 'healer'];
  const elements = ['화염', '냉기', '자연', '암흑', '신성'];
  
  return roles.map((role, i) => {
    const isTank = role === 'tank';
    return {
      name: `${race} ${role === 'tank' ? '수호병' : role === 'healer' ? '치유사' : '용사'}`,
      role,
      specName: race,
      className: race,
      raceName: race,
      elementName: elements[i % elements.length],
      maxHp: isTank ? 850 : 450,
      hp: isTank ? 850 : 450,
      atk: isTank ? 30 : 80,
      def: isTank ? 60 : 20,
      speed: isTank ? 2.5 : 3.5,
      attackRange: role === 'tank' || role === 'melee_dps' ? 45 : 1500,
      aggroRadius: isTank ? 120 : 0,
      attackCooldown: isTank ? 1.2 : 0.8,
      color: COLORS[role as keyof typeof COLORS],
      size: isTank ? HERO_SIZE + 4 : HERO_SIZE,
      threatMult: isTank ? 2.0 : 1.0,
    };
  });
}

/** 
 * Scales AI hero stats based on star rating 
 * Using same multiplier as player heroes
 */
const STAR_MULT = [1.0, 1.10, 1.25, 1.45, 1.70] as const;

function scaleAIHero(hero: any, star: number): any {
  const mult = STAR_MULT[Math.max(0, Math.min(4, star - 1))];
  return {
    ...hero,
    maxHp: Math.round(hero.maxHp * mult),
    hp: Math.round(hero.maxHp * mult),
    atk: Math.round(hero.atk * mult),
    // def and speed use a slightly lower scaling for balance
    def: Math.round(hero.def * (1 + (star - 1) * 0.05)),
    speed: parseFloat((hero.speed * (1 + (star - 1) * 0.05)).toFixed(2)),
  };
}

function getAIParty(factionId: string | number, star = 1): Omit<GameHero, 'id' | 'position' | 'isAlive' | 'attackTimer'>[] {
  let baseParty;
  
  if (typeof factionId === 'number') {
    // Legacy strategy index support
    baseParty = AI_PARTY_CONFIGS[factionId % AI_PARTY_CONFIGS.length];
  } else {
    // New Faction system
    const faction = AI_FACTIONS.find(f => f.id === factionId);
    if (faction) {
      baseParty = createRacialParty(faction.race);
    } else {
      baseParty = AI_PARTY_CONFIGS[0];
    }
  }
  
  return baseParty.map(h => scaleAIHero(h, star));
}

function getHeroPosition(role: string, index: number): { x: number; y: number } {
  const ySpacing = (FIELD_Y_MAX - FIELD_Y_MIN) / 6;
  const yBase = FIELD_Y_MIN + ySpacing * (index + 1);

  switch (role) {
    case 'tank': return { x: HERO_MAX_X - 30, y: FIELD_Y_CENTER };
    case 'melee_dps': return { x: HERO_MAX_X - 80, y: FIELD_Y_CENTER - 50 + index * 30 };
    case 'ranged_dps': return { x: HERO_MIN_X + 60, y: yBase };
    case 'healer': return { x: HERO_MIN_X + 30, y: FIELD_Y_CENTER + 30 };
    case 'cc': return { x: HERO_MIN_X + 80, y: FIELD_Y_CENTER - 60 };
    default: return { x: HERO_MIN_X + 50, y: yBase };
  }
}

export function createAIHeroes(factionId: string | number = 0, star = 1): GameHero[] {
  return getAIParty(factionId, star).map((h, i) => ({
    ...h,
    id: i + 100, // AI hero IDs start at 100 to avoid collision
    isAlive: true,
    attackTimer: 0,
    skillTimers: {},
    position: getHeroPosition(h.role, i),
  }));
}

// AI strategy i18n keys for UI display
export const AI_STRATEGY_KEYS = [
  'aiGame.strategies.orcBlaze',
  'aiGame.strategies.humanElite',
];

// Kept for backward-compat; prefer AI_STRATEGY_KEYS + t_i18n
export const AI_STRATEGY_NAMES = [
  'Orc Blaze (HP + ATK Synergy)',
  'Human Elite (ATK Synergy)',
];

export function getAIStrategyName(index: number): string {
  return AI_STRATEGY_NAMES[index % AI_STRATEGY_NAMES.length];
}

// AI difficulty modifier
export interface AIConfig {
  strategyIndex: number;
  difficulty: 'easy' | 'normal' | 'hard';
  maxWave: number;
}

export function createAIEngine(
  onStateChange: () => void,
  config: AIConfig,
): GameEngine {
  const options: GameOptions = {
    difficulty: config.difficulty,
    maxWave: config.maxWave,
  };
  // Return a standard engine - AI uses the same auto-battle logic
  // The "AI" aspect is in party composition and synergy optimization
  return new GameEngine(onStateChange, options);
}
