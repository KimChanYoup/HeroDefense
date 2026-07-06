import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import MonsterBook from '../components/MonsterBook';
import { loadKilledMonsters } from '../game/monsterBook';
import { getTranslatedRace, getTranslatedElement } from '../game/heroUtils';
import {
  HERO_DEFINITIONS,
  HERO_GRAPHIC_IDS,
  ROLE_LABELS,
  ROLE_COLORS,
  GRADE_COLORS,
  getActiveUniqueDescription,
  getUniqueValue,
  getScaledBaseStats,
  getStarStatMultiplier,
  calcHeroCombatStats,
  ROLE_ATTACK_COOLDOWN,
  type HeroDefinition,
  type ClassRoute,
  type RouteSkill,
  type SummonStats,
} from '../game/heroData';
import type { Role } from '../game/types';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/client';
import { getRouteIcon } from '../components/RoleIcons';
import {
  loadSave, writeSave,
  loadProtagonistSave, writeProtagonistSave,
  loadProtagonistDefenseSave, writeProtagonistDefenseSave,
  loadProtagonistAISave, writeProtagonistAISave,
  loadProtagonistOffenseSave, writeProtagonistOffenseSave,
  loadProtagonistRaidSave, writeProtagonistRaidSave,
  loadOwnedHeroes, saveOwnedHeroes,
  type HeroSaveData, type AllHeroSave,
  type ProtagonistSaveData, type ProtagonistDefenseSaveData, type ProtagonistAISaveData,
} from '../utils/localStorage';

export type {
  HeroSaveData, AllHeroSave,
  ProtagonistSaveData, ProtagonistDefenseSaveData, ProtagonistAISaveData,
};
export {
  loadSave, writeSave,
  loadProtagonistSave, writeProtagonistSave,
  loadProtagonistDefenseSave, writeProtagonistDefenseSave,
  loadProtagonistAISave, writeProtagonistAISave,
  loadProtagonistOffenseSave, writeProtagonistOffenseSave,
  loadProtagonistRaidSave, writeProtagonistRaidSave,
  loadOwnedHeroes, saveOwnedHeroes,
};

const DEFAULT_MAX_EQUIPPED = 3;

// ──────────────────────────────────────────────
// 성급 업그레이드 비용 라벨
// ──────────────────────────────────────────────
const STAR_COST_LABELS_FALLBACK = ['1→2성', '2→3성', '3→4성', '4→5성'];

// ──────────────────────────────────────────────
// 서브 컴포넌트
// ──────────────────────────────────────────────
function StarRating({ star, onChange }: { star: number; onChange?: (s: 1|2|3|4|5) => void }) {
  return (
    <div className="flex gap-0.5">
      {([1,2,3,4,5] as const).map(s => (
        <button key={s} onClick={() => onChange?.(s)}
          className={`text-lg transition-transform ${onChange ? 'cursor-pointer hover:scale-125' : 'cursor-default'} ${s <= star ? 'text-yellow-400' : 'text-gray-600'}`}>
          ★
        </button>
      ))}
    </div>
  );
}

function GradeBadge({ grade }: { grade: string }) {
  const color = GRADE_COLORS[grade as keyof typeof GRADE_COLORS] ?? '#9ca3af';
  return (
    <span className="text-xs font-black px-2 py-0.5 rounded border"
      style={{ color, borderColor: color, backgroundColor: color + '22' }}>
      {grade}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  const { t } = useTranslation();
  const color = ROLE_COLORS[role] ?? '#6b7280';
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
      style={{ color, borderColor: color, backgroundColor: color + '22' }}>
      {t(`roles.${role}`) || ROLE_LABELS[role] || role}
    </span>
  );
}

