import { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { connectSocket } from '../api/socket';
import type { Socket } from 'socket.io-client';

interface LobbyPlayer {
  id: number;
  username: string;
  isReady: boolean;
}

interface Lobby {
  id: string;
  name: string;
  hostId: number;
  players: LobbyPlayer[];
  maxPlayers: number;
  mode: string;
  status: string;
}

interface ChatMsg {
  sender: string;
  content: string;
  timestamp: number;
}

export default function LobbyPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [lobbies, setLobbies] = useState<Lobby[]>([]);
  const [currentLobby, setCurrentLobby] = useState<Lobby | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [createName, setCreateName] = useState('');
  const [createMode, setCreateMode] = useState<'party' | 'raid_3'>('party');
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = connectSocket();
    setSocket(s);

    s.on('lobby:list', (data: Lobby[]) => setLobbies(data));
    s.on('lobby:joined', (data: Lobby) => {
      setCurrentLobby(data);
      setMessages([]);
    });
    s.on('lobby:updated', (data: Lobby) => setCurrentLobby(data));
    s.on('lobby:left', () => {
      setCurrentLobby(null);
      setMessages([]);
    });
    s.on('chat:message', (msg: ChatMsg) => {
      setMessages(prev => [...prev, msg]);
    });
    s.on('chat:history', (msgs: ChatMsg[]) => {
      setMessages(msgs);
    });
    s.on('game:start', (data: { lobbyId: string; hostId: number; players: { id: number; username: string }[]; mode: string }) => {
      const playersParam = encodeURIComponent(JSON.stringify(data.players));
      navigate(`/game?lobby=${data.lobbyId}&host=${data.hostId}&players=${playersParam}&mode=${data.mode}`);
    });
    s.on('error', (data: { message: string }) => {
      setError(data.message);
      setTimeout(() => setError(''), 3000);
    });

    s.emit('lobby:list');

    return () => {
      s.off('lobby:list');
      s.off('lobby:joined');
      s.off('lobby:updated');
      s.off('lobby:left');
      s.off('chat:message');
      s.off('chat:history');
      s.off('game:start');
      s.off('error');
    };
  }, [navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCreate = () => {
    if (!socket || !user || !createName.trim()) return;
    socket.emit('lobby:create', {
      name: createName.trim(),
      mode: createMode,
      username: user.username,
    });
    setShowCreate(false);
    setCreateName('');
  };

  const handleJoin = (lobbyId: string) => {
    if (!socket || !user) return;
    socket.emit('lobby:join', { lobbyId, username: user.username });
  };

  const handleLeave = () => {
    socket?.emit('lobby:leave');
  };

  const handleReady = () => {
    socket?.emit('lobby:ready');
  };

  const handleStart = () => {
    socket?.emit('lobby:start');
  };

  const handleChat = (e: FormEvent) => {
    e.preventDefault();
    if (!socket || !chatInput.trim()) return;
    socket.emit('chat:send', { content: chatInput.trim() });
    setChatInput('');
  };

  const isHost = currentLobby && user && currentLobby.hostId === user.id;
  const myPlayer = currentLobby?.players.find(p => p.id === user?.id);

  const modeLabel = (mode: string) => mode === 'party' ? t.lobby.party : t.lobby.raid;

  // In a lobby
  if (currentLobby) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-yellow-400">{currentLobby.name}</h1>
            <p className="text-gray-400 text-sm">
              {modeLabel(currentLobby.mode)} | {currentLobby.players.length}/{currentLobby.maxPlayers} {t.lobby.players}
            </p>
          </div>
          <button onClick={handleLeave} className="btn-danger text-sm">
            {t.lobby.leaveLobby}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Players */}
          <div className="card">
            <h2 className="text-lg font-bold text-white mb-3">{t.lobby.players}</h2>
            <div className="space-y-2">
              {currentLobby.players.map((p) => (
                <div key={p.id} className="flex items-center justify-between bg-gray-700 rounded px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{p.username}</span>
                    {p.id === currentLobby.hostId && (
                      <span className="text-xs bg-yellow-600 text-white px-1.5 py-0.5 rounded">{t.lobby.host}</span>
                    )}
                  </div>
                  <span className={`text-sm ${p.isReady ? 'text-green-400' : 'text-gray-500'}`}>
                    {p.isReady ? t.lobby.ready : t.lobby.notReady}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleReady}
                className={`flex-1 py-2 rounded text-sm font-semibold transition-colors ${
                  myPlayer?.isReady
                    ? 'bg-gray-600 hover:bg-gray-500 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {myPlayer?.isReady ? t.lobby.cancelReady : t.lobby.ready}
              </button>
              {isHost && (
                <button
                  onClick={handleStart}
                  disabled={!currentLobby.players.every(p => p.isReady) || currentLobby.players.length < 2}
                  className="flex-1 btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.lobby.startGame}
                </button>
              )}
            </div>
          </div>

          {/* Chat */}
          <div className="card flex flex-col" style={{ height: '350px' }}>
            <h2 className="text-lg font-bold text-white mb-3">{t.lobby.chat}</h2>
            <div className="flex-1 overflow-y-auto bg-gray-700 rounded p-3 mb-3 space-y-1">
              {messages.map((msg, i) => (
                <div key={i} className={`text-sm ${msg.sender === 'System' ? 'text-gray-500 italic' : ''}`}>
                  {msg.sender !== 'System' && (
                    <span className="text-yellow-400 font-medium">{msg.sender}: </span>
                  )}
                  <span className="text-gray-300">{msg.content}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleChat} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.lobby.typeMessage}
                maxLength={500}
                className="flex-1 input-field text-sm py-1.5"
              />
              <button type="submit" className="btn-primary text-sm px-4 py-1.5">
                {t.lobby.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Lobby list view
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">{t.lobby.title}</h1>
        <button onClick={() => setShowCreate(!showCreate)} className="btn-primary text-sm">
          {showCreate ? t.lobby.cancelCreate : t.lobby.createLobby}
        </button>
      </div>

      {/* Create lobby form */}
      {showCreate && (
        <div className="card mb-6">
          <h2 className="text-lg font-bold text-white mb-3">{t.lobby.createNewLobby}</h2>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">{t.lobby.lobbyName}</label>
              <input
                type="text"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder={t.lobby.lobbyNamePlaceholder}
                maxLength={30}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">{t.lobby.mode}</label>
              <select
                value={createMode}
                onChange={(e) => setCreateMode(e.target.value as 'party' | 'raid_3')}
                className="input-field text-sm"
              >
                <option value="party">{t.lobby.party}</option>
                <option value="raid_3">{t.lobby.raid}</option>
              </select>
            </div>
            <button
              onClick={handleCreate}
              disabled={!createName.trim()}
              className="btn-primary text-sm disabled:opacity-50"
            >
              {t.lobby.createLobby}
            </button>
          </div>
        </div>
      )}

      {/* Lobby list */}
      {lobbies.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 text-lg">{t.lobby.noLobbies}</p>
          <p className="text-gray-600 text-sm mt-1">{t.lobby.noLobbiesDesc}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lobbies.map((lobby) => (
            <div key={lobby.id} className="card flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white">{lobby.name}</h3>
                <p className="text-gray-400 text-sm">
                  {modeLabel(lobby.mode)} | {lobby.players.length}/{lobby.maxPlayers} {t.lobby.players}
                </p>
              </div>
              <button
                onClick={() => handleJoin(lobby.id)}
                disabled={lobby.players.length >= lobby.maxPlayers}
                className="btn-primary text-sm disabled:opacity-50"
              >
                {lobby.players.length >= lobby.maxPlayers ? t.lobby.full : t.lobby.join}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
