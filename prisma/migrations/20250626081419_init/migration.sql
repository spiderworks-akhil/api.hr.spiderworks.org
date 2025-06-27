-- CreateTable
CREATE TABLE "LeaveLedger" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER,
    "leave_type" "LeaveType",
    "count" DOUBLE PRECISION,
    "eligibility_date" TIMESTAMP(3),
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaveLedger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaveLedger" ADD CONSTRAINT "LeaveLedger_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
