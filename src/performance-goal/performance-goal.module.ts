import { Module } from '@nestjs/common';
import { PerformanceGoalService } from './performance-goal.service';
import { PerformanceGoalController } from './performance-goal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PerformanceGoalController],
  providers: [PerformanceGoalService],
})
export class PerformanceGoalModule {}
