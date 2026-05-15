// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'anub_iron_carapace': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            hero.dmgReducePct = (hero.dmgReducePct ?? 0) + 0.25;
            hero.dmgReduceTimer = 25.0;
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#166534' });
            return true;
            
          
    }
    return false;
  },
  'anub_impale': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#16a34a');
              if (!target.immuneToCc) {
                target.isStunned = true;
                target.stunTimer = Math.max(target.stunTimer, 2.0);
              }
              engine.spawnExplosion(target.position.x, target.position.y, '#16a34a', 60);
              return true;
            }
            
          
    }
    return false;
  },
  'anub_carrion_beetles': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 150;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            const dmg = Math.round(hero.atk * 0.5);
            for (const m of inRange) {
              engine.applyHoT(m as any, -dmg, 5, 'monster' as any, '#15803d');
            }
            const healAmt = Math.round(hero.maxHp * 0.10);
            engine.applyDirectHeal(hero, hero, healAmt, 'hero', '#22c55e');
            engine.spawnExplosion(hero.position.x, hero.position.y, '#15803d', radius);
            return true;
            
          
    }
    return false;
  },
  'anub_locust_swarm': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 200;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            let totalDmg = 0;
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 3.0);
              m.hp -= dmg;
              totalDmg += dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#14532d');
            }
            if (totalDmg > 0) {
              engine.applyDirectHeal(hero, hero, totalDmg, 'hero', '#14532d');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#14532d', radius);
            return true;
            
          
    }
    return false;
  },
  'anub_underground_assault': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 250;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 5.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 30, dmg, '#052e16');
              if (!m.immuneToCc) {
                m.isStunned = true;
                m.stunTimer = Math.max(m.stunTimer, 3.0);
              }
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#052e16', radius);
            return true;
            
          
    }
    return false;
  },
};
