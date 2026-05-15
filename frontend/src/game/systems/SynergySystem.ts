import type { GameHero, SynergyBonus } from '../types';

// ========================
// Synergy Definitions
// ========================
export function calcSynergies(heroes: GameHero[]): SynergyBonus[] {
  const raceCounts: Record<string, number> = {};
  const elementCounts: Record<string, number> = {};

  for (const h of heroes) {
    if (h.raceName) raceCounts[h.raceName] = (raceCounts[h.raceName] || 0) + 1;
    if (h.elementName) elementCounts[h.elementName] = (elementCounts[h.elementName] || 0) + 1;
  }

  const synergies: SynergyBonus[] = [];
  // AR 영웅 목록 (종족별)
  const arRaces = new Set(heroes.filter(h => h.isArHero).map(h => h.raceName));

  // --- 종족 시너지 ---
  for (const [race, count] of Object.entries(raceCounts)) {
    if (count < 2) continue;
    const hasArHero = arRaces.has(race);
    // 5티어: AR 영웅 존재 + 5명 이상 (AR 포함) → 극강 시너지
    if (hasArHero && count >= 5) {
      if (race === '언데드') {
        synergies.push({ type: 'race', name: '언데드', count, tier: 5,
          bonuses: { healMult: 3.0, lifestealMult: 0.30, atkMult: 1.80 } }); continue;
      } else if (race === '오크') {
        synergies.push({ type: 'race', name: '오크', count, tier: 5,
          bonuses: { hpMult: 2.20, defBonus: 50, atkMult: 1.80 } }); continue;
      } else if (race === '블러드엘프') {
        synergies.push({ type: 'race', name: '블러드엘프', count, tier: 5,
          bonuses: { atkMult: 2.20, lifestealMult: 0.30, atkSpeedMult: 1.30 } }); continue;
      } else if (race === '타우렌') {
        synergies.push({ type: 'race', name: '타우렌', count, tier: 5,
          bonuses: { hpMult: 2.50, defBonus: 60, healMult: 1.80 } }); continue;
      }
    }
    const tier: 1 | 2 | 3 = count >= 4 ? 3 : count >= 3 ? 2 : 1;

    if (race === '오크') {
      synergies.push({
        type: 'race', name: '오크', count, tier,
        bonuses: { hpMult: tier === 3 ? 1.30 : tier === 2 ? 1.20 : 1.10, defBonus: tier === 3 ? 15 : tier === 2 ? 8 : 0 },
      });
    } else if (race === '인간') {
      synergies.push({
        type: 'race', name: '인간', count, tier,
        bonuses: {
          atkMult: tier === 3 ? 1.25 : tier === 2 ? 1.15 : 1.10,
          atkSpeedMult: tier === 3 ? 1.15 : tier === 2 ? 1.10 : 1.0,
        },
      });
    } else if (race === '엘프') {
      synergies.push({
        type: 'race', name: '엘프', count, tier,
        bonuses: { ccDurationMult: tier === 3 ? 1.80 : tier === 2 ? 1.50 : 1.30 },
      });
    } else if (race === '언데드') {
      synergies.push({
        type: 'race', name: '언데드', count, tier,
        bonuses: { healMult: tier === 3 ? 1.50 : tier === 2 ? 1.35 : 1.20, lifestealMult: tier === 3 ? 0.10 : 0 },
      });
    } else if (race === '타우렌') {
      synergies.push({
        type: 'race', name: '타우렌', count, tier,
        bonuses: { hpMult: tier === 3 ? 1.40 : tier === 2 ? 1.25 : 1.15, defBonus: tier === 3 ? 20 : tier === 2 ? 12 : 5 },
      });
    } else if (race === '트롤') {
      synergies.push({
        type: 'race', name: '트롤', count, tier,
        bonuses: {
          atkSpeedMult: tier === 3 ? 1.35 : tier === 2 ? 1.25 : 1.15,
          healMult: tier >= 2 ? (tier === 3 ? 1.20 : 1.10) : 1.0,
        },
      });
    } else if (race === '판다렌') {
      synergies.push({
        type: 'race', name: '판다렌', count, tier,
        bonuses: {
          defBonus: tier === 3 ? 25 : tier === 2 ? 15 : 8,
          spdMult: tier === 3 ? 1.20 : tier === 2 ? 1.15 : 1.10,
          hpMult: tier === 3 ? 1.10 : 1.0,
        },
      });
    } else if (race === '야수족') {
      synergies.push({
        type: 'race', name: '야수족', count, tier,
        bonuses: {
          atkMult: tier >= 2 ? 1.20 : 1.12,
          atkSpeedMult: tier >= 2 ? 1.15 : 1.0,
          lifestealMult: tier >= 2 ? 0.05 : 0,
        },
      });
    } else if (race === '밤엘프') {
      synergies.push({
        type: 'race', name: '밤엘프', count, tier,
        bonuses: {
          spdMult: tier >= 2 ? 1.25 : 1.15,
          atkMult: tier >= 2 ? 1.12 : 1.0,
        },
      });
    } else if (race === '고블린') {
      synergies.push({
        type: 'race', name: '고블린', count, tier,
        bonuses: {
          atkSpeedMult: tier === 3 ? 1.35 : tier === 2 ? 1.25 : 1.15,
          atkMult: tier >= 2 ? (tier === 3 ? 1.15 : 1.10) : 1.0,
        },
      });
    } else if (race === '노움') {
      synergies.push({
        type: 'race', name: '노움', count, tier,
        bonuses: {
          atkMult: tier === 3 ? 1.20 : tier === 2 ? 1.15 : 1.10,
          defBonus: tier === 3 ? 15 : tier === 2 ? 8 : 0,
          hpMult: tier === 3 ? 1.10 : 1.0,
        },
      });
    } else if (race === '드레나이') {
      synergies.push({
        type: 'race', name: '드레나이', count, tier,
        bonuses: {
          healMult: tier === 3 ? 1.40 : tier === 2 ? 1.25 : 1.15,
          hpMult: tier >= 2 ? (tier === 3 ? 1.15 : 1.10) : 1.0,
          defBonus: tier === 3 ? 8 : 0,
        },
      });
    } else if (race === '블러드엘프') {
      synergies.push({
        type: 'race', name: '블러드엘프', count, tier,
        bonuses: {
          atkMult: tier === 3 ? 1.30 : tier === 2 ? 1.20 : 1.12,
          lifestealMult: tier === 3 ? 0.10 : tier === 2 ? 0.05 : 0,
        },
      });
    } else if (race === '공허엘프') {
      synergies.push({
        type: 'race', name: '공허엘프', count, tier,
        bonuses: {
          atkMult: tier >= 2 ? 1.15 : 1.10,
          executeThresholdBonus: tier >= 2 ? 0.08 : 0.05,
        },
      });
    } else if (race === '빛벼림 드레나이') {
      synergies.push({
        type: 'race', name: '빛벼림 드레나이', count, tier,
        bonuses: {
          healMult: tier >= 2 ? 1.20 : 1.15,
          atkMult: tier >= 2 ? 1.15 : 1.10,
        },
      });
    }
  }

  // --- 원소 시너지 ---
  for (const [element, count] of Object.entries(elementCounts)) {
    if (count < 2) continue;
    const tier = count >= 4 ? 3 : count >= 3 ? 2 : 1;

    if (element === '화염') {
      synergies.push({
        type: 'element', name: '화염', count, tier,
        bonuses: { atkMult: tier === 3 ? 1.35 : tier === 2 ? 1.25 : 1.15 },
      });
    } else if (element === '냉기') {
      synergies.push({
        type: 'element', name: '냉기', count, tier,
        bonuses: { ccDurationMult: tier === 3 ? 2.0 : tier === 2 ? 1.60 : 1.30 },
      });
    } else if (element === '신성') {
      synergies.push({
        type: 'element', name: '신성', count, tier,
        bonuses: { healMult: tier === 3 ? 1.50 : tier === 2 ? 1.35 : 1.20, hpMult: tier === 3 ? 1.20 : 1.0 },
      });
    } else if (element === '암흑') {
      synergies.push({
        type: 'element', name: '암흑', count, tier,
        bonuses: {
          executeThresholdBonus: tier === 3 ? 0.15 : tier === 2 ? 0.10 : 0.05,
          lifestealMult: tier === 3 ? 0.15 : 0,
        },
      });
    } else if (element === '자연') {
      synergies.push({
        type: 'element', name: '자연', count, tier,
        bonuses: {
          healMult: tier === 3 ? 1.40 : tier === 2 ? 1.25 : 1.15,
          hpMult: tier >= 2 ? (tier === 3 ? 1.15 : 1.10) : 1.0,
        },
      });
    } else if (element === '물') {
      synergies.push({
        type: 'element', name: '물', count, tier,
        bonuses: {
          healMult: tier === 3 ? 1.35 : tier === 2 ? 1.25 : 1.15,
          spdMult: tier === 3 ? 1.20 : tier === 2 ? 1.15 : 1.10,
          hpMult: tier === 3 ? 1.10 : 1.0,
        },
      });
    } else if (element === '번개') {
      synergies.push({
        type: 'element', name: '번개', count, tier,
        bonuses: {
          atkSpeedMult: tier === 3 ? 1.50 : tier === 2 ? 1.35 : 1.20,
          atkMult: tier >= 2 ? (tier === 3 ? 1.15 : 1.10) : 1.0,
        },
      });
    } else if (element === '서리') {
      synergies.push({
        type: 'element', name: '서리', count, tier,
        bonuses: {
          defBonus: tier === 3 ? 30 : tier === 2 ? 20 : 10,
          ccDurationMult: tier === 3 ? 1.60 : tier === 2 ? 1.40 : 1.20,
          hpMult: tier === 3 ? 1.10 : 1.0,
        },
      });
    } else if (element === '바람') {
      synergies.push({
        type: 'element', name: '바람', count, tier,
        bonuses: {
          spdMult: tier === 3 ? 1.25 : tier === 2 ? 1.20 : 1.15,
          atkSpeedMult: tier === 3 ? 1.30 : tier === 2 ? 1.20 : 1.10,
          atkMult: tier === 3 ? 1.10 : 1.0,
        },
      });
    } else if (element === '독') {
      synergies.push({
        type: 'element', name: '독', count, tier,
        bonuses: {
          executeThresholdBonus: tier === 3 ? 0.15 : tier === 2 ? 0.10 : 0.05,
          atkMult: tier >= 2 ? (tier === 3 ? 1.15 : 1.10) : 1.0,
          lifestealMult: tier === 3 ? 0.05 : 0,
        },
      });
    } else if (element === '불꽃') {
      synergies.push({
        type: 'element', name: '불꽃', count, tier,
        bonuses: { atkMult: tier === 3 ? 1.40 : tier === 2 ? 1.28 : 1.18 },
      });
    }
  }

  // --- 특별: 용 원소 — 1명만 있어도 발동 (드래곤 전용) ---
  if ((elementCounts['용'] || 0) >= 1) {
    synergies.push({
      type: 'element', name: '용', count: elementCounts['용'], tier: 1,
      bonuses: { atkMult: 1.20, hpMult: 1.15 },
    });
  }

  return synergies;
}

