// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'jainaro_arcane_missiles': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              for (let i = 0; i < 3; i++) {
                const dmg = Math.round(hero.atk * 1.5);
                target.hp -= dmg;
                engine.addMeterDamage(hero.id, skillId, dmg);
                engine.addDamageNumber(target.position.x + i * 5, target.position.y - 20, dmg, '#c026d3');
              }
              return true;
            }
            
          
    }
    return false;
  },
  'jainaro_polymorph': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target && !target.immuneToCc) {
              target.isStunned = true; // 변이 대체
              target.stunTimer = Math.max(target.stunTimer, 5.0);
              engine.addDamageNumber(target.position.x, target.position.y - 20, 0, '#9333ea');
              return true;
            }
            
          
    }
    return false;
  },
  'jainaro_arcane_power': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            hero.atk = Math.round(hero.atk * 1.5);
            setTimeout(() => { if (hero.isAlive) hero.atk = Math.round(hero.atk / 1.5); }, 12000);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#7e22ce' });
            return true;
            
          
    }
    return false;
  },
};
