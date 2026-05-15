import { Controller, Get, Post, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ShopService } from './shop.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../types/auth.types';

@Controller('shop')
@UseGuards(JwtAuthGuard)
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('heroes')
  getAvailableHeroes(@Request() req: AuthenticatedRequest) {
    return this.shopService.getAvailableHeroes(req.user.id);
  }

  @Post('buy/:templateId')
  buyHero(@Request() req, @Param('templateId', ParseIntPipe) templateId: number) {
    return this.shopService.buyHero(req.user.id, templateId);
  }
}
