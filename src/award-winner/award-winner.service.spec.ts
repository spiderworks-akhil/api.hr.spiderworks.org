import { Test, TestingModule } from '@nestjs/testing';
import { AwardWinnerService } from './award-winner.service';

describe('AwardWinnerService', () => {
  let service: AwardWinnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AwardWinnerService],
    }).compile();

    service = module.get<AwardWinnerService>(AwardWinnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
