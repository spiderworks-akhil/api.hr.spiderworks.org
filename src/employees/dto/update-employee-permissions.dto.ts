import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeePermissionsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  is_signin_mandatory?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  has_work_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  has_hr_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  has_client_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  has_inventory_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  has_super_admin_access?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  has_accounts_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  has_admin_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  has_showcase_portal_access?: number;
}
