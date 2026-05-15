// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'lili_effuse': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const leAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (leAllies[0]) {
              engine.applyDirectHeal(hero, leAllies[0], Math.round(hero.atk * 2.5 * healMult), 'hero', '#4ade80');
              return true;
            }
            
          
    }
    return false;
  },
  'lili_renewing_mist': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const lrmAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            lrmAllies.slice(0, 2).forEach(t => {
              engine.applyHoT(t, Math.round(hero.atk * 0.7 * healMult), 5, 'hero', '#16a34a');
              engine.state.healingFlashes.push({ x: t.position.x, y: t.position.y, timer: 0.3, color: '#16a34a' });
            });
            return true;
            
          
    }
    return false;
  },
  'lili_life_cocoon': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const llcAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (llcAllies[0]) {
              const t = llcAllies[0];
              engine.applyShield(t, Math.round(t.maxHp * 0.20), 'hero', 8, hero.id);
              engine.applyHoT(t, Math.round(hero.atk * 0.5 * healMult), 4, 'hero', '#15803d');
              engine.state.healingFlashes.push({ x: t.position.x, y: t.position.y, timer: 0.4, color: '#15803d' });
              return true;
            }
            
          
    }
    return false;
  },
  'lili_chi_burst': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const cbHitMonsters = validTargets.filter(m => Math.abs(m.position.y - hero.position.y) <= 60);
            for (const m of cbHitMonsters) {
              const d = Math.round(hero.atk * 3.0);
              m.hp -= d; engine.addMeterDamage(hero.id, skillId, d);
              engine.addDamageNumber(m.position.x, m.position.y - 15, d, '#22c55e');
              if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
            }
            // 관통 경로의 아군 힐
            const cbHitHeroes = engine.state.heroes.filter(h => h.isAlive && Math.abs(h.position.y - hero.position.y) <= 60);
            for (const h of cbHitHeroes) {
              engine.applyDirectHeal(hero, h, Math.round(hero.atk * 2.0 * healMult), 'hero', '#22c55e', false);
            }
            engine.spawnExplosion(hero.position.x + 200, hero.position.y, '#22c55e', 60);
            return true;
            
          
    }
    return false;
  },
};
