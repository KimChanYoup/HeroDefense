import { Role, SummonConfig, GameHero } from './types';
import { 
  HeroDefinition, 
  HERO_DEFINITIONS, 
  getStarStatMultiplier 
} from './heroData';
import { HERO_SIZE } from './constants';

const ROLE_COOLDOWNS = {
  tank: 1.2,
  melee_fast: 0.5,
  melee_heavy: 1.2,
  ranged_base: 1.5,
  ranged_fast: 0.3,
  healer: 1.8,
  cc: 2.0,
};

export const STAR_MULT = [1.0, 1.10, 1.25, 1.45, 1.70] as const;

function getBaseCooldown(hero: HeroDefinition, role: Role): number {
  if (role === 'tank') return ROLE_COOLDOWNS.tank;
  if (role === 'healer') return ROLE_COOLDOWNS.healer;
  if (role === 'cc') return ROLE_COOLDOWNS.cc;
  
  if (role === 'ranged_dps') {
    if (hero.raceName === '고블린' || hero.raceName === '볼페라') return ROLE_COOLDOWNS.ranged_fast;
    return ROLE_COOLDOWNS.ranged_base;
  }
  
  if (role === 'melee_dps') {
    const heavyRaces = ['오크', '타우렌', '마그하르 오크', '드레나이'];
    if (heavyRaces.includes(hero.raceName)) return ROLE_COOLDOWNS.melee_heavy;
    return ROLE_COOLDOWNS.melee_fast;
  }
  
  return 1.5;
}

