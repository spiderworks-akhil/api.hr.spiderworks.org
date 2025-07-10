import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum RatingParameterTypeDto {
  STAR_RATING = 'STAR_RATING',
  DESCRIPTIVE = 'DESCRIPTIVE',
}

export class CreateEmployeeRatingParameterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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

  @IsEnum(RatingParameterTypeDto)
  @IsOptional()
  type?: RatingParameterTypeDto;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
