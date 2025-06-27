import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeNoteDto {
  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  employee_id: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;
}
