// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'cheondung_earthquake': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 지진: 주변 250px ATK×3 + 3초 슬로우 (+ 번개 과부하 2회 발동)
            const eqTargets = validTargets.filter(m => engine.distance(hero.position, m.position) <= 250);
            if (eqTargets.length > 0) {
              engine.spawnExplosion(hero.position.x, hero.position.y, '#ca8a04', 250);
              const applyEq = (dmg: number) => {
                for (const m of eqTargets.filter(x => x.isAlive)) {
                  m.hp -= dmg;
                  engine.addMeterDamage(hero.id, null, dmg);
                  engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#eab308');
                  if (!m.immuneToCc) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 3.0); }
                  if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
                }
              };
              applyEq(Math.round(hero.atk * 3));
              if (hero.equippedSkillIds?.includes('unique_cheondung_elemental') && Math.random() < (hero.uniqueSkillValue ?? 20) / 100) {
                applyEq(Math.round(hero.atk * 3));
              }
              return true;
            }
            
          
    }
    return false;
  },
  'cheondung_thunderstorm': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 천둥 폭풍: 가장 가까운 적 최대 4마리 ATK×4 번개
            const stormTargets = [...validTargets]
              .sort((a, b) => engine.distance(hero.position, a.position) - engine.distance(hero.position, b.position))
              .slice(0, 4);
            if (stormTargets.length > 0) {
              engine.spawnExplosion(hero.position.x, hero.position.y, '#a16207', 200);
              const applyStorm = (dmg: number) => {
                for (const m of stormTargets.filter(x => x.isAlive)) {
                  m.hp -= dmg;
                  engine.addMeterDamage(hero.id, null, dmg);
                  engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#facc15');
                  if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
                }
              };
              applyStorm(Math.round(hero.atk * 4));
              if (hero.equippedSkillIds?.includes('unique_cheondung_elemental') && Math.random() < (hero.uniqueSkillValue ?? 20) / 100) {
                applyStorm(Math.round(hero.atk * 4));
              }
              return true;
            }
            
          
    }
    return false;
  },
  'cheondung_lightning_storm': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 번개 폭풍: 전체 적 ATK×3.5 번개 폭격
            engine.spawnExplosion(hero.position.x, hero.position.y, '#713f12', 400);
            const applyLStorm = (dmg: number) => {
              for (const m of validTargets.filter(x => x.isAlive)) {
                m.hp -= dmg;
                engine.addMeterDamage(hero.id, null, dmg);
                engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#eab308');
                if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
              }
            };
            applyLStorm(Math.round(hero.atk * 3.5));
            if (hero.equippedSkillIds?.includes('unique_cheondung_elemental') && Math.random() < (hero.uniqueSkillValue ?? 20) / 100) {
              applyLStorm(Math.round(hero.atk * 3.5));
            }
            return validTargets.length > 0;
            
          
    }
    return false;
  },
  'cheondung_healing_wave': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 치유의 파동: 가장 낮은 HP 아군 ATK×5 힐
            const hwTarget = engine.state.heroes.filter(h => h.isAlive)
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
            if (hwTarget) {
              engine.applyDirectHeal(hero, hwTarget, Math.round(hero.atk * 5 * healMult), 'hero', '#4ade80');
              return true;
            }
            
          
    }
    return false;
  },
  'cheondung_chain_heal2': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 연쇄 치유: HP 낮은 순 3인 ATK×3→2→1 힐
            const chainSorted = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp)).slice(0, 3);
            const chainHeals = [3.0, 2.0, 1.0];
            for (let i = 0; i < chainSorted.length; i++) {
              const t = chainSorted[i];
              const isHero = engine.state.heroes.includes(t as GameHero);
              engine.applyDirectHeal(hero, t, Math.round(hero.atk * chainHeals[i] * healMult), isHero ? 'hero' : 'summon', '#22c55e', i === 0);
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#16a34a', 150);
            return true;
            
          
    }
    return false;
  },
};
