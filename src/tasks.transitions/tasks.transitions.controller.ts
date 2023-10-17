import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskTransitionDto } from './dto/create-tasks.transition.dto';
import { TaskEntity } from 'src/tasks/entities/task.entity';
import { TaskService } from 'src/tasks/tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { EditableTaskGuard } from 'src/tasks/tasks.guard';

@UseGuards(AuthGuard)
@Controller('tasks/:taskId/transitions')
export class TasksTransitionsController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(EditableTaskGuard)
  async create(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body(new ValidationPipe())
    createTaskTransitionDto: CreateTaskTransitionDto,
  ) {
    const task = await this.taskService.transition(
      taskId,
      createTaskTransitionDto,
    );

    return new TaskEntity(task);
  }
}
