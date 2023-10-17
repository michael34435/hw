import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from 'src/tokens/tokens.service';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const [scheme, authorization] = req.headers.authorization?.split(' ') ?? [];

    if (scheme !== 'Bearer') {
      return false;
    }

    const { sub: userId } = this.tokenService.validateToken(authorization);

    const user = await this.userService.user({ id: userId });

    req['user'] = user;

    return true;
  }
}
