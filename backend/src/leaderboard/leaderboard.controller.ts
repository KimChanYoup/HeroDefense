import { Controller, Get, Post, Body, Query, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { LeaderboardService, LeaderboardCategory } from './leaderboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../types/auth.types';

const MAX_WAVE      = 10_000;
const MAX_SCORE     = 100_000_000;
const MAX_GOLD      = 10_000_000;

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @UseGuards(JwtAuthGuard)
  @Post('record')
  async record(
    @Req() req: AuthenticatedRequest,
    @Body() body: { wave: number; score: number; cleared: boolean; goldEarned: number },
  ) {
    const wave      = Math.floor(Number(body.wave) || 0);
    const score     = Math.floor(Number(body.score) || 0);
    const goldEarned = Math.floor(Number(body.goldEarned) || 0);
    const cleared   = !!body.cleared;

    if (wave < 0 || wave > MAX_WAVE || score < 0 || score > MAX_SCORE || goldEarned < 0 || goldEarned > MAX_GOLD) {
      throw new BadRequestException('Invalid record values');
    }

    await this.leaderboardService.recordGame(req.user.id, { wave, score, cleared, goldEarned });
    return { ok: true };
  }

  @Get()
  async getLeaderboard(
    @Query('category') category: LeaderboardCategory = 'wave',
    @Query('limit') limit = '100',
  ) {
    const validCategories: LeaderboardCategory[] = ['wave', 'score', 'gold', 'clears'];
    const cat = validCategories.includes(category) ? category : 'wave';
    const lim = Math.min(Math.max(parseInt(limit) || 100, 1), 100);
    return this.leaderboardService.getLeaderboard(cat, lim);
  }
}
