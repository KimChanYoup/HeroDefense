import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

interface Player {
  id: number;
  username: string;
  socketId: string;
  isReady: boolean;
}

interface Lobby {
  id: string;
  name: string;
  hostId: number;
  players: Player[];
  maxPlayers: number;
  mode: 'party' | 'raid_3';
  status: 'waiting' | 'ready' | 'playing';
  createdAt: Date;
}

interface ChatMessage {
  sender: string;
  content: string;
  timestamp: number;
}

interface ActiveGame {
  lobbyId: string;
  hostSocketId: string;
  playerSocketIds: string[];
  startedAt: Date;
}

@WebSocketGateway({
  cors: {
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
      if (
        !origin ||
        /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
        /^https?:\/\/(10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+|192\.168\.\d+\.\d+)(:\d+)?$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  },
  namespace: '/ws',
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private lobbies: Map<string, Lobby> = new Map();
  private playerSockets: Map<string, { userId: number; username: string; lobbyId: string | null }> = new Map();
  private lobbyMessages: Map<string, ChatMessage[]> = new Map();
  private activeGames: Map<string, ActiveGame> = new Map();
  // lobbyId → Map<userId, heroList> : 각 플레이어의 영웅 데이터 임시 저장
  private heroSubmissions: Map<string, Map<number, any[]>> = new Map();

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private leaderboardService: LeaderboardService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token || client.handshake.query?.token;
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token as string);
      const userId: number = payload.sub;

      // 재연결 시 기존 게임 로비 자동 복구 (소켓 끊김 후 재연결 케이스)
      let rejoiningLobbyId: string | null = null;
      for (const [lobbyId, lobby] of this.lobbies.entries()) {
        const player = lobby.players.find(p => p.id === userId);
        if (player && (lobby.status === 'playing' || lobby.status === 'ready')) {
          player.socketId = client.id;
          client.join(lobbyId);
          rejoiningLobbyId = lobbyId;
          console.log(`[handleConnection] 🔄 재연결 복구: userId=${userId} → lobby=${lobbyId}`);

          // activeGames 누락 시 재생성
          if (!this.activeGames.has(lobbyId)) {
            this.activeGames.set(lobbyId, {
              lobbyId,
              hostSocketId: lobby.players.find(p => p.id === lobby.hostId)?.socketId ?? client.id,
              playerSocketIds: lobby.players.map(p => p.socketId),
              startedAt: new Date(),
            });
            console.log(`[handleConnection] 🔧 activeGames 재생성: ${lobbyId}`);
          }
          break;
        }
      }

      const dbUser = await this.userService.getProfile(userId);
      this.playerSockets.set(client.id, {
        userId,
        username: dbUser.username,
        lobbyId: rejoiningLobbyId,
      });

      await this.userService.setOnlineStatus(userId, true);
      client.emit('connected', { message: 'Connected to game server' });
      this.broadcastLobbyList();
    } catch {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    const playerInfo = this.playerSockets.get(client.id);
    if (playerInfo) {
      if (playerInfo.lobbyId) {
        this.removePlayerFromLobby(client, playerInfo.lobbyId);
      }
      await this.userService.setOnlineStatus(playerInfo.userId, false).catch(() => {});
    }
    this.playerSockets.delete(client.id);
  }

  // ========================
  // Lobby Management
  // ========================

  @SubscribeMessage('lobby:create')
  handleCreateLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { name: string; mode: 'party' | 'raid_3'; username: string },
  ) {
    const playerInfo = this.playerSockets.get(client.id);
    if (!playerInfo) return;

    const lobbyId = `lobby_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const maxPlayers = data.mode === 'party' ? 2 : 3;

    const lobby: Lobby = {
      id: lobbyId,
      name: data.name,
      hostId: playerInfo.userId,
      players: [{
        id: playerInfo.userId,
        username: playerInfo.username,
        socketId: client.id,
        isReady: false,
      }],
      maxPlayers,
      mode: data.mode,
      status: 'waiting',
      createdAt: new Date(),
    };

    this.lobbies.set(lobbyId, lobby);
    this.lobbyMessages.set(lobbyId, []);
    playerInfo.lobbyId = lobbyId;

    client.join(lobbyId);
    client.emit('lobby:joined', this.sanitizeLobby(lobby));
    this.broadcastLobbyList();
  }

  @SubscribeMessage('lobby:join')
  handleJoinLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { lobbyId: string; username: string },
  ) {
    const playerInfo = this.playerSockets.get(client.id);
    if (!playerInfo) return;

    const lobby = this.lobbies.get(data.lobbyId);
    if (!lobby) {
      client.emit('error', { message: 'Lobby not found' });
      return;
    }

    // 이미 로비에 있는 유저의 재접속 처리 (가장 중요)
    const existingPlayer = lobby.players.find(p => p.id === playerInfo.userId);
    if (existingPlayer) {
      console.log(`[lobby:join] 🔄 재접속 확인: ${playerInfo.username} (UserId: ${playerInfo.userId})`);
      existingPlayer.socketId = client.id;
      existingPlayer.username = playerInfo.username;
      client.join(data.lobbyId);
      playerInfo.lobbyId = data.lobbyId;
      
      client.emit('lobby:joined', this.sanitizeLobby(lobby));
      this.server.to(data.lobbyId).emit('lobby:updated', this.sanitizeLobby(lobby));
      
      // 채팅 히스토리 전송
      const messages = this.lobbyMessages.get(data.lobbyId) || [];
      client.emit('chat:history', messages);
      return;
    }

    // 신규 입장 시 검증 — playing 중에는 새 플레이어 입장 불가
    if (lobby.status !== 'waiting') {
      // playing 중이더라도 이전에 이 로비에 있던 플레이어(userId 기준)라면 재진입 허용
      const wasPlayer = Array.from(this.playerSockets.values())
        .some(ps => ps.userId === playerInfo.userId && ps.lobbyId === null);
      if (!wasPlayer) {
        client.emit('error', { message: 'Game already in progress' });
        return;
      }
      // 이전 플레이어 재진입: 배열에 추가하고 방 참가
      lobby.players.push({
        id: playerInfo.userId,
        username: playerInfo.username,
        socketId: client.id,
        isReady: true, // playing 중 재진입은 ready 처리
      });
      playerInfo.lobbyId = data.lobbyId;
      client.join(data.lobbyId);
      client.emit('lobby:joined', this.sanitizeLobby(lobby));
      this.server.to(data.lobbyId).emit('lobby:updated', this.sanitizeLobby(lobby));
      console.log(`[lobby:join] 🔄 게임 중 재진입 허용: ${playerInfo.username} → ${data.lobbyId}`);
      return;
    }
    if (lobby.players.length >= lobby.maxPlayers) {
      client.emit('error', { message: 'Lobby is full' });
      return;
    }

    // 신규 입장 처리
    lobby.players.push({
      id: playerInfo.userId,
      username: playerInfo.username,
      socketId: client.id,
      isReady: false,
    });
    playerInfo.lobbyId = data.lobbyId;

    client.join(data.lobbyId);
    client.emit('lobby:joined', this.sanitizeLobby(lobby));
    this.server.to(data.lobbyId).emit('lobby:updated', this.sanitizeLobby(lobby));

    // Send existing chat history
    const messages = this.lobbyMessages.get(data.lobbyId) || [];
    client.emit('chat:history', messages);

    // Announce join
    this.addChatMessage(data.lobbyId, {
      sender: 'System',
      content: `${data.username} joined the lobby`,
      timestamp: Date.now(),
    });

    this.broadcastLobbyList();
  }

  @SubscribeMessage('lobby:leave')
  handleLeaveLobby(@ConnectedSocket() client: Socket) {
    const playerInfo = this.playerSockets.get(client.id);
    if (!playerInfo?.lobbyId) return;
    this.removePlayerFromLobby(client, playerInfo.lobbyId);
    this.broadcastLobbyList();
  }

  @SubscribeMessage('lobby:ready')
  handleToggleReady(@ConnectedSocket() client: Socket) {
    const playerInfo = this.playerSockets.get(client.id);
    if (!playerInfo?.lobbyId) return;

    const lobby = this.lobbies.get(playerInfo.lobbyId);
    if (!lobby) return;

    const player = lobby.players.find(p => p.socketId === client.id);
    if (!player) return;

    player.isReady = !player.isReady;

    // Check if all players are ready
    const allReady = lobby.players.length >= 2 && lobby.players.every(p => p.isReady);
    if (allReady) {
      lobby.status = 'ready';
    } else {
      lobby.status = 'waiting';
    }

    this.server.to(playerInfo.lobbyId).emit('lobby:updated', this.sanitizeLobby(lobby));
    this.broadcastLobbyList();
  }

  @SubscribeMessage('lobby:start')
  handleStartGame(@ConnectedSocket() client: Socket) {
    const playerInfo = this.playerSockets.get(client.id);
    if (!playerInfo?.lobbyId) return;

    const lobby = this.lobbies.get(playerInfo.lobbyId);
    if (!lobby) return;

    // Only host can start
    if (lobby.hostId !== playerInfo.userId) {
      client.emit('error', { message: 'Only the host can start the game' });
      return;
    }

    // Need at least 2 players and all ready
    if (lobby.players.length < 2) {
      client.emit('error', { message: 'Need at least 2 players' });
      return;
    }

    if (!lobby.players.every(p => p.isReady)) {
      client.emit('error', { message: 'Not all players are ready' });
      return;
    }

    lobby.status = 'playing';

    // Create active game tracking
    const activeGame: ActiveGame = {
      lobbyId: lobby.id,
      hostSocketId: client.id,
      playerSocketIds: lobby.players.map(p => p.socketId),
      startedAt: new Date(),
    };
    this.activeGames.set(lobby.id, activeGame);

    // 영웅 데이터 수집 Map 초기화
    this.heroSubmissions.set(lobby.id, new Map());
    console.log(`[lobby:start] 🚀 게임 시작! lobbyId=${lobby.id}, players=${lobby.players.length}명`);
    lobby.players.forEach(p => {
      console.log(`  - Player: ${p.username} (ID: ${p.id}, Socket: ${p.socketId})`);
    });

    this.server.to(playerInfo.lobbyId).emit('game:start', {
      lobbyId: lobby.id,
      hostId: playerInfo.userId,
      players: lobby.players.map(p => ({ id: p.id, username: p.username })),
      mode: lobby.mode,
    });
    this.broadcastLobbyList();
  }

  // ========================
  // Hero Data Aggregation (Multiplayer)
  // ========================

  @SubscribeMessage('game:heroData')
  async handleHeroData(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { lobbyId: string; userId: number; heroes: any[] },
  ) {
    const playerInfo = this.playerSockets.get(client.id);
    const lobbyId = playerInfo?.lobbyId || data.lobbyId;
    const userId = playerInfo?.userId ?? data.userId;

    console.log(`[game:heroData] 📥 수신: socketId=${client.id}, userId=${userId}, lobbyId=${lobbyId}, heroes=${data.heroes?.length}`);

    const lobby = this.lobbies.get(lobbyId);
    if (!lobby) {
      console.log(`[game:heroData] ❌ 오류: lobbies에 lobbyId=${lobbyId} 없음. 등록된 키:`, [...this.lobbies.keys()]);
      return;
    }

    // 영웅 데이터 수집 Map이 없으면 생성 (방지책)
    if (!this.heroSubmissions.has(lobbyId)) {
      console.log(`[game:heroData] ⚠️ heroSubmissions에 lobbyId=${lobbyId} 없음 - 새로 생성`);
      this.heroSubmissions.set(lobbyId, new Map());
    }
    const submissions = this.heroSubmissions.get(lobbyId)!;

    // 플레이어 정보 업데이트 (소켓 재연결 대응)
    let player = lobby.players.find(p => p.id === userId);
    if (!player) {
      // playing 중 재연결로 players 배열에 없을 수 있음 → 자동 재추가
      const dbUser = await this.userService.getProfile(userId).catch(() => null);
      const username = dbUser?.username ?? playerInfo?.username ?? String(userId);
      console.log(`[game:heroData] 🔄 플레이어 재추가: userId=${userId} (${username})`);
      player = { id: userId, username, socketId: client.id, isReady: true };
      lobby.players.push(player);
      client.join(lobbyId);
      playerInfo && (playerInfo.lobbyId = lobbyId);
    }

    if (player.socketId !== client.id) {
      console.log(`[game:heroData] 🔄 소켓 갱신: ${player.username} (${player.socketId} -> ${client.id})`);
      player.socketId = client.id;
      client.join(lobbyId); // 룸에 다시 참가 보장
    }

    submissions.set(userId, data.heroes);
    console.log(`[game:heroData] ✅ 제출 저장 (${player.username}): submissions=${submissions.size}/${lobby.players.length}`);

    // 제출 현황 브로드캐스트
    this.server.to(lobbyId).emit('game:heroSubmitStatus', {
      submitted: submissions.size,
      total: lobby.players.length,
    });

    // 모든 플레이어 제출 완료 시
    if (submissions.size >= lobby.players.length) {
      const allHeroes: any[] = [];
      for (const heroes of submissions.values()) {
        allHeroes.push(...heroes);
      }

      const payload = { heroes: allHeroes, playerCount: lobby.players.length };
      console.log(`[game:heroData] 🎊 모든 제출 완료! 룸(${lobbyId})에 game:allHeroData 전송. heroes=${allHeroes.length}`);

      // 1. 룸 전체 브로드캐스트
      this.server.to(lobbyId).emit('game:allHeroData', payload);

      // 2. 호스트에게 직접 전송 (이중 보장 - commit 17 방식)
      const hostPlayer = lobby.players.find(p => p.id === lobby.hostId);
      if (hostPlayer && hostPlayer.socketId !== client.id) {
        console.log(`[game:heroData] 📡 호스트(${hostPlayer.username})에게 직접 추가 전송: ${hostPlayer.socketId}`);
        this.server.to(hostPlayer.socketId).emit('game:allHeroData', payload);
      }

      // 수집 완료 후 정리
      this.heroSubmissions.delete(lobbyId);
    }
  }

  // ========================
  // Game State Sync
  // ========================

  @SubscribeMessage('game:state')
  handleGameState(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { lobbyId: string; state: any; damageNumbers: any[] },
  ) {
    const game = this.activeGames.get(data.lobbyId);
    if (!game) return;

    // 호스트 검증: userId 기반 (소켓 재연결 시에도 안전)
    const playerInfo = this.playerSockets.get(client.id);
    const lobby = this.lobbies.get(data.lobbyId);
    if (!playerInfo || !lobby || playerInfo.userId !== lobby.hostId) return;

    // 호스트 소켓 ID 갱신 (재연결 대응)
    game.hostSocketId = client.id;

    // 룸 브로드캐스트로 변경: player.socketId 불일치 시에도 룸 내 모든 게스트에게 전달
    // (호스트는 game:state 리스너 없음 → 수신해도 무시됨)
    this.server.to(data.lobbyId).emit('game:state', {
      state: data.state,
      damageNumbers: data.damageNumbers,
    });
  }

  @SubscribeMessage('game:action')
  handleGameAction(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { lobbyId: string; action: any },
  ) {
    const game = this.activeGames.get(data.lobbyId);
    if (!game) return;

    // lobby.players에서 호스트의 최신 소켓 ID 조회 (재연결 대응)
    const lobby = this.lobbies.get(data.lobbyId);
    if (!lobby) return;
    const hostPlayer = lobby.players.find(p => p.id === lobby.hostId);
    if (!hostPlayer) return;

    this.server.to(hostPlayer.socketId).emit('game:action', {
      playerId: this.playerSockets.get(client.id)?.userId,
      action: data.action,
    });
  }

  @SubscribeMessage('game:end')
  async handleGameEnd(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: {
      lobbyId: string;
      result: { wave: number; score: number; cleared: boolean; goldEarned: number };
    },
  ) {
    const game = this.activeGames.get(data.lobbyId);
    const playerInfoForEnd = this.playerSockets.get(client.id);
    const lobbyForEnd = this.lobbies.get(data.lobbyId);
    if (!game || !playerInfoForEnd || !lobbyForEnd || playerInfoForEnd.userId !== lobbyForEnd.hostId) return;

    const lobby = this.lobbies.get(data.lobbyId);
    const goldEarned = Math.floor(data.result.goldEarned ?? 0);

    // ── 파티 골드 분배: 로비에 남아있는 플레이어 전원에게 지급 ──
    if (lobby && goldEarned > 0) {
      const playerIds = lobby.players.map(p => p.id);
      // 분배 실패해도 게임 종료 처리는 계속 진행
      await Promise.allSettled(
        playerIds.map(userId => this.userService.updateGold(userId, goldEarned)),
      );
      // 각 클라이언트에 골드 수령 알림 (토스트 표시용)
      this.server.to(data.lobbyId).emit('game:gold_awarded', { amount: goldEarned });
    }

    // ── 리더보드 통계 기록: 모든 파티원에게 동일 결과 저장 ──
    if (lobby) {
      await Promise.allSettled(
        lobby.players.map(p =>
          this.leaderboardService.recordGame(p.id, {
            wave: data.result.wave,
            score: data.result.score,
            cleared: data.result.cleared,
            goldEarned,
          }),
        ),
      );
    }

    // 게임 종료 결과 브로드캐스트
    this.server.to(data.lobbyId).emit('game:ended', data.result);

    // 리소스 정리
    this.activeGames.delete(data.lobbyId);
    this.heroSubmissions.delete(data.lobbyId);

    // 로비 상태 리셋
    if (lobby) {
      lobby.status = 'waiting';
      lobby.players.forEach(p => p.isReady = false);
      this.server.to(data.lobbyId).emit('lobby:updated', this.sanitizeLobby(lobby));
    }
    this.broadcastLobbyList();
  }

  // ========================
  // Game Reset (Multiplayer)
  // ========================

  @SubscribeMessage('game:reset')
  handleGameReset(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { lobbyId: string },
  ) {
    const playerInfo = this.playerSockets.get(client.id);
    const lobby = this.lobbies.get(data.lobbyId);
    if (!lobby || !playerInfo) return;

    // 호스트만 초기화 가능
    if (lobby.hostId !== playerInfo.userId) return;

    // 진행 중인 게임 정리
    this.activeGames.delete(data.lobbyId);
    this.heroSubmissions.delete(data.lobbyId);

    // 로비 상태 초기화
    lobby.status = 'waiting';
    lobby.players.forEach(p => (p.isReady = false));

    // 모든 플레이어에게 리셋 알림
    this.server.to(data.lobbyId).emit('game:reset', {});
    this.server.to(data.lobbyId).emit('lobby:updated', this.sanitizeLobby(lobby));
    this.broadcastLobbyList();
  }

  // ========================
  // Chat
  // ========================

  @SubscribeMessage('chat:send')
  handleChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { content: string },
  ) {
    const playerInfo = this.playerSockets.get(client.id);
    if (!playerInfo?.lobbyId) return;

    const content = data.content?.trim();
    if (!content || content.length > 500) return;

    this.addChatMessage(playerInfo.lobbyId, {
      sender: playerInfo.username,
      content,
      timestamp: Date.now(),
    });
  }

  // ========================
  // Lobby List
  // ========================

  @SubscribeMessage('lobby:list')
  handleListLobbies(@ConnectedSocket() client: Socket) {
    client.emit('lobby:list', this.getPublicLobbyList());
  }

  // ========================
  // Helpers
  // ========================

  private removePlayerFromLobby(client: Socket, lobbyId: string) {
    const lobby = this.lobbies.get(lobbyId);
    if (!lobby) return;

    const playerInfo = this.playerSockets.get(client.id);
    const leaving = lobby.players.find(p => p.socketId === client.id);

    // 게임 진행 중(playing)이면 플레이어를 배열에서 완전히 제거하지 않고
    // 소켓만 방에서 나가게 처리 — 재연결 시 game:heroData 재제출 가능하도록 보존
    const isPlaying = lobby.status === 'playing';
    if (!isPlaying) {
      lobby.players = lobby.players.filter(p => p.socketId !== client.id);
    }
    client.leave(lobbyId);

    if (playerInfo) {
      playerInfo.lobbyId = null;
    }

    const wasInGame = lobby.status === 'playing' || lobby.status === 'ready';

    const remainingPlayers = isPlaying
      ? lobby.players  // playing 중엔 배열 유지
      : lobby.players;

    if (remainingPlayers.length === 0 || (!isPlaying && lobby.players.length === 0)) {
      this.lobbies.delete(lobbyId);
      this.lobbyMessages.delete(lobbyId);
      this.activeGames.delete(lobbyId);
      this.heroSubmissions.delete(lobbyId);
    } else if (!isPlaying) {
      // waiting/ready 상태에서만 로비 상태 리셋
      if (lobby.hostId === leaving?.id) {
        lobby.hostId = lobby.players[0].id;
      }
      lobby.status = 'waiting';
      this.server.to(lobbyId).emit('lobby:updated', this.sanitizeLobby(lobby));

      if (wasInGame && leaving) {
        this.server.to(lobbyId).emit('game:playerLeft', {
          userId: leaving.id,
          username: leaving.username,
        });
        this.activeGames.delete(lobbyId);
        this.heroSubmissions.delete(lobbyId);
      }

      if (leaving) {
        this.addChatMessage(lobbyId, {
          sender: 'System',
          content: `${leaving.username} left the lobby`,
          timestamp: Date.now(),
        });
      }
    }
    // playing 중 disconnect는 재연결을 기대 — 강제 종료하지 않음

    client.emit('lobby:left');
  }

  private addChatMessage(lobbyId: string, message: ChatMessage) {
    const messages = this.lobbyMessages.get(lobbyId);
    if (messages) {
      messages.push(message);
      // Keep last 100 messages
      if (messages.length > 100) messages.shift();
    }
    this.server.to(lobbyId).emit('chat:message', message);
  }

  private sanitizeLobby(lobby: Lobby) {
    return {
      id: lobby.id,
      name: lobby.name,
      hostId: lobby.hostId,
      players: lobby.players.map(p => ({
        id: p.id,
        username: p.username,
        isReady: p.isReady,
      })),
      maxPlayers: lobby.maxPlayers,
      mode: lobby.mode,
      status: lobby.status,
    };
  }

  private getPublicLobbyList() {
    return Array.from(this.lobbies.values())
      .filter(l => l.status === 'waiting')
      .map(l => this.sanitizeLobby(l));
  }

  private broadcastLobbyList() {
    this.server.emit('lobby:list', this.getPublicLobbyList());
  }
}
