import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../api/client';

export default function TutorialSelectionPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [basicProgress, setBasicProgress] = useState<'none' | 'stage1' | 'complete'>('none');

  useEffect(() => {
    api.get('/user/tutorial-progress').then(({ data }) => {
      if (data === 'complete') setBasicProgress('complete');
      else if (data === 'stage1' || data === '1') setBasicProgress('stage1');
    }).catch(() => {});
  }, []);

  const roles = [
    { id: 'tank', name: t('tutorial.sel.roles.tank.name'), color: 'bg-blue-600', icon: '🛡️', desc: t('tutorial.sel.roles.tank.desc') },
    { id: 'melee_dps', name: t('tutorial.sel.roles.melee_dps.name'), color: 'bg-red-600', icon: '⚔️', desc: t('tutorial.sel.roles.melee_dps.desc') },
    { id: 'ranged_dps', name: t('tutorial.sel.roles.ranged_dps.name'), color: 'bg-orange-500', icon: '🏹', desc: t('tutorial.sel.roles.ranged_dps.desc') },
    { id: 'healer', name: t('tutorial.sel.roles.healer.name'), color: 'bg-green-600', icon: '✨', desc: t('tutorial.sel.roles.healer.desc') },
    { id: 'cc', name: t('tutorial.sel.roles.cc.name'), color: 'bg-purple-600', icon: '❄️', desc: t('tutorial.sel.roles.cc.desc') },
    { id: 'mechanic', name: t('tutorial.sel.roles.mechanic.name'), color: 'bg-cyan-600', icon: '🔧', desc: t('tutorial.sel.roles.mechanic.desc') },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">{t('tutorial.sel.title')}</h1>
          <p className="text-gray-400">{t('tutorial.sel.subtitle')}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Basic Tutorial */}
          <div className="bg-gray-900 rounded-2xl border-2 border-green-900/50 p-8 flex flex-col items-center">
            <div className="text-6xl mb-6">📜</div>
            <h2 className="text-2xl font-bold text-green-400 mb-4">{t('tutorial.sel.basicTitle')}</h2>
            <p className="text-gray-400 text-center mb-8 leading-relaxed">
              {t('tutorial.sel.basicDesc1')}<br />
              {t('tutorial.sel.basicDesc2')} <span className="text-yellow-400 font-bold">{t('tutorial.sel.basicDesc2Key')}</span>{t('tutorial.sel.basicDesc2Suf')}
            </p>

            <div className="w-full space-y-3">
              <button
                onClick={() => navigate('/tutorial/basic1')}
                className={`w-full py-4 rounded-xl font-bold text-lg border-2 transition-all
                  ${basicProgress !== 'none'
                    ? 'bg-green-900/20 border-green-600 text-green-300'
                    : 'bg-green-700 border-green-500 hover:bg-green-600 text-white'}`}
              >
                {basicProgress !== 'none' ? t('tutorial.sel.stage1Done') : t('tutorial.sel.stage1')}
              </button>

              <button
                onClick={() => navigate('/tutorial/basic2')}
                className={`w-full py-4 rounded-xl font-bold text-lg border-2 transition-all
                  ${basicProgress === 'complete'
                    ? 'bg-purple-900/20 border-purple-600 text-purple-300'
                    : basicProgress === 'stage1'
                    ? 'bg-purple-700 border-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                    : 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'}`}
                disabled={basicProgress === 'none'}
              >
                {basicProgress === 'complete' ? t('tutorial.sel.stage2Done') : t('tutorial.sel.stage2')}
              </button>
            </div>
          </div>

          {/* Right: Class Tutorials */}
          <div className="bg-gray-900 rounded-2xl border-2 border-blue-900/50 p-8 relative">
            {basicProgress !== 'complete' && (
              <div className="absolute inset-0 z-10 bg-gray-950/80 rounded-2xl flex flex-col items-center justify-center p-6 text-center backdrop-blur-[2px]">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-bold text-gray-200 mb-2">{t('tutorial.sel.locked')}</h3>
                <p className="text-blue-400 font-semibold mb-4">
                  {t('tutorial.sel.lockedDesc')}
                </p>
                <div className="text-xs text-gray-500 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
                  {t('tutorial.sel.lockedHint')}
                </div>
              </div>
            )}

            <div className={`text-center mb-8 ${basicProgress !== 'complete' ? 'opacity-30' : ''}`}>
              <div className="text-6xl mb-6">🎓</div>
              <h2 className="text-2xl font-bold text-blue-400">{t('tutorial.sel.classTitle')}</h2>
              <p className="text-gray-400 mt-2">{t('tutorial.sel.classSub')}</p>
            </div>

            <div className={`grid grid-cols-2 gap-4 ${basicProgress !== 'complete' ? 'opacity-30 pointer-events-none' : ''}`}>
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => navigate(`/tutorial/class/${role.id}`)}
                  className="flex flex-col items-center p-4 rounded-xl border-2 border-transparent
                    bg-gray-800 hover:border-blue-500 transition-all group"
                  disabled={basicProgress !== 'complete'}
                >
                  <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{role.icon}</span>
                  <span className="font-bold text-gray-200">{role.name}</span>
                  <span className="text-[10px] text-gray-500 mt-1">{role.desc}</span>
                </button>
              ))}
            </div>

            <div className={`mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded-xl text-center ${basicProgress !== 'complete' ? 'opacity-30' : ''}`}>
              <p className="text-xs text-blue-300">
                {t('tutorial.sel.classHint')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
