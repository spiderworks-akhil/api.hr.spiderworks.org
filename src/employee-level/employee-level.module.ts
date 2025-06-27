import { Module } from '@nestjs/common';
import { EmployeeLevelService } from './employee-level.service';
import { EmployeeLevelController } from './employee-level.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeLevelController],
  providers: [EmployeeLevelService],
})
export class EmployeeLevelModule {}
