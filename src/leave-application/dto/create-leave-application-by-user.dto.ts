import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  AttendanceType,
  LeaveType,
  ApprovalStatus,
} from './leave-application-enums.dto';

export class CreateLeaveApplicationByUserDto {
  @IsInt()
  @Type(() => Number)
  user_id: number;

  @IsEnum(AttendanceType)
  @IsOptional()
  attendance_type?: AttendanceType;

  @IsEnum(LeaveType)
  @IsOptional()
  leave_type?: LeaveType;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsDateString()
  @IsOptional()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  count?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  manager_id?: number;

  @IsEnum(ApprovalStatus)
  @IsOptional()
  manager_approval_status?: ApprovalStatus;

  @IsDateString()
  @IsOptional()
  manager_review_date?: string;

  @IsString()
  @IsOptional()
  manager_remarks?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  hr_id?: number;

  @IsEnum(ApprovalStatus)
  @IsOptional()
  hr_approval_status?: ApprovalStatus;

  @IsDateString()
  @IsOptional()
  hr_review_date?: string;

  @IsString()
  @IsOptional()
  hr_remarks?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
