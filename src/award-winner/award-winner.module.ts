import { Module } from '@nestjs/common';
import { AwardWinnerService } from './award-winner.service';
import { AwardWinnerController } from './award-winner.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AwardWinnerController],
  providers: [AwardWinnerService],
})
export class AwardWinnerModule {}
