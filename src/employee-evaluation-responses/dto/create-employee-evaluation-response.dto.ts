import {
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class ParameterResponse {
  @IsInt()
  @Type(() => Number)
  parameter_mapping_id: number;

  @IsInt()
  @Type(() => Number)
  response_value: number;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateEmployeeEvaluationResponseDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  employee_evaluation_id?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParameterResponse)
  parameter_responses: ParameterResponse[];

  @IsString()
  @IsOptional()
  evaluation_remarks?: string;

  @IsString()
  @IsOptional()
  improvements_suggested?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
