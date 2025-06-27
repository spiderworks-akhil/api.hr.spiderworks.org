/*
  Warnings:

  - A unique constraint covering the columns `[template_id]` on the table `EmployeeEvaluationTemplateParameterMapping` will be added. If there are existing duplicate values, this will fail.
  - Made the column `mapping_id` on table `EmployeeEvaluationParameterAssignment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parameter_id` on table `EmployeeEvaluationParameterAssignment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `template_id` on table `EmployeeEvaluationTemplateParameterMapping` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" DROP CONSTRAINT "EmployeeEvaluationParameterAssignment_mapping_id_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" DROP CONSTRAINT "EmployeeEvaluationParameterAssignment_parameter_id_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" DROP CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_template_id_fkey";

-- AlterTable
ALTER TABLE "EmployeeEvaluationParameterAssignment" ALTER COLUMN "mapping_id" SET NOT NULL,
ALTER COLUMN "parameter_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" ALTER COLUMN "template_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeEvaluationTemplateParameterMapping_template_id_key" ON "EmployeeEvaluationTemplateParameterMapping"("template_id");

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" ADD CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "EmployeeEvaluationTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" ADD CONSTRAINT "EmployeeEvaluationParameterAssignment_mapping_id_fkey" FOREIGN KEY ("mapping_id") REFERENCES "EmployeeEvaluationTemplateParameterMapping"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" ADD CONSTRAINT "EmployeeEvaluationParameterAssignment_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "EmployeeRatingParameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
