// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'pdh_ancient_breath_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 10.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '5속성 복합 브레스: 전방 모든 적 ATK×10 피해'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '5속성 복합 브레스: 전방 모든 적 ATK×10 피해'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
  'pdh_ancient_summon_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.spawnExplosion(hero.position.x, hero.position.y, '#f59e0b', 100);
            return true;
            
          
    }
    return false;
  },
  'pdh_primordial_flame_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 15.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '전장 전체 ATK×15 복합 속성 피해'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '전장 전체 ATK×15 복합 속성 피해'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
  'pdh_dragon_form': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 패시브
            return false;
            
          
    }
    return false;
  },
  'pdh_great_awakening_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '30초간 모든 능력 5배 + 무적 + 전장 초토화'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '30초간 모든 능력 5배 + 무적 + 전장 초토화'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'pdh_time_stop': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 5.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '모든 적 5초간 완전 정지'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '모든 적 5초간 완전 정지'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
  'pdh_nature_binding': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '적 전체 8초간 속박 및 독 피해'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '적 전체 8초간 속박 및 독 피해'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'pdh_frost_prison': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '가장 강한 적 3명을 10초간 빙결'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '가장 강한 적 3명을 10초간 빙결'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'pdh_arcane_surge': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 5.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '모든 적 침묵 8초 및 스킬 쿨타임 증가'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '모든 적 침묵 8초 및 스킬 쿨타임 증가'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
  'pdh_aspect_union': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 5.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '다섯 위상의 힘을 하나로: 전장 모든 적 즉사 확률 50%'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '다섯 위상의 힘을 하나로: 전장 모든 적 즉사 확률 50%'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
};
