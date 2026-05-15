import { WallTalentEffects } from './types';

export type WallTalentCategory       = 'steel' | 'fire' | 'frost' | 'life' | 'thunder';
export type SecondWallTalentCategory  = 'light' | 'shadow' | 'nature' | 'blood' | 'time';
export type ThirdWallTalentCategory   = 'wind'  | 'earth' | 'arcane' | 'void'  | 'storm';

export interface WallTalent {
  id: string;
  name: string;
  description: string;
  nameKey: string;
  descriptionKey: string;
  nameParams: Record<string, number | string>;
  descParams: Record<string, number | string>;
  category: WallTalentCategory | SecondWallTalentCategory | ThirdWallTalentCategory;
  cost: number;
  maxRank: number;
  requires?: string;
  pos: { x: number; y: number };
  effects: WallTalentEffects;
}

// ── 제 1의 벽 ──
const FIRST_WALL_CATEGORIES: WallTalentCategory[] = ['steel', 'fire', 'frost', 'life', 'thunder'];
export const WALL_TALENTS: WallTalent[] = [];

// ── 제 2의 벽 ──
const SECOND_WALL_CATEGORIES: SecondWallTalentCategory[] = ['light', 'shadow', 'nature', 'blood', 'time'];
export const SECOND_WALL_TALENTS: WallTalent[] = [];

// ── 제 3의 벽 ──
const THIRD_WALL_CATEGORIES: ThirdWallTalentCategory[] = ['wind', 'earth', 'arcane', 'void', 'storm'];
export const THIRD_WALL_TALENTS: WallTalent[] = [];

