import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../api/client';
import type { User, UserHero } from '../types';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);
  const [heroes, setHeroes] = useState<UserHero[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, heroesRes, tutorialRes] = await Promise.all([
          api.get('/user/profile'),
          api.get('/user/heroes'),
          api.get('/user/tutorial-progress'),
        ]);
        setProfile(profileRes.data);
        setHeroes(heroesRes.data);
        console.log(tutorialRes.data);
        if (tutorialRes.data === 'none') {
          setShowTutorialModal(true);
        }
      } catch {
        // error handled by interceptor
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStartTutorial = () => {
    navigate('/tutorial/basic1');
  };

  const handleSkipTutorial = () => {
    api.post('/user/tutorial-progress', { progress: 'skipped' }).catch(() => {});
    setShowTutorialModal(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-yellow-400 text-xl">{t.common.loading}</div>
      </div>
    );
  }

  const roleColors: Record<string, string> = {
    tank: 'text-blue-400',
    melee_dps: 'text-red-400',
    ranged_dps: 'text-orange-400',
    healer: 'text-green-400',
    cc: 'text-purple-400',
  };

  const rarityColors: Record<string, string> = {
    normal: 'border-gray-500',
    rare: 'border-blue-500',
    epic: 'border-purple-500',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* ── 튜토리얼 선택 모달 ── */}
      {showTutorialModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-gray-900 border border-yellow-700 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            {/* 아이콘 */}
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">&#9876;</div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">{t?.dashboard?.tutorialTitle || '튜토리얼'}</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {t?.dashboard?.tutorialDesc || '처음 오셨나요? 주인공과 함께 기초를 배워보세요.'}
              </p>
            </div>

            {/* 튜토리얼 내용 미리보기 */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6 text-sm text-gray-400 space-y-1">
              <p>• <span className="text-gray-300">{t?.dashboard?.tutorialStage1 || 'Stage 1 — 홀로 맞서다 (5 웨이브)'}</span></p>
              <p>• {t?.dashboard?.tutorialHint1 || '노스킬 순수 체급으로 생존'}</p>
              <p>• {t?.dashboard?.tutorialHint2 || '5번째 웨이브 보스와의 조우'}</p>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <button
                onClick={handleStartTutorial}
                className="flex-1 py-3 bg-yellow-600 hover:bg-yellow-500 text-black
                           font-bold rounded-lg transition-colors text-sm"
              >
                {t?.dashboard?.tutorialStart || '튜토리얼 시작'}
              </button>
              <button
                onClick={handleSkipTutorial}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300
                           font-medium rounded-lg transition-colors text-sm"
              >
                {t?.dashboard?.tutorialSkip || '건너뛰기'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border border-gray-600 p-6 mb-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">
          {t.dashboard.welcome} {profile?.username || user?.username}!
        </h1>
        <div className="flex gap-6 text-gray-300">
          <span>{t.dashboard.level} <strong className="text-white">{profile?.level || 1}</strong></span>
          <span>{t.dashboard.exp} <strong className="text-white">{profile?.experience || 0}</strong></span>
          <span>{t.dashboard.gold} <strong className="text-yellow-300">{profile?.gold || 500}</strong></span>
          <span>{t.dashboard.heroes} <strong className="text-white">{heroes.length}</strong></span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Link
          to="/game"
          className="bg-gray-800 border border-yellow-600 rounded-lg p-5 text-center hover:border-yellow-400 transition-colors"
        >
          <div className="text-3xl mb-2">&#9876;</div>
          <h3 className="text-yellow-400 font-bold">{t.dashboard.playSolo}</h3>
          <p className="text-gray-400 text-xs mt-1">{t.dashboard.playSoloDesc}</p>
        </Link>

        <Link
          to="/lobby"
          className="bg-gray-800 border border-blue-600 rounded-lg p-5 text-center hover:border-blue-400 transition-colors"
        >
          <div className="text-3xl mb-2">&#9813;</div>
          <h3 className="text-blue-400 font-bold">{t.dashboard.multiplayer}</h3>
          <p className="text-gray-400 text-xs mt-1">{t.dashboard.multiplayerDesc}</p>
        </Link>

        <Link
          to="/ai-game"
          className="bg-gray-800 border border-purple-600 rounded-lg p-5 text-center hover:border-purple-400 transition-colors"
        >
          <div className="text-3xl mb-2">&#129504;</div>
          <h3 className="text-purple-400 font-bold">{t.dashboard.aiMatch}</h3>
          <p className="text-gray-400 text-xs mt-1">{t.dashboard.aiMatchDesc}</p>
        </Link>

        <Link
          to="/tournament"
          className="bg-gray-800 border border-orange-600 rounded-lg p-5 text-center hover:border-orange-400 transition-colors"
        >
          <div className="text-3xl mb-2">&#127942;</div>
          <h3 className="text-orange-400 font-bold">{t.dashboard.tournament}</h3>
          <p className="text-gray-400 text-xs mt-1">{t.dashboard.tournamentDesc}</p>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link
          to="/shop"
          className="bg-gray-800 border border-yellow-500 rounded-lg p-4 text-center hover:border-yellow-300 transition-colors"
        >
          <div className="text-2xl mb-1">&#128176;</div>
          <h3 className="text-yellow-300 font-bold text-sm">{t?.nav?.shop}</h3>
          <p className="text-gray-400 text-[10px]">{t?.dashboard?.shopDesc2 || '영웅 영입 & 벽 강화'}</p>
        </Link>

        <Link
          to="/heroes"
          className="bg-gray-800 border border-rose-600 rounded-lg p-4 text-center hover:border-rose-400 transition-colors"
        >
          <div className="text-2xl mb-1">⚔️</div>
          <h3 className="text-rose-400 font-bold text-sm">{t?.dashboard?.heroesManageTitle || '내 영웅 관리'}</h3>
          <p className="text-gray-400 text-[10px]">{t?.dashboard?.heroesManageDesc || '전직 및 스킬 세팅'}</p>
        </Link>

        <Link
          to="/achievements"
          className="bg-gray-800 border border-amber-600 rounded-lg p-4 text-center hover:border-amber-400 transition-colors"
        >
          <div className="text-2xl mb-1">&#127942;</div>
          <h3 className="text-amber-400 font-bold text-sm">{t.dashboard.achievements}</h3>
          <p className="text-gray-400 text-[10px]">{t.dashboard.achievementsDesc}</p>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Link
          to="/friends"
          className="bg-gray-800 border border-green-600 rounded-lg p-4 text-center hover:border-green-400 transition-colors"
        >
          <div className="text-2xl mb-1">&#128101;</div>
          <h3 className="text-green-400 font-bold text-sm">{t.dashboard.friends}</h3>
          <p className="text-gray-400 text-xs">{t.dashboard.friendsDesc}</p>
        </Link>
        <Link
          to="/synergy"
          className="bg-gray-800 border border-indigo-600 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors"
        >
          <div className="text-2xl mb-1">✨</div>
          <h3 className="text-indigo-400 font-bold text-sm">{t?.dashboard?.synergyTitle || '시너지 가이드'}</h3>
          <p className="text-gray-400 text-xs">{t?.dashboard?.synergyDesc || '종족 및 원소 효과 확인'}</p>
        </Link>
        <Link
          to="/leaderboard"
          className="bg-gray-800 border border-yellow-500 rounded-lg p-4 text-center hover:border-yellow-300 transition-colors"
        >
          <div className="text-2xl mb-1">🏆</div>
          <h3 className="text-yellow-300 font-bold text-sm">{t.dashboard.leaderboard}</h3>
          <p className="text-gray-400 text-xs">{t.dashboard.leaderboardDesc}</p>
        </Link>
      </div>

      {/* Hero Collection */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          {t.dashboard.myHeroes} {heroes.length > 0 && <span className="text-gray-500 font-normal text-sm">({heroes.length})</span>}
        </h2>

        {heroes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">{t.dashboard.noHeroes}</p>
            <p className="text-sm">{t.dashboard.noHeroesDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {heroes.map((hero) => (
              <div
                key={hero.id}
                className={`bg-gray-700 rounded-lg border-2 ${rarityColors[hero.template.rarity] || 'border-gray-500'} p-4`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white">{hero.template.name}</h3>
                  <span className="text-xs text-gray-400">Lv.{hero.level}</span>
                </div>
                <div className="text-sm space-y-1">
                  <p className={roleColors[hero.template.spec.role] || 'text-gray-300'}>
                    {hero.template.spec.gameClass.displayName} - {hero.template.spec.displayName}
                  </p>
                  <p className="text-gray-400">
                    {hero.template.race.displayName} / {hero.template.element.displayName}
                  </p>
                  <div className="flex gap-3 text-xs text-gray-500 mt-2">
                    <span>{t.common.hp} {hero.template.baseHp}</span>
                    <span>{t.common.atk} {hero.template.baseAtk}</span>
                    <span>{t.common.def} {hero.template.baseDef}</span>
                    <span>{t.common.spd} {hero.template.baseSpeed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
