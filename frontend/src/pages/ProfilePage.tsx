import { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/client';
import type { User } from '../types';

export default function ProfilePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, tutorialRes] = await Promise.all([
          api.get('/user/profile'),
          api.get('/user/tutorial-progress'),
        ]);
        setProfile(profileRes.data);
        setNewUsername(profileRes.data.username);
        console.log(tutorialRes.data);
        if (tutorialRes.data === 'none') {
          setShowTutorialModal(true);
        }
      } catch {
        // handled by interceptor
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleStartTutorial = () => {
    navigate('/tutorial/basic1');
  };

  const handleSkipTutorial = () => {
    api.post('/user/tutorial-progress', { progress: 'skipped' }).catch(() => {});
    setShowTutorialModal(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError(t?.profile?.imageOnly || '이미지 파일만 업로드 가능합니다.');
      return;
    }

    setAvatarUploading(true);
    setError('');

    // canvas로 200x200 리사이즈 후 base64 변환
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d')!;
        // 정사각형 크롭 후 200x200으로 그리기
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 200, 200);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        try {
          const { data } = await api.put('/user/profile', { avatarUrl: dataUrl });
          setProfile((prev) => prev ? { ...prev, avatarUrl: data.avatarUrl } : prev);
          setSuccess(t?.profile?.avatarUpdated || '아바타가 업데이트되었습니다.');
        } catch {
          setError(t?.profile?.avatarFailed || '아바타 업로드에 실패했습니다.');
        } finally {
          setAvatarUploading(false);
        }
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDataExport = async () => {
    try {
      const res = await api.get('/user/data-export', { responseType: 'blob' });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `herodefense-mydata.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError(t.profile.gdprExportFailed);
    }
  };

  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    try {
      await api.delete('/user/account');
      await logout();
      navigate('/login');
    } catch {
      setError(t.profile.gdprDeleteFailed);
      setDeletingAccount(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newUsername.length < 3 || newUsername.length > 20) {
      setError(t.profile.usernameLengthError);
      return;
    }

    try {
      const { data } = await api.put('/user/profile', { username: newUsername });
      setProfile((prev) => prev ? { ...prev, username: data.username } : prev);
      setEditing(false);
      setSuccess(t.profile.profileUpdated);

      // Update local storage user info
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        parsed.username = data.username;
        localStorage.setItem('user', JSON.stringify(parsed));
      }
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || t.profile.updateFailed);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-yellow-400 text-xl">{t.common.loading}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-red-400 text-xl">{t.profile.failedToLoad}</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
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
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">{t.profile.title}</h1>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-900/50 border border-green-500 text-green-300 px-4 py-2 rounded mb-4 text-sm">
          {success}
        </div>
      )}

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        {/* Avatar + Info */}
        <div className="flex items-start gap-6 mb-6">
          {/* 클릭 시 파일 선택 */}
          <input
            ref={fileInputRef}
            id="avatar-upload"
            name="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={avatarUploading}
            className="relative w-20 h-20 rounded-full border-2 border-yellow-600 overflow-hidden flex-shrink-0 group hover:border-yellow-400 transition-colors"
            title={t?.profile?.changeAvatar || '클릭하여 아바타 변경'}
          >
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-3xl">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
            {/* 호버 오버레이 */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white font-bold">
              {avatarUploading ? '...' : (t?.profile?.changeBtn || '변경')}
            </div>
          </button>
          <div className="flex-1">
            {editing ? (
              <form onSubmit={handleUpdate} className="flex gap-2 items-end">
                <div>
                  <label htmlFor="username-edit" className="block text-sm text-gray-400 mb-1">{t.profile.username}</label>
                  <input
                    id="username-edit"
                    name="username"
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    minLength={3}
                    maxLength={20}
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-1.5 text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                >
                  {t.profile.save}
                </button>
                <button
                  type="button"
                  onClick={() => { setEditing(false); setNewUsername(profile.username); }}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-sm transition-colors"
                >
                  {t.profile.cancel}
                </button>
              </form>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {profile.username}
                  <button
                    onClick={() => setEditing(true)}
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                  >
                    {t.profile.edit}
                  </button>
                </h2>
                <p className="text-gray-400 text-sm">{profile.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded p-4 text-center">
            <div className="text-2xl font-bold text-white">{new Set(['protagonist', ...(Array.isArray(profile.ownedHeroIds) ? profile.ownedHeroIds : [])]).size}</div>
            <div className="text-sm text-gray-400">{t.profile.ownedHeroes}</div>
          </div>
          <div className="bg-gray-700 rounded p-4 text-center">
            <div className="text-2xl font-bold text-blue-300">{profile.crystals}</div>
            <div className="text-sm text-gray-400">{t.profile.crystals}</div>
          </div>
          <div className="bg-gray-700 rounded p-4 text-center">
            <div className="text-2xl font-bold text-yellow-300">{profile.gold}</div>
            <div className="text-sm text-gray-400">{t.profile.gold}</div>
          </div>
          <div className="bg-gray-700 rounded p-4 text-center">
            <div className={`text-2xl font-bold ${profile.isOnline ? 'text-green-400' : 'text-gray-500'}`}>
              {profile.isOnline ? t.profile.online : t.profile.offline}
            </div>
            <div className="text-sm text-gray-400">{t.profile.status}</div>
          </div>
        </div>

        {/* Account Info */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-sm text-gray-500">
          <p>{t.profile.memberSince} {new Date(profile.createdAt).toLocaleDateString()}</p>
          {profile.lastLogin && (
            <p>{t.profile.lastLogin} {new Date(profile.lastLogin).toLocaleString()}</p>
          )}
        </div>
      </div>

      {/* GDPR / 개인정보 관리 */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-200 mb-1">{t.profile.gdprTitle}</h2>
        <p className="text-xs text-gray-500 mb-4">{t.profile.gdprDesc}</p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDataExport}
            className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {t.profile.gdprExport}
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-900/60 hover:bg-red-800 text-red-300 border border-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            {t.profile.gdprDelete}
          </button>
        </div>
      </div>

      {/* 계정 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 rounded-xl border-2 border-red-500/60 p-6 max-w-sm w-full shadow-2xl">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">⚠️</div>
              <h3 className="text-red-400 font-bold text-lg mb-2">{t.profile.gdprDeleteTitle}</h3>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {t.profile.gdprDeleteDesc}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
              >
                {t.profile.cancel}
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deletingAccount}
                className="w-full bg-red-700 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {deletingAccount ? t.profile.gdprDeleting : t.profile.gdprDeleteConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
