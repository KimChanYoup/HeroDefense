// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'magatha_lava_burst': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 6.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 30, dmg, '#f87171', true);
              return true;
            }
            
          
    }
    return false;
  },
  'magatha_flame_shock': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 0.7);
              engine.applyHoT(target as any, -dmg, 12, 'monster' as any, '#dc2626');
              return true;
            }
            
          
    }
    return false;
  },
  'magatha_ascendance': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            hero.atk = Math.round(hero.atk * 1.5);
            setTimeout(() => { if (hero.isAlive) hero.atk = Math.round(hero.atk / 1.5); }, 15000);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#991b1b' });
            return true;
            
          
    }
    return false;
  },
};
