// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'tutan_garrote': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 2.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#84cc16');
              engine.applyHoT(target as any, -Math.round(hero.atk * 0.4), 8, 'monster' as any, '#dc2626');
              return true;
            }
            
          
    }
    return false;
  },
  'tutan_rupture': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              engine.applyHoT(target as any, -Math.round(hero.atk * 0.6), 10, 'monster' as any, '#166534');
              return true;
            }
            
          
    }
    return false;
  },
  'tutan_envenom': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              // 독 DoT 즉시 폭발 (임의로 ATK×4)
              const dmg = Math.round(hero.atk * 4.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#166534');
              engine.spawnExplosion(target.position.x, target.position.y, '#166534', 60);
              return true;
            }
            
          
    }
    return false;
  },
  'tutan_venom_burst': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 150;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 5.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#166534');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#166534', radius);
            return true;
            
          
    }
    return false;
  },
};
