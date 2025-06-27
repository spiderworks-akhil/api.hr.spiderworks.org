/*
  Warnings:

  - You are about to drop the `RatingParameter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RatingParameter" DROP CONSTRAINT "RatingParameter_created_by_fkey";

-- DropForeignKey
ALTER TABLE "RatingParameter" DROP CONSTRAINT "RatingParameter_updated_by_fkey";

-- DropTable
DROP TABLE "RatingParameter";

-- CreateTable
CREATE TABLE "EmployeeRatingParameter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ratable_by_client" INTEGER NOT NULL DEFAULT 0,
    "ratable_by_manager" INTEGER NOT NULL DEFAULT 0,
    "ratable_by_self" INTEGER NOT NULL DEFAULT 0,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeRatingParameter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeRatingParameter" ADD CONSTRAINT "EmployeeRatingParameter_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRatingParameter" ADD CONSTRAINT "EmployeeRatingParameter_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
