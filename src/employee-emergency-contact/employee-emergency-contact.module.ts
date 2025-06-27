import { Module } from '@nestjs/common';
import { EmployeeEmergencyContactService } from './employee-emergency-contact.service';
import { EmployeeEmergencyContactController } from './employee-emergency-contact.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeEmergencyContactController],
  providers: [EmployeeEmergencyContactService],
})
export class EmployeeEmergencyContactModule {}
