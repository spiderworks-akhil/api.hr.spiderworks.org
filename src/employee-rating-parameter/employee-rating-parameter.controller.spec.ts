import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeRatingParameterController } from './employee-rating-parameter.controller';
import { EmployeeRatingParameterService } from './employee-rating-parameter.service';

describe('EmployeeRatingParameterController', () => {
  let controller: EmployeeRatingParameterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeRatingParameterController],
      providers: [EmployeeRatingParameterService],
    }).compile();

    controller = module.get<EmployeeRatingParameterController>(EmployeeRatingParameterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
