import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const GuidePage: React.FC = () => {
  const { t } = useLanguage();

  const roleIcons = {
    tank: "🛡️",
    melee_dps: "⚔️",
    ranged_dps: "🏹",
    healer: "💖",
    cc: "🌀",
    mechanic: "⚙️",
  };

  const roles = [
    { key: 'tank', icon: roleIcons.tank },
    { key: 'melee_dps', icon: roleIcons.melee_dps },
    { key: 'ranged_dps', icon: roleIcons.ranged_dps },
    { key: 'healer', icon: roleIcons.healer },
    { key: 'cc', icon: roleIcons.cc },
    { key: 'mechanic', icon: roleIcons.mechanic },
  ] as const;

  const guide = t?.guide as any;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">{guide?.title || 'Hero Guidebook'}</h1>
        <p className="text-gray-400 text-lg">{guide?.subtitle || 'Learn about roles and core game mechanics.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {roles.map(({ key, icon }) => {
          const roleData = guide?.roles?.[key] || {};
          const mechanics: string[] = roleData.mechanics || [];
          return (
            <div
              key={key}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-slate-500 transition-colors shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-slate-900/80 w-14 h-14 flex items-center justify-center rounded-lg ring-1 ring-slate-700 shadow-inner text-3xl">
                  {icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{roleData.title || key}</h2>
                  <p className="text-gray-400 leading-relaxed mt-1 text-sm">
                    {roleData.desc || ''}
                  </p>
                </div>
              </div>

              {mechanics.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {guide?.coreMechanics || 'Core Mechanics'}
                  </h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {mechanics.map((mech: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{mech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-16 bg-blue-900/20 rounded-2xl border border-blue-800/50 p-8 text-center">
        <h2 className="text-2xl font-bold text-blue-300 mb-4">
          {guide?.strategyTip || 'Basic Strategy'}
        </h2>
        <p className="text-blue-100/70 max-w-2xl mx-auto">
          {guide?.strategyDesc || ''}
        </p>
      </div>
    </div>
  );
};

export default GuidePage;
