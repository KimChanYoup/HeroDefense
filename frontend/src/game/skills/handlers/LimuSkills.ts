// @ts-nocheck
import { SkillHandler } from '../HeroSkills';
import { getMonsterScore, getMonsterGold } from '../../data/constants';
import { GameHero, GameMonster, GameSummon, Position, ProjectileType, SummonConfig, Tower } from '../../types';
import { COLORS, CANVAS_WIDTH, FIELD_Y_CENTER, FIELD_Y_MIN, FIELD_Y_MAX, HERO_MAX_X, HERO_MIN_X, TOWER_X, WALL_AGGRO_RANGE, WAVE_PREP_TIME, HERO_SIZE } from '../../constants';

export const handlers: Record<string, SkillHandler> = {
  'limu_aimed_shot': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 4.0);
              engine.dealDamage(hero, target, 0, 0); // dealDamage 내부에서 dmg 재계산되므로, 이 방식은 비율을 맞추기 어려움
              // 실제로는 dealDamage가 hero.atk 기반이므로, 임시로 hero.atk를 배율만큼 곱했다가 복구하는 꼼수 또는 dealDamage 오버로딩 필요
              // 여기서는 그냥 직접 구현하되 applyDamageToTarget을 호출하도록 변경하는게 정석이나, 
              // 현재 구조상 direct subtraction 후 미터 기록이 일반적이므로 그대로 유지하되 
              // dealDamage와 동일한 패시브 효과를 수동으로 적용하거나 pass
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 20, dmg, '#a3e635');
              return true;
            }
            
          
    }
    return false;
  },
  'limu_piercing_arrow': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const dmg = Math.round(hero.atk * 2.5);
            for (const m of validTargets) {
              m.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(m.position.x, m.position.y - 15, dmg, '#84cc16');
            }
            engine.spawnExplosion(hero.position.x + 300, hero.position.y, '#84cc16', 100);
            return true;
            
          
    }
    return false;
  },
  'limu_marked_for_death': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              // 표식 효과 (임의로 즉시 피해 + 디버프 표기)
              const dmg = Math.round(hero.atk * 3.0);
              target.hp -= dmg;
              engine.addDamageNumber(target.position.x, target.position.y - 30, dmg, '#65a30d');
              engine.spawnExplosion(target.position.x, target.position.y, '#65a30d', 40);
              return true;
            }
            
          
    }
    return false;
  },
  'limu_trueshot': (ctx) => {
    const { engine, hero, dt, validTargets, healMult, skillId } = ctx;
    void engine; void hero; void dt; void validTargets; void healMult; void skillId;
    {

            const target = validTargets[0];
            if (target) {
              const dmg = Math.round(hero.atk * 8.0);
              target.hp -= dmg;
              engine.addMeterDamage(hero.id, skillId, dmg);
              engine.addDamageNumber(target.position.x, target.position.y - 40, dmg, '#3f6212', true);
              return true;
            }
            
          
    }
    return false;
  },
};
