import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDateString,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePerformanceGoalDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  reviewer_id?: number;

  @IsDateString()
  @IsOptional()
  target_date?: string;

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
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  user_ids: number[];
}
