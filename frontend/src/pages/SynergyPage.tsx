import { useState } from 'react';
import { HERO_DEFINITIONS } from '../game/heroData';
import { useLanguage } from '../contexts/LanguageContext';

type Tab = 'race' | 'element';

interface SynergyTier {
  count: number;
  label: string;
  effect: string;
}

interface SynergyDef {
  key: string;
  name: string;
  icon: string;
  color: string;
  active: boolean;
  tiers: SynergyTier[];
  filterKey: 'raceName' | 'elementName';
  filterValue: string;
}

// ── 종족 시너지 데이터 ──────────────────────────────────────────
const RACE_SYNERGIES: SynergyDef[] = [
  {
    key: 'orc', name: '오크', icon: '⚔️', color: '#f97316', active: true,
    filterKey: 'raceName', filterValue: '오크',
    tiers: [
      { count: 2, label: 'T1', effect: '전체 체력 +10%' },
      { count: 3, label: 'T2', effect: '전체 체력 +20% · 방어 +8' },
      { count: 4, label: 'T3', effect: '전체 체력 +30% · 방어 +15' },
    ],
  },
  {
    key: 'human', name: '인간', icon: '🛡️', color: '#60a5fa', active: true,
    filterKey: 'raceName', filterValue: '인간',
    tiers: [
      { count: 2, label: 'T1', effect: '전체 공격력 +10%' },
      { count: 3, label: 'T2', effect: '전체 공격력 +15% · 공격속도 +10%' },
      { count: 4, label: 'T3', effect: '전체 공격력 +25% · 공격속도 +15%' },
    ],
  },
  {
    key: 'elf', name: '엘프', icon: '🌿', color: '#4ade80', active: true,
    filterKey: 'raceName', filterValue: '엘프',
    tiers: [
      { count: 2, label: 'T1', effect: 'CC 지속시간 +30%' },
      { count: 3, label: 'T2', effect: 'CC 지속시간 +50% · 스킬 범위 +20%' },
      { count: 4, label: 'T3', effect: 'CC 지속시간 +80% · 스킬 범위 +30%' },
    ],
  },
  {
    key: 'undead', name: '언데드', icon: '💀', color: '#a78bfa', active: true,
    filterKey: 'raceName', filterValue: '언데드',
    tiers: [
      { count: 2, label: 'T1', effect: '힐량 +20%' },
      { count: 3, label: 'T2', effect: '힐량 +35%' },
      { count: 4, label: 'T3', effect: '힐량 +50% · 생명 흡수 10%' },
    ],
  },
  {
    key: 'tauren', name: '타우렌', icon: '🐂', color: '#a3e635', active: true,
    filterKey: 'raceName', filterValue: '타우렌',
    tiers: [
      { count: 2, label: 'T1', effect: '체력 +15%, 방어력 +5' },
      { count: 3, label: 'T2', effect: '체력 +25%, 방어력 +12' },
      { count: 4, label: 'T3', effect: '체력 +40%, 방어력 +20' },
    ],
  },
  {
    key: 'troll', name: '트롤', icon: '🪓', color: '#06b6d4', active: true,
    filterKey: 'raceName', filterValue: '트롤',
    tiers: [
      { count: 2, label: 'T1', effect: '공격속도 +15%' },
      { count: 3, label: 'T2', effect: '공격속도 +25%, 힐량 +10%' },
      { count: 4, label: 'T3', effect: '공격속도 +35%, 힐량 +20%' },
    ],
  },
  {
    key: 'pandaren', name: '판다렌', icon: '🐼', color: '#f59e0b', active: true,
    filterKey: 'raceName', filterValue: '판다렌',
    tiers: [
      { count: 2, label: 'T1', effect: '방어력 +8, 이동속도 +10%' },
      { count: 3, label: 'T2', effect: '방어력 +15, 이동속도 +15%' },
      { count: 4, label: 'T3', effect: '방어력 +25, 이동속도 +20%, 체력 +10%' },
    ],
  },
  {
    key: 'beast', name: '야수족', icon: '🐾', color: '#ef4444', active: true,
    filterKey: 'raceName', filterValue: '야수족',
    tiers: [
      { count: 2, label: 'T1', effect: '공격력 +12%' },
      { count: 3, label: 'T2', effect: '공격력 +20%, 공격속도 +15%, 흡혈 5%' },
    ],
  },
  {
    key: 'nightelf', name: '밤엘프', icon: '🌙', color: '#a855f7', active: true,
    filterKey: 'raceName', filterValue: '밤엘프',
    tiers: [
      { count: 2, label: 'T1', effect: '이동속도 +15%' },
      { count: 3, label: 'T2', effect: '이동속도 +25%, 공격력 +12%' },
    ],
  },
  {
    key: 'goblin', name: '고블린', icon: '💰', color: '#22c55e', active: true,
    filterKey: 'raceName', filterValue: '고블린',
    tiers: [
      { count: 2, label: 'T1', effect: '공격속도 +15%' },
      { count: 3, label: 'T2', effect: '공격속도 +25%, 공격력 +10%' },
      { count: 4, label: 'T3', effect: '공격속도 +35%, 공격력 +15%' },
    ],
  },
  {
    key: 'draenei', name: '드레나이', icon: '✨', color: '#38bdf8', active: true,
    filterKey: 'raceName', filterValue: '드레나이',
    tiers: [
      { count: 2, label: 'T1', effect: '힐량 +15%' },
      { count: 3, label: 'T2', effect: '힐량 +25%, 체력 +10%' },
      { count: 4, label: 'T3', effect: '힐량 +40%, 체력 +15%, 방어력 +8' },
    ],
  },
  {
    key: 'bloodelf', name: '블러드엘프', icon: '🩸', color: '#f43f5e', active: true,
    filterKey: 'raceName', filterValue: '블러드엘프',
    tiers: [
      { count: 2, label: 'T1', effect: '공격력 +12%' },
      { count: 3, label: 'T2', effect: '공격력 +20%, 흡혈 5%' },
      { count: 4, label: 'T3', effect: '공격력 +30%, 흡혈 10%' },
    ],
  },
  {
    key: 'voidelf', name: '공허엘프', icon: '🌀', color: '#7c3aed', active: true,
    filterKey: 'raceName', filterValue: '공허엘프',
    tiers: [
      { count: 2, label: 'T1', effect: '공격력 +10%, 처형 임계값 +5%' },
    ],
  },
  {
    key: 'lightforged', name: '빛벼림 드레나이', icon: '🌟', color: '#fde047', active: true,
    filterKey: 'raceName', filterValue: '빛벼림 드레나이',
    tiers: [
      { count: 2, label: 'T1', effect: '힐량 +15%, 공격력 +10%' },
    ],
  },
  {
    key: 'gnome', name: '노움', icon: '⚙️', color: '#06b6d4', active: true,
    filterKey: 'raceName', filterValue: '노움',
    tiers: [
      { count: 2, label: 'T1', effect: '공격력 +10%' },
      { count: 3, label: 'T2', effect: '공격력 +15%, 방어력 +8' },
      { count: 4, label: 'T3', effect: '공격력 +20%, 방어력 +15, 체력 +10%' },
    ],
  },
  { key: 'dracthyr', name: '드렉티르', icon: '🐉', color: '#9ca3af', active: false, tiers: [], filterKey: 'raceName', filterValue: '드렉티르' },
];

