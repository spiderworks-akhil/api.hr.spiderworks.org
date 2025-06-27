-- CreateEnum
CREATE TYPE "EvaluationTemplateStatus" AS ENUM ('Draft', 'Active', 'Cancelled');

-- CreateTable
CREATE TABLE "EmployeeEvaluationTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rate_by_self" INTEGER DEFAULT 0,
    "rate_by_client" INTEGER DEFAULT 0,
    "rate_by_manager" INTEGER DEFAULT 0,
    "status" "EvaluationTemplateStatus" DEFAULT 'Draft',
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeEvaluationTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplate" ADD CONSTRAINT "EmployeeEvaluationTemplate_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplate" ADD CONSTRAINT "EmployeeEvaluationTemplate_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
