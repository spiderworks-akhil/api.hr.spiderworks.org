import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeNoteDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id?: number;

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

  @IsOptional()
  @Type(() => Date)
  created_at?: Date;

  @IsOptional()
  @Type(() => Date)
  updated_at?: Date;
}
