// 게임 전체에서 사용하는 localStorage 헬퍼 함수 모음
// 기존에 GamePage, AIGamePage, OffenseGamePage, HeroesPage에 중복 정의되어 있던 것을 통합

import type { Role } from '../game/types';
import type { ManghonguSave } from '../game/manghonguData';

// ──────────────────────────────────────────────
// 타입 정의
// ──────────────────────────────────────────────

export interface HeroSaveData {
  starRating: 1 | 2 | 3 | 4 | 5;
  activeRouteId: string;
  purchasedSkillIds: string[];
  equippedSkillIds: string[];
  isUnsealed?: boolean;
}

export type AllHeroSave = Record<string, HeroSaveData>;

export interface ProtagonistSaveData {
  starRating: 1 | 2 | 3 | 4 | 5;
  equippedSkillIds: string[];
  selectedRole: Role;
  unlockedRoles: Role[];
}

export interface ProtagonistDefenseSaveData {
  starRating: 1 | 2 | 3 | 4 | 5;
  equippedSkillIds: string[];
  selectedRole: Role;
  unlockedRoles: Role[];
  selectedTraitKeys: string[];
}

export interface ProtagonistAISaveData {
  starRating: 1 | 2 | 3 | 4 | 5;
  equippedSkillIds: string[];
  selectedRole: Role;
  unlockedRoles: Role[];
}

export type RaidStageProgress = Record<number, boolean>;
export type StageProgress = Record<number, { normal: boolean; elite: boolean }>;

// ──────────────────────────────────────────────
// 영웅 세이브 데이터
// ──────────────────────────────────────────────

