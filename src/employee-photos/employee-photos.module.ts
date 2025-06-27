import { Module } from '@nestjs/common';
import { EmployeePhotosService } from './employee-photos.service';
import { EmployeePhotosController } from './employee-photos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeePhotosController],
  providers: [EmployeePhotosService],
})
export class EmployeePhotosModule {}
