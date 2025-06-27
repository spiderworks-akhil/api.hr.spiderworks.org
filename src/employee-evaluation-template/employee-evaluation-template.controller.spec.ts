import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEvaluationTemplateController } from './employee-evaluation-template.controller';
import { EmployeeEvaluationTemplateService } from './employee-evaluation-template.service';

describe('EmployeeEvaluationTemplateController', () => {
  let controller: EmployeeEvaluationTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeEvaluationTemplateController],
      providers: [EmployeeEvaluationTemplateService],
    }).compile();

    controller = module.get<EmployeeEvaluationTemplateController>(EmployeeEvaluationTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
