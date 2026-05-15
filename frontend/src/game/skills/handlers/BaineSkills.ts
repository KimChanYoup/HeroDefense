// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'baine_slam': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#15803d');
              return true;
            }
            
          
    }
    return false;
  },
  'baine_war_stomp': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 150;
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= radius);
            for (const m of inRange) {
              if (!m.immuneToCc) {
                m.isStunned = true;
                m.stunTimer = Math.max(m.stunTimer, 2.5);
              }
              engine.addDamageNumber(m.position.x, m.position.y - 15, 0, '#14532d');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#14532d', radius);
            return true;
            
          
    }
    return false;
  },
  'baine_avatar': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            hero.atk = Math.round(hero.atk * 1.5);
            hero.dmgReducePct = (hero.dmgReducePct ?? 0) + 0.20;
            hero.dmgReduceTimer = 15.0;
            setTimeout(() => { if (hero.isAlive) hero.atk = Math.round(hero.atk / 1.5); }, 15000);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#052e16' });
            return true;
            
          
    }
    return false;
  },
};
