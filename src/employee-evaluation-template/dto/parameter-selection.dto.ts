import { IsInt, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ParameterAssignmentDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  parameter_id: number;
}

export class ParameterSelectionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParameterAssignmentDto)
  parameters: ParameterAssignmentDto[];
}
