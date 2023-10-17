import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokenService } from './tokens.service';
import { TokenEntity } from './entities/token.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createTokenDto: CreateTokenDto) {
    return new TokenEntity(await this.tokenService.createToken(createTokenDto));
  }
}