// ── 원소 시너지 데이터 ──────────────────────────────────────────
const ELEMENT_SYNERGIES: SynergyDef[] = [
  {
    key: 'fire', name: '화염', icon: '🔥', color: '#ef4444', active: true,
    filterKey: 'elementName', filterValue: '화염',
    tiers: [
      { count: 2, label: 'T1', effect: '전체 공격력 +15%' },
      { count: 3, label: 'T2', effect: '전체 공격력 +25%' },
      { count: 4, label: 'T3', effect: '전체 공격력 +35% · 화상 효과 부여' },
    ],
  },
  {
    key: 'frost', name: '냉기', icon: '❄️', color: '#67e8f9', active: true,
    filterKey: 'elementName', filterValue: '냉기',
    tiers: [
      { count: 2, label: 'T1', effect: '적 둔화 +30%' },
      { count: 3, label: 'T2', effect: '적 둔화 +60%' },
      { count: 4, label: 'T3', effect: '적 둔화 +100% · 빙결 확률 30%' },
    ],
  },
  {
    key: 'holy', name: '신성', icon: '🌟', color: '#fbbf24', active: true,
    filterKey: 'elementName', filterValue: '신성',
    tiers: [
      { count: 2, label: 'T1', effect: '힐량 +20%' },
      { count: 3, label: 'T2', effect: '힐량 +35%' },
      { count: 4, label: 'T3', effect: '힐량 +50% · 최대 체력 +20%' },
    ],
  },
  {
    key: 'dark', name: '암흑', icon: '🌑', color: '#8b5cf6', active: true,
    filterKey: 'elementName', filterValue: '암흑',
    tiers: [
      { count: 2, label: 'T1', effect: '처형 확률 +5% (체력 30% 이하)' },
      { count: 3, label: 'T2', effect: '처형 확률 +10%' },
      { count: 4, label: 'T3', effect: '처형 확률 +15% · 생명 흡수 15%' },
    ],
  },
  {
    key: 'nature', name: '자연', icon: '🌱', color: '#22c55e', active: true,
    filterKey: 'elementName', filterValue: '자연',
    tiers: [
      { count: 2, label: 'T1', effect: '힐량 +15%' },
      { count: 3, label: 'T2', effect: '힐량 +25%, 체력 +10%' },
      { count: 4, label: 'T3', effect: '힐량 +40%, 체력 +15%' },
    ],
  },
  {
    key: 'water', name: '물', icon: '💧', color: '#38bdf8', active: true,
    filterKey: 'elementName', filterValue: '물',
    tiers: [
      { count: 2, label: 'T1', effect: '힐량 +15%, 이동속도 +10%' },
      { count: 3, label: 'T2', effect: '힐량 +25%, 이동속도 +15%' },
      { count: 4, label: 'T3', effect: '힐량 +35%, 이동속도 +20%, 체력 +10%' },
    ],
  },
  {
    key: 'thunder', name: '번개', icon: '⚡', color: '#fbbf24', active: true,
    filterKey: 'elementName', filterValue: '번개',
    tiers: [
      { count: 2, label: 'T1', effect: '공격속도 +20%' },
      { count: 3, label: 'T2', effect: '공격속도 +35%, 공격력 +10%' },
      { count: 4, label: 'T3', effect: '공격속도 +50%, 공격력 +15%' },
    ],
  },
  {
    key: 'ice', name: '서리', icon: '🧊', color: '#a5f3fc', active: true,
    filterKey: 'elementName', filterValue: '서리',
    tiers: [
      { count: 2, label: 'T1', effect: '방어력 +10, CC 지속 +20%' },
      { count: 3, label: 'T2', effect: '방어력 +20, CC 지속 +40%' },
      { count: 4, label: 'T3', effect: '방어력 +30, CC 지속 +60%, 체력 +10%' },
    ],
  },
  {
    key: 'wind', name: '바람', icon: '💨', color: '#6ee7b7', active: true,
    filterKey: 'elementName', filterValue: '바람',
    tiers: [
      { count: 2, label: 'T1', effect: '이동속도 +15%, 공격속도 +10%' },
      { count: 3, label: 'T2', effect: '이동속도 +20%, 공격속도 +20%' },
      { count: 4, label: 'T3', effect: '이동속도 +25%, 공격속도 +30%, 공격력 +10%' },
    ],
  },
  {
    key: 'poison', name: '독', icon: '☠️', color: '#84cc16', active: true,
    filterKey: 'elementName', filterValue: '독',
    tiers: [
      { count: 2, label: 'T1', effect: '처형 임계값 +5%' },
      { count: 3, label: 'T2', effect: '처형 임계값 +10%, 공격력 +10%' },
      { count: 4, label: 'T3', effect: '처형 임계값 +15%, 공격력 +15%, 흡혈 5%' },
    ],
  },
  {
    key: 'flame', name: '불꽃', icon: '🌋', color: '#fb923c', active: true,
    filterKey: 'elementName', filterValue: '불꽃',
    tiers: [
      { count: 2, label: 'T1', effect: '공격력 +18%' },
      { count: 3, label: 'T2', effect: '공격력 +28%' },
      { count: 4, label: 'T3', effect: '공격력 +40%' },
    ],
  },
  {
    key: 'dragon', name: '용 ★', icon: '🐲', color: '#22d3ee', active: true,
    filterKey: 'elementName', filterValue: '용',
    tiers: [
      { count: 1, label: 'T1', effect: '용의 은총 — 전체 공격력 +20%, 체력 +15% (1명 단독 발동!)' },
    ],
  },
  { key: 'light', name: '빛', icon: '💡', color: '#9ca3af', active: false, tiers: [], filterKey: 'elementName', filterValue: '빛' },
];

