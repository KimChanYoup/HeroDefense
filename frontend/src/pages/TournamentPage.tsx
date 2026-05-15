import { useEffect, useState, useCallback } from 'react';
import api from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface TournamentMatch {
  id: string;
  player1Id: number;
  player1Name: string;
  player2Id: number | null;
  player2Name: string | null;
  winnerId: number | null;
  player1Score: number;
  player2Score: number;
  status: 'pending' | 'in_progress' | 'completed';
  round: number;
}

interface TournamentPlayer {
  userId: number;
  username: string;
  score: number;
  wins: number;
  losses: number;
}

interface Tournament {
  id: string;
  name: string;
  hostId: number;
  hostUsername: string;
  maxPlayers: number;
  status: 'waiting' | 'in_progress' | 'completed';
  players: TournamentPlayer[];
  matches: TournamentMatch[];
  createdAt: string;
}

export default function TournamentPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selected, setSelected] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newName, setNewName] = useState('');
  const [newMax, setNewMax] = useState<4 | 8>(4);
  const [creating, setCreating] = useState(false);
  // Result submission
  const [resultMatch, setResultMatch] = useState<TournamentMatch | null>(null);
  const [p1Score, setP1Score] = useState(0);
  const [p2Score, setP2Score] = useState(0);

  const loadList = useCallback(async () => {
    try {
      const res = await api.get('/tournaments');
      setTournaments(res.data);
    } catch {
      setError(t.tournament.failedToLoad);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadList();
    const interval = setInterval(loadList, 5000);
    return () => clearInterval(interval);
  }, [loadList]);

  const refreshSelected = async (id: string) => {
    const res = await api.get(`/tournaments/${id}`);
    setSelected(res.data);
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await api.post('/tournaments', { name: newName.trim(), maxPlayers: newMax });
      setSelected(res.data);
      setNewName('');
      await loadList();
    } catch {
      setError(t.tournament.failedToCreate);
    } finally {
      setCreating(false);
    }
  };

  const handleJoin = async (id: string) => {
    try {
      const res = await api.post(`/tournaments/${id}/join`);
      setSelected(res.data);
      await loadList();
    } catch (e: any) {
      setError(e.response?.data?.message || t.tournament.failedToJoin);
    }
  };

  const handleLeave = async () => {
    if (!selected) return;
    try {
      await api.post(`/tournaments/${selected.id}/leave`);
      setSelected(null);
      await loadList();
    } catch (e: any) {
      setError(e.response?.data?.message || t.tournament.failedToLeave);
    }
  };

  const handleStart = async () => {
    if (!selected) return;
    try {
      const res = await api.post(`/tournaments/${selected.id}/start`);
      setSelected(res.data);
    } catch (e: any) {
      setError(e.response?.data?.message || t.tournament.failedToStart);
    }
  };

  const handleSubmitResult = async () => {
    if (!selected || !resultMatch) return;
    const winnerId = p1Score >= p2Score ? resultMatch.player1Id : (resultMatch.player2Id || resultMatch.player1Id);
    try {
      const res = await api.post(`/tournaments/${selected.id}/result`, {
        matchId: resultMatch.id,
        winnerId,
        player1Score: p1Score,
        player2Score: p2Score,
      });
      setSelected(res.data);
      setResultMatch(null);
    } catch (e: any) {
      setError(e.response?.data?.message || t.tournament.failedToSubmit);
    }
  };

  const isInTournament = (t_: Tournament) => user && t_.players.some(p => p.userId === user.id);
  const myMatch = selected ? selected.matches.find(m =>
    m.status === 'pending' && (m.player1Id === user?.id || m.player2Id === user?.id)
  ) : null;

  // Group matches by round
  const rounds = selected
    ? [...new Set(selected.matches.map(m => m.round))].sort((a, b) => a - b)
    : [];

  const statusLabel = (status: Tournament['status']) => {
    if (status === 'waiting') return t.tournament.waitingForPlayers;
    if (status === 'in_progress') return t.tournament.inProgress;
    return t.tournament.completed;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">{t.tournament.title}</h1>
      {error && (
        <div className="bg-red-900/20 border border-red-700 text-red-400 p-3 rounded mb-4 text-sm">
          {error}
          <button onClick={() => setError('')} className="ml-2 underline">{t.tournament.dismiss}</button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left: List + Create */}
        <div className="col-span-1 space-y-4">
          {/* Create */}
          <div className="card p-4">
            <h2 className="text-sm font-bold text-gray-300 mb-3">{t.tournament.createTournament}</h2>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder={t.tournament.namePlaceholder}
              className="input-field text-sm mb-2"
            />
            <div className="flex gap-2 mb-3">
              {([4, 8] as const).map(n => (
                <button
                  key={n}
                  onClick={() => setNewMax(n)}
                  className={`flex-1 py-1 rounded text-xs ${newMax === n ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-400'}`}
                >
                  {n} {t.tournament.players}
                </button>
              ))}
            </div>
            <button onClick={handleCreate} disabled={creating || !newName.trim()} className="btn-primary w-full text-sm">
              {creating ? t.tournament.creating : t.tournament.create}
            </button>
          </div>

          {/* List */}
          <div className="card p-4">
            <h2 className="text-sm font-bold text-gray-300 mb-3">{t.tournament.openTournaments}</h2>
            {loading && <p className="text-gray-500 text-xs">{t.common.loading}</p>}
            {tournaments.length === 0 && !loading && (
              <p className="text-gray-500 text-xs">{t.tournament.noOpenTournaments}</p>
            )}
            <div className="space-y-2">
              {tournaments.map(tour => (
                <div
                  key={tour.id}
                  onClick={() => refreshSelected(tour.id)}
                  className={`p-3 rounded cursor-pointer border text-sm ${
                    selected?.id === tour.id
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="font-medium text-white">{tour.name}</div>
                  <div className="text-xs text-gray-400">
                    {tour.players.length}/{tour.maxPlayers} {t.tournament.players} · {tour.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Selected tournament detail */}
        <div className="col-span-2">
          {!selected ? (
            <div className="card p-8 text-center text-gray-500">
              {t.tournament.selectOrCreate}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Header */}
              <div className="card p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{selected.name}</h2>
                  <p className="text-xs text-gray-400">{t.tournament.host} {selected.hostUsername} · {t.tournament.maxPlayers} {selected.maxPlayers} {t.tournament.players}</p>
                  <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${
                    selected.status === 'waiting' ? 'bg-blue-500/20 text-blue-400' :
                    selected.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {statusLabel(selected.status)}
                  </span>
                </div>
                <div className="flex gap-2">
                  {selected.status === 'waiting' && !isInTournament(selected) && (
                    <button onClick={() => handleJoin(selected.id)} className="btn-primary text-sm">
                      {t.tournament.join}
                    </button>
                  )}
                  {selected.status === 'waiting' && isInTournament(selected) && user?.id !== selected.hostId && (
                    <button onClick={handleLeave} className="btn-danger text-sm">
                      {t.tournament.leave}
                    </button>
                  )}
                  {selected.status === 'waiting' && user?.id === selected.hostId && selected.players.length >= 2 && (
                    <button onClick={handleStart} className="btn-primary text-sm">
                      {t.tournament.start}
                    </button>
                  )}
                </div>
              </div>

              {/* Players */}
              <div className="card p-4">
                <h3 className="text-sm font-bold text-gray-300 mb-2">
                  {t.tournament.players} ({selected.players.length}/{selected.maxPlayers})
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selected.players.map(p => (
                    <div key={p.userId} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className={p.userId === selected.hostId ? 'text-yellow-400' : 'text-white'}>
                        {p.username}
                        {p.userId === selected.hostId && ' ★'}
                      </span>
                      {selected.status !== 'waiting' && (
                        <span className="text-xs text-gray-400 ml-auto">
                          {p.wins}W {p.losses}L
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bracket */}
              {selected.matches.length > 0 && (
                <div className="card p-4">
                  <h3 className="text-sm font-bold text-gray-300 mb-3">{t.tournament.bracket}</h3>
                  {rounds.map(round => (
                    <div key={round} className="mb-4">
                      <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{t.tournament.round} {round}</div>
                      <div className="space-y-2">
                        {selected.matches.filter(m => m.round === round).map(match => (
                          <div
                            key={match.id}
                            className={`p-3 rounded border text-sm ${
                              match.status === 'completed' ? 'border-gray-700 bg-gray-800/50' :
                              match.status === 'pending' ? 'border-blue-700 bg-blue-900/10' :
                              'border-yellow-700 bg-yellow-900/10'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <div className={`flex items-center gap-2 ${match.winnerId === match.player1Id ? 'text-yellow-400 font-bold' : 'text-white'}`}>
                                  {match.player1Name}
                                  {match.status === 'completed' && <span className="text-gray-400">{match.player1Score}</span>}
                                </div>
                                <div className={`flex items-center gap-2 ${
                                  match.player2Id
                                    ? match.winnerId === match.player2Id ? 'text-yellow-400 font-bold' : 'text-white'
                                    : 'text-gray-500 italic'
                                }`}>
                                  {match.player2Name || 'BYE'}
                                  {match.status === 'completed' && match.player2Id && (
                                    <span className="text-gray-400">{match.player2Score}</span>
                                  )}
                                </div>
                              </div>

                              {match.status === 'completed' && (
                                <span className="text-xs text-green-400">{t.tournament.done}</span>
                              )}
                              {match.status === 'pending' && (user?.id === match.player1Id || user?.id === match.player2Id) && (
                                <button
                                  onClick={() => { setResultMatch(match); setP1Score(0); setP2Score(0); }}
                                  className="text-xs btn-primary"
                                >
                                  {t.tournament.submitResult}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* My match notification */}
              {myMatch && !resultMatch && (
                <div className="card p-4 border border-yellow-600 bg-yellow-900/10">
                  <h3 className="text-sm font-bold text-yellow-400 mb-1">{t.tournament.yourMatch}</h3>
                  <p className="text-sm text-gray-300">
                    {myMatch.player1Name} vs {myMatch.player2Name || 'BYE'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{t.tournament.playThenSubmit}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Result submission modal */}
      {resultMatch && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="card p-6 w-80">
            <h3 className="text-lg font-bold text-white mb-4">{t.tournament.submitResult}</h3>
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs text-gray-400">{resultMatch.player1Name} {t.tournament.score}</label>
                <input
                  type="number"
                  min={0}
                  value={p1Score}
                  onChange={e => setP1Score(Number(e.target.value))}
                  className="input-field text-sm mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">{resultMatch.player2Name} {t.tournament.score}</label>
                <input
                  type="number"
                  min={0}
                  value={p2Score}
                  onChange={e => setP2Score(Number(e.target.value))}
                  className="input-field text-sm mt-1"
                />
              </div>
              <p className="text-xs text-gray-400">
                {t.tournament.winner} <span className="text-yellow-400 font-bold">
                  {p1Score >= p2Score ? resultMatch.player1Name : resultMatch.player2Name}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleSubmitResult} className="btn-primary flex-1 text-sm">{t.tournament.submit}</button>
              <button onClick={() => setResultMatch(null)} className="btn-secondary flex-1 text-sm">{t.tournament.cancel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
