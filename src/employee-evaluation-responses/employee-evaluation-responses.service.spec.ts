import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEvaluationResponseService } from './employee-evaluation-responses.service';

describe('EmployeeEvaluationResponsesService', () => {
  let service: EmployeeEvaluationResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeEvaluationResponseService],
    }).compile();

    service = module.get<EmployeeEvaluationResponseService>(EmployeeEvaluationResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
