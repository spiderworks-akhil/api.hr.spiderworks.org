import { Module } from '@nestjs/common';
import { RecruitmentRequestService } from './recruitment-requests.service';
import { RecruitmentRequestController } from './recruitment-requests.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RecruitmentRequestController],
  providers: [RecruitmentRequestService],
})
export class RecruitmentRequestsModule {}
