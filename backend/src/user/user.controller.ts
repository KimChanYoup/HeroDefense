import { Controller, Get, Put, Post, Delete, Body, UseGuards, Request, BadRequestException, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../types/auth.types';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.getProfile(req.user.id);
  }

  @Put('profile')
  updateProfile(@Request() req: AuthenticatedRequest, @Body() data: { username?: string; avatarUrl?: string }) {
    return this.userService.updateProfile(req.user.id, data);
  }

  /**
   * POST /api/user/gold
   * body: { delta: number }
   * delta 양수 → 골드 획득 (게임 세션 결과 저장)
   * delta 음수 → 골드 소모 (스킬 구매 등)
   */
  @Post('gold')
  updateGold(@Request() req: AuthenticatedRequest, @Body() body: { delta: number }) {
    const delta = Math.floor(body.delta);
    // 한 요청으로 획득 가능한 최대 골드 = 500,000 (게임 한 판 최대치)
    if (delta > 500_000) throw new BadRequestException('Gold delta exceeds maximum');
    return this.userService.updateGold(req.user.id, delta);
  }

  @Post('crystals')
  updateCrystals(@Request() req: AuthenticatedRequest, @Body() body: { delta: number }) {
    const delta = Math.floor(body.delta);
    if (delta > 100_000) throw new BadRequestException('Crystal delta exceeds maximum');
    return this.userService.updateCrystals(req.user.id, delta);
  }

  @Get('heroes')
  getHeroes(@Request() req) {
    return this.userService.getHeroes(req.user.id);
  }

  @Post('protagonist-save')
  updateProtagonistSave(@Request() req: AuthenticatedRequest, @Body() body: { saveData: unknown }) {
    if (JSON.stringify(body.saveData).length > 50_000) {
      throw new BadRequestException('Save data too large');
    }
    return this.userService.updateProtagonistSave(req.user.id, body.saveData);
  }

  @Post('hero-save')
  updateHeroSave(@Request() req: AuthenticatedRequest, @Body() body: { templateId: number; saveData: unknown }) {
    if (JSON.stringify(body.saveData).length > 50_000) {
      throw new BadRequestException('Save data too large');
    }
    return this.userService.updateHeroSave(req.user.id, body.templateId, body.saveData);
  }

  @Get('owned-heroes')
  getOwnedHeroes(@Request() req) {
    return this.userService.getOwnedHeroIds(req.user.id);
  }

  /** 마일스톤 보상 (주인공 영웅) — heroId는 서버가 결정 */
  @Post('claim-milestone-hero')
  claimMilestoneHero(@Request() req: AuthenticatedRequest, @Body() body: { milestoneType: string }) {
    if (typeof body.milestoneType !== 'string') throw new BadRequestException('Invalid request');
    return this.userService.claimMilestoneHero(req.user.id, body.milestoneType);
  }

  /** 오펜스 랜드 클리어 보상 — stageId로 heroId 서버 결정 */
  @Post('claim-land-reward')
  claimLandReward(@Request() req: AuthenticatedRequest, @Body() body: { stageId: number }) {
    const stageId = Math.floor(Number(body.stageId));
    if (!stageId || stageId < 1) throw new BadRequestException('Invalid stageId');
    return this.userService.claimLandReward(req.user.id, stageId);
  }

  /** 상점 전용 영웅 지급 — protagonist 영웅은 허용하지 않음 */
  @Post('grant-hero')
  grantHero(@Request() req: AuthenticatedRequest, @Body() body: { heroId: string }) {
    const { heroId } = body;
    if (typeof heroId !== 'string' || heroId.startsWith('protagonist')) {
      throw new BadRequestException('Invalid heroId');
    }
    return this.userService.grantHero(req.user.id, heroId);
  }

  @Get('tutorial-progress')
  getTutorialProgress(@Request() req) {
    return this.userService.getTutorialProgress(req.user.id);
  }

  @Post('tutorial-progress')
  setTutorialProgress(@Request() req: AuthenticatedRequest, @Body() body: { progress: string }) {
    if (typeof body.progress !== 'string' || body.progress.length > 2000) {
      throw new BadRequestException('Invalid progress value');
    }
    return this.userService.setTutorialProgress(req.user.id, body.progress);
  }

  @Post('set-online')
  setOnline(@Request() req) {
    return this.userService.setOnlineStatus(req.user.id, true);
  }

  @Get('offense-progress')
  getOffenseProgress(@Request() req) {
    return this.userService.getOffenseProgress(req.user.id);
  }

  @Post('offense-progress')
  saveOffenseProgress(@Request() req: AuthenticatedRequest, @Body() body: { progress: Record<string, { normal: boolean; elite: boolean }> }) {
    return this.userService.saveOffenseProgress(req.user.id, body.progress);
  }

  /** GDPR — 내 전체 데이터 JSON 내보내기 */
  @Get('data-export')
  async dataExport(@Request() req: AuthenticatedRequest, @Res() res: Response) {
    const data = await this.userService.exportUserData(req.user.id);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="herodefense-data-${req.user.id}.json"`);
    res.send(JSON.stringify(data, null, 2));
  }

  /** GDPR — 계정 삭제 */
  @Delete('account')
  deleteAccount(@Request() req) {
    return this.userService.deleteAccount(req.user.id);
  }
}
