/*
  Warnings:

  - You are about to drop the column `current_employee` on the `Employee` table. All the data in the column will be lost.
  - The `employee_type` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_updated_by_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "current_employee",
DROP COLUMN "employee_type",
ADD COLUMN     "employee_type" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
