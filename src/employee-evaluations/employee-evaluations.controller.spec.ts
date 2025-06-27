import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEvaluationsController } from './employee-evaluations.controller';
import { EmployeeEvaluationsService } from './employee-evaluations.service';

describe('EmployeeEvaluationsController', () => {
  let controller: EmployeeEvaluationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeEvaluationsController],
      providers: [EmployeeEvaluationsService],
    }).compile();

    controller = module.get<EmployeeEvaluationsController>(EmployeeEvaluationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
