/*
  Warnings:

  - Added the required column `name` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "department_head_id" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parent_id" INTEGER,
ADD COLUMN     "status" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_by" INTEGER;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "priority" INTEGER,
ADD COLUMN     "status" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "api_token" TEXT,
ADD COLUMN     "blog_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "email_verified_at" TIMESTAMP(3),
ADD COLUMN     "facebook_url" TEXT,
ADD COLUMN     "has_accounts_portal_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_admin_portal_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_client_portal_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_hr_portal_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_inventory_portal_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_showcase_portal_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_super_admin_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_work_portal_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "instagram_url" TEXT,
ADD COLUMN     "last_accessed_projects_id" INTEGER,
ADD COLUMN     "last_used_email" TEXT,
ADD COLUMN     "linkedin_url" TEXT,
ADD COLUMN     "loggedin_organisation" INTEGER,
ADD COLUMN     "manager_id" INTEGER,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "organisations_id" INTEGER,
ADD COLUMN     "parant_organisations_id" INTEGER,
ADD COLUMN     "reporting_email" TEXT,
ADD COLUMN     "status" INTEGER,
ADD COLUMN     "subscription_token" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_by" INTEGER,
ADD COLUMN     "user_type" TEXT,
ADD COLUMN     "username" TEXT,
ADD COLUMN     "view_subordinate_leads" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
