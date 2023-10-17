import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  account: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
