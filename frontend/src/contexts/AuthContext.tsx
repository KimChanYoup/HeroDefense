import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/client';
import type { User, AuthResponse } from '../types';

interface AuthContextType {
  user: Pick<User, 'id' | 'email' | 'username'> | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      // F5 새로고침 후 beacon이 isOnline=false로 만든 것을 복구
      api.post('/user/set-online', {}, {
        headers: { Authorization: `Bearer ${savedToken}` },
      }).catch(() => {});
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const savedToken = localStorage.getItem('token');
      if (!savedToken) return;
      const apiBase = (import.meta.env.VITE_API_URL || '') + '/api/auth/logout-beacon';
      navigator.sendBeacon(apiBase, new Blob(
        [JSON.stringify({ token: savedToken })],
        { type: 'application/json' }
      ));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password });
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.access_token);
    setUser(data.user);
  };

  const register = async (email: string, username: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/register', { email, username, password });
    // 회원가입 시 이전 세션의 게임 데이터를 모두 삭제 (make fclean 후 재가입 시 오염 방지)
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.startsWith('hero_data_') ||
        key.startsWith('owned_heroes_') ||
        key.startsWith('protagonist_') ||
        key.startsWith('tutorial_done_') ||
        key.startsWith('wall_talents_') ||
        key.startsWith('defense_infinite_best_') ||
        key.startsWith('ai_infinite_best_') ||
        key.startsWith('raid_infinite_best_') ||
        key.startsWith('infinite_best_') ||
        key.startsWith('monster_kills_') ||
        key.startsWith('manghongu_')
      )) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.access_token);
    setUser(data.user);
  };

  const logout = async () => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      try {
        await api.post('/auth/logout', {}, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
      } catch {
        // 서버 오류여도 로컬 로그아웃 진행
      }
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
