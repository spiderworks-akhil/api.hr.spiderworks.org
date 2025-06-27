import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

enum GoalResult {
  NOT_STARTED = 'NOT_STARTED',
  ACHIEVED = 'ACHIEVED',
  PARTIALLY_ACHIEVED = 'PARTIALLY_ACHIEVED',
  NOT_ACHIEVED = 'NOT_ACHIEVED',
}

export class ReviewPerformanceGoalDto {
  @IsEnum(GoalResult)
  @IsOptional()
  result?: GoalResult;

  @IsString()
  @IsOptional()
  result_remarks?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  result_percentage_achieved?: number;

  @IsDateString()
  @IsOptional()
  achieved_date?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  green_star_count?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  red_star_count?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  reviewer_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
