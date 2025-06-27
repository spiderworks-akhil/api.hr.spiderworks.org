/*
  Warnings:

  - You are about to drop the column `parent_organisation_id` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Document` table. All the data in the column will be lost.
  - The `permission` column on the `Document` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `priority` on the `DocumentCategory` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `DocumentCategory` table. All the data in the column will be lost.
  - Added the required column `name` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PermissionType" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "parent_organisation_id",
DROP COLUMN "priority",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "permission",
ADD COLUMN     "permission" "PermissionType" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "DocumentCategory" DROP COLUMN "priority",
DROP COLUMN "status";

-- CreateTable
CREATE TABLE "_EmployeeDocumentAccess" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EmployeeDocumentAccess_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EmployeeDocumentAccess_B_index" ON "_EmployeeDocumentAccess"("B");

-- AddForeignKey
ALTER TABLE "DocumentCategory" ADD CONSTRAINT "DocumentCategory_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentCategory" ADD CONSTRAINT "DocumentCategory_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_document_category_id_fkey" FOREIGN KEY ("document_category_id") REFERENCES "DocumentCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeDocumentAccess" ADD CONSTRAINT "_EmployeeDocumentAccess_A_fkey" FOREIGN KEY ("A") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeDocumentAccess" ADD CONSTRAINT "_EmployeeDocumentAccess_B_fkey" FOREIGN KEY ("B") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
