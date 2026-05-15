// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'aeina_mind_flay': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              for (let i = 0; i < 3; i++) {
                const dmg = Math.round(hero.atk * 1.0);
                target.hp -= dmg;
                engine.addMeterDamage(hero.id, skillId, dmg);
                engine.addDamageNumber(target.position.x + i * 5, target.position.y - 20, dmg, '#3730a3');
              }
              if (!target.immuneToCc) {
                target.isSlowed = true;
                target.slowTimer = Math.max(target.slowTimer, 3.0);
              }
              return true;
            }
            
          
    }
    return false;
  },
  'aeina_mind_blast': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#4338ca');
              return true;
            }
            
          
    }
    return false;
  },
  'aeina_devouring_plague': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 0.8);
              engine.applyHoT(target as any, -dmg, 6, 'monster' as any, '#312e81');
              // 흡혈 효과 (틱마다 회복은 복잡하므로 즉시 소량 회복)
              hero.hp = Math.min(hero.maxHp, hero.hp + Math.round(hero.atk * 2.0));
              return true;
            }
            
          
    }
    return false;
  },
  'aeina_void_form': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            hero.atk = Math.round(hero.atk * 1.3);
            setTimeout(() => { if (hero.isAlive) hero.atk = Math.round(hero.atk / 1.3); }, 15000);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#1e1b4b' });
            return true;
            
          
    }
    return false;
  },
};
