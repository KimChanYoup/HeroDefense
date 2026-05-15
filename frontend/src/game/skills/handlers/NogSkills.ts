// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'nog_poison_knife': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 2.5);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#bef264');
              engine.applyHoT(target as any, -Math.round(hero.atk * 0.4), 5, 'monster' as any, '#84cc16');
              return true;
            }
            
          
    }
    return false;
  },
  'nog_mutilate': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              for (let i = 0; i < 2; i++) {
                const dmg = Math.round(hero.atk * 2.0);
                target.hp -= dmg;
                engine.addMeterDamage(hero.id, skillId, dmg);
                engine.addDamageNumber(target.position.x + i * 8, target.position.y - 20, dmg, '#a3e635');
              }
              return true;
            }
            
          
    }
    return false;
  },
  'nog_vendetta': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              // 피해 증폭 (디버프 미구현이므로 데미지로 대체 또는 생략)
              const dmg = Math.round(hero.atk * 3.0);
              target.hp -= dmg;
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#65a30d');
              return true;
            }
            
          
    }
    return false;
  },
  'nog_poison_bomb': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 120;
            const target = validTargets[0];
            if (target) {
              const inRange = validTargets.filter(m => engine.distance(target.position, m.position) <= radius);
              for (const m of inRange) {
                engine.applyHoT(m as any, -Math.round(hero.atk * 0.6), 6, 'monster' as any, '#3f6212');
              }
              engine.spawnExplosion(target.position.x, target.position.y, '#3f6212', radius);
              return true;
            }
            
          
    }
    return false;
  },
};
