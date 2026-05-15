// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'irene_arcane_blast': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 비전 폭발: 단일 타겟 ATK×5 비전 강타
            const target = validTargets.find(m => m.monsterType === 'boss') ?? validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 5);
              engine.spawnProjectile(hero, target.id, 'fireball', dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 25, dmg, '#8b5cf6');
              return true;
            }
            
          
    }
    return false;
  },
  'irene_mana_burn': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 마법 파쇄: 단일 ATK×3 피해 + 5초 슬로우
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#6d28d9');
              if (!target.immuneToCc) {
                target.isSlowed = true;
                target.slowTimer = Math.max(target.slowTimer, 5.0);
              }
              if (target.hp <= 0) { target.hp = 0; target.isAlive = false; engine.addScore(getMonsterScore(target, 1)); engine.addGold(getMonsterGold(target, 1)); }
              return true;
            }
            
          
    }
    return false;
  },
  'irene_resonance_burst': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 공명 폭발: 타겟 주변 120px AoE ATK×3
            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 3);
              engine.spawnExplosion(target.position.x, target.position.y, '#4c1d95', 120);
              const inRange = validTargets.filter(m => engine.distance(target.position, m.position) <= 120);
              for (const m of inRange) {
                m.hp -= dmg;
                engine.addMeterDamage(hero.id, null, dmg);
                engine.addDamageNumber(m.position.x, m.position.y - 10, dmg, '#7c3aed');
                if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
              }
              return true;
            }
            
          
    }
    return false;
  },
};
