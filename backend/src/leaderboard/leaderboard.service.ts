import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type LeaderboardCategory = 'wave' | 'score' | 'gold' | 'clears';

export interface RecordGameDto {
  wave: number;
  score: number;
  cleared: boolean;
  goldEarned: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  avatarUrl: string | null;
  value: number;
}

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async recordGame(userId: number, dto: RecordGameDto): Promise<void> {
    const { wave, score, cleared, goldEarned } = dto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { bestWave: true, bestScore: true },
    });
    if (!user) return;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        bestWave: wave > user.bestWave ? wave : user.bestWave,
        bestScore: score > user.bestScore ? score : user.bestScore,
        totalClears: { increment: cleared ? 1 : 0 },
        totalGoldEarned: { increment: goldEarned > 0 ? goldEarned : 0 },
      },
    });
  }

  async getLeaderboard(category: LeaderboardCategory, limit = 100): Promise<LeaderboardEntry[]> {
    const orderByField: Record<LeaderboardCategory, string> = {
      wave: 'bestWave',
      score: 'bestScore',
      gold: 'totalGoldEarned',
      clears: 'totalClears',
    };
    const field = orderByField[category];

    const users = await this.prisma.user.findMany({
      orderBy: { [field]: 'desc' },
      take: limit,
      select: {
        id: true,
        username: true,
        avatarUrl: true,
        bestWave: true,
        bestScore: true,
        totalGoldEarned: true,
        totalClears: true,
      },
    });

    return users.map((u, i) => ({
      rank: i + 1,
      userId: u.id,
      username: u.username,
      avatarUrl: u.avatarUrl,
      value:
        category === 'wave'
          ? u.bestWave
          : category === 'score'
          ? u.bestScore
          : category === 'gold'
          ? u.totalGoldEarned
          : u.totalClears,
    }));
  }
}