// ──────────────────────────────────────────────
// 고유스킬 카드
// ──────────────────────────────────────────────
function UniqueSkillCard({ hero, activeRouteId, isUnsealed }: { hero: HeroDefinition; activeRouteId: string; isUnsealed?: boolean }) {
  const { t } = useTranslation();
  const { name, description } = getActiveUniqueDescription(hero, activeRouteId);
  const route = hero.classRoutes.find(r => r.id === activeRouteId) ?? hero.classRoutes[0];
  const starValue = getUniqueValue(hero, hero.starRating);

  // 번역된 이름과 설명 가져오기
  const translatedName = route.uniqueVariant.nameKey ? t(route.uniqueVariant.nameKey) : name;
  const translatedDesc = route.uniqueVariant.descriptionTemplateKey 
    ? t(route.uniqueVariant.descriptionTemplateKey, { value: starValue, unit: hero.uniqueSkill.unit })
    : description;

  const allVariants = isUnsealed ? hero.classRoutes.map(r => {
    const value = getUniqueValue(hero, hero.starRating);
    return {
      name: r.uniqueVariant.nameKey ? t(r.uniqueVariant.nameKey) : r.uniqueVariant.name,
      desc: r.uniqueVariant.descriptionTemplateKey 
        ? t(r.uniqueVariant.descriptionTemplateKey, { value, unit: hero.uniqueSkill.unit })
        : r.uniqueVariant.descriptionTemplate.replace('{value}', String(value)).replace('{unit}', hero.uniqueSkill.unit),
      color: r.color,
      routeName: r.nameKey ? t(r.nameKey) : r.name
    };
  }) : [];

  return (
    <div className="rounded-lg p-4 border"
      style={{ borderColor: route.color + '80', background: `linear-gradient(135deg, ${route.color}18, ${route.color}08)` }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border"
          style={{ borderColor: route.color, color: route.color }}>{t('heroesPage.unique')}</div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white">{isUnsealed ? t('heroesPage.unsealedTitle') : translatedName}</span>
            <span className="text-xs px-1.5 py-0.5 rounded font-bold"
              style={{ color: isUnsealed ? '#facc15' : route.color, backgroundColor: (isUnsealed ? '#facc15' : route.color) + '22' }}>
              {isUnsealed ? 'UNSEALED' : t('heroesPage.passive')}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {isUnsealed ? t('heroesPage.unsealedSub') : t('heroesPage.passiveSub')}
          </p>
        </div>
      </div>

      {isUnsealed ? (
        <div className="space-y-3 mb-3">
          {allVariants.map(v => (
            <div key={v.name} className="bg-gray-900/40 rounded p-2 border border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-1 rounded text-white" style={{ backgroundColor: v.color }}>{v.routeName}</span>
                <span className="font-bold text-xs" style={{ color: v.color }}>{v.name}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-200 leading-relaxed mb-3">{translatedDesc}</p>
      )}

      <div className="grid grid-cols-5 gap-1">
        {([1,2,3,4,5] as const).map(s => {
          const val = getUniqueValue(hero, s);
          const isActive = s === hero.starRating;
          return (
            <div key={s} className="text-center rounded p-1"
              style={isActive ? { background: route.color+'33', border:`1px solid ${route.color}` } : { background:'#1f2937', border:'1px solid #374151' }}>
              <div className="text-xs font-bold" style={{ color: isActive ? route.color : '#4b5563' }}>{t('heroesPage.starN', { n: s })}</div>
              <div className="text-xs" style={{ color: isActive ? '#e5e7eb' : '#374151' }}>{val}{hero.uniqueSkill.unit}</div>
            </div>
          );
        })}
      </div>
      {!isUnsealed && (
        <div className="mt-3 pt-2 border-t border-gray-700/50">
          <p className="text-xs text-gray-500">
            <span className="text-gray-400 font-semibold">{t('heroesPage.otherRoute')} </span>
            {hero.classRoutes.filter(r => r.id !== activeRouteId).map(r => `[${r.nameKey ? t(r.nameKey) : r.name}] → ${r.uniqueVariant.nameKey ? t(r.uniqueVariant.nameKey) : r.uniqueVariant.name}`).join(' / ')}
          </p>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// 성급 업그레이드 패널
// ──────────────────────────────────────────────
function StarUpgradePanel({
  hero, userGold, onUpgrade,
}: { hero: HeroDefinition; userGold: number; onUpgrade: () => void }) {
  const { t } = useTranslation();
  const starCostLabels = (t('heroesPage.starCostLabels', { returnObjects: true }) as string[]) ?? STAR_COST_LABELS_FALLBACK;
  const currentStar = hero.starRating;
  if (currentStar >= 5) return (
    <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-3 text-center">
      <span className="text-yellow-400 font-bold text-sm">{t('heroesPage.maxStar')}</span>
      <div className="flex items-center justify-center gap-3 mt-1.5">
        <span className="text-xs text-yellow-300/70">{t('heroesPage.maxUniquePassive')}</span>
        <span className="text-xs text-green-400 font-semibold">{t('heroesPage.maxStatBonus')}</span>
      </div>
    </div>
  );
  const cost = hero.starUpgradeCosts[currentStar - 1];
  const canAfford = userGold >= cost;
  const nextStar = (currentStar + 1) as 1 | 2 | 3 | 4 | 5;
  const curMult  = getStarStatMultiplier(currentStar);
  const nextMult = getStarStatMultiplier(nextStar);
  const statDelta = Math.round((nextMult - curMult) * 100);
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-300 font-semibold">{t('heroesPage.starUpgradeTitle')}</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-gray-500">{starCostLabels[currentStar - 1]}</span>
            <span className="text-xs font-bold text-yellow-400">💰 {cost.toLocaleString()}G</span>
          </div>
        </div>
        <button onClick={onUpgrade} disabled={!canAfford}
          className="px-4 py-2 rounded text-sm font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={canAfford ? { background: '#ca8a04', color: '#fff' } : { background: '#374151', color: '#6b7280' }}>
          {canAfford ? t('heroesPage.upgradeBtn') : t('heroesPage.goldShort')}
        </button>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-700/50 flex items-center gap-3 flex-wrap">
        <span className="text-xs text-gray-500">{t('heroesPage.upgradeEffect')}</span>
        <span className="text-xs text-green-400 font-semibold">
          {t('heroesPage.statBonus', { delta: statDelta })}
          <span className="text-gray-500 font-normal ml-1">
            ({`+${Math.round((curMult - 1) * 100)}% → +${Math.round((nextMult - 1) * 100)}%`})
          </span>
        </span>
        <span className="text-xs text-yellow-300/80">{t('heroesPage.uniquePassiveUp')}</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 소환수 스탯 패널 (Feldah 악흑 루트 전용)
// ──────────────────────────────────────────────
function SummonStatsPanel({ stats, routeColor }: { stats: SummonStats; routeColor: string }) {
  const { t } = useTranslation();
  return (
    <div className="mt-2 rounded-lg p-2.5 border"
      style={{ borderColor: routeColor + '60', background: routeColor + '0a' }}>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="text-xs font-bold px-1.5 py-0.5 rounded"
          style={{ color: routeColor, background: routeColor + '22', border: `1px solid ${routeColor}60` }}>
          {t('heroesPage.summonStats')}
        </span>
        <span className="text-xs text-gray-400 font-semibold">{stats.displayNameKey ? t(stats.displayNameKey) : stats.displayName}</span>
        <span className="text-xs text-gray-500">· {t(`roles.${stats.role}`) || stats.role}</span>
        <span className="text-xs text-gray-600 ml-auto">{t('heroesPage.duration', { n: stats.duration })}</span>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {[
          { label: 'HP',  val: stats.hp,  color: '#22c55e' },
          { label: 'ATK', val: stats.atk, color: '#ef4444' },
          { label: 'DEF', val: stats.def, color: '#3b82f6' },
          { label: 'SPD', val: stats.spd, color: '#a855f7' },
          { label: 'ASPD', val: ROLE_ATTACK_COOLDOWN[stats.role] ?? 1.5, color: '#f59e0b' },
          { label: 'DPS', val: Math.round(stats.atk / (ROLE_ATTACK_COOLDOWN[stats.role] ?? 1.5)), color: '#ef4444' },
        ].map(({ label, val, color }) => (
          <div key={label} className="bg-gray-900/60 rounded p-1.5 text-center">
            <div className="text-xs text-gray-500">{label}</div>
            <div className="text-xs font-bold font-mono" style={{ color }}>{val}</div>
          </div>
        ))}
      </div>
      {stats.attackRange > 100 && (
        <p className="text-xs text-gray-600 mt-1.5">{t('heroesPage.range', { n: stats.attackRange })}</p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// 스킬 카드
// ──────────────────────────────────────────────
function SkillCard({
  skill, routeColor, isPurchased, isEquipped, isLocked, equippedCount, maxEquipped, userGold,
  onPurchase, onToggleEquip,
}: {
  skill: RouteSkill;
  routeColor: string;
  isPurchased: boolean;
  isEquipped: boolean;
  isLocked: boolean;
  equippedCount: number;
  maxEquipped: number;
  userGold: number;
  onPurchase: () => void;
  onToggleEquip: () => void;
}) {
  const { t } = useTranslation();
  const canEquip = isEquipped || equippedCount < maxEquipped;
  const canAfford = userGold >= skill.cost;

  const translatedName = skill.nameKey ? t(skill.nameKey) : skill.name;
  const translatedDesc = skill.descriptionKey ? t(skill.descriptionKey) : skill.description;

  return (
    <div className="border rounded-lg p-3 transition-all"
      style={isEquipped ? { borderColor: routeColor, background: routeColor+'18' }
           : isPurchased ? { borderColor: '#4b5563', background: '#1f2937' }
           : { borderColor: '#374151', background: '#111827', opacity: isLocked ? 0.5 : 1 }}>
      <div className="flex items-start gap-3">
        {/* 아이콘 */}
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold border"
          style={isEquipped ? { borderColor: routeColor, background: routeColor+'44', color: routeColor }
               : isPurchased ? { borderColor: '#4b5563', background: '#374151', color: '#9ca3af' }
               : { borderColor: '#374151', background: '#1f2937', color: '#4b5563' }}>
          {isLocked ? '🔒' : skill.isShared ? t('heroesPage.skillSharedIcon') : t('heroesPage.skillUniqueIcon')}
        </div>
        {/* 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <span className="text-white text-sm font-semibold">{translatedName}</span>
            {skill.isShared && <span className="text-xs text-gray-500 bg-gray-800 px-1 rounded">{t('heroesPage.sharedBadge')}</span>}
            {skill.isFinal && <span className="text-xs text-yellow-600 bg-yellow-900/40 px-1 rounded border border-yellow-700/50">{t('heroesPage.finalBadge')}</span>}
            {skill.summonStats && <span className="text-xs px-1 rounded" style={{ color: routeColor, background: routeColor+'22' }}>{t('heroesPage.summonBadge')}</span>}
            {isEquipped && <span className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ color: routeColor, backgroundColor: routeColor+'22' }}>{t('heroesPage.equippedBadge')}</span>}
            {isPurchased && !isEquipped && <span className="text-xs text-gray-500 bg-gray-700/50 px-1 rounded">{t('heroesPage.ownedBadge')}</span>}
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">{translatedDesc}</p>
          {isLocked && (
            <p className="text-xs text-yellow-600 mt-1">{t('heroesPage.finalLocked')}</p>
          )}
          {skill.synergyNote && !isLocked && (
            <div className="mt-1.5 flex items-start gap-1">
              <span className="text-yellow-400 text-xs flex-shrink-0">⚡</span>
              <p className="text-xs text-yellow-300/80 leading-relaxed">
                {skill.synergyNoteKey ? t(skill.synergyNoteKey) : skill.synergyNote}
              </p>
            </div>
          )}
          {/* 소환수 스탯 패널 */}
          {skill.summonStats && (
            <SummonStatsPanel stats={skill.summonStats} routeColor={routeColor} />
          )}
        </div>
        {/* 버튼 */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <span className="text-xs text-center font-bold" style={{ color: canAfford || isPurchased ? '#facc15' : '#6b7280' }}>
            {isPurchased ? t('heroesPage.purchased') : `💰 ${skill.cost.toLocaleString()}G`}
          </span>
          {!isPurchased ? (
            <button onClick={onPurchase} disabled={isLocked || !canAfford}
              className="px-2 py-1 rounded text-xs font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={!isLocked && canAfford ? { background: '#ca8a04', color: '#fff' } : { background: '#374151', color: '#6b7280' }}>
              {t('heroesPage.buyBtn')}
            </button>
          ) : isEquipped ? (
            <button onClick={onToggleEquip}
              className="px-2 py-1 rounded text-xs font-semibold bg-red-900/60 hover:bg-red-700/60 text-red-300 transition-colors">
              {t('heroesPage.unequipBtn')}
            </button>
          ) : (
            <button onClick={onToggleEquip} disabled={!canEquip}
              className="px-2 py-1 rounded text-xs font-semibold transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              style={canEquip ? { background: routeColor+'44', color: routeColor, border:`1px solid ${routeColor}` } : { background:'#1f2937', color:'#4b5563' }}>
              {t('heroesPage.equipBtn')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 루트 패널
// ──────────────────────────────────────────────
function RoutePanel({
  hero, route, activeRouteId, purchasedIds, equippedIds, equippedCount, maxEquipped, userGold,
  onActivate, onPurchase, onToggleEquip,
}: {
  hero: HeroDefinition;
  route: ClassRoute;
  activeRouteId: string;
  purchasedIds: Set<string>;
  equippedIds: Set<string>;
  equippedCount: number;
  maxEquipped: number;
  userGold: number;
  onActivate: (id: string) => void;
  onPurchase: (skill: RouteSkill) => void;
  onToggleEquip: (skillId: string) => void;
}) {
  const { t } = useTranslation();
  const isActive = route.id === activeRouteId;
  // 최종 스킬(isFinal) 해금 조건: 같은 루트의 non-final 스킬 3개 모두 구매
  const nonFinalSkills = route.skills.filter(s => !s.isFinal);
  const finalUnlocked = nonFinalSkills.every(s => purchasedIds.has(s.id));

  const translatedRouteName = route.nameKey ? t(route.nameKey) : route.name;
  const translatedVariantName = route.uniqueVariant.nameKey ? t(route.uniqueVariant.nameKey) : route.uniqueVariant.name;

  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: isActive ? route.color : '#374151' }}>
      {/* 헤더 */}
      <div className="px-4 py-3 flex items-center justify-between"
        style={{ background: isActive ? route.color+'22' : '#1f2937' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: isActive ? route.color : '#4b5563' }} />
          <span className="font-bold text-sm flex items-center" style={{ color: isActive ? route.color : '#9ca3af' }}>
            {getRouteIcon(route.name)}
            {t('heroesPage.routeLabel', { name: translatedRouteName })}
          </span>
          {isActive && (
            <span className="text-xs px-1.5 py-0.5 rounded font-semibold"
              style={{ background: route.color+'33', color: route.color }}>{t('heroesPage.routeActive')}</span>
          )}
        </div>
        {!isActive ? (
          <button onClick={() => onActivate(route.id)}
            className="text-xs px-3 py-1 rounded border font-semibold transition-colors hover:opacity-80"
            style={{ borderColor: route.color, color: route.color, background: route.color+'11' }}>
            {t('heroesPage.activateRoute')}
          </button>
        ) : (
          <span className="text-xs text-gray-500">{t('heroesPage.uniqueLabel', { name: translatedVariantName })}</span>
        )}
      </div>
      {/* 비활성 루트: 고유스킬 미리보기 */}
      {!isActive && (
        <div className="px-4 py-2 bg-gray-900/40 border-b border-gray-800">
          <p className="text-xs text-gray-500">
            <span className="text-gray-400">{t('heroesPage.uniquePreview')} </span>
            <span style={{ color: route.color }}>{translatedVariantName}</span>:{' '}
            {route.uniqueVariant.descriptionTemplateKey
              ? t(route.uniqueVariant.descriptionTemplateKey, { value: getUniqueValue(hero, hero.starRating), unit: hero.uniqueSkill.unit })
              : route.uniqueVariant.descriptionTemplate
                .replace('{value}', String(getUniqueValue(hero, hero.starRating)))
                .replace('{unit}', hero.uniqueSkill.unit)}
          </p>
        </div>
      )}
      {/* 스킬 목록 */}
      <div className="p-3 space-y-2 bg-gray-900/20">
        {route.skills.map(skill => {
          const isFinalSkill = !!skill.isFinal;
          const isLocked = isFinalSkill && !finalUnlocked;
          // 공유 스킬은 루트별로 독립 장착 가능 (중복 적용을 위해 compound key 사용)
          const skillKey = skill.isShared ? `${route.id}__${skill.id}` : skill.id;
          return (
            <SkillCard key={skillKey} skill={skill} routeColor={route.color}
              isPurchased={purchasedIds.has(skill.id)}
              isEquipped={equippedIds.has(skillKey)}
              isLocked={isLocked}
              equippedCount={equippedCount}
              maxEquipped={maxEquipped}
              userGold={userGold}
              onPurchase={() => onPurchase(skill)}
              onToggleEquip={() => onToggleEquip(skillKey)} />
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 장착 슬롯 요약
// ──────────────────────────────────────────────
function EquippedSlots({ hero, equippedIds, maxEquipped, onUnequip }: {
  hero: HeroDefinition; equippedIds: Set<string>; maxEquipped: number; onUnequip: (id: string) => void;
}) {
  const { t } = useTranslation();
  // compound key: 공유 스킬은 routeId__skillId, 고유 스킬은 skillId
  const allSkillSlots = hero.classRoutes.flatMap(r => r.skills.map(s => ({
    ...s, routeColor: r.color, routeName: r.name, routeNameKey: r.nameKey,
    slotKey: s.isShared ? `${r.id}__${s.id}` : s.id,
  })));
  const equipped = allSkillSlots.filter(s => equippedIds.has(s.slotKey));
  const empty = maxEquipped - equipped.length;
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-300">{t('heroesPage.equippedSkills')}</h3>
        <span className="text-xs text-gray-500">{equipped.length} / {maxEquipped}</span>
      </div>
      <div className="flex gap-2">
        {equipped.map(sk => (
          <div key={sk.slotKey} onClick={() => onUnequip(sk.slotKey)}
            className="flex-1 rounded-lg border p-2 text-center cursor-pointer hover:opacity-80 transition-opacity"
            style={{ borderColor: sk.routeColor, background: sk.routeColor+'22' }}
            title={t('heroesPage.clickToUnequip')}>
            <div className="text-xs font-bold truncate" style={{ color: sk.routeColor }}>{sk.nameKey ? t(sk.nameKey) : sk.name}</div>
            <div className="text-xs text-gray-500">{sk.routeNameKey ? t(sk.routeNameKey) : sk.routeName}</div>
          </div>
        ))}
        {Array.from({ length: empty }).map((_, i) => (
          <div key={`empty_${i}`} className="flex-1 rounded-lg border border-dashed border-gray-700 p-2 text-center">
            <div className="text-xs text-gray-700">{t('heroesPage.emptySlot')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 영웅 초상화 + 스탯
// ──────────────────────────────────────────────
// ──────────────────────────────────────────────
// 주인공 전용 패널 (완전 별도 UI)
// ──────────────────────────────────────────────
function ProtagonistPanel({
  proto, displayName, protagonistSave, allHeroSave, regularHeroes, userGold, ownedHeroCount,
  onStarUpgrade, onEquip, onUnequip, onRoleChange, onUnlockRole, showToast,
}: {
  proto: HeroDefinition;
  displayName: string;
  protagonistSave: ProtagonistSaveData;
  allHeroSave: AllHeroSave;
  regularHeroes: HeroDefinition[];
  userGold: number;
  ownedHeroCount: number;
  onStarUpgrade: () => void;
  onEquip: (skillId: string) => void;
  onUnequip: (skillId: string) => void;
  onRoleChange: (role: Role) => void;
  onUnlockRole: (role: Role) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const { t } = useTranslation();
  const baseSlots = Math.min(5, protagonistSave.starRating);
  const bonusSlots = Math.floor(ownedHeroCount / 10);
  const currentSlots = baseSlots + bonusSlots;
  const equippedIds = new Set(protagonistSave.equippedSkillIds);
  const canEquipMore = equippedIds.size < currentSlots;

  // 사용 가능한 스킬 풀: 다른 영웅에서 구매된 스킬을 영웅별로 묶음
  type SkillEntry = { skill: RouteSkill; routeName: string; routeColor: string };
  const skillsByHero: { hero: HeroDefinition; skills: SkillEntry[] }[] = [];
  for (const h of regularHeroes) {
    const hs = allHeroSave[h.id];
    if (!hs?.purchasedSkillIds?.length) continue;
    const seen = new Set<string>();
    const entries: SkillEntry[] = [];
    for (const route of h.classRoutes) {
      for (const skill of route.skills) {
        if (hs.purchasedSkillIds.includes(skill.id) && !seen.has(skill.id)) {
          seen.add(skill.id);
          entries.push({ skill, routeName: route.name, routeColor: route.color });
        }
      }
    }
    if (entries.length > 0) skillsByHero.push({ hero: h, skills: entries });
  }
  const totalAvailable = skillsByHero.reduce((s, g) => s + g.skills.length, 0);

  // 성급 업그레이드 패널용 임시 hero 객체
  const protoWithStar = { ...proto, starRating: protagonistSave.starRating };

  const ROLE_OPTIONS: { role: Role; label: string; color: string }[] = [
    { role: 'tank',       label: t('roles.tank'),       color: ROLE_COLORS.tank },
    { role: 'melee_dps',  label: t('roles.melee_dps'),  color: ROLE_COLORS.melee_dps },
    { role: 'ranged_dps', label: t('roles.ranged_dps'), color: ROLE_COLORS.ranged_dps },
    { role: 'cc',         label: t('roles.cc'),         color: ROLE_COLORS.cc },
    { role: 'healer',     label: t('roles.healer'),     color: ROLE_COLORS.healer },
    { role: 'mechanic',   label: t('roles.mechanic'),   color: ROLE_COLORS.mechanic },
  ];

  return (
    <div className="space-y-4">
      {/* 상단 바 */}
      <div className="bg-gray-800/60 border rounded-xl px-5 py-4 flex items-center justify-between"
        style={{ borderColor: '#e11d4860' }}>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-black px-2 py-0.5 rounded border"
            style={{ color: '#ec4899', borderColor: '#ec4899', backgroundColor: '#ec489922' }}>SSR</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{ color: '#fbbf24', borderColor: '#fbbf24', background: '#fbbf2415' }}>{t('heroesPage.protagonistBadge')}</span>
          <span className="text-2xl font-black" style={{ color: '#e11d48' }}>{displayName}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
            style={{ color: '#e11d48', borderColor: '#e11d48', backgroundColor: '#e11d4822' }}>{t('heroesPage.allrounderBadge')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{t('heroesPage.starLabel')}</span>
          <div className="flex gap-0.5">
            {([1,2,3,4,5] as const).map(s => (
              <span key={s} className="text-lg"
                style={{ color: s <= protagonistSave.starRating ? '#facc15' : '#374151' }}>★</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* 초상화 + 역할 선택 */}
        <div className="w-44 flex-shrink-0 flex flex-col items-center gap-3">
          {/* 초상화 */}
          <div className="w-28 h-36 rounded-xl flex flex-col items-center justify-center border-2 relative overflow-hidden select-none"
            style={{ borderColor: '#e11d48', background: 'linear-gradient(160deg, #e11d4833, #e11d4811)' }}>
            {proto.sprite ? (
              <div className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(/graphic/${proto.sprite})`,
                  backgroundSize: '183.3% 100%',
                  backgroundPosition: '0% 0%',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            ) : (
              <>
                <div className="absolute inset-0 opacity-10"
                  style={{ background: 'radial-gradient(ellipse at center, #fbbf24, transparent 70%)' }} />
                <div className="text-5xl font-black" style={{ color: '#e11d48', textShadow: '0 0 24px #e11d48' }}>
                  {displayName[0] ?? '?'}
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="text-xs text-gray-300 mt-1 font-semibold text-center px-1 w-full truncate absolute bottom-4">{displayName}</div>
            <div className="absolute bottom-1 flex gap-px">
              {[1,2,3,4,5].map(s => (
                <span key={s} className="text-xs"
                  style={{ color: s <= protagonistSave.starRating ? '#facc15' : '#374151' }}>★</span>
              ))}
            </div>
            <div className="absolute top-1.5 left-1.5 text-xs px-1 rounded font-bold"
              style={{ background: '#e11d4888', color: '#fff' }}>{t('heroesPage.allrounderBadge')}</div>
          </div>
          {/* 기본 스탯 */}
          <div className="w-full bg-gray-800/60 rounded-lg p-2.5">
            {(() => {
              const scaled = getScaledBaseStats(proto, protagonistSave.starRating);
              const combat = calcHeroCombatStats(proto, protagonistSave.starRating, undefined, protagonistSave.selectedRole);
              return [
                { label: 'HP', val: scaled.hp, max: 1000, color: '#22c55e' },
                { label: 'ATK', val: combat.finalAtk, max: 150, color: '#ef4444' },
                { label: 'DEF', val: scaled.def, max: 80, color: '#3b82f6' },
                { label: 'SPD', val: scaled.spd, max: 7, color: '#a855f7' },
                { label: 'ASPD', val: combat.attackCooldown, max: 3, color: '#f59e0b' },
                { label: 'DPS', val: combat.dps, max: 300, color: '#ef4444' },
              ].map(({ label, val, max, color: c }) => (
                <div key={label} className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs text-gray-500 w-7">{label}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width:`${Math.min(100,(val/max)*100)}%`, backgroundColor: c }} />
                  </div>
                  <span className="text-xs font-mono w-9 text-right" style={{ color: c }}>{val}</span>
                </div>
              ));
            })()}
          </div>
          {/* 게임 내 역할 선택 */}
          <div className="w-full">
            <p className="text-xs text-gray-500 text-center mb-1.5">{t('heroesPage.inGameRole')}</p>
            <div className="flex flex-col gap-1">
              {ROLE_OPTIONS.map(({ role, label, color }) => {
                const unlocked = protagonistSave.unlockedRoles?.includes(role);
                const isSelected = protagonistSave.selectedRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => unlocked ? onRoleChange(role) : onUnlockRole(role)}
                    title={unlocked ? undefined : t('heroesPage.unlockRoleHint')}
                    className={`text-xs px-2 py-1.5 rounded text-left font-semibold transition-colors`}
                    style={
                      isSelected && unlocked
                        ? { background: color + '33', color, border: `1px solid ${color}` }
                        : unlocked
                          ? { background: '#1f2937', color: '#9ca3af', border: '1px solid #374151' }
                          : { background: '#111827', color: '#4b5563', border: '1px dashed #374151' }
                    }
                  >
                    {unlocked ? label : `🔓 300G ${label}`}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 text-center mt-1.5 italic">{t('heroesPage.lockedRoleHint')}</p>
          </div>
          <p className="text-xs text-gray-600 italic text-center leading-relaxed px-1">{proto.loreKey ? t(proto.loreKey) : proto.lore}</p>
        </div>

        {/* 우측 패널 */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* 고유 능력: 영웅의 그릇 */}
          <div className="rounded-lg p-4 border"
            style={{ borderColor: '#e11d4880', background: 'linear-gradient(135deg, #e11d4818, #e11d4808)' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border"
                style={{ borderColor: '#e11d48', color: '#e11d48' }}>{t('heroesPage.unique')}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{t('heroesPage.containerTitle')}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded"
                    style={{ color: '#e11d48', backgroundColor: '#e11d4822' }}>{t('heroesPage.passive')}</span>
                </div>
                <p className="text-xs text-gray-500">{t('heroesPage.containerDesc', { base: baseSlots, bonus: bonusSlots })}</p>
              </div>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed mb-3">
              {t('heroesPage.containerBody')}
            </p>
            {/* 성급별 슬롯 수 */}
            <div className="grid grid-cols-5 gap-1">
              {([1,2,3,4,5] as const).map(s => {
                const isActive = s === protagonistSave.starRating;
                return (
                  <div key={s} className="text-center rounded p-1.5"
                    style={isActive
                      ? { background: '#e11d4833', border: '1px solid #e11d48' }
                      : { background: '#1f2937', border: '1px solid #374151' }}>
                    <div className="text-xs font-bold" style={{ color: isActive ? '#e11d48' : '#4b5563' }}>{t('heroesPage.starN', { n: s })}</div>
                    <div className="text-sm font-black" style={{ color: isActive ? '#fff' : '#374151' }}>{s}</div>
                    <div className="text-xs" style={{ color: isActive ? '#9ca3af' : '#374151' }}>{t('heroesPage.slot')}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 성급 업그레이드 */}
          <StarUpgradePanel hero={protoWithStar} userGold={userGold} onUpgrade={onStarUpgrade} />

          {/* 장착 슬롯 */}
          <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">{t('heroesPage.equippedSkills')}</h3>
              <span className="text-xs" style={{ color: equippedIds.size >= currentSlots ? '#e11d48' : '#6b7280' }}>
                {t('heroesPage.slotsCount', { n: equippedIds.size, max: currentSlots })}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {protagonistSave.equippedSkillIds.map(skillId => {
                let foundSkill: RouteSkill | undefined;
                let foundColor = '#e11d48';
                let foundHeroName = '';
                for (const g of skillsByHero) {
                  const f = g.skills.find(s => s.skill.id === skillId);
                  if (f) { foundSkill = f.skill; foundColor = f.routeColor; foundHeroName = g.hero.nameKey ? t(g.hero.nameKey) : g.hero.name; break; }
                }
                if (!foundSkill) return null;
                return (
                  <div key={skillId} onClick={() => onUnequip(skillId)}
                    className="flex-1 min-w-[80px] rounded-lg border p-2 text-center cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ borderColor: foundColor, background: foundColor+'22' }}
                    title={t('heroesPage.clickToUnequip')}>
                    <div className="text-xs font-bold truncate" style={{ color: foundColor }}>{foundSkill.nameKey ? t(foundSkill.nameKey) : foundSkill.name}</div>
                    <div className="text-xs text-gray-500 truncate">{foundHeroName}</div>
                  </div>
                );
              })}
              {Array.from({ length: Math.max(0, currentSlots - equippedIds.size) }).map((_, i) => (
                <div key={`empty_${i}`} className="flex-1 min-w-[80px] rounded-lg border border-dashed border-gray-700 p-2 text-center">
                  <div className="text-xs text-gray-700">{t('heroesPage.emptySlot')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 사용 가능한 스킬 풀 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-sm font-semibold text-gray-300">{t('heroesPage.availableSkills')}</h3>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{t('heroesPage.unlockedCount', { n: totalAvailable })}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ color: '#e11d48', background: '#e11d4815', border: '1px solid #e11d4840' }}>
            {t('heroesPage.autoAddHint')}
          </span>
        </div>
        {skillsByHero.length === 0 ? (
          <div className="bg-gray-900/60 border border-dashed border-gray-700 rounded-xl p-8 text-center">
            <div className="text-3xl mb-3">⚔️</div>
            <p className="text-sm text-gray-500 font-semibold">{t('heroesPage.noSkillsYet')}</p>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
              {t('heroesPage.noSkillsDesc')}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {skillsByHero.map(({ hero: h, skills }) => (
              <div key={h.id} className="bg-gray-800/40 border border-gray-700 rounded-xl overflow-hidden">
                {/* 영웅 헤더 */}
                <div className="px-4 py-2.5 border-b border-gray-700 flex items-center gap-2"
                  style={{ background: (ROLE_COLORS[h.role] ?? '#6b7280')+'11' }}>
                  <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-black border flex-shrink-0"
                    style={{ borderColor: ROLE_COLORS[h.role]??'#6b7280', color: ROLE_COLORS[h.role]??'#6b7280', background: (ROLE_COLORS[h.role]??'#6b7280')+'22' }}>
                    {(h.nameKey ? t(h.nameKey) : h.name)[0]}
                  </div>
                  <span className="text-sm font-semibold text-gray-200">{h.nameKey ? t(h.nameKey) : h.name}</span>
                  <RoleBadge role={h.role} />
                  <span className="text-xs text-gray-600 ml-auto">{t('heroesPage.heroesUnlocked', { n: skills.length })}</span>
                </div>
                {/* 스킬 목록 */}
                <div className="p-3 space-y-2">
                  {skills.map(({ skill, routeName, routeColor }) => {
                    const isEquipped = equippedIds.has(skill.id);
                    return (
                      <div key={skill.id}
                        className="border rounded-lg p-2.5 flex items-center gap-3 transition-all"
                        style={isEquipped
                          ? { borderColor: routeColor, background: routeColor+'18' }
                          : { borderColor: '#374151', background: '#111827' }}>
                        <div className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold border flex-shrink-0"
                          style={isEquipped
                            ? { borderColor: routeColor, background: routeColor+'44', color: routeColor }
                            : { borderColor: '#374151', background: '#1f2937', color: '#4b5563' }}>
                          {skill.isShared ? t('heroesPage.skillSharedIcon') : t('heroesPage.skillUniqueIcon')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {getRouteIcon(routeName)}
                            <span className="text-white text-sm font-semibold">{skill.nameKey ? t(skill.nameKey) : skill.name}</span>
                            {skill.isShared && <span className="text-xs text-gray-500 bg-gray-800 px-1 rounded">{t('heroesPage.sharedBadge')}</span>}
                            {isEquipped && <span className="text-xs px-1.5 rounded font-semibold" style={{ color: routeColor, backgroundColor: routeColor+'22' }}>{t('heroesPage.equippedBadge')}</span>}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{skill.descriptionKey ? t(skill.descriptionKey) : skill.description}</p>
                        </div>
                        {isEquipped ? (
                          <button onClick={() => onUnequip(skill.id)}
                            className="px-2.5 py-1.5 rounded text-xs font-semibold bg-red-900/60 hover:bg-red-700/60 text-red-300 flex-shrink-0 transition-colors">
                            {t('heroesPage.unequipBtn')}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (canEquipMore) onEquip(skill.id);
                              else showToast(t('heroesPage.toastSlotShort'), 'error');
                            }}
                            disabled={!canEquipMore}
                            className="px-2.5 py-1.5 rounded text-xs font-semibold flex-shrink-0 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            style={canEquipMore
                              ? { background: routeColor+'44', color: routeColor, border: `1px solid ${routeColor}` }
                              : { background: '#1f2937', color: '#4b5563', border: '1px solid #374151' }}>
                            {t('heroesPage.equipBtn')}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 도움말 */}
      <div className="bg-gray-900/60 border border-gray-700/40 rounded-lg p-3 text-xs text-gray-500 leading-relaxed">
        {t('heroesPage.protagonistHelp')}
      </div>
    </div>
  );
}

function AIProtagonistPanel({
  proto, aiSave, allHeroSave, regularHeroes, userGold,
  onStarUpgrade, onEquip, onUnequip, onRoleChange, onUnlockRole, showToast,
}: {
  proto: HeroDefinition;
  aiSave: ProtagonistAISaveData;
  allHeroSave: AllHeroSave;
  regularHeroes: HeroDefinition[];
  userGold: number;
  onStarUpgrade: () => void;
  onEquip: (skillId: string) => void;
  onUnequip: (skillId: string) => void;
  onRoleChange: (role: Role) => void;
  onUnlockRole: (role: Role) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const baseSlots = Math.min(5, aiSave.starRating);
  const { t } = useTranslation();
  const equippedIds = new Set(aiSave.equippedSkillIds);
  const canEquipMore = equippedIds.size < baseSlots;
  const boostPct = proto.uniqueSkill.baseValues[aiSave.starRating - 1] ?? 5;

  type SkillEntry = { skill: RouteSkill; routeName: string; routeColor: string };
  const skillsByHero: { hero: HeroDefinition; skills: SkillEntry[] }[] = [];
  for (const h of regularHeroes) {
    const hs = allHeroSave[h.id];
    if (!hs?.purchasedSkillIds?.length) continue;
    const seen = new Set<string>();
    const entries: SkillEntry[] = [];
    for (const route of h.classRoutes) {
      for (const skill of route.skills) {
        if (hs.purchasedSkillIds.includes(skill.id) && !seen.has(skill.id)) {
          seen.add(skill.id);
          entries.push({ skill, routeName: route.name, routeColor: route.color });
        }
      }
    }
    if (entries.length > 0) skillsByHero.push({ hero: h, skills: entries });
  }

  const ROLE_OPTIONS: { role: Role; label: string; color: string }[] = [
    { role: 'tank',       label: t('roles.tank'),       color: ROLE_COLORS.tank },
    { role: 'melee_dps',  label: t('roles.melee_dps'),  color: ROLE_COLORS.melee_dps },
    { role: 'ranged_dps', label: t('roles.ranged_dps'), color: ROLE_COLORS.ranged_dps },
    { role: 'cc',         label: t('roles.cc'),         color: ROLE_COLORS.cc },
    { role: 'healer',     label: t('roles.healer'),     color: ROLE_COLORS.healer },
    { role: 'mechanic',   label: t('roles.mechanic'),   color: ROLE_COLORS.mechanic },
  ];

  return (
    <div className="space-y-4">
      {/* 상단 바 */}
      <div className="bg-gray-800/60 border rounded-xl px-5 py-4 flex items-center justify-between"
        style={{ borderColor: '#a855f760' }}>
        <div className="flex items-center gap-3 flex-wrap">
          <GradeBadge grade="LR" />
          <span className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{ color: '#a855f7', borderColor: '#a855f7', background: '#a855f715' }}>{t('heroesPage.aiBadge')}</span>
          <span className="text-2xl font-black" style={{ color: '#a855f7' }}>{proto.name}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
            style={{ color: '#a855f7', borderColor: '#a855f7', backgroundColor: '#a855f722' }}>{t('heroesPage.aiReward')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{t('heroesPage.starLabel')}</span>
          <div className="flex gap-0.5">
            {([1,2,3,4,5] as const).map(s => (
              <span key={s} className="text-lg"
                style={{ color: s <= aiSave.starRating ? '#facc15' : '#374151' }}>★</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* 초상화 + 역할 선택 */}
        <div className="w-44 flex-shrink-0 flex flex-col items-center gap-3">
          <div className="w-28 h-36 rounded-xl flex flex-col items-center justify-center border-2 relative overflow-hidden select-none"
            style={{ borderColor: '#a855f7', background: 'linear-gradient(160deg, #a855f733, #a855f711)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(ellipse at center, #a855f7, transparent 70%)' }} />
            <div className="text-4xl font-black" style={{ color: '#a855f7', textShadow: '0 0 24px #a855f7' }}>🤖</div>
          </div>
          <p className="text-xs text-gray-400 text-center">{getTranslatedRace(proto.raceName, t)} · {getTranslatedElement(proto.elementName, t)}</p>

          {/* 고유 능력 표시 */}
          <div className="w-full bg-purple-900/20 border border-purple-700/40 rounded-lg p-2 text-center">
            <p className="text-xs font-bold text-purple-300 mb-0.5">{t('heroesPage.aiAura')}</p>
            <p className="text-xs text-purple-200">{t('heroesPage.aiAuraDesc', { n: boostPct })}</p>
          </div>
          {/* 역할 선택 */}
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-1.5 text-center">{t('heroesPage.roleSelect')}</p>
            <div className="grid grid-cols-2 gap-1">
              {ROLE_OPTIONS.map(({ role, label, color }) => {
                const unlocked = aiSave.unlockedRoles?.includes(role);
                const isSelected = aiSave.selectedRole === role;
                return (
                  <button key={role}
                    onClick={() => unlocked ? onRoleChange(role) : onUnlockRole(role)}
                    className={`text-xs py-1 px-1.5 rounded border font-semibold transition-colors ${isSelected ? 'border-current' : unlocked ? 'border-gray-600 text-gray-400 hover:border-gray-400' : 'border-gray-700 text-gray-600 hover:border-gray-600'}`}
                    style={isSelected ? { color, borderColor: color, backgroundColor: color + '22' } : {}}>
                    {!unlocked && <span className="mr-0.5">🔒</span>}{label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 성급 업그레이드 */}
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-1 text-center">{t('heroesPage.starUpgradeTitle')}</p>
            {aiSave.starRating < 5 ? (
              <button onClick={onStarUpgrade}
                disabled={userGold < (proto.starUpgradeCosts?.[aiSave.starRating - 1] ?? 999999)}
                className="w-full text-xs py-1.5 rounded-lg border font-bold transition-colors disabled:opacity-40"
                style={{ borderColor: '#facc15', color: '#facc15', backgroundColor: '#facc1515' }}>
                {(t('heroesPage.starCostLabels', { returnObjects: true }) as string[])[aiSave.starRating - 1]}: {(proto.starUpgradeCosts?.[aiSave.starRating - 1] ?? 0).toLocaleString()}G
              </button>
            ) : (
              <div className="text-xs text-center text-yellow-400 font-bold">{t('heroesPage.maxStar')}</div>
            )}
          </div>
        </div>

        {/* 오른쪽: 스킬 장착 */}
        <div className="flex-1 space-y-4">
          <div className="bg-gray-800/40 border border-purple-800/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-purple-300">{t('heroesPage.equipSkillTitle')} <span className="text-xs font-normal text-gray-500">({equippedIds.size}/{baseSlots})</span></h4>
              <span className="text-xs text-gray-500">{t('heroesPage.equipSkillHint')}</span>
            </div>
            {skillsByHero.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-4">{t('heroesPage.buySkillHint')}</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {skillsByHero.map(({ hero: h, skills }) => (
                  <div key={h.id}>
                    <p className="text-[10px] text-gray-500 mb-1">{h.nameKey ? t(h.nameKey) : h.name}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map(({ skill, routeColor }) => {
                        const isEquipped = equippedIds.has(skill.id);
                        return (
                          <button key={skill.id}
                            onClick={() => isEquipped ? onUnequip(skill.id) : canEquipMore ? onEquip(skill.id) : showToast(t('heroesPage.toastEquipShort'), 'error')}
                            className={`text-xs px-2 py-1 rounded border font-semibold transition-colors ${isEquipped ? 'border-current' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                            style={isEquipped ? { borderColor: routeColor, color: routeColor, backgroundColor: routeColor + '20' } : {}}>
                            {skill.nameKey ? t(skill.nameKey) : skill.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* lore */}
          <div className="bg-gray-900/50 border border-purple-900/30 rounded-xl p-4">
            <p className="text-xs text-gray-400 italic leading-relaxed">{proto.lore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 어택 용사 전용 패널
// ──────────────────────────────────────────────
function OffenseProtagonistPanel({
  proto, aiSave, allHeroSave, regularHeroes, userGold,
  onStarUpgrade, onEquip, onUnequip, onRoleChange, onUnlockRole, showToast,
}: {
  proto: HeroDefinition;
  aiSave: ProtagonistAISaveData;
  allHeroSave: AllHeroSave;
  regularHeroes: HeroDefinition[];
  userGold: number;
  onStarUpgrade: () => void;
  onEquip: (skillId: string) => void;
  onUnequip: (skillId: string) => void;
  onRoleChange: (role: Role) => void;
  onUnlockRole: (role: Role) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const baseSlots = Math.min(5, aiSave.starRating);
  const { t } = useTranslation();
  const equippedIds = new Set(aiSave.equippedSkillIds);
  const canEquipMore = equippedIds.size < baseSlots;
  const boostPct = proto.uniqueSkill.baseValues[aiSave.starRating - 1] ?? 5;

  type SkillEntry = { skill: RouteSkill; routeName: string; routeColor: string };
  const skillsByHero: { hero: HeroDefinition; skills: SkillEntry[] }[] = [];
  for (const h of regularHeroes) {
    const hs = allHeroSave[h.id];
    if (!hs?.purchasedSkillIds?.length) continue;
    const seen = new Set<string>();
    const entries: SkillEntry[] = [];
    for (const route of h.classRoutes) {
      for (const skill of route.skills) {
        if (hs.purchasedSkillIds.includes(skill.id) && !seen.has(skill.id)) {
          seen.add(skill.id);
          entries.push({ skill, routeName: route.name, routeColor: route.color });
        }
      }
    }
    if (entries.length > 0) skillsByHero.push({ hero: h, skills: entries });
  }

  const ROLE_OPTIONS: { role: Role; label: string; color: string }[] = [
    { role: 'tank',       label: t('roles.tank'),       color: ROLE_COLORS.tank },
    { role: 'melee_dps',  label: t('roles.melee_dps'),  color: ROLE_COLORS.melee_dps },
    { role: 'ranged_dps', label: t('roles.ranged_dps'), color: ROLE_COLORS.ranged_dps },
    { role: 'cc',         label: t('roles.cc'),         color: ROLE_COLORS.cc },
    { role: 'healer',     label: t('roles.healer'),     color: ROLE_COLORS.healer },
    { role: 'mechanic',   label: t('roles.mechanic'),   color: ROLE_COLORS.mechanic },
  ];

  return (
    <div className="space-y-4">
      {/* 상단 바 */}
      <div className="bg-gray-800/60 border rounded-xl px-5 py-4 flex items-center justify-between"
        style={{ borderColor: '#f59e0b60' }}>
        <div className="flex items-center gap-3 flex-wrap">
          <GradeBadge grade="LR" />
          <span className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{ color: '#f59e0b', borderColor: '#f59e0b', background: '#f59e0b15' }}>{t('heroesPage.offenseBadge')}</span>
          <span className="text-2xl font-black" style={{ color: '#f59e0b' }}>{proto.name}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
            style={{ color: '#f59e0b', borderColor: '#f59e0b', backgroundColor: '#f59e0b22' }}>{t('heroesPage.offenseReward')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{t('heroesPage.starLabel')}</span>
          <div className="flex gap-0.5">
            {([1,2,3,4,5] as const).map(s => (
              <span key={s} className="text-lg"
                style={{ color: s <= aiSave.starRating ? '#facc15' : '#374151' }}>★</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* 초상화 + 역할 선택 */}
        <div className="w-44 flex-shrink-0 flex flex-col items-center gap-3">
          <div className="w-28 h-36 rounded-xl flex flex-col items-center justify-center border-2 relative overflow-hidden select-none"
            style={{ borderColor: '#f59e0b', background: 'linear-gradient(160deg, #f59e0b33, #f59e0b11)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(ellipse at center, #f59e0b, transparent 70%)' }} />
            <div className="text-4xl font-black" style={{ color: '#f59e0b', textShadow: '0 0 24px #f59e0b' }}>⚔️</div>
          </div>
          <p className="text-xs text-gray-400 text-center">{getTranslatedRace(proto.raceName, t)} · {getTranslatedElement(proto.elementName, t)}</p>

          {/* 고유 능력 표시 */}
          <div className="w-full bg-amber-900/20 border border-amber-700/40 rounded-lg p-2 text-center">
            <p className="text-xs font-bold text-amber-300 mb-0.5">{t('heroesPage.offenseAura')}</p>
            <p className="text-xs text-amber-200">{t('heroesPage.offenseAuraDesc', { n: boostPct })}</p>
          </div>

          {/* 역할 선택 */}
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-1.5 text-center">{t('heroesPage.roleSelect')}</p>
            <div className="grid grid-cols-2 gap-1">
              {ROLE_OPTIONS.map(({ role, label, color }) => {
                const unlocked = aiSave.unlockedRoles?.includes(role);
                const isSelected = aiSave.selectedRole === role;
                return (
                  <button key={role}
                    onClick={() => unlocked ? onRoleChange(role) : onUnlockRole(role)}
                    className={`text-xs py-1 px-1.5 rounded border font-semibold transition-colors ${isSelected ? 'border-current' : unlocked ? 'border-gray-600 text-gray-400 hover:border-gray-400' : 'border-gray-700 text-gray-600 hover:border-gray-600'}`}
                    style={isSelected ? { color, borderColor: color, backgroundColor: color + '22' } : {}}>
                    {!unlocked && <span className="mr-0.5">🔒</span>}{label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 성급 업그레이드 */}
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-1 text-center">{t('heroesPage.starUpgradeTitle')}</p>
            {aiSave.starRating < 5 ? (
              <button onClick={onStarUpgrade}
                disabled={userGold < (proto.starUpgradeCosts?.[aiSave.starRating - 1] ?? 999999)}
                className="w-full text-xs py-1.5 rounded-lg border font-bold transition-colors disabled:opacity-40"
                style={{ borderColor: '#facc15', color: '#facc15', backgroundColor: '#facc1515' }}>
                {(t('heroesPage.starCostLabels', { returnObjects: true }) as string[])[aiSave.starRating - 1]}: {(proto.starUpgradeCosts?.[aiSave.starRating - 1] ?? 0).toLocaleString()}G
              </button>
            ) : (
              <div className="text-xs text-center text-yellow-400 font-bold">{t('heroesPage.maxStar')}</div>
            )}
          </div>
        </div>

        {/* 오른쪽: 스킬 장착 */}
        <div className="flex-1 space-y-4">
          <div className="bg-gray-800/40 border border-amber-800/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-amber-300">{t('heroesPage.equipSkillTitle')} <span className="text-xs font-normal text-gray-500">({equippedIds.size}/{baseSlots})</span></h4>
              <span className="text-xs text-gray-500">{t('heroesPage.equipSkillHint')}</span>
            </div>
            {skillsByHero.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-4">{t('heroesPage.buySkillHint')}</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {skillsByHero.map(({ hero: h, skills }) => (
                  <div key={h.id}>
                    <p className="text-[10px] text-gray-500 mb-1">{h.nameKey ? t(h.nameKey) : h.name}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map(({ skill, routeColor }) => {
                        const isEquipped = equippedIds.has(skill.id);
                        return (
                          <button key={skill.id}
                            onClick={() => isEquipped ? onUnequip(skill.id) : canEquipMore ? onEquip(skill.id) : showToast(t('heroesPage.toastEquipShort'), 'error')}
                            className={`text-xs px-2 py-1 rounded border font-semibold transition-colors ${isEquipped ? 'border-current' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                            style={isEquipped ? { borderColor: routeColor, color: routeColor, backgroundColor: routeColor + '20' } : {}}>
                            {skill.nameKey ? t(skill.nameKey) : skill.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* lore */}
          <div className="bg-gray-900/50 border border-amber-900/30 rounded-xl p-4">
            <p className="text-xs text-gray-400 italic leading-relaxed">{proto.lore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 레이드 용사 전용 패널
// ──────────────────────────────────────────────
function RaidProtagonistPanel({
  proto, aiSave, allHeroSave, regularHeroes, userGold,
  onStarUpgrade, onEquip, onUnequip, onRoleChange, onUnlockRole, showToast,
}: {
  proto: HeroDefinition;
  aiSave: ProtagonistAISaveData;
  allHeroSave: AllHeroSave;
  regularHeroes: HeroDefinition[];
  userGold: number;
  onStarUpgrade: () => void;
  onEquip: (skillId: string) => void;
  onUnequip: (skillId: string) => void;
  onRoleChange: (role: Role) => void;
  onUnlockRole: (role: Role) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const baseSlots = Math.min(5, aiSave.starRating);
  const { t } = useTranslation();
  const equippedIds = new Set(aiSave.equippedSkillIds);
  const canEquipMore = equippedIds.size < baseSlots;
  const boostPct = proto.uniqueSkill.baseValues[aiSave.starRating - 1] ?? 5;

  type SkillEntry = { skill: RouteSkill; routeName: string; routeColor: string };
  const skillsByHero: { hero: HeroDefinition; skills: SkillEntry[] }[] = [];
  for (const h of regularHeroes) {
    const hs = allHeroSave[h.id];
    if (!hs?.purchasedSkillIds?.length) continue;
    const seen = new Set<string>();
    const entries: SkillEntry[] = [];
    for (const route of h.classRoutes) {
      for (const skill of route.skills) {
        if (hs.purchasedSkillIds.includes(skill.id) && !seen.has(skill.id)) {
          seen.add(skill.id);
          entries.push({ skill, routeName: route.name, routeColor: route.color });
        }
      }
    }
    if (entries.length > 0) skillsByHero.push({ hero: h, skills: entries });
  }

  const ROLE_OPTIONS: { role: Role; label: string; color: string }[] = [
    { role: 'tank',       label: t('roles.tank'),       color: ROLE_COLORS.tank },
    { role: 'melee_dps',  label: t('roles.melee_dps'),  color: ROLE_COLORS.melee_dps },
    { role: 'ranged_dps', label: t('roles.ranged_dps'), color: ROLE_COLORS.ranged_dps },
    { role: 'cc',         label: t('roles.cc'),         color: ROLE_COLORS.cc },
    { role: 'healer',     label: t('roles.healer'),     color: ROLE_COLORS.healer },
    { role: 'mechanic',   label: t('roles.mechanic'),   color: ROLE_COLORS.mechanic },
  ];

  return (
    <div className="space-y-4">
      {/* 상단 바 */}
      <div className="bg-gray-800/60 border rounded-xl px-5 py-4 flex items-center justify-between"
        style={{ borderColor: '#10b98160' }}>
        <div className="flex items-center gap-3 flex-wrap">
          <GradeBadge grade="LR" />
          <span className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{ color: '#10b981', borderColor: '#10b981', background: '#10b98115' }}>{t('heroesPage.raidBadge')}</span>
          <span className="text-2xl font-black" style={{ color: '#10b981' }}>{proto.name}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
            style={{ color: '#10b981', borderColor: '#10b981', backgroundColor: '#10b98122' }}>{t('heroesPage.raidReward')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{t('heroesPage.starLabel')}</span>
          <div className="flex gap-0.5">
            {([1,2,3,4,5] as const).map(s => (
              <span key={s} className="text-lg"
                style={{ color: s <= aiSave.starRating ? '#facc15' : '#374151' }}>★</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* 초상화 + 역할 선택 */}
        <div className="w-44 flex-shrink-0 flex flex-col items-center gap-3">
          <div className="w-28 h-36 rounded-xl flex flex-col items-center justify-center border-2 relative overflow-hidden select-none"
            style={{ borderColor: '#10b981', background: 'linear-gradient(160deg, #10b98133, #10b98111)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(ellipse at center, #10b981, transparent 70%)' }} />
            <div className="text-4xl font-black" style={{ color: '#10b981', textShadow: '0 0 24px #10b981' }}>🐉</div>
          </div>
          <p className="text-xs text-gray-400 text-center">{getTranslatedRace(proto.raceName, t)} · {getTranslatedElement(proto.elementName, t)}</p>

          {/* 고유 능력 표시 */}
          <div className="w-full bg-emerald-900/20 border border-emerald-700/40 rounded-lg p-2 text-center">
            <p className="text-xs font-bold text-emerald-300 mb-0.5">{t('heroesPage.raidAura')}</p>
            <p className="text-xs text-emerald-200">{t('heroesPage.raidAuraDesc', { n: boostPct })}</p>
          </div>

          {/* 역할 선택 */}
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-1.5 text-center">{t('heroesPage.roleSelect')}</p>
            <div className="grid grid-cols-2 gap-1">
              {ROLE_OPTIONS.map(({ role, label, color }) => {
                const unlocked = aiSave.unlockedRoles?.includes(role);
                const isSelected = aiSave.selectedRole === role;
                return (
                  <button key={role}
                    onClick={() => unlocked ? onRoleChange(role) : onUnlockRole(role)}
                    className={`text-xs py-1 px-1.5 rounded border font-semibold transition-colors ${isSelected ? 'border-current' : unlocked ? 'border-gray-600 text-gray-400 hover:border-gray-400' : 'border-gray-700 text-gray-600 hover:border-gray-600'}`}
                    style={isSelected ? { color, borderColor: color, backgroundColor: color + '22' } : {}}>
                    {!unlocked && <span className="mr-0.5">🔒</span>}{label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 성급 업그레이드 */}
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-1 text-center">{t('heroesPage.starUpgradeTitle')}</p>
            {aiSave.starRating < 5 ? (
              <button onClick={onStarUpgrade}
                disabled={userGold < (proto.starUpgradeCosts?.[aiSave.starRating - 1] ?? 999999)}
                className="w-full text-xs py-1.5 rounded-lg border font-bold transition-colors disabled:opacity-40"
                style={{ borderColor: '#facc15', color: '#facc15', backgroundColor: '#facc1515' }}>
                {(t('heroesPage.starCostLabels', { returnObjects: true }) as string[])[aiSave.starRating - 1]}: {(proto.starUpgradeCosts?.[aiSave.starRating - 1] ?? 0).toLocaleString()}G
              </button>
            ) : (
              <div className="text-xs text-center text-yellow-400 font-bold">{t('heroesPage.maxStar')}</div>
            )}
          </div>
        </div>

        {/* 오른쪽: 스킬 장착 */}
        <div className="flex-1 space-y-4">
          <div className="bg-gray-800/40 border border-emerald-800/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-emerald-300">{t('heroesPage.equipSkillTitle')} <span className="text-xs font-normal text-gray-500">({equippedIds.size}/{baseSlots})</span></h4>
              <span className="text-xs text-gray-500">{t('heroesPage.equipSkillHint')}</span>
            </div>
            {skillsByHero.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-4">{t('heroesPage.buySkillHint')}</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {skillsByHero.map(({ hero: h, skills }) => (
                  <div key={h.id}>
                    <p className="text-[10px] text-gray-500 mb-1">{h.nameKey ? t(h.nameKey) : h.name}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map(({ skill, routeColor }) => {
                        const isEquipped = equippedIds.has(skill.id);
                        return (
                          <button key={skill.id}
                            onClick={() => isEquipped ? onUnequip(skill.id) : canEquipMore ? onEquip(skill.id) : showToast(t('heroesPage.toastEquipShort'), 'error')}
                            className={`text-xs px-2 py-1 rounded border font-semibold transition-colors ${isEquipped ? 'border-current' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                            style={isEquipped ? { borderColor: routeColor, color: routeColor, backgroundColor: routeColor + '20' } : {}}>
                            {skill.nameKey ? t(skill.nameKey) : skill.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* lore */}
          <div className="bg-gray-900/50 border border-emerald-900/30 rounded-xl p-4">
            <p className="text-xs text-gray-400 italic leading-relaxed">{proto.lore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 디펜스 용사 전용 패널
// ──────────────────────────────────────────────
function DefenseProtagonistPanel({
  proto, defSave, allHeroSave, regularHeroes, userGold,
  onStarUpgrade, onEquip, onUnequip, onRoleChange, onUnlockRole, onTraitToggle, showToast,
}: {
  proto: HeroDefinition;
  defSave: ProtagonistDefenseSaveData;
  allHeroSave: AllHeroSave;
  regularHeroes: HeroDefinition[];
  userGold: number;
  onStarUpgrade: () => void;
  onEquip: (skillId: string) => void;
  onUnequip: (skillId: string) => void;
  onRoleChange: (role: Role) => void;
  onUnlockRole: (role: Role) => void;
  onTraitToggle: (traitKey: string) => void;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const maxTraits = proto.uniqueSkill.baseValues[defSave.starRating - 1] ?? 1;
  const { t } = useTranslation();
  const selectedTraits = new Set(defSave.selectedTraitKeys);
  const baseSlots = Math.min(5, defSave.starRating);
  const equippedIds = new Set(defSave.equippedSkillIds);
  const canEquipMore = equippedIds.size < baseSlots;

  type SkillEntry = { skill: RouteSkill; routeName: string; routeColor: string };
  const skillsByHero: { hero: HeroDefinition; skills: SkillEntry[] }[] = [];
  for (const h of regularHeroes) {
    const hs = allHeroSave[h.id];
    if (!hs?.purchasedSkillIds?.length) continue;
    const seen = new Set<string>();
    const entries: SkillEntry[] = [];
    for (const route of h.classRoutes) {
      for (const skill of route.skills) {
        if (hs.purchasedSkillIds.includes(skill.id) && !seen.has(skill.id)) {
          seen.add(skill.id);
          entries.push({ skill, routeName: route.name, routeColor: route.color });
        }
      }
    }
    if (entries.length > 0) skillsByHero.push({ hero: h, skills: entries });
  }

  const ROLE_OPTIONS: { role: Role; label: string; color: string }[] = [
    { role: 'tank',       label: t('roles.tank'),       color: ROLE_COLORS.tank },
    { role: 'melee_dps',  label: t('roles.melee_dps'),  color: ROLE_COLORS.melee_dps },
    { role: 'ranged_dps', label: t('roles.ranged_dps'), color: ROLE_COLORS.ranged_dps },
    { role: 'cc',         label: t('roles.cc'),         color: ROLE_COLORS.cc },
    { role: 'healer',     label: t('roles.healer'),     color: ROLE_COLORS.healer },
    { role: 'mechanic',   label: t('roles.mechanic'),   color: ROLE_COLORS.mechanic },
  ];

  // 고유 특성 목록: 모든 영웅의 모든 classRoute uniqueVariant
  const allTraits: { key: string; heroName: string; routeName: string; routeColor: string; traitName: string; desc: string; value: number }[] = [];
  for (const h of regularHeroes) {
    for (const route of h.classRoutes) {
      const key = `${h.id}:${route.id}`;
      const value = h.uniqueSkill.baseValues[defSave.starRating - 1] ?? h.uniqueSkill.baseValues[0];
      const desc = route.uniqueVariant.descriptionTemplate.replace('{value}', String(value));
      allTraits.push({ key, heroName: h.nameKey ? t(h.nameKey) : h.name, routeName: route.nameKey ? t(route.nameKey) : route.name, routeColor: route.color, traitName: route.uniqueVariant.nameKey ? t(route.uniqueVariant.nameKey) : route.uniqueVariant.name, desc, value });
    }
  }

  return (
    <div className="space-y-4">
      {/* 상단 바 */}
      <div className="bg-gray-800/60 border rounded-xl px-5 py-4 flex items-center justify-between"
        style={{ borderColor: '#3b82f660' }}>
        <div className="flex items-center gap-3 flex-wrap">
          <GradeBadge grade="LR" />
          <span className="text-xs font-bold px-2 py-0.5 rounded border"
            style={{ color: '#3b82f6', borderColor: '#3b82f6', background: '#3b82f615' }}>{t('heroesPage.defenseBadge')}</span>
          <span className="text-2xl font-black" style={{ color: '#3b82f6' }}>{proto.nameKey ? t(proto.nameKey) : proto.name}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
            style={{ color: '#3b82f6', borderColor: '#3b82f6', backgroundColor: '#3b82f622' }}>{t('heroesPage.defenseReward')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{t('heroesPage.starLabel')}</span>
          <div className="flex gap-0.5">
            {([1,2,3,4,5] as const).map(s => (
              <span key={s} className="text-lg"
                style={{ color: s <= defSave.starRating ? '#facc15' : '#374151' }}>★</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        {/* 초상화 + 역할 선택 */}
        <div className="w-44 flex-shrink-0 flex flex-col items-center gap-3">
          <div className="w-28 h-36 rounded-xl flex flex-col items-center justify-center border-2 relative overflow-hidden select-none"
            style={{ borderColor: '#3b82f6', background: 'linear-gradient(160deg, #3b82f633, #3b82f611)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(ellipse at center, #3b82f6, transparent 70%)' }} />
            <div className="text-4xl font-black" style={{ color: '#3b82f6', textShadow: '0 0 24px #3b82f6' }}>🛡</div>
          </div>
          <p className="text-xs text-gray-400 text-center">{getTranslatedRace(proto.raceName, t)} · {getTranslatedElement(proto.elementName, t)}</p>

          {/* 역할 선택 */}
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-1.5 text-center">{t('heroesPage.roleSelect')}</p>
            <div className="grid grid-cols-2 gap-1">
              {ROLE_OPTIONS.map(({ role, label, color }) => {
                const unlocked = defSave.unlockedRoles?.includes(role);
                const isSelected = defSave.selectedRole === role;
                return (
                  <button key={role}
                    onClick={() => unlocked ? onRoleChange(role) : onUnlockRole(role)}
                    className={`text-xs py-1 px-1.5 rounded border font-semibold transition-colors ${isSelected ? 'border-current' : unlocked ? 'border-gray-600 text-gray-400 hover:border-gray-400' : 'border-gray-700 text-gray-600 hover:border-gray-600'}`}
                    style={isSelected ? { color, borderColor: color, backgroundColor: color + '22' } : {}}>
                    {!unlocked && <span className="mr-0.5">🔒</span>}{label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 성급 업그레이드 */}
          <div className="w-full">
            <p className="text-xs text-gray-500 mb-1 text-center">{t('heroesPage.starUpgradeTitle')}</p>
            {defSave.starRating < 5 ? (
              <button onClick={onStarUpgrade}
                disabled={userGold < (proto.starUpgradeCosts?.[defSave.starRating - 1] ?? 999999)}
                className="w-full text-xs py-1.5 rounded-lg border font-bold transition-colors disabled:opacity-40"
                style={{ borderColor: '#facc15', color: '#facc15', backgroundColor: '#facc1515' }}>
                {(t('heroesPage.starCostLabels', { returnObjects: true }) as string[])[defSave.starRating - 1]}: {(proto.starUpgradeCosts?.[defSave.starRating - 1] ?? 0).toLocaleString()}G
              </button>
            ) : (
              <div className="text-xs text-center text-yellow-400 font-bold">{t('heroesPage.maxStar')}</div>
            )}
          </div>
        </div>

        {/* 오른쪽: 고유 특성 + 스킬 */}
        <div className="flex-1 space-y-4">
          {/* 고유 특성 흡수 */}
          <div className="bg-gray-800/40 border border-blue-800/40 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-blue-400">{t('heroesPage.traitAbsorb')} <span className="text-xs font-normal text-gray-400">({selectedTraits.size}/{maxTraits})</span></h4>
              <span className="text-xs text-gray-500">{t('heroesPage.traitMaxHint', { n: maxTraits })}</span>
            </div>
            {/* 선택된 특성 표시 */}
            {selectedTraits.size > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {[...selectedTraits].map(key => {
                  const trait = allTraits.find(t => t.key === key);
                  if (!trait) return null;
                  return (
                    <div key={key} className="flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs"
                      style={{ borderColor: trait.routeColor + '80', backgroundColor: trait.routeColor + '15' }}>
                      <span style={{ color: trait.routeColor }} className="font-bold">{trait.traitName}</span>
                      <span className="text-gray-400">({trait.heroName})</span>
                      <button onClick={() => onTraitToggle(key)} className="text-gray-500 hover:text-red-400 ml-1">✕</button>
                    </div>
                  );
                })}
              </div>
            )}
            {/* 특성 선택 목록 */}
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
              {allTraits.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">{t('heroesPage.traitBuyHint')}</p>
              ) : allTraits.map(tr => {
                const isSelected = selectedTraits.has(tr.key);
                const canSelect = isSelected || selectedTraits.size < maxTraits;
                return (
                  <button key={tr.key} onClick={() => canSelect ? onTraitToggle(tr.key) : showToast(t('heroesPage.toastTraitMax', { max: maxTraits }), 'error')}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-xs transition-colors ${isSelected ? 'border-current' : canSelect ? 'border-gray-700 hover:border-gray-500' : 'border-gray-800 opacity-40 cursor-not-allowed'}`}
                    style={isSelected ? { borderColor: tr.routeColor, backgroundColor: tr.routeColor + '18' } : {}}>
                    <div className="flex items-center justify-between">
                      <span style={{ color: tr.routeColor }} className="font-bold">{tr.traitName}</span>
                      <span className="text-gray-500">{tr.heroName} [{tr.routeName}]</span>
                    </div>
                    <div className="text-gray-400 mt-0.5">{tr.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 스킬 장착 (일반 용사와 동일하게 다른 영웅 스킬 장착) */}
          <div className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-gray-300">{t('heroesPage.equipSkillTitle')} <span className="text-xs font-normal text-gray-500">({equippedIds.size}/{baseSlots})</span></h4>
            </div>
            {skillsByHero.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-4">{t('heroesPage.buySkillHint')}</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {skillsByHero.map(({ hero: h, skills }) => (
                  <div key={h.id}>
                    <p className="text-[10px] text-gray-500 mb-1">{h.nameKey ? t(h.nameKey) : h.name}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map(({ skill, routeColor }) => {
                        const isEquipped = equippedIds.has(skill.id);
                        return (
                          <button key={skill.id}
                            onClick={() => isEquipped ? onUnequip(skill.id) : canEquipMore ? onEquip(skill.id) : showToast(t('heroesPage.toastEquipShort'), 'error')}
                            className={`text-xs px-2 py-1 rounded border font-semibold transition-colors ${isEquipped ? 'border-current' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                            style={isEquipped ? { borderColor: routeColor, color: routeColor, backgroundColor: routeColor + '20' } : {}}>
                            {skill.nameKey ? t(skill.nameKey) : skill.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-xs text-blue-400/70 bg-blue-900/10 border border-blue-800/30 rounded-lg px-4 py-2">
        {t('heroesPage.defenseHelp')}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 일반 영웅 전용 초상화 (주인공은 ProtagonistPanel 내 별도 초상화 사용)
function HeroPortrait({ hero, activeRouteId }: { hero: HeroDefinition; activeRouteId: string; displayName?: string }) {
  const { t } = useTranslation();
  const route = hero.classRoutes.find(r => r.id === activeRouteId) ?? hero.classRoutes[0];
  const color = route.color;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-28 h-36 rounded-xl flex flex-col items-center justify-center border-2 relative overflow-hidden select-none"
        style={{ borderColor: color, background: `linear-gradient(160deg, ${color}33, ${color}11)` }}>
        {hero.portrait ? (
          <img
            src={hero.portrait}
            alt={hero.name}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : HERO_GRAPHIC_IDS.has(hero.id) ? (
          <div className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url("/graphic/${encodeURIComponent(hero.name)}.png")`,
              backgroundSize: '183.3% 130%',
              backgroundPosition: '0% 0%',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ) : null}
        <div className="absolute top-1.5 right-1.5 text-xs px-1 rounded font-bold" style={{ background: color+'88', color: '#fff' }}>
          {route.name}
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500">{getTranslatedRace(hero.raceName, t)} · {getTranslatedElement(hero.elementName, t)}</p>
      </div>
      <div className="w-full bg-gray-800/60 rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500">{t('heroesPage.baseStats')}</span>
          <span className="text-xs font-semibold text-yellow-400">
            +{Math.round((getStarStatMultiplier(hero.starRating) - 1) * 100)}% {t('heroesPage.starBonusLabel')}
          </span>
        </div>
        {(() => {
          const scaled = getScaledBaseStats(hero, hero.starRating);
          const combat = calcHeroCombatStats(hero, hero.starRating, activeRouteId);
          return [
            { label: 'HP',  base: hero.baseStats.hp,  val: scaled.hp,  max: 1250, color: '#22c55e' },
            { label: 'ATK', base: hero.baseStats.atk, val: combat.finalAtk, max: 150,  color: '#ef4444' },
            { label: 'DEF', base: hero.baseStats.def, val: scaled.def, max: 100,  color: '#3b82f6' },
            { label: 'SPD', base: hero.baseStats.spd, val: scaled.spd, max: 7.5,  color: '#a855f7' },
            { label: 'ASPD', base: 1.5, val: combat.attackCooldown, max: 3, color: '#f59e0b' },
            { label: 'DPS', base: 10, val: combat.dps, max: 300, color: '#ef4444' },
          ].map(({ label, val, max, color: c }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-7 flex-shrink-0">{label}</span>
              <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{ width:`${Math.min(100,(val/max)*100)}%`, backgroundColor: c }} />
              </div>
              <span className="text-xs font-mono w-10 text-right" style={{ color: c }}>{val}</span>
            </div>
          ));
        })()}
      </div>
      <p className="text-xs text-gray-500 italic text-center leading-relaxed px-1">{hero.loreKey ? t(hero.loreKey) : hero.lore}</p>
    </div>
  );
}

// ──────────────────────────────────────────────
// 영웅 목록 아이템
// ──────────────────────────────────────────────
function HeroListItem({ hero, displayName, isSelected, onClick, effectiveRole, protagonistStar }: {
  hero: HeroDefinition; displayName: string; isSelected: boolean; onClick: () => void;
  /** 현재 활성 루트 기준 유효 역할 (주인공은 undefined → 올라운더 표시) */
  effectiveRole?: string;
  /** 주인공 전용: protagonistSave.starRating (미전달 시 hero.starRating fallback) */
  protagonistStar?: number;
}) {
  const { t } = useTranslation();
  const gradeColor = GRADE_COLORS[hero.grade];
  const isDefProtagonist = hero.id === 'protagonist_defense';
  const roleForColor = isDefProtagonist ? '#3b82f6' : hero.isProtagonist ? '#e11d48' : (ROLE_COLORS[effectiveRole ?? hero.role] ?? '#6b7280');
  return (
    <button onClick={onClick} className="w-full text-left p-3 rounded-lg border transition-all"
      style={isSelected
        ? { borderColor: gradeColor, background: gradeColor+'18' }
        : { borderColor: isDefProtagonist ? '#3b82f640' : hero.isProtagonist ? '#e11d4840' : '#374151', background: '#1f2937' }}>
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 border relative overflow-hidden"
          style={{
            borderColor: roleForColor,
            background: roleForColor+'22',
            color: roleForColor
          }}>
          {hero.portrait ? (
            <img
              src={hero.portrait}
              alt={hero.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : HERO_GRAPHIC_IDS.has(hero.id) ? (
            <div className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url("/graphic/${encodeURIComponent(hero.name)}.png")`,
                backgroundSize: '183.3% 130%',
                backgroundPosition: '0% 0%',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ) : null}
          {hero.isProtagonist && (
            <span className="absolute -top-1.5 -right-1.5 text-xs bg-rose-600 rounded-full w-3.5 h-3.5 flex items-center justify-center text-white z-10" style={{ fontSize: '8px' }}>★</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <GradeBadge grade={hero.grade} />
            <span className="text-white text-sm font-semibold truncate">{displayName}</span>
          </div>
          <div className="flex items-center gap-1">
            {hero.isProtagonist
              ? <span className="text-xs font-semibold px-2 py-0.5 rounded-full border"
                  style={{ color: '#e11d48', borderColor: '#e11d48', backgroundColor: '#e11d4822' }}>{t('heroesPage.allrounderBadge')}</span>
              : <RoleBadge role={effectiveRole ?? hero.role} />
            }
            <div className="flex gap-px ml-1">
              {[1,2,3,4,5].map(s => (
                <span key={s} className="text-xs" style={{ color: s <= (hero.isProtagonist ? (protagonistStar ?? hero.starRating) : hero.starRating) ? '#facc15' : '#1f2937' }}>★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

// ──────────────────────────────────────────────
// 메인 HeroesPage
// ──────────────────────────────────────────────
function HeroesPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const userId = user?.id || 0;

  const username = user?.username ?? t('heroesPage.defaultHeroName');

  // 탭 전환
  const [tab, setTab] = useState<'heroes' | 'monster-book'>('heroes');
  const [killedMonsters, setKilledMonsters] = useState<Set<string>>(() => loadKilledMonsters(userId));

  // 몬스터 도감 탭 진입 시 최신 킬 데이터 재로드
  useEffect(() => {
    if (tab === 'monster-book') {
      setKilledMonsters(loadKilledMonsters(userId));
    }
  }, [tab, userId]);

  // 백엔드 골드
  const [userGold, setUserGold] = useState<number>(0);
  const [goldLoading, setGoldLoading] = useState(true);

  // 일반 영웅 데이터 (보유한 영웅만)
  const [heroes, setHeroes] = useState<HeroDefinition[]>(() => HERO_DEFINITIONS.filter(h => h.isProtagonist));
  const [dbHeroes, setDbHeroes] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>(HERO_DEFINITIONS[0].id);

  // 역할 필터 (영웅 목록 사이드바)
  const [heroRoleFilter, setHeroRoleFilter] = useState<string>('all');
  const [heroGradeFilter, setHeroGradeFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  /** 영웅 표시 이름 반환 (주인공은 닉네임으로 치환) */
  const getDisplayName = (h: HeroDefinition) => {
    const baseName = h.nameKey ? t(h.nameKey) : h.name;
    return h.isProtagonist ? username : baseName;
  };

  // 일반 영웅 localStorage save
  const [save, setSave] = useState<AllHeroSave>({});

  // ── 주인공 전용 save (별도 관리) ──────────────────
  const [protagonistSave, setProtagonistSave] = useState<ProtagonistSaveData>(() =>
    ({ starRating: 1, equippedSkillIds: [], selectedRole: 'melee_dps', unlockedRoles: ['melee_dps'] })
  );

  // ── 디펜스 용사 전용 save ─────────────────────────
  const [defProtSave, setDefProtSave] = useState<ProtagonistDefenseSaveData>(() =>
    loadProtagonistDefenseSave(userId)
  );
  const [aiProtSave, setAiProtSave] = useState<ProtagonistAISaveData>(
    loadProtagonistAISave(user?.id ?? 0)
  );
  const [offenseProtSave, setOffenseProtSave] = useState<ProtagonistAISaveData>(
    loadProtagonistOffenseSave(user?.id ?? 0)
  );
  const [raidProtSave, setRaidProtSave] = useState<ProtagonistAISaveData>(
    loadProtagonistRaidSave(user?.id ?? 0)
  );

  // 토스트 메시지
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // 데이터 통합 불러오기 (골드 + 프로필 + 영웅)
  useEffect(() => {
    if (!userId) return;
    setGoldLoading(true);

    Promise.all([
      api.get('/user/profile'),
      api.get('/user/heroes'),
      api.get('/user/owned-heroes'),
    ]).then(([profileRes, heroesRes, ownedRes]) => {
      const dbProfile = profileRes.data;
      const dbHeroList = heroesRes.data;
      // owned-heroes: string[] (heroData.ts hero.id 기반)
      const dbOwnedIds: string[] = Array.isArray(ownedRes.data) ? ownedRes.data : [];

      setUserGold(dbProfile.gold ?? 0);
      setDbHeroes(dbHeroList);

      // 1. 주인공 데이터 병합 (DB > Local)
      const localProto = loadProtagonistSave(userId);
      const mergedProto = dbProfile.protagonistSave || localProto;
      setProtagonistSave(mergedProto);
      if (!dbProfile.protagonistSave && localProto) {
        // DB에 없으면 로컬 데이터를 DB로 업로드 (마이그레이션)
        api.post('/user/protagonist-save', { saveData: localProto }).catch(() => {});
      }

      // 2. 일반 영웅 데이터 병합
      const localSave = loadSave(userId);
      const mergedSave = { ...localSave };

      // 로컬 보유 목록 로드 후 DB owned-heroes와 병합
      const localOwnedIds = loadOwnedHeroes(userId);
      // 무한 디펜스 1000층 클리어 기록이 있으면 디펜스 용사 자동 지급 (소급 적용)
      const defBest = parseInt(localStorage.getItem(`defense_infinite_best_${userId}`) ?? '0', 10);
      if (defBest >= 1000 && !localOwnedIds.includes('protagonist_defense') && !dbOwnedIds.includes('protagonist_defense')) {
        localOwnedIds.push('protagonist_defense');
        api.post('/user/claim-milestone-hero', { milestoneType: 'protagonist_defense' }).catch(() => {});
      }
      const aiBest = parseInt(localStorage.getItem(`ai_infinite_best_${userId}`) ?? '0', 10);
      if (aiBest >= 1000 && !localOwnedIds.includes('protagonist_ai') && !dbOwnedIds.includes('protagonist_ai')) {
        localOwnedIds.push('protagonist_ai');
        api.post('/user/claim-milestone-hero', { milestoneType: 'protagonist_ai' }).catch(() => {});
      }
      const offenseBest = parseInt(localStorage.getItem(`infinite_best_${userId}`) ?? '0', 10);
      if (offenseBest >= 1000 && !localOwnedIds.includes('protagonist_offense') && !dbOwnedIds.includes('protagonist_offense')) {
        localOwnedIds.push('protagonist_offense');
        api.post('/user/claim-milestone-hero', { milestoneType: 'protagonist_offense' }).catch(() => {});
      }
      const raidBest = parseInt(localStorage.getItem(`raid_infinite_best_${userId}`) ?? '0', 10);
      const premergedIds = [...new Set(['protagonist', ...localOwnedIds, ...dbOwnedIds])];
      if (raidBest >= 1000 && !premergedIds.includes('protagonist_raid')) {
        premergedIds.push('protagonist_raid');
        api.post('/user/claim-milestone-hero', { milestoneType: 'protagonist_raid' }).catch(() => {});
      }
      
      const mergedOwnedIds = premergedIds;
      saveOwnedHeroes(userId, mergedOwnedIds);

      setSave(mergedSave);

      // 보유 영웅 목록 (DB owned-heroes + localStorage 병합)
      setHeroes(HERO_DEFINITIONS
        .filter(h => mergedOwnedIds.includes(h.id))
        .map(h => {
          if (h.isProtagonist) return h;
          return { ...h, starRating: (mergedSave[h.id]?.starRating ?? h.starRating) as 1|2|3|4|5 };
        })
      );

    }).catch(err => {
      console.error('Failed to load user data', err);
      showToast(t('heroesPage.toastLoadFail'), 'error');
    }).finally(() => setGoldLoading(false));
  }, [userId, showToast]);

  // 영웅별 유효 역할 계산 헬퍼 (저장된 활성 루트 기준, 주인공 제외)
  const getHeroEffectiveRole = (h: HeroDefinition): string => {
    if (h.isProtagonist) return 'melee_dps'; // 주인공은 필터에서 melee로 취급
    const routeId = save[h.id]?.activeRouteId ?? h.classRoutes[0].id;
    const route = h.classRoutes.find(r => r.id === routeId) ?? h.classRoutes[0];
    return route.role ?? h.role;
  };

  // 필터 적용 (역할 + 등급 + 검색)
  const filteredHeroList = heroes.filter(h => {
    // 1. 역할 필터 — 활성 루트 기준 유효 역할로 판단
    if (heroRoleFilter !== 'all') {
      if (getHeroEffectiveRole(h) !== heroRoleFilter) return false;
    }
    // 2. 등급 필터
    if (heroGradeFilter !== 'all') {
      if (h.grade !== heroGradeFilter) return false;
    }
    // 3. 검색 필터
    if (search) {
      const q = search.toLowerCase();
      const match = h.name.toLowerCase().includes(q) ||
                    h.raceName.toLowerCase().includes(q) ||
                    h.elementName.toLowerCase().includes(q) ||
                    h.grade.toLowerCase().includes(q) ||
                    (h.nameKey && t(h.nameKey).toLowerCase().includes(q)) ||
                    (h.raceNameKey && t(h.raceNameKey).toLowerCase().includes(q)) ||
                    (h.elementNameKey && t(h.elementNameKey).toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const hero = heroes.find(h => h.id === selectedId) ?? heroes[0];
  const heroSave = save[hero?.id] ?? {
    starRating: 1, activeRouteId: hero.classRoutes[0].id,
    purchasedSkillIds: [], equippedSkillIds: [],
  };
  const activeRouteId = heroSave.activeRouteId;
  const purchasedIds = new Set(heroSave.purchasedSkillIds);
  // 현재 영웅 루트에 실제로 존재하는 스킬 ID만 허용 (다른 영웅 스킬 오염 방지)
  // compound key (routeId__skillId) 형식도 지원
  const validSkillIds = new Set(hero.classRoutes.flatMap(r => r.skills.map(s => s.id)));
  const validRouteSkillKeys = new Set(hero.classRoutes.flatMap(r => r.skills.map(s =>
    s.isShared ? `${r.id}__${s.id}` : s.id
  )));
  const equippedIds = new Set(heroSave.equippedSkillIds.filter(key => {
    if (validRouteSkillKeys.has(key)) return true;
    // 구버전 호환: plain skillId로 저장된 경우
    const baseId = key.includes('__') ? key.split('__')[1] : key;
    return validSkillIds.has(baseId);
  }));
  const equippedCount = equippedIds.size;
  let maxEquipped = hero.maxEquippedSkills ?? DEFAULT_MAX_EQUIPPED;
  if (heroSave.isUnsealed) {
    if (hero.grade === 'SSR' || hero.grade === 'AR' || hero.grade === 'LR') maxEquipped += 2;
    else if (hero.grade === 'SR') maxEquipped += 1;
    else if (hero.grade === 'R') maxEquipped += 1;
  }

  // save 업데이트 헬퍼 (로컬 + DB 동기화)
  const updateHeroSave = useCallback(async (heroId: string, patch: Partial<HeroSaveData>) => {
    // 1. 로컬 상태 업데이트
    let nextSave: AllHeroSave = {};
    setSave(prev => {
      const current = prev[heroId] ?? {
        starRating: 1, activeRouteId: HERO_DEFINITIONS.find(h => h.id === heroId)?.classRoutes[0].id ?? '',
        purchasedSkillIds: [], equippedSkillIds: [],
      };
      const next = { ...prev, [heroId]: { ...current, ...patch } };
      nextSave = next;
      writeSave(userId, next);
      return next;
    });

    // 2. DB 동기화
    if (heroId !== 'protagonist') {
      const userHero = dbHeroes.find(uh => {
        // frontend ID 'zedah' 등을 DB의 한글 이름 '제다'와 매핑하기 위해 
        // HERO_DEFINITIONS를 활용하거나 template.id를 직접 찾아야 함.
        const def = HERO_DEFINITIONS.find(d => d.id === heroId);
        return uh.template.name === def?.name;
      });
      if (userHero) {
        try {
          await api.post('/user/hero-save', { 
            templateId: userHero.template.id, 
            saveData: nextSave[heroId] 
          });
        } catch (err) { console.error('Failed to sync hero save to DB', err); }
      }
    }
  }, [userId, dbHeroes]);

  const handleProtagonistUpdate = useCallback(async (patch: Partial<ProtagonistSaveData>) => {
    const next = { ...protagonistSave, ...patch };
    setProtagonistSave(next);
    writeProtagonistSave(userId, next);
    try {
      await api.post('/user/protagonist-save', { saveData: next });
    } catch (err) { console.error('Failed to sync protagonist save to DB', err); }
  }, [userId, protagonistSave]);

  const handleDefProtUpdate = useCallback((patch: Partial<ProtagonistDefenseSaveData>) => {
    setDefProtSave(prev => {
      const next = { ...prev, ...patch };
      writeProtagonistDefenseSave(userId, next);
      return next;
    });
  }, [userId]);
  const handleAiProtUpdate = useCallback((patch: Partial<ProtagonistAISaveData>) => {
    if (!user?.id) return;
    setAiProtSave(prev => {
      const updated = { ...prev, ...patch };
      writeProtagonistAISave(user.id, updated);
      return updated;
    });
  }, [user?.id]);

  const handleOffenseProtUpdate = useCallback((patch: Partial<ProtagonistAISaveData>) => {
    if (!user?.id) return;
    setOffenseProtSave(prev => {
      const updated = { ...prev, ...patch };
      writeProtagonistOffenseSave(user.id, updated);
      return updated;
    });
  }, [user?.id]);

  const handleRaidProtUpdate = useCallback((patch: Partial<ProtagonistAISaveData>) => {
    if (!user?.id) return;
    setRaidProtSave(prev => {
      const updated = { ...prev, ...patch };
      writeProtagonistRaidSave(user.id, updated);
      return updated;
    });
  }, [user?.id]);

  // 성급 업그레이드
  const handleStarUpgrade = useCallback(async () => {
    if (!hero || hero.starRating >= 5) return;
    const cost = hero.starUpgradeCosts[hero.starRating - 1];
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      const newStar = (hero.starRating + 1) as 1|2|3|4|5;
      setUserGold(res.data.gold);
      setHeroes(prev => prev.map(h => h.id === hero.id ? { ...h, starRating: newStar } : h));
      updateHeroSave(hero.id, { starRating: newStar });
      showToast(t('heroesPage.toastStarUp', { name: hero.name, n: newStar, cost: cost.toLocaleString() }));
    } catch { showToast(t('heroesPage.toastGoldFail'), 'error'); }
  }, [hero, userGold, updateHeroSave, showToast]);

  // 루트 활성화
  const handleActivateRoute = useCallback((routeId: string) => {
    updateHeroSave(hero.id, { activeRouteId: routeId });
  }, [hero.id, updateHeroSave]);

  // 스킬 구매
  const handlePurchase = useCallback(async (skill: RouteSkill) => {
    if (userGold < skill.cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -skill.cost });
      setUserGold(res.data.gold);
      const newPurchased = [...heroSave.purchasedSkillIds, skill.id];
      updateHeroSave(hero.id, { purchasedSkillIds: newPurchased });
      showToast(t('heroesPage.toastSkillBuy', { name: skill.nameKey ? t(skill.nameKey) : skill.name, cost: skill.cost.toLocaleString() }));
    } catch { showToast(t('heroesPage.toastGoldFail'), 'error'); }
  }, [hero.id, userGold, heroSave, updateHeroSave, showToast]);

  // 스킬 장착/해제
  const handleToggleEquip = useCallback((skillId: string) => {
    const current = new Set(heroSave.equippedSkillIds);
    if (current.has(skillId)) {
      current.delete(skillId);
    } else if (current.size < maxEquipped) {
      current.add(skillId);
    } else {
      showToast(t('heroesPage.toastSkillMax', { max: maxEquipped }), 'error');
      return;
    }
    updateHeroSave(hero.id, { equippedSkillIds: [...current] });
  }, [hero.id, heroSave, maxEquipped, updateHeroSave, showToast]);

  // ── 주인공 전용 핸들러 ────────────────────────
  const handleProtagonistStarUpgrade = useCallback(async () => {
    const proto = heroes.find(h => h.isProtagonist);
    if (!proto) return;
    const currentStar = protagonistSave.starRating;
    if (currentStar >= 5) return;
    const cost = proto.starUpgradeCosts[currentStar - 1];
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      const newStar = (currentStar + 1) as 1 | 2 | 3 | 4 | 5;
      setUserGold(res.data.gold);
      handleProtagonistUpdate({ starRating: newStar });
      showToast(t('heroesPage.toastProtoStarUp', { name: username, n: newStar, cost: cost.toLocaleString() }));
    } catch { showToast(t('heroesPage.toastGoldFail'), 'error'); }
  }, [heroes, protagonistSave, userGold, username, showToast, handleProtagonistUpdate]);

  const handleProtagonistEquip = useCallback((skillId: string) => {
    const current = new Set(protagonistSave.equippedSkillIds);
    const maxSlots = Math.min(5, protagonistSave.starRating) + Math.floor(heroes.length / 10);
    if (current.size >= maxSlots) {
      showToast(t('heroesPage.toastSlotShort'), 'error');
      return;
    }
    current.add(skillId);
    handleProtagonistUpdate({ equippedSkillIds: [...current] });
  }, [protagonistSave, showToast, handleProtagonistUpdate, heroes.length]);

  const handleProtagonistUnequip = useCallback((skillId: string) => {
    const current = new Set(protagonistSave.equippedSkillIds);
    current.delete(skillId);
    handleProtagonistUpdate({ equippedSkillIds: [...current] });
  }, [protagonistSave, handleProtagonistUpdate]);

  const handleProtagonistRoleChange = useCallback((role: Role) => {
    handleProtagonistUpdate({ selectedRole: role });
  }, [handleProtagonistUpdate]);

  const handleProtagonistUnlockRole = useCallback(async (role: Role) => {
    if (protagonistSave.unlockedRoles?.includes(role)) return;
    const cost = 300;
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      setUserGold(res.data.gold);
      const newUnlocked = [...(protagonistSave.unlockedRoles || ['melee_dps']), role];
      handleProtagonistUpdate({ unlockedRoles: newUnlocked });
      showToast(t('heroesPage.toastRoleUnlock', { role: t('roles.' + role) }), 'success');
    } catch { showToast(t('heroesPage.toastGoldFail'), 'error'); }
  }, [protagonistSave, userGold, showToast, handleProtagonistUpdate]);

  // ── 디펜스 용사 전용 핸들러 ─────────────────────
  const handleDefProtStarUpgrade = useCallback(async () => {
    const proto = heroes.find(h => h.id === 'protagonist_defense');
    if (!proto) return;
    if (defProtSave.starRating >= 5) return;
    const cost = proto.starUpgradeCosts[defProtSave.starRating - 1];
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      const newStar = (defProtSave.starRating + 1) as 1 | 2 | 3 | 4 | 5;
      setUserGold(res.data.gold);
      handleDefProtUpdate({ starRating: newStar });
      showToast(t('heroesPage.toastStarUp', { name: t('heroesPage.defenseBadge'), n: newStar, cost: cost.toLocaleString() }));
    } catch { showToast(t('heroesPage.toastGoldFailShort'), 'error'); }
  }, [heroes, defProtSave, userGold, handleDefProtUpdate, showToast]);

  const handleDefProtEquip = useCallback((skillId: string) => {
    const current = new Set(defProtSave.equippedSkillIds);
    const maxSlots = Math.min(5, defProtSave.starRating);
    if (current.size >= maxSlots) { showToast(t('heroesPage.toastSlotShort2'), 'error'); return; }
    current.add(skillId);
    handleDefProtUpdate({ equippedSkillIds: [...current] });
  }, [defProtSave, handleDefProtUpdate, showToast]);

  const handleDefProtUnequip = useCallback((skillId: string) => {
    const current = new Set(defProtSave.equippedSkillIds);
    current.delete(skillId);
    handleDefProtUpdate({ equippedSkillIds: [...current] });
  }, [defProtSave, handleDefProtUpdate]);

  const handleDefProtRoleChange = useCallback((role: Role) => {
    handleDefProtUpdate({ selectedRole: role });
  }, [handleDefProtUpdate]);

  const handleDefProtUnlockRole = useCallback(async (role: Role) => {
    if (defProtSave.unlockedRoles?.includes(role)) return;
    const cost = 300;
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      setUserGold(res.data.gold);
      handleDefProtUpdate({ unlockedRoles: [...(defProtSave.unlockedRoles || ['tank']), role] });
      showToast(t('heroesPage.toastRoleUnlock', { role: t('roles.' + role) }), 'success');
    } catch { showToast(t('heroesPage.toastGoldFailShort'), 'error'); }
  }, [defProtSave, userGold, handleDefProtUpdate, showToast]);

  const handleDefProtTraitToggle = useCallback((traitKey: string) => {
    const current = new Set(defProtSave.selectedTraitKeys);
    const proto = heroes.find(h => h.id === 'protagonist_defense');
    const maxTraits = proto ? (proto.uniqueSkill.baseValues[defProtSave.starRating - 1] ?? 1) : 1;
    if (current.has(traitKey)) {
      current.delete(traitKey);
    } else if (current.size < maxTraits) {
      current.add(traitKey);
    } else {
      showToast(t('heroesPage.toastTraitMax', { max: maxTraits }), 'error');
      return;
    }
    handleDefProtUpdate({ selectedTraitKeys: [...current] });
  }, [defProtSave, heroes, handleDefProtUpdate, showToast]);

  // ── AI 용사 전용 핸들러 ─────────────────────
  const handleAiProtStarUpgrade = useCallback(async () => {
    const proto = heroes.find(h => h.id === 'protagonist_ai');
    if (!proto) return;
    if (aiProtSave.starRating >= 5) return;
    const cost = proto.starUpgradeCosts[aiProtSave.starRating - 1];
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      const newStar = (aiProtSave.starRating + 1) as 1 | 2 | 3 | 4 | 5;
      setUserGold(res.data.gold);
      handleAiProtUpdate({ starRating: newStar });
      showToast(t('heroesPage.toastStarUp', { name: t('heroesPage.aiBadge'), n: newStar, cost: cost.toLocaleString() }));
    } catch { showToast(t('heroesPage.toastGoldFailShort'), 'error'); }
  }, [heroes, aiProtSave, userGold, handleAiProtUpdate, showToast]);

  const handleAiProtEquip = useCallback((skillId: string) => {
    const current = new Set(aiProtSave.equippedSkillIds);
    const maxSlots = Math.min(5, aiProtSave.starRating);
    if (current.size >= maxSlots) { showToast(t('heroesPage.toastSlotShort2'), 'error'); return; }
    current.add(skillId);
    handleAiProtUpdate({ equippedSkillIds: [...current] });
  }, [aiProtSave, handleAiProtUpdate, showToast]);

  const handleAiProtUnequip = useCallback((skillId: string) => {
    const current = new Set(aiProtSave.equippedSkillIds);
    current.delete(skillId);
    handleAiProtUpdate({ equippedSkillIds: [...current] });
  }, [aiProtSave, handleAiProtUpdate]);

  const handleAiProtRoleChange = useCallback((role: Role) => {
    handleAiProtUpdate({ selectedRole: role });
  }, [handleAiProtUpdate]);

  const handleAiProtUnlockRole = useCallback(async (role: Role) => {
    if (aiProtSave.unlockedRoles?.includes(role)) return;
    const cost = 300;
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      setUserGold(res.data.gold);
      handleAiProtUpdate({ unlockedRoles: [...(aiProtSave.unlockedRoles || ['ranged_dps']), role] });
      showToast(t('heroesPage.toastRoleUnlock', { role: t('roles.' + role) }), 'success');
    } catch { showToast(t('heroesPage.toastGoldFailShort'), 'error'); }
  }, [aiProtSave, userGold, handleAiProtUpdate, showToast]);

  // ── 어택 용사 전용 핸들러 ─────────────────────
  const handleOffenseProtStarUpgrade = useCallback(async () => {
    const proto = heroes.find(h => h.id === 'protagonist_offense');
    if (!proto || offenseProtSave.starRating >= 5) return;
    const cost = proto.starUpgradeCosts[offenseProtSave.starRating - 1];
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      const newStar = (offenseProtSave.starRating + 1) as 1 | 2 | 3 | 4 | 5;
      setUserGold(res.data.gold);
      handleOffenseProtUpdate({ starRating: newStar });
      showToast(t('heroesPage.toastStarUp', { name: t('heroesPage.offenseBadge'), n: newStar, cost: cost.toLocaleString() }));
    } catch { showToast(t('heroesPage.toastGoldFailShort'), 'error'); }
  }, [heroes, offenseProtSave, userGold, handleOffenseProtUpdate, showToast]);

  const handleOffenseProtEquip = useCallback((skillId: string) => {
    const current = new Set(offenseProtSave.equippedSkillIds);
    const maxSlots = Math.min(5, offenseProtSave.starRating);
    if (current.size >= maxSlots) { showToast(t('heroesPage.toastSlotShort2'), 'error'); return; }
    current.add(skillId);
    handleOffenseProtUpdate({ equippedSkillIds: [...current] });
  }, [offenseProtSave, handleOffenseProtUpdate, showToast]);

  const handleOffenseProtUnequip = useCallback((skillId: string) => {
    const current = new Set(offenseProtSave.equippedSkillIds);
    current.delete(skillId);
    handleOffenseProtUpdate({ equippedSkillIds: [...current] });
  }, [offenseProtSave, handleOffenseProtUpdate]);

  const handleOffenseProtRoleChange = useCallback((role: Role) => {
    handleOffenseProtUpdate({ selectedRole: role });
  }, [handleOffenseProtUpdate]);

  const handleOffenseProtUnlockRole = useCallback(async (role: Role) => {
    if (offenseProtSave.unlockedRoles?.includes(role)) return;
    const cost = 300;
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      setUserGold(res.data.gold);
      handleOffenseProtUpdate({ unlockedRoles: [...(offenseProtSave.unlockedRoles || ['melee_dps']), role] });
      showToast(t('heroesPage.toastRoleUnlock', { role: t('roles.' + role) }), 'success');
    } catch { showToast(t('heroesPage.toastGoldFailShort'), 'error'); }
  }, [offenseProtSave, userGold, handleOffenseProtUpdate, showToast]);

  // ── 레이드 용사 전용 핸들러 ─────────────────────
  const handleRaidProtStarUpgrade = useCallback(async () => {
    const proto = heroes.find(h => h.id === 'protagonist_raid');
    if (!proto || raidProtSave.starRating >= 5) return;
    const cost = proto.starUpgradeCosts[raidProtSave.starRating - 1];
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      const newStar = (raidProtSave.starRating + 1) as 1 | 2 | 3 | 4 | 5;
      setUserGold(res.data.gold);
      handleRaidProtUpdate({ starRating: newStar });
      showToast(t('heroesPage.toastStarUp', { name: t('heroesPage.raidBadge'), n: newStar, cost: cost.toLocaleString() }));
    } catch { showToast(t('heroesPage.toastGoldFailShort'), 'error'); }
  }, [heroes, raidProtSave, userGold, handleRaidProtUpdate, showToast]);

  const handleRaidProtEquip = useCallback((skillId: string) => {
    const current = new Set(raidProtSave.equippedSkillIds);
    const maxSlots = Math.min(5, raidProtSave.starRating);
    if (current.size >= maxSlots) { showToast(t('heroesPage.toastSlotShort2'), 'error'); return; }
    current.add(skillId);
    handleRaidProtUpdate({ equippedSkillIds: [...current] });
  }, [raidProtSave, handleRaidProtUpdate, showToast]);

  const handleRaidProtUnequip = useCallback((skillId: string) => {
    const current = new Set(raidProtSave.equippedSkillIds);
    current.delete(skillId);
    handleRaidProtUpdate({ equippedSkillIds: [...current] });
  }, [raidProtSave, handleRaidProtUpdate]);

  const handleRaidProtRoleChange = useCallback((role: Role) => {
    handleRaidProtUpdate({ selectedRole: role });
  }, [handleRaidProtUpdate]);

  const handleRaidProtUnlockRole = useCallback(async (role: Role) => {
    if (raidProtSave.unlockedRoles?.includes(role)) return;
    const cost = 300;
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      setUserGold(res.data.gold);
      handleRaidProtUpdate({ unlockedRoles: [...(raidProtSave.unlockedRoles || ['ranged_dps']), role] });
      showToast(t('heroesPage.toastRoleUnlock', { role: t('roles.' + role) }), 'success');
    } catch { showToast(t('heroesPage.toastGoldFailShort'), 'error'); }
  }, [raidProtSave, userGold, handleRaidProtUpdate, showToast]);

  const handleUnseal = useCallback(async (heroId: string) => {
    const grade = hero.grade;
    const cost = (grade === 'SSR' || grade === 'AR' || grade === 'LR') ? 10000 : grade === 'SR' ? 7000 : 5000;
    if (userGold < cost) { showToast(t('heroesPage.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      setUserGold(res.data.gold);
      updateHeroSave(heroId, { isUnsealed: true });
      showToast(t('heroesPage.toastUnseal'), 'success');
    } catch { showToast(t('heroesPage.toastGoldFail'), 'error'); }
  }, [userGold, hero.grade, showToast, updateHeroSave]);

  // 전체 영웅 일괄 강화 (성급 + 스킬)
  const handleBulkAllHeroUpgrade = useCallback(async () => {
    let remaining = userGold;
    let totalCost = 0;
    const starPatches: { id: string; newStar: number }[] = [];
    const skillPatches: { id: string; newSkillIds: string[] }[] = [];

    for (const h of heroes) {
      if (h.isProtagonist) continue;
      const hSave = save[h.id] ?? { starRating: 1, activeRouteId: h.classRoutes[0].id, purchasedSkillIds: [], equippedSkillIds: [] };
      let star = hSave.starRating as number;

      // 성급 업그레이드
      while (star < 5) {
        const cost = h.starUpgradeCosts[star - 1];
        if (remaining >= cost) { remaining -= cost; totalCost += cost; star++; }
        else break;
      }
      if (star > hSave.starRating) starPatches.push({ id: h.id, newStar: star });

      // 스킬 구매
      const purchased = new Set(hSave.purchasedSkillIds);
      const newlyBought: string[] = [];
      for (const route of h.classRoutes) {
        for (const skill of route.skills) {
          if (!purchased.has(skill.id) && remaining >= skill.cost) {
            remaining -= skill.cost; totalCost += skill.cost;
            purchased.add(skill.id); newlyBought.push(skill.id);
          }
        }
      }
      if (newlyBought.length > 0) skillPatches.push({ id: h.id, newSkillIds: [...purchased] });
    }

    if (totalCost === 0) { showToast(t('heroesPage.toastBulkFail'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -totalCost });
      setUserGold(res.data.gold);
      for (const { id, newStar } of starPatches) {
        setHeroes(prev => prev.map(h => h.id === id ? { ...h, starRating: newStar as 1|2|3|4|5 } : h));
        await updateHeroSave(id, { starRating: newStar as 1|2|3|4|5 });
      }
      for (const { id, newSkillIds } of skillPatches) {
        await updateHeroSave(id, { purchasedSkillIds: newSkillIds });
      }
      showToast(t('heroesPage.toastBulkDone', { cost: totalCost.toLocaleString() }));
    } catch { showToast(t('heroesPage.toastGoldFail'), 'error'); }
  }, [heroes, save, userGold, showToast, updateHeroSave]);

  const allSkillsPurchased = hero.classRoutes.every(r => r.skills.every(s => purchasedIds.has(s.id)));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 토스트 */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg text-sm font-semibold flex items-center gap-2"
          style={toast.type === 'success'
            ? { background: '#14532d', border: '1px solid #16a34a', color: '#86efac' }
            : { background: '#7f1d1d', border: '1px solid #dc2626', color: '#fca5a5' }}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.msg}
        </div>
      )}

      {/* 헤더 */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">{t('heroesPage.tabHeroes').replace('⚔️ ', '')} (Heroes)</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {t('heroesPage.heroSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* 탭 버튼 */}
            <div className="flex gap-2">
              <button
                onClick={() => setTab('heroes')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  tab === 'heroes'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {t('heroesPage.tabHeroes')}
              </button>
              <button
                onClick={() => setTab('monster-book')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  tab === 'monster-book'
                    ? 'bg-red-700 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {t('heroesPage.tabMonsterBook')}
              </button>
            </div>
            {tab === 'heroes' && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">{t('heroesPage.goldLabel')}</span>
                {goldLoading ? (
                  <span className="text-yellow-400 text-sm">{t('heroesPage.goldLoading')}</span>
                ) : (
                  <span className="text-yellow-400 font-bold text-lg">💰 {userGold.toLocaleString()}G</span>
                )}
                <button
                  onClick={handleBulkAllHeroUpgrade}
                  className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-500 text-white text-sm font-bold rounded transition-colors"
                >
                  {t('heroesPage.bulkUpgrade')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 몬스터 도감 탭 */}
      {tab === 'monster-book' && <MonsterBook killedMonsters={killedMonsters} />}

      {/* 영웅 세팅 탭 */}
      {tab === 'heroes' && <div className="max-w-7xl mx-auto px-6 py-6 flex gap-5">
        {/* 영웅 목록 */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <p className="text-xs font-semibold text-gray-400">{t('heroesPage.heroList')}</p>
              <span className="text-xs text-gray-600">{t('heroesPage.heroCount', { n: heroes.length })}</span>
            </div>
            {/* 검색 입력창 */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('heroesPage.searchPlaceholder')}
              className="w-full bg-gray-900 border border-gray-600 text-white text-xs rounded px-2 py-1.5 mb-2 focus:border-yellow-500 focus:outline-none"
            />
            {/* 역할 필터 */}
            <div className="grid grid-cols-3 gap-1 mb-1.5">
              {[
                { key: 'all', label: t('heroesPage.filterAll') },
                { key: 'tank', label: t('roles.tank') },
                { key: 'melee_dps', label: t('roles.melee_dps') },
                { key: 'ranged_dps', label: t('roles.ranged_dps') },
                { key: 'healer', label: t('roles.healer') },
                { key: 'cc', label: t('roles.cc') },
                { key: 'mechanic', label: t('roles.mechanic') },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setHeroRoleFilter(key)}
                  className={`py-0.5 rounded text-[10px] font-medium transition-colors text-center ${
                    heroRoleFilter === key ? 'bg-yellow-700 text-white' : 'bg-gray-700/60 text-gray-500 hover:text-gray-300'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
            {/* 등급 필터 */}
            <div className="flex gap-1 mb-2.5 flex-wrap">
              {(['all', 'R', 'SR', 'SSR', 'AR', 'LR'] as const).map(grade => {
                const color = grade === 'all' ? '#9ca3af' : (GRADE_COLORS[grade as keyof typeof GRADE_COLORS] ?? '#9ca3af');
                const isActive = heroGradeFilter === grade;
                return (
                  <button key={grade} onClick={() => setHeroGradeFilter(grade)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded border transition-all"
                    style={isActive
                      ? { color: '#fff', borderColor: color, backgroundColor: color }
                      : { color, borderColor: color + '60', backgroundColor: color + '15' }}>
                    {grade === 'all' ? t('heroesPage.filterAll') : grade}
                  </button>
                );
              })}
            </div>
            {/* 영웅 목록 */}
            <div className="space-y-2">
              {filteredHeroList.map(h => (
                <HeroListItem key={h.id} hero={h} displayName={getDisplayName(h)}
                  isSelected={h.id === selectedId} onClick={() => setSelectedId(h.id)}
                  effectiveRole={h.isProtagonist ? undefined : getHeroEffectiveRole(h)}
                  protagonistStar={h.isProtagonist ? protagonistSave.starRating : undefined} />
              ))}
              {filteredHeroList.length === 0 && (
                <p className="text-xs text-gray-600 text-center py-3 italic">{t('heroesPage.noHeroFound')}</p>
              )}
            </div>
          </div>
          {/* 영웅 영입 안내 */}
          {heroes.length <= 1 && (
            <div className="mt-2 bg-yellow-900/20 border border-yellow-800/40 rounded-lg p-2 text-center">
              <p className="text-xs text-yellow-500/80">{t('heroesPage.recruitHint')}</p>
            </div>
          )}
        </div>

        {/* 영웅 상세 */}
        <div className="flex-1 min-w-0">
          {hero.id === 'protagonist_ai' ? (
            /* ─── AI 용사 전용 패널 ─── */
            <AIProtagonistPanel
              proto={hero}
              aiSave={aiProtSave}
              allHeroSave={save}
              regularHeroes={heroes.filter(h => !h.isProtagonist)}
              userGold={userGold}
              onStarUpgrade={handleAiProtStarUpgrade}
              onEquip={handleAiProtEquip}
              onUnequip={handleAiProtUnequip}
              onRoleChange={handleAiProtRoleChange}
              onUnlockRole={handleAiProtUnlockRole}
              showToast={showToast}
            />
          ) : hero.id === 'protagonist_offense' ? (
            /* ─── 어택 용사 전용 패널 ─── */
            <OffenseProtagonistPanel
              proto={hero}
              aiSave={offenseProtSave}
              allHeroSave={save}
              regularHeroes={heroes.filter(h => !h.isProtagonist)}
              userGold={userGold}
              onStarUpgrade={handleOffenseProtStarUpgrade}
              onEquip={handleOffenseProtEquip}
              onUnequip={handleOffenseProtUnequip}
              onRoleChange={handleOffenseProtRoleChange}
              onUnlockRole={handleOffenseProtUnlockRole}
              showToast={showToast}
            />
          ) : hero.id === 'protagonist_raid' ? (
            /* ─── 레이드 용사 전용 패널 ─── */
            <RaidProtagonistPanel
              proto={hero}
              aiSave={raidProtSave}
              allHeroSave={save}
              regularHeroes={heroes.filter(h => !h.isProtagonist)}
              userGold={userGold}
              onStarUpgrade={handleRaidProtStarUpgrade}
              onEquip={handleRaidProtEquip}
              onUnequip={handleRaidProtUnequip}
              onRoleChange={handleRaidProtRoleChange}
              onUnlockRole={handleRaidProtUnlockRole}
              showToast={showToast}
            />
          ) : hero.id === 'protagonist_defense' ? (
            /* ─── 디펜스 용사 전용 패널 ─── */
            <DefenseProtagonistPanel
              proto={hero}
              defSave={defProtSave}
              allHeroSave={save}
              regularHeroes={heroes.filter(h => !h.isProtagonist)}
              userGold={userGold}
              onStarUpgrade={handleDefProtStarUpgrade}
              onEquip={handleDefProtEquip}
              onUnequip={handleDefProtUnequip}
              onRoleChange={handleDefProtRoleChange}
              onUnlockRole={handleDefProtUnlockRole}
              onTraitToggle={handleDefProtTraitToggle}
              showToast={showToast}
            />
          ) : hero.isProtagonist ? (
            /* ─── 주인공 전용 패널 ─── */
            <ProtagonistPanel
              proto={hero}
              displayName={username}
              protagonistSave={protagonistSave}
              allHeroSave={save}
              regularHeroes={heroes.filter(h => !h.isProtagonist)}
              userGold={userGold}
              ownedHeroCount={heroes.length}
              onStarUpgrade={handleProtagonistStarUpgrade}
              onEquip={handleProtagonistEquip}
              onUnequip={handleProtagonistUnequip}
              onRoleChange={handleProtagonistRoleChange}
              onUnlockRole={handleProtagonistUnlockRole}
              showToast={showToast}
            />
          ) : (
            /* ─── 일반 영웅 패널 ─── */
            <div className="space-y-4">
              {/* 상단 바 */}
              <div className="bg-gray-800/60 border border-gray-700 rounded-xl px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GradeBadge grade={hero.grade} />
                  <span className="text-2xl font-black text-white">{hero.nameKey ? t(hero.nameKey) : hero.name}</span>
                  <RoleBadge role={(hero.classRoutes.find(r => r.id === activeRouteId) ?? hero.classRoutes[0]).role ?? hero.role} />
                  <span className="text-sm text-gray-500">{hero.classRoutes.map(r => r.nameKey ? t(r.nameKey) : r.name).join(' / ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{t('heroesPage.starLabel')}</span>
                  <StarRating star={hero.starRating} />
                </div>
              </div>
              {/* AR 영웅 안내 배너 */}
              {hero.grade === 'AR' && (
                <div className="bg-cyan-900/20 border border-cyan-500/50 rounded-lg px-4 py-2.5 flex items-center gap-3">
                  <span className="text-cyan-400 text-lg">🏆</span>
                  <div>
                    <p className="text-xs font-bold text-cyan-300">{t('heroesPage.arHeroBanner')}</p>
                    <p className="text-xs text-cyan-200/70">{t('heroesPage.arHeroDesc', { race: getTranslatedRace(hero.raceName, t) })}</p>
                  </div>
                </div>
              )}
              {/* 본문 */}
              <div className="flex gap-5">
                <div className="w-40 flex-shrink-0">
                  <HeroPortrait hero={hero} activeRouteId={activeRouteId} displayName={hero.name} />
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <UniqueSkillCard hero={hero} activeRouteId={activeRouteId} isUnsealed={heroSave.isUnsealed} />
                  <StarUpgradePanel hero={hero} userGold={userGold} onUpgrade={handleStarUpgrade} />
                  {(hero.classRoutes.length > 1 || hero.grade === 'R') && hero.starRating >= 5 && allSkillsPurchased && !heroSave.isUnsealed && (() => {
                    const unsealCost = (hero.grade === 'SSR' || hero.grade === 'AR' || hero.grade === 'LR') ? 10000 : hero.grade === 'SR' ? 7000 : 5000;
                    const bonusSlots = (hero.grade === 'SSR' || hero.grade === 'AR' || hero.grade === 'LR') ? 2 : 1;
                    const totalSlots = (hero.grade === 'SSR' || hero.grade === 'AR' || hero.grade === 'LR') ? 5 : 4;
                    return (
                      <div className="bg-fuchsia-900/20 border border-fuchsia-600/50 rounded-lg p-4 flex items-center justify-between shadow-[0_0_15px_rgba(192,38,211,0.2)]">
                        <div>
                          <span className="text-fuchsia-400 font-black text-lg">{t('heroesPage.unsealBtn')}</span>
                          <p className="text-xs text-fuchsia-300/80 mt-1">
                            {hero.classRoutes.length > 1 ? t('heroesPage.unsealEffectDual') : t('heroesPage.unsealEffect')} ({t('heroesPage.unsealEffectSlots', { n: bonusSlots, total: totalSlots })})
                          </p>
                        </div>
                        <button onClick={() => handleUnseal(hero.id)} disabled={userGold < unsealCost}
                          className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                          style={{ background: 'linear-gradient(to right, #a21caf, #6d28d9)', color: '#fff' }}>
                          {userGold >= unsealCost ? t('heroesPage.unsealCost', { n: unsealCost.toLocaleString() }) : t('heroesPage.goldShortWithAmount', { amount: unsealCost.toLocaleString() })}
                        </button>
                      </div>
                    );
                  })()}
                  {heroSave.isUnsealed && (
                    <div className="bg-fuchsia-900/30 border border-fuchsia-500/80 rounded-lg p-3 text-center shadow-[0_0_20px_rgba(192,38,211,0.3)]">
                      <span className="text-fuchsia-300 font-black text-sm tracking-widest">{t('heroesPage.unsealDone')}</span>
                      <p className="text-xs text-fuchsia-200/70 mt-1">{t('heroesPage.unsealDoneDesc')}</p>
                    </div>
                  )}
                  <EquippedSlots hero={hero} equippedIds={equippedIds} maxEquipped={maxEquipped} onUnequip={handleToggleEquip} />
                  <div className={`grid gap-4 ${hero.classRoutes.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    {hero.classRoutes.map(route => (
                      <RoutePanel key={route.id} hero={hero} route={route}
                        activeRouteId={activeRouteId} purchasedIds={purchasedIds}
                        equippedIds={equippedIds} equippedCount={equippedCount} maxEquipped={maxEquipped} userGold={userGold}
                        onActivate={handleActivateRoute} onPurchase={handlePurchase} onToggleEquip={handleToggleEquip} />
                    ))}
                  </div>
                  <div className="bg-gray-900/60 border border-gray-700/40 rounded-lg p-3 text-xs text-gray-500 leading-relaxed">
                    {t('heroesPage.heroHelp', { max: maxEquipped })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>}

    </div>
  );
}

export default HeroesPage;
