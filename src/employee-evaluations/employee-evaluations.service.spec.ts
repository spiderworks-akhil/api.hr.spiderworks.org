import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEvaluationsService } from './employee-evaluations.service';

describe('EmployeeEvaluationsService', () => {
  let service: EmployeeEvaluationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeEvaluationsService],
    }).compile();

    service = module.get<EmployeeEvaluationsService>(EmployeeEvaluationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