function generateTalents(
  categories: string[],
  wallNumber: 1 | 2 | 3,
  targetArray: WallTalent[]
) {
  categories.forEach((cat, catIdx) => {
    const x = 10 + catIdx * 20;

    for (let tier = 1; tier <= 30; tier++) {
      const id     = `${cat}_${tier}`;
      const prevId = tier > 1 ? `${cat}_${tier - 1}` : undefined;
      const cost   = Math.floor(100 * Math.pow(1.2, tier - 1));
      const y      = tier * 3;

      let name        = '';
      let description = '';
      let nameKey        = '';
      let descriptionKey = '';
      let nameParams: Record<string, number | string> = {};
      let descParams: Record<string, number | string> = {};
      let effects: WallTalentEffects = {};

      if (wallNumber === 1) {
        switch (cat) {
          case 'steel':
            name = `강철의 의지 ${tier}단계`;
            description = `벽 체력 +${tier * 200}, 방어력 +${tier * 5}`;
            effects = { hpBonus: tier * 200, defBonus: tier * 5 };
            nameKey = 'wall.talent.steel.regularName';
            nameParams = { tier };
            descriptionKey = 'wall.talent.steel.regularDesc';
            descParams = { hp: tier * 200, def: tier * 5 };
            if (tier % 5 === 0) {
              name = `가시 갑옷 ${tier / 5}성`;
              description += `, 반사 데미지 +${tier}%`;
              effects.reflectPct = tier;
              nameKey = 'wall.talent.steel.specialName';
              nameParams = { star: tier / 5 };
              descriptionKey = 'wall.talent.steel.specialDesc';
              descParams = { hp: tier * 200, def: tier * 5, reflect: tier };
            }
            break;
          case 'fire':
            name = `화염의 숨결 ${tier}단계`;
            description = `접근한 적에게 매초 ${tier * 10} 화염 피해`;
            effects = { auraDamage: tier * 10 };
            nameKey = 'wall.talent.fire.name';
            nameParams = { tier };
            descriptionKey = 'wall.talent.fire.desc';
            descParams = { dmg: tier * 10 };
            break;
          case 'frost':
            name = `얼어붙은 성벽 ${tier}단계`;
            description = `접근한 적 공속/이속 ${Math.min(tier * 2, 60)}% 감소`;
            effects = { auraSlowPct: Math.min(tier * 2, 60), slowZone: 'wall' };
            nameKey = 'wall.talent.frost.name';
            nameParams = { tier };
            descriptionKey = 'wall.talent.frost.desc';
            descParams = { slow: Math.min(tier * 2, 60) };
            break;
          case 'life': {
            name = `생명의 맥박 ${tier}단계`;
            description = `매 웨이브 종료 시 벽 체력 ${tier * 50} 회복`;
            effects = { recoveryPerWave: tier * 50 };
            nameKey = 'wall.talent.life.regularName';
            nameParams = { tier };
            descriptionKey = 'wall.talent.life.regularDesc';
            descParams = { hp: tier * 50 };
            if (tier % 10 === 0) {
              const star = tier / 10;
              const revivePct = star === 1 ? 0.3 : star === 2 ? 0.6 : 1.0;
              name = `수호자의 은혜 ${star}성`;
              description += `, 아군 전체 방어력 +${tier}`;
              description += `, 웨이브 종료 시 사망 아군 전원 HP ${revivePct * 100}%로 부활`;
              effects.heroDefBonus = tier;
              effects.reviveAllPct = revivePct;
              nameKey = 'wall.talent.life.specialName';
              nameParams = { star };
              descriptionKey = 'wall.talent.life.specialDesc';
              descParams = { hp: tier * 50, def: tier, revive: revivePct * 100 };
            }
            break;
          }
          case 'thunder':
            name = `정전기장 ${tier}단계`;
            description = `적 투사체 차단 확률 ${Math.min(tier, 50)}%`;
            effects = { projectileBlockPct: Math.min(tier, 50) / 100 };
            nameKey = 'wall.talent.thunder.regularName';
            nameParams = { tier };
            descriptionKey = 'wall.talent.thunder.regularDesc';
            descParams = { pct: Math.min(tier, 50) };
            if (tier % 5 === 0) {
              name = `벼락 반격 ${tier / 5}성`;
              description += `, 반격 시 ${tier * 15} 번개 피해`;
              effects.lightningReflect = tier * 15;
              nameKey = 'wall.talent.thunder.specialName';
              nameParams = { star: tier / 5 };
              descriptionKey = 'wall.talent.thunder.specialDesc';
              descParams = { pct: Math.min(tier, 50), dmg: tier * 15 };
            }
            break;
        }

      } else if (wallNumber === 2) {
        switch (cat) {
          case 'light':
            name = `성역의 빛 ${tier}단계`;
            description = `제 1·2 벽 동시 지속 회복량 +${tier * 10}`;
            effects = { lightHealBothWalls: tier * 10 };
            nameKey = 'wall.talent.light.name';
            nameParams = { tier };
            descriptionKey = 'wall.talent.light.desc';
            descParams = { val: tier * 10 };
            break;
          case 'shadow':
            name = `공허의 심연 ${tier}단계`;
            description = `주변 체력 ${Math.min(tier * 0.5, 15).toFixed(0)}% 이하 몬스터 즉사`;
            effects = { shadowExecute: Math.min(tier * 0.5, 15) };
            nameKey = 'wall.talent.shadow.name';
            nameParams = { tier };
            descriptionKey = 'wall.talent.shadow.desc';
            descParams = { pct: Math.min(tier * 0.5, 15).toFixed(0) };
            break;
          case 'nature':
            name = `맹독 가시 덩굴 ${tier}단계`;
            description = `주변 적에게 초당 ${tier * 15} 독 피해`;
            effects = { naturePoisonAura: tier * 15 };
            nameKey = 'wall.talent.nature.name';
            nameParams = { tier };
            descriptionKey = 'wall.talent.nature.desc';
            descParams = { dmg: tier * 15 };
            break;
          case 'blood':
            name = `흡혈의 벽 ${tier}단계`;
            description = `주변 적이 입는 피해의 ${tier}%를 벽 체력으로 흡수`;
            effects = { bloodVampireAura: tier };
            nameKey = 'wall.talent.blood.name';
            nameParams = { tier };
            descriptionKey = 'wall.talent.blood.desc';
            descParams = { pct: tier };
            break;
          case 'time':
            name = `시간 왜곡 ${tier}단계`;
            description = `모든 아군의 스킬 쿨타임 ${Math.min(tier, 30)}% 감소`;
            effects = { timeCooldownReduction: Math.min(tier, 30) };
            nameKey = 'wall.talent.time.name';
            nameParams = { tier };
            descriptionKey = 'wall.talent.time.desc';
            descParams = { pct: Math.min(tier, 30) };
            break;
        }

      } else {
        // 제 3의 벽
        switch (cat) {
          case 'wind':
            name = `질풍의 가호 ${tier}단계`;
            description = `아군 이동속도 +${tier}%, 공격 쿨타임 -${Math.min(tier, 30)}%`;
            effects = {
              heroSpdBonusPct: tier,
              heroAtkSpeedBonusPct: Math.min(tier, 30),
            };
            nameKey = 'wall.talent.wind.regularName';
            nameParams = { tier };
            descriptionKey = 'wall.talent.wind.regularDesc';
            descParams = { spd: tier, atkspd: Math.min(tier, 30) };
            if (tier % 10 === 0) {
              name = `폭풍 질주 ${tier / 10}성`;
              description += ` — 아군 이동속도가 극대화됩니다`;
              nameKey = 'wall.talent.wind.specialName';
              nameParams = { star: tier / 10 };
              descriptionKey = 'wall.talent.wind.specialDesc';
              descParams = {};
            }
            break;
          case 'earth':
            name = `대지의 요새 ${tier}단계`;
            description = `벽 체력 +${tier * 500}, 웨이브 시작 시 전방 ${tier * 80} 지진 피해`;
            effects = {
              earthHpBonus: tier * 500,
              massEarthquake: tier * 80,
            };
            nameKey = 'wall.talent.earth.regularName';
            nameParams = { tier };
            descriptionKey = 'wall.talent.earth.regularDesc';
            descParams = { hp: tier * 500, dmg: tier * 80 };
            if (tier % 5 === 0) {
              name = `지각 분쇄 ${tier / 5}성`;
              description += `, 추가 방어력 +${tier * 3}`;
              effects.defBonus = tier * 3;
              nameKey = 'wall.talent.earth.specialName';
              nameParams = { star: tier / 5 };
              descriptionKey = 'wall.talent.earth.specialDesc';
              descParams = { hp: tier * 500, dmg: tier * 80, def: tier * 3 };
            }
            break;
          case 'arcane':
            name = `비전 증폭 ${tier}단계`;
            description = `아군 투사체·스킬 피해 +${tier * 2}%, 적 사망 시 ${tier * 60} 마법 폭발`;
            effects = {
              arcaneAmpPct: tier * 2,
              arcaneExplosion: tier * 60,
            };
            nameKey = 'wall.talent.arcane.regularName';
            nameParams = { tier };
            descriptionKey = 'wall.talent.arcane.regularDesc';
            descParams = { amp: tier * 2, explosion: tier * 60 };
            if (tier % 10 === 0) {
              name = `마력 공명 ${tier / 10}성`;
              description += ` — 마법 피해가 폭발적으로 증폭됩니다`;
              nameKey = 'wall.talent.arcane.specialName';
              nameParams = { star: tier / 10 };
              descriptionKey = 'wall.talent.arcane.specialDesc';
              descParams = {};
            }
            break;
          case 'void':
            name = `공허 약화 ${tier}단계`;
            description = `적 공격력 -${Math.min(tier * 1.5, 45).toFixed(0)}%, 적 처치 시 벽 체력 ${tier * 8} 회복`;
            effects = {
              voidWeaken: Math.min(tier * 1.5, 45),
              voidHealOnKill: tier * 8,
            };
            nameKey = 'wall.talent.void.regularName';
            nameParams = { tier };
            descriptionKey = 'wall.talent.void.regularDesc';
            descParams = { weak: Math.min(tier * 1.5, 45).toFixed(0), heal: tier * 8 };
            if (tier % 5 === 0) {
              name = `심연의 공포 ${tier / 5}성`;
              description += ` — 공허의 힘이 적을 압도합니다`;
              nameKey = 'wall.talent.void.specialName';
              nameParams = { star: tier / 5 };
              descriptionKey = 'wall.talent.void.specialDesc';
              descParams = { weak: Math.min(tier * 1.5, 45).toFixed(0), heal: tier * 8 };
            }
            break;
          case 'storm': {
            name = `폭풍 연속격 ${tier}단계`;
            description = `주변 적에게 초당 ${tier * 12} 폭풍 피해, ${Math.min(tier, 15)}개 적에게 연쇄`;
            effects = {
              stormAuraDmg: tier * 12,
              stormChainCount: Math.min(tier, 15),
            };
            nameKey = 'wall.talent.storm.regularName';
            nameParams = { tier };
            descriptionKey = 'wall.talent.storm.regularDesc';
            descParams = { dmg: tier * 12, chain: Math.min(tier, 15) };
            if (tier % 10 === 0) {
              const star = tier / 10;
              name = `천공 폭풍 ${star}성`;
              description += ` — 근딜 영웅이 공격 시 반경 ${star * 40}px 광역 50% 추가 피해!`;
              nameKey = 'wall.talent.storm.specialName';
              nameParams = { star };
              descriptionKey = 'wall.talent.storm.special10Desc';
              descParams = { dmg: tier * 12, chain: Math.min(tier, 15), radius: star * 40 };
            } else if (tier % 5 === 0) {
              name = `천공 폭풍 ${tier / 5}성`;
              description += ` — 번개와 바람이 전장을 휩쓸습니다`;
              nameKey = 'wall.talent.storm.specialName';
              nameParams = { star: tier / 5 };
              descriptionKey = 'wall.talent.storm.special5Desc';
              descParams = { dmg: tier * 12, chain: Math.min(tier, 15) };
            }
            break;
          }
        }
      }

      targetArray.push({
        id,
        name,
        description,
        nameKey,
        descriptionKey,
        nameParams,
        descParams,
        category: cat as WallTalentCategory | SecondWallTalentCategory | ThirdWallTalentCategory,
        cost,
        maxRank: 1,
        requires: prevId,
        pos: { x, y },
        effects,
      });
    }
  });
}

generateTalents(FIRST_WALL_CATEGORIES,  1, WALL_TALENTS);
generateTalents(SECOND_WALL_CATEGORIES, 2, SECOND_WALL_TALENTS);
generateTalents(THIRD_WALL_CATEGORIES,  3, THIRD_WALL_TALENTS);
