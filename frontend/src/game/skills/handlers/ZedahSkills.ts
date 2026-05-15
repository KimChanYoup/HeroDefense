// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'zedah_hellfire_slash': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            // 지옥불 베기: 전방 160px 광역 화염 ATK×4
            const dmg = Math.round(hero.atk * 4);
            engine.spawnExplosion(hero.position.x, hero.position.y, '#ea580c', 160);
            const inRange = validTargets.filter(m => engine.distance(hero.position, m.position) <= 160);
            for (const m of inRange) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, null, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 10, dmg, '#f97316');
              if (m.hp <= 0) { m.hp = 0; m.isAlive = false; engine.addScore(getMonsterScore(m, 1)); engine.addGold(getMonsterGold(m, 1)); }
            }
            return inRange.length > 0;
            if (!casted && validTargets.length > 0) return true; // 시전 시도 = 쿨 소비
            
          
    }
    return false;
  },
};
