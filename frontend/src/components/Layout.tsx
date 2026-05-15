import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useGameLock } from '../contexts/GameLockContext';
import { LANGUAGES } from '../i18n/translations';
import BrowserWarning from './BrowserWarning';
import api from '../api/client';

interface Notification {
  id: number;
  name: string;
  displayName: string;
  achievedAt: string;
  rewardGold: number;
  rewardCrystals: number;
}

export default function Layout() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { isLocked, isInfiniteMode, infiniteSaveCallback, exitGameCallback } = useGameLock();
  const navigate = useNavigate();
  const location = useLocation();

  // 게임 중 메뉴 클릭 시 확인 모달용
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  // 모바일 햄버거 메뉴
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // 알림 시스템
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [lastSeenAt, setLastSeenAt] = useState<string>(() => localStorage.getItem('notif_last_seen') ?? '');
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    api.get('/achievements')
      .then(res => {
        const unlocked: Notification[] = (res.data as any[])
          .filter(a => a.unlocked && a.achievedAt)
          .sort((a, b) => new Date(b.achievedAt).getTime() - new Date(a.achievedAt).getTime())
          .slice(0, 20);
        setNotifications(unlocked);
      })
      .catch(() => {});
  }, [user, location.pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifPanel(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const unreadCount = notifications.filter(n => !lastSeenAt || new Date(n.achievedAt) > new Date(lastSeenAt)).length;

  const handleOpenNotif = () => {
    setShowNotifPanel(v => !v);
    if (!showNotifPanel) {
      const now = new Date().toISOString();
      setLastSeenAt(now);
      localStorage.setItem('notif_last_seen', now);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  /**
   * 게임 중 클릭 시 동작 결정:
   * - 미진행/종료: 바로 이동
   * - 진행 중 + 미정지: 완전히 비활성 (클릭 무시)
   * - 진행 중 + 정지: 확인 모달
   */
  function NavItem({
    to,
    label,
    className,
  }: {
    to: string;
    label: string;
    className: string;
  }) {
    if (!isLocked) {
      return (
        <Link to={to} className={className} onClick={closeMobile}>
          {label}
        </Link>
      );
    }
    // 게임 진행 중 (일시정지 여부 무관) → 확인 모달
    return (
      <button
        onClick={() => { setPendingPath(to); closeMobile(); }}
        className={className + ' opacity-70'}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <BrowserWarning />
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 로고 + 데스크톱 메뉴 */}
            <div className="flex items-center gap-6">
              {isLocked ? (
                <button
                  onClick={() => setPendingPath('/')}
                  className="text-yellow-400 font-bold text-xl hover:text-yellow-300 opacity-70"
                >
                  {t.nav.heroDefense}
                </button>
              ) : (
                <Link to="/" className="text-yellow-400 font-bold text-xl hover:text-yellow-300">
                  {t.nav.heroDefense}
                </Link>
              )}
              {user && (
                <div className="hidden md:flex items-center gap-4">
                  <NavItem to="/game" label={t.nav.play} className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold" />
                  <NavItem to="/tutorial" label={t.nav.tutorial} className="text-green-400 hover:text-green-300 text-sm" />
                  <NavItem to="/lobby" label={t.nav.lobby} className="text-blue-400 hover:text-blue-300 text-sm" />
                  <NavItem to="/ai-game" label={t.nav.aiMatch} className="text-purple-400 hover:text-purple-300 text-sm" />
                  <NavItem to="/heroes" label={t.nav.heroes} className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold" />
                  <NavItem to="/shop" label={t.nav.shop} className="text-yellow-300 hover:text-yellow-200 text-sm" />
                  <NavItem to="/synergy" label={t.nav.synergy} className="text-cyan-400 hover:text-cyan-300 text-sm" />
                  <NavItem to="/friends" label={t.nav.friends} className="text-gray-300 hover:text-white text-sm" />
                  <NavItem to="/achievements" label={t.nav.achievements} className="text-gray-300 hover:text-white text-sm" />
                  <NavItem to="/tournament" label={t.nav.tournament} className="text-purple-400 hover:text-purple-300 text-sm" />
                  <NavItem to="/leaderboard" label={t.nav.leaderboard} className="text-yellow-300 hover:text-yellow-200 text-sm" />
                  <NavItem to="/guide" label={`📖 ${t.nav.guide}`} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium" />
                  <NavItem to="/profile" label={t.nav.profile} className="text-gray-300 hover:text-white text-sm" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              {user && (
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={handleOpenNotif}
                    className="relative text-gray-400 hover:text-white transition-colors p-1"
                    title="알림"
                  >
                    <span className="text-lg">🔔</span>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifPanel && (
                    <div className="absolute right-0 top-9 w-80 bg-gray-800 border border-gray-600 rounded-xl shadow-2xl z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-700 font-semibold text-sm text-gray-200">
                        {(t as any).notification?.title ?? 'Notifications'}
                      </div>
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-gray-500 text-sm">{(t as any).notification?.empty ?? 'No notifications.'}</div>
                      ) : (
                        <div className="max-h-80 overflow-y-auto divide-y divide-gray-700">
                          {notifications.map(n => (
                            <div key={n.id} className="px-4 py-3 hover:bg-gray-700/50 transition-colors">
                              <div className="text-sm text-yellow-300 font-medium">{n.name}</div>
                              <div className="text-xs text-gray-400 mt-0.5">
                                {new Date(n.achievedAt).toLocaleDateString()} &nbsp;
                                {n.rewardGold > 0 && <span className="text-yellow-500">+{n.rewardGold.toLocaleString()}G</span>}
                                {n.rewardCrystals > 0 && <span className="text-blue-400 ml-1">+{n.rewardCrystals}💎</span>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {/* Language Selector */}
              <div className="flex items-center gap-1 bg-gray-700 rounded px-1 py-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    title={lang.label}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      language === lang.code
                        ? 'bg-yellow-600 text-white font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    {lang.flag} {lang.code.toUpperCase()}
                  </button>
                ))}
              </div>

              {user ? (
                <>
                  <span className="text-gray-400 text-sm hidden sm:inline">{user.username}</span>
                  {/* 로그아웃도 게임 중엔 비활성 처리 */}
                  {isLocked ? (
                    <button
                      onClick={() => setPendingPath('__logout__')}
                      className="bg-red-800 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition-colors opacity-70"
                    >
                      {t.nav.logout}
                    </button>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                    >
                      {t.nav.logout}
                    </button>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    to="/register"
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    {t.nav.register}
                  </Link>
                </>
              )}

              {/* 햄버거 버튼 — 모바일 전용 */}
              {user && (
                <button
                  className="md:hidden text-gray-300 hover:text-white p-1 ml-1"
                  onClick={() => setMobileOpen(v => !v)}
                  aria-label="메뉴 열기"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileOpen
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    }
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {user && mobileOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700 px-4 py-3 flex flex-col gap-3">
            <NavItem to="/game"        label={t.nav.play}         className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold py-1" />
            <NavItem to="/tutorial"    label={t.nav.tutorial}     className="text-green-400 hover:text-green-300 text-sm py-1" />
            <NavItem to="/lobby"       label={t.nav.lobby}        className="text-blue-400 hover:text-blue-300 text-sm py-1" />
            <NavItem to="/ai-game"     label={t.nav.aiMatch}      className="text-purple-400 hover:text-purple-300 text-sm py-1" />
            <NavItem to="/heroes"      label={t.nav.heroes}       className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold py-1" />
            <NavItem to="/shop"        label={t.nav.shop}         className="text-yellow-300 hover:text-yellow-200 text-sm py-1" />
            <NavItem to="/synergy"     label={t.nav.synergy}      className="text-cyan-400 hover:text-cyan-300 text-sm py-1" />
            <NavItem to="/friends"     label={t.nav.friends}      className="text-gray-300 hover:text-white text-sm py-1" />
            <NavItem to="/achievements" label={t.nav.achievements} className="text-gray-300 hover:text-white text-sm py-1" />
            <NavItem to="/tournament"  label={t.nav.tournament}   className="text-purple-400 hover:text-purple-300 text-sm py-1" />
            <NavItem to="/leaderboard" label={t.nav.leaderboard}  className="text-yellow-300 hover:text-yellow-200 text-sm py-1" />
            <NavItem to="/guide"       label={`📖 ${t.nav.guide}`} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium py-1" />
            <NavItem to="/profile"     label={t.nav.profile}      className="text-gray-300 hover:text-white text-sm py-1" />
          </div>
        )}
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-sm text-gray-500">
          <span>Hero Defense - ft_transcendence</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gray-300">{t.footer.privacyPolicy}</Link>
            <Link to="/terms" className="hover:text-gray-300">{t.footer.termsOfService}</Link>
            <Link to="/status" className="hover:text-gray-300">Server Status</Link>
          </div>
        </div>
      </footer>

      {/* 게임 중 이탈 확인 모달 (일시정지 상태에서 메뉴 클릭 시) */}
      {pendingPath && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl border-2 border-yellow-500/60 p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚠️</div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">{t.game.exitConfirmTitle}</h3>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {isInfiniteMode ? t.game.exitConfirmDescInfiniteNav : t.game.exitConfirmDescNormal}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setPendingPath(null)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
              >
                {t.game.continuePlay}
              </button>
              {isInfiniteMode && infiniteSaveCallback && (
                <button
                  onClick={() => {
                    const path = pendingPath!;
                    setPendingPath(null);
                    infiniteSaveCallback(path);
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
                >
                  {t.game.saveAndExit}
                </button>
              )}
              <button
                onClick={() => {
                  const path = pendingPath;
                  setPendingPath(null);
                  if (path === '__logout__') {
                    handleLogout();
                  } else if (path && path === location.pathname && exitGameCallback) {
                    // 같은 페이지 이탈: navigate는 no-op이므로 게임 직접 리셋
                    exitGameCallback();
                  } else if (path) {
                    navigate(path);
                  }
                }}
                className="w-full bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
              >
                {t.game.justExit}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
