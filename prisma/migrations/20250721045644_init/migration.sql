-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "active_salary_revision_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_active_salary_revision_id_fkey" FOREIGN KEY ("active_salary_revision_id") REFERENCES "EmployeeSalaryRevision"("id") ON DELETE SET NULL ON UPDATE CASCADE;
