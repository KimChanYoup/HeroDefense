import type { WaveConfig } from './types';

/**
 * 튜토리얼 전용 웨이브 데이터 (5웨이브)
 */
export function generateTutorialWave(waveNumber: number): WaveConfig {
  switch (waveNumber) {
    case 1:
      return {
        waveNumber: 1,
        monsters: [
          {
            type: 'normal',
            name: 'goblin', displayName: '고블린', displayNameKey: 'tutorial.monsters.goblin',
            hp: 70, atk: 16, def: 2, speed: 2.5, isRanged: false,
            color: '#6B7280', count: 3,
          },
        ],
      };
    case 2:
      return {
        waveNumber: 2,
        monsters: [
          {
            type: 'normal',
            name: 'goblin', displayName: '고블린', displayNameKey: 'tutorial.monsters.goblin',
            hp: 80, atk: 18, def: 2, speed: 2.5, isRanged: false,
            color: '#6B7280', count: 4,
          },
          {
            type: 'normal',
            name: 'skeleton', displayName: '해골 병사', displayNameKey: 'tutorial.monsters.skeleton',
            hp: 120, atk: 24, def: 8, speed: 2, isRanged: false,
            color: '#D1D5DB', count: 2,
          },
        ],
      };
    case 3:
      return {
        waveNumber: 3,
        monsters: [
          {
            type: 'normal',
            name: 'skeleton', displayName: '해골 병사', displayNameKey: 'tutorial.monsters.skeleton',
            hp: 140, atk: 26, def: 8, speed: 2, isRanged: false,
            color: '#D1D5DB', count: 3,
          },
          {
            type: 'normal',
            name: 'wolf', displayName: '늑대', displayNameKey: 'tutorial.monsters.wolf',
            hp: 90, atk: 32, def: 3, speed: 5, isRanged: false,
            color: '#92400E', count: 2,
          },
        ],
      };
    case 4:
      return {
        waveNumber: 4,
        monsters: [
          {
            type: 'normal',
            name: 'skeleton', displayName: '해골 병사', displayNameKey: 'tutorial.monsters.skeleton',
            hp: 160, atk: 28, def: 8, speed: 2, isRanged: false,
            color: '#D1D5DB', count: 2,
          },
          {
            type: 'elite',
            name: 'orc_grunt', displayName: '오크 돌격병', displayNameKey: 'tutorial.monsters.orc_grunt',
            hp: 400, atk: 44, def: 18, speed: 2, isRanged: false,
            color: '#059669', count: 1,
          },
        ],
      };
    case 5:
    default:
      return {
        waveNumber: 5,
        monsters: [
          {
            type: 'boss',
            name: 'dark_knight_commander',
            displayName: '암흑 기사단장',
            displayNameKey: 'tutorial.monsters.dark_knight_commander',
            hp: 1500,
            atk: 200,
            def: 60,
            speed: 2.2,
            isRanged: false,
            color: '#1a0530',
            count: 1,
            affix: 'enrage',
          },
        ],
      };
  }
}

