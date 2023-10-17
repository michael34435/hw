import { Injectable } from '@nestjs/common';
import { Prisma, TaskHistory } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskHistoryService {
  constructor(private prisma: PrismaService) {}

  history(
    taskHistoryWhereUniqueInput: Prisma.TaskHistoryWhereUniqueInput,
  ): Promise<TaskHistory | null> {
    return this.prisma.taskHistory.findUnique({
      where: taskHistoryWhereUniqueInput,
    });
  }

  histories(params: {
    skip: number;
    take: number;
    where: Prisma.TaskHistoryWhereInput;
  }): Promise<TaskHistory[]> {
    return this.prisma.taskHistory.findMany(params);
  }
}
