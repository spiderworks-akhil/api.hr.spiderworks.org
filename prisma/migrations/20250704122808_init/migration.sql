-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "RecruitmentStatus" AS ENUM ('REQUESTED', 'NOT_APPROVED', 'APPROVED', 'INTERVIEWING', 'HIRED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "RecruitmentRequest" (
    "id" SERIAL NOT NULL,
    "job_title" TEXT NOT NULL,
    "internal_requirement" TEXT,
    "public_job_post_content" TEXT,
    "estimated_hiring_days" INTEGER,
    "priority" "PriorityLevel" NOT NULL DEFAULT 'MEDIUM',
    "status" "RecruitmentStatus" NOT NULL DEFAULT 'REQUESTED',
    "hiring_remarks_by_hr" TEXT,
    "requested_by" INTEGER,
    "requested_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruitmentRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecruitmentRequest" ADD CONSTRAINT "RecruitmentRequest_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentRequest" ADD CONSTRAINT "RecruitmentRequest_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruitmentRequest" ADD CONSTRAINT "RecruitmentRequest_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
