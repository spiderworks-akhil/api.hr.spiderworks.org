import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeEmergencyContactController } from './employee-emergency-contact.controller';
import { EmployeeEmergencyContactService } from './employee-emergency-contact.service';

describe('EmployeeEmergencyContactController', () => {
  let controller: EmployeeEmergencyContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeEmergencyContactController],
      providers: [EmployeeEmergencyContactService],
    }).compile();

    controller = module.get<EmployeeEmergencyContactController>(EmployeeEmergencyContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
