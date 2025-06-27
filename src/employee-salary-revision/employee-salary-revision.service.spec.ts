import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSalaryRevisionService } from './employee-salary-revision.service';

describe('EmployeeSalaryRevisionService', () => {
  let service: EmployeeSalaryRevisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeSalaryRevisionService],
    }).compile();

    service = module.get<EmployeeSalaryRevisionService>(EmployeeSalaryRevisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
