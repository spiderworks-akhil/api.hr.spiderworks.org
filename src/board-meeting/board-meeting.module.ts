import { Module } from '@nestjs/common';
import { BoardMeetingService } from './board-meeting.service';
import { BoardMeetingController } from './board-meeting.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BoardMeetingController],
  providers: [BoardMeetingService],
})
export class BoardMeetingModule {}
