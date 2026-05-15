// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'pilji_bestial_wrath': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 야수 폭주: 소환수 공격력 2배 버프 (30초, skillTimer로 플래그)
            const myS = engine.state.summons.filter(s => s.isAlive && s.summonerId === hero.id);
            if (myS.length > 0) {
              for (const s of myS) {
                s.atk = Math.round(s.atk * 2.0);
              }
              engine.spawnExplosion(hero.position.x, hero.position.y, '#4d7c0f', 120);
              if (!hero.skillTimers) hero.skillTimers = {};
              hero.skillTimers['pilji_wrath_active'] = 30;
              return true;
            }
            
          
    }
    return false;
  },
  'pilji_piercing_shot': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 관통 사격: 단일 ATK×8 방어 무시 강타
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 8);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 30, dmg, '#fbbf24');
              engine.spawnExplosion(target.position.x, target.position.y, '#b45309', 50);
              if (target.hp <= 0) { target.hp = 0; target.isAlive = false; engine.addScore(getMonsterScore(target, 1)); engine.addGold(getMonsterGold(target, 1)); }
              // 저격수의 집중 과부하: {value}% 확률로 재발동
              if (hero.equippedSkillIds?.includes('unique_pilji_marksmanship') && Math.random() < (hero.uniqueSkillValue ?? 15) / 100) {
                const dmg2 = Math.round(hero.atk * 3);
                if (target.isAlive) {
                  target.hp -= dmg2;
                  engine.addMeterDamage(hero.id, null, dmg2);
                  engine.addDamageNumber(target.position.x, target.position.y - 40, dmg2, '#fcd34d');
                  if (target.hp <= 0) { target.hp = 0; target.isAlive = false; engine.addScore(getMonsterScore(target, 1)); engine.addGold(getMonsterGold(target, 1)); }
                }
              }
              return true;
            }
            
          
    }
    return false;
  },
  'pilji_kill_shot': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 처형 사격: HP 40% 이하 적 즉사 or ATK×12
            const killTarget = validTargets.find(m => m.hp / m.maxHp <= 0.40) ?? validTargets[0];
            if (killTarget) {
              const isExecute = killTarget.hp / killTarget.maxHp <= 0.40 && killTarget.monsterType !== 'boss';
              if (isExecute) {
                const finalDmg = killTarget.hp;
                killTarget.hp = 0; killTarget.isAlive = false;
                engine.addMeterDamage(hero.id, null, finalDmg);
                engine.addDamageNumber(killTarget.position.x, killTarget.position.y - 35, finalDmg, '#ef4444');
                engine.addScore(getMonsterScore(killTarget, 1));
                engine.addGold(getMonsterGold(killTarget, 1));
              } else {
                const dmg = Math.round(hero.atk * 12);
                killTarget.hp -= dmg;
                engine.addMeterDamage(hero.id, null, dmg);
                engine.addDamageNumber(killTarget.position.x, killTarget.position.y - 35, dmg, '#dc2626');
                engine.spawnExplosion(killTarget.position.x, killTarget.position.y, '#b91c1c', 60);
                if (killTarget.hp <= 0) { killTarget.hp = 0; killTarget.isAlive = false; engine.addScore(getMonsterScore(killTarget, 1)); engine.addGold(getMonsterGold(killTarget, 1)); }
              }
              return true;
            }
            
          
    }
    return false;
  },
  'pilji_binding_shot': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 올가미: 단일 3초 속박(기절)
            const bTarget = validTargets[0];
            if (bTarget && !bTarget.immuneToCc) {
              bTarget.isStunned = true;
              bTarget.stunTimer = Math.max(bTarget.stunTimer, 3.0);
              engine.addDamageNumber(bTarget.position.x, bTarget.position.y - 20, 0, '#22c55e');
              engine.spawnExplosion(bTarget.position.x, bTarget.position.y, '#166534', 50);
              return true;
            } else if (bTarget) { return true; }
            
          
    }
    return false;
  },
  'pilji_explosive_trap': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 폭발 함정: 주변 150px ATK×3 + 3초 슬로우
            const trapTargets = validTargets.filter(m => engine.distance(hero.position, m.position) <= 200);
            const dmg = Math.round(hero.atk * 3);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#16a34a', 200);
            for (const m of trapTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#4ade80');
              if (!m.immuneToCc) { m.isSlowed = true; m.slowTimer = Math.max(m.slowTimer, 3.0); }
              if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
            }
            return validTargets.length > 0;
            
          
    }
    return false;
  },
  'pilji_mongoose_bite': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 몽구스 한입: 단일 ATK×6 + 2초 기절
            const mTarget = validTargets[0];
            if (mTarget) {
              const dmg = Math.round(hero.atk * 6);
              mTarget.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(mTarget.position.x, mTarget.position.y - 25, dmg, '#22c55e');
              engine.spawnExplosion(mTarget.position.x, mTarget.position.y, '#15803d', 60);
              if (!mTarget.immuneToCc) { mTarget.isStunned = true; mTarget.stunTimer = Math.max(mTarget.stunTimer, 2.0); }
              if (mTarget.hp <= 0) { mTarget.hp = 0; mTarget.isAlive = false; engine.addScore(getMonsterScore(mTarget, 1)); engine.addGold(getMonsterGold(mTarget, 1)); }
              return true;
            }
            
          
    }
    return false;
  },
};
