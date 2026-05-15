import type { GameHero, GameMonster } from '../types';
import { HERO_SIZE, COLORS } from '../constants';

export const DEFAULT_HEROES: Omit<GameHero, 'id' | 'position'>[] = [
  {
    name: '아이언포지 수호자', role: 'tank', specName: '방어', className: '전사',
    raceName: '오크', elementName: '화염',
    maxHp: 800, hp: 800, atk: 30, def: 60, speed: 2, attackRange: 40, aggroRadius: 120,
    threatMult: 2.0,
    isAlive: true, attackCooldown: 1.2, attackTimer: 0, skillTimers: {}, color: COLORS.tank, size: HERO_SIZE + 4,
  },
  {
    name: '피의 광전사', role: 'melee_dps', specName: '분노', className: '전사',
    raceName: '오크', elementName: '화염',
    maxHp: 500, hp: 500, atk: 80, def: 25, speed: 4, attackRange: 40, aggroRadius: 0,
    threatMult: 1.0, battleRhythmCount: 0,
    isAlive: true, attackCooldown: 0.7, attackTimer: 0, skillTimers: {}, color: COLORS.melee_dps, size: HERO_SIZE,
  },
  {
    name: '스톰윈드 화염술사', role: 'ranged_dps', specName: '화염', className: '마법사',
    raceName: '인간', elementName: '화염',
    maxHp: 350, hp: 350, atk: 100, def: 10, speed: 3, attackRange: 1500, aggroRadius: 0,
    threatMult: 1.0,
    isAlive: true, attackCooldown: 1.5, attackTimer: 0, skillTimers: {}, color: COLORS.ranged_dps, size: HERO_SIZE,
  },
  {
    name: '달빛 냉기술사', role: 'cc', specName: '냉기', className: '마법사',
    raceName: '엘프', elementName: '냉기',
    maxHp: 370, hp: 370, atk: 60, def: 12, speed: 3, attackRange: 1500, aggroRadius: 0,
    threatMult: 1.0,
    isAlive: true, attackCooldown: 2.0, attackTimer: 0, skillTimers: {}, color: COLORS.cc, size: HERO_SIZE,
  },
  {
    name: '성당의 사제', role: 'healer', specName: '신성', className: '사제',
    raceName: '인간', elementName: '신성',
    maxHp: 400, hp: 400, atk: 20, def: 15, speed: 3, attackRange: 600, aggroRadius: 0,
    threatMult: 1.0,
    isAlive: true, attackCooldown: 1.8, attackTimer: 0, skillTimers: {}, color: COLORS.healer, size: HERO_SIZE,
  },
];

export const DIFFICULTY_SCALE = {
  easy: { hp: 0.7, atk: 0.7 },
  normal: { hp: 1.0, atk: 1.0 },
  hard: { hp: 1.5, atk: 1.4 },
};

export const monsterGoldMap: Record<string, number> = {
  boss: 500,
  elite: 150,
};

export const monsterScoreMap: Record<string, number> = {
  boss: 100,
  elite: 30,
};

// 0 <= scale <= 1
export function getMonsterGold(m: GameMonster, scale: number = 1): number {
  const basePoints = monsterGoldMap[m.monsterType] ?? 50;
  return basePoints * scale;
}

export function getMonsterScore(m: GameMonster, scale: number = 1): number {
  const baseScore = monsterScoreMap[m.monsterType] ?? 10;
  return baseScore * scale;
}

