import { Module } from '@nestjs/common';
import { TokenService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TokensController],
  providers: [TokenService, JwtService, UserService, PrismaService],
})
export class TokensModule {}
