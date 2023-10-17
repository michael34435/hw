import { Test, TestingModule } from '@nestjs/testing';
import { TasksTransitionsController } from './tasks.transitions.controller';

describe('TasksTransitionsController', () => {
  let controller: TasksTransitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksTransitionsController],
      providers: [],
    }).compile();

    controller = module.get<TasksTransitionsController>(
      TasksTransitionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
