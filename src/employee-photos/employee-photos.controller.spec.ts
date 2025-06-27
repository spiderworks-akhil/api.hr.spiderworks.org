import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePhotosController } from './employee-photos.controller';
import { EmployeePhotosService } from './employee-photos.service';

describe('EmployeePhotosController', () => {
  let controller: EmployeePhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeePhotosController],
      providers: [EmployeePhotosService],
    }).compile();

    controller = module.get<EmployeePhotosController>(EmployeePhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
