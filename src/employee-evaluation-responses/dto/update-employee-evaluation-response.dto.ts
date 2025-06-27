import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeEvaluationResponseDto } from './create-employee-evaluation-response.dto';

export class UpdateEmployeeEvaluationResponseDto extends PartialType(
  CreateEmployeeEvaluationResponseDto,
) {}
