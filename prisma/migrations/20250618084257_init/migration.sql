-- CreateTable
CREATE TABLE "EmployeeEvaluationTemplateParameterMapping" (
    "id" SERIAL NOT NULL,
    "template_id" INTEGER,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeEvaluationParameterAssignment" (
    "id" SERIAL NOT NULL,
    "mapping_id" INTEGER,
    "parameter_id" INTEGER,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "EmployeeEvaluationParameterAssignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" ADD CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "EmployeeEvaluationTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" ADD CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" ADD CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" ADD CONSTRAINT "EmployeeEvaluationParameterAssignment_mapping_id_fkey" FOREIGN KEY ("mapping_id") REFERENCES "EmployeeEvaluationTemplateParameterMapping"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" ADD CONSTRAINT "EmployeeEvaluationParameterAssignment_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "EmployeeRatingParameter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" ADD CONSTRAINT "EmployeeEvaluationParameterAssignment_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationParameterAssignment" ADD CONSTRAINT "EmployeeEvaluationParameterAssignment_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
