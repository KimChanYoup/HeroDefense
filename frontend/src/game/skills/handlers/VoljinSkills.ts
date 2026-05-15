// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'voljin_shadow_strike': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 2.5);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#7c3aed');
              engine.applyHoT(target as any, -Math.round(hero.atk * 0.5), 5, 'monster' as any, '#6d28d9');
              return true;
            }
            
          
    }
    return false;
  },
  'voljin_hex': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target && !target.immuneToCc) {
              target.isStunned = true; // 무력화 대체
              target.stunTimer = Math.max(target.stunTimer, 4.0);
              engine.addDamageNumber(target.position.x, target.position.y - 20, 0, '#6d28d9');
              return true;
            }
            
          
    }
    return false;
  },
  'voljin_big_bad_voodoo': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              h.dmgReducePct = 1.0; // 무적
              h.dmgReduceTimer = 5.0;
              engine.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 0.5, color: '#4c1d95' });
            }
            return true;
            
          
    }
    return false;
  },
};
