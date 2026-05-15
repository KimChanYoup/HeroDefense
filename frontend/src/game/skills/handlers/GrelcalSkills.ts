// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'grelcal_shockwave': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 충격파: 주변 160px 내 모든 적 1.5초 기절
            engine.spawnExplosion(hero.position.x, hero.position.y, '#92400e', 160);
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 160);
            for (const m of inRange) {
              if (!m.immuneToCc) {
                m.isStunned = true;
                m.stunTimer = Math.max(m.stunTimer, 1.5);
              }
            }
            return true;
            
          
    }
    return false;
  },
  'grelcal_rend': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 찢어발기기: 단일 타겟 ATK×3 피해, HP 25% 이하면 즉사
            const target = validTargets[0];
            if (target) {
              if (target.hp / target.maxHp < 0.25 && target.monsterType !== 'boss') {
                const execDmg = target.hp;
                target.hp = 0;
                target.isAlive = false;
                engine.addScore(getMonsterScore(target, 1));
                engine.addGold(getMonsterGold(target, 1));
                engine.addDamageNumber(target.position.x, target.position.y - 20, execDmg, '#7f1d1d');
                engine.addMeterDamage(hero.id, null, execDmg);
              } else {
                const dmg = Math.round(hero.atk * 3);
                target.hp -= dmg;
                engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#dc2626');
                engine.addMeterDamage(hero.id, null, dmg);
                if (target.hp <= 0) { target.hp = 0; target.isAlive = false; engine.addScore(getMonsterScore(target, 1)); engine.addGold(getMonsterGold(target, 1)); }
              }
              return true;
            }
            
          
    }
    return false;
  },
};
