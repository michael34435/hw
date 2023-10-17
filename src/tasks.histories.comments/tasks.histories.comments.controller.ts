import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Req,
  UseGuards,
  ValidationPipe,
  DefaultValuePipe,
  HttpCode,
} from '@nestjs/common';
import { TaskHistoryCommentService } from './tasks.histories.comments.service';
import { CreateTaskHistoryCommentDto } from './dto/create-tasks.histories.comment.dto';
import { TaskHistoryCommentEntity } from './entities/tasks.histories.comment.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskHistoryGuard } from 'src/tasks.histories/tasks.histories.guard';
import { TaskHistoryCommentGuard } from './tasks.histories.comments.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard, TaskHistoryGuard)
@ApiBearerAuth('user')
@ApiTags('comments')
@Controller('tasks/:taskId/histories/:taskHistoryId/comments')
export class TaskHistoryCommentsController {
  constructor(
    private readonly taskHistoryCommentService: TaskHistoryCommentService,
  ) {}

  @Post()
  async create(
    @Req() req: Request,
    @Param('taskHistoryId', ParseIntPipe) taskHistoryId: number,
    @Body(new ValidationPipe())
    createTaskHistoryCommentDto: CreateTaskHistoryCommentDto,
  ) {
    return new TaskHistoryCommentEntity(
      await this.taskHistoryCommentService.createComment({
        ...createTaskHistoryCommentDto,
        taskHistoryId,
        userId: req['user'].id,
      }),
    );
  }

  @Get()
  async findAll(
    @Param('taskHistoryId', ParseIntPipe) taskHistoryId: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
  ) {
    const comments = await this.taskHistoryCommentService.comments({
      where: {
        taskHistoryId,
      },
      skip,
      take,
    });

    return comments.map((comment) => new TaskHistoryCommentEntity(comment));
  }

  @UseGuards(TaskHistoryCommentGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.taskHistoryCommentService.remove(+id);
  }
}
