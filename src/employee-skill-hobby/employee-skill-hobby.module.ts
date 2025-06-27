import { Module } from '@nestjs/common';
import { EmployeeSkillHobbyService } from './employee-skill-hobby.service';
import { EmployeeSkillHobbyController } from './employee-skill-hobby.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeSkillHobbyController],
  providers: [EmployeeSkillHobbyService],
})
export class EmployeeSkillHobbyModule {}
