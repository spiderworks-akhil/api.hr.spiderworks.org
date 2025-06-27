import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeLevelController } from './employee-level.controller';
import { EmployeeLevelService } from './employee-level.service';

describe('EmployeeLevelController', () => {
  let controller: EmployeeLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeLevelController],
      providers: [EmployeeLevelService],
    }).compile();

    controller = module.get<EmployeeLevelController>(EmployeeLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
