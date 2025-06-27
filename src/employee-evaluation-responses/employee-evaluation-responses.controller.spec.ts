import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEvaluationResponsesController } from './employee-evaluation-responses.controller';
import { EmployeeEvaluationResponsesService } from './employee-evaluation-responses.service';

describe('EmployeeEvaluationResponsesController', () => {
  let controller: EmployeeEvaluationResponsesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeEvaluationResponsesController],
      providers: [EmployeeEvaluationResponsesService],
    }).compile();

    controller = module.get<EmployeeEvaluationResponsesController>(EmployeeEvaluationResponsesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
