import { Test, TestingModule } from '@nestjs/testing';
import { LeaveLedgerController } from './leave-ledger.controller';
import { LeaveLedgerService } from './leave-ledger.service';

describe('LeaveLedgerController', () => {
  let controller: LeaveLedgerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveLedgerController],
      providers: [LeaveLedgerService],
    }).compile();

    controller = module.get<LeaveLedgerController>(LeaveLedgerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
