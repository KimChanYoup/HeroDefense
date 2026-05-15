import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import {
  HERO_DEFINITIONS,
  HERO_GRAPHIC_IDS,
  ROLE_LABELS,
  ROLE_COLORS,
  GRADE_COLORS,
  getHeroPrice,
  calcHeroCombatStats,
  type HeroDefinition,
} from '../game/heroData';
import { getRouteIcon } from '../components/RoleIcons';
import { getTranslatedRace, getTranslatedElement } from '../game/heroUtils';
import { WallShopTab } from '../components/WallShopTab';
import { ManghonguShopTab } from '../components/ManghonguShopTab';
import { REGIONS } from '../game/offenseData';

// 랜드 클리어 보상 영웅 ID 목록 (상점/소환 풀에서 제외)
const LAND_REWARD_IDS = new Set(REGIONS.map(r => r.rewardHeroId));

// ────────────────────────────────────────────────
// 타입
// ────────────────────────────────────────────────
type RoleFilter  = 'all' | 'tank' | 'melee_dps' | 'ranged_dps' | 'healer' | 'cc' | 'mechanic';
type GradeFilter = 'all' | 'R' | 'SR' | 'SSR' | 'AR' | 'LR';
type ShopTab     = 'gold' | 'crystal' | 'wall' | 'manghongu';

// ────────────────────────────────────────────────
// localStorage 헬퍼 (HeroesPage와 공유)
// ────────────────────────────────────────────────
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

// ────────────────────────────────────────────────
// 등급별 카드 스타일
// ────────────────────────────────────────────────
const GRADE_CARD_STYLES: Record<string, { border: string; glow: string }> = {
  R:   { border: 'border-gray-500',   glow: '' },
  SR:  { border: 'border-blue-500',   glow: 'shadow-md shadow-blue-900/40' },
  SSR: { border: 'border-yellow-500', glow: 'shadow-md shadow-yellow-900/40' },
  AR:  { border: 'border-cyan-500',   glow: 'shadow-md shadow-cyan-900/40' },
  LR:  { border: 'border-amber-400',  glow: 'shadow-md shadow-amber-900/40' },
};

const ROLE_FILTER_LABELS: Record<RoleFilter, string> = {
  all:        'shop.filter.allRoles',
  tank:       'roles.tank',
  melee_dps:  'roles.melee_dps',
  ranged_dps: 'roles.ranged_dps',
  healer:     'roles.healer',
  cc:         'roles.cc',
  mechanic:   'roles.mechanic',
};

