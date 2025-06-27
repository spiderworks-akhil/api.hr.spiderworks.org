import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateBoardMeetingDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  meeting_location?: string;

  @IsString()
  @IsOptional()
  participants?: string;

  @IsString()
  @IsOptional()
  agenda?: string;

  @IsString()
  @IsOptional()
  meeting_minutes?: string;

  @IsOptional()
  created_by?: number;

  @IsOptional()
  updated_by?: number;
}
