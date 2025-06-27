import { Module } from '@nestjs/common';
import { EmployeeRatingParameterService } from './employee-rating-parameter.service';
import { EmployeeRatingParameterController } from './employee-rating-parameter.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeRatingParameterController],
  providers: [EmployeeRatingParameterService],
})
export class EmployeeRatingParameterModule {}
