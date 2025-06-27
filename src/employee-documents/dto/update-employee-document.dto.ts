import { IsString, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeeDocumentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  employee_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
