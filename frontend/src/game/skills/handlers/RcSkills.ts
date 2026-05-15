// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'rc_knights_oath_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.applyShield(h, Math.round(hero.maxHp * 0.3), 'hero', 10, hero.id);
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#3b82f6', 200);
            return true;
            
          
    }
    return false;
  },
  'rc_royal_shield_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 1.0, color: '#f59e0b' });
            }
            return true;
            
          
    }
    return false;
  },
  'rc_rally_horn_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 1.0, color: '#f59e0b' });
            }
            return true;
            
          
    }
    return false;
  },
  'rc_holy_charge': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 6.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '적진을 돌파하여 모든 적 3초 기절 + ATK×6 피해'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '적진을 돌파하여 모든 적 3초 기절 + ATK×6 피해'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
  'rc_paladin_fury_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 150;
            const center = validTargets[0]?.position || hero.position;
            const inRange = validTargets.filter(m => engine.distance(center, m.position) <= radius);
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 4.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '15초간 무적 + ATK 5배 + 모든 공격 광역화'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 2.0); }
            }
            engine.spawnExplosion(center.x, center.y, hero.color, radius);
            return true;
            
          
    }
    return false;
  },
  'rc_duel_challenge': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '가장 강한 적 1명과 1:1 결투 (적 약화, 자신 강화)'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '가장 강한 적 1명과 1:1 결투 (적 약화, 자신 강화)'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'rc_sword_of_light': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 12.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '단일 ATK×12 신성 피해 + 5초간 침묵'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '단일 ATK×12 신성 피해 + 5초간 침묵'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'rc_victory_shout': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 1.0, color: '#f59e0b' });
            }
            return true;
            
          
    }
    return false;
  },
  'rc_divine_storm_rc': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const radius = 150;
            const center = validTargets[0]?.position || hero.position;
            const inRange = validTargets.filter(m => engine.distance(center, m.position) <= radius);
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 8.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '주변 광역 ATK×8 피해 및 아군 힐'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 2.0); }
            }
            engine.spawnExplosion(center.x, center.y, hero.color, radius);
            return true;
            
          
    }
    return false;
  },
  'rc_kings_justice': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 20.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '모든 적 즉시 HP 30% 감소 (보스 ATK×20)'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '모든 적 즉시 HP 30% 감소 (보스 ATK×20)'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
};
