-- CreateTable
CREATE TABLE "CompanyCalendar" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3),
    "is_holiday" INTEGER DEFAULT 0,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyCalendar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyCalendar" ADD CONSTRAINT "CompanyCalendar_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCalendar" ADD CONSTRAINT "CompanyCalendar_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
