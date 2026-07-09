import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TournamentService } from './tournament.service';
import { AuthenticatedRequest } from '../types/auth.types';
import { SubmitTournamentResultDto } from './dto/submit-tournament-result.dto';

@Controller('tournaments')
@UseGuards(JwtAuthGuard)
export class TournamentController {
  constructor(private tournamentService: TournamentService) {}

  @Get()
  list() {
    return this.tournamentService.list();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.tournamentService.getById(id);
  }

  @Post()
  create(
    @Request() req: AuthenticatedRequest,
    @Body() body: { name: string; maxPlayers?: 4 | 8 },
  ) {
    return this.tournamentService.create(
      body.name,
      req.user.id,
      req.user.username,
      body.maxPlayers || 4,
    );
  }

  @Post(':id/join')
  join(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.tournamentService.join(id, req.user.id, req.user.username);
  }

  @Post(':id/leave')
  leave(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.tournamentService.leave(id, req.user.id);
  }

  @Post(':id/start')
  start(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    return this.tournamentService.start(id, req.user.id);
  }

  @Post(':id/result')
  submitResult(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
    @Body() body: SubmitTournamentResultDto,
  ) {
    return this.tournamentService.submitResult(
      id,
      body.matchId,
      body.winnerId,
      body.player1Score,
      body.player2Score,
      req.user.id,
    );
  }
}
