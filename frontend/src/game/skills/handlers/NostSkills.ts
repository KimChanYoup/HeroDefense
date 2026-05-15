// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'nost_ret_judgment': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 4.0);
              engine.spawnProjectile(hero, target.id, 'heal_orb', dmg, '#fbbf24'); // 심판 투사체 (금색)
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#fbbf24');
              return true;
            }
            
          
    }
    return false;
  },
  'nost_ret_divine_storm': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 3.5);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#f59e0b', 150);
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 150);
            let totalDmg = 0;
            for (const m of inRange) {
              m.hp -= dmg;
              totalDmg += dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#f59e0b');
            }
            if (totalDmg > 0) {
              const healAmt = Math.round(totalDmg * 0.2);
              engine.applyDirectHeal(hero, hero, healAmt, 'hero', '#fde68a');
            }
            return true;
            
          
    }
    return false;
  },
  'nost_ret_wake_of_ashes': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 10.0);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#92400e', 250);
            // 전방 모든 적 (X축 기준 오른쪽)
            const forwardTargets = validTargets.filter(m => m.position.x > hero.position.x - 50);
            for (const m of forwardTargets) {
              const isUndead = m.name.includes('해골') || m.name.includes('좀비') || m.name.includes('리치') || m.name.includes('데스') || m.name.includes('뼈') || m.name.includes('살덩이') || m.name.includes('누더기');
              if (isUndead && m.monsterType !== 'boss') {
                m.hp = 0;
                m.isAlive = false;
                engine.addDamageNumber(m.position.x, m.position.y, 99999, '#ffffff');
              } else {
                m.hp -= dmg;
                engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#92400e');
              }
              engine.addMeterDamage(hero.id, null, dmg);
            }
            return true;
            
          
    }
    return false;
  },
  'nost_prot_holy_ground': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.spawnExplosion(hero.position.x, hero.position.y, '#fbbf24', 100);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 8.0, color: 'rgba(251, 191, 36, 0.2)' });
            return true;
            
          
    }
    return false;
  },
  'nost_prot_avengers_shield': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const targets = validTargets.slice(0, 3);
            if (targets.length > 0) {
              const dmg = Math.round(hero.atk * 3.0);
              for (const target of targets) {
                engine.spawnProjectile(hero, target.id, 'heal_orb', dmg, '#2563eb');
                engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#2563eb');
                if (!target.immuneToCc) {
                  target.isStunned = true; // 침묵 대신 스턴 2초로 대체 (침묵 로직이 없으므로)
                  target.stunTimer = Math.max(target.stunTimer, 2.0);
                }
              }
              return true;
            }
            
          
    }
    return false;
  },
  'nost_prot_guardian_king': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 고대 왕의 수호자: 10초간 피해 감소 (applyDamageToTarget에서 체크 필요하지만, 일단 시각 효과와 힐로 보정)
            engine.applyDirectHeal(hero, hero, Math.round(hero.maxHp * 0.3), 'hero', '#1d4ed8');
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#1d4ed8' });
            return true;
            
          
    }
    return false;
  },
  'nost_holy_flash': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const targets = engine.state.heroes.filter(h => h.isAlive).sort((a, b) => (a.hp/a.maxHp) - (b.hp/b.maxHp));
            const target = targets[0];
            if (target) {
              const healAmt = Math.round(hero.atk * 4.0);
              engine.applyDirectHeal(hero, target, healAmt, 'hero', '#fbbf24');
              return true;
            }
            
          
    }
    return false;
  },
  'nost_holy_divine_revelation': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#ca8a04' });
            const allies = engine.state.heroes.filter(h => h.isAlive);
            for (const h of allies) {
              engine.applyDirectHeal(hero, h, Math.round(hero.atk * 2.0), 'hero', '#ca8a04');
            }
            return true;
            
          
    }
    return false;
  },
};
