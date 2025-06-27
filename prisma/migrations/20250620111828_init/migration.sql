/*
  Warnings:

  - You are about to drop the column `parameter_assignment_id` on the `EmployeeEvaluationResponse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmployeeEvaluationResponse" DROP CONSTRAINT "EmployeeEvaluationResponse_parameter_assignment_id_fkey";

-- AlterTable
ALTER TABLE "EmployeeEvaluationResponse" DROP COLUMN "parameter_assignment_id",
ADD COLUMN     "parameter_mapping_id" INTEGER;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationResponse" ADD CONSTRAINT "EmployeeEvaluationResponse_parameter_mapping_id_fkey" FOREIGN KEY ("parameter_mapping_id") REFERENCES "EmployeeEvaluationTemplateParameterMapping"("id") ON DELETE CASCADE ON UPDATE CASCADE;
