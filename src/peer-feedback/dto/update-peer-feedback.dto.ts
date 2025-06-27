import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePeerFeedbackDto {
  @IsString()
  @IsOptional()
  feedback?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  provided_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  provided_to?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
