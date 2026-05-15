// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'yrel_light_protection': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const targets = engine.state.heroes.filter(h => h.isAlive).sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (targets[0]) {
              engine.applyShield(targets[0], Math.round(targets[0].maxHp * 0.15), 'hero', 5, hero.id);
              return true;
            }
            
          
    }
    return false;
  },
  'yrel_hammer_of_righteous': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 120;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 2.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#fbbf24');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#fbbf24', radius);
            return true;
            
          
    }
    return false;
  },
  'yrel_guardian_of_kings': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              h.dmgReducePct = (h.dmgReducePct ?? 0) + 0.15;
              h.dmgReduceTimer = 10.0;
              engine.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 0.5, color: 'rgba(180, 83, 9, 0.3)' });
            }
            return true;
            
          
    }
    return false;
  },
  'yrel_divine_storm': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 200;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            let totalDmg = 0;
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 4.0);
              m.hp -= dmg;
              totalDmg += dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#78350f');
            }
            const healAmt = Math.round(totalDmg * 0.5 * healMult);
            engine.applyDirectHeal(hero, hero, healAmt, 'hero', '#fbbf24');
            engine.spawnExplosion(hero.position.x, hero.position.y, '#78350f', radius);
            return true;
            
          
    }
    return false;
  },
};