// ────────────────────────────────────────────────
// 컴포넌트
// ────────────────────────────────────────────────
export default function ShopPage() {
  const { user } = useAuth();
  const { t }    = useTranslation();
  const userId   = user?.id ?? 0;

  const [userGold,     setUserGold]     = useState(0);
  const [userCrystals, setUserCrystals] = useState(0);
  const [loading,      setLoading]      = useState(true);
  const [ownedIds,     setOwnedIds]     = useState<string[]>(['protagonist']);
  const [buying,       setBuying]       = useState<string | null>(null); // itemId or heroId
  
  // 필터 & 탭
  const [activeTab,    setActiveTab]    = useState<ShopTab>('gold');
  const [roleFilter,   setRoleFilter]   = useState<RoleFilter>('all');
  const [gradeFilter,  setGradeFilter]  = useState<GradeFilter>('all');
  const [search,       setSearch]       = useState('');
  
  const [message,      setMessage]      = useState('');
  const [error,        setError]        = useState('');
  const [expandedHeroId, setExpandedHeroId] = useState<string | null>(null);

  // 상점 영웅 = 주인공 & 랜드 보상 & AR/LR 등급 제외 (업적/랜드 클리어 전용)
  const shopHeroes: HeroDefinition[] = HERO_DEFINITIONS.filter(h =>
    !h.isProtagonist && !LAND_REWARD_IDS.has(h.id) && h.grade !== 'AR' && h.grade !== 'LR'
  );

  // ── 초기 로드 ──────────────────────────────────
  useEffect(() => {
    if (!userId) return;
    refreshProfile();
    // DB에서 보유 영웅 목록 로드 후 localStorage와 병합
    api.get('/user/owned-heroes')
      .then(res => {
        const dbIds: string[] = Array.isArray(res.data) ? res.data : [];
        const localIds = loadOwnedHeroes(userId);
        const merged = Array.from(new Set([...localIds, ...dbIds]));
        setOwnedIds(merged);
        saveOwnedHeroes(userId, merged);
      })
      .catch(() => {
        setOwnedIds(loadOwnedHeroes(userId));
      });
  }, [userId]);

  const refreshProfile = () => {
    api.get('/user/profile')
      .then(res => {
        setUserGold(res.data.gold ?? 0);
        setUserCrystals(res.data.crystals ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // ── 골드 구매 (영웅) ───────────────────────────
  const handleBuyHero = async (hero: HeroDefinition) => {
    if (ownedIds.includes(hero.id)) return;
    const price = getHeroPrice(hero.grade);
    if (userGold < price) {
      setError(t('shop.notEnoughGold'));
      setTimeout(() => setError(''), 3000);
      return;
    }
    setBuying(hero.id);
    try {
      // 1. 골드 차감
      const res = await api.post('/user/gold', { delta: -price });
      setUserGold(res.data.gold);

      // 2. 서버 DB에 영웅 지급 기록 (실패해도 로컬 저장은 진행)
      try {
        await api.post('/user/grant-hero', { heroId: hero.id });
      } catch (dbErr) {
        console.error('Failed to grant hero to DB', dbErr);
      }

      // 3. UI 업데이트 (localStorage)
      unlockHero(hero.id, t('shop.recruitSuccess', { name: hero.nameKey ? t(hero.nameKey) : hero.name }));
    } catch (err: any) {
      setError(err.response?.data?.message || t('shop.buyFailed'));
      setTimeout(() => setError(''), 3000);
    } finally {
      setBuying(null);
    }
  };

  // ── 영웅 해금 로직 (공통) ──────────────────────
  const unlockHero = (heroId: string, msg: string) => {
    const newIds = [...ownedIds, heroId];
    // 중복 체크 (혹시 모를 오류 방지)
    if (!ownedIds.includes(heroId)) {
      setOwnedIds(newIds);
      saveOwnedHeroes(userId, newIds);
      setMessage(msg);
      // 수집 업적 체크
      api.post('/achievements/check', {
        wave: 0, score: 0, cleared: false, mode: 'solo',
        ownedHeroCount: newIds.length,
      }).catch(() => {});
    } else {
      // 이미 보유 중이면? (랜덤 박스 등에서 발생 가능)
      // 여기선 호출 전에 체크하지만, 랜덤박스는 아래서 처리
    }
    setTimeout(() => setMessage(''), 4000);
  };

  // ── 크리스탈 구매 (패키지/소환) ────────────────
  const handleCrystalPurchase = async (itemId: string, cost: number, type: 'summon' | 'gold' | 'charge', value?: any) => {
    if (type !== 'charge' && userCrystals < cost) {
      setError(t('shop.notEnoughCrystals'));
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    setBuying(itemId);
    try {
      if (type === 'charge') {
        // 크리스탈 충전 (Mock)
        const res = await api.post('/user/crystals', { delta: value });
        setUserCrystals(res.data.crystals);
        setMessage(t('shop.chargeSuccess', { count: value }));
      } else if (type === 'gold') {
        // 골드 구매
        await api.post('/user/crystals', { delta: -cost }); // 크리스탈 차감
        const res = await api.post('/user/gold', { delta: value }); // 골드 지급
        setUserCrystals(prev => prev - cost);
        setUserGold(res.data.gold);
        setMessage(t('shop.goldBuySuccess', { gold: value.toLocaleString() }));
      } else if (type === 'summon') {
        // 영웅 소환
        await api.post('/user/crystals', { delta: -cost });
        setUserCrystals(prev => prev - cost);
        
        // 랜덤 영웅 추첨 (value = target grade)
        // 미보유 영웅 우선? 아니면 완전 랜덤? -> 완전 랜덤 + 중복 시 골드 반환이 일반적 BM
        const targetGrade = value as 'R' | 'SR' | 'SSR';
        const pool = shopHeroes.filter(h => h.grade === targetGrade);
        const randomHero = pool[Math.floor(Math.random() * pool.length)];
        
        if (ownedIds.includes(randomHero.id)) {
          // 중복 보상: 등급별 골드 반환 (가격의 50%)
          const refund = Math.floor(getHeroPrice(targetGrade) * 0.5);
          await api.post('/user/gold', { delta: refund });
          setUserGold(prev => prev + refund);
          setMessage(t('shop.summonDuplicate', { name: randomHero.nameKey ? t(randomHero.nameKey) : randomHero.name, gold: refund.toLocaleString() }));
        } else {
          // 서버 DB에 영웅 지급 기록 추가
          try {
            await api.post('/user/grant-hero', { heroId: randomHero.id });
          } catch (err) {
            console.error('Failed to grant summoned hero to DB', err);
            // DB 저장 실패해도 로컬에는 반영
          }
          unlockHero(randomHero.id, t('shop.summonSuccess', { grade: targetGrade, name: randomHero.nameKey ? t(randomHero.nameKey) : randomHero.name }));
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || t('shop.purchaseFailed'));
    } finally {
      setBuying(null);
      setTimeout(() => setMessage(''), 4000);
    }
  };

  // ── 필터 ───────────────────────────────────────
  const filteredHeroes = shopHeroes.filter(h => {
    if (roleFilter  !== 'all' && h.role  !== roleFilter)  return false;
    if (gradeFilter !== 'all' && h.grade !== gradeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const match = h.name.toLowerCase().includes(q) ||
                    h.raceName.toLowerCase().includes(q) ||
                    h.elementName.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-yellow-400 text-xl">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* ── 헤더 ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">{t('shop.title')}</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {t('shop.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-800 rounded px-4 py-2 border border-gray-700">
            <span className="text-gray-400 text-sm">{t('shop.currency.owned')}</span>
            <div className="flex gap-3">
              <span className="text-yellow-300 font-bold">💰 {userGold.toLocaleString()}</span>
              <span className="text-cyan-400 font-bold">💎 {userCrystals.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 토스트 ── */}
      {message && <div className="bg-green-900/50 border border-green-500 text-green-300 px-4 py-2 rounded mb-4 text-sm animate-pulse">✓ {message}</div>}
      {error && <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-2 rounded mb-4 text-sm">{error}</div>}

      {/* ── 탭 ── */}
      <div className="flex gap-4 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('gold')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'gold' ? 'border-yellow-500 text-yellow-400' : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          {t('shop.tab.gold')}
        </button>
        <button
          onClick={() => setActiveTab('wall')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'wall' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          {t('shop.tab.wall')}
        </button>
        <button
          onClick={() => setActiveTab('crystal')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'crystal' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          {t('shop.tab.crystal')}
        </button>
        <button
          onClick={() => setActiveTab('manghongu')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'manghongu' ? 'border-teal-500 text-teal-400' : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          {t('shop.tab.manghongu')}
        </button>
      </div>

      {/* ── 탭 1: 골드 상점 (영웅) ── */}
      {activeTab === 'gold' && (
        <>
          {/* 검색 & 필터 */}
          <div className="mb-6 space-y-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('shop.searchPlaceholder')}
              className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded px-3 py-2 focus:border-yellow-500 focus:outline-none"
            />
            <div className="flex flex-wrap gap-3">
              <div className="flex gap-1 flex-wrap">
                {(Object.keys(ROLE_FILTER_LABELS) as RoleFilter[]).map(role => (
                  <button key={role} onClick={() => setRoleFilter(role)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      roleFilter === role ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}>
                    {t(ROLE_FILTER_LABELS[role])}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {(['all', 'R', 'SR', 'SSR'] as GradeFilter[]).map(grade => (
                  <button key={grade} onClick={() => setGradeFilter(grade)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      gradeFilter === grade ? 'bg-purple-700 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}>
                    {grade === 'all' ? t('shop.filter.allGrades') : grade}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 영웅 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredHeroes.map(hero => {
              const price      = getHeroPrice(hero.grade);
              const owned      = ownedIds.includes(hero.id);
              const cardStyle  = GRADE_CARD_STYLES[hero.grade] ?? GRADE_CARD_STYLES.R;
              const roleColor  = ROLE_COLORS[hero.role]  ?? '#9ca3af';
              const gradeColor = GRADE_COLORS[hero.grade as keyof typeof GRADE_COLORS] ?? '#9ca3af';

              return (
                <div key={hero.id} className={`bg-gray-800 rounded-lg border-2 ${cardStyle.border} ${cardStyle.glow} p-4 ${owned ? 'opacity-60' : ''} transition-opacity`}>
                  <div className="flex gap-3 mb-3">
                    {/* 초상화 */}
                    <div className="w-12 h-16 rounded border border-gray-700 bg-gray-900 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
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
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white text-sm truncate pr-1">
                          {hero.nameKey ? t(hero.nameKey) : hero.name}
                        </span>
                        <span className="text-[10px] font-black px-1 py-0.5 rounded border flex-shrink-0"
                          style={{ color: gradeColor, borderColor: gradeColor, backgroundColor: gradeColor + '22' }}>
                          {hero.grade}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border"
                          style={{ color: roleColor, borderColor: roleColor + '88', backgroundColor: roleColor + '18' }}>
                          {t(`roles.${hero.role}`) || ROLE_LABELS[hero.role as keyof typeof ROLE_LABELS] || hero.role}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">
                        {getTranslatedRace(hero.raceName, t)} / {getTranslatedElement(hero.elementName, t)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2 flex-wrap">
                    {hero.classRoutes.map(route => (
                      <span key={route.id} className="text-xs px-1 py-0.5 rounded"
                        style={{ color: route.color, background: route.color + '22', border: `1px solid ${route.color}55` }}>
                        {route.nameKey ? t(route.nameKey) : route.name}
                      </span>
                    ))}
                  </div>
                  {(() => {
                    const combat = calcHeroCombatStats(hero, 1);
                    return (
                      <div className="grid grid-cols-3 gap-0.5 text-[10px] text-gray-500 mb-3">
                        <span>HP <span className="font-mono text-gray-400">{hero.baseStats.hp}</span></span>
                        <span>ATK <span className="font-mono text-gray-400">{combat.finalAtk}</span></span>
                        <span>DEF <span className="font-mono text-gray-400">{hero.baseStats.def}</span></span>
                        <span>SPD <span className="font-mono text-gray-400">{hero.baseStats.spd}</span></span>
                        <span>ASPD <span className="font-mono text-gray-400">{combat.attackCooldown}</span></span>
                        <span>DPS <span className="font-mono text-red-400">{combat.dps}</span></span>
                      </div>
                    );
                  })()}
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                    {hero.loreKey ? t(hero.loreKey) : hero.lore}
                  </p>
                  <button onClick={() => setExpandedHeroId(prev => prev === hero.id ? null : hero.id)}
                    className="w-full text-xs text-gray-500 hover:text-gray-400 border border-gray-700 hover:border-gray-600 rounded py-1 mb-2 transition-colors">
                    {expandedHeroId === hero.id ? t('shop.collapseSkills') : t('shop.expandSkills')}
                  </button>
                  {expandedHeroId === hero.id && (
                    <div className="mb-3 border border-gray-700 rounded p-2 bg-gray-900/50 space-y-2">
                      {hero.classRoutes.map(route => (
                        <div key={route.id}>
                          <div className="text-xs font-bold mb-1 px-1 py-0.5 rounded flex items-center" style={{ color: route.color, backgroundColor: route.color + '18' }}>
                            {getRouteIcon(route.name)} [{route.nameKey ? t(route.nameKey) : route.name}]
                          </div>
                          <div className="space-y-0.5 pl-1">
                            {route.skills.map(skill => (
                              <div key={skill.id} className="flex items-center justify-between text-xs gap-1">
                                <span className="text-gray-400 truncate">{skill.isFinal ? '🔒 ' : ''}{skill.nameKey ? t(skill.nameKey) : skill.name}</span>
                                <span className="text-yellow-600 font-mono flex-shrink-0">{skill.cost}G</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {owned ? (
                    <div className="text-center text-xs text-green-400 bg-green-900/30 rounded py-1.5 font-semibold">✓ {t('shop.owned')}</div>
                  ) : (
                    <button onClick={() => handleBuyHero(hero)} disabled={buying === hero.id || userGold < price}
                      className={`w-full py-1.5 rounded text-sm font-semibold transition-colors ${
                        userGold >= price ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      } disabled:opacity-50`}>
                      {buying === hero.id ? t('shop.buying') : `${price.toLocaleString()}G ${t('shop.buy')}`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {filteredHeroes.length === 0 && (
            <div className="text-center py-12 text-gray-500"><p className="text-lg">해당 조건의 영웅이 없습니다.</p></div>
          )}
        </>
      )}

      {/* ── 탭 2: 벽 강화 상점 ── */}
      {activeTab === 'wall' && (
        <WallShopTab userGold={userGold} setUserGold={setUserGold} userId={userId} />
      )}

      {/* ── 탭 4: 망혼구 상점 ── */}
      {activeTab === 'manghongu' && (
        <ManghonguShopTab userGold={userGold} setUserGold={setUserGold} userId={userId} />
      )}

      {/* ── 탭 3: 크리스탈 상점 ── */}
      {activeTab === 'crystal' && (
        <div className="space-y-8">
          
          {/* 1. 영웅 소환 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">⚡</span> {t('shop.summon.title')} <span className="text-sm font-normal text-gray-500 ml-2">{t('shop.summon.desc')}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* R 소환 */}
              <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 flex flex-col items-center hover:border-gray-400 transition-colors">
                <div className="text-5xl mb-4">🥉</div>
                <h3 className="text-lg font-bold text-gray-300">{t('shop.summon.r')}</h3>
                <p className="text-sm text-gray-500 text-center mb-6 mt-2">{t('shop.summon.rDesc')}</p>
                <button onClick={() => handleCrystalPurchase('summon_r', 50, 'summon', 'R')}
                  disabled={buying === 'summon_r'}
                  className="bg-cyan-700 hover:bg-cyan-600 text-white w-full py-3 rounded-lg font-bold flex justify-center items-center gap-2">
                  <span>💎 50</span> {t('shop.summon.action')}
                </button>
              </div>
              {/* SR 소환 */}
              <div className="bg-gray-800 border border-blue-500 rounded-xl p-6 flex flex-col items-center shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all">
                <div className="text-5xl mb-4">🥈</div>
                <h3 className="text-lg font-bold text-blue-300">{t('shop.summon.sr')}</h3>
                <p className="text-sm text-gray-500 text-center mb-6 mt-2">{t('shop.summon.srDesc')}</p>
                <button onClick={() => handleCrystalPurchase('summon_sr', 150, 'summon', 'SR')}
                  disabled={buying === 'summon_sr'}
                  className="bg-blue-600 hover:bg-blue-500 text-white w-full py-3 rounded-lg font-bold flex justify-center items-center gap-2">
                  <span>💎 150</span> {t('shop.summon.action')}
                </button>
              </div>
              {/* SSR 소환 */}
              <div className="bg-gray-800 border border-yellow-500 rounded-xl p-6 flex flex-col items-center shadow-xl shadow-yellow-900/20 hover:shadow-yellow-900/40 transition-all">
                <div className="text-5xl mb-4">🥇</div>
                <h3 className="text-lg font-bold text-yellow-300">{t('shop.summon.ssr')}</h3>
                <p className="text-sm text-gray-500 text-center mb-6 mt-2">{t('shop.summon.ssrDesc')}</p>
                <button onClick={() => handleCrystalPurchase('summon_ssr', 500, 'summon', 'SSR')}
                  disabled={buying === 'summon_ssr'}
                  className="bg-yellow-600 hover:bg-yellow-500 text-white w-full py-3 rounded-lg font-bold flex justify-center items-center gap-2">
                  <span>💎 500</span> {t('shop.summon.action')}
                </button>
              </div>
            </div>
          </section>

          {/* 2. 골드 교환 */}
          <section className="border-t border-gray-700 pt-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">💰</span> {t('shop.exchange.title')} <span className="text-sm font-normal text-gray-500 ml-2">{t('shop.exchange.desc')}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 소 */}
              <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-gray-700 hover:border-gray-600 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-900/30 p-2 rounded-full text-xl">💰</div>
                  <div>
                    <div className="font-bold text-yellow-400">{t('shop.exchange.s')}</div>
                    <div className="text-xs text-gray-500">1,000 Gold</div>
                    <div className="text-[10px] text-gray-600 mt-0.5">100G / 💎</div>
                  </div>
                </div>
                <button onClick={() => handleCrystalPurchase('gold_s', 10, 'gold', 1000)}
                  disabled={buying === 'gold_s' || userCrystals < 10}
                  className="bg-gray-700 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-bold text-sm transition-colors">
                  💎 10
                </button>
              </div>
              {/* 중 */}
              <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-gray-700 hover:border-yellow-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-900/30 p-2 rounded-full text-xl">💰</div>
                  <div>
                    <div className="font-bold text-yellow-400">{t('shop.exchange.m')}</div>
                    <div className="text-xs text-gray-500">6,000 Gold <span className="text-green-400">(+20%)</span></div>
                    <div className="text-[10px] text-gray-600 mt-0.5">120G / 💎</div>
                  </div>
                </div>
                <button onClick={() => handleCrystalPurchase('gold_m', 50, 'gold', 6000)}
                  disabled={buying === 'gold_m' || userCrystals < 50}
                  className="bg-yellow-800 hover:bg-yellow-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-bold text-sm transition-colors">
                  💎 50
                </button>
              </div>
              {/* 대 */}
              <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-yellow-700/40 hover:border-yellow-600/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-800/40 p-2 rounded-full text-xl">💰</div>
                  <div>
                    <div className="font-bold text-yellow-300">{t('shop.exchange.l')}</div>
                    <div className="text-xs text-gray-500">14,000 Gold <span className="text-green-400">(+40%)</span></div>
                    <div className="text-[10px] text-gray-600 mt-0.5">140G / 💎</div>
                  </div>
                </div>
                <button onClick={() => handleCrystalPurchase('gold_l', 100, 'gold', 14000)}
                  disabled={buying === 'gold_l' || userCrystals < 100}
                  className="bg-yellow-700 hover:bg-yellow-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-bold text-sm transition-colors">
                  💎 100
                </button>
              </div>
              {/* 특대 */}
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/20 rounded-lg p-4 flex items-center justify-between border border-orange-600/40 hover:border-orange-500/60 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-900/40 p-2 rounded-full text-xl">💰</div>
                  <div>
                    <div className="font-bold text-orange-300">{t('shop.exchange.xl')}</div>
                    <div className="text-xs text-gray-400">80,000 Gold <span className="text-green-400">(+60%)</span></div>
                    <div className="text-[10px] text-gray-600 mt-0.5">160G / 💎</div>
                  </div>
                </div>
                <button onClick={() => handleCrystalPurchase('gold_xl', 500, 'gold', 80000)}
                  disabled={buying === 'gold_xl' || userCrystals < 500}
                  className="bg-orange-700 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-bold text-sm transition-colors">
                  💎 500
                </button>
              </div>
              {/* 거대 */}
              <div className="bg-gradient-to-r from-yellow-800/30 to-amber-900/30 rounded-lg p-4 flex items-center justify-between border border-amber-500/50 hover:border-amber-400/70 transition-all shadow-lg shadow-amber-900/20 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-800/40 p-2 rounded-full text-2xl">💰</div>
                  <div>
                    <div className="font-bold text-amber-300 text-base">{t('shop.exchange.xxl')}</div>
                    <div className="text-sm text-gray-400">180,000 Gold <span className="text-green-400 font-bold">(+80%)</span></div>
                    <div className="text-[10px] text-gray-600 mt-0.5">180G / 💎 · {t('shop.exchange.bestValue')}</div>
                  </div>
                </div>
                <button onClick={() => handleCrystalPurchase('gold_xxl', 1000, 'gold', 180000)}
                  disabled={buying === 'gold_xxl' || userCrystals < 1000}
                  className="bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-black text-sm transition-colors shadow-md">
                  💎 1000
                </button>
              </div>
            </div>
          </section>

          {/* 3. 크리스탈 충전 (Mock) */}
          <section className="border-t border-gray-700 pt-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">💳</span> {t('shop.charge.title')} <span className="text-sm font-normal text-gray-500 ml-2">{t('shop.charge.testNotice')}</span>
            </h2>
            <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-700/50 rounded-xl p-6 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white mb-1">{t('shop.charge.amount', { count: 1000 })}</div>
                <div className="text-cyan-300">￦10,000</div>
              </div>
              <button onClick={() => handleCrystalPurchase('charge_1000', 0, 'charge', 1000)}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg shadow-cyan-900/50 transition-all transform hover:scale-105">
                {t('shop.charge.buy')}
              </button>
            </div>
          </section>

        </div>
      )}
    </div>
  );
}
