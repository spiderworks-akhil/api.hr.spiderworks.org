import {
  IsString,
  IsOptional,
  IsInt,
  IsEmail,
  IsDateString,
  IsNotEmpty,
  Min,
  Max,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Type(() => Number) // Transform to number
  id: number;

  @IsOptional()
  @IsString()
  @Type(() => String) // Transform to string
  employee_code?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  personal_email?: string;

  @IsOptional()
  @IsEmail()
  work_email?: string;

  @IsOptional()
  @IsString()
  personal_phone?: string;

  @IsOptional()
  @IsString()
  office_phone?: string;

  @IsOptional()
  @IsDateString()
  official_date_of_birth?: string;

  @IsOptional()
  @IsDateString()
  celebrated_date_of_birth?: string;

  @IsOptional()
  @IsDateString()
  marriage_date?: string;

  @IsOptional()
  @IsDateString()
  joining_date?: string;

  @IsOptional()
  @IsDateString()
  releaving_date?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  employee_level_id?: number;

  @IsOptional()
  @IsString()
  employee_type?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsString()
  reporting_email?: string;

  @IsOptional()
  @IsString()
  last_sign_in_email?: string;

  @IsOptional()
  @IsString()
  last_sign_out_email?: string;

  @IsOptional()
  @IsString()
  leave_notification_mails?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  is_signin_mandatory?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_work_portal_access?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_hr_portal_access?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_client_portal_access?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_inventory_portal_access?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_super_admin_access?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_accounts_portal_access?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_admin_portal_access?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_showcase_portal_access?: number = 0;

  @IsOptional()
  @IsString()
  facebook_url?: string;

  @IsOptional()
  @IsString()
  instagram_url?: string;

  @IsOptional()
  @IsString()
  linkedin_url?: string;

  @IsOptional()
  @IsString()
  blog_url?: string;

  @IsOptional()
  @IsString()
  selfi_photo?: string;

  @IsOptional()
  @IsString()
  family_photo?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsDateString()
  confirmation_date?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  departments_id?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  employee_roles_id?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  manager_id?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  additional_manager_ids?: number[];

  @IsOptional()
  @IsInt()
  @Min(1)
  created_by?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  updated_by?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number) // Transform to number
  user_id?: number;
}
