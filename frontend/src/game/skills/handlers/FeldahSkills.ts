// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'feldah_sacrifice': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 제물: 전체 적에게 주기적 틱 데미지 (방어 무시)
            const dmg = Math.round(hero.atk * 1.5);
            // 필드 전체에 보라색/빨간색 파장 효과 (중앙에서 크게)
            engine.spawnExplosion(CANVAS_WIDTH / 2, FIELD_Y_CENTER, '#b91c1c', 500);
            for (const m of validTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 10, dmg, '#ef4444');
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
  'feldah_chaos_bolt': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 혼돈의 화살: 단일 대상 방어 무시 강타 (ATK×8)
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 8);
              engine.spawnProjectile(hero, target.id, 'shadow_bolt', dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#7f1d1d');
              return true;
            }
            
          
    }
    return false;
  },
  'feldah_corruption': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 광역 부패: 전체 적에게 지속 피해 틱
            const dmg = Math.round(hero.atk * 1.0);
            // 부패는 전체에 어두운 녹색 파장
            engine.spawnExplosion(CANVAS_WIDTH / 2, FIELD_Y_CENTER, '#065f46', 450);
            for (const m of validTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 10, dmg, '#059669');
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
  'feldah_curse_fatigue': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 광역 피로: 전체 적 이속 감소 (6초)
            engine.spawnExplosion(hero.position.x, hero.position.y, '#047857', 400);
            for (const m of validTargets) {
              if (!m.immuneToCc) {
                m.isSlowed = true;
                m.slowTimer = Math.max(m.slowTimer, 6.0);
              }
            }
            return true;
            
          
    }
    return false;
  },
  'feldah_agony': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 고통의 저주: 단일 타겟 점증 피해 (스택당 +50%)
            const target = validTargets[0];
            if (target) {
              if (!hero.skillTimers) hero.skillTimers = {};
              const stacks = Math.min((hero.skillTimers['feldah_agony_stacks'] ?? 0) + 1, 10);
              hero.skillTimers['feldah_agony_stacks'] = stacks;
              const dmg = Math.round(hero.atk * 0.8 * (1 + stacks * 0.5));
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 15, dmg, '#065f46');
              // 고통의 저주는 대상에게 작은 암흑 폭발
              engine.spawnExplosion(target.position.x, target.position.y, '#065f46', 40);
              if (target.hp <= 0) {
                target.hp = 0;
                target.isAlive = false;
                engine.addScore(getMonsterScore(target, 1));
                engine.addGold(getMonsterGold(target, 1));
                engine.applyThirdWallOnKill(target);
              }
              return true;
            }
            
          
    }
    return false;
  },
};
