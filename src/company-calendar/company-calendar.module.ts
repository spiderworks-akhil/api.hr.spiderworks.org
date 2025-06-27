import { Module } from '@nestjs/common';
import { CompanyCalendarService } from './company-calendar.service';
import { CompanyCalendarController } from './company-calendar.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CompanyCalendarController],
  providers: [CompanyCalendarService],
})
export class CompanyCalendarModule {}
