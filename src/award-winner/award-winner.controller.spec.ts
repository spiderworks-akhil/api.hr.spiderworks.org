import { Test, TestingModule } from '@nestjs/testing';
import { AwardWinnerController } from './award-winner.controller';
import { AwardWinnerService } from './award-winner.service';

describe('AwardWinnerController', () => {
  let controller: AwardWinnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwardWinnerController],
      providers: [AwardWinnerService],
    }).compile();

    controller = module.get<AwardWinnerController>(AwardWinnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
