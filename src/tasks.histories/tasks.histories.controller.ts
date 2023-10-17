import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskHistoryService } from './tasks.histories.service';
import { TaskHistoryEntity } from './entities/tasks.history.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskGuard } from 'src/tasks/tasks.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth('user')
@ApiTags('histories')
@Controller('tasks/:taskId/histories')
export class TaskHistoriesController {
  constructor(private readonly taskHistoryService: TaskHistoryService) {}

  @UseGuards(TaskGuard)
  @Get()
  async findAll(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    const histories = await this.taskHistoryService.histories({
      skip,
      take,
      where: {
        taskId,
      },
    });

    return histories.map((history) => new TaskHistoryEntity(history));
  }
}
