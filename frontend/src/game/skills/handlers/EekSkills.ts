// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'eek_eternal_arrow_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 10.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '전장 전체 관통하는 비전 화살 ATK×10'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '전장 전체 관통하는 비전 화살 ATK×10'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
  'eek_elf_essence_lr': (ctx) => {
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
  'eek_starfall_barrage_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 4.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, hero.color);
              if (!target.immuneToCc && '하늘에서 비전 별빛 50발 폭격 ATK×4'.includes('기절')) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 3.0); }
              if (!target.immuneToCc && '하늘에서 비전 별빛 50발 폭격 ATK×4'.includes('슬로우')) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 4.0); }
              engine.spawnExplosion(target.position.x, target.position.y, hero.color, 60);
              return true;
            }
            
          
    }
    return false;
  },
  'eek_arcane_mastery': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 패시브
            return false;
            
          
    }
    return false;
  },
  'eek_eternal_verdict_lr': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 5.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '모든 적 즉시 HP 1로 감소 및 영구 슬로우 90%'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '모든 적 즉시 HP 1로 감소 및 영구 슬로우 90%'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
  'eek_moonlight': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 5.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '전장 전체 적 침묵 5초 및 지속 피해'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '전장 전체 적 침묵 5초 및 지속 피해'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
  'eek_night_embrace': (ctx) => {
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
  'eek_summon_sentinel': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.spawnExplosion(hero.position.x, hero.position.y, '#f59e0b', 100);
            return true;
            
          
    }
    return false;
  },
  'eek_falling_star': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.spawnExplosion(hero.position.x, hero.position.y, '#f59e0b', 100);
            return true;
            
          
    }
    return false;
  },
  'eek_eternal_night': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const m of engine.state.monsters.filter(m => m.isAlive)) {
              const dmg = Math.round(hero.atk * 5.0);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, hero.color);
              if (!m.immuneToCc && '전장을 암흑으로 뒤덮어 모든 적 소멸 및 아군 부활'.includes('기절')) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 3.0); }
              if (!m.immuneToCc && '전장을 암흑으로 뒤덮어 모든 적 소멸 및 아군 부활'.includes('슬로우')) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 5.0); }
            }
            engine.spawnExplosion(400, 300, hero.color, 800);
            return true;
            
          
    }
    return false;
  },
};
