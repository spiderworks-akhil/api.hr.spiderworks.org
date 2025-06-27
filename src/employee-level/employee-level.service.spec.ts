import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeLevelService } from './employee-level.service';

describe('EmployeeLevelService', () => {
  let service: EmployeeLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeLevelService],
    }).compile();

    service = module.get<EmployeeLevelService>(EmployeeLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
