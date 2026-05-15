import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthenticatedRequest } from '../types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req: AuthenticatedRequest) {
    return this.authService.logout(req.user.id);
  }

  // sendBeacon은 Authorization 헤더 불가 → 토큰을 body로 받는 별도 엔드포인트
  @Post('logout-beacon')
  logoutBeacon(@Body() body: { token?: string }) {
    if (!body?.token) return;
    return this.authService.logoutByToken(body.token);
  }
}
