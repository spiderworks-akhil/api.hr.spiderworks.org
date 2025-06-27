import { Test, TestingModule } from '@nestjs/testing';
import { CompanyCalendarService } from './company-calendar.service';

describe('CompanyCalendarService', () => {
  let service: CompanyCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyCalendarService],
    }).compile();

    service = module.get<CompanyCalendarService>(CompanyCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
