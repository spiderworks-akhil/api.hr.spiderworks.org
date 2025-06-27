-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_departments_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_employee_roles_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_users_id_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "users_id" DROP NOT NULL,
ALTER COLUMN "departments_id" DROP NOT NULL,
ALTER COLUMN "employee_roles_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departments_id_fkey" FOREIGN KEY ("departments_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employee_roles_id_fkey" FOREIGN KEY ("employee_roles_id") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
