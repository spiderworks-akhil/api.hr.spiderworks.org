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
import { EmployeeSalaryRevisionService } from './employee-salary-revision.service';
import { CreateEmployeeSalaryRevisionDto } from './dto/create-employee-salary-revision.dto';
import { UpdateEmployeeSalaryRevisionDto } from './dto/update-employee-salary-revision.dto';

@Controller('employee-salary-revision')
export class EmployeeSalaryRevisionController {
  constructor(private readonly service: EmployeeSalaryRevisionService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateEmployeeSalaryRevisionDto) {
    return this.service.create(dto);
  }

  @Get('list/:id')
  async list(
    @Param('id', ParseIntPipe) employee_id: number,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('keyword') keyword: string = '',
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

    return this.service.findAll(employee_id, parsedPage, parsedLimit, keyword);
  }

  @Put('update/:id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEmployeeSalaryRevisionDto,
  ) {
    return this.service.update(id, dto);
  }

  @Put('set-active')
  async setActive(
    @Body('employee_id', ParseIntPipe) employeeId: number,
    @Body('salary_revision_id', ParseIntPipe) salaryRevisionId: number,
    @Body('notes') notes?: string,
    @Body('created_by', ParseIntPipe) createdBy?: number,
  ) {
    return this.service.setActiveSalaryRevision(employeeId, salaryRevisionId, notes, createdBy);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
