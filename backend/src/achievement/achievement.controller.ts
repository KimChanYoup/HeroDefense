import { Controller, Get, Post, Body, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AchievementService } from './achievement.service';
import { AuthenticatedRequest } from '../types/auth.types';

const VALID_DIFFICULTIES = new Set(['easy', 'normal', 'hard']);
const VALID_MODES        = new Set(['solo', 'party', 'offense', 'tutorial']);
const MAX_WAVE           = 1000;
const MAX_SCORE          = 100_000_000;

@Controller('achievements')
@UseGuards(JwtAuthGuard)
export class AchievementController {
  constructor(private achievementService: AchievementService) {}

  @Get()
  getAll(@Request() req: AuthenticatedRequest) {
    return this.achievementService.getAll(req.user.id);
  }

  @Post('check')
  checkAndUnlock(
    @Request() req: AuthenticatedRequest,
    @Body()
    body: {
      wave: number;
      score: number;
      cleared: boolean;
      mode?: string;
      difficulty?: string;
      ownedHeroCount?: number;
      partySize?: number;
      stageId?: number;
      tutorial?: boolean;
      elementCounts?: Record<string, number>;
      raceCounts?: Record<string, number>;
      roleCounts?: Record<string, number>;
    },
  ) {
    const wave  = Math.floor(Number(body.wave)  || 0);
    const score = Math.floor(Number(body.score) || 0);

    if (wave < 0 || wave > MAX_WAVE)   throw new BadRequestException('Invalid wave value');
    if (score < 0 || score > MAX_SCORE) throw new BadRequestException('Invalid score value');
    if (body.difficulty && !VALID_DIFFICULTIES.has(body.difficulty)) throw new BadRequestException('Invalid difficulty');
    if (body.mode && !VALID_MODES.has(body.mode)) throw new BadRequestException('Invalid mode');

    return this.achievementService.checkAndUnlock(req.user.id, {
      wave,
      score,
      cleared: !!body.cleared,
      mode: body.mode || 'solo',
      difficulty: body.difficulty,
      ownedHeroCount: body.ownedHeroCount !== undefined ? Math.max(0, Math.floor(Number(body.ownedHeroCount))) : undefined,
      partySize:      body.partySize      !== undefined ? Math.max(1, Math.min(10, Math.floor(Number(body.partySize)))) : undefined,
      stageId:        body.stageId        !== undefined ? Math.max(1, Math.floor(Number(body.stageId))) : undefined,
      tutorial:       !!body.tutorial,
      elementCounts:  body.elementCounts,
      raceCounts:     body.raceCounts,
      roleCounts:     body.roleCounts,
    });
  }
}
