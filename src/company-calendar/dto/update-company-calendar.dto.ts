import { IsInt, IsOptional, IsDateString, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCompanyCalendarDto {
  @IsDateString()
  @IsOptional()
  date?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  is_holiday?: number;

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
