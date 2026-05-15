// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'dizgar_light_wave': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 빛의 파동: 전체 아군 ATK×1.5 힐
            const healAmt = Math.round(hero.atk * 1.5 * healMult);
            for (const h of engine.state.heroes) {
              if (h.isAlive) engine.applyDirectHeal(hero, h, healAmt, 'hero', '#fde68a', false);
            }
            return true;
            
          
    }
    return false;
  },
  'dizgar_holy_shield': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 신성한 보호막: HP 최저 아군 최대HP 20% 보호막
            const target = engine.state.heroes.filter(h => h.isAlive).sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
            if (target) {
              const shieldAmt = Math.round(target.maxHp * 0.20);
              engine.applyShield(target, shieldAmt, 'hero', 12, hero.id);
              engine.state.healingFlashes.push({ x: target.position.x, y: target.position.y, timer: 0.4, color: '#fbbf24' });
              return true;
            }
            
          
    }
    return false;
  },
  'dizgar_resurrection': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 부활: 쓰러진 아군 1명 HP 30% 부활
            const dead = engine.state.heroes.find(h => !h.isAlive);
            if (dead) {
              dead.isAlive = true;
              dead.hp = Math.round(dead.maxHp * 0.30);
              engine.addDamageNumber(dead.position.x, dead.position.y - 30, dead.hp, '#d97706', true);
              engine.state.healingFlashes.push({ x: dead.position.x, y: dead.position.y, timer: 0.6, color: '#fbbf24' });
              return true;
            } else {
              return true; // 부활 대상 없어도 쿨 소비
            }
            
          
    }
    return false;
  },
  'dizgar_divine_intervention': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 신성 개입: 전체 아군 ATK×4 힐 + ATK×2 보호막
            const healAmt = Math.round(hero.atk * 4 * healMult);
            const shieldAmt = Math.round(hero.atk * 2 * healMult);
            for (const h of engine.state.heroes) {
              if (h.isAlive) {
                engine.applyDirectHeal(hero, h, healAmt, 'hero', '#fbbf24', false);
                engine.applyShield(h, shieldAmt, 'hero', 8, hero.id);
              }
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#fbbf24', 300);
            return true;
            
          
    }
    return false;
  },
  'dizgar_holy_light': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 신성한 빛: HP 최저 아군 ATK×8 힐
            const target = engine.state.heroes.filter(h => h.isAlive).sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
            if (target) {
              engine.applyDirectHeal(hero, target, Math.round(hero.atk * 8 * healMult), 'hero', '#fef08a');
              return true;
            }
            
          
    }
    return false;
  },
  'dizgar_prayer_healing': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 치유의 기도: 전체 아군 ATK×2 힐
            const healAmt = Math.round(hero.atk * 2 * healMult);
            for (const h of engine.state.heroes) {
              if (h.isAlive) engine.applyDirectHeal(hero, h, healAmt, 'hero', '#fbbf24', false);
            }
            return true;
            
          
    }
    return false;
  },
  'dizgar_divine_hymn': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 신성한 찬가: 전체 아군 ATK×5 강힐 + ATK×3 보호막
            const healAmt = Math.round(hero.atk * 5 * healMult);
            const shieldAmt = Math.round(hero.atk * 3 * healMult);
            for (const h of engine.state.heroes) {
              if (h.isAlive) {
                engine.applyDirectHeal(hero, h, healAmt, 'hero', '#fef9c3', false);
                engine.applyShield(h, shieldAmt, 'hero', 10, hero.id);
                engine.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 0.4, color: '#fef9c3' });
              }
            }
            return true;
            
          
    }
    return false;
  },
  'dizgar_dark_feast': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 암흑 포식: 자신 최대HP 10% 회복
            const recoverAmt = Math.round(hero.maxHp * 0.10);
            hero.hp = Math.min(hero.maxHp, hero.hp + recoverAmt);
            engine.addDamageNumber(hero.position.x, hero.position.y - 20, recoverAmt, '#6d28d9', true);
            return true;
            
          
    }
    return false;
  },
  'dizgar_blood_ritual': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 피의 의식: 자신 HP 30% 소모 → 전체 아군 ATK×3 힐
            const cost = Math.round(hero.maxHp * 0.30);
            if (hero.hp > cost) {
              hero.hp -= cost;
              const healAmt = Math.round(hero.atk * 3 * healMult);
              for (const h of engine.state.heroes) {
                if (h.isAlive) engine.applyDirectHeal(hero, h, healAmt, 'hero', '#a855f7', false);
              }
              engine.spawnExplosion(hero.position.x, hero.position.y, '#7c3aed', 200);
              return true;
            } else {
              return true; // HP 부족해도 쿨 소비
            }
            
          
    }
    return false;
  },
};
