// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'ap_miracle_heal': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '모든 아군 즉시 HP 50% 회복'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '모든 아군 즉시 HP 50% 회복'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'ap_divine_hymn': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.applyDirectHeal(hero, h, Math.round(hero.atk * 3.0), 'hero', '#22c55e');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#22c55e', 200);
            return true;
            
          
    }
    return false;
  },
  'ap_resurrection_light': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '사망 아군 전원 HP 100% 즉시 부활 (판당 1회)'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '사망 아군 전원 HP 100% 즉시 부활 (판당 1회)'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'ap_guardian_spirit': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '가장 낮은 HP 아군을 10초간 무적으로 만듬'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '가장 낮은 HP 아군을 10초간 무적으로 만듬'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'ap_salvation': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.applyDirectHeal(hero, h, Math.round(hero.atk * 3.0), 'hero', '#22c55e');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#22c55e', 200);
            return true;
            
          
    }
    return false;
  },
  'ap_shadow_word_pain': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '강력한 암흑 DoT 및 5초간 받는 피해 30% 증가'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '강력한 암흑 DoT 및 5초간 받는 피해 30% 증가'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'ap_mind_blast': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 10.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '단일 ATK×10 암흑 피해 + 쿨타임 초기화 확률'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '단일 ATK×10 암흑 피해 + 쿨타임 초기화 확률'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'ap_vampiric_touch': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 패시브
            return false;
            
          
    }
    return false;
  },
  'ap_void_eruption': (ctx) => {
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
              if (!m.immuneToCc && '타겟 주변 광역 ATK×8 암흑 피해'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 2.0); }
            }
            engine.spawnExplosion(center.x, center.y, hero.color, radius);
            return true;
            
          
    }
    return false;
  },
  'ap_dark_ascension': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '20초간 공격력 3배 및 모든 공격이 3개로 분산'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '20초간 공격력 3배 및 모든 공격이 3개로 분산'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
};
