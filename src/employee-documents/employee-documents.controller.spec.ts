import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDocumentsController } from './employee-documents.controller';
import { EmployeeDocumentsService } from './employee-documents.service';

describe('EmployeeDocumentsController', () => {
  let controller: EmployeeDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeDocumentsController],
      providers: [EmployeeDocumentsService],
    }).compile();

    controller = module.get<EmployeeDocumentsController>(EmployeeDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
