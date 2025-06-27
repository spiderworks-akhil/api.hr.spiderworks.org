-- CreateTable
CREATE TABLE "AwardProgram" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "expiry_date" TIMESTAMP(3),
    "thumbnail" TEXT,
    "is_active" INTEGER NOT NULL DEFAULT 0,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AwardProgram_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AwardProgram" ADD CONSTRAINT "AwardProgram_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardProgram" ADD CONSTRAINT "AwardProgram_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
