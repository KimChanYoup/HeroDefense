// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'larisian_consume': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#dc2626');
              const healAmt = Math.round(dmg * 0.30);
              hero.hp = Math.min(hero.maxHp, hero.hp + healAmt);
              engine.addDamageNumber(hero.position.x, hero.position.y - 20, healAmt, '#22c55e', true);
              return true;
            }
            
          
    }
    return false;
  },
  'larisian_soul_rend': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const stealAmt = Math.round(target.hp * 0.15);
              target.hp -= stealAmt;
              engine.addMeterDamage(hero.id, skillId, stealAmt);
              engine.addDamageNumber(target.position.x, target.position.y - 20, stealAmt, '#7f1d1d');
              hero.hp = Math.min(hero.maxHp, hero.hp + stealAmt);
              engine.addDamageNumber(hero.position.x, hero.position.y - 20, stealAmt, '#22c55e', true);
              return true;
            }
            
          
    }
    return false;
  },
  'larisian_immolation_aura': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 80;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            for (const m of inRange) {
              engine.applyHoT(m as any, -Math.round(hero.atk * 1.0), 5, 'monster' as any, '#991b1b');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#991b1b', radius);
            return true;
            
          
    }
    return false;
  },
  'larisian_massacre': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const lowHp = validTargets.filter(m => m.hp / m.maxHp <= 0.30);
            const target = lowHp[0] || validTargets[0];
            if (target) {
              if (target.hp / target.maxHp <= 0.30 && target.monsterType !== 'boss') {
                const dmg = target.hp;
                target.hp = 0;
                engine.addMeterDamage(hero.id, skillId, dmg);
                engine.addDamageNumber(target.position.x, target.position.y - 30, 9999, '#450a0a');
                // 쿨초기화
                if (hero.skillTimers) {
                  for (const k in hero.skillTimers) {
                    if (k.startsWith('liasian_') || k.startsWith('larisian_')) hero.skillTimers[k] = 0;
                  }
                }
              } else {
                const dmg = Math.round(hero.atk * 5.0);
                target.hp -= dmg;
                engine.addMeterDamage(hero.id, skillId, dmg);
                engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#450a0a');
              }
              return true;
            }
            
          
    }
    return false;
  },
};
