// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'lomb_havoc_fel_rush': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 3.5);
            engine.spawnExplosion(hero.position.x + 120, hero.position.y, '#c026d3', 250);
            const inPath = validTargets.filter(m => m.position.x > hero.position.x && m.position.x < hero.position.x + 250);
            for (const m of inPath) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#c026d3');
            }
            return true;
            
          
    }
    return false;
  },
  'lomb_havoc_blade_dance': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 4.0);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#a855f7', 150);
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 150);
            for (const m of inRange) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#a855f7');
            }
            // 1초간 회피 (스킬 타이머로 체크)
            return true;
            
          
    }
    return false;
  },
  'lomb_havoc_eye_beam': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 8.0); // 2초간 틱 데미지 합산
            engine.spawnExplosion(hero.position.x + 150, hero.position.y, '#9333ea', 300);
            const forwardTargets = validTargets.filter(m => m.position.x > hero.position.x && m.position.x < hero.position.x + 400);
            for (const m of forwardTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 25, dmg, '#9333ea');
            }
            return true;
            
          
    }
    return false;
  },
  'lomb_havoc_metamorphosis': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 10.0, color: 'rgba(107, 33, 168, 0.3)' });
            return true;
            
          
    }
    return false;
  },
  'lomb_havoc_the_hunt': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 15.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 40, dmg, '#581c87');
              engine.spawnExplosion(target.position.x, target.position.y, '#581c87', 100);
              return true;
            }
            
          
    }
    return false;
  },
  'lomb_ven_shear': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3.5);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#ef4444');
              // 영혼 파편 생성 (로직상 스택으로 관리)
              hero.skillTimers!['lomb_soul_fragments'] = (hero.skillTimers!['lomb_soul_fragments'] ?? 0) + 1;
              engine.addDamageNumber(hero.position.x, hero.position.y - 30, 1, '#22c55e', false); // 파편 +1 시각화
              return true;
            }
            
          
    }
    return false;
  },
  'lomb_ven_soul_cleave': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 3.0);
            engine.spawnExplosion(hero.position.x + 50, hero.position.y, '#dc2626', 150);
            const inRange = validTargets.filter(m => m.position.x > hero.position.x - 20 && engine.distance(hero.position, m.position) <= 150);
            for (const m of inRange) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#dc2626');
            }
            // 파편 소모 및 회복
            const fragments = hero.skillTimers!['lomb_soul_fragments'] ?? 0;
            if (fragments > 0) {
              const healAmt = Math.round(hero.maxHp * 0.08 * fragments);
              engine.applyDirectHeal(hero, hero, healAmt, 'hero', '#22c55e');
              hero.skillTimers!['lomb_soul_fragments'] = 0;
            }
            return true;
            
          
    }
    return false;
  },
  'lomb_ven_sigil_flame': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.spawnExplosion(hero.position.x + 100, hero.position.y, '#b91c1c', 180);
            // 바닥 도트 데미지는 updateTowerEffects나 유사한 곳에서 처리해야 하지만 일단 즉발 광역으로.
            const dmg = Math.round(hero.atk * 9.0); // 1.5 * 6초분량
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 250);
            for (const m of inRange) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 20, dmg, '#f97316');
            }
            return true;
            
          
    }
    return false;
  },
  'lomb_ven_demon_spikes': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            engine.state.healingFlashes.push({ x: hero.position.x, y: hero.position.y, timer: 6.0, color: 'rgba(153, 27, 27, 0.4)' });
            return true;
            
          
    }
    return false;
  },
  'lomb_ven_soul_carving': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 8.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#7f1d1d');
              hero.skillTimers!['lomb_soul_fragments'] = (hero.skillTimers!['lomb_soul_fragments'] ?? 0) + 3;
              engine.addDamageNumber(hero.position.x, hero.position.y - 30, 3, '#22c55e', false);
              return true;
            }
            
          
    }
    return false;
  },
  'lomb_ven_elysian_decree': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 12.0);
            engine.spawnExplosion(hero.position.x + 150, hero.position.y, '#450a0a', 250);
            for (const m of validTargets.filter(m => engine.distance(hero.position, m.position) <= 300)) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 30, dmg, '#ef4444');
            }
            hero.skillTimers!['lomb_soul_fragments'] = (hero.skillTimers!['lomb_soul_fragments'] ?? 0) + 3;
            return true;
            
          
    }
    return false;
  },
};
