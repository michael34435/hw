import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty()
  reviewerUserId?: number;

  @ApiProperty()
  assigneeUserId?: number;

  @ApiProperty()
  content?: string;

  @ApiProperty()
  title?: string;
}
