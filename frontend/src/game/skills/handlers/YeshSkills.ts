// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'yesh_holy_light': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 신성 빛: 가장 낮은 HP 아군 ATK×7 강힐
            const ylTarget = [...engine.state.heroes, ...engine.state.summons].filter(h => h.isAlive)
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
            if (ylTarget) {
              const healAmt = Math.round(hero.atk * 7 * healMult);
              const isHero = engine.state.heroes.includes(ylTarget as GameHero);
              engine.applyDirectHeal(hero, ylTarget, healAmt, isHero ? 'hero' : 'summon', '#fde68a');
              engine.spawnExplosion(ylTarget.position.x, ylTarget.position.y, '#fbbf24', 60);
              return true;
            }
            
          
    }
    return false;
  },
  'yesh_divine_favor': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 빛의 은혜: 가장 낮은 HP 아군 ATK×9 대힐 + 신성기사 스킬 쿨 초기화
            const dfTarget = [...engine.state.heroes, ...engine.state.summons].filter(h => h.isAlive)
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp))[0];
            if (dfTarget) {
              const healAmt = Math.round(hero.atk * 9 * healMult);
              const isHero = engine.state.heroes.includes(dfTarget as GameHero);
              engine.applyDirectHeal(hero, dfTarget, healAmt, isHero ? 'hero' : 'summon', '#fef3c7');
              engine.spawnExplosion(dfTarget.position.x, dfTarget.position.y, '#fbbf24', 80);
              if (hero.skillTimers) {
                for (const k of ['yesh_holy_light', 'yesh_sacred_shield', 'yesh_sanctified_ground']) {
                  if (hero.skillTimers[k] !== undefined) hero.skillTimers[k] = 0;
                }
              }
              return true;
            }
            
          
    }
    return false;
  },
  'yesh_sanctified_ground': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 지성소: 전체 아군 ATK×3 힐 + 10초 HoT
            const sgAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)];
            for (const a of sgAllies) {
              const isHero = engine.state.heroes.includes(a as GameHero);
              engine.applyDirectHeal(hero, a, Math.round(hero.atk * 3 * healMult), isHero ? 'hero' : 'summon', '#fbbf24', false);
              engine.applyHoT(a, Math.round(hero.atk * 0.8 * healMult), 10, isHero ? 'hero' : 'summon', '#fde68a');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#fbbf24', 200);
            return true;
            
          
    }
    return false;
  },
  'yesh_crusader_strike': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 성기사의 뇌격: 신성 단일 타격 ATK×3.5
            const csTarget = validTargets[0];
            if (csTarget) {
              const dmg = Math.round(hero.atk * 3.5);
              csTarget.hp -= dmg;
              if (csTarget.hp <= 0) { csTarget.hp = 0; csTarget.isAlive = false; engine.addScore(getMonsterScore(csTarget, 1)); engine.addGold(getMonsterGold(csTarget, 1)); }
              engine.spawnProjectile(hero, csTarget.id, 'heal_orb', dmg, '#fbbf24');
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(csTarget.position.x, csTarget.position.y - 20, dmg, '#fbbf24');
              return true;
            }
            
          
    }
    return false;
  },
  'yesh_hammer_of_wrath': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 진노의 해머: 처형기 — HP 35% 이하 ATK×10, 이상 ATK×5
            const hwTarget = validTargets[0];
            if (hwTarget) {
              const isExec = hwTarget.hp / hwTarget.maxHp < 0.35;
              const dmg = Math.round(hero.atk * (isExec ? 10 : 5));
              hwTarget.hp -= dmg;
              if (hwTarget.hp <= 0) { hwTarget.hp = 0; hwTarget.isAlive = false; engine.addScore(getMonsterScore(hwTarget, 1)); engine.addGold(getMonsterGold(hwTarget, 1)); }
              engine.spawnProjectile(hero, hwTarget.id, 'heal_orb', dmg, '#f59e0b');
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(hwTarget.position.x, hwTarget.position.y - 20, dmg, isExec ? '#ef4444' : '#f59e0b');
              return true;
            }
            
          
    }
    return false;
  },
  'yesh_divine_purpose': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 성전사의 검: ATK×2 신속 2연타 + 징벌 스킬 쿨 초기화
            const dpTarget = validTargets[0];
            if (dpTarget) {
              for (let i = 0; i < 2; i++) {
                const dmg = Math.round(hero.atk * 2);
                dpTarget.hp -= dmg;
                engine.addMeterDamage(hero.id, skillId, dmg);
                engine.addDamageNumber(dpTarget.position.x + i * 14, dpTarget.position.y - 15 - i * 10, dmg, '#d97706');
              }
              if (dpTarget.hp <= 0) { dpTarget.hp = 0; dpTarget.isAlive = false; engine.addScore(getMonsterScore(dpTarget, 1)); engine.addGold(getMonsterGold(dpTarget, 1)); }
              if (hero.skillTimers) {
                for (const k of ['yesh_crusader_strike', 'yesh_hammer_of_wrath']) {
                  if (hero.skillTimers[k] !== undefined) hero.skillTimers[k] = 0;
                }
              }
              return true;
            }
            
          
    }
    return false;
  },
  'yesh_final_reckoning': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 최후의 심판: 광역 신성 피해 ATK×6 + 자신 힐 (피해의 40%)
            const frRadius = 200;
            const frTargets = validTargets.filter(m => engine.distance(hero.position, m.position) <= frRadius);
            const frHits = frTargets.length > 0 ? frTargets : validTargets.slice(0, 3);
            let totalFrDmg = 0;
            for (const m of frHits) {
              const dmg = Math.round(hero.atk * 6);
              m.hp -= dmg;
              totalFrDmg += dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#fbbf24');
              if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#fbbf24', frRadius);
            if (totalFrDmg > 0) {
              const selfHeal = Math.round(totalFrDmg * 0.4 * healMult);
              engine.applyDirectHeal(hero, hero, selfHeal, 'hero', '#fde68a');
              // 신성 응보 버프 트리거 (5초간 추뎀 활성)
              if (hero.equippedSkillIds?.includes('unique_yesh_retribution') && hero.skillTimers) {
                hero.skillTimers['yesh_ret_buff'] = 5.0;
              }
            }
            return true;
            
          
    }
    return false;
  },
};
