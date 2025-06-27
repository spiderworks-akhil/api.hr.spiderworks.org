import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEvaluationTemplateService } from './employee-evaluation-template.service';

describe('EmployeeEvaluationTemplateService', () => {
  let service: EmployeeEvaluationTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeEvaluationTemplateService],
    }).compile();

    service = module.get<EmployeeEvaluationTemplateService>(EmployeeEvaluationTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
