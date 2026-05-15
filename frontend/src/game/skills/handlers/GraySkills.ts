// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'gray_bloodthirst': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 2.5);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#f87171');
              const healAmt = Math.round(dmg * 0.30);
              hero.hp = Math.min(hero.maxHp, hero.hp + healAmt);
              engine.addDamageNumber(hero.position.x, hero.position.y - 20, healAmt, '#22c55e', true);
              return true;
            }
            
          
    }
    return false;
  },
  'gray_rampage': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              for (let i = 0; i < 4; i++) {
                const dmg = Math.round(hero.atk * 1.5);
                target.hp -= dmg;
                engine.addMeterDamage(hero.id, skillId, dmg);
                engine.addDamageNumber(target.position.x + i * 6, target.position.y - 20, dmg, '#ef4444');
              }
              return true;
            }
            
          
    }
    return false;
  },
  'gray_recklessness': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 치명타 100% (임의로 공격력 강화로 대체)
            hero.atk = Math.round(hero.atk * 1.5);
            setTimeout(() => { if (hero.isAlive) hero.atk = Math.round(hero.atk / 1.5); }, 8000);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#b91c1c' });
            return true;
            
          
    }
    return false;
  },
};
