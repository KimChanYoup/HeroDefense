import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const RARITY_PRICES: Record<string, number> = {
  normal: 100,
  rare: 300,
  epic: 500,
};

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async getAvailableHeroes(userId: number) {
    // Get all hero templates
    const templates = await this.prisma.heroTemplate.findMany({
      where: { isAchievement: false },
      include: {
        spec: { include: { gameClass: true } },
        race: true,
        element: true,
        faction: true,
      },
    });

    // Get user's owned hero template IDs
    const ownedHeroes = await this.prisma.userHero.findMany({
      where: { userId },
      select: { templateId: true },
    });
    const ownedIds = new Set(ownedHeroes.map(h => h.templateId));

    // Get user gold
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { gold: true },
    });

    return {
      heroes: templates.map(t => ({
        ...t,
        price: RARITY_PRICES[t.rarity] || 100,
        owned: ownedIds.has(t.id),
      })),
      userGold: user?.gold || 0,
    };
  }

  async buyHero(userId: number, templateId: number) {
    const template = await this.prisma.heroTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) throw new NotFoundException('Hero not found');
    if (template.isAchievement) throw new BadRequestException('This hero cannot be purchased');

    // Check if already owned
    const existing = await this.prisma.userHero.findUnique({
      where: { userId_templateId: { userId, templateId } },
    });
    if (existing) throw new ConflictException('You already own this hero');

    const price = RARITY_PRICES[template.rarity] || 100;

    // Check gold
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { gold: true },
    });
    if (!user || user.gold < price) {
      throw new BadRequestException('Not enough gold');
    }

    // Transaction: deduct gold + create user hero
    const [updatedUser, userHero] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { gold: { decrement: price } },
        select: { gold: true },
      }),
      this.prisma.userHero.create({
        data: { userId, templateId },
        include: {
          template: {
            include: {
              spec: { include: { gameClass: true } },
              race: true,
              element: true,
              faction: true,
            },
          },
        },
      }),
    ]);

    return {
      hero: userHero,
      remainingGold: updatedUser.gold,
    };
  }
}
