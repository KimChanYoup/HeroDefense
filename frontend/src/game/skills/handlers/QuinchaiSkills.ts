// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'quinchai_ww_fists': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 4.0);
            engine.spawnExplosion(hero.position.x + 50, hero.position.y, '#38bdf8', 150);
            const forwardTargets = validTargets.filter(m => m.position.x > hero.position.x - 20 && engine.distance(hero.position, m.position) <= 150);
            for (const m of forwardTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#38bdf8');
              if (!m.immuneToCc) {
                m.isStunned = true;
                m.stunTimer = Math.max(m.stunTimer, 1.0);
              }
            }
            return true;
            
          
    }
    return false;
  },
  'quinchai_ww_flying_kick': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 200);
            for (const m of inRange) {
              if (!m.immuneToCc) {
                m.isSlowed = true;
                m.slowTimer = Math.max(m.slowTimer, 3.0);
              }
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#0284c7', 200);
            return true;
            
          
    }
    return false;
  },
  'quinchai_ww_xuen': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 백호 쉬엔 소환: 자동 소환 시스템에서 관리됨
            return true;
            
          
    }
    return false;
  },
  'quinchai_bm_keg': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const targets = validTargets.slice(0, 5);
            const dmg = Math.round(hero.atk * 3.0);
            for (const t of targets) {
              t.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(t.position.x, t.position.y - 15, dmg, '#f59e0b');
              if (!t.immuneToCc) {
                t.isSlowed = true;
                t.slowTimer = Math.max(t.slowTimer, 4.0);
              }
            }
            engine.spawnExplosion(hero.position.x + 80, hero.position.y, '#b45309', 120);
            return true;
            
          
    }
    return false;
  },
  'quinchai_bm_iron_skin': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 8.0, color: 'rgba(180, 83, 9, 0.3)' });
            return true;
            
          
    }
    return false;
  },
  'quinchai_bm_niuzao': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 흑우 니우자오 소환: 자동 소환 시스템에서 관리됨
            return true;
            
          
    }
    return false;
  },
  'quinchai_mw_yu_lon': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 옥룡 위론 소환: 자동 소환 시스템에서 관리됨
            return true;
            
          
    }
    return false;
  },
  'quinchai_mw_vivify': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const targets = engine.state.heroes.filter(h => h.isAlive).sort((a, b) => (a.hp/a.maxHp) - (b.hp/b.maxHp));
            if (targets[0]) {
              const healAmt = Math.round(hero.atk * 4.0 * healMult);
              engine.applyDirectHeal(hero, targets[0], healAmt, 'hero', '#22d3ee');
              return true;
            }
            
          
    }
    return false;
  },
  'quinchai_mw_revival': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.spawnExplosion(hero.position.x, hero.position.y, '#0891b2', 300);
            const healAmt = Math.round(hero.atk * 3.0 * healMult);
            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.applyDirectHeal(hero, h, healAmt, 'hero', '#0891b2');
            }
            return true;
            
          
    }
    return false;
  },
  'quinchai_mw_chi_ji': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 주학 츠지 소환: 자동 소환 시스템에서 관리됨
            return true;
            
          
    }
    return false;
  },
};
