import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { TaskHistory } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class TaskHistoryEntity implements TaskHistory {
  constructor(partial: Partial<TaskHistoryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiHideProperty()
  @Exclude()
  taskId: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
