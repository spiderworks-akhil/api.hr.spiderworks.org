import {
  IsInt,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { $Enums } from '@prisma/client';

export class CreateRecruitmentRequestDto {
  @IsString()
  @IsNotEmpty()
  job_title: string;

  @IsString()
  @IsOptional()
  internal_requirement?: string;

  @IsString()
  @IsOptional()
  public_job_post_content?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  estimated_hiring_days?: number;

  @IsEnum($Enums.PriorityLevel)
  @IsOptional()
  priority?: $Enums.PriorityLevel;

  @IsEnum($Enums.RecruitmentStatus)
  @IsOptional()
  status?: $Enums.RecruitmentStatus;

  @IsString()
  @IsOptional()
  hiring_remarks_by_hr?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  requested_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
