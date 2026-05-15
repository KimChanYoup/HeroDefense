import { io, Socket } from 'socket.io-client';

// VITE_WS_URL이 없으면 빈 문자열 → 현재 origin으로 연결 (nginx 자동 우회)
const WS_URL = import.meta.env.VITE_WS_URL || '';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const token = localStorage.getItem('token');
    socket = io(`${WS_URL}/ws`, {
      auth: { token },
      transports: ['websocket'],
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket(): Socket {
  const s = getSocket();
  if (!s.connected) {
    // Update token before connecting
    const token = localStorage.getItem('token');
    s.auth = { token };
    s.connect();
  }
  return s;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
