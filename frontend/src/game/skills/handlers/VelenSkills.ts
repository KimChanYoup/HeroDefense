// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'velen_flash_heal': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const vfhAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (vfhAllies[0]) {
              engine.applyDirectHeal(hero, vfhAllies[0], Math.round(hero.atk * 3.0 * healMult), 'hero', '#fef9c3');
              return true;
            }
            
          
    }
    return false;
  },
  'velen_circle_of_healing': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const vcohAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            vcohAllies.slice(0, 4).forEach(t => {
              engine.applyDirectHeal(hero, t, Math.round(hero.atk * 2.0 * healMult), 'hero', '#facc15', true);
            });
            return true;
            
          
    }
    return false;
  },
  'velen_holy_word_salvation': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const vhwsAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)];
            for (const t of vhwsAllies) {
              engine.applyDirectHeal(hero, t, Math.round(hero.atk * 5.0 * healMult), 'hero', '#ca8a04');
            }
            if (hero.skillTimers) {
              for (const k of ['velen_flash_heal', 'velen_circle_of_healing']) {
                if (hero.skillTimers[k] !== undefined) hero.skillTimers[k] = 0;
              }
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#ca8a04', 200);
            return true;
            
          
    }
    return false;
  },
  'velen_divine_hymn': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dhAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)];
            const dhHealPerTick = Math.round(hero.atk * 2.0 * healMult);
            for (const t of dhAllies) {
              engine.applyHoT(t, dhHealPerTick, 4, 'hero', '#b45309');
              engine.state.healingFlashes.push({ x: t.position.x, y: t.position.y, timer: 0.3, color: '#b45309' });
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#fde047', 180);
            return true;
            
          
    }
    return false;
  },
};
