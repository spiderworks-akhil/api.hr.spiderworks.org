/*
  Warnings:

  - You are about to drop the `EmployeeEvaluationParameterAssignment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `parameter_id` to the `EmployeeEvaluationTemplateParameterMapping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" DROP CONSTRAINT "EmployeeEvaluationParameterAssignment_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" DROP CONSTRAINT "EmployeeEvaluationParameterAssignment_mapping_id_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" DROP CONSTRAINT "EmployeeEvaluationParameterAssignment_parameter_id_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" DROP CONSTRAINT "EmployeeEvaluationParameterAssignment_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationResponse" DROP CONSTRAINT "EmployeeEvaluationResponse_parameter_assignment_id_fkey";

-- DropIndex
DROP INDEX "EmployeeEvaluationTemplateParameterMapping_template_id_key";

-- AlterTable
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" ADD COLUMN     "parameter_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "EmployeeEvaluationParameterAssignment";

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" ADD CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "EmployeeRatingParameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationResponse" ADD CONSTRAINT "EmployeeEvaluationResponse_parameter_assignment_id_fkey" FOREIGN KEY ("parameter_assignment_id") REFERENCES "EmployeeEvaluationTemplateParameterMapping"("id") ON DELETE CASCADE ON UPDATE CASCADE;
