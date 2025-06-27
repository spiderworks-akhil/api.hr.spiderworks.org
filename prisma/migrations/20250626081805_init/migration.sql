-- AlterTable
ALTER TABLE "LeaveLedger" ADD COLUMN     "leave_application_id" INTEGER;

-- AddForeignKey
ALTER TABLE "LeaveLedger" ADD CONSTRAINT "LeaveLedger_leave_application_id_fkey" FOREIGN KEY ("leave_application_id") REFERENCES "LeaveApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;
