import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EvaluationTemplateStatus } from '@prisma/client';

export class CreateEmployeeEvaluationTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  rate_by_self?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  rate_by_client?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  rate_by_manager?: number;

  @IsEnum(EvaluationTemplateStatus)
  @IsOptional()
  status?: EvaluationTemplateStatus;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
