/*
  Warnings:

  - Made the column `title` on table `EmployeeDocument` required. This step will fail if there are existing NULL values in that column.
  - Made the column `document` on table `EmployeeDocument` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employee_id` on table `EmployeeDocument` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "EmployeeDocument" DROP CONSTRAINT "EmployeeDocument_employee_id_fkey";

-- AlterTable
ALTER TABLE "EmployeeDocument" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "document" SET NOT NULL,
ALTER COLUMN "employee_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "EmployeeDocument" ADD CONSTRAINT "EmployeeDocument_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
