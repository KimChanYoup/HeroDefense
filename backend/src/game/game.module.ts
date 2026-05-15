import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GameGateway } from './game.gateway';
import { UserModule } from '../user/user.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-change-me',
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
    LeaderboardModule,
  ],
  providers: [GameGateway],
})
export class GameModule {}