export function heroDefToPartialGameHero(
  hero: HeroDefinition,
  starRating: number,
  activeRouteId: string,
  equippedSkillIds: string[] = [],
  overrideRole?: Role,
  isUnsealed?: boolean,
): Omit<GameHero, 'id' | 'position'> {
  const star = Math.max(1, Math.min(5, starRating));
  const mult = STAR_MULT[star - 1 as 0 | 1 | 2 | 3 | 4];
  const statMult = getStarStatMultiplier(star);
  const route = hero.classRoutes.find(r => r.id === activeRouteId) ?? hero.classRoutes[0];
  const finalRole = overrideRole ?? route.role ?? hero.role;
  const activeSpecNames = isUnsealed ? hero.classRoutes.map(r => r.name) : [route.name];

  const finalEquippedSkillIds = [...equippedSkillIds];
  if (isUnsealed) {
    hero.classRoutes.forEach(r => finalEquippedSkillIds.push(`unique_${r.id}`));
  } else {
    finalEquippedSkillIds.push(`unique_${route.id}`);
  }

  // 성급 공속 보너스 계산 (루트별 attackCooldown 오버라이드 우선)
  const baseCooldown = route.attackCooldown ?? getBaseCooldown(hero, finalRole);
  const starBonus = hero.starAtkSpeedBonus || 0;
  const finalCooldown = parseFloat((baseCooldown / (1 + starBonus * (star - 1))).toFixed(3));

  // DPS 기반 데미지 계산: 원딜은 근딜의 3배 DPS
  let finalAtk = Math.round(hero.baseStats.atk * mult);
  if (finalRole === 'ranged_dps') {
    finalAtk *= 3;
  }

  // shared_magic_amp: ATK +30% 패시브 (중복 장착 시 합연산 스택)
  const magicAmpCount = finalEquippedSkillIds.filter(k =>
    k === 'shared_magic_amp' || k.endsWith('__shared_magic_amp')
  ).length;
  if (magicAmpCount > 0) {
    finalAtk = Math.round(finalAtk * (1 + 0.30 * magicAmpCount));
  }

  // 그렉칼 무기 연마: ATK +20%, 공속 +10%
  let finalCooldownAdj = finalCooldown;
  if (finalEquippedSkillIds.includes('grelcal_weapon_mastery')) {
    finalAtk = Math.round(finalAtk * 1.20);
    finalCooldownAdj = parseFloat((finalCooldown * 0.90).toFixed(3));
  }
  // 그렉칼 열상: ATK +50%, DEF -25%
  if (finalEquippedSkillIds.includes('grelcal_lacerate')) {
    finalAtk = Math.round(finalAtk * 1.50);
  }

  // 장착된 스킬 중 소환 스킬 탐지
  const summonConfigs: SummonConfig[] = [];
  if (hero.isProtagonist) {
    for (const skillId of equippedSkillIds) {
      let foundSkill;
      for (const h of HERO_DEFINITIONS) {
        for (const r of h.classRoutes) {
          const s = r.skills.find(k => k.id === skillId);
          if (s) { foundSkill = s; break; }
        }
        if (foundSkill) break;
      }
      if (foundSkill?.summonStats) {
        const s = foundSkill.summonStats;
        summonConfigs.push({
          skillId: foundSkill.id,
          displayName: s.displayName,
          hp: Math.round(s.hp * mult),
          atk: Math.round(s.atk * mult),
          def: s.def,
          spd: s.spd,
          role: s.role,
          attackRange: s.attackRange,
          duration: s.duration,
          color: foundSkill.color,
        });
      }
    }
  } else {
    for (const r of hero.classRoutes) {
      for (const skill of r.skills) {
        const slotKey = skill.isShared ? `${r.id}__${skill.id}` : skill.id;
        if ((equippedSkillIds.includes(skill.id) || equippedSkillIds.includes(slotKey)) && skill.summonStats) {
          const s = skill.summonStats;
          summonConfigs.push({
            skillId: skill.id,
            displayName: s.displayName,
            hp: Math.round(s.hp * mult),
            atk: Math.round(s.atk * mult),
            def: s.def,
            spd: s.spd,
            role: s.role,
            attackRange: s.attackRange,
            duration: s.duration,
            color: skill.color,
          });
        }
      }
    }
  }

  const roleColors: Record<string, string> = {
    tank: '#3B82F6',
    melee_dps: '#EF4444',
    ranged_dps: '#F97316',
    healer: '#22C55E',
    cc: '#A855F7',
  };

  // AR 영웅 패시브 스킬 처리
  // ar_jarlten_undead_aura: ATK +25%, HP +20%
  if (finalEquippedSkillIds.includes('ar_jarlten_undead_aura')) {
    finalAtk = Math.round(finalAtk * 1.25);
  }
  // ar_gorg_avatar_ar: HP 40% 이하 시 ATK +50% (dealDamage에서 처리)
  // ar_val_blood_tap_ar: ATK +40%, HP -15% (아래 finalDef 이후 처리)
  if (finalEquippedSkillIds.includes('ar_val_blood_tap_ar')) {
    finalAtk = Math.round(finalAtk * 1.40);
  }

  // 강철 방패: DEF +25 패시브
  let finalDef = Math.round(hero.baseStats.def * statMult);
  if (finalEquippedSkillIds.includes('zedah_steel_shield')) finalDef += 25;
  // 열상: DEF -25%
  if (finalEquippedSkillIds.includes('grelcal_lacerate')) finalDef = Math.round(finalDef * 0.75);
  // 격곰 변신 (unique_kaern_guardian): DEF +{value}%
  const uniqueSkillValueCalc = hero.uniqueSkill?.baseValues[star - 1] ?? 0;
  if (finalEquippedSkillIds.includes('unique_kaern_guardian')) {
    finalDef = Math.round(finalDef * (1 + uniqueSkillValueCalc / 100));
  }

  // 루트별 공격사거리 오버라이드 (조화 루트 등)
  let finalAttackRange = route.attackRange ?? hero.baseStats.attackRange;
  // unique_durga_marksmanship: 사거리 {value} 증가
  if (finalEquippedSkillIds.includes('unique_durga_marksmanship')) {
    finalAttackRange += (hero.uniqueSkill?.baseValues[star - 1] ?? 50);
  }

  // AR 영웅 HP 패시브 보정
  let finalHp = Math.round(hero.baseStats.hp * mult);
  if (finalEquippedSkillIds.includes('ar_jarlten_undead_aura')) finalHp = Math.round(finalHp * 1.20);
  if (finalEquippedSkillIds.includes('ar_val_blood_tap_ar')) finalHp = Math.round(finalHp * 0.85);

  return {
    heroDefId: hero.id,
    name: hero.name,
    nameKey: hero.nameKey,
    role: finalRole,
    specName: route.name,
    specNameKey: route.nameKey,
    activeSpecNames,
    isUnsealed,
    isArHero: hero.grade === 'AR',
    className: route.name,
    classNameKey: route.nameKey,
    raceName: hero.raceName,
    raceNameKey: hero.raceNameKey,
    elementName: hero.elementName,
    maxHp: finalHp,
    hp: finalHp,
    atk: finalAtk,
    def: finalDef,
    speed: parseFloat((hero.baseStats.spd * statMult).toFixed(2)),
    attackRange: finalAttackRange,
    aggroRadius: finalRole === 'tank' ? 120 : 0,
    threatMult: finalRole === 'tank' ? 5.0 : 1.0,
    battleRhythmCount: finalRole === 'melee_dps' ? 0 : undefined,
    summonConfigs: summonConfigs.length > 0 ? summonConfigs : undefined,
    equippedSkillIds: finalEquippedSkillIds,
    uniqueSkillValue: hero.uniqueSkill?.baseValues[star - 1],
    secondaryRole: equippedSkillIds.includes('feldah_healthstone') ? 'healer' : undefined,
    healTimer: equippedSkillIds.includes('feldah_healthstone') ? 1.0 : undefined,
    healCooldown: 2.0,
    isAlive: true,
    attackCooldown: finalCooldownAdj,
    attackTimer: 0,
    skillTimers: {},
    color: roleColors[finalRole] ?? hero.color,
    size: finalRole === 'tank' ? HERO_SIZE + 4 : HERO_SIZE,
    sprite: hero.sprite,
    gifSprite: hero.gifSprite,
  };
}

