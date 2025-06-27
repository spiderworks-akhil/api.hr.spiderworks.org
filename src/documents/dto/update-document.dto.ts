import { IsString, IsInt, IsOptional, IsEnum, IsArray } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PermissionType } from '@prisma/client';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  document?: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsEnum(PermissionType)
  @IsOptional()
  permission?: PermissionType;

  @IsString()
  @IsOptional()
  status?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  document_category_id?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  created_by?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  updated_by?: number;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.map(Number) : [];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value.map(Number) : [];
  })
  @IsInt({ each: true })
  grantedAccess?: number[];
}
