// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'gazro_deth_lazor': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              // 채널링 대신 3연타
              for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                  if (target.isAlive) {
                    const dmg = Math.round(hero.atk * 1.5);
                    target.hp -= dmg;
                    engine.addMeterDamage(hero.id, skillId, dmg);
                    engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#f87171');
                  }
                }, i * 500);
              }
              return true;
            }
            
          
    }
    return false;
  },
  'gazro_xplodium_charge': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#ef4444');
              if (!target.immuneToCc) {
                target.isStunned = true;
                target.stunTimer = Math.max(target.stunTimer, 2.0);
              }
              engine.spawnExplosion(target.position.x, target.position.y, '#ef4444', 60);
              return true;
            }
            
          
    }
    return false;
  },
  'gazro_grav_o_bomb_3000': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const center = validTargets[0]?.position || hero.position;
            const radius = 200;
            const inRange = validTargets.filter(m => engine.distance(center, m.position) <= radius);
            for (const m of inRange) {
              m.position.x = center.x;
              m.position.y = center.y;
              const dmg = Math.round(hero.atk * 5.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 30, dmg, '#b91c1c');
            }
            engine.spawnExplosion(center.x, center.y, '#b91c1c', radius);
            return true;
            
          
    }
    return false;
  },
};
