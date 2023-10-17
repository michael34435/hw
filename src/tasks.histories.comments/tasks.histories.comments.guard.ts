import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TaskHistoryCommentService } from './tasks.histories.comments.service';

@Injectable()
export class TaskHistoryCommentGuard implements CanActivate {
  constructor(
    private readonly taskHistoryCommentService: TaskHistoryCommentService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // /tasks/:taskId/histories
    const taskHistoryId = +request.params?.taskHistoryId;
    const id = +(request.params?.taskHistoryCommentId ?? request.params?.id);

    const comment = await this.taskHistoryCommentService.comment({
      taskHistoryId,
      id,
    });

    return !!comment;
  }
}
