/*
  Warnings:

  - You are about to drop the column `subscription_token` on the `Employee` table. All the data in the column will be lost.
  - Made the column `name` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `personal_email` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `personal_phone` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "subscription_token",
ALTER COLUMN "celebrated_date_of_birth" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "personal_email" SET NOT NULL,
ALTER COLUMN "personal_phone" SET NOT NULL;
