/*
  Warnings:

  - The `is_signin_mandatory` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `has_work_portal_access` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `has_hr_portal_access` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `has_client_portal_access` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `has_inventory_portal_access` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `has_super_admin_access` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `has_admin_portal_access` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `has_accounts_portal_access` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `has_showcase_portal_access` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "is_signin_mandatory",
ADD COLUMN     "is_signin_mandatory" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "has_work_portal_access",
ADD COLUMN     "has_work_portal_access" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "has_hr_portal_access",
ADD COLUMN     "has_hr_portal_access" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "has_client_portal_access",
ADD COLUMN     "has_client_portal_access" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "has_inventory_portal_access",
ADD COLUMN     "has_inventory_portal_access" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "has_super_admin_access",
ADD COLUMN     "has_super_admin_access" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "has_admin_portal_access",
ADD COLUMN     "has_admin_portal_access" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "has_accounts_portal_access",
ADD COLUMN     "has_accounts_portal_access" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "has_showcase_portal_access",
ADD COLUMN     "has_showcase_portal_access" INTEGER NOT NULL DEFAULT 0;
