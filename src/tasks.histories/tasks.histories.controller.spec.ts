import { Test, TestingModule } from '@nestjs/testing';
import { TaskHistoriesController } from './tasks.histories.controller';
import { TaskHistoryService } from './tasks.histories.service';

describe('TaskHistoriesController', () => {
  let controller: TaskHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskHistoriesController],
      providers: [TaskHistoryService],
    }).compile();

    controller = module.get<TaskHistoriesController>(TaskHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
