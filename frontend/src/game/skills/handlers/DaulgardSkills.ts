// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'daulgard_unholy_disease': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 질병: 전장의 모든 적에게 10초간 도트 피해 (ATK 1.0)
            const dmg = Math.round(hero.atk * 1.0);
            // 질병은 전장에 연한 녹색 독구름 파장
            engine.spawnExplosion(CANVAS_WIDTH / 2, FIELD_Y_CENTER, '#84cc16', 500);
            for (const m of validTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 10, dmg, '#84cc16');
              if (m.hp <= 0) {
                m.hp = 0;
                m.isAlive = false;
                engine.addScore(getMonsterScore(m, 1));
                engine.addGold(getMonsterGold(m, 1));
                engine.applyThirdWallOnKill(m);
              }
            }
            return true;
            
          
    }
    return false;
  },
  'daulgard_unholy_ghoul': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 구울 소환: 자동 소환 시스템에서 관리됨
            return true;
            
          
    }
    return false;
  },
  'daulgard_unholy_death_coil': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 죽음의 고리: 단일 대상 ATK 8.0 피해
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 8.0);
              engine.spawnProjectile(hero, target.id, 'shadow_bolt', dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#4ade80');
              return true;
            }
            
          
    }
    return false;
  },
  'daulgard_unholy_army': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 사자의 군대: 자동 소환 시스템에서 관리됨
            return true;
            
          
    }
    return false;
  },
  'daulgard_frost_chains': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 얼음의 손길: 단일 ATK 3.0 피해 + 5초 슬로우
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#38bdf8');
              if (!target.immuneToCc) {
                target.isSlowed = true;
                target.slowTimer = Math.max(target.slowTimer, 5.0);
              }
              return true;
            }
            
          
    }
    return false;
  },
  'daulgard_frost_howling_blast': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 울부짖는 한파: 타겟 주변 광역 ATK 4.0 + 슬로우
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 4.0);
              engine.spawnExplosion(target.position.x, target.position.y, '#0284c7', 150);
              const inRange = validTargets.filter(m => engine.distance(target.position, m.position) <= 150);
              for (const m of inRange) {
                m.hp -= dmg;
                engine.addMeterDamage(hero.id, null, dmg);
                engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#0ea5e9');
                if (!m.immuneToCc) {
                  m.isSlowed = true;
                  m.slowTimer = Math.max(m.slowTimer, 3.0);
                }
              }
              return true;
            }
            
          
    }
    return false;
  },
  'daulgard_frost_remorseless_winter': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 절멸의 겨울: 광역 강타 + 슬로우
            const dmg = Math.round(hero.atk * 10.0);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#075985', 250);
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 250);
            for (const m of inRange) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#0ea5e9');
              if (!m.immuneToCc) {
                m.isSlowed = true;
                m.slowTimer = Math.max(m.slowTimer, 10.0);
              }
              if (m.hp <= 0) {
                m.hp = 0;
                m.isAlive = false;
                engine.addScore(getMonsterScore(m, 1));
                engine.addGold(getMonsterGold(m, 1));
                engine.applyThirdWallOnKill(m);
              }
            }
            return true;
            
          
    }
    return false;
  },
  'daulgard_blood_boil': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 피의 소용돌이: 주변 광역 ATK 3.0 피해 + 흡혈
            const dmg = Math.round(hero.atk * 3.0);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#ef4444', 180);
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 180);
            let totalDmg = 0;
            for (const m of inRange) {
              m.hp -= dmg;
              totalDmg += dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#dc2626');
            }
            if (totalDmg > 0) {
              const healAmt = Math.round(totalDmg * 0.5); // 50% 흡혈
              engine.applyDirectHeal(hero, hero, healAmt, 'hero', '#ef4444');
            }
            return true;
            
          
    }
    return false;
  },
  'daulgard_blood_vampiric_blood': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 흡혈귀의 피: 최대 HP 30% 증가 및 회복
            const bonusHp = Math.round(hero.maxHp * 0.3);
            hero.maxHp += bonusHp;
            hero.hp += bonusHp;
            engine.addDamageNumber(hero.position.x, hero.position.y - 30, bonusHp, '#991b1b', true);
            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 1.0, color: '#991b1b' });
            return true;
            
          
    }
    return false;
  },
  'daulgard_blood_dancing_weapon': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 춤추는 룬 무기: 자동 소환 시스템에서 관리됨
            return true;
            
          
    }
    return false;
  },
};
