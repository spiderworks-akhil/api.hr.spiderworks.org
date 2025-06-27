/*
  Warnings:

  - Made the column `title` on table `BoardMeeting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BoardMeeting" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT 'Director Board Meeting',
ALTER COLUMN "date" DROP NOT NULL;
