import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  HttpCode,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { EditableTaskGuard } from './tasks.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Sort } from 'src/sort/sort.decorator';

@UseGuards(AuthGuard)
@ApiBearerAuth('user')
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ) {
    return new TaskEntity(
      await this.taskService.createTask(req['user']?.id, createTaskDto),
    );
  }

  @Get()
  async findAll(
    @Req() req: Request,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
    @Query('reviewerUserId', new ParseIntPipe({ optional: true }))
    reviewerUserId?: number,
    @Query('assigneeUserId', new ParseIntPipe({ optional: true }))
    assigneeUserId?: number,
    @Query('startedAt')
    startedAt?: string,
    @Query('endedAt')
    endedAt?: string,
    @Sort(['createdAt', 'id', 'user.id', 'finishedAt'])
    orderBy?: Prisma.TaskOrderByWithRelationInput,
  ) {
    const timeRangeOperator: Prisma.TaskWhereInput[] = [];

    if (startedAt) {
      timeRangeOperator.push({ createdAt: { lte: new Date(startedAt) } });
    }

    if (endedAt) {
      timeRangeOperator.push({ createdAt: { lte: new Date(endedAt) } });
    }

    const filterOperator: Prisma.TaskWhereInput[] = [
      {
        reviewerUserId,
      },
      {
        assigneeUserId,
      },
    ];

    if (!(reviewerUserId && assigneeUserId)) {
      filterOperator.push({ userId: req['user'].id });
    }

    const tasks = await this.taskService.tasks({
      skip,
      take,
      orderBy,
      where: {
        OR: filterOperator,
        AND: timeRangeOperator,
      },
    });

    return tasks.map((task) => new TaskEntity(task));
  }

  @Patch(':id')
  @UseGuards(EditableTaskGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ) {
    return new TaskEntity(await this.taskService.update(id, updateTaskDto));
  }

  @Delete(':id')
  @UseGuards(EditableTaskGuard)
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.remove(id);
  }
}
