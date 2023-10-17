import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TaskHistoryService } from './tasks.histories.service';

@Injectable()
export class TaskHistoryGuard implements CanActivate {
  constructor(private readonly taskHistoryService: TaskHistoryService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // /tasks/:taskId/histories
    const taskId = +request.params?.taskId;
    const id = +(request.params?.taskHistoryId ?? request.params?.id);

    const history = await this.taskHistoryService.history({
      taskId,
      id,
    });

    return !!history;
  }
}
