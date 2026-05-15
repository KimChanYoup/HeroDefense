import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../api/client';
import {
  ManghonguSave, ManghonguStatKey, MANGHONGU_STATS,
  getManghonguCost, loadManghonguSave, saveManghonguData,
} from '../game/manghonguData';

interface Props {
  userGold: number;
  setUserGold: (gold: number) => void;
  userId: number;
}

export function ManghonguShopTab({ userGold, setUserGold, userId }: Props) {
  const { t } = useTranslation();
  const [save, setSave] = useState<ManghonguSave>({ atk: 0, def: 0, hp: 0, atkSpeed: 0, spd: 0 });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => {
    setSave(loadManghonguSave(userId));
  }, [userId]);

  const handleUpgrade = async (statKey: ManghonguStatKey) => {
    const rank = save[statKey];
    const cost = getManghonguCost(rank);
    if (userGold < cost) { showToast(t('manghongu.toastGoldShort'), 'error'); return; }
    try {
      const res = await api.post('/user/gold', { delta: -cost });
      setUserGold(res.data.gold);
      const newSave = { ...save, [statKey]: rank + 1 };
      setSave(newSave);
      saveManghonguData(userId, newSave);
      const stat = MANGHONGU_STATS[statKey];
      const label = t(stat.labelKey);
      showToast(t('manghongu.toastAchieved', { label, rank: rank + 1, bonus: stat.perRank, unit: stat.unit }));
    } catch {
      showToast(t('manghongu.toastError'), 'error');
    }
  };

  const totalRanks = (Object.keys(save) as ManghonguStatKey[]).reduce((a, k) => a + save[k], 0);

  return (
    <div className="space-y-4">
      {toast && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded shadow-lg text-sm font-bold
          ${toast.type === 'success' ? 'bg-teal-700 text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* 헤더 */}
      <div className="bg-gray-900 border border-teal-800/50 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/40 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🔮</span>
            <div className="flex-1">
              <h2 className="text-xl font-black text-teal-300">{t('manghongu.title')}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{t('manghongu.desc')}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-black text-teal-400">{totalRanks}</div>
              <div className="text-xs text-gray-500">{t('manghongu.totalUpgrades')}</div>
            </div>
          </div>
          <div className="text-xs text-yellow-400/80 bg-yellow-900/20 rounded px-3 py-2 border border-yellow-800/30 leading-relaxed">
            {t('manghongu.warning')}
          </div>
        </div>
      </div>

      {/* 스탯 카드 5개 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {(Object.keys(MANGHONGU_STATS) as ManghonguStatKey[]).map(statKey => {
          const stat = MANGHONGU_STATS[statKey];
          const rank = save[statKey];
          const cost = getManghonguCost(rank);
          const canAfford = userGold >= cost;
          const totalBonus = rank * stat.perRank;
          const label = t(stat.labelKey);

          return (
            <div
              key={statKey}
              className="bg-gray-900 border rounded-xl p-4 flex flex-col gap-3 transition-all"
              style={{
                borderColor: rank > 0 ? `${stat.color}55` : '#374151',
                boxShadow: rank > 0 ? `0 0 14px ${stat.color}18` : 'none',
              }}
            >
              {/* 스탯 제목 & 현재 랭크 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <div className="font-bold text-white text-sm">{label}</div>
                    <div className="text-xs text-gray-500">+{stat.perRank}{stat.unit} / rank</div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="text-lg font-black font-mono"
                    style={{ color: rank > 0 ? stat.color : '#6b7280' }}
                  >
                    Rank {rank}
                  </div>
                  {rank > 0 && (
                    <div className="text-xs font-bold" style={{ color: stat.color }}>
                      {t('manghongu.currentBonus', { val: totalBonus, unit: stat.unit })}
                    </div>
                  )}
                </div>
              </div>

              {/* 업그레이드 버튼 */}
              <button
                onClick={() => handleUpgrade(statKey)}
                disabled={!canAfford}
                className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95 ${
                  canAfford
                    ? 'text-white hover:brightness-110'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
                }`}
                style={canAfford ? {
                  backgroundColor: stat.color,
                  boxShadow: `0 0 10px ${stat.color}44`,
                } : {}}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Rank {rank} → {rank + 1}</span>
                  <span className="font-mono text-yellow-200">💰 {cost.toLocaleString()}G</span>
                </div>
              </button>

              {/* 다음 단계 미리보기 */}
              <div className="text-xs text-gray-600 text-center">
                {t('manghongu.nextRank', { rank: rank + 2, cost: getManghonguCost(rank + 1).toLocaleString() })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 보유 골드 */}
      <div className="text-center text-xs text-gray-600">
        {t('manghongu.goldLabel')} <span className="text-yellow-400 font-mono">{userGold.toLocaleString()}</span>
      </div>
    </div>
  );
}
