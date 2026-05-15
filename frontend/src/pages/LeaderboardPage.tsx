import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../api/client';

type Category = 'wave' | 'score' | 'gold' | 'clears';

interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  avatarUrl: string | null;
  value: number;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [category, setCategory] = useState<Category>('wave');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/leaderboard?category=${category}&limit=100`)
      .then(res => setEntries(res.data))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, [category]);

  const myEntry = entries.find(e => e.userId === user?.id);

  const exportCSV = () => {
    const header = `rank,username,${category}\n`;
    const rows = entries.map(e => `${e.rank},${e.username},${e.value}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leaderboard-${category}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatValue = (val: number): string => {
    if (category === 'wave') return `${val} ${t.leaderboard.waveUnit}`;
    if (category === 'clears') return `${val.toLocaleString()}${t.leaderboard.clearsUnit}`;
    return val.toLocaleString();
  };

  const categoryTabs: { key: Category; icon: string; label: string }[] = [
    { key: 'wave',   icon: '🌊', label: t.leaderboard.wave   },
    { key: 'score',  icon: '🏆', label: t.leaderboard.score  },
    { key: 'gold',   icon: '💰', label: t.leaderboard.gold   },
    { key: 'clears', icon: '✅', label: t.leaderboard.clears },
  ];

  const rankStyle = (rank: number) => {
    if (rank === 1) return 'text-yellow-400 font-bold text-lg';
    if (rank === 2) return 'text-gray-300 font-semibold';
    if (rank === 3) return 'text-amber-600 font-semibold';
    return 'text-gray-500';
  };

  const rankEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}.`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">
          🏆 {t.leaderboard.title}
        </h1>
        <button
          onClick={exportCSV}
          disabled={entries.length === 0}
          className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm px-3 py-1.5 rounded-lg border border-gray-600 transition-colors disabled:opacity-40"
        >
          {t.leaderboard.exportCsv}
        </button>
      </div>

      {/* 카테고리 탭 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categoryTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setCategory(tab.key)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              category === tab.key
                ? 'bg-yellow-600 text-white border-2 border-yellow-400'
                : 'bg-gray-800 text-gray-300 border border-gray-600 hover:border-gray-400'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* 내 순위 배너 */}
      {myEntry && (
        <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg px-5 py-3 mb-4 flex items-center justify-between">
          <span className="text-yellow-300 font-semibold text-sm">
            {t.leaderboard.myRank}: <span className="text-white text-base">{rankEmoji(myEntry.rank)}</span>
          </span>
          <span className="text-yellow-200 font-bold">{formatValue(myEntry.value)}</span>
        </div>
      )}

      {/* 리더보드 테이블 */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        {/* 헤더 */}
        <div className="grid grid-cols-12 bg-gray-700 px-4 py-2 text-xs text-gray-400 font-semibold uppercase">
          <div className="col-span-2 text-center">{t.leaderboard.rank}</div>
          <div className="col-span-7">{t.leaderboard.player}</div>
          <div className="col-span-3 text-right">{t.leaderboard.value}</div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-500">{t.common.loading}</div>
        ) : entries.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-sm">{t.leaderboard.noData}</div>
        ) : (
          <div className="divide-y divide-gray-700">
            {entries.map(entry => {
              const isMe = entry.userId === user?.id;
              return (
                <div
                  key={entry.userId}
                  className={`grid grid-cols-12 px-4 py-3 items-center transition-colors ${
                    isMe
                      ? 'bg-yellow-900/20 border-l-2 border-yellow-500'
                      : 'hover:bg-gray-700/50'
                  }`}
                >
                  {/* 순위 */}
                  <div className={`col-span-2 text-center text-sm ${rankStyle(entry.rank)}`}>
                    {rankEmoji(entry.rank)}
                  </div>

                  {/* 유저명 */}
                  <div className="col-span-7 flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        isMe ? 'text-yellow-300' : 'text-white'
                      }`}
                    >
                      {entry.username}
                      {isMe && (
                        <span className="ml-2 text-xs bg-yellow-600 text-white px-1.5 py-0.5 rounded">
                          {t?.leaderboard?.me || 'ME'}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* 기록 */}
                  <div
                    className={`col-span-3 text-right text-sm font-bold ${
                      isMe ? 'text-yellow-400' : 'text-gray-200'
                    }`}
                  >
                    {formatValue(entry.value)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-center text-gray-600 text-xs mt-4">
        {t?.leaderboard?.top100 || 'Top 100'}
      </p>
    </div>
  );
}
