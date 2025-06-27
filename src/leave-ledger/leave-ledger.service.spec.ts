import { Test, TestingModule } from '@nestjs/testing';
import { LeaveLedgerService } from './leave-ledger.service';

describe('LeaveLedgerService', () => {
  let service: LeaveLedgerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaveLedgerService],
    }).compile();

    service = module.get<LeaveLedgerService>(LeaveLedgerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
