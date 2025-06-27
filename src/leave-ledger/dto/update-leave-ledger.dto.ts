import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LeaveType } from 'src/leave-application/dto/leave-application-enums.dto';

export class UpdateLeaveLedgerDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  employee_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  leave_application_id?: number;

  @IsEnum(LeaveType)
  @IsOptional()
  leave_type?: LeaveType;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  count?: number;

  @IsDateString()
  @IsOptional()
  eligibility_date?: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
