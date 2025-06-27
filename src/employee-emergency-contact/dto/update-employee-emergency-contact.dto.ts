import { IsString, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeeEmergencyContactDto {
  @IsString()
  @IsOptional()
  contact_name?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  relationship?: string;

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
