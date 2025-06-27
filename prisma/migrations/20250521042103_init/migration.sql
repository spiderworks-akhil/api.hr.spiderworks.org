/*
  Warnings:

  - You are about to drop the column `date_of_birth` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `emergency_contacts` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `employment_status` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `has_account_portal_access` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `has_lead_portal_access` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `has_seo_portal_access` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `is_eligible_for_leaves` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `is_super_admin` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `late_sign_in_reporting_mails` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `permanent_address` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `reporting_mails` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `sign_out_reporting_mails` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `users_id` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `api_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `blog_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `facebook_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `has_accounts_portal_access` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `has_admin_portal_access` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `has_client_portal_access` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `has_hr_portal_access` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `has_inventory_portal_access` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `has_showcase_portal_access` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `has_super_admin_access` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `has_work_portal_access` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `instagram_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_accessed_projects_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_used_email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `loggedin_organisation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `manager_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `organisations_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `parant_organisations_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reporting_email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `view_subordinate_leads` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `celebrated_date_of_birth` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_users_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_manager_id_fkey";

-- DropIndex
DROP INDEX "Employee_users_id_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "date_of_birth",
DROP COLUMN "email",
DROP COLUMN "emergency_contacts",
DROP COLUMN "employment_status",
DROP COLUMN "has_account_portal_access",
DROP COLUMN "has_lead_portal_access",
DROP COLUMN "has_seo_portal_access",
DROP COLUMN "is_eligible_for_leaves",
DROP COLUMN "is_super_admin",
DROP COLUMN "late_sign_in_reporting_mails",
DROP COLUMN "permanent_address",
DROP COLUMN "phone_number",
DROP COLUMN "reporting_mails",
DROP COLUMN "sign_out_reporting_mails",
DROP COLUMN "users_id",
ADD COLUMN     "additional_manager_id" INTEGER,
ADD COLUMN     "blog_url" TEXT,
ADD COLUMN     "celebrated_date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "employee_type" TEXT,
ADD COLUMN     "facebook_url" TEXT,
ADD COLUMN     "has_accounts_portal_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "has_showcase_portal_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "instagram_url" TEXT,
ADD COLUMN     "last_sign_in_email" TEXT,
ADD COLUMN     "last_sign_out_email" TEXT,
ADD COLUMN     "linkedin_url" TEXT,
ADD COLUMN     "manager_id" INTEGER,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "office_phone" TEXT,
ADD COLUMN     "personal_email" TEXT,
ADD COLUMN     "personal_phone" TEXT,
ADD COLUMN     "reporting_email" TEXT,
ADD COLUMN     "subscription_token" TEXT,
ADD COLUMN     "user_id" INTEGER,
ADD COLUMN     "work_email" TEXT;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "api_token",
DROP COLUMN "blog_url",
DROP COLUMN "created_at",
DROP COLUMN "created_by",
DROP COLUMN "email_verified_at",
DROP COLUMN "facebook_url",
DROP COLUMN "has_accounts_portal_access",
DROP COLUMN "has_admin_portal_access",
DROP COLUMN "has_client_portal_access",
DROP COLUMN "has_hr_portal_access",
DROP COLUMN "has_inventory_portal_access",
DROP COLUMN "has_showcase_portal_access",
DROP COLUMN "has_super_admin_access",
DROP COLUMN "has_work_portal_access",
DROP COLUMN "instagram_url",
DROP COLUMN "last_accessed_projects_id",
DROP COLUMN "last_used_email",
DROP COLUMN "linkedin_url",
DROP COLUMN "loggedin_organisation",
DROP COLUMN "manager_id",
DROP COLUMN "organisations_id",
DROP COLUMN "parant_organisations_id",
DROP COLUMN "reporting_email",
DROP COLUMN "status",
DROP COLUMN "subscription_token",
DROP COLUMN "updated_at",
DROP COLUMN "updated_by",
DROP COLUMN "user_type",
DROP COLUMN "username",
DROP COLUMN "view_subordinate_leads";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_user_id_key" ON "Employee"("user_id");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_additional_manager_id_fkey" FOREIGN KEY ("additional_manager_id") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
