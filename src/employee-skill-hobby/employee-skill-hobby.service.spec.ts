import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSkillHobbyService } from './employee-skill-hobby.service';

describe('EmployeeSkillHobbyService', () => {
  let service: EmployeeSkillHobbyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeSkillHobbyService],
    }).compile();

    service = module.get<EmployeeSkillHobbyService>(EmployeeSkillHobbyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
