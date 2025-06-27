import { IsString, IsInt, IsOptional, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeEvaluationDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  template_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  evaluation_for_employee_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  evaluation_by_employee_id?: number;

  @IsString()
  @IsOptional()
  evaluation_by_name?: string;

  @IsEmail()
  @IsOptional()
  evaluation_by_email?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
