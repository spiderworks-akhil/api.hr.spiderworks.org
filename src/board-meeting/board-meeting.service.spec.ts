import { Test, TestingModule } from '@nestjs/testing';
import { BoardMeetingService } from './board-meeting.service';

describe('BoardMeetingService', () => {
  let service: BoardMeetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardMeetingService],
    }).compile();

    service = module.get<BoardMeetingService>(BoardMeetingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
