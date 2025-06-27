-- DropForeignKey
ALTER TABLE "EmployeeDocument" DROP CONSTRAINT "EmployeeDocument_employee_id_fkey";

-- AlterTable
ALTER TABLE "EmployeeDocument" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "document" DROP NOT NULL,
ALTER COLUMN "employee_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EmployeeDocument" ADD CONSTRAINT "EmployeeDocument_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
