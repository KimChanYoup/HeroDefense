// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'hamul_regrowth': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const hrAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (hrAllies[0]) {
              const hotMult = 1 + (hero.uniqueSkillValue ?? 10) / 100;
              engine.applyDirectHeal(hero, hrAllies[0], Math.round(hero.atk * 2.5 * healMult), 'hero', '#4ade80');
              engine.applyHoT(hrAllies[0], Math.round(hero.atk * 0.9 * healMult * hotMult), 6, 'hero', '#22c55e');
              return true;
            }
            
          
    }
    return false;
  },
  'hamul_tranquility': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const tqAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)];
            const tqHotMult = 1 + (hero.uniqueSkillValue ?? 10) / 100;
            for (const t of tqAllies) {
              engine.applyHoT(t, Math.round(hero.atk * 0.6 * healMult * tqHotMult), 5, 'hero', '#86efac');
              engine.state.healingFlashes.push({ x: t.position.x, y: t.position.y, timer: 0.3, color: '#86efac' });
            }
            return true;
            
          
    }
    return false;
  },
  'hamul_incarnation': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            hero.skillTimers['hamul_incarnation_buff'] = 10.0;
            engine.spawnExplosion(hero.position.x, hero.position.y, '#15803d', 80);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 0.5, color: '#15803d' });
            return true;
            
          
    }
    return false;
  },
  'hamul_wild_growth': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const wgAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)];
            const wgHotMult = 1 + (hero.uniqueSkillValue ?? 10) / 100;
            for (const t of wgAllies) {
              engine.applyHoT(t, Math.round(hero.atk * 0.5 * healMult * wgHotMult), 5, 'hero', '#16a34a');
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#16a34a', 150);
            return true;
            
          
    }
    return false;
  },
};
