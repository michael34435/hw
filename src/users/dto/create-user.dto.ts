import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  account: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty()
  password: string;
}
