-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "users_id" INTEGER NOT NULL,
    "employee_id" INTEGER,
    "departments_id" INTEGER NOT NULL,
    "employee_roles_id" INTEGER NOT NULL,
    "phone_number" TEXT,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "permanent_address" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "official_date_of_birth" TIMESTAMP(3) NOT NULL,
    "marriage_date" TIMESTAMP(3),
    "emergency_contacts" TEXT,
    "joining_date" TIMESTAMP(3) NOT NULL,
    "releaving_date" TIMESTAMP(3),
    "remarks" TEXT,
    "reporting_mails" TEXT,
    "late_sign_in_reporting_mails" TEXT,
    "sign_out_reporting_mails" TEXT,
    "leave_notification_mails" TEXT,
    "is_super_admin" BOOLEAN NOT NULL DEFAULT false,
    "employee_level" TEXT,
    "employment_status" TEXT,
    "is_eligible_for_leaves" BOOLEAN NOT NULL DEFAULT true,
    "selfi_photo" TEXT,
    "family_photo" TEXT,
    "is_signin_mandatory" BOOLEAN NOT NULL DEFAULT true,
    "has_work_portal_access" BOOLEAN NOT NULL DEFAULT false,
    "has_hr_portal_access" BOOLEAN NOT NULL DEFAULT false,
    "has_seo_portal_access" BOOLEAN NOT NULL DEFAULT false,
    "has_lead_portal_access" BOOLEAN NOT NULL DEFAULT false,
    "has_client_portal_access" BOOLEAN NOT NULL DEFAULT false,
    "has_inventory_portal_access" BOOLEAN NOT NULL DEFAULT false,
    "has_super_admin_access" BOOLEAN NOT NULL DEFAULT false,
    "has_account_portal_access" BOOLEAN NOT NULL DEFAULT false,
    "has_admin_portal_access" BOOLEAN NOT NULL DEFAULT false,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_users_id_key" ON "Employee"("users_id");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departments_id_fkey" FOREIGN KEY ("departments_id") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employee_roles_id_fkey" FOREIGN KEY ("employee_roles_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
