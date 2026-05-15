import { WALL_TALENTS, SECOND_WALL_TALENTS, THIRD_WALL_TALENTS } from '../wallTalents';

// ========================
// Wall Reinforcement Helpers
// ========================
export function getWallEffects(talentRanks: Record<string, number> = {}): import('../types').WallTalentEffects {
  const effects: import('../types').WallTalentEffects = {
    hpBonus: 0, defBonus: 0, reflectPct: 0, auraDamage: 0, auraSlowPct: 0,
    elementBuffPct: 0, recoveryPerWave: 0,
    heroDefBonus: 0, healAlliesPerWave: 0, healAlliesAura: 0,
    shieldOnWaveStartPct: 0, goldBonusPct: 0, reviveAllPct: 0,
    lightningReflect: 0, chainLightningCount: 0,
    projectileBlockPct: 0, lowHpDefBonus: 0,
    slowZone: 'wall',
    globalSlowLowHp: false,
    lightHealBothWalls: 0,
    lightAuraDamage: 0,
    shadowExecute: 0,
    naturePoisonAura: 0,
    bloodVampireAura: 0,
    timeCooldownReduction: 0,
    timeSlowAura: 0,
    // 제 3의 벽
    heroSpdBonusPct: 0,
    heroAtkSpeedBonusPct: 0,
    earthHpBonus: 0,
    massEarthquake: 0,
    arcaneAmpPct: 0,
    arcaneExplosion: 0,
    voidWeaken: 0,
    voidHealOnKill: 0,
    stormAuraDmg: 0,
    stormChainCount: 0,
  };

  const allTalents = [...WALL_TALENTS, ...SECOND_WALL_TALENTS, ...THIRD_WALL_TALENTS];

  for (const [id, rank] of Object.entries(talentRanks)) {
    if (rank <= 0) continue;
    const t = allTalents.find(talent => talent.id === id);
    if (!t) continue;

    if (t.effects.hpBonus) effects.hpBonus! += t.effects.hpBonus * rank;
    if (t.effects.defBonus) effects.defBonus! += t.effects.defBonus * rank;
    if (t.effects.reflectPct) effects.reflectPct! += t.effects.reflectPct * rank;
    if (t.effects.auraDamage) effects.auraDamage! += t.effects.auraDamage * rank;
    if (t.effects.auraSlowPct) effects.auraSlowPct! += t.effects.auraSlowPct * rank;
    if (t.effects.elementBuffPct) effects.elementBuffPct! += t.effects.elementBuffPct * rank;
    if (t.effects.recoveryPerWave) effects.recoveryPerWave! += t.effects.recoveryPerWave * rank;
    if (t.effects.heroDefBonus) effects.heroDefBonus! += t.effects.heroDefBonus * rank;
    if (t.effects.healAlliesPerWave) effects.healAlliesPerWave! += t.effects.healAlliesPerWave * rank;
    if (t.effects.healAlliesAura) effects.healAlliesAura! += t.effects.healAlliesAura * rank;
    if (t.effects.shieldOnWaveStartPct) effects.shieldOnWaveStartPct! += t.effects.shieldOnWaveStartPct * rank;
    if (t.effects.goldBonusPct) effects.goldBonusPct! += t.effects.goldBonusPct * rank;
    if (t.effects.lightningReflect) effects.lightningReflect! += t.effects.lightningReflect * rank;
    if (t.effects.chainLightningCount) effects.chainLightningCount! += t.effects.chainLightningCount * rank;
    if (t.effects.projectileBlockPct) effects.projectileBlockPct! += t.effects.projectileBlockPct * rank;
    if (t.effects.lowHpDefBonus) effects.lowHpDefBonus! += t.effects.lowHpDefBonus;

    if (t.effects.lightHealBothWalls) effects.lightHealBothWalls! += t.effects.lightHealBothWalls * rank;
    if (t.effects.lightAuraDamage) effects.lightAuraDamage! += t.effects.lightAuraDamage * rank;
    if (t.effects.shadowExecute) effects.shadowExecute! += t.effects.shadowExecute * rank;
    if (t.effects.naturePoisonAura) effects.naturePoisonAura! += t.effects.naturePoisonAura * rank;
    if (t.effects.bloodVampireAura) effects.bloodVampireAura! += t.effects.bloodVampireAura * rank;
    if (t.effects.timeCooldownReduction) effects.timeCooldownReduction! += t.effects.timeCooldownReduction * rank;
    if (t.effects.timeSlowAura) effects.timeSlowAura! += t.effects.timeSlowAura * rank;

    if (t.effects.slowZone) effects.slowZone = t.effects.slowZone;
    if (t.effects.globalSlowLowHp) effects.globalSlowLowHp = true;
    if (t.effects.reviveOnce) effects.reviveOnce = true;
    if (t.effects.reviveAllPct) effects.reviveAllPct = Math.max(effects.reviveAllPct ?? 0, t.effects.reviveAllPct);
    if (t.effects.waveStartLightning) effects.waveStartLightning = true;
    if (t.effects.waveStartStun) effects.waveStartStun = true;

    // 제 3의 벽
    if (t.effects.heroSpdBonusPct)      effects.heroSpdBonusPct!      += t.effects.heroSpdBonusPct * rank;
    if (t.effects.heroAtkSpeedBonusPct) effects.heroAtkSpeedBonusPct! += t.effects.heroAtkSpeedBonusPct * rank;
    if (t.effects.earthHpBonus)         effects.earthHpBonus!          += t.effects.earthHpBonus * rank;
    if (t.effects.massEarthquake)       effects.massEarthquake!        += t.effects.massEarthquake * rank;
    if (t.effects.arcaneAmpPct)         effects.arcaneAmpPct!          += t.effects.arcaneAmpPct * rank;
    if (t.effects.arcaneExplosion)      effects.arcaneExplosion!       += t.effects.arcaneExplosion * rank;
    if (t.effects.voidWeaken)           effects.voidWeaken!            += t.effects.voidWeaken * rank;
    if (t.effects.voidHealOnKill)       effects.voidHealOnKill!        += t.effects.voidHealOnKill * rank;
    if (t.effects.stormAuraDmg)         effects.stormAuraDmg!          += t.effects.stormAuraDmg * rank;
    if (t.effects.stormChainCount)      effects.stormChainCount!       += t.effects.stormChainCount * rank;
  }
  return effects;
}

