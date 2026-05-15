// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'bp_blood_slash': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 10.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '자신 HP 10% 소모, ATK×10 혈화 피해'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '자신 HP 10% 소모, ATK×10 혈화 피해'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'bp_crimson_thirst': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '15초간 모든 피해 100% 흡혈 + 공속 2배'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '15초간 모든 피해 100% 흡혈 + 공속 2배'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'bp_flame_blade_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 8.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '전방 직선 모든 적 ATK×8 화염 피해'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '전방 직선 모든 적 ATK×8 화염 피해'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
  'bp_blood_boil': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 5.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '모든 적에게 지속 출혈 피해 및 50% 슬로우'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '모든 적에게 지속 출혈 피해 및 50% 슬로우'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
  'bp_blood_lord': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '혈액 변신: 20초간 무적 + 흡혈 + 공격력 3배'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '혈액 변신: 20초간 무적 + 흡혈 + 공격력 3배'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'bp_vampiric_bite': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 12.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '단일 ATK×12 피해 및 HP 30% 회복'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '단일 ATK×12 피해 및 HP 30% 회복'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'bp_swarming_bats': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.spawnExplosion(hero.position.x, hero.position.y, '#f59e0b', 100);
            return true;
            
          
    }
    return false;
  },
  'bp_essence_drain': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '적 3명에게 빨대를 꽂아 HP를 지속적으로 갈취'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '적 3명에게 빨대를 꽂아 HP를 지속적으로 갈취'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'bp_mist_form': (ctx) => {
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
              if (!m.immuneToCc && '10초간 모든 공격 회피 및 주변 적 지속 피해'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 2.0); }
            }
            engine.spawnExplosion(center.x, center.y, hero.color, radius);
            return true;
            
          
    }
    return false;
  },
  'bp_night_ritual': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 20.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '전장 전체 적 구속 및 ATK×20 암흑 피해'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '전장 전체 적 구속 및 ATK×20 암흑 피해'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
};
