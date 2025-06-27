import { Test, TestingModule } from '@nestjs/testing';
import { AwardProgramsController } from './award-programs.controller';
import { AwardProgramsService } from './award-programs.service';

describe('AwardProgramsController', () => {
  let controller: AwardProgramsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AwardProgramsController],
      providers: [AwardProgramsService],
    }).compile();

    controller = module.get<AwardProgramsController>(AwardProgramsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
