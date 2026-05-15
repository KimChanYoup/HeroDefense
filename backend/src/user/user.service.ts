import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// 마일스톤 타입 → 지급할 heroId (클라이언트가 heroId를 직접 지정하지 못하도록 서버에서 결정)
const MILESTONE_HERO_MAP: Record<string, string> = {
  protagonist_defense: 'protagonist_defense',
  protagonist_ai:      'protagonist_ai',
  protagonist_offense: 'protagonist_offense',
  protagonist_raid:    'protagonist_raid',
};

// 오펜스 랜드 최종 스테이지 ID → 보상 heroId
const LAND_CLEAR_HERO_MAP: Record<number, string> = {
  5:   'ssr_goblin_warchief',
  11:  'ssr_orc_blademaster',
  16:  'ssr_tauren_chieftain',
  22:  'ssr_darkelf_lord',
  29:  'ssr_fire_ash',
  36:  'ssr_ice_queen',
  44:  'ssr_death_knight',
  52:  'ssr_poison_mancer',
  61:  'ssr_merc_king',
  70:  'ssr_ele_scholar',
  80:  'ssr_sea_ruler',
  90:  'ssr_arch_angel',
  102: 'ssr_demon_lord',
  116: 'ssr_dragon_aspect',
};

// 상점에서 직접 grant-hero로 지급 가능한 영웅 prefix (주인공 영웅은 제외)
const SHOP_GRANTABLE_PREFIXES = ['ssr_', 'ar_', 'lr_'];

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatarUrl: true,
        level: true,
        experience: true,
        gold: true,
        crystals: true,
        isOnline: true,
        createdAt: true,
        lastLogin: true,
        protagonistSave: true,
        ownedHeroIds: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProtagonistSave(userId: number, saveData: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { protagonistSave: saveData },
      select: { id: true, protagonistSave: true },
    });
  }

  async updateHeroSave(userId: number, templateId: number, saveData: any) {
    const userHero = await this.prisma.userHero.findUnique({
      where: {
        userId_templateId: {
          userId,
          templateId,
        }
      }
    });

    if (!userHero) throw new NotFoundException('Hero not found for this user');

    return this.prisma.userHero.update({
      where: { id: userHero.id },
      data: { saveData },
    });
  }

  async updateProfile(userId: number, data: { username?: string; avatarUrl?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, username: true, avatarUrl: true },
    });
  }

  /**
   * delta > 0: 골드 획득 (게임 종료 시 저장)
   * delta < 0: 골드 소모 (스킬/성급 구매)
   * 잔액이 0 미만이 되면 BadRequest 처리
   */
  async updateGold(userId: number, delta: number) {
    if (delta < 0) {
      // 원자적 조건부 업데이트 — 잔액 부족 시 0건 업데이트됨
      const result = await this.prisma.user.updateMany({
        where: { id: userId, gold: { gte: -delta } },
        data: { gold: { increment: delta } },
      });
      if (result.count === 0) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');
        throw new BadRequestException('Not enough gold');
      }
      return this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, gold: true } });
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: { gold: { increment: delta } },
      select: { id: true, gold: true },
    });
  }

  async updateCrystals(userId: number, delta: number) {
    if (delta < 0) {
      const result = await this.prisma.user.updateMany({
        where: { id: userId, crystals: { gte: -delta } },
        data: { crystals: { increment: delta } },
      });
      if (result.count === 0) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');
        throw new BadRequestException('Not enough crystals');
      }
      return this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, crystals: true } });
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: { crystals: { increment: delta } },
      select: { id: true, crystals: true },
    });
  }

  async getHeroes(userId: number) {
    return this.prisma.userHero.findMany({
      where: { userId },
      select: {
        id: true,
        level: true,
        experience: true,
        talentPoints: true,
        saveData: true,
        template: {
          include: {
            spec: { include: { gameClass: true } },
            race: true,
            element: true,
            faction: true,
          },
        },
      }
    });
  }

  async getOwnedHeroIds(userId: number): Promise<string[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { ownedHeroIds: true },
    });
    if (!user) throw new NotFoundException('User not found');
    const ids = user.ownedHeroIds as string[];
    // protagonist는 항상 포함
    if (!ids.includes('protagonist')) return ['protagonist', ...ids];
    return ids;
  }

  /** 마일스톤 보상 — 주인공 영웅 지급 (서버가 heroId 결정) */
  async claimMilestoneHero(userId: number, milestoneType: string) {
    const heroId = MILESTONE_HERO_MAP[milestoneType];
    if (!heroId) throw new BadRequestException('Invalid milestone type');
    return this.grantHero(userId, heroId);
  }

  /** 오펜스 랜드 클리어 보상 — stageId로 heroId 결정 */
  async claimLandReward(userId: number, stageId: number) {
    const heroId = LAND_CLEAR_HERO_MAP[stageId];
    if (!heroId) throw new BadRequestException('No reward for this stage');
    return this.grantHero(userId, heroId);
  }

  async grantHero(userId: number, heroId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { ownedHeroIds: true },
    });
    if (!user) throw new NotFoundException('User not found');

    const ids = user.ownedHeroIds as string[];
    if (ids.includes(heroId)) {
      return { success: true, message: 'Already owned', ownedHeroIds: ids };
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: { ownedHeroIds: [...ids, heroId] },
      select: { ownedHeroIds: true },
    });

    return { success: true, message: 'Hero granted', ownedHeroIds: updated.ownedHeroIds };
  }

  async getTutorialProgress(userId: number): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { tutorialProgress: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user.tutorialProgress;
  }

  async setTutorialProgress(userId: number, progress: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { tutorialProgress: progress },
    });
    return { tutorialProgress: progress };
  }

  async setOnlineStatus(userId: number, isOnline: boolean) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { isOnline },
    });
  }

  async getOffenseProgress(userId: number): Promise<Record<string, { normal: boolean; elite: boolean }>> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { offenseProgress: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return (user.offenseProgress as Record<string, { normal: boolean; elite: boolean }>) ?? {};
  }

  async exportUserData(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, email: true, username: true, avatarUrl: true,
        level: true, experience: true, gold: true, crystals: true,
        isOnline: true, createdAt: true, lastLogin: true,
        bestWave: true, bestScore: true, totalClears: true, totalGoldEarned: true,
        ownedHeroIds: true, offenseProgress: true, tutorialProgress: true,
        heroes: {
          select: {
            id: true, level: true, experience: true, talentPoints: true,
            template: { select: { name: true, rarity: true } },
          },
        },
        achievements: {
          select: {
            achievedAt: true,
            achievement: { select: { name: true, displayName: true, rewardGold: true } },
          },
        },
        gameSessions: {
          select: {
            session: { select: { mode: true, maxWave: true, isCleared: true, startedAt: true } },
          },
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return { exportedAt: new Date().toISOString(), data: user };
  }

  async deleteAccount(userId: number) {
    await this.prisma.user.delete({ where: { id: userId } });
    return { success: true, message: 'Account deleted' };
  }

  async saveOffenseProgress(userId: number, progress: Record<string, { normal: boolean; elite: boolean }>) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { offenseProgress: true },
    });
    if (!user) throw new NotFoundException('User not found');

    // 기존 진척도와 병합 (이미 클리어한 항목은 취소되지 않음)
    const current = (user.offenseProgress as Record<string, { normal: boolean; elite: boolean }>) ?? {};
    const merged: Record<string, { normal: boolean; elite: boolean }> = { ...current };
    for (const [stageId, val] of Object.entries(progress)) {
      const prev = current[stageId] ?? { normal: false, elite: false };
      merged[stageId] = {
        normal: prev.normal || val.normal,
        elite: prev.elite || val.elite,
      };
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { offenseProgress: merged },
    });
    return merged;
  }
}
