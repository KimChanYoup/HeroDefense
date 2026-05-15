import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MONSTER_BOOK, MONSTER_CATEGORIES, type MonsterBookEntry } from '../game/monsterBook';

// ── 티어별 스타일 ──────────────────────────────────────────────
const TIER_STYLE: Record<string, { border: string; badge: string; text: string }> = {
  '초급': { border: 'border-gray-500',   badge: 'bg-gray-700 text-gray-300',   text: 'text-gray-300' },
  '중급': { border: 'border-yellow-600', badge: 'bg-yellow-900/60 text-yellow-300', text: 'text-yellow-300' },
  '고급': { border: 'border-orange-500', badge: 'bg-orange-900/60 text-orange-300', text: 'text-orange-300' },
  '최강': { border: 'border-red-500',    badge: 'bg-red-900/60 text-red-300',   text: 'text-red-300' },
};

const MONSTER_TYPE_COLOR: Record<string, string> = {
  normal: 'text-gray-400',
  elite: 'text-purple-400',
  boss: 'text-yellow-400',
};

interface Props {
  killedMonsters: Set<string>;
}

export default function MonsterBook({ killedMonsters }: Props) {
  const { t } = useTranslation();
  // selectedCategory는 raw string ('전체' 또는 MONSTER_CATEGORIES의 값) 유지
  const [selectedCategory, setSelectedCategory] = useState<string>(MONSTER_CATEGORIES[0]);
  const [search, setSearch] = useState('');
  const [selectedMonster, setSelectedMonster] = useState<MonsterBookEntry | null>(null);

  const totalCount = MONSTER_BOOK.length;
  const unlockedCount = MONSTER_BOOK.filter(m => killedMonsters.has(m.name)).length;

  const filtered = useMemo(() => {
    return MONSTER_BOOK.filter(m => {
      // 카테고리 필터 (raw string 비교)
      if (selectedCategory !== MONSTER_CATEGORIES[0] && m.category !== selectedCategory) return false;
      
      if (search) {
        const q = search.toLowerCase();
        const killed = killedMonsters.has(m.name);
        if (!killed) return false; // 잠긴 몬스터는 검색 제외
        const displayName = m.displayNameKey ? t(m.displayNameKey) : m.displayName;
        return displayName.toLowerCase().includes(q) || m.name.toLowerCase().includes(q);
      }
      return true;
    });
  }, [selectedCategory, search, killedMonsters, t]);

  // 카테고리별 그룹핑 (key: raw category string)
  const grouped = useMemo(() => {
    if (selectedCategory !== MONSTER_CATEGORIES[0]) {
      return { [selectedCategory]: filtered };
    }
    const map: Record<string, MonsterBookEntry[]> = {};
    for (const m of filtered) {
      if (!map[m.category]) map[m.category] = [];
      map[m.category].push(m);
    }
    return map;
  }, [filtered, selectedCategory]);

  // 카테고리별 해금 수 (key: raw category string)
  const categoryUnlocked = useMemo(() => {
    const result: Record<string, { unlocked: number; total: number }> = {};
    for (const cat of MONSTER_CATEGORIES.slice(1)) {
      const all = MONSTER_BOOK.filter(m => m.category === cat);
      result[cat] = { unlocked: all.filter(m => killedMonsters.has(m.name)).length, total: all.length };
    }
    return result;
  }, [killedMonsters]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 헤더 */}
      <div className="bg-gray-800/80 border-b border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold text-red-400">{t('monsterBook.title')}</h2>
              <p className="text-gray-400 text-sm mt-0.5">{t('monsterBook.subtitle')}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{unlockedCount}<span className="text-gray-500 text-xl"> / {totalCount}</span></div>
              <div className="text-gray-400 text-sm">{t('monsterBook.discovered')}</div>
              {/* 진행 바 */}
              <div className="w-32 h-2 bg-gray-700 rounded-full mt-1 ml-auto">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 transition-all"
                  style={{ width: `${Math.round(unlockedCount / totalCount * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* 검색 */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder={t('monsterBook.searchPlaceholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* 카테고리 탭 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {MONSTER_CATEGORIES.map(cat => {
            const isAll = cat === MONSTER_CATEGORIES[0];
            const catKey = isAll ? 'all' : MONSTER_BOOK.find(m => m.category === cat)?.categoryKey?.split('.').pop() || cat;
            const catLabel = t(`monsterCategories.${catKey}`);
            const isActive = selectedCategory === cat;
            const info = isAll ? null : categoryUnlocked[cat];

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-red-700 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {catLabel}
                {info && (
                  <span className={`ml-1.5 text-xs ${isActive ? 'text-red-200' : 'text-gray-500'}`}>
                    {info.unlocked}/{info.total}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 몬스터 그리드 (카테고리별) */}
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <div className="text-4xl mb-3">📖</div>
            <div>{t('monsterBook.emptyTitle')}</div>
            <div className="text-sm mt-1">{t('monsterBook.emptyDesc')}</div>
          </div>
        ) : (
          Object.entries(grouped).map(([cat, monsters]) => {
            const entry = MONSTER_BOOK.find(m => m.category === cat);
            const catLabel = entry?.categoryKey ? t(entry.categoryKey) : cat;
            const catTotal = MONSTER_BOOK.filter(m => m.category === cat).length;
            const catUnlockedCount = monsters.filter(m => killedMonsters.has(m.name)).length;

            return (
              <div key={cat} className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-200">{catLabel}</h3>
                  <span className="text-xs text-gray-500">
                    {catUnlockedCount} / {catTotal} {t('monsterBook.unlocked')}
                  </span>
                  <div className="flex-1 h-px bg-gray-700" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {/* 검색 중일 때는 매칭되는 것만, 아닐 때는 전체(잠긴 것 포함) 표시 */}
                  {(search ? monsters : MONSTER_BOOK.filter(m => m.category === cat)).map(monster => {
                    const isUnlocked = killedMonsters.has(monster.name);
                    const ts = TIER_STYLE[monster.tier];
                    return (
                      <button
                        key={monster.name}
                        onClick={() => isUnlocked && setSelectedMonster(monster)}
                        disabled={!isUnlocked}
                        className={`relative rounded-xl border-2 p-3 text-center transition-all ${
                          isUnlocked
                            ? `${ts.border} bg-gray-800 hover:bg-gray-700 hover:scale-105 cursor-pointer`
                            : 'border-gray-700 bg-gray-800/40 cursor-default opacity-60'
                        }`}
                      >
                        {/* 몬스터 아이콘 (색상 원) */}
                        <div
                          className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-lg"
                          style={{ backgroundColor: isUnlocked ? monster.color + '40' : '#374151', border: `2px solid ${isUnlocked ? monster.color : '#4B5563'}` }}
                        >
                          {isUnlocked ? (
                            <span style={{ color: monster.color }}>
                              {monster.monsterType === 'boss' ? '👑' : monster.isRanged ? '🏹' : '⚔️'}
                            </span>
                          ) : (
                            <span className="text-gray-600">🔒</span>
                          )}
                        </div>

                        {/* 이름 */}
                        <div className={`text-xs font-semibold leading-tight ${isUnlocked ? 'text-white' : 'text-gray-600'}`}>
                          {isUnlocked ? (monster.displayNameKey ? t(monster.displayNameKey) : monster.displayName) : '???'}
                        </div>

                        {/* 티어 뱃지 */}
                        {isUnlocked && (
                          <div className={`text-xs mt-1 px-1 py-0.5 rounded ${ts.badge}`}>
                            {t(`monsterTiers.${monster.tier}`)}
                          </div>
                        )}

                        {/* 정예/보스 마커 */}
                        {isUnlocked && monster.monsterType !== 'normal' && (
                          <div className={`absolute top-1 right-1 text-xs font-bold ${MONSTER_TYPE_COLOR[monster.monsterType]}`}>
                            {t(`monsterTypes.${monster.monsterType}`)}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 상세 모달 */}
      {selectedMonster && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMonster(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl border-2 max-w-lg w-full shadow-2xl overflow-hidden"
            style={{ borderColor: selectedMonster.color }}
            onClick={e => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${selectedMonster.color}30, ${selectedMonster.color}10)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: selectedMonster.color + '30', border: `2px solid ${selectedMonster.color}` }}
                >
                  {selectedMonster.monsterType === 'boss' ? '👑' : selectedMonster.isRanged ? '🏹' : '⚔️'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">
                      {selectedMonster.displayNameKey ? t(selectedMonster.displayNameKey) : selectedMonster.displayName}
                    </h3>
                    <span className={`text-xs font-bold ${MONSTER_TYPE_COLOR[selectedMonster.monsterType]}`}>
                      [{t(`monsterTypes.${selectedMonster.monsterType}`)}]
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded ${TIER_STYLE[selectedMonster.tier].badge}`}>
                      {t(`monsterTiers.${selectedMonster.tier}`)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {selectedMonster.categoryKey ? t(selectedMonster.categoryKey) : selectedMonster.category}
                    </span>
                    <span className="text-xs text-gray-500">{t('monsterBook.wavePrefix')} {selectedMonster.firstSeenWave}~</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedMonster(null)}
                className="text-gray-500 hover:text-white text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* 기본 스탯 */}
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: t('common.hp'), value: selectedMonster.hp.toLocaleString(), color: '#f87171' },
                  { label: t('common.atk'), value: selectedMonster.atk, color: '#fb923c' },
                  { label: t('common.def'), value: selectedMonster.def, color: '#60a5fa' },
                  { label: t('common.spd'), value: selectedMonster.speed.toFixed(1), color: '#34d399' },
                  { label: t('monsterBook.attackType'), value: selectedMonster.isRanged ? t('monsterBook.ranged') : t('monsterBook.melee'), color: '#a78bfa' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-gray-800 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500 mb-0.5">{label}</div>
                    <div className="text-sm font-bold" style={{ color }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* 설명 */}
              <div className="bg-gray-800/60 rounded-lg p-3">
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  "{selectedMonster.descriptionKey ? t(selectedMonster.descriptionKey) : selectedMonster.description}"
                </p>
              </div>

              {/* 전술 팁 */}
              <div
                className="rounded-lg p-3 border-l-4"
                style={{ borderColor: selectedMonster.color, backgroundColor: selectedMonster.color + '15' }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">⚔️</span>
                  <span className="text-sm font-bold text-yellow-300">{t('monsterBook.tacticalTip')}</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {selectedMonster.tipKey ? t(selectedMonster.tipKey) : selectedMonster.tip}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
