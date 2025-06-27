import { Module } from '@nestjs/common';
import { LeaveLedgerService } from './leave-ledger.service';
import { LeaveLedgerController } from './leave-ledger.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LeaveLedgerController],
  providers: [LeaveLedgerService],
})
export class LeaveLedgerModule {}
