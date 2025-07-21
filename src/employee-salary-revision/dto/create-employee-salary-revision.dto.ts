import {
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeSalaryRevisionDto {
  @IsInt()
  version: number;

  @IsInt()
  employee_id: number;

  @IsDateString()
  @IsOptional()
  effective_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsNumber()
  basic_pay: number;

  @IsNumber()
  @IsOptional()
  tds_deduction_amount?: number;

  @IsNumber()
  @IsOptional()
  esi_employee_share?: number;

  @IsNumber()
  @IsOptional()
  esi_employer_share?: number;

  @IsNumber()
  @IsOptional()
  pf_employee_share?: number;

  @IsNumber()
  @IsOptional()
  pf_employer_share?: number;

  @IsNumber()
  @IsOptional()
  hra?: number;

  @IsNumber()
  @IsOptional()
  travel_allowance?: number;

  @IsNumber()
  @IsOptional()
  other_allowance?: number;

  @IsNumber()
  @IsOptional()
  grand_total?: number;

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
