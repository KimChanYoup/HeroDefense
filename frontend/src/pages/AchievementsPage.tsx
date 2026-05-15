import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../api/client';
import { HERO_DEFINITIONS, GRADE_COLORS } from '../game/heroData';

interface Achievement {
  id: number;
  name: string;
  displayName: string;
  description: string;
  rewardGold: number;
  rewardCrystals: number;
  rewardHeroName?: string;
  rewardHeroId?: string;
  unlocked: boolean;
  achievedAt: string | null;
}

export default function AchievementsPage() {
  const { t, language } = useLanguage();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/achievements')
      .then(res => setAchievements(res.data))
      .catch(() => setError(t?.achievements?.failedToLoad || 'Failed to load achievements.'))
      .finally(() => setLoading(false));
  }, [language, t]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const exportJSON = () => {
    const data = achievements.map(a => ({
      name: a.name,
      unlocked: a.unlocked,
      achievedAt: a.achievedAt,
      rewardGold: a.rewardGold,
      rewardCrystals: a.rewardCrystals,
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'achievements.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-yellow-400">{t?.achievements?.title || 'Achievements'}</h1>
          <button
            onClick={exportJSON}
            disabled={achievements.length === 0}
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm px-3 py-1.5 rounded-lg border border-gray-600 transition-colors disabled:opacity-40"
          >
            {t?.achievements?.exportJson ?? 'Export JSON'}
          </button>
        </div>
        <p className="text-gray-400 mt-1">
          {(t?.achievements?.progress || 'Progress: {unlocked}/{total}')
            .replace('{unlocked}', String(unlockedCount))
            .replace('{total}', String(achievements.length))}
        </p>
        {achievements.length > 0 && (
          <div className="mt-2 h-2 bg-gray-700 rounded-full">
            <div
              className="h-2 bg-yellow-500 rounded-full transition-all"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      {loading && <p className="text-gray-400">{t?.common?.loading || 'Loading...'}</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="space-y-3">
        {achievements.map((ach) => {
          const achT = (t?.achievements as any)?.[ach.name];
          const displayName = achT?.displayName || ach.displayName;
          const description = achT?.description || ach.description;

          return (
            <div
              key={ach.id}
              className={`card p-4 border-l-4 flex items-center gap-4 ${ach.unlocked ? 'border-yellow-500' : 'border-gray-600 opacity-60'
                }`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${ach.unlocked ? 'bg-yellow-500/20' : 'bg-gray-700'
                  }`}
              >
                {ach.unlocked ? '🏆' : '🔒'}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${ach.unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {displayName}
                  </span>
                  {ach.unlocked && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                      {t?.achievements?.unlocked || 'Unlocked'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-0.5">
                  {description}
                </p>

                {/* 보상 영웅 배지 */}
                {(ach.rewardHeroName || ach.rewardHeroId) && (() => {
                  const heroDef = HERO_DEFINITIONS.find(h => h.id === ach.rewardHeroId || h.name === ach.rewardHeroName || h.id === ach.rewardHeroName);
                  const grade = heroDef?.grade ?? 'SSR';
                  const gradeColor = GRADE_COLORS[grade as keyof typeof GRADE_COLORS] ?? '#ec4899';

                  // 보상 등급 라벨 번역
                  const rewardBase = t?.achievements?.reward || {};
                  const gradeLabel = grade === 'LR' ? (rewardBase.lr || 'LR Hero Reward') :
                    grade === 'AR' ? (rewardBase.ar || 'AR Hero Reward') :
                      (rewardBase.ssr || 'SSR Hero Reward');

                  // 영웅 이름 번역
                  const translatedHeroName = heroDef?.nameKey ? (heroDef.nameKey.split('.').reduce((acc: any, part) => acc && acc[part], t) || ach.rewardHeroName) : ach.rewardHeroName;

                  return (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter border"
                      style={{ color: gradeColor, borderColor: gradeColor + '60', backgroundColor: gradeColor + '20' }}>
                      <span className="text-[12px]">👤</span> {gradeLabel}: {translatedHeroName}
                    </div>
                  );
                })()}

                {ach.achievedAt && (
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(ach.achievedAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Reward */}
              <div className="text-right flex-shrink-0 space-y-1">
                {ach.rewardGold > 0 && (
                  <div>
                    <div className="text-yellow-400 font-bold text-sm">+{ach.rewardGold.toLocaleString()}</div>
                    <div className="text-[10px] text-gray-500 uppercase">{t?.achievements?.gold || 'Gold'}</div>
                  </div>
                )}
                {ach.rewardCrystals > 0 && (
                  <div>
                    <div className="text-cyan-400 font-bold text-sm">+{ach.rewardCrystals.toLocaleString()}💎</div>
                    <div className="text-[10px] text-gray-500 uppercase">{t?.achievements?.crystal || 'Crystal'}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {achievements.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <p>{t?.achievements?.playToEarn || 'Play a game to start earning achievements!'}</p>
        </div>
      )}
    </div>
  );
}
