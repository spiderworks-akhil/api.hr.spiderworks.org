import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAwardProgramDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  expiry_date?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  is_active?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
