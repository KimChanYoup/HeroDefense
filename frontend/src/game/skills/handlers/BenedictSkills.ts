// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'benedict_heal': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const bhAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (bhAllies[0]) {
              engine.applyDirectHeal(hero, bhAllies[0], Math.round(hero.atk * 4.0 * healMult), 'hero', '#fef08a');
              return true;
            }
            
          
    }
    return false;
  },
  'benedict_renew': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const brenewAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (brenewAllies[0]) {
              engine.applyHoT(brenewAllies[0], Math.round(hero.atk * 0.8 * healMult), 6, 'hero', '#facc15');
              engine.state.healingFlashes.push({ x: brenewAllies[0].position.x, y: brenewAllies[0].position.y, timer: 0.3, color: '#facc15' });
              return true;
            }
            
          
    }
    return false;
  },
  'benedict_holy_word_serenity': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const hwsAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (hwsAllies[0]) {
              const mainAmt = Math.round(hero.atk * 10.0 * healMult);
              engine.applyDirectHeal(hero, hwsAllies[0], mainAmt, 'hero', '#ca8a04');
              hwsAllies.slice(1, 3).forEach(t => {
                engine.applyDirectHeal(hero, t, Math.round(mainAmt * 0.3), 'hero', '#fef08a', false);
              });
              return true;
            }
            
          
    }
    return false;
  },
  'benedict_guardian_spirit': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const bgsAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (bgsAllies[0]) {
              const gt = bgsAllies[0];
              engine.applyHoT(gt, Math.round(hero.atk * 1.2 * healMult), 10, 'hero', '#d97706');
              engine.applyShield(gt, Math.round(gt.maxHp * 0.15), 'hero', 10, hero.id);
              engine.state.healingFlashes.push({ x: gt.position.x, y: gt.position.y, timer: 0.5, color: '#d97706' });
              return true;
            }
            
          
    }
    return false;
  },
};
