import { Module } from '@nestjs/common';
import { EmployeeSalaryRevisionService } from './employee-salary-revision.service';
import { EmployeeSalaryRevisionController } from './employee-salary-revision.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeSalaryRevisionController],
  providers: [EmployeeSalaryRevisionService],
})
export class EmployeeSalaryRevisionModule {}
