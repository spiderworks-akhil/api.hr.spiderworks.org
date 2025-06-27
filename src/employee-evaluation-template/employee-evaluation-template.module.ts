import { Module } from '@nestjs/common';
import { EmployeeEvaluationTemplateService } from './employee-evaluation-template.service';
import { EmployeeEvaluationTemplateController } from './employee-evaluation-template.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeEvaluationTemplateController],
  providers: [EmployeeEvaluationTemplateService],
})
export class EmployeeEvaluationTemplateModule {}
