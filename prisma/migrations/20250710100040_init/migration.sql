-- CreateEnum
CREATE TYPE "RatingParameterType" AS ENUM ('STAR_RATING', 'DESCRIPTIVE');

-- AlterTable
ALTER TABLE "EmployeeRatingParameter" ADD COLUMN     "type" "RatingParameterType" NOT NULL DEFAULT 'STAR_RATING';
