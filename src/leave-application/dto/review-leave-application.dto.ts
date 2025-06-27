import { IsEnum, IsString, IsOptional } from 'class-validator';
import { ApprovalStatus } from './leave-application-enums.dto';

export class ReviewLeaveApplicationDto {
  @IsEnum(ApprovalStatus)
  approval_status: ApprovalStatus;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsOptional()
  updated_by?: number;
}
