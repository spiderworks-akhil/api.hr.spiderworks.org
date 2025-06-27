-- CreateEnum
CREATE TYPE "AttendanceType" AS ENUM ('FULL_DAY', 'HALF_DAY');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('CASUAL_LEAVE', 'SICK_LEAVE', 'COMPENSATORY_LEAVE', 'SPECIAL_LEAVE');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('NOT_REVIEWED', 'APPROVED', 'REJECTED', 'PENDING');

-- CreateTable
CREATE TABLE "LeaveApplication" (
    "id" SERIAL NOT NULL,
    "attendance_type" "AttendanceType",
    "leave_type" "LeaveType",
    "reason" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "count" DOUBLE PRECISION,
    "manager_id" INTEGER,
    "manager_approval_status" "ApprovalStatus" DEFAULT 'NOT_REVIEWED',
    "manager_review_date" TIMESTAMP(3),
    "manager_remarks" TEXT,
    "hr_id" INTEGER,
    "hr_approval_status" "ApprovalStatus" DEFAULT 'NOT_REVIEWED',
    "hr_review_date" TIMESTAMP(3),
    "hr_remarks" TEXT,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeaveApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_hr_id_fkey" FOREIGN KEY ("hr_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
