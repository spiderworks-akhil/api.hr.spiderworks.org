import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeeRatingParameterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  ratable_by_client?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  ratable_by_manager?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  ratable_by_self?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
