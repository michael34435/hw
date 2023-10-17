import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { TaskHistoryComment } from '@prisma/client';
import { Exclude, Transform, Type } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';

export class TaskHistoryCommentEntity implements TaskHistoryComment {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @Type(() => UserEntity)
  @Transform(({ value }) => ({ id: value?.id, account: value?.account }))
  user: UserEntity;

  @ApiHideProperty()
  @Exclude()
  userId: number;

  @ApiHideProperty()
  @Exclude()
  taskHistoryId: number;
}
