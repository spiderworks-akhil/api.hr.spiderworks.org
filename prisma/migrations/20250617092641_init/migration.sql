-- CreateTable
CREATE TABLE "EmployeeSalaryRevision" (
    "id" SERIAL NOT NULL,
    "version" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "effective_date" TIMESTAMP(3),
    "basic_pay" DOUBLE PRECISION NOT NULL,
    "tds_deduction_amount" DOUBLE PRECISION,
    "esi_employee_share" DOUBLE PRECISION,
    "esi_employer_share" DOUBLE PRECISION,
    "pf_employee_share" DOUBLE PRECISION,
    "pf_employer_share" DOUBLE PRECISION,
    "hra" DOUBLE PRECISION,
    "travel_allowance" DOUBLE PRECISION,
    "other_allowance" DOUBLE PRECISION,
    "grand_total" DOUBLE PRECISION,
    "remarks" TEXT,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeSalaryRevision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeSalaryRevision" ADD CONSTRAINT "EmployeeSalaryRevision_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSalaryRevision" ADD CONSTRAINT "EmployeeSalaryRevision_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSalaryRevision" ADD CONSTRAINT "EmployeeSalaryRevision_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
