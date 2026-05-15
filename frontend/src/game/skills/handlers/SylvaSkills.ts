// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'sylva_raptor_strike': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.5);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#854d0e');
              return true;
            }
            
          
    }
    return false;
  },
  'sylva_black_arrow': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              engine.applyHoT(target as any, -Math.round(hero.atk * 0.6), 10, 'monster' as any, '#1e1b4b');
              return true;
            }
            
          
    }
    return false;
  },
  'sylva_explosive_shot': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 100;
            const target = validTargets[0];
            if (target) {
              const inRange = validTargets.filter(m => engine.distance(target.position, m.position) <= radius);
              for (const m of inRange) {
                const dmg = Math.round(hero.atk * 4.0);
                m.hp -= dmg;
                engine.addMeterDamage(hero.id, skillId, dmg);
                engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#ea580c');
              }
              engine.spawnExplosion(target.position.x, target.position.y, '#ea580c', radius);
              return true;
            }
            
          
    }
    return false;
  },
};
