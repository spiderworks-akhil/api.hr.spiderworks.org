-- AddForeignKey
ALTER TABLE "RatingParameter" ADD CONSTRAINT "RatingParameter_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingParameter" ADD CONSTRAINT "RatingParameter_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
