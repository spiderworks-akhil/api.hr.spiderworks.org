/*
  Warnings:

  - You are about to drop the column `status` on the `Department` table. All the data in the column will be lost.
  - Made the column `created_at` on table `Role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Role` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Department" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