export function generateTutorialStage2Wave(waveNumber: number): WaveConfig {
  switch (waveNumber) {
    case 1:
      return {
        waveNumber: 1,
        monsters: [
          { type: 'normal', name: 'goblin', displayName: '고블린', displayNameKey: 'tutorial.monsters.goblin',
            hp: 120, atk: 22, def: 4, speed: 2.5, isRanged: false, color: '#6B7280', count: 5 },
        ],
      };
    case 2:
      return {
        waveNumber: 2,
        monsters: [
          { type: 'normal', name: 'skeleton', displayName: '해골 병사', displayNameKey: 'tutorial.monsters.skeleton',
            hp: 180, atk: 30, def: 8, speed: 2.0, isRanged: false, color: '#D1D5DB', count: 4 },
          { type: 'normal', name: 'wolf', displayName: '늑대', displayNameKey: 'tutorial.monsters.wolf',
            hp: 140, atk: 38, def: 5, speed: 5.0, isRanged: false, color: '#92400E', count: 2 },
        ],
      };
    case 3:
      return {
        waveNumber: 3,
        monsters: [
          { type: 'normal', name: 'orc_grunt', displayName: '오크 돌격병', displayNameKey: 'tutorial.monsters.orc_grunt',
            hp: 350, atk: 40, def: 15, speed: 2.2, isRanged: false, color: '#059669', count: 3 },
          { type: 'normal', name: 'goblin_archer', displayName: '고블린 궁수', displayNameKey: 'tutorial.monsters.goblin_archer',
            hp: 120, atk: 34, def: 4, speed: 2.5, isRanged: true, color: '#84CC16', count: 3 },
        ],
      };
    case 4:
      return {
        waveNumber: 4,
        monsters: [
          { type: 'elite', name: 'dark_knight', displayName: '암흑 기사', displayNameKey: 'tutorial.monsters.dark_knight',
            hp: 600, atk: 52, def: 25, speed: 2.0, isRanged: false, color: '#4B0082', count: 2 },
          { type: 'normal', name: 'skeleton', displayName: '해골 병사', displayNameKey: 'tutorial.monsters.skeleton',
            hp: 200, atk: 30, def: 8, speed: 2.0, isRanged: false, color: '#D1D5DB', count: 3 },
        ],
      };
    case 5:
      return {
        waveNumber: 5,
        monsters: [
          {
            type: 'boss', name: 'dark_knight_commander', displayName: '암흑 기사단장', displayNameKey: 'tutorial.monsters.dark_knight_commander',
            hp: 3200, atk: 68, def: 40, speed: 2.2, isRanged: false,
            color: '#1a0530', count: 1, affix: 'enrage',
          },
        ],
      };
    case 6:
      return {
        waveNumber: 6,
        monsters: [
          { type: 'elite', name: 'orc_warchief', displayName: '오크 전쟁추장', displayNameKey: 'tutorial.monsters.orc_warchief',
            hp: 800, atk: 58, def: 28, speed: 2.0, isRanged: false, color: '#065F46', count: 2 },
          { type: 'normal', name: 'wolf', displayName: '들짐승', displayNameKey: 'tutorial.monsters.wild_beast',
            hp: 180, atk: 44, def: 6, speed: 5.5, isRanged: false, color: '#92400E', count: 3 },
        ],
      };
    case 7:
      return {
        waveNumber: 7,
        monsters: [
          { type: 'elite', name: 'skeleton_mage', displayName: '해골 마법사', displayNameKey: 'tutorial.monsters.skeleton_mage',
            hp: 450, atk: 70, def: 10, speed: 2.0, isRanged: true, color: '#818CF8', count: 3 },
          { type: 'normal', name: 'dark_knight', displayName: '암흑 기사', displayNameKey: 'tutorial.monsters.dark_knight',
            hp: 500, atk: 50, def: 22, speed: 2.0, isRanged: false, color: '#4B0082', count: 2 },
        ],
      };
    case 8:
      return {
        waveNumber: 8,
        monsters: [
          { type: 'elite', name: 'golem', displayName: '스톤 골렘', displayNameKey: 'tutorial.monsters.golem',
            hp: 1200, atk: 62, def: 40, speed: 1.5, isRanged: false, color: '#78716C', count: 2 },
          { type: 'normal', name: 'skeleton', displayName: '해골 병사', displayNameKey: 'tutorial.monsters.skeleton',
            hp: 220, atk: 32, def: 8, speed: 2.0, isRanged: false, color: '#D1D5DB', count: 4 },
        ],
      };
    case 9:
      return {
        waveNumber: 9,
        monsters: [
          { type: 'elite', name: 'dark_sorcerer', displayName: '암흑 마법사', displayNameKey: 'tutorial.monsters.dark_sorcerer',
            hp: 700, atk: 80, def: 12, speed: 2.0, isRanged: true, color: '#7C3AED', count: 2 },
          { type: 'elite', name: 'dark_knight', displayName: '암흑 기사', displayNameKey: 'tutorial.monsters.dark_knight',
            hp: 750, atk: 62, def: 28, speed: 2.0, isRanged: false, color: '#4B0082', count: 2 },
          { type: 'normal', name: 'goblin', displayName: '고블린', displayNameKey: 'tutorial.monsters.goblin',
            hp: 160, atk: 28, def: 4, speed: 3.0, isRanged: false, color: '#6B7280', count: 4 },
        ],
      };
    case 10:
    default:
      return {
        waveNumber: 10,
        monsters: [
          {
            type: 'boss', name: 'lich_king', displayName: '리치 왕', displayNameKey: 'tutorial.monsters.lich_king',
            hp: 5500, atk: 80, def: 40, speed: 1.8, isRanged: true,
            color: '#1E3A5F', count: 1, affix: 'aoe_slam',
          },
        ],
      };
  }
}

