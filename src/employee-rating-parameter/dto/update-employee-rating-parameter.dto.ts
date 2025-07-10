import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { RatingParameterTypeDto } from './create-employee-rating-parameter.dto';

export class UpdateEmployeeRatingParameterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(RatingParameterTypeDto)
  @IsOptional()
  type?: RatingParameterTypeDto;

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
