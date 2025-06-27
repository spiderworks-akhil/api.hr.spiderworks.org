-- CreateTable
CREATE TABLE "AwardWinner" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "awarder_date" TIMESTAMP(3),
    "employee_id" INTEGER,
    "award_program_id" INTEGER,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AwardWinner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AwardWinner" ADD CONSTRAINT "AwardWinner_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWinner" ADD CONSTRAINT "AwardWinner_award_program_id_fkey" FOREIGN KEY ("award_program_id") REFERENCES "AwardProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWinner" ADD CONSTRAINT "AwardWinner_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWinner" ADD CONSTRAINT "AwardWinner_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