/**
 * 직업 튜토리얼: 탱커 편 (5웨이브) - 이동 속도 대폭 상향
 */
export function generateTankTutorialWave(waveNumber: number): WaveConfig {
  switch (waveNumber) {
    case 1:
      return {
        waveNumber: 1,
        monsters: [
          { type: 'normal', name: 'target_dummy_weak', displayName: '훈련용 몹 (약함)', displayNameKey: 'tutorial.monsters.target_dummy_weak',
            hp: 30, atk: 10, def: 0, speed: 4.5, isRanged: false, color: '#9CA3AF', count: 3 },
        ],
      };
    case 2:
      return {
        waveNumber: 2,
        monsters: [
          { type: 'normal', name: 'target_dummy', displayName: '훈련용 몹', displayNameKey: 'tutorial.monsters.target_dummy',
            hp: 80, atk: 20, def: 5, speed: 4.8, isRanged: false, color: '#6B7280', count: 5 },
        ],
      };
    case 3:
      return {
        waveNumber: 3,
        monsters: [
          { type: 'normal', name: 'target_dummy_fast', displayName: '날쌘 훈련용 몹', displayNameKey: 'tutorial.monsters.target_dummy_fast',
            hp: 60, atk: 15, def: 2, speed: 6.5, isRanged: false, color: '#4B5563', count: 6 },
        ],
      };
    case 4:
      return {
        waveNumber: 4,
        monsters: [
          { type: 'elite', name: 'tank_test_elite', displayName: '강인한 정예병', displayNameKey: 'tutorial.monsters.tank_test_elite',
            hp: 600, atk: 45, def: 30, speed: 4.0, isRanged: false, color: '#374151', count: 2 },
        ],
      };
    case 5:
    default:
      return {
        waveNumber: 5,
        monsters: [
          { type: 'boss', name: 'twin_boss_1', displayName: '쌍둥이 보스 A', displayNameKey: 'tutorial.monsters.twin_boss_a',
            hp: 1200, atk: 60, def: 40, speed: 4.2, isRanged: false, color: '#111827', count: 1, affix: 'aoe_slam' },
          { type: 'boss', name: 'twin_boss_2', displayName: '쌍둥이 보스 B', displayNameKey: 'tutorial.monsters.twin_boss_b',
            hp: 1200, atk: 60, def: 40, speed: 4.2, isRanged: false, color: '#111827', count: 1, affix: 'enrage' },
        ],
      };
  }
}

/**
 * 직업 튜토리얼: 근접 딜러 편 (5웨이브) - 이동 속도 대폭 상향
 */
