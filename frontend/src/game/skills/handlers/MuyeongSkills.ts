// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'muyeong_outlaw_pistol': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.5);
              engine.spawnProjectile(hero, target.id, 'fireball', dmg, '#f97316'); // 권총 사격
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#f97316');
              if (!target.immuneToCc) {
                target.isSlowed = true;
                target.slowTimer = Math.max(target.slowTimer, 3.0);
              }
              return true;
            }
            
          
    }
    return false;
  },
  'muyeong_outlaw_between_eyes': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 6.0);
              engine.spawnProjectile(hero, target.id, 'fireball', dmg, '#f59e0b');
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#f59e0b');
              if (!target.immuneToCc) {
                target.isStunned = true;
                target.stunTimer = Math.max(target.stunTimer, 2.0);
              }
              return true;
            }
            
          
    }
    return false;
  },
  'muyeong_outlaw_dreadblades': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 10.0, color: 'rgba(194, 65, 12, 0.3)' });
            return true;
            
          
    }
    return false;
  },
  'muyeong_ass_garrote': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 4.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#22c55e');
              // 침묵 효과는 일단 스턴 1초로 대체
              if (!target.immuneToCc) {
                target.isStunned = true;
                target.stunTimer = Math.max(target.stunTimer, 1.0);
              }
              return true;
            }
            
          
    }
    return false;
  },
  'muyeong_ass_envenom': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              // 독 대상 여부 체크는 간략화하여 상시 적용하거나 DoT 체크
              const dmg = Math.round(hero.atk * 10.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 30, dmg, '#15803d');
              engine.spawnExplosion(target.position.x, target.position.y, '#15803d', 60);
              return true;
            }
            
          
    }
    return false;
  },
  'muyeong_ass_kingsbane': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              // 14초간 도트 피해를 즉발 광역 형식으로 주기적으로 발생 (여기서는 단순화)
              const dmg = Math.round(hero.atk * 2.0);
              engine.applyHoT(target as any, -dmg, 14, 'monster' as any, '#064e3b');
              return true;
            }
            
          
    }
    return false;
  },
  'muyeong_sub_shadowstrike': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              // 타겟 뒤로 순간이동 (디스플레이상 효과만)
              hero.position.x = target.position.x - 30;
              hero.position.y = target.position.y;
              const dmg = Math.round(hero.atk * 4.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#a78bfa');
              if (!target.immuneToCc) {
                target.isStunned = true;
                target.stunTimer = Math.max(target.stunTimer, 1.0);
              }
              return true;
            }
            
          
    }
    return false;
  },
  'muyeong_sub_symbols': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 8.0, color: 'rgba(109, 40, 217, 0.3)' });
            return true;
            
          
    }
    return false;
  },
  'muyeong_sub_secret_tech': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 12.0);
            engine.spawnExplosion(hero.position.x + 100, hero.position.y, '#4c1d95', 200);
            for (const m of validTargets.filter(m => engine.distance(hero.position, m.position) <= 250)) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 25, dmg, '#8b5cf6');
            }
            return true;
            
          
    }
    return false;
  },
};
