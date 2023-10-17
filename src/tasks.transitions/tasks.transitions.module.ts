import { Module } from '@nestjs/common';
import { TasksTransitionsController } from './tasks.transitions.controller';
import { PrismaService } from 'src/prisma.service';
import { TaskService } from 'src/tasks/tasks.service';
import { TokenService } from 'src/tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Module({
  controllers: [TasksTransitionsController],
  providers: [
    TaskService,
    PrismaService,
    TokenService,
    JwtService,
    UserService,
  ],
})
export class TasksTransitionsModule {}
