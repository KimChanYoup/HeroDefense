import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../api/client';

interface BackupInfo {
  lastBackup: string | null;
  fileCount: number;
  retentionDays: number;
  schedule: string;
}

interface HealthData {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  services: { api: string; database: string; backup: string };
  backup: BackupInfo;
}

function StatusBadge({ value }: { value: string }) {
  const ok = value === 'ok';
  const warn = value === 'stale' || value === 'no_backups' || value === 'unknown';
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
        ok
          ? 'bg-green-900/60 text-green-300 border border-green-700'
          : warn
          ? 'bg-yellow-900/60 text-yellow-300 border border-yellow-700'
          : 'bg-red-900/60 text-red-300 border border-red-700'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${ok ? 'bg-green-400' : warn ? 'bg-yellow-400' : 'bg-red-400'} animate-pulse`} />
      {value.toUpperCase()}
    </span>
  );
}

export default function StatusPage() {
  const { t } = useLanguage();
  const st = (t as any).status;
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const fetchHealth = async () => {
    setLoading(true);
    try {
      const res = await api.get('/health');
      setHealth(res.data);
    } catch {
      setHealth({
        status: 'error',
        timestamp: new Date().toISOString(),
        services: { api: 'error', database: 'error', backup: 'unknown' },
        backup: { lastBackup: null, fileCount: 0, retentionDays: 7, schedule: 'daily at 02:00 UTC' },
      });
    } finally {
      setLoading(false);
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    fetchHealth();
    const id = setInterval(fetchHealth, 30000);
    return () => clearInterval(id);
  }, []);

  const overallOk = health?.status === 'ok';

  const formatBackupTime = (iso: string | null) => {
    if (!iso) return 'Never';
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Less than 1 hour ago';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago (${d.toLocaleDateString()})`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-yellow-400 mb-2">{st?.title ?? 'Server Status'}</h1>
      <p className="text-gray-400 text-sm mb-8">
        Hero Defense — ft_transcendence &nbsp;|&nbsp; {st?.subtitle ?? 'Auto-refresh: every 30 seconds'}
      </p>

      {/* Overall */}
      <div
        className={`rounded-xl border-2 p-6 mb-6 flex items-center justify-between ${
          loading
            ? 'border-gray-600 bg-gray-800'
            : overallOk
            ? 'border-green-600 bg-green-900/20'
            : 'border-red-600 bg-red-900/20'
        }`}
      >
        <div>
          <div className="text-lg font-bold text-white mb-1">{st?.overallStatus ?? 'Overall Status'}</div>
          <div className="text-sm text-gray-400">
            {st?.lastChecked ?? 'Last checked:'} {lastChecked.toLocaleTimeString()}
          </div>
        </div>
        {loading ? (
          <span className="text-gray-400 text-sm animate-pulse">{st?.checking ?? 'Checking...'}</span>
        ) : (
          <StatusBadge value={health?.status ?? 'error'} />
        )}
      </div>

      {/* Service details */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 divide-y divide-gray-700 mb-6">
        {[
          { name: st?.apiServer ?? 'API Server', key: 'api', desc: st?.apiDesc ?? 'NestJS REST API' },
          { name: st?.database ?? 'Database', key: 'database', desc: st?.dbDesc ?? 'PostgreSQL (Prisma ORM)' },
          { name: st?.backup ?? 'Auto Backup', key: 'backup', desc: st?.backupDesc ?? 'Daily pg_dump · 7-day retention' },
        ].map(svc => (
          <div key={svc.key} className="flex items-center justify-between px-5 py-4">
            <div>
              <div className="text-white font-medium">{svc.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{svc.desc}</div>
            </div>
            {loading ? (
              <span className="text-gray-500 text-xs">...</span>
            ) : (
              <StatusBadge value={health?.services[svc.key as keyof typeof health.services] ?? 'error'} />
            )}
          </div>
        ))}
      </div>

      {/* Backup detail card */}
      {health?.backup && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
            {st?.backupDetails ?? 'Backup Details'}
          </h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-gray-500 text-xs mb-0.5">{st?.lastBackup ?? 'Last Backup'}</div>
              <div className="text-white">{formatBackupTime(health.backup.lastBackup)}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs mb-0.5">{st?.backupCount ?? 'Stored Backups'}</div>
              <div className="text-white">{health.backup.fileCount} files</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs mb-0.5">{st?.backupSchedule ?? 'Schedule'}</div>
              <div className="text-white">{health.backup.schedule}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs mb-0.5">{st?.backupRetention ?? 'Retention'}</div>
              <div className="text-white">{health.backup.retentionDays} days</div>
            </div>
          </div>
        </div>
      )}

      {health?.timestamp && (
        <p className="text-center text-gray-600 text-xs mt-2">
          {st?.serverTime ?? 'Server response time:'} {new Date(health.timestamp).toLocaleString()}
        </p>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={fetchHealth}
          disabled={loading}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          {loading ? (st?.checking ?? 'Checking...') : (st?.refresh ?? 'Refresh')}
        </button>
      </div>
    </div>
  );
}