export function generateMeleeTutorialWave(waveNumber: number): WaveConfig {
  switch (waveNumber) {
    case 1:
      return {
        waveNumber: 1,
        monsters: [
          { type: 'elite', name: 'high_hp_dummy', displayName: '단단한 훈련용 몹', displayNameKey: 'tutorial.monsters.high_hp_dummy',
            hp: 1500, atk: 5, def: 10, speed: 3.5, isRanged: false, color: '#4B5563', count: 1 },
        ],
      };
    case 2:
      return {
        waveNumber: 2,
        monsters: [
          { type: 'normal', name: 'swarm_dummy', displayName: '훈련용 몹 무리', displayNameKey: 'tutorial.monsters.swarm_dummy',
            hp: 80, atk: 10, def: 0, speed: 4.5, isRanged: false, color: '#9CA3AF', count: 8 },
        ],
      };
    case 3:
      return {
        waveNumber: 3,
        monsters: [
          { type: 'normal', name: 'ranged_dummy', displayName: '도망가는 궁수', displayNameKey: 'tutorial.monsters.ranged_dummy',
            hp: 150, atk: 15, def: 2, speed: 5.5, isRanged: true, color: '#84CC16', count: 4 },
        ],
      };
    case 4:
      return {
        waveNumber: 4,
        monsters: [
          { type: 'elite', name: 'aoe_stomper', displayName: '발구르기 숙련자', displayNameKey: 'tutorial.monsters.aoe_stomper',
            hp: 1200, atk: 30, def: 20, speed: 4.0, isRanged: false, color: '#1F2937', count: 1, affix: 'aoe_slam' },
        ],
      };
    case 5:
    default:
      return {
        waveNumber: 5,
        monsters: [
          { type: 'boss', name: 'world_eater', displayName: '거대 공포괴물', displayNameKey: 'tutorial.monsters.world_eater',
            hp: 8000, atk: 50, def: 35, speed: 4.2, isRanged: false, color: '#000000', count: 1, affix: 'enrage' },
        ],
      };
  }
}

/**
 * 직업 튜토리얼: 원거리 딜러 편 (5웨이브) - 이동 속도 대폭 상향
 */
export function generateRangedTutorialWave(waveNumber: number): WaveConfig {
  switch (waveNumber) {
    case 1:
      return {
        waveNumber: 1,
        monsters: [
          { type: 'normal', name: 'slow_dummy', displayName: '느릿한 골렘', displayNameKey: 'tutorial.monsters.slow_dummy',
            hp: 300, atk: 10, def: 5, speed: 3.0, isRanged: false, color: '#4B5563', count: 3 },
        ],
      };
    case 2:
      return {
        waveNumber: 2,
        monsters: [
          { type: 'normal', name: 'mass_dummy', displayName: '소환된 환영들', displayNameKey: 'tutorial.monsters.mass_dummy',
            hp: 100, atk: 5, def: 0, speed: 4.5, isRanged: false, color: '#9CA3AF', count: 12 },
        ],
      };
    case 3:
      return {
        waveNumber: 3,
        monsters: [
          { type: 'elite', name: 'tough_shield', displayName: '무거운 방패병', displayNameKey: 'tutorial.monsters.tough_shield',
            hp: 2000, atk: 20, def: 40, speed: 3.5, isRanged: false, color: '#1F2937', count: 1 },
        ],
      };
    case 4:
      return {
        waveNumber: 4,
        monsters: [
          { type: 'normal', name: 'ranged_enemy', displayName: '적군 마법사', displayNameKey: 'tutorial.monsters.ranged_enemy',
            hp: 250, atk: 30, def: 10, speed: 5.0, isRanged: true, color: '#7C3AED', count: 5 },
        ],
      };
    case 5:
    default:
      return {
        waveNumber: 5,
        monsters: [
          { type: 'boss', name: 'ancient_behemoth', displayName: '고대 베헤모스', displayNameKey: 'tutorial.monsters.ancient_behemoth',
            hp: 6000, atk: 100, def: 50, speed: 4.0, isRanged: false, color: '#000000', count: 1, affix: 'aoe_slam' },
        ],
      };
  }
}

/**
 * 직업 튜토리얼: 힐러 편 (5웨이브) - 공격력 3배 & 속도 상향
 */
