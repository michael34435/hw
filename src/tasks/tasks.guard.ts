import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TaskService } from './tasks.service';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(private readonly taskService: TaskService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const id = request.params?.taskId ?? request.params?.id;

    return !!(await this.taskService.task({ id: +id }));
  }
}

@Injectable()
export class EditableTaskGuard implements CanActivate {
  constructor(private readonly taskService: TaskService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const id = request.params?.taskId ?? request.params?.id;
    const task = await this.taskService.task({ id: +id });

    if (!task) {
      return false;
    }

    return (
      task.userId === request['user'].id ||
      task.reviewerUserId === request['user'].id
    );
  }
}
