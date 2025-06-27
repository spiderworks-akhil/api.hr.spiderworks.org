import { Test, TestingModule } from '@nestjs/testing';
import { PeerFeedbackService } from './peer-feedback.service';

describe('PeerFeedbackService', () => {
  let service: PeerFeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeerFeedbackService],
    }).compile();

    service = module.get<PeerFeedbackService>(PeerFeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
