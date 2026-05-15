// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'arthur_knights_oath': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 150;
            const allies = engine.state.heroes.filter(h => h.isAlive && engine.distance(hero.position, h.position) <= radius);
            for (const a of allies) {
              a.def += 15;
              setTimeout(() => { if (a.isAlive) a.def -= 15; }, 10000);
              engine.state.healingFlashes.push({ x: a.position.x, y: a.position.y, timer: 0.5, color: 'rgba(96, 165, 250, 0.3)' });
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#60a5fa', radius);
            return true;
            
          
    }
    return false;
  },
  'arthur_shield_slam': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#2563eb');
              target.position.x += 30; // 넉백
              engine.spawnExplosion(target.position.x, target.position.y, '#2563eb', 40);
              return true;
            }
            
          
    }
    return false;
  },
  'arthur_last_stand': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const hpBonus = Math.round(hero.maxHp * 0.30);
            hero.maxHp += hpBonus;
            hero.hp += hpBonus;
            engine.addDamageNumber(hero.position.x, hero.position.y - 30, hpBonus, '#1d4ed8', true);
            setTimeout(() => {
              if (hero.isAlive) {
                hero.maxHp -= hpBonus;
                hero.hp = Math.min(hero.hp, hero.maxHp);
              }
            }, 20000);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#1d4ed8' });
            return true;
            
          
    }
    return false;
  },
  'arthur_shield_wall': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const shieldAmt = Math.round(hero.maxHp * 0.20);
            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.applyShield(h, shieldAmt, 'hero', 10, hero.id);
            }
            hero.def += 50;
            setTimeout(() => { if (hero.isAlive) hero.def -= 50; }, 10000);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#1e3a8a', 250);
            return true;
            
          
    }
    return false;
  },
};
