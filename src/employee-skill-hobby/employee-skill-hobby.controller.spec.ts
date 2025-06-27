import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSkillHobbyController } from './employee-skill-hobby.controller';
import { EmployeeSkillHobbyService } from './employee-skill-hobby.service';

describe('EmployeeSkillHobbyController', () => {
  let controller: EmployeeSkillHobbyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeSkillHobbyController],
      providers: [EmployeeSkillHobbyService],
    }).compile();

    controller = module.get<EmployeeSkillHobbyController>(EmployeeSkillHobbyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
