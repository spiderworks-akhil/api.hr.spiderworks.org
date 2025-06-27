import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRatingParameterService } from './employee-rating-parameter.service';

describe('EmployeeRatingParameterService', () => {
  let service: EmployeeRatingParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRatingParameterService],
    }).compile();

    service = module.get<EmployeeRatingParameterService>(EmployeeRatingParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
