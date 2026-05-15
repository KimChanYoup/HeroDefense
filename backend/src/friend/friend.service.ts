import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async getFriends(userId: number) {
    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [
          { userId, status: 'accepted' },
          { friendId: userId, status: 'accepted' },
        ],
      },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true, isOnline: true, level: true } },
        friend: { select: { id: true, username: true, avatarUrl: true, isOnline: true, level: true } },
      },
    });

    return friendships.map(f => {
      const friendUser = f.userId === userId ? f.friend : f.user;
      return {
        friendshipId: f.id,
        ...friendUser,
      };
    });
  }

  async getPendingRequests(userId: number) {
    const requests = await this.prisma.friendship.findMany({
      where: { friendId: userId, status: 'pending' },
      include: {
        user: { select: { id: true, username: true, avatarUrl: true, level: true } },
      },
    });

    return requests.map(r => ({
      friendshipId: r.id,
      ...r.user,
      createdAt: r.createdAt,
    }));
  }

  async sendRequest(userId: number, targetUsername: string) {
    const target = await this.prisma.user.findUnique({
      where: { username: targetUsername },
    });

    if (!target) throw new NotFoundException('User not found');
    if (target.id === userId) throw new BadRequestException('Cannot send friend request to yourself');

    const existing = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId: target.id },
          { userId: target.id, friendId: userId },
        ],
      },
    });

    if (existing) {
      if (existing.status === 'accepted') throw new ConflictException('Already friends');
      if (existing.status === 'pending') throw new ConflictException('Friend request already pending');
      if (existing.status === 'blocked') throw new BadRequestException('Cannot send request');
    }

    return this.prisma.friendship.create({
      data: { userId, friendId: target.id, status: 'pending' },
      select: { id: true, status: true },
    });
  }

  async acceptRequest(userId: number, friendshipId: number) {
    const friendship = await this.prisma.friendship.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) throw new NotFoundException('Request not found');
    if (friendship.friendId !== userId) throw new BadRequestException('Not your request');
    if (friendship.status !== 'pending') throw new BadRequestException('Request is not pending');

    return this.prisma.friendship.update({
      where: { id: friendshipId },
      data: { status: 'accepted' },
      select: { id: true, status: true },
    });
  }

  async rejectRequest(userId: number, friendshipId: number) {
    const friendship = await this.prisma.friendship.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) throw new NotFoundException('Request not found');
    if (friendship.friendId !== userId) throw new BadRequestException('Not your request');
    if (friendship.status !== 'pending') throw new BadRequestException('Request is not pending');

    return this.prisma.friendship.delete({ where: { id: friendshipId } });
  }

  async removeFriend(userId: number, friendshipId: number) {
    const friendship = await this.prisma.friendship.findUnique({
      where: { id: friendshipId },
    });

    if (!friendship) throw new NotFoundException('Friendship not found');
    if (friendship.userId !== userId && friendship.friendId !== userId) {
      throw new BadRequestException('Not your friendship');
    }

    return this.prisma.friendship.delete({ where: { id: friendshipId } });
  }

  async searchUsers(userId: number, query: string) {
    if (!query || query.length < 2) return [];

    return this.prisma.user.findMany({
      where: {
        username: { contains: query, mode: 'insensitive' },
        id: { not: userId },
      },
      select: { id: true, username: true, avatarUrl: true, isOnline: true, level: true },
      take: 10,
    });
  }

  async isFriend(userId: number, targetId: number): Promise<boolean> {
    const f = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId: targetId, status: 'accepted' },
          { userId: targetId, friendId: userId, status: 'accepted' },
        ],
      },
    });
    return !!f;
  }

  async sendDirectMessage(senderId: number, receiverId: number, content: string) {
    if (!content || content.trim().length === 0) throw new BadRequestException('Message cannot be empty');
    if (content.length > 500) throw new BadRequestException('Message too long');
    if (!(await this.isFriend(senderId, receiverId))) throw new BadRequestException('Not friends');

    return this.prisma.chatMessage.create({
      data: { senderId, receiverId, content: content.trim() },
      select: {
        id: true,
        content: true,
        createdAt: true,
        senderId: true,
        receiverId: true,
      },
    });
  }

  async getDirectMessages(userId: number, peerId: number, limit = 50) {
    if (!(await this.isFriend(userId, peerId))) throw new BadRequestException('Not friends');

    const messages = await this.prisma.chatMessage.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: peerId },
          { senderId: peerId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        content: true,
        createdAt: true,
        senderId: true,
        receiverId: true,
      },
    });

    return messages.reverse();
  }
}
