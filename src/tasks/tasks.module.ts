import { Module } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Module({
  controllers: [TasksController],
  providers: [
    TaskService,
    PrismaService,
    TokenService,
    JwtService,
    UserService,
  ],
})
export class TasksModule {}
