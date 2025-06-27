import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeNoteService } from './employee-note.service';

describe('EmployeeNoteService', () => {
  let service: EmployeeNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeNoteService],
    }).compile();

    service = module.get<EmployeeNoteService>(EmployeeNoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
