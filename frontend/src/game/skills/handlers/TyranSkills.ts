// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'tyran_chaos_strike': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.5);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#c026d3');
              if (Math.random() < 0.5) hero.attackTimer = 0; // 쿨타임 반환
              return true;
            }
            
          
    }
    return false;
  },
  'tyran_immolation_aura': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 80;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            for (const m of inRange) {
              engine.applyHoT(m as any, -Math.round(hero.atk * 0.5), 5, 'monster' as any, '#9333ea');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#9333ea', radius);
            return true;
            
          
    }
    return false;
  },
  'tyran_metamorphosis': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            hero.atk = Math.round(hero.atk * 1.4);
            hero.attackCooldown *= 0.7;
            hero.dmgReducePct = (hero.dmgReducePct ?? 0) + 0.20;
            hero.dmgReduceTimer = 15.0;
            setTimeout(() => {
              if (hero.isAlive) {
                hero.atk = Math.round(hero.atk / 1.4);
                hero.attackCooldown /= 0.7;
              }
            }, 15000);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#7e22ce' });
            return true;
            
          
    }
    return false;
  },
};
