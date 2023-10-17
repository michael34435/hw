import { Test, TestingModule } from '@nestjs/testing';
import { TaskHistoryCommentService } from './tasks.histories.comments.service';

describe('TaskHistoryCommentService', () => {
  let service: TaskHistoryCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskHistoryCommentService],
    }).compile();

    service = module.get<TaskHistoryCommentService>(TaskHistoryCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
