import {
  IsInt,
  IsString,
  IsOptional,
  IsEmail,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { $Enums } from '@prisma/client';

export class CreateUserDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum($Enums.UserRole)
  @IsOptional()
  role?: $Enums.UserRole;
}
