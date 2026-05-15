// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'iyena_atonement': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const atTarget = validTargets[0];
            if (atTarget) {
              const dmg = Math.round(hero.atk * 2.5);
              atTarget.hp -= dmg;
              if (atTarget.hp <= 0) { atTarget.hp = 0; atTarget.isAlive = false; engine.addScore(getMonsterScore(atTarget, 1)); engine.addGold(getMonsterGold(atTarget, 1)); }
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(atTarget.position.x, atTarget.position.y - 15, dmg, '#22d3ee');
              // 딜의 150%를 아군 전체에 균등 힐
              const atAllies = engine.state.heroes.filter(h => h.isAlive);
              const healPer = Math.round(dmg * 1.5 / Math.max(atAllies.length, 1) * healMult);
              for (const h of atAllies) engine.applyDirectHeal(hero, h, healPer, 'hero', '#22d3ee', false);
              return true;
            }
            
          
    }
    return false;
  },
  'iyena_penance': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const penAllies = [...engine.state.heroes.filter(h => h.isAlive), ...engine.state.summons.filter(s => s.isAlive)]
              .sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            const penTarget = penAllies[0];
            const needsHeal = penTarget && penTarget.hp / penTarget.maxHp < 0.9;
            if (needsHeal && penTarget) {
              for (let i = 0; i < 3; i++) {
                const h = Math.round(hero.atk * 1.8 * healMult);
                engine.applyDirectHeal(hero, penTarget, h, 'hero', '#67e8f9', i === 0);
              }
              return true;
            } else if (validTargets.length > 0) {
              const pt = validTargets[0];
              for (let i = 0; i < 3; i++) {
                const d = Math.round(hero.atk * 1.2);
                pt.hp -= d;
                engine.addMeterDamage(hero.id, skillId, d);
                engine.addDamageNumber(pt.position.x + i * 8, pt.position.y - 15 - i * 8, d, '#67e8f9');
              }
              if (pt.hp <= 0) { pt.hp = 0; pt.isAlive = false; engine.addScore(getMonsterScore(pt, 1)); engine.addGold(getMonsterGold(pt, 1)); }
              return true;
            }
            
          
    }
    return false;
  },
  'iyena_desperate_prayer': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.applyDirectHeal(hero, hero, Math.round(hero.atk * 10 * healMult), 'hero', '#0ea5e9');
            return true;
            
          
    }
    return false;
  },
};
