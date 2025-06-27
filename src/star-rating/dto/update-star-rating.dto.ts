import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { StarType, EntityType } from './create-star-rating.dto';

export class UpdateStarRatingDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  given_by_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  given_to_id?: number;

  @IsEnum(StarType)
  @IsOptional()
  star_type?: StarType;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  star_count?: number;

  @IsString()
  @IsOptional()
  label?: string;

  @IsEnum(EntityType)
  @IsOptional()
  entity_type?: EntityType;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  entity_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
