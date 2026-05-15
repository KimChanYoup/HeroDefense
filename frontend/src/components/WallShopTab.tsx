import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../api/client';
import {
  WALL_TALENTS, SECOND_WALL_TALENTS, THIRD_WALL_TALENTS,
  WallTalent, WallTalentCategory, SecondWallTalentCategory, ThirdWallTalentCategory,
} from '../game/wallTalents';

type TalentSave    = Record<string, number>;
type AllCategories = WallTalentCategory | SecondWallTalentCategory | ThirdWallTalentCategory;

const CATEGORY_COLORS: Record<AllCategories, { primary: string; secondary: string; bg: string }> = {
  // 제 1의 벽
  steel:   { primary: '#3b82f6', secondary: '#1d4ed8', bg: '#1e3a8a' },
  fire:    { primary: '#f97316', secondary: '#ea580c', bg: '#7c2d12' },
  frost:   { primary: '#06b6d4', secondary: '#0891b2', bg: '#164e63' },
  life:    { primary: '#22c55e', secondary: '#16a34a', bg: '#14532d' },
  thunder: { primary: '#eab308', secondary: '#ca8a04', bg: '#713f12' },
  // 제 2의 벽
  light:   { primary: '#fef08a', secondary: '#eab308', bg: '#713f12' },
  shadow:  { primary: '#a855f7', secondary: '#7e22ce', bg: '#3b0764' },
  nature:  { primary: '#84cc16', secondary: '#4d7c0f', bg: '#14532d' },
  blood:   { primary: '#ef4444', secondary: '#b91c1c', bg: '#7f1d1d' },
  time:    { primary: '#c026d3', secondary: '#86198f', bg: '#4a044e' },
  // 제 3의 벽
  wind:    { primary: '#38bdf8', secondary: '#0284c7', bg: '#0c4a6e' },
  earth:   { primary: '#d97706', secondary: '#92400e', bg: '#451a03' },
  arcane:  { primary: '#a78bfa', secondary: '#6d28d9', bg: '#2e1065' },
  void:    { primary: '#2dd4bf', secondary: '#0f766e', bg: '#042f2e' },
  storm:   { primary: '#818cf8', secondary: '#4338ca', bg: '#1e1b4b' },
};

const CATEGORY_ICONS: Record<AllCategories, string> = {
  steel: '🛡️', fire: '🔥', frost: '❄️', life: '💚', thunder: '⚡',
  light: '✨',  shadow: '🌑', nature: '🍄', blood: '🩸', time: '⏳',
  wind:  '🌪️',  earth: '🪨',  arcane: '🔮', void: '🌀',  storm: '⛈️',
};

const WALL_CATS_1 = ['steel', 'fire', 'frost', 'life', 'thunder'] as WallTalentCategory[];
const WALL_CATS_2 = ['light', 'shadow', 'nature', 'blood', 'time'] as SecondWallTalentCategory[];
const WALL_CATS_3 = ['wind', 'earth', 'arcane', 'void', 'storm']   as ThirdWallTalentCategory[];

const WALL_LISTS  = [WALL_TALENTS, SECOND_WALL_TALENTS, THIRD_WALL_TALENTS] as const;
const WALL_CATS   = [WALL_CATS_1, WALL_CATS_2, WALL_CATS_3] as const;

interface Props {
  userGold: number;
  setUserGold: (gold: number) => void;
  userId: number;
}

