import { Test, TestingModule } from '@nestjs/testing';
import { CompanyCalendarController } from './company-calendar.controller';
import { CompanyCalendarService } from './company-calendar.service';

describe('CompanyCalendarController', () => {
  let controller: CompanyCalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyCalendarController],
      providers: [CompanyCalendarService],
    }).compile();

    controller = module.get<CompanyCalendarController>(CompanyCalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
