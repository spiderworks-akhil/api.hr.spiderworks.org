-- CreateTable
CREATE TABLE "EmployeeSkillHobby" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeSkillHobby_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeSkillHobby" ADD CONSTRAINT "EmployeeSkillHobby_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSkillHobby" ADD CONSTRAINT "EmployeeSkillHobby_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSkillHobby" ADD CONSTRAINT "EmployeeSkillHobby_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
