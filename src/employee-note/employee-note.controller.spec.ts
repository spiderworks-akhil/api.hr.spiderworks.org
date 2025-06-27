import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeNoteController } from './employee-note.controller';
import { EmployeeNoteService } from './employee-note.service';

describe('EmployeeNoteController', () => {
  let controller: EmployeeNoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeNoteController],
      providers: [EmployeeNoteService],
    }).compile();

    controller = module.get<EmployeeNoteController>(EmployeeNoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
