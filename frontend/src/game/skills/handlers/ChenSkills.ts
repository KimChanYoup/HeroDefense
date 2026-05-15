// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'chen_beer_waterfall': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 150;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            for (const m of inRange) {
              if (!m.immuneToCc) {
                m.isSlowed = true;
                m.slowTimer = Math.max(m.slowTimer, 10.0);
              }
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#60a5fa', radius);
            return true;
            
          
    }
    return false;
  },
  'chen_breath_of_fire': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 180;
            const inRange = validTargets.filter(m => m.position.x > hero.position.x && engine.distance(hero.position, m.position) <= radius);
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 3.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#f97316');
            }
            engine.spawnExplosion(hero.position.x + 80, hero.position.y, '#f97316', 100);
            return true;
            
          
    }
    return false;
  },
  'chen_stagger': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            hero.dmgReducePct = (hero.dmgReducePct ?? 0) + 0.50;
            hero.dmgReduceTimer = 8.0;
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#2563eb' });
            return true;
            
          
    }
    return false;
  },
  'chen_storm_earth_fire': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 200;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 4.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#1d4ed8');
            }
            hero.atk = Math.round(hero.atk * 1.5);
            hero.speed *= 1.5;
            setTimeout(() => {
              if (hero.isAlive) {
                hero.atk = Math.round(hero.atk / 1.5);
                hero.speed /= 1.5;
              }
            }, 15000);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#1d4ed8', radius);
            return true;
            
          
    }
    return false;
  },
  'chen_invoke_niuzao': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const shieldAmt = Math.round(hero.maxHp * 0.30);
            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.applyShield(h, shieldAmt, 'hero', 10, hero.id);
            }
            hero.dmgReducePct = (hero.dmgReducePct ?? 0) + 0.50;
            hero.dmgReduceTimer = 10.0;
            engine.spawnExplosion(hero.position.x, hero.position.y, '#1e3a5f', 300);
            return true;
            
          
    }
    return false;
  },
};
