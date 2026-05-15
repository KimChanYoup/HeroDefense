import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { FriendModule } from './friend/friend.module';
import { ShopModule } from './shop/shop.module';
import { AchievementModule } from './achievement/achievement.module';
import { TournamentModule } from './tournament/tournament.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000,  limit: 20  }, // 1초에 20회
      { name: 'long',  ttl: 60000, limit: 200 }, // 1분에 200회
    ]),
    PrismaModule,
    AuthModule,
    UserModule,
    GameModule,
    FriendModule,
    ShopModule,
    AchievementModule,
    TournamentModule,
    LeaderboardModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
