// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'xianghua_soothing_mist': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const xsmAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (xsmAllies[0]) {
              engine.applyDirectHeal(hero, xsmAllies[0], Math.round(hero.atk * 2.0 * healMult), 'hero', '#67e8f9');
              engine.applyHoT(xsmAllies[0], Math.round(hero.atk * 0.4 * healMult), 4, 'hero', '#22d3ee');
              return true;
            }
            
          
    }
    return false;
  },
  'xianghua_life_cocoon': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const xlcAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (xlcAllies[0]) {
              const xt = xlcAllies[0];
              engine.applyShield(xt, Math.round(xt.maxHp * 0.25), 'hero', 8, hero.id);
              engine.applyHoT(xt, Math.round(hero.atk * 0.6 * healMult), 5, 'hero', '#22d3ee');
              engine.state.healingFlashes.push({ x: xt.position.x, y: xt.position.y, timer: 0.4, color: '#22d3ee' });
              return true;
            }
            
          
    }
    return false;
  },
  'xianghua_enveloping_mist': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const xemAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (xemAllies[0]) {
              engine.applyDirectHeal(hero, xemAllies[0], Math.round(hero.atk * 4.0 * healMult), 'hero', '#0891b2');
              engine.applyHoT(xemAllies[0], Math.round(hero.atk * 0.8 * healMult), 6, 'hero', '#0891b2');
              return true;
            }
            
          
    }
    return false;
  },
  'xianghua_revival': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const xrAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)];
            for (const t of xrAllies) {
              engine.applyDirectHeal(hero, t, Math.round(hero.atk * 6.0 * healMult), 'hero', '#155e75');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#155e75', 200);
            return true;
            
          
    }
    return false;
  },
  'xianghua_invoke_chi_ji': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const cjAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)];
            for (const t of cjAllies) {
              // interval 2초인 HoT, 4틱 → 총 8초
              engine.state.hots.push({
                id: Math.random(), targetId: t.id, targetType: 'hero',
                amountPerTick: Math.round(hero.atk * 1.5 * healMult), totalTicks: 4, currentTick: 0,
                interval: 2.0, timer: 2.0, color: '#0e7490',
              });
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#0e7490', 200);
            return true;
            
          
    }
    return false;
  },
};
