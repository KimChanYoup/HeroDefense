export interface ManghonguSave {
  atk: number;      // 공격력 rank
  def: number;      // 방어력 rank
  hp: number;       // 체력 rank
  atkSpeed: number; // 공격속도 rank
  spd: number;      // 이동속도 rank
}

export const MANGHONGU_STATS = {
  atk:      { label: '공격력',   labelKey: 'manghongu.stats.atk',      icon: '⚔️', perRank: 2, unit: '%',  color: '#ef4444', desc: (r: number) => `공격력 +${r * 2}%` },
  def:      { label: '방어력',   labelKey: 'manghongu.stats.def',      icon: '🛡️', perRank: 5, unit: '',   color: '#3b82f6', desc: (r: number) => `방어력 +${r * 5}` },
  hp:       { label: '체력',     labelKey: 'manghongu.stats.hp',       icon: '❤️', perRank: 2, unit: '%',  color: '#22c55e', desc: (r: number) => `최대 체력 +${r * 2}%` },
  atkSpeed: { label: '공격속도', labelKey: 'manghongu.stats.atkSpeed', icon: '⚡', perRank: 1, unit: '%',  color: '#eab308', desc: (r: number) => `공격속도 +${r * 1}%` },
  spd:      { label: '이동속도', labelKey: 'manghongu.stats.spd',      icon: '💨', perRank: 1, unit: '%',  color: '#06b6d4', desc: (r: number) => `이동속도 +${r * 1}%` },
} as const;

export type ManghonguStatKey = keyof typeof MANGHONGU_STATS;

/**
 * Cost to upgrade from rank `rank` to rank+1.
 * Tiered: every 10 levels the base cost increases.
 *  rank  0- 9 → 10,000 each (1만)
 *  rank 10-19 → 20,000 each (2만)
 *  rank 20-29 → 30,000 each (3만)  ...
 */
export function getManghonguCost(rank: number): number {
  return (Math.floor(rank / 10) + 1) * 10000;
}

export function loadManghonguSave(userId: number): ManghonguSave {
  try {
    const raw = localStorage.getItem(`manghongu_${userId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { atk: 0, def: 0, hp: 0, atkSpeed: 0, spd: 0 };
}

export function saveManghonguData(userId: number, save: ManghonguSave) {
  localStorage.setItem(`manghongu_${userId}`, JSON.stringify(save));
}
