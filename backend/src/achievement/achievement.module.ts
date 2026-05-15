import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [AchievementService],
  controllers: [AchievementController],
  exports: [AchievementService],
})
export class AchievementModule {}