export function generateHealerTutorialWave(waveNumber: number): WaveConfig {
  switch (waveNumber) {
    case 1:
      return {
        waveNumber: 1,
        monsters: [
          { type: 'normal', name: 'healer_test_1', displayName: '공격적인 훈련병', displayNameKey: 'tutorial.monsters.healer_test_1',
            hp: 400, atk: 75, def: 5, speed: 4.0, isRanged: false, color: '#6B7280', count: 3 },
        ],
      };
    case 2:
      return {
        waveNumber: 2,
        monsters: [
          { type: 'normal', name: 'healer_test_2', displayName: '강력한 타격병', displayNameKey: 'tutorial.monsters.healer_test_2',
            hp: 500, atk: 135, def: 10, speed: 4.2, isRanged: false, color: '#4B5563', count: 4 },
        ],
      };
    case 3:
      return {
        waveNumber: 3,
        monsters: [
          { type: 'normal', name: 'healer_test_3', displayName: '그림자 살수', displayNameKey: 'tutorial.monsters.healer_test_3',
            hp: 300, atk: 105, def: 2, speed: 6.0, isRanged: false, color: '#1F2937', count: 6 },
        ],
      };
    case 4:
      return {
        waveNumber: 4,
        monsters: [
          { type: 'elite', name: 'healer_test_elite', displayName: '학살자 정예병', displayNameKey: 'tutorial.monsters.healer_test_elite',
            hp: 1500, atk: 240, def: 30, speed: 4.5, isRanged: false, color: '#000000', count: 2 },
        ],
      };
    case 5:
    default:
      return {
        waveNumber: 5,
        monsters: [
          { type: 'boss', name: 'aoe_destroyer', displayName: '파괴의 심판자', displayNameKey: 'tutorial.monsters.aoe_destroyer',
            hp: 5000, atk: 360, def: 40, speed: 4.8, isRanged: false, color: '#991B1B', count: 1, affix: 'aoe_slam' },
        ],
      };
  }
}

/**
 * 직업 튜토리얼: 군중 제어(CC) 편 (5웨이브)
 */
export function generateCCTutorialWave(waveNumber: number): WaveConfig {
  switch (waveNumber) {
    case 1:
      return {
        waveNumber: 1,
        monsters: [
          { type: 'normal', name: 'goblin_sapper', displayName: '고블린 자폭병', displayNameKey: 'tutorial.monsters.goblin_sapper',
            hp: 1500, atk: 0, def: 10, speed: 3.5, isRanged: false, color: '#F97316', count: 3,
            isSuicideBomber: true },
        ],
      };
    case 2:
      return {
        waveNumber: 2,
        monsters: [
          { type: 'normal', name: 'goblin_sapper', displayName: '고블린 자폭병', displayNameKey: 'tutorial.monsters.goblin_sapper',
            hp: 1200, atk: 0, def: 5, speed: 4.0, isRanged: false, color: '#F97316', count: 5,
            isSuicideBomber: true },
        ],
      };
    case 3:
      return {
        waveNumber: 3,
        monsters: [
          { type: 'normal', name: 'goblin_sapper', displayName: '정예 자폭병', displayNameKey: 'tutorial.monsters.elite_sapper',
            hp: 2500, atk: 0, def: 20, speed: 3.0, isRanged: false, color: '#EA580C', count: 2,
            isSuicideBomber: true },
          { type: 'normal', name: 'goblin_sapper', displayName: '쾌속 자폭병', displayNameKey: 'tutorial.monsters.swift_sapper',
            hp: 800, atk: 0, def: 0, speed: 6.0, isRanged: false, color: '#FB923C', count: 4,
            isSuicideBomber: true },
        ],
      };
    case 4:
      return {
        waveNumber: 4,
        monsters: [
          { type: 'elite', name: 'goblin_sapper', displayName: '폭탄 수레', displayNameKey: 'tutorial.monsters.bomb_cart',
            hp: 5000, atk: 0, def: 30, speed: 2.2, isRanged: false, color: '#C2410C', count: 2,
            isSuicideBomber: true },
        ],
      };
    case 5:
    default:
      return {
        waveNumber: 5,
        monsters: [
          { type: 'boss', name: 'sapper_commander', displayName: '자폭 지휘관', displayNameKey: 'tutorial.monsters.sapper_commander',
            hp: 8000, atk: 50, def: 40, speed: 2.0, isRanged: false, color: '#7C2D12', count: 1,
            affix: 'enrage', isSuicideBomber: true },
          { type: 'normal', name: 'goblin_sapper', displayName: '호위 자폭병', displayNameKey: 'tutorial.monsters.goblin_sapper_escort',
            hp: 1000, atk: 0, def: 10, speed: 4.5, isRanged: false, color: '#F97316', count: 4,
            isSuicideBomber: true },
        ],
      };
  }
}

