import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { $Enums, Prisma, Task } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

type TaskWithInclude = Prisma.TaskGetPayload<{
  include: {
    parent: {
      include: {
        children: true;
      };
    };
  };
}>;

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // TODO: type
  async task(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
    include?: Prisma.TaskInclude<DefaultArgs> | null,
  ) {
    return this.prisma.task.findUnique({
      where: taskWhereUniqueInput,
      include,
    });
  }

  async createTask(userId: number, createTaskDto: CreateTaskDto) {
    return this.prisma.$transaction(async (tx) => {
      const task = await tx.task.create({
        data: {
          reviewerUserId: createTaskDto.reviewerUserId,
          assigneeUserId: createTaskDto.assigneeUserId,
          parentId: createTaskDto.parentId,
          status: $Enums.Status.TODO,
          userId,
        },
      });

      const history = await tx.taskHistory.create({
        data: {
          title: createTaskDto.title,
          content: createTaskDto.content,
          taskId: task.id,
        },
      });

      return {
        ...task,
        title: history.title,
        content: history.content,
      };
    });
  }

  async tasks(params: {
    skip: number;
    take: number;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      ...params,
      include: {
        assignee: true,
        reviewer: true,
        user: true,
        parent: {
          include: {
            assignee: true,
            reviewer: true,
            user: true,
            histories: {
              orderBy: {
                createdAt: 'desc',
              },
              take: 1,
            },
          },
        },
        histories: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    return tasks.map((task) => {
      const [history] = task.histories;
      const [parentHistory] = task.parent?.histories ?? [];

      return {
        ...task,
        parent: {
          ...task.parent,
          title: parentHistory?.title,
          content: parentHistory?.content,
        },
        title: history?.title,
        content: history?.content,
      };
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.$transaction(async (tx) => {
      const taskToUpdate = await tx.task.findUniqueOrThrow({
        where: {
          id,
        },
      });

      const task = await tx.task.update({
        where: {
          id: taskToUpdate.id,
          updatedAt: taskToUpdate.updatedAt,
        },
        data: {
          assigneeUserId:
            updateTaskDto.assigneeUserId ?? taskToUpdate.assigneeUserId,
          reviewerUserId:
            updateTaskDto.reviewerUserId ?? taskToUpdate.reviewerUserId,
        },
      });

      const hitstoryToUpdate = await tx.taskHistory.findFirstOrThrow({
        where: {
          taskId: task.id,
        },
        take: 1,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const taskHistory = await tx.taskHistory.create({
        data: {
          taskId: task.id,
          title: updateTaskDto.title ?? hitstoryToUpdate.title,
          content: updateTaskDto.content ?? hitstoryToUpdate.content,
        },
      });

      return {
        ...taskHistory,
        ...task,
      };
    });
  }

  async transition(
    id: number,
    data: Prisma.TaskUpdateInput,
  ): Promise<TaskWithInclude> {
    const finish = (
      id: number,
      tx: Prisma.TaskDelegate<DefaultArgs>,
    ): Promise<TaskWithInclude> => {
      return tx.update({
        where: {
          id,
        },
        include: {
          parent: {
            include: {
              children: true,
            },
          },
          children: true,
        },
        data: {
          ...data,
          finishedAt: new Date(),
        },
      });
    };

    const checkChildrenDone = async (
      task: TaskWithInclude,
      tx: Prisma.TaskDelegate<DefaultArgs>,
    ) => {
      const children = task?.parent?.children ?? [];

      if (children.every((task) => task.status === $Enums.Status.DONE)) {
        if (task.parent) {
          const anotherTask = await finish(task.parent.id, tx);
          return await checkChildrenDone(anotherTask, tx);
        }
      }
    };

    return this.prisma.$transaction(async (tx) => {
      const task = await finish(id, tx.task);
      await checkChildrenDone(task, tx.task);

      return task;
    });
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
