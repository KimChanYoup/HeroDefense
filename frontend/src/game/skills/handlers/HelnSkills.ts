// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'heln_moonfire': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 달빛 불꽃: 주변 200px 적 ATK×0.5 자연 피해 (4초마다 광역 틱)
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 200);
            const dmg = Math.round(hero.atk * 0.5);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#7c3aed', 200);
            for (const m of inRange) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 10, dmg, '#a78bfa');
              if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
            }
            return inRange.length > 0 || validTargets.length > 0;
            
          
    }
    return false;
  },
  'heln_starsurge': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 별 급류: 단일 ATK×5 강타 + 2초 슬로우
            const target = validTargets.find(m => m.monsterType === 'boss') ?? validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5);
              engine.spawnProjectile(hero, target.id, 'fireball', dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#7c3aed');
              if (!target.immuneToCc) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 2.0); }
              return true;
            }
            
          
    }
    return false;
  },
  'heln_starfall': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 별비: 전체 적 ATK×1.5 별빛 폭격
            const dmg = Math.round(hero.atk * 1.5);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#4c1d95', 300);
            for (const m of validTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#8b5cf6');
              if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
            }
            return validTargets.length > 0;
            
          
    }
    return false;
  },
  'heln_wild_growth': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 야생 성장: 전체 아군 ATK×1.5 광역 HoT
            const hotAmt = Math.round(hero.atk * 0.6 * healMult);
            const heroes = engine.state.heroes.filter(h => h.isAlive);
            for (const h of heroes) engine.applyHoT(h, hotAmt, 6, 'hero', '#4ade80');
            engine.spawnExplosion(hero.position.x, hero.position.y, '#22c55e', 200);
            return true;
            
          
    }
    return false;
  },
  'heln_natures_swiftness': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 자연의 의지: 전체 아군 ATK×2 힐
            const healAmt = Math.round(hero.atk * 2 * healMult);
            for (const h of engine.state.heroes) {
              if (h.isAlive) engine.applyDirectHeal(hero, h, healAmt, 'hero', '#bbf7d0', false);
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#4ade80', 200);
            return true;
            
          
    }
    return false;
  },
};
