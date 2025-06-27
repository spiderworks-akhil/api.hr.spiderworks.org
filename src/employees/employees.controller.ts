import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateEmployeePermissionsDto } from './dto/update-employee-permissions.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateEmployeeDto) {
    return this.employeesService.create(dto);
  }

  @Get('list')
  async list(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('keyword') keyword: string = '',
    @Query('employee_role') employeeRole?: string,
    @Query('employee_level') employeeLevel?: string,
    @Query('employee_type') employeeType?: string,
    @Query('department') department?: string,
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

    return this.employeesService.getAllEmployees(
      parsedPage,
      parsedLimit,
      keyword,
      employeeRole,
      employeeLevel,
      employeeType,
      department,
    );
  }

  @Get('view/:id')
  async view(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.getEmployeeById(id);
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
    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.delete(id);
  }

  @Put('permissions')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async updatePermissions(
    @Query('id', ParseIntPipe) id: number,
    @Body() permissionsDto: UpdateEmployeePermissionsDto,
  ) {
    return this.employeesService.updatePermissions(id, permissionsDto);
  }

  @Put('permissions/update')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async updatePermissionsAlt(
    @Query('id', ParseIntPipe) id: number,
    @Body() permissionsDto: UpdateEmployeePermissionsDto,
  ) {
    return this.employeesService.updatePermissions(id, permissionsDto);
  }
}
