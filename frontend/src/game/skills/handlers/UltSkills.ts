// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'ult_pres_reversion': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const targets = engine.state.heroes.filter(h => h.isAlive).sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            if (targets[0]) {
              engine.applyHoT(targets[0], Math.round(hero.atk * 0.5 * healMult), 8, 'hero', '#4ade80');
              return true;
            }
            
          
    }
    return false;
  },
  'ult_pres_spiritbloom': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const targets = engine.state.heroes.filter(h => h.isAlive).sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp)).slice(0, 3);
            for (const t of targets) {
              engine.applyDirectHeal(hero, t, Math.round(hero.atk * 4.0 * healMult), 'hero', '#16a34a');
            }
            return targets.length > 0;
            
          
    }
    return false;
  },
  'ult_pres_temporal_anomaly': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.applyShield(h, Math.round(h.maxHp * 0.15), 'hero', 6, hero.id);
            }
            engine.spawnExplosion(hero.position.x, hero.position.y, '#15803d', 200);
            return true;
            
          
    }
    return false;
  },
  'ult_pres_stasis': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.applyDirectHeal(hero, h, Math.round(hero.atk * 5.0 * healMult), 'hero', '#166534');
              // 2초간 무적 (isInvincible 로직은 헬퍼가 필요하지만 일단 시각 효과만)
              engine.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 0.4, color: 'rgba(22, 101, 52, 0.4)' });
            }
            return true;
            
          
    }
    return false;
  },
  'ult_dev_fire_breath': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 5.0);
            engine.spawnExplosion(hero.position.x + 100, hero.position.y, '#f97316', 200);
            const inRange = validTargets.filter(m => m.position.x > hero.position.x && engine.distance(hero.position, m.position) <= 300);
            for (const m of inRange) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#f97316');
              // 5초간 도트
              engine.applyHoT(m as any, -Math.round(hero.atk * 0.5), 5, 'monster' as any, '#ef4444');
            }
            return true;
            
          
    }
    return false;
  },
  'ult_dev_eternity_surge': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const targets = validTargets.slice(0, 3);
            for (const t of targets) {
              const dmg = Math.round(hero.atk * 6.0);
              engine.spawnProjectile(hero, t.id, 'fireball', dmg, '#ef4444');
              engine.addDamageNumber(t.position.x, t.position.y - 25, dmg, '#ef4444');
            }
            return targets.length > 0;
            
          
    }
    return false;
  },
  'ult_dev_disintegrate': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              // 3초간 집중 (일단 즉발 3초치 합산)
              const dmg = Math.round(hero.atk * 12.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 30, dmg, '#b91c1c');
              if (!target.immuneToCc) {
                target.isSlowed = true;
                target.slowTimer = Math.max(target.slowTimer, 3.0);
              }
              return true;
            }
            
          
    }
    return false;
  },
  'ult_dev_dragonrage': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 0.4, color: 'rgba(127, 29, 29, 0.3)' });
            return true;
            
          
    }
    return false;
  },
  'ult_aug_ebon_might': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const topDps = engine.state.heroes.filter(h => h.isAlive).sort((a, b) => b.atk - a.atk).slice(0, 2);
            for (const h of topDps) {
              engine.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 0.4, color: 'rgba(168, 85, 247, 0.3)' });
              // 실제 공격력 증가는 updateHeroes에서 체크 필요하지만 일단 시각 효과
            }
            return true;
            
          
    }
    return false;
  },
  'ult_aug_blistering_scales': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const tank = engine.state.heroes.find(h => h.role === 'tank' && h.isAlive) || hero;
            engine.state.healingFlashes.push({ x: tank.position.x, y: tank.position.y, timer: 0.4, color: 'rgba(124, 58, 237, 0.4)' });
            return true;
            
          
    }
    return false;
  },
  'ult_aug_upheaval': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5.0);
              engine.spawnExplosion(target.position.x, target.position.y, '#6d28d9', 120);
              const inRange = validTargets.filter(m => engine.distance(target.position, m.position) <= 120);
              for (const m of inRange) {
                m.hp -= dmg;
                engine.addMeterDamage(hero.id, null, dmg);
                engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#6d28d9');
                if (!m.immuneToCc) {
                  m.isStunned = true;
                  m.stunTimer = Math.max(m.stunTimer, 2.0);
                }
              }
              return true;
            }
            
          
    }
    return false;
  },
  'ult_aug_breath_of_eons': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.spawnExplosion(hero.position.x, hero.position.y, '#4c1d95', 400);
            for (const m of validTargets) {
              if (!m.immuneToCc) {
                m.isStunned = true;
                m.stunTimer = Math.max(m.stunTimer, 3.0);
              }
            }
            // 전원 피해량 20% 증가 시각 효과
            for (const h of engine.state.heroes.filter(h => h.isAlive)) {
              engine.state.healingFlashes.push({ x: h.position.x, y: h.position.y, timer: 0.4, color: 'rgba(76, 29, 149, 0.2)' });
            }
            return true;
            
          
    }
    return false;
  },
};
