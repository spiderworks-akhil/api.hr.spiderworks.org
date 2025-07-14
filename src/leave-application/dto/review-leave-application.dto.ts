import { IsEnum, IsString, IsOptional, IsInt } from 'class-validator';
import { ApprovalStatus } from './leave-application-enums.dto';
import { Type } from 'class-transformer';

export class ReviewLeaveApplicationDto {
  @IsEnum(ApprovalStatus)
  approval_status: ApprovalStatus;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
