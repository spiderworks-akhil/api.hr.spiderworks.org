import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceGoalService } from './performance-goal.service';

describe('PerformanceGoalService', () => {
  let service: PerformanceGoalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerformanceGoalService],
    }).compile();

    service = module.get<PerformanceGoalService>(PerformanceGoalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
