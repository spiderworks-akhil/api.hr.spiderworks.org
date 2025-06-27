-- CreateEnum
CREATE TYPE "StarType" AS ENUM ('GREEN', 'RED');

-- CreateTable
CREATE TABLE "StarRating" (
    "id" SERIAL NOT NULL,
    "given_by_id" INTEGER,
    "given_to_id" INTEGER,
    "star_type" "StarType",
    "star_count" INTEGER,
    "label" TEXT,
    "target_id" INTEGER,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StarRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StarRating" ADD CONSTRAINT "StarRating_given_by_id_fkey" FOREIGN KEY ("given_by_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarRating" ADD CONSTRAINT "StarRating_given_to_id_fkey" FOREIGN KEY ("given_to_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarRating" ADD CONSTRAINT "StarRating_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarRating" ADD CONSTRAINT "StarRating_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
