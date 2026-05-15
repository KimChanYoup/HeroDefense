// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'kaern_pounce': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 표범 도약: 단일 ATK×6 + 2초 기절
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 6);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#f97316');
              if (!target.immuneToCc) { target.isStunned = true; target.stunTimer = Math.max(target.stunTimer, 2.0); }
              if (target.hp <= 0) { target.hp = 0; target.isAlive = false; engine.addScore(getMonsterScore(target, 1)); engine.addGold(getMonsterGold(target, 1)); }
              engine.spawnExplosion(target.position.x, target.position.y, '#ea580c', 60);
              return true;
            }
            
          
    }
    return false;
  },
  'kaern_mangle': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 분쇄: 전방 120px ATK×3 + 2초 기절
            engine.spawnExplosion(hero.position.x, hero.position.y, '#16a34a', 120);
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 120);
            for (const m of inRange) {
              const dmg = Math.round(hero.atk * 3);
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#22c55e');
              if (!m.immuneToCc) { m.isStunned = true; m.stunTimer = Math.max(m.stunTimer, 2.0); }
              if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
            }
            return inRange.length > 0 || validTargets.length > 0;
            
          
    }
    return false;
  },
  'kaern_bear_hug': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 격곰 포획: 단일 ATK×5 + 5초 슬로우
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#15803d');
              if (!target.immuneToCc) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 5.0); }
              if (target.hp <= 0) { target.hp = 0; target.isAlive = false; engine.addScore(getMonsterScore(target, 1)); engine.addGold(getMonsterGold(target, 1)); }
              engine.spawnExplosion(target.position.x, target.position.y, '#166534', 80);
              return true;
            }
            
          
    }
    return false;
  },
  'kaern_wild_growth': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 야생 성장: 전체 아군 ATK×1.5 힐
            const healAmt = Math.round(hero.atk * 1.5 * healMult);
            for (const h of engine.state.heroes) {
              if (h.isAlive) engine.applyDirectHeal(hero, h, healAmt, 'hero', '#4ade80', false);
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#22c55e', 150);
            return true;
            
          
    }
    return false;
  },
  'kaern_nourish': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 영양: 체력 최저 아군 ATK×5 강화 힐
            const target = engine.state.heroes.filter(h => h.isAlive).sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
            if (target) {
              const healAmt = Math.round(hero.atk * 5 * healMult);
              engine.applyDirectHeal(hero, target, healAmt, 'hero', '#86efac');
              return true;
            }
            
          
    }
    return false;
  },
  'kaern_tranquility': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 평온: 전체 아군 ATK×3 힐
            const healAmt = Math.round(hero.atk * 3 * healMult);
            for (const h of engine.state.heroes) {
              if (h.isAlive) engine.applyDirectHeal(hero, h, healAmt, 'hero', '#bbf7d0', false);
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#4ade80', 200);
            return true;
            
          
    }
    return false;
  },
  'kaern_starsurge': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 별 급류: 단일 ATK×6 자연 강타
            const target = validTargets.find(m => m.monsterType === 'boss') ?? validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 6);
              engine.spawnProjectile(hero, target.id, 'fireball', dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#7c3aed');
              return true;
            }
            
          
    }
    return false;
  },
  'kaern_starfall': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 별비: 전체 적 ATK×2 별빛 폭격
            const dmg = Math.round(hero.atk * 2);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#4c1d95', 300);
            for (const m of validTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#a78bfa');
              if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
            }
            return validTargets.length > 0;
            
          
    }
    return false;
  },
};
