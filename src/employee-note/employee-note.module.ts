import { Module } from '@nestjs/common';
import { EmployeeNoteService } from './employee-note.service';
import { EmployeeNoteController } from './employee-note.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeNoteController],
  providers: [EmployeeNoteService],
})
export class EmployeeNoteModule {}