// ========================
// Melee/Tank Wall Bonuses
// ========================
export function getMeleeTankBonuses(wallTalents: Record<string, number>): import('../types').MeleeTankBonuses {
  /** 카테고리에서 구매된 티어 수를 10으로 나눈 스택 수 (0~3) */
  function stacks(cat: string): number {
    let count = 0;
    for (let t = 1; t <= 30; t++) {
      if ((wallTalents[`${cat}_${t}`] ?? 0) >= 1) count++;
    }
    return Math.floor(count / 10);
  }

  const b: import('../types').MeleeTankBonuses = {
    atkPct: 0, defFlat: 0, hpPct: 0, atkSpdPct: 0,
    reflectPct: 0, lifestealPct: 0, executePct: 0,
    armorPenPct: 0, poisonOnHit: 0, healOnKill: 0,
    meleeCleaveRadius: 0,
  };

  // ── 제 1의 벽 ──
  b.defFlat      += stacks('steel')   * 8;   // 강철: DEF +8/스택
  b.atkPct       += stacks('fire')    * 8;   // 화염: ATK +8%/스택
  b.hpPct        += stacks('frost')   * 6;   // 냉기: MaxHP +6%/스택
  b.healOnKill   += stacks('life')    * 80;  // 생명: 처치 시 +80HP/스택
  b.reflectPct   += stacks('thunder') * 5;   // 전기: 반사 +5%/스택

  // ── 제 2의 벽 ──
  b.hpPct        += stacks('light')   * 5;   // 빛: MaxHP +5%/스택
  b.executePct   += stacks('shadow')  * 5;   // 그림자: 처형 임계 +5%/스택
  b.poisonOnHit  += stacks('nature')  * 30;  // 자연: 타격당 독 +30/스택
  b.lifestealPct += stacks('blood')   * 4;   // 혈액: 흡혈 +4%/스택
  b.atkSpdPct    += stacks('time')    * 6;   // 시간: 공속 +6%/스택

  // ── 제 3의 벽 ──
  b.atkSpdPct    += stacks('wind')    * 8;   // 바람: 공속 +8%/스택
  b.defFlat      += stacks('earth')   * 10;  // 대지: DEF +10/스택
  b.atkPct       += stacks('arcane')  * 10;  // 비전: ATK +10%/스택
  b.armorPenPct       += stacks('void')    * 12;  // 공허: 방어관통 +12%/스택
  b.atkPct            += stacks('storm')   * 8;   // 폭풍: ATK +8%/스택
  b.meleeCleaveRadius += stacks('storm')   * 40;  // 폭풍: 근딜 광역 반경 40/80/120px

  return b;
}

