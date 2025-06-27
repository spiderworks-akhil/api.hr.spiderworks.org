-- DropForeignKey
ALTER TABLE "EmployeeEvaluation" DROP CONSTRAINT "EmployeeEvaluation_evaluation_by_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluation" DROP CONSTRAINT "EmployeeEvaluation_evaluation_for_employee_id_fkey";

-- AlterTable
ALTER TABLE "EmployeeEvaluation" ALTER COLUMN "template_id" DROP NOT NULL,
ALTER COLUMN "evaluation_for_employee_id" DROP NOT NULL,
ALTER COLUMN "evaluation_by_employee_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluation" ADD CONSTRAINT "EmployeeEvaluation_evaluation_for_employee_id_fkey" FOREIGN KEY ("evaluation_for_employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluation" ADD CONSTRAINT "EmployeeEvaluation_evaluation_by_employee_id_fkey" FOREIGN KEY ("evaluation_by_employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
