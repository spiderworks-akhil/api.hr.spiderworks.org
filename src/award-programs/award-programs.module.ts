import { Module } from '@nestjs/common';
import { AwardProgramsService } from './award-programs.service';
import { AwardProgramsController } from './award-programs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AwardProgramsController],
  providers: [AwardProgramsService],
})
export class AwardProgramsModule {}
