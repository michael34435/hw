import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { Prisma, TaskHistoryComment } from '@prisma/client';

@Injectable()
export class TaskHistoryCommentService {
  constructor(private prisma: PrismaService) {}

  createComment(
    data: Prisma.TaskHistoryCommentUncheckedCreateInput,
  ): Promise<TaskHistoryComment> {
    return this.prisma.taskHistoryComment.create({
      data,
    });
  }

  async comment(
    taskHistoryCommentWhereUniqueInput: Prisma.TaskHistoryCommentWhereUniqueInput,
  ): Promise<TaskHistoryComment | null> {
    return this.prisma.taskHistoryComment.findUnique({
      where: taskHistoryCommentWhereUniqueInput,
    });
  }

  comments(params: {
    skip: number;
    take: number;
    cursor?: Prisma.TaskHistoryCommentWhereUniqueInput;
    where?: Prisma.TaskHistoryCommentWhereInput;
    orderBy?: Prisma.TaskHistoryCommentOrderByWithRelationInput;
  }): Promise<TaskHistoryComment[]> {
    return this.prisma.taskHistoryComment.findMany({
      ...params,
      include: {
        user: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.taskHistoryComment.delete({ where: { id } });
  }
}
