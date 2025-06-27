import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceGoalController } from './performance-goal.controller';
import { PerformanceGoalService } from './performance-goal.service';

describe('PerformanceGoalController', () => {
  let controller: PerformanceGoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformanceGoalController],
      providers: [PerformanceGoalService],
    }).compile();

    controller = module.get<PerformanceGoalController>(PerformanceGoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
