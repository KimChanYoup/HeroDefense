// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'iskier_frost_nova': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 프로스트 노바: 주변 120px 적 3초 슬로우
            engine.spawnExplosion(hero.position.x, hero.position.y, '#06b6d4', 120);
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 120);
            for (const m of inRange) {
              if (!m.immuneToCc) {
                m.isSlowed = true;
                m.slowTimer = Math.max(m.slowTimer, 3.0);
              }
            }
            return true;
            
          
    }
    return false;
  },
  'iskier_fireball': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 화염구: 타겟 주변 80px AoE ATK×5
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5);
              engine.spawnExplosion(target.position.x, target.position.y, '#f97316', 80);
              const inRange = validTargets.filter(m => engine.distance(target.position, m.position) <= 80);
              for (const m of inRange) {
                m.hp -= dmg;
                engine.addMeterDamage(hero.id, null, dmg);
                engine.addDamageNumber(m.position.x, m.position.y - 10, dmg, '#f97316');
                if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
              }
              return true;
            }
            
          
    }
    return false;
  },
  'iskier_meteor': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 운석 낙하: 단일 ATK×12 + 주변 50% 피해
            const target = validTargets.find(m => m.monsterType === 'boss') ?? validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 12);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 30, dmg, '#7c2d12');
              engine.spawnExplosion(target.position.x, target.position.y, '#7c2d12', 100);
              const splashDmg = Math.round(dmg * 0.5);
              for (const m of validTargets) {
                if (m.id === target.id) continue;
                if (engine.distance(target.position, m.position) <= 100) {
                  m.hp -= splashDmg;
                  engine.addMeterDamage(hero.id, null, splashDmg);
                  engine.addDamageNumber(m.position.x, m.position.y - 10, splashDmg, '#dc2626');
                  if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
                }
              }
              if (target.hp <= 0) { target.hp = 0; target.isAlive = false; engine.addScore(getMonsterScore(target, 1)); engine.addGold(getMonsterGold(target, 1)); }
              return true;
            }
            
          
    }
    return false;
  },
  'iskier_arcane_missiles': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 비전 미사일: ATK×1.5 투사체 5발 연속 발사
            const dmg = Math.round(hero.atk * 1.5);
            const targets = [...validTargets].sort((a, b) => engine.distance(hero.position, a.position) - engine.distance(hero.position, b.position));
            for (let i = 0; i < 5; i++) {
              const t = targets[i % targets.length];
              if (t) engine.spawnProjectile(hero, t.id, 'fireball', dmg);
            }
            return true;
            
          
    }
    return false;
  },
  'iskier_arcane_barrage': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 비전 집중포격: ATK×3 투사체 3발 발사 (3개 다른 타겟)
            const dmg = Math.round(hero.atk * 3);
            for (let i = 0; i < 3 && i < validTargets.length; i++) {
              engine.spawnProjectile(hero, validTargets[i].id, 'fireball', dmg);
            }
            return true;
            
          
    }
    return false;
  },
  'iskier_arcane_surge': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 비전 쇄도: 전체 적에게 ATK×4 비전 폭격
            const dmg = Math.round(hero.atk * 4);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#a855f7', 400);
            for (const m of validTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 10, dmg, '#c084fc');
              if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
            }
            return true;
            
          
    }
    return false;
  },
};
