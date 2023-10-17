import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return new UserEntity(await this.userService.createUser(createUserDto));
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth('user')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    const users = await this.userService.users({
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users.map((user) => new UserEntity(user));
  }
}
