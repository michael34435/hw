import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  async createToken(data: CreateTokenDto) {
    const user = await this.userService.user({ account: data.account });

    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new HttpException(
        'account or password not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.jwtService.sign(
      {
        sub: user.id,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
      },
    );

    return { token };
  }
}
