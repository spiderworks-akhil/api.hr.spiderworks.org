import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateComplianceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  last_filing_date?: string;

  @IsDateString()
  @IsOptional()
  next_due_date?: string;

  @IsString()
  @IsOptional()
  filing_instructions?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
