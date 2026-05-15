// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'seori_stormstrike': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 폭풍 강타: 단일 ATK×4 + 2초 슬로우
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 4);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#fbbf24');
              if (!target.immuneToCc) { target.isSlowed = true; target.slowTimer = Math.max(target.slowTimer, 2.0); }
              if (target.hp <= 0) { target.hp = 0; target.isAlive = false; engine.addScore(getMonsterScore(target, 1)); engine.addGold(getMonsterGold(target, 1)); }
              return true;
            }
            
          
    }
    return false;
  },
  'seori_chain_lightning': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 연쇄 번개: 3연쇄 ATK×1.5
            let chainTarget = validTargets[0];
            const hit = new Set<number>();
            for (let i = 0; i < 3 && chainTarget; i++) {
              const dmg = Math.round(hero.atk * 1.5);
              chainTarget.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(chainTarget.position.x, chainTarget.position.y - 15, dmg, '#facc15');
              engine.spawnExplosion(chainTarget.position.x, chainTarget.position.y, '#fbbf24', 40);
              if (chainTarget.hp <= 0) { chainTarget.hp = 0; chainTarget.isAlive = false; engine.addScore(getMonsterScore(chainTarget, 1)); engine.addGold(getMonsterGold(chainTarget, 1)); }
              hit.add(chainTarget.id);
              chainTarget = validTargets.find(m => !hit.has(m.id) && m.isAlive) ?? null as unknown as GameMonster;
            }
            return true;
            
          
    }
    return false;
  },
  'seori_totemic_wrath': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 토템의 분노: 전체 적 ATK×3 번개 폭격
            const dmg = Math.round(hero.atk * 3);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#b45309', 350);
            for (const m of validTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#fbbf24');
              if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
            }
            return validTargets.length > 0;
            
          
    }
    return false;
  },
  'seori_chain_heal': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 연쇄 치유: 체력 낮은 순 3인 ATK×3→2→1
            const sorted = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp)).slice(0, 3);
            const heals = [3, 2, 1];
            for (let i = 0; i < sorted.length; i++) {
              const t = sorted[i];
              const healAmt = Math.round(hero.atk * heals[i] * healMult);
              const isHero = engine.state.heroes.includes(t as GameHero);
              engine.applyDirectHeal(hero, t, healAmt, isHero ? 'hero' : 'summon', '#0ea5e9', false);
            }
            if (sorted.length > 0) {
              engine.spawnExplosion(hero.position.x, hero.position.y, '#06b6d4', 150);
            }
            return true;
            
          
    }
    return false;
  },
  'seori_healing_rain': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 치유의 비: 전체 아군 ATK×2 힐
            const healAmt = Math.round(hero.atk * 2 * healMult);
            for (const h of engine.state.heroes) {
              if (h.isAlive) engine.applyDirectHeal(hero, h, healAmt, 'hero', '#0284c7', false);
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#0ea5e9', 200);
            return true;
            
          
    }
    return false;
  },
  'seori_spirit_link': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 정령 연결: 전체 아군 체력 균등화 + 5초 피해 20% 감소
            const aliveH = engine.state.heroes.filter(h => h.isAlive);
            if (aliveH.length > 0) {
              const avgPct = aliveH.reduce((s, h) => s + h.hp / h.maxHp, 0) / aliveH.length;
              for (const h of aliveH) {
                const targetHp = Math.round(h.maxHp * avgPct);
                if (targetHp > h.hp) {
                  const diff = targetHp - h.hp;
                  h.hp = targetHp;
                  engine.addMeterHeal(hero.id, diff);
                }
                h.dmgReducePct = 0.20;
                h.dmgReduceTimer = 5.0;
                engine.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 0.6, color: '#06b6d4' });
              }
              engine.spawnExplosion(hero.position.x, hero.position.y, '#0c4a6e', 250);
            }
            return true;
            
          
    }
    return false;
  },
};
