import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePhotosService } from './employee-photos.service';

describe('EmployeePhotosService', () => {
  let service: EmployeePhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeePhotosService],
    }).compile();

    service = module.get<EmployeePhotosService>(EmployeePhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
