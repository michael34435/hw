import { Test, TestingModule } from '@nestjs/testing';
import { TaskHistoryCommentsController } from './tasks.histories.comments.controller';
import { TaskHistoryCommentService } from './tasks.histories.comments.service';

describe('TaskHistoryCommentsController', () => {
  let controller: TaskHistoryCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskHistoryCommentsController],
      providers: [TaskHistoryCommentService],
    }).compile();

    controller = module.get<TaskHistoryCommentsController>(
      TaskHistoryCommentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
