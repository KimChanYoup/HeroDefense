import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../api/client';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface FriendUser {
  friendshipId: number;
  id: number;
  username: string;
  avatarUrl: string | null;
  isOnline: boolean;
  level: number;
}

interface PendingRequest {
  friendshipId: number;
  id: number;
  username: string;
  avatarUrl: string | null;
  level: number;
  createdAt: string;
}

interface SearchResult {
  id: number;
  username: string;
  avatarUrl: string | null;
  isOnline: boolean;
  level: number;
}

interface DirectMessage {
  id: number;
  content: string;
  createdAt: string;
  senderId: number;
  receiverId: number;
}

export default function FriendsPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [friends, setFriends] = useState<FriendUser[]>([]);
  const [pending, setPending] = useState<PendingRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // DM chat state
  const [chatFriend, setChatFriend] = useState<FriendUser | null>(null);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ft = (t as any).friends;

  const fetchData = async () => {
    try {
      const [friendsRes, pendingRes] = await Promise.all([
        api.get('/friends'),
        api.get('/friends/pending'),
      ]);
      setFriends(friendsRes.data);
      setPending(pendingRes.data);
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const timer = setTimeout(async () => {
        try {
          const res = await api.get(`/friends/search?q=${encodeURIComponent(searchQuery)}`);
          setSearchResults(res.data);
        } catch {
          setSearchResults([]);
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const loadMessages = useCallback(async (friendId: number) => {
    try {
      const res = await api.get(`/friends/${friendId}/messages`);
      setMessages(res.data);
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    if (!chatFriend) {
      if (pollRef.current) clearInterval(pollRef.current);
      return;
    }
    loadMessages(chatFriend.id);
    pollRef.current = setInterval(() => loadMessages(chatFriend.id), 3000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [chatFriend, loadMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(''), 3000);
  };

  const openChat = (friend: FriendUser) => {
    setChatFriend(friend);
    setMessages([]);
    setChatInput('');
  };

  const closeChat = () => {
    setChatFriend(null);
    setMessages([]);
  };

  const sendDirectMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatFriend || !chatInput.trim() || sending) return;
    setSending(true);
    try {
      const res = await api.post(`/friends/${chatFriend.id}/messages`, { content: chatInput.trim() });
      setMessages(prev => [...prev, res.data]);
      setChatInput('');
    } catch {
      showError(ft?.failedToSend2 || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const sendRequest = async (username: string) => {
    try {
      await api.post('/friends/request', { username });
      showMessage((ft?.requestSent || '{username}님에게 친구 요청을 보냈습니다.').replace('{username}', username));
      setSearchQuery('');
      setSearchResults([]);
    } catch (err: any) {
      showError(err.response?.data?.message || ft?.failedToSend);
    }
  };

  const acceptRequest = async (friendshipId: number) => {
    try {
      await api.put(`/friends/accept/${friendshipId}`);
      showMessage(ft?.requestAccepted || '친구 요청을 수락했습니다.');
      fetchData();
    } catch (err: any) {
      showError(err.response?.data?.message || ft?.failedToAccept);
    }
  };

  const rejectRequest = async (friendshipId: number) => {
    try {
      await api.put(`/friends/reject/${friendshipId}`);
      showMessage(ft?.requestRejected || '친구 요청을 거절했습니다.');
      fetchData();
    } catch (err: any) {
      showError(err.response?.data?.message || ft?.failedToReject);
    }
  };

  const removeFriend = async (friendshipId: number, username: string) => {
    if (!confirm((ft?.removeConfirm || '{username}님을 친구 목록에서 삭제하시겠습니까?').replace('{username}', username))) return;
    try {
      await api.delete(`/friends/${friendshipId}`);
      showMessage((ft?.removed || '{username}님을 친구 목록에서 삭제했습니다.').replace('{username}', username));
      if (chatFriend?.friendshipId === friendshipId) closeChat();
      fetchData();
    } catch (err: any) {
      showError(err.response?.data?.message || ft?.failedToRemove);
    }
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="text-yellow-400 text-xl">{(t as any).common?.loading}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">{ft?.title}</h1>

      {message && (
        <div className="bg-green-900/50 border border-green-500 text-green-300 px-4 py-2 rounded mb-4 text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        {/* Left column: friends management */}
        <div className={`flex-1 min-w-0 ${chatFriend ? 'hidden md:block md:w-64 md:flex-none' : ''}`}>

          {/* Search Users */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-4">
            <h2 className="text-base font-bold text-white mb-3">{ft?.addFriend}</h2>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ft?.searchPlaceholder}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-yellow-500"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-gray-700 border border-gray-600 rounded mt-1 z-10 max-h-60 overflow-y-auto">
                  {searchResults.map(u => (
                    <div key={u.id} className="flex items-center justify-between px-3 py-2 hover:bg-gray-600">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${u.isOnline ? 'bg-green-400' : 'bg-gray-500'}`} />
                        <span className="text-white text-sm">{u.username}</span>
                        <span className="text-xs text-gray-400">Lv.{u.level}</span>
                      </div>
                      <button
                        onClick={() => sendRequest(u.username)}
                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                      >
                        {ft?.add}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pending Requests */}
          {pending.length > 0 && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-4">
              <h2 className="text-base font-bold text-white mb-3">
                {ft?.pendingRequests} <span className="text-yellow-400">({pending.length})</span>
              </h2>
              <div className="space-y-2">
                {pending.map(req => (
                  <div key={req.friendshipId} className="flex items-center justify-between bg-gray-700 rounded px-3 py-2">
                    <div>
                      <span className="text-white font-medium text-sm">{req.username}</span>
                      <span className="text-xs text-gray-400 ml-2">Lv.{req.level}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => acceptRequest(req.friendshipId)}
                        className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                      >
                        {ft?.accept}
                      </button>
                      <button
                        onClick={() => rejectRequest(req.friendshipId)}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                      >
                        {ft?.reject}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Friends List */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <h2 className="text-base font-bold text-white mb-3">
              {ft?.myFriends} <span className="text-gray-500">({friends.length})</span>
            </h2>
            {friends.length === 0 ? (
              <p className="text-gray-500 text-center py-8 text-sm">{ft?.noFriends}</p>
            ) : (
              <div className="space-y-2">
                {friends
                  .sort((a, b) => (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0))
                  .map(friend => (
                    <div
                      key={friend.friendshipId}
                      className={`flex items-center justify-between rounded px-3 py-2 cursor-pointer transition-colors ${
                        chatFriend?.id === friend.id
                          ? 'bg-yellow-900/40 border border-yellow-700'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      onClick={() => openChat(friend)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {friend.avatarUrl ? (
                            <img src={friend.avatarUrl} alt={friend.username} className="w-8 h-8 rounded-full object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold text-white">
                              {friend.username.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-gray-700 ${friend.isOnline ? 'bg-green-400' : 'bg-gray-500'}`} />
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{friend.username}</div>
                          <div className="text-xs text-gray-400">Lv.{friend.level}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => openChat(friend)}
                          className="text-xs bg-blue-700 hover:bg-blue-600 text-white px-2 py-1 rounded"
                        >
                          {ft?.message || 'DM'}
                        </button>
                        <button
                          onClick={() => removeFriend(friend.friendshipId, friend.username)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          {ft?.remove}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column: DM chat panel */}
        {chatFriend && (
          <div className="flex-1 flex flex-col bg-gray-800 border border-gray-700 rounded-xl overflow-hidden" style={{ height: 'calc(100vh - 12rem)', minHeight: '400px' }}>
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-750">
              <div className="flex items-center gap-3">
                {chatFriend.avatarUrl ? (
                  <img src={chatFriend.avatarUrl} alt={chatFriend.username} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold text-white">
                    {chatFriend.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="text-white font-semibold text-sm">{chatFriend.username}</div>
                  <div className={`text-xs ${chatFriend.isOnline ? 'text-green-400' : 'text-gray-500'}`}>
                    {chatFriend.isOnline ? ft?.online : ft?.offline}
                  </div>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="text-gray-400 hover:text-white text-xl leading-none"
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 text-sm text-center">{ft?.noMessages || 'No messages yet. Say hello!'}</p>
                </div>
              ) : (
                (() => {
                  let lastDate = '';
                  return messages.map(msg => {
                    const isMine = msg.senderId === user?.id;
                    const msgDate = formatDate(msg.createdAt);
                    const showDate = msgDate !== lastDate;
                    lastDate = msgDate;
                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div className="flex items-center gap-2 my-3">
                            <div className="flex-1 h-px bg-gray-700" />
                            <span className="text-xs text-gray-500">{msgDate}</span>
                            <div className="flex-1 h-px bg-gray-700" />
                          </div>
                        )}
                        <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                            isMine
                              ? 'bg-yellow-600 text-white rounded-br-sm'
                              : 'bg-gray-700 text-gray-100 rounded-bl-sm'
                          }`}>
                            <p className="break-words">{msg.content}</p>
                            <p className={`text-xs mt-1 ${isMine ? 'text-yellow-200/70' : 'text-gray-500'} text-right`}>
                              {formatTime(msg.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendDirectMessage} className="border-t border-gray-700 p-3 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={ft?.chatPlaceholder || 'Type a message...'}
                maxLength={500}
                className="flex-1 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-500"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || sending}
                className="bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {ft?.send || 'Send'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
