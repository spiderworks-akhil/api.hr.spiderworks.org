import { Module } from '@nestjs/common';
import { PeerFeedbackService } from './peer-feedback.service';
import { PeerFeedbackController } from './peer-feedback.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PeerFeedbackController],
  providers: [PeerFeedbackService],
})
export class PeerFeedbackModule {}
