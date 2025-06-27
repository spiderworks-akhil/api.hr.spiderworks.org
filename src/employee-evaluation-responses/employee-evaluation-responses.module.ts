import { Module } from '@nestjs/common';
import { EmployeeEvaluationResponseService } from './employee-evaluation-responses.service';
import { EmployeeEvaluationResponseController } from './employee-evaluation-responses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeEvaluationResponseController],
  providers: [EmployeeEvaluationResponseService],
})
export class EmployeeEvaluationResponsesModule {}
