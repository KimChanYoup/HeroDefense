// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'malfu_wrath': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#a855f7');
              return true;
            }
            
          
    }
    return false;
  },
  'malfu_moonfire': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 0.5);
              engine.applyHoT(target as any, -dmg, 8, 'monster' as any, '#9333ea');
              return true;
            }
            
          
    }
    return false;
  },
  'malfu_entangling_roots': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target && !target.immuneToCc) {
              target.isStunned = true; // 속박 대체
              target.stunTimer = Math.max(target.stunTimer, 4.0);
              engine.addDamageNumber(target.position.x, target.position.y - 20, 0, '#16a34a');
              return true;
            }
            
          
    }
    return false;
  },
  'malfu_starfall': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (let i = 0; i < 5; i++) {
              setTimeout(() => {
                if (!engine.state.phase.includes('playing')) return;
                const dmg = Math.round(hero.atk * 2.0);
                for (const m of engine.state.monsters.filter(m => m.isAlive)) {
                  m.hp -= dmg;
                  engine.addMeterDamage(hero.id, skillId, dmg);
                }
                engine.spawnExplosion(Math.random() * 800, Math.random() * 600, '#7e22ce', 200);
              }, i * 1000);
            }
            return true;
            
          
    }
    return false;
  },
};
