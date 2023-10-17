import { Module } from '@nestjs/common';
import { TaskHistoryCommentService } from './tasks.histories.comments.service';
import { TaskHistoryCommentsController } from './tasks.histories.comments.controller';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { TaskHistoryService } from 'src/tasks.histories/tasks.histories.service';

@Module({
  controllers: [TaskHistoryCommentsController],
  providers: [
    TaskHistoryCommentService,
    PrismaService,
    TokenService,
    JwtService,
    UserService,
    TaskHistoryService,
  ],
})
export class TaskHistoryCommentsModule {}