/**
 * 직업 튜토리얼: 메카닉 편 (5웨이브)
 * - 포탑 ATK ≈ 264 (hero.atk 88 × 3), 쿨다운 1.5초
 * - Wave 1: 느린 기본 적 → 포탑 화력 소개
 * - Wave 2: 벽 집중 공격형 → 벽 자동 수리 체험
 * - Wave 3: 빠른 소규모 무리 → 포탑 광역 활약
 * - Wave 4: 포탑 직접 노리는 정예 → 포탑 수리 체험
 * - Wave 5: 보스 + 파괴병 → 모든 메커니즘 총동원
 */
export function generateMechanicTutorialWave(waveNumber: number): WaveConfig {
  switch (waveNumber) {
    case 1:
      return {
        waveNumber: 1,
        monsters: [
          { type: 'normal', name: 'mech_test_1', displayName: '기갑 보병', displayNameKey: 'tutorial.monsters.mech_infantry',
            hp: 600, atk: 20, def: 10, speed: 3.0, isRanged: false, color: '#6B7280', count: 4 },
        ],
      };
    case 2:
      return {
        waveNumber: 2,
        monsters: [
          { type: 'normal', name: 'wall_basher', displayName: '벽 파괴병', displayNameKey: 'tutorial.monsters.wall_basher',
            hp: 800, atk: 120, def: 8, speed: 3.8, isRanged: false, color: '#DC2626', count: 4 },
        ],
      };
    case 3:
      return {
        waveNumber: 3,
        monsters: [
          { type: 'normal', name: 'mech_swarm', displayName: '고블린 돌격대', displayNameKey: 'tutorial.monsters.goblin_squad',
            hp: 200, atk: 15, def: 0, speed: 5.5, isRanged: false, color: '#6B7280', count: 14 },
        ],
      };
    case 4:
      return {
        waveNumber: 4,
        monsters: [
          { type: 'elite', name: 'mech_elite', displayName: '포탑 사냥꾼', displayNameKey: 'tutorial.monsters.turret_hunter',
            hp: 2000, atk: 80, def: 30, speed: 3.5, isRanged: false, color: '#374151', count: 2 },
          { type: 'normal', name: 'wall_basher', displayName: '벽 파괴병', displayNameKey: 'tutorial.monsters.wall_basher',
            hp: 700, atk: 100, def: 8, speed: 4.0, isRanged: false, color: '#DC2626', count: 3 },
        ],
      };
    case 5:
    default:
      return {
        waveNumber: 5,
        monsters: [
          { type: 'boss', name: 'iron_juggernaut', displayName: '철의 파괴자', displayNameKey: 'tutorial.monsters.iron_juggernaut',
            hp: 12000, atk: 150, def: 50, speed: 2.8, isRanged: false, color: '#1F2937', count: 1, affix: 'aoe_slam' },
          { type: 'normal', name: 'wall_basher', displayName: '호위 파괴병', displayNameKey: 'tutorial.monsters.wall_basher_escort',
            hp: 800, atk: 100, def: 10, speed: 4.0, isRanged: false, color: '#DC2626', count: 3 },
        ],
      };
  }
}
