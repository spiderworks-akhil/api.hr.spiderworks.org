-- DropForeignKey
ALTER TABLE "PeerFeedback" DROP CONSTRAINT "PeerFeedback_provided_by_fkey";

-- DropForeignKey
ALTER TABLE "PeerFeedback" DROP CONSTRAINT "PeerFeedback_provided_to_fkey";

-- AlterTable
ALTER TABLE "PeerFeedback" ALTER COLUMN "provided_by" DROP NOT NULL,
ALTER COLUMN "provided_to" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PeerFeedback" ADD CONSTRAINT "PeerFeedback_provided_by_fkey" FOREIGN KEY ("provided_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerFeedback" ADD CONSTRAINT "PeerFeedback_provided_to_fkey" FOREIGN KEY ("provided_to") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
