/*
  Warnings:

  - You are about to drop the column `percentage_achieved` on the `PerformanceGoal` table. All the data in the column will be lost.
  - You are about to drop the column `target_id` on the `StarRating` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GoalResult" AS ENUM ('NOT_STARTED', 'ACHIEVED', 'PARTIALLY_ACHIEVED', 'NOT_ACHIEVED');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('MANUAL', 'PERFORMANCE_GOAL');

-- AlterTable
ALTER TABLE "PerformanceGoal" DROP COLUMN "percentage_achieved",
ADD COLUMN     "green_star_count" INTEGER,
ADD COLUMN     "red_star_count" INTEGER,
ADD COLUMN     "result" "GoalResult",
ADD COLUMN     "result_percentage_achieved" INTEGER,
ADD COLUMN     "result_remarks" TEXT;

-- AlterTable
ALTER TABLE "StarRating" DROP COLUMN "target_id",
ADD COLUMN     "entity_id" INTEGER,
ADD COLUMN     "entity_type" "EntityType";

-- AddForeignKey
ALTER TABLE "StarRating" ADD CONSTRAINT "StarRating_entity_id_fkey" FOREIGN KEY ("entity_id") REFERENCES "PerformanceGoal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