// 티어 라벨 배경색
const TIER_BG: Record<string, string> = {
  T1: 'bg-gray-700',
  T2: 'bg-blue-900/60',
  T3: 'bg-yellow-900/60',
};
const TIER_BORDER: Record<string, string> = {
  T1: 'border-gray-600',
  T2: 'border-blue-600',
  T3: 'border-yellow-500',
};
const TIER_LABEL_COLOR: Record<string, string> = {
  T1: 'text-gray-300',
  T2: 'text-blue-300',
  T3: 'text-yellow-300',
};

function SynergyCard({ synergy, tabType }: { synergy: SynergyDef; tabType: Tab }) {
  const { t } = useLanguage();
  const heroes = HERO_DEFINITIONS.filter(
    h => h[synergy.filterKey] === synergy.filterValue
  );

  // 번역 조회 (안전한 접근 및 폴백 추가)
  const synergyBase = t?.synergy || {};
  const synergyData = tabType === 'race'
    ? (synergyBase.race as Record<string, any>)?.[synergy.key]
    : (synergyBase.element as Record<string, any>)?.[synergy.key];

  const displayName = synergyData?.name || synergy.name;

  const getEffect = (tier: SynergyTier) =>
    synergyData?.[tier.label.toLowerCase()] || tier.effect;

  return (
    <div
      className={`bg-gray-800 rounded-lg border-2 p-4 ${
        synergy.active ? '' : 'opacity-50'
      }`}
      style={{ borderColor: synergy.active ? synergy.color + '88' : '#374151' }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{synergy.icon}</span>
          <span
            className="font-bold text-base"
            style={{ color: synergy.active ? synergy.color : '#9ca3af' }}
          >
            {displayName}
          </span>
        </div>
        {synergy.active ? (
          <span
            className="text-xs px-2 py-0.5 rounded-full border font-semibold"
            style={{ color: synergy.color, borderColor: synergy.color + '66', backgroundColor: synergy.color + '18' }}
          >
            {t?.synergy?.activeTag || 'Active'}
          </span>
        ) : (
          <span className="text-xs px-2 py-0.5 rounded-full border border-gray-600 text-gray-500 bg-gray-700/40">
            {t?.synergy?.pendingTag || 'Pending'}
          </span>
        )}
      </div>

      {/* 시너지 티어 효과 */}
      {synergy.active ? (
        <div className="space-y-1.5 mb-3">
          {synergy.tiers.map(tier => (
            <div
              key={tier.label}
              className={`flex items-start gap-2 rounded px-2 py-1.5 border ${TIER_BG[tier.label] || 'bg-gray-700'} ${TIER_BORDER[tier.label] || 'border-gray-600'}`}
            >
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`text-xs font-black ${TIER_LABEL_COLOR[tier.label] || 'text-gray-300'}`}>
                  {tier.label}
                </span>
                <span className="text-xs text-gray-500">({tier.count}{t?.synergy?.memberUnit || ''})</span>
              </div>
              <span className="text-xs text-gray-300 leading-relaxed">{getEffect(tier)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-600 mb-3 italic">{t?.synergy?.notImplEffect || 'Not yet implemented.'}</p>
      )}

      {/* 해당 종족/원소 영웅 목록 */}
      <div>
        <p className="text-xs text-gray-500 mb-1.5">
          {(t?.synergy?.heroCount || '{count} heroes').replace('{count}', String(heroes.length))}
        </p>
        {heroes.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {heroes.map(h => {
              const heroTranslations = (t?.heroes as any)?.[h.id] || {};
              const heroName = heroTranslations.name || h.name;
              return (
                <span
                  key={h.id}
                  className="text-xs px-1.5 py-0.5 rounded border"
                  style={{
                    color: synergy.active ? synergy.color : '#6b7280',
                    borderColor: synergy.active ? synergy.color + '44' : '#374151',
                    backgroundColor: synergy.active ? synergy.color + '10' : 'transparent',
                  }}
                >
                  {heroName}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-600">{t?.synergy?.noHeroes || 'No heroes'}</p>
        )}
      </div>
    </div>
  );
}

export default function SynergyPage() {
  const [tab, setTab] = useState<Tab>('race');
  const { t } = useLanguage();

  const synergies = tab === 'race' ? RACE_SYNERGIES : ELEMENT_SYNERGIES;
  const activeSynergies   = synergies.filter(s => s.active);
  const inactiveSynergies = synergies.filter(s => !s.active);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">{t?.synergy?.title || 'Synergy'}</h1>
        <p className="text-xs text-gray-500 mt-1">{t?.synergy?.subtitle || 'Hero Synergies'}</p>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('race')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
            tab === 'race'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
          }`}
        >
          {t?.synergy?.raceTab || 'Race'}
        </button>
        <button
          onClick={() => setTab('element')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
            tab === 'element'
              ? 'bg-cyan-700 text-white'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
          }`}
        >
          {t?.synergy?.elementTab || 'Element'}
        </button>

      </div>

      {/* 활성 시너지 */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
          <span className="text-green-400">●</span> {t?.synergy?.activeLabel || 'Active Synergies'}
          <span className="text-gray-600 font-normal">— {t?.synergy?.activeDesc || 'Currently active in your team'}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {activeSynergies.map(s => (
            <SynergyCard key={s.key} synergy={s} tabType={tab} />
          ))}
        </div>
      </div>

      {/* 준비 중 */}
      <div>
        <h2 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
          <span className="text-gray-600">●</span> {t?.synergy?.pendingLabel || 'Pending'}
          <span className="text-gray-700 font-normal">— {t?.synergy?.pendingDesc || 'Collect more heroes to activate'}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
          {inactiveSynergies.map(s => (
            <SynergyCard key={s.key} synergy={s} tabType={tab} />
          ))}
        </div>
      </div>

      {/* 안내 */}
      <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-xs text-gray-500 leading-relaxed">
        <p>
          <span className="text-yellow-500 font-semibold">{t?.synergy?.ruleTitle || 'Synergy Rules'}</span>:{' '}
          {t?.synergy?.ruleSummary || 'Owning enough heroes of the same race or element triggers powerful effects.'}
          <span className="text-cyan-400 font-semibold"> {t?.synergy?.dragonNote || ''}</span>
        </p>
      </div>
    </div>
  );
}
