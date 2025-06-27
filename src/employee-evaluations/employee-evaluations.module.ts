import { Module } from '@nestjs/common';
import { EmployeeEvaluationService } from './employee-evaluations.service';
import { EmployeeEvaluationController } from './employee-evaluations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeEvaluationController],
  providers: [EmployeeEvaluationService],
})
export class EmployeeEvaluationsModule {}
