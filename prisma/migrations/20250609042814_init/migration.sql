-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_additional_manager_id_fkey";

-- CreateTable
CREATE TABLE "_AdditionalManagers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AdditionalManagers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AdditionalManagers_B_index" ON "_AdditionalManagers"("B");

-- AddForeignKey
ALTER TABLE "_AdditionalManagers" ADD CONSTRAINT "_AdditionalManagers_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalManagers" ADD CONSTRAINT "_AdditionalManagers_B_fkey" FOREIGN KEY ("B") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
