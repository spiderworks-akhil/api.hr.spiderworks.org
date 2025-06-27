import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class UpdateEmployeePermissionsDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  is_signin_mandatory?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_work_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_hr_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_client_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_inventory_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_super_admin_access?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_accounts_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_admin_portal_access?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1)
  has_showcase_portal_access?: number;
}
