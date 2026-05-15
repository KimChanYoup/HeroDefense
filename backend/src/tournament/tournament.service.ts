import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface Tournament {
  id: string;
  name: string;
  hostId: number;
  hostUsername: string;
  maxPlayers: number;
  status: 'waiting' | 'in_progress' | 'completed';
  players: TournamentPlayer[];
  matches: TournamentMatch[];
  createdAt: Date;
}

export interface TournamentPlayer {
  userId: number;
  username: string;
  score: number;
  wins: number;
  losses: number;
}

export interface TournamentMatch {
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

@Injectable()
export class TournamentService {
  // In-memory tournament store (no DB needed for bonus module)
  private tournaments: Map<string, Tournament> = new Map();
  private nextId = 1;

  constructor(private prisma: PrismaService) {}

  create(name: string, userId: number, username: string, maxPlayers: 4 | 8): Tournament {
    if (maxPlayers !== 4 && maxPlayers !== 8) {
      throw new BadRequestException('maxPlayers must be 4 or 8');
    }
    const id = `T${this.nextId++}`;
    const tournament: Tournament = {
      id,
      name,
      hostId: userId,
      hostUsername: username,
      maxPlayers,
      status: 'waiting',
      players: [{ userId, username, score: 0, wins: 0, losses: 0 }],
      matches: [],
      createdAt: new Date(),
    };
    this.tournaments.set(id, tournament);
    return tournament;
  }

  list() {
    return Array.from(this.tournaments.values()).filter(t => t.status !== 'completed');
  }

  getById(id: string): Tournament {
    const t = this.tournaments.get(id);
    if (!t) throw new NotFoundException('Tournament not found');
    return t;
  }

  join(id: string, userId: number, username: string): Tournament {
    const t = this.getById(id);
    if (t.status !== 'waiting') throw new BadRequestException('Tournament already started');
    if (t.players.length >= t.maxPlayers) throw new BadRequestException('Tournament is full');
    if (t.players.find(p => p.userId === userId)) throw new BadRequestException('Already joined');

    t.players.push({ userId, username, score: 0, wins: 0, losses: 0 });
    return t;
  }

  leave(id: string, userId: number): Tournament {
    const t = this.getById(id);
    if (t.status !== 'waiting') throw new BadRequestException('Cannot leave started tournament');
    t.players = t.players.filter(p => p.userId !== userId);
    return t;
  }

  start(id: string, userId: number): Tournament {
    const t = this.getById(id);
    if (t.hostId !== userId) throw new BadRequestException('Only the host can start');
    if (t.status !== 'waiting') throw new BadRequestException('Tournament already started');
    if (t.players.length < 2) throw new BadRequestException('Need at least 2 players');

    t.status = 'in_progress';
    t.matches = this.generateBracket(t.players, 1);
    return t;
  }

  submitResult(id: string, matchId: string, winnerId: number, player1Score: number, player2Score: number, callerId: number): Tournament {
    const t = this.getById(id);

    // 제출자가 해당 토너먼트의 참가자인지 확인
    const isParticipant = t.players.some(p => p.userId === callerId);
    if (!isParticipant) throw new BadRequestException('Not a participant of this tournament');

    const match = t.matches.find(m => m.id === matchId);
    if (!match) throw new NotFoundException('Match not found');
    if (match.status === 'completed') throw new BadRequestException('Match already completed');

    // 제출자가 해당 경기의 당사자인지 확인
    if (match.player1Id !== callerId && match.player2Id !== callerId) {
      throw new BadRequestException('Not a player in this match');
    }

    match.winnerId = winnerId;
    match.player1Score = player1Score;
    match.player2Score = player2Score;
    match.status = 'completed';

    // Update player stats
    const winner = t.players.find(p => p.userId === winnerId);
    const loserId = match.player1Id === winnerId ? match.player2Id : match.player1Id;
    const loser = loserId ? t.players.find(p => p.userId === loserId) : null;

    if (winner) { winner.wins++; winner.score += Math.max(player1Score, player2Score); }
    if (loser) { loser.losses++; }

    // Check if round is complete and generate next round
    const currentRound = match.round;
    const roundMatches = t.matches.filter(m => m.round === currentRound);
    const allCompleted = roundMatches.every(m => m.status === 'completed');

    if (allCompleted) {
      const winners = roundMatches.map(m => {
        if (m.winnerId) return t.players.find(p => p.userId === m.winnerId) || null;
        return m.player1Id ? t.players.find(p => p.userId === m.player1Id) || null : null;
      }).filter(Boolean) as TournamentPlayer[];

      if (winners.length > 1) {
        const nextRoundMatches = this.generateBracket(winners, currentRound + 1);
        t.matches.push(...nextRoundMatches);
      } else {
        t.status = 'completed';
      }
    }

    return t;
  }

  private generateBracket(players: TournamentPlayer[], round: number): TournamentMatch[] {
    const matches: TournamentMatch[] = [];
    const shuffled = [...players].sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffled.length; i += 2) {
      const p1 = shuffled[i];
      const p2 = shuffled[i + 1] || null;

      matches.push({
        id: `M${round}-${i / 2 + 1}`,
        player1Id: p1.userId,
        player1Name: p1.username,
        player2Id: p2?.userId || null,
        player2Name: p2?.username || null,
        winnerId: p2 ? null : p1.userId, // Bye if no opponent
        player1Score: 0,
        player2Score: 0,
        status: p2 ? 'pending' : 'completed',
        round,
      });
    }

    return matches;
  }
}
