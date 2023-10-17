import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @ApiProperty()
  reviewerUserId?: number | null;

  @ApiProperty()
  assigneeUserId?: number | null;

  @ApiProperty()
  parentId?: number | null;
}
