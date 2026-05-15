import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { FriendService } from './friend.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from '../types/auth.types';

@Controller('friends')
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Get()
  getFriends(@Request() req) {
    return this.friendService.getFriends(req.user.id);
  }

  @Get('pending')
  getPendingRequests(@Request() req) {
    return this.friendService.getPendingRequests(req.user.id);
  }

  @Get('search')
  searchUsers(@Request() req: AuthenticatedRequest, @Query('q') query: string) {
    return this.friendService.searchUsers(req.user.id, query);
  }

  @Post('request')
  sendRequest(@Request() req: AuthenticatedRequest, @Body() data: { username: string }) {
    return this.friendService.sendRequest(req.user.id, data.username);
  }

  @Put('accept/:id')
  acceptRequest(@Request() req: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.friendService.acceptRequest(req.user.id, id);
  }

  @Put('reject/:id')
  rejectRequest(@Request() req: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.friendService.rejectRequest(req.user.id, id);
  }

  @Delete(':id')
  removeFriend(@Request() req: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.friendService.removeFriend(req.user.id, id);
  }

  @Get(':id/messages')
  getMessages(@Request() req: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number) {
    return this.friendService.getDirectMessages(req.user.id, id);
  }

  @Post(':id/messages')
  sendMessage(@Request() req: AuthenticatedRequest, @Param('id', ParseIntPipe) id: number, @Body() body: { content: string }) {
    return this.friendService.sendDirectMessage(req.user.id, id, body.content);
  }
}
