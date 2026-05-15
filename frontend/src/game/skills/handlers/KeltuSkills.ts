// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'keltu_frostbolt': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#38bdf8');
              if (!target.immuneToCc) {
                target.isSlowed = true;
                target.slowTimer = Math.max(target.slowTimer, 3.0);
              }
              return true;
            }
            
          
    }
    return false;
  },
  'keltu_cone_of_cold': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 150;
            const inRange = validTargets.filter(m => m.position.x > hero.position.x && engine.distance(hero.position, m.position) <= radius);
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 2.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#0284c7');
              if (!m.immuneToCc) {
                m.isSlowed = true;
                m.slowTimer = Math.max(m.slowTimer, 5.0);
              }
            }
            engine.spawnExplosion(hero.position.x + 70, hero.position.y, '#0284c7', 100);
            return true;
            
          
    }
    return false;
  },
};