export function loadSave(userId: number): AllHeroSave {
  try {
    const raw = localStorage.getItem(`hero_data_${userId}`);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

export function writeSave(userId: number, data: AllHeroSave) {
  localStorage.setItem(`hero_data_${userId}`, JSON.stringify(data));
}

// ──────────────────────────────────────────────
// 주인공 세이브 (일반)
// ──────────────────────────────────────────────

export function loadProtagonistSave(userId: number): ProtagonistSaveData {
  try {
    const raw = localStorage.getItem(`protagonist_${userId}`);
    if (raw) {
      const data = JSON.parse(raw);
      if (!data.unlockedRoles) data.unlockedRoles = ['melee_dps'];
      return data;
    }
  } catch {}
  return { starRating: 1, equippedSkillIds: [], selectedRole: 'melee_dps', unlockedRoles: ['melee_dps'] };
}

export function writeProtagonistSave(userId: number, data: ProtagonistSaveData) {
  localStorage.setItem(`protagonist_${userId}`, JSON.stringify(data));
}

// ──────────────────────────────────────────────
// 주인공 세이브 (디펜스)
// ──────────────────────────────────────────────

export function loadProtagonistDefenseSave(userId: number): ProtagonistDefenseSaveData {
  try {
    const raw = localStorage.getItem(`protagonist_defense_${userId}`);
    if (raw) {
      const data = JSON.parse(raw);
      if (!data.unlockedRoles) data.unlockedRoles = ['tank'];
      if (!data.selectedTraitKeys) data.selectedTraitKeys = [];
      return data;
    }
  } catch {}
  return { starRating: 1, equippedSkillIds: [], selectedRole: 'tank', unlockedRoles: ['tank'], selectedTraitKeys: [] };
}

export function writeProtagonistDefenseSave(userId: number, data: ProtagonistDefenseSaveData) {
  localStorage.setItem(`protagonist_defense_${userId}`, JSON.stringify(data));
}

// ──────────────────────────────────────────────
// 주인공 세이브 (AI 모드)
// ──────────────────────────────────────────────

export function loadProtagonistAISave(userId: number): ProtagonistAISaveData {
  try {
    const raw = localStorage.getItem(`protagonist_ai_${userId}`);
    if (raw) {
      const data = JSON.parse(raw);
      if (!data.unlockedRoles) data.unlockedRoles = ['ranged_dps'];
      return data;
    }
  } catch {}
  return { starRating: 1, equippedSkillIds: [], selectedRole: 'ranged_dps', unlockedRoles: ['ranged_dps'] };
}

export function writeProtagonistAISave(userId: number, data: ProtagonistAISaveData) {
  localStorage.setItem(`protagonist_ai_${userId}`, JSON.stringify(data));
}

// ──────────────────────────────────────────────
// 주인공 세이브 (오펜스 모드)
// ──────────────────────────────────────────────

export function loadProtagonistOffenseSave(userId: number): ProtagonistAISaveData {
  try {
    const raw = localStorage.getItem(`protagonist_offense_${userId}`);
    if (raw) {
      const data = JSON.parse(raw);
      if (!data.unlockedRoles) data.unlockedRoles = ['melee_dps'];
      return data;
    }
  } catch {}
  return { starRating: 1, equippedSkillIds: [], selectedRole: 'melee_dps', unlockedRoles: ['melee_dps'] };
}

export function writeProtagonistOffenseSave(userId: number, data: ProtagonistAISaveData) {
  localStorage.setItem(`protagonist_offense_${userId}`, JSON.stringify(data));
}

// ──────────────────────────────────────────────
// 주인공 세이브 (레이드 모드)
// ──────────────────────────────────────────────

export function loadProtagonistRaidSave(userId: number): ProtagonistAISaveData {
  try {
    const raw = localStorage.getItem(`protagonist_raid_${userId}`);
    if (raw) {
      const data = JSON.parse(raw);
      if (!data.unlockedRoles) data.unlockedRoles = ['ranged_dps'];
      return data;
    }
  } catch {}
  return { starRating: 1, equippedSkillIds: [], selectedRole: 'ranged_dps', unlockedRoles: ['ranged_dps'] };
}

export function writeProtagonistRaidSave(userId: number, data: ProtagonistAISaveData) {
  localStorage.setItem(`protagonist_raid_${userId}`, JSON.stringify(data));
}

// ──────────────────────────────────────────────
// 보유 영웅 목록
// ──────────────────────────────────────────────

export function loadOwnedHeroes(userId: number): string[] {
  try {
    const raw = localStorage.getItem(`owned_heroes_${userId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return ['protagonist'];
}

export function saveOwnedHeroes(userId: number, ids: string[]) {
  localStorage.setItem(`owned_heroes_${userId}`, JSON.stringify(ids));
}

// ──────────────────────────────────────────────
// 레이드 스테이지 진척도
// ──────────────────────────────────────────────

export function loadRaidStageProgress(userId: number): RaidStageProgress {
  try {
    const raw = localStorage.getItem(`raid_stages_${userId}`);
    if (raw) return JSON.parse(raw) as RaidStageProgress;
  } catch {}
  return {};
}

export function saveRaidStageProgress(userId: number, idx: number, current: RaidStageProgress): RaidStageProgress {
  const updated = { ...current, [idx]: true };
  localStorage.setItem(`raid_stages_${userId}`, JSON.stringify(updated));
  return updated;
}

export function isRaidStageUnlocked(idx: number, progress: RaidStageProgress): boolean {
  if (idx === 0) return true;
  return !!progress[idx - 1];
}

// ──────────────────────────────────────────────
// 오펜스 스테이지 진척도
// ──────────────────────────────────────────────

export function loadStageProgress(userId: number): StageProgress {
  try {
    const raw = localStorage.getItem(`offense_stages_${userId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

export function saveStageProgress(userId: number, stageId: number, isElite: boolean, current: StageProgress): StageProgress {
  const prev = current[stageId] ?? { normal: false, elite: false };
  const updated: StageProgress = {
    ...current,
    [stageId]: {
      normal: prev.normal || !isElite,
      elite: prev.elite || isElite,
    },
  };
  localStorage.setItem(`offense_stages_${userId}`, JSON.stringify(updated));
  return updated;
}

export function isStageUnlocked(stageId: number | undefined, progress: StageProgress): boolean {
  if (!stageId || stageId === 1) return true;
  return !!(progress[stageId - 1]?.normal);
}

// ──────────────────────────────────────────────
// 벽 탤런트
// ──────────────────────────────────────────────

export function loadWallTalents(userId: number): Record<string, number> {
  try {
    const raw = localStorage.getItem(`wall_talents_${userId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

export function saveWallTalents(userId: number, talents: Record<string, number>) {
  localStorage.setItem(`wall_talents_${userId}`, JSON.stringify(talents));
}

// ──────────────────────────────────────────────
// AI 팩션 별 점수
// ──────────────────────────────────────────────

export function loadAIFactionStars(userId: number): Record<string, number> {
  try {
    const raw = localStorage.getItem(`ai_faction_stars_${userId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

export function saveAIFactionStars(userId: number, stars: Record<string, number>) {
  localStorage.setItem(`ai_faction_stars_${userId}`, JSON.stringify(stars));
}

// ──────────────────────────────────────────────
// 망혼구 세이브 (manghonguData.ts와 동일 키, 여기서도 접근 가능)
// ──────────────────────────────────────────────

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
