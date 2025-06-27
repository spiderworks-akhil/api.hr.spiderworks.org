import { Test, TestingModule } from '@nestjs/testing';
import { PeerFeedbackController } from './peer-feedback.controller';
import { PeerFeedbackService } from './peer-feedback.service';

describe('PeerFeedbackController', () => {
  let controller: PeerFeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeerFeedbackController],
      providers: [PeerFeedbackService],
    }).compile();

    controller = module.get<PeerFeedbackController>(PeerFeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
