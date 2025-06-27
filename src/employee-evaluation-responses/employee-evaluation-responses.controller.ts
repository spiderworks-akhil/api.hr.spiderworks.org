import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Query,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { EmployeeEvaluationResponseService } from './employee-evaluation-responses.service';
import { CreateEmployeeEvaluationResponseDto } from './dto/create-employee-evaluation-response.dto';

@Controller('employee-evaluation-responses')
export class EmployeeEvaluationResponseController {
  constructor(private readonly service: EmployeeEvaluationResponseService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateEmployeeEvaluationResponseDto) {
    return this.service.create(dto);
  }

  @Get('list')
  async list(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('employeeEvaluationId') employeeEvaluationId: string,
  ) {
    const parsedPage = parseInt(page, 10);
    if (isNaN(parsedPage) || parsedPage < 1) {
      throw new BadRequestException(
        'Query parameter "page" must be a positive integer',
      );
    }

    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      throw new BadRequestException(
        'Query parameter "limit" must be a positive integer',
      );
    }

    const parsedEmployeeEvaluationId = parseInt(employeeEvaluationId, 10);
    if (isNaN(parsedEmployeeEvaluationId) || parsedEmployeeEvaluationId < 1) {
      throw new BadRequestException(
        'Query parameter "employeeEvaluationId" must be a positive integer',
      );
    }

    return this.service.findAll(
      parsedPage,
      parsedLimit,
      parsedEmployeeEvaluationId,
    );
  }
}
