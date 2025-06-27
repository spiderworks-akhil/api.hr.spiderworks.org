-- CreateTable
CREATE TABLE "EmployeeEvaluationResponse" (
    "id" SERIAL NOT NULL,
    "employee_evaluation_id" INTEGER,
    "parameter_assignment_id" INTEGER,
    "response_value" INTEGER,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeEvaluationResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationResponse" ADD CONSTRAINT "EmployeeEvaluationResponse_employee_evaluation_id_fkey" FOREIGN KEY ("employee_evaluation_id") REFERENCES "EmployeeEvaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationResponse" ADD CONSTRAINT "EmployeeEvaluationResponse_parameter_assignment_id_fkey" FOREIGN KEY ("parameter_assignment_id") REFERENCES "EmployeeEvaluationParameterAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationResponse" ADD CONSTRAINT "EmployeeEvaluationResponse_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationResponse" ADD CONSTRAINT "EmployeeEvaluationResponse_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
