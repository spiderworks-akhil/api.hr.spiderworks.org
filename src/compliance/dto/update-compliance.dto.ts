import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateComplianceDto {
  @IsString()
  @IsOptional()
  title?: string;

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

  @IsOptional()
  created_by?: number;

  @IsOptional()
  updated_by?: number;
}
