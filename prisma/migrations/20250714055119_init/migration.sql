-- DropForeignKey
ALTER TABLE "AwardProgram" DROP CONSTRAINT "AwardProgram_created_by_fkey";

-- DropForeignKey
ALTER TABLE "AwardProgram" DROP CONSTRAINT "AwardProgram_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "AwardWinner" DROP CONSTRAINT "AwardWinner_created_by_fkey";

-- DropForeignKey
ALTER TABLE "AwardWinner" DROP CONSTRAINT "AwardWinner_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "BoardMeeting" DROP CONSTRAINT "BoardMeeting_created_by_fkey";

-- DropForeignKey
ALTER TABLE "BoardMeeting" DROP CONSTRAINT "BoardMeeting_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "CompanyCalendar" DROP CONSTRAINT "CompanyCalendar_created_by_fkey";

-- DropForeignKey
ALTER TABLE "CompanyCalendar" DROP CONSTRAINT "CompanyCalendar_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "Compliance" DROP CONSTRAINT "Compliance_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Compliance" DROP CONSTRAINT "Compliance_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "DocumentCategory" DROP CONSTRAINT "DocumentCategory_created_by_fkey";

-- DropForeignKey
ALTER TABLE "DocumentCategory" DROP CONSTRAINT "DocumentCategory_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeDocument" DROP CONSTRAINT "EmployeeDocument_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeDocument" DROP CONSTRAINT "EmployeeDocument_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEmergencyContact" DROP CONSTRAINT "EmployeeEmergencyContact_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEmergencyContact" DROP CONSTRAINT "EmployeeEmergencyContact_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluation" DROP CONSTRAINT "EmployeeEvaluation_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluation" DROP CONSTRAINT "EmployeeEvaluation_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationResponse" DROP CONSTRAINT "EmployeeEvaluationResponse_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationResponse" DROP CONSTRAINT "EmployeeEvaluationResponse_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationTemplate" DROP CONSTRAINT "EmployeeEvaluationTemplate_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationTemplate" DROP CONSTRAINT "EmployeeEvaluationTemplate_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" DROP CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" DROP CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeLevel" DROP CONSTRAINT "EmployeeLevel_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeLevel" DROP CONSTRAINT "EmployeeLevel_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeNote" DROP CONSTRAINT "EmployeeNote_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeNote" DROP CONSTRAINT "EmployeeNote_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeePhoto" DROP CONSTRAINT "EmployeePhoto_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeePhoto" DROP CONSTRAINT "EmployeePhoto_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeRatingParameter" DROP CONSTRAINT "EmployeeRatingParameter_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeRatingParameter" DROP CONSTRAINT "EmployeeRatingParameter_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSalaryRevision" DROP CONSTRAINT "EmployeeSalaryRevision_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSalaryRevision" DROP CONSTRAINT "EmployeeSalaryRevision_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSkillHobby" DROP CONSTRAINT "EmployeeSkillHobby_created_by_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSkillHobby" DROP CONSTRAINT "EmployeeSkillHobby_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_created_by_fkey";

-- DropForeignKey
ALTER TABLE "LeaveApplication" DROP CONSTRAINT "LeaveApplication_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "LeaveLedger" DROP CONSTRAINT "LeaveLedger_created_by_fkey";

-- DropForeignKey
ALTER TABLE "LeaveLedger" DROP CONSTRAINT "LeaveLedger_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "PeerFeedback" DROP CONSTRAINT "PeerFeedback_created_by_fkey";

-- DropForeignKey
ALTER TABLE "PeerFeedback" DROP CONSTRAINT "PeerFeedback_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "PerformanceGoal" DROP CONSTRAINT "PerformanceGoal_created_by_fkey";

-- DropForeignKey
ALTER TABLE "PerformanceGoal" DROP CONSTRAINT "PerformanceGoal_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "StarRating" DROP CONSTRAINT "StarRating_created_by_fkey";

-- DropForeignKey
ALTER TABLE "StarRating" DROP CONSTRAINT "StarRating_updated_by_fkey";

-- AddForeignKey
ALTER TABLE "EmployeeDocument" ADD CONSTRAINT "EmployeeDocument_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeDocument" ADD CONSTRAINT "EmployeeDocument_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSkillHobby" ADD CONSTRAINT "EmployeeSkillHobby_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSkillHobby" ADD CONSTRAINT "EmployeeSkillHobby_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEmergencyContact" ADD CONSTRAINT "EmployeeEmergencyContact_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEmergencyContact" ADD CONSTRAINT "EmployeeEmergencyContact_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeePhoto" ADD CONSTRAINT "EmployeePhoto_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeePhoto" ADD CONSTRAINT "EmployeePhoto_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeNote" ADD CONSTRAINT "EmployeeNote_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeNote" ADD CONSTRAINT "EmployeeNote_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeLevel" ADD CONSTRAINT "EmployeeLevel_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeLevel" ADD CONSTRAINT "EmployeeLevel_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentCategory" ADD CONSTRAINT "DocumentCategory_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentCategory" ADD CONSTRAINT "DocumentCategory_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRatingParameter" ADD CONSTRAINT "EmployeeRatingParameter_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeRatingParameter" ADD CONSTRAINT "EmployeeRatingParameter_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerFeedback" ADD CONSTRAINT "PeerFeedback_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerFeedback" ADD CONSTRAINT "PeerFeedback_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardProgram" ADD CONSTRAINT "AwardProgram_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardProgram" ADD CONSTRAINT "AwardProgram_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWinner" ADD CONSTRAINT "AwardWinner_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWinner" ADD CONSTRAINT "AwardWinner_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSalaryRevision" ADD CONSTRAINT "EmployeeSalaryRevision_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSalaryRevision" ADD CONSTRAINT "EmployeeSalaryRevision_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplate" ADD CONSTRAINT "EmployeeEvaluationTemplate_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplate" ADD CONSTRAINT "EmployeeEvaluationTemplate_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" ADD CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationTemplateParameterMapping" ADD CONSTRAINT "EmployeeEvaluationTemplateParameterMapping_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluation" ADD CONSTRAINT "EmployeeEvaluation_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluation" ADD CONSTRAINT "EmployeeEvaluation_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationResponse" ADD CONSTRAINT "EmployeeEvaluationResponse_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeEvaluationResponse" ADD CONSTRAINT "EmployeeEvaluationResponse_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceGoal" ADD CONSTRAINT "PerformanceGoal_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceGoal" ADD CONSTRAINT "PerformanceGoal_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarRating" ADD CONSTRAINT "StarRating_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarRating" ADD CONSTRAINT "StarRating_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compliance" ADD CONSTRAINT "Compliance_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compliance" ADD CONSTRAINT "Compliance_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMeeting" ADD CONSTRAINT "BoardMeeting_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardMeeting" ADD CONSTRAINT "BoardMeeting_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveLedger" ADD CONSTRAINT "LeaveLedger_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveLedger" ADD CONSTRAINT "LeaveLedger_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCalendar" ADD CONSTRAINT "CompanyCalendar_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyCalendar" ADD CONSTRAINT "CompanyCalendar_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
