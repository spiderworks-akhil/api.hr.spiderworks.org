-- AlterTable
ALTER TABLE "EmployeeEvaluation" ADD COLUMN     "evaluation_remarks" TEXT,
ADD COLUMN     "improvements_suggested" TEXT,
ADD COLUMN     "is_open" INTEGER NOT NULL DEFAULT 0;
