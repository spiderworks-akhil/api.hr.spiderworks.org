import { IsString, IsInt, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAwardProgramDto {
  @IsString()
  @IsOptional()
  title?: string;

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