export function WallShopTab({ userGold, setUserGold, userId }: Props) {
  const { t } = useTranslation();
  const [talents, setTalents]       = useState<TalentSave>({});
  const [activeWall, setActiveWall] = useState<1 | 2 | 3>(1);
  const [selectedCat, setSelectedCat] = useState<AllCategories>('steel');
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const getCatLabel = useCallback((cat: AllCategories) => {
    const keys: Record<AllCategories, string> = {
      steel: t('wall.categories.steel'), fire: t('wall.categories.fire'), frost: t('wall.categories.frost'),
      life: t('wall.categories.life'), thunder: t('wall.categories.thunder'), light: t('wall.categories.light'),
      shadow: t('wall.categories.shadow'), nature: t('wall.categories.nature'), blood: t('wall.categories.blood'),
      time: t('wall.categories.time'), wind: t('wall.categories.wind'), earth: t('wall.categories.earth'),
      arcane: t('wall.categories.arcane'), void: t('wall.categories.void'), storm: t('wall.categories.storm'),
    };
    return keys[cat];
  }, [t]);

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`wall_talents_${userId}`);
      if (raw) setTalents(JSON.parse(raw));
    } catch {}
  }, [userId]);

  const isWallMaxed = useCallback((wallIdx: number) => {
    const list = WALL_LISTS[wallIdx];
    return list.length > 0 && list.every(t => (talents[t.id] ?? 0) >= t.maxRank);
  }, [talents]);

  const wall1Maxed = useMemo(() => isWallMaxed(0), [isWallMaxed]);
  const wall2Maxed = useMemo(() => isWallMaxed(1), [isWallMaxed]);

  const activeTalentsList = WALL_LISTS[activeWall - 1];
  const activeCategories  = WALL_CATS[activeWall - 1] as AllCategories[];

  const getCatTalents = useCallback((cat: AllCategories): WallTalent[] =>
    activeTalentsList.filter(t => t.category === cat),
  [activeTalentsList]);

  const getCategoryRank = useCallback((cat: AllCategories): number => {
    let rank = 0;
    for (const talent of getCatTalents(cat)) {
      if ((talents[talent.id] ?? 0) >= talent.maxRank) rank++;
      else break;
    }
    return rank;
  }, [getCatTalents, talents]);

  const getNextTier = useCallback((cat: AllCategories): WallTalent | null =>
    getCatTalents(cat)[getCategoryRank(cat)] ?? null,
  [getCatTalents, getCategoryRank]);

  const getTalentName = useCallback((talent: WallTalent) =>
    talent.nameKey ? t(talent.nameKey, talent.nameParams) : talent.name,
  [t]);

  const getTalentDesc = useCallback((talent: WallTalent) =>
    talent.descriptionKey ? t(talent.descriptionKey, talent.descParams) : talent.description,
  [t]);

  const handleUpgrade = async () => {
    const next = getNextTier(selectedCat);
    if (!next) return;
    if (userGold < next.cost) {
      showToast(t('wall.toastGoldShort'), 'error');
      return;
    }
    try {
      const res = await api.post('/user/gold', { delta: -next.cost });
      setUserGold(res.data.gold);
      const newTalents = { ...talents, [next.id]: 1 };
      setTalents(newTalents);
      localStorage.setItem(`wall_talents_${userId}`, JSON.stringify(newTalents));

      let newRank = 0;
      for (const talent of getCatTalents(selectedCat)) {
        if ((newTalents[talent.id] ?? 0) >= talent.maxRank) newRank++;
        else break;
      }
      showToast(t('wall.toastRankAchieved', { cat: getCatLabel(selectedCat), rank: newRank }));
    } catch {
      showToast(t('wall.toastError'), 'error');
    }
  };

  const handleBulkUpgrade = async () => {
    const catTalents = getCatTalents(selectedCat);
    const currentRank = getCategoryRank(selectedCat);
    if (currentRank >= catTalents.length) return;

    let remaining = userGold;
    const toBuy: WallTalent[] = [];
    for (let i = currentRank; i < catTalents.length; i++) {
      const talent = catTalents[i];
      if (remaining >= talent.cost) {
        toBuy.push(talent);
        remaining -= talent.cost;
      } else {
        break;
      }
    }
    if (toBuy.length === 0) {
      showToast(t('wall.toastGoldShort'), 'error');
      return;
    }
    const totalCost = toBuy.reduce((sum, talent) => sum + talent.cost, 0);
    try {
      const res = await api.post('/user/gold', { delta: -totalCost });
      setUserGold(res.data.gold);
      const newTalents = { ...talents };
      for (const talent of toBuy) newTalents[talent.id] = 1;
      setTalents(newTalents);
      localStorage.setItem(`wall_talents_${userId}`, JSON.stringify(newTalents));
      const newRank = currentRank + toBuy.length;
      showToast(t('wall.toastBulkAchieved', { cat: getCatLabel(selectedCat), rank: newRank, count: toBuy.length, cost: totalCost.toLocaleString() }));
    } catch {
      showToast(t('wall.toastError'), 'error');
    }
  };

  const handleBulkAllUpgrade = async () => {
    const cats = WALL_CATS[activeWall - 1] as AllCategories[];
    let remaining = userGold;
    const toBuy: WallTalent[] = [];
    for (const cat of cats) {
      const catTalents = getCatTalents(cat);
      const currentRank = getCategoryRank(cat);
      for (let i = currentRank; i < catTalents.length; i++) {
        const talent = catTalents[i];
        if (remaining >= talent.cost) { toBuy.push(talent); remaining -= talent.cost; }
        else break;
      }
    }
    if (toBuy.length === 0) { showToast(t('wall.toastGoldShort'), 'error'); return; }
    const totalCost = toBuy.reduce((sum, talent) => sum + talent.cost, 0);
    try {
      const res = await api.post('/user/gold', { delta: -totalCost });
      setUserGold(res.data.gold);
      const newTalents = { ...talents };
      for (const talent of toBuy) newTalents[talent.id] = 1;
      setTalents(newTalents);
      localStorage.setItem(`wall_talents_${userId}`, JSON.stringify(newTalents));
      showToast(t('wall.toastBulkAll', { count: toBuy.length, cost: totalCost.toLocaleString() }));
    } catch { showToast(t('wall.toastError'), 'error'); }
  };

  const switchWall = (wall: 1 | 2 | 3) => {
    if (wall === 2 && !wall1Maxed) {
      showToast(t('wall.toastLockWall2'), 'error');
      return;
    }
    if (wall === 3 && !wall2Maxed) {
      showToast(t('wall.toastLockWall3'), 'error');
      return;
    }
    setActiveWall(wall);
    setSelectedCat(WALL_CATS[wall - 1][0] as AllCategories);
  };

  const rank      = getCategoryRank(selectedCat);
  const maxRank   = getCatTalents(selectedCat).length;
  const nextTier  = getNextTier(selectedCat);
  const curTier   = rank > 0 ? getCatTalents(selectedCat)[rank - 1] : null;
  const colors    = CATEGORY_COLORS[selectedCat];

  const wallTabStyle = (wall: 1 | 2 | 3, locked: boolean) => {
    const active = activeWall === wall;
    const base   = 'px-4 py-2 text-sm font-bold rounded transition-colors';
    if (active)  return `${base} ${wall === 3 ? 'bg-indigo-600' : wall === 2 ? 'bg-purple-600' : 'bg-blue-600'} text-white`;
    if (locked)  return `${base} bg-gray-800 text-gray-600 cursor-not-allowed opacity-50`;
    return `${base} bg-gray-800 text-gray-400 hover:bg-gray-700`;
  };

  return (
    <div className="flex flex-col h-[75vh]">
      {toast && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded shadow-lg text-sm font-bold
          ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* 벽 탭 전환 */}
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <button onClick={() => switchWall(1)} className={wallTabStyle(1, false)}>
          {t('wall.tab1')}
        </button>
        <button onClick={() => switchWall(2)} className={wallTabStyle(2, !wall1Maxed)}>
          {wall1Maxed ? t('wall.tab2Unlocked') : t('wall.tab2Locked')}
        </button>
        <button onClick={() => switchWall(3)} className={wallTabStyle(3, !wall2Maxed)}>
          {wall2Maxed ? t('wall.tab3Unlocked') : t('wall.tab3Locked')}
        </button>
        <button
          onClick={handleBulkAllUpgrade}
          className="ml-auto px-4 py-2 text-sm font-bold rounded bg-yellow-600 hover:bg-yellow-500 text-white transition-colors"
        >
          {t('wall.bulkAll')}
        </button>
      </div>

      {/* 메인 레이아웃 */}
      <div className="flex gap-4 flex-1 min-h-0">

        {/* 왼쪽: 카테고리 버튼 5개 */}
        <div className="w-36 flex flex-col gap-2">
          {activeCategories.map(cat => {
            const catRank = getCategoryRank(cat);
            const catMax  = getCatTalents(cat).length;
            const c       = CATEGORY_COLORS[cat];
            const sel     = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className="flex flex-col gap-1.5 p-3 rounded-xl border-2 transition-all text-left"
                style={{
                  borderColor:     sel ? c.primary : '#374151',
                  backgroundColor: sel ? `${c.bg}66` : '#111827',
                  boxShadow:       sel ? `0 0 14px ${c.primary}44` : 'none',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{CATEGORY_ICONS[cat]}</span>
                  <span className="font-bold text-sm text-white">{getCatLabel(cat)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(catRank / catMax) * 100}%`, backgroundColor: c.primary }}
                  />
                </div>
                <span className="text-xs text-gray-400 font-mono">{catRank} / {catMax}</span>
              </button>
            );
          })}
        </div>

        {/* 오른쪽: 상세 패널 */}
        <div className="flex-1 flex flex-col bg-gray-900 border border-gray-800 rounded-xl overflow-hidden min-h-0">

          {/* 헤더 */}
          <div className="p-5 border-b border-gray-800 flex-shrink-0"
            style={{ backgroundColor: `${colors.bg}44` }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{CATEGORY_ICONS[selectedCat]}</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-white truncate">
                  {curTier ? getTalentName(curTier) : t('wall.upgradeDefault', { cat: getCatLabel(selectedCat) })}
                </h2>
                <span className="text-xs uppercase tracking-widest font-bold"
                  style={{ color: colors.primary }}>
                  {t('wall.seriesLabel', { cat: getCatLabel(selectedCat) })}
                </span>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-3xl font-black font-mono leading-none">
                  <span style={{ color: colors.primary }}>{rank}</span>
                  <span className="text-gray-600 text-2xl"> / {maxRank}</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Rank</div>
              </div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(rank / maxRank) * 100}%`,
                  backgroundColor: colors.primary,
                  boxShadow: `0 0 10px ${colors.primary}88`,
                }}
              />
            </div>
          </div>

          {/* 내용 */}
          <div className="flex-1 overflow-auto p-5 space-y-4">
            {rank === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                {t('wall.notUpgraded')}<br />
                {t('wall.notUpgradedHint')}
              </div>
            ) : (
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">
                  {t('wall.currentEffect')} <span className="text-gray-600 normal-case">{t('wall.currentEffectRange', { rank })}</span>
                </h3>
                <div className="rounded-lg border border-gray-700 overflow-hidden">
                  {getCatTalents(selectedCat).slice(0, rank).map((tier, i) => (
                    <div
                      key={tier.id}
                      className={`px-4 py-2.5 flex gap-3 items-start ${i < rank - 1 ? 'border-b border-gray-700/60' : ''}`}
                      style={{ backgroundColor: i === rank - 1 ? `${colors.bg}44` : '#1f2937' }}
                    >
                      <span
                        className="flex-shrink-0 text-xs font-black font-mono w-14 pt-0.5"
                        style={{ color: i === rank - 1 ? colors.primary : '#6b7280' }}
                      >
                        Rank {i + 1}
                      </span>
                      <div className="min-w-0">
                        <p
                          className="text-xs font-bold mb-0.5 truncate"
                          style={{ color: i === rank - 1 ? colors.primary : '#9ca3af' }}
                        >
                          {getTalentName(tier)}
                        </p>
                        <p className="text-xs text-gray-300 leading-relaxed">{getTalentDesc(tier)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {nextTier && (
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">
                  {t('wall.nextEffect')} <span className="text-gray-600 normal-case">{t('wall.nextEffectLabel', { rank: rank + 1 })}</span>
                </h3>
                <div
                  className="rounded-lg p-4 border border-dashed"
                  style={{
                    backgroundColor: `${colors.bg}22`,
                    borderColor: `${colors.primary}55`,
                  }}
                >
                  <p className="text-sm text-gray-300 leading-relaxed">{getTalentDesc(nextTier)}</p>
                </div>
              </div>
            )}
          </div>

          {/* 하단: 구매 버튼 */}
          <div className="p-4 bg-gray-950 border-t border-gray-800 flex-shrink-0">
            {rank >= maxRank ? (
              <button disabled className="w-full py-3 rounded-xl font-black bg-gray-800 text-gray-500 cursor-not-allowed">
                {t('wall.maxRank')}
              </button>
            ) : (
              <>
                {/* 단계별 강화 */}
                <button
                  onClick={handleUpgrade}
                  disabled={!nextTier || userGold < (nextTier?.cost ?? 0)}
                  className={`w-full py-3 rounded-xl font-black text-base transition-all active:scale-95 ${
                    nextTier && userGold >= nextTier.cost
                      ? 'text-white hover:brightness-110'
                      : 'bg-red-900/40 text-red-400 cursor-not-allowed border border-red-800/50'
                  }`}
                  style={nextTier && userGold >= nextTier.cost ? {
                    backgroundColor: colors.secondary,
                    boxShadow: `0 0 12px ${colors.primary}44`,
                  } : {}}
                >
                  <div className="flex items-center justify-center gap-3">
                    <span>{CATEGORY_ICONS[selectedCat]}</span>
                    <span>{t('wall.upgradeBtn', { rank: rank + 1 })}</span>
                    <span className="font-mono text-yellow-400">💰 {nextTier?.cost.toLocaleString() ?? 0}</span>
                  </div>
                </button>

                {/* 일괄 강화 버튼 */}
                {(() => {
                  const catTalents = getCatTalents(selectedCat);
                  let remaining = userGold;
                  let bulkCount = 0;
                  let bulkCost = 0;
                  for (let i = rank; i < catTalents.length; i++) {
                    if (remaining >= catTalents[i].cost) {
                      bulkCount++;
                      bulkCost += catTalents[i].cost;
                      remaining -= catTalents[i].cost;
                    } else break;
                  }
                  const canBulk = bulkCount > 1;
                  return (
                    <button
                      onClick={handleBulkUpgrade}
                      disabled={!canBulk}
                      className={`mt-2 w-full py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                        canBulk
                          ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                          : 'bg-gray-900 text-gray-700 cursor-not-allowed border border-gray-800'
                      }`}
                    >
                      {canBulk
                        ? t('wall.bulkUpgrade', { count: bulkCount, cost: bulkCost.toLocaleString() })
                        : t('wall.bulkUpgradeLow')}
                    </button>
                  );
                })()}

                <div className="mt-2 text-center text-xs text-gray-600">
                  {t('wall.goldLabel')} <span className="text-yellow-400 font-mono">{userGold.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
