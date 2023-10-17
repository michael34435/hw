import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/tokens/tokens.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UserService, PrismaService, TokenService, JwtService],
})
export class UsersModule {}
