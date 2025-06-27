import { Test, TestingModule } from '@nestjs/testing';
import { AwardProgramsService } from './award-programs.service';

describe('AwardProgramsService', () => {
  let service: AwardProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwardProgramsService],
    }).compile();

    service = module.get<AwardProgramsService>(AwardProgramsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
