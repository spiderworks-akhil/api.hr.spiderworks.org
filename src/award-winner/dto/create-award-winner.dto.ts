import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAwardWinnerDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  awarder_date?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  employee_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  award_program_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
