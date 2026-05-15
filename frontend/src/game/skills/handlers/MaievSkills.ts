// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'maiev_backstab': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#7c3aed');
              return true;
            }
            
          
    }
    return false;
  },
  'maiev_shadowstep': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets.sort((a, b) => b.hp - a.hp)[0];
            if (target) {
              hero.position = { x: target.position.x - 20, y: target.position.y };
              const dmg = Math.round(hero.atk * 3.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#6d28d9');
              return true;
            }
            
          
    }
    return false;
  },
  'maiev_shadow_dance': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            hero.attackCooldown *= 0.5;
            setTimeout(() => { if (hero.isAlive) hero.attackCooldown /= 0.5; }, 5000);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#4c1d95' });
            return true;
            
          
    }
    return false;
  },
};
