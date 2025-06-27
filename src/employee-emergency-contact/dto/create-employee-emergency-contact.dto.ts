import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeEmergencyContactDto {
  @IsString()
  @IsNotEmpty()
  contact_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  relationship: string;

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
