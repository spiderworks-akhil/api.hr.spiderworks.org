import { IsEnum, IsNotEmpty } from 'class-validator';
import { $Enums } from '@prisma/client';

export class UpdateUserRoleDto {
  @IsEnum($Enums.UserRole)
  @IsNotEmpty()
  role: $Enums.UserRole;
}
