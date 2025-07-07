/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_id_fkey";

-- AlterTable
CREATE SEQUENCE employee_id_seq;
ALTER TABLE "Employee" ADD COLUMN     "user_id" INTEGER,
ALTER COLUMN "id" SET DEFAULT nextval('employee_id_seq');
ALTER SEQUENCE employee_id_seq OWNED BY "Employee"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_user_id_key" ON "Employee"("user_id");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