// Apply synergy bonuses to hero base stats (called once at game start and wave start)
export function applySynergyToHero(hero: GameHero, synergies: SynergyBonus[]): GameHero {
  let hpMult = 1.0;
  let atkMult = 1.0;
  let defBonus = 0;
  let healMult = 1.0;
  let spdMult = 1.0;
  let atkSpeedMult = 1.0;

  for (const s of synergies) {
    if (s.bonuses.hpMult) hpMult *= s.bonuses.hpMult;
    if (s.bonuses.atkMult) atkMult *= s.bonuses.atkMult;
    if (s.bonuses.defBonus) defBonus += s.bonuses.defBonus;
    if (s.bonuses.healMult) healMult *= s.bonuses.healMult;
    if (s.bonuses.spdMult) spdMult *= s.bonuses.spdMult;
    if (s.bonuses.atkSpeedMult) atkSpeedMult *= s.bonuses.atkSpeedMult;
  }

  const newMaxHp = Math.round(hero.maxHp * hpMult);
  return {
    ...hero,
    maxHp: newMaxHp,
    hp: Math.min(hero.hp + (newMaxHp - hero.maxHp), newMaxHp),
    atk: Math.round(hero.atk * atkMult),
    def: Math.round(hero.def + defBonus),
    speed: parseFloat((hero.speed * spdMult).toFixed(2)),
    attackCooldown: atkSpeedMult > 1.0
      ? parseFloat((hero.attackCooldown / atkSpeedMult).toFixed(3))
      : hero.attackCooldown,
  };
}

