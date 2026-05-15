import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { GameLockProvider } from './contexts/GameLockContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import GamePage from './pages/GamePage';
import LobbyPage from './pages/LobbyPage';
import FriendsPage from './pages/FriendsPage';
import ShopPage from './pages/ShopPage';
import AchievementsPage from './pages/AchievementsPage';
import TournamentPage from './pages/TournamentPage';
import AIGamePage from './pages/AIGamePage';
import HeroesPage from './pages/HeroesPage';
import TutorialSelectionPage from './pages/TutorialSelectionPage';
import TutorialPage from './pages/TutorialPage';
import TutorialPage2 from './pages/TutorialPage2';
import TankTutorialPage from './pages/TankTutorialPage';
import MeleeTutorialPage from './pages/MeleeTutorialPage';
import RangedTutorialPage from './pages/RangedTutorialPage';
import HealerTutorialPage from './pages/HealerTutorialPage';
import CCTutorialPage from './pages/CCTutorialPage';
import MechanicTutorialPage from './pages/MechanicTutorialPage';
import SynergyPage from './pages/SynergyPage';
import OffenseGamePage from './pages/OffenseGamePage';
import LeaderboardPage from './pages/LeaderboardPage';
import GuidePage from './pages/GuidePage';
import StatusPage from './pages/StatusPage';

function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (user) return <Navigate to="/profile" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
      <AuthProvider>
      <GameLockProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route
              path="/login"
              element={<GuestOnly><LoginPage /></GuestOnly>}
            />
            <Route
              path="/register"
              element={<GuestOnly><RegisterPage /></GuestOnly>}
            />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/status" element={<StatusPage />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={<Navigate to="/profile" replace />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
            />
            <Route
              path="/game"
              element={<ProtectedRoute><GamePage /></ProtectedRoute>}
            />
            <Route
              path="/lobby"
              element={<ProtectedRoute><LobbyPage /></ProtectedRoute>}
            />
            <Route
              path="/friends"
              element={<ProtectedRoute><FriendsPage /></ProtectedRoute>}
            />
            <Route
              path="/shop"
              element={<ProtectedRoute><ShopPage /></ProtectedRoute>}
            />
            <Route
              path="/achievements"
              element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>}
            />
            <Route
              path="/tournament"
              element={<ProtectedRoute><TournamentPage /></ProtectedRoute>}
            />
            <Route
              path="/ai-game"
              element={<ProtectedRoute><AIGamePage /></ProtectedRoute>}
            />
            <Route
              path="/heroes"
              element={<ProtectedRoute><HeroesPage /></ProtectedRoute>}
            />
            <Route
              path="/tutorial"
              element={<ProtectedRoute><TutorialSelectionPage /></ProtectedRoute>}
            />
            <Route
              path="/tutorial/basic1"
              element={<ProtectedRoute><TutorialPage /></ProtectedRoute>}
            />
            <Route
              path="/tutorial/basic2"
              element={<ProtectedRoute><TutorialPage2 /></ProtectedRoute>}
            />
            <Route
              path="/tutorial/class/tank"
              element={<ProtectedRoute><TankTutorialPage /></ProtectedRoute>}
            />
            <Route
              path="/tutorial/class/melee_dps"
              element={<ProtectedRoute><MeleeTutorialPage /></ProtectedRoute>}
            />
            <Route
              path="/tutorial/class/ranged_dps"
              element={<ProtectedRoute><RangedTutorialPage /></ProtectedRoute>}
            />
            <Route
              path="/tutorial/class/healer"
              element={<ProtectedRoute><HealerTutorialPage /></ProtectedRoute>}
            />
            <Route
              path="/tutorial/class/cc"
              element={<ProtectedRoute><CCTutorialPage /></ProtectedRoute>}
            />
            <Route
              path="/tutorial/class/mechanic"
              element={<ProtectedRoute><MechanicTutorialPage /></ProtectedRoute>}
            />
            <Route
              path="/tutorial/class/:role"
              element={<ProtectedRoute><TutorialPage /></ProtectedRoute>} // 다른 직업은 아직 기본 튜토리얼 연결
            />
            <Route
              path="/synergy"
              element={<ProtectedRoute><SynergyPage /></ProtectedRoute>}
            />
            <Route
              path="/offense-game"
              element={<ProtectedRoute><OffenseGamePage /></ProtectedRoute>}
            />
            <Route
              path="/leaderboard"
              element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>}
            />
            <Route
              path="/guide"
              element={<ProtectedRoute><GuidePage /></ProtectedRoute>}
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </GameLockProvider>
      </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
