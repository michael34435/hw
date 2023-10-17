import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { $Enums, Task } from '@prisma/client';
import { Exclude, Transform, Type } from 'class-transformer';
import { TaskHistoryEntity } from 'src/tasks.histories/entities/tasks.history.entity';
import { UserEntity } from 'src/users/entities/user.entity';

export class TaskEntity implements Task {
  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  finishedAt: Date | null;

  @ApiProperty()
  status: $Enums.Status;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  @Type(() => UserEntity)
  @Transform(({ value }) => ({ id: value?.id, account: value?.account }))
  assignee?: UserEntity | null;

  @ApiProperty()
  @Type(() => UserEntity)
  @Transform(({ value }) => ({ id: value?.id, account: value?.account }))
  user?: UserEntity | null;

  @ApiProperty()
  @Type(() => UserEntity)
  @Transform(({ value }) => ({ id: value?.id, account: value?.account }))
  reviewer?: UserEntity | null;

  @ApiProperty()
  @Type(() => TaskEntity)
  parent?: Task | null;

  @ApiHideProperty()
  @Exclude()
  histories: TaskHistoryEntity[];

  @ApiHideProperty()
  @Exclude()
  reviewerUserId: number | null;

  @ApiHideProperty()
  @Exclude()
  assigneeUserId: number | null;

  @ApiHideProperty()
  @Exclude()
  userId: number;

  @ApiHideProperty()
  @Exclude()
  parentId: number | null;
}
