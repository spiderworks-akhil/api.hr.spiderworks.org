import { Test, TestingModule } from '@nestjs/testing';
import { BoardMeetingController } from './board-meeting.controller';
import { BoardMeetingService } from './board-meeting.service';

describe('BoardMeetingController', () => {
  let controller: BoardMeetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardMeetingController],
      providers: [BoardMeetingService],
    }).compile();

    controller = module.get<BoardMeetingController>(BoardMeetingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
