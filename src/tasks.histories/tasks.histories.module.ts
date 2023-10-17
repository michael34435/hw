import { Module } from '@nestjs/common';
import { TaskHistoryService } from './tasks.histories.service';
import { TaskHistoriesController } from './tasks.histories.controller';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { TaskService } from 'src/tasks/tasks.service';

@Module({
  controllers: [TaskHistoriesController],
  providers: [
    TaskHistoryService,
    PrismaService,
    TokenService,
    JwtService,
    UserService,
    TaskService,
  ],
})
export class TaskHistoriesModule {}
