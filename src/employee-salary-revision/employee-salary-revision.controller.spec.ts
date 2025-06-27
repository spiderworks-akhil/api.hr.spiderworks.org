import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSalaryRevisionController } from './employee-salary-revision.controller';
import { EmployeeSalaryRevisionService } from './employee-salary-revision.service';

describe('EmployeeSalaryRevisionController', () => {
  let controller: EmployeeSalaryRevisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeSalaryRevisionController],
      providers: [EmployeeSalaryRevisionService],
    }).compile();

    controller = module.get<EmployeeSalaryRevisionController>(EmployeeSalaryRevisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
