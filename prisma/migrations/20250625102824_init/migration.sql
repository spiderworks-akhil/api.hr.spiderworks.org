-- CreateTable
CREATE TABLE "BoardMeeting" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "meeting_location" TEXT,
    "participants" TEXT,
    "agenda" TEXT,
    "meeting_minutes" TEXT,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardMeeting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BoardMeeting" ADD CONSTRAINT "BoardMeeting_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMeeting" ADD CONSTRAINT "BoardMeeting_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