export function getTranslatedRace(raceName: string, t: any): string {
  const map: Record<string, string> = {
    '오크': 'synergy.race.orc.name',
    '인간': 'synergy.race.human.name',
    '엘프': 'synergy.race.elf.name',
    '언데드': 'synergy.race.undead.name',
    '타우렌': 'synergy.race.tauren.name',
    '트롤': 'synergy.race.troll.name',
    '판다렌': 'synergy.race.pandaren.name',
    '야수족': 'synergy.race.beast.name',
    '밤엘프': 'synergy.race.nightelf.name',
    '고블린': 'synergy.race.goblin.name',
    '드레나이': 'synergy.race.draenei.name',
    '블러드엘프': 'synergy.race.bloodelf.name',
    '공허엘프': 'synergy.race.voidelf.name',
    '빛벼림 드레나이': 'synergy.race.lightforged.name',
    '노움': 'synergy.race.gnome.name',
    '드렉티르': 'synergy.race.dracthyr.name',
    '마그하르 오크': 'synergy.race.maghar.name',
    '나이트본': 'synergy.race.nightborne.name',
    '검은무쇠 드워프': 'synergy.race.dark_iron.name',
    '잔달라 트롤': 'synergy.race.zandalari.name',
    '정령': 'synergy.race.elemental.name',
    '악마': 'synergy.race.demon.name',
    '기계': 'synergy.race.mechanical.name',
    '볼페라': 'synergy.race.vulpera.name',
  };
  const key = map[raceName];
  const translated = key ? t(key) : undefined;
  return translated && translated !== key ? translated : raceName;
}

export function getTranslatedElement(elementName: string, t: any): string {
  const map: Record<string, string> = {
    '화염': 'synergy.element.fire.name',
    '냉기': 'synergy.element.frost.name',
    '신성': 'synergy.element.holy.name',
    '암흑': 'synergy.element.dark.name',
    '자연': 'synergy.element.nature.name',
    '물': 'synergy.element.water.name',
    '번개': 'synergy.element.thunder.name',
    '서리': 'synergy.element.ice.name',
    '바람': 'synergy.element.wind.name',
    '독': 'synergy.element.poison.name',
    '불꽃': 'synergy.element.flame.name',
    '용': 'synergy.element.dragon.name',
    '빛': 'synergy.element.light.name',
    '비전': 'synergy.element.arcane.name',
  };
  const key = map[elementName];
  const translated = key ? t(key) : undefined;
  return translated && translated !== key ? translated : elementName;
}
