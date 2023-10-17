import { ApiProperty } from '@nestjs/swagger';

export class TokenEntity {
  constructor(partial: Partial<TokenEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  token: string;
}
