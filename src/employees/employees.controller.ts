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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateEmployeePermissionsDto } from './dto/update-employee-permissions.dto';
import * as XLSX from 'xlsx';

interface ExcelRow {
  id?: number;
  UserId?: number;
  EmployeeCode?: string;
  FullName: string;
  PersonalEmail?: string;
  WorkEmail?: string;
  Phone?: string;
  JoiningDate?: string | number;
  ReleavingDate?: string | number;
  Address?: string;
  FacebookURL?: string;
  Remarks?: string;
  ReportingEmails?: string;
  designation?: string;
  confirmationDate?: string | number;
}

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // @Post('import')
  // @UseInterceptors(FileInterceptor('file'))
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // )
  // async importEmployees(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new BadRequestException('No file uploaded');
  //   }

  //   if (
  //     !file.mimetype.includes('excel') &&
  //     !file.mimetype.includes('spreadsheetml')
  //   ) {
  //     throw new BadRequestException('Only Excel (XLSX) files are supported');
  //   }

  //   const workbook = XLSX.read(file.buffer, {
  //     type: 'buffer',
  //     cellDates: true,
  //   });
  //   const sheetName = workbook.SheetNames[0];
  //   const sheet = workbook.Sheets[sheetName];
  //   const records: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);

  //   const employees: CreateEmployeeDto[] = [];

  //   for (const [index, record] of records.entries()) {
  //     const parseDate = (
  //       value: string | number | Date | undefined,
  //     ): Date | null => {
  //       if (!value) return null;
  //       if (value instanceof Date) {
  //         return isNaN(value.getTime()) ? null : value;
  //       }
  //       if (typeof value === 'number') {
  //         return new Date(XLSX.SSF.format(' yyyy-mm-dd ', value));
  //       }

  //       const match = String(value).match(/^(\d{2})\/(\d{2})\/(\d{2,4})$/);
  //       if (match) {
  //         const [_, month, day, year] = match;
  //         const fullYear =
  //           parseInt(year, 10) < 100
  //             ? parseInt(year, 10) < 50
  //               ? `20${year}`
  //               : `19${year}`
  //             : year;
  //         const date = new Date(`${fullYear}-${month}-${day}`);
  //         return isNaN(date.getTime()) ? null : date;
  //       }
  //       return null;
  //     };

  //     const joiningDate = parseDate(record.JoiningDate);
  //     const confirmationDate = parseDate(record.confirmationDate);
  //     const releavingDate = parseDate(record.ReleavingDate);

  //     if (record.JoiningDate && !joiningDate) {
  //       throw new BadRequestException(
  //         `Invalid JoiningDate in row ${index + 2}: ${record.FullName}`,
  //       );
  //     }
  //     if (record.confirmationDate && !confirmationDate) {
  //       throw new BadRequestException(
  //         `Invalid confirmationDate in row ${index + 2}: ${record.FullName}`,
  //       );
  //     }
  //     if (record.ReleavingDate && !releavingDate) {
  //       throw new BadRequestException(
  //         `Invalid ReleavingDate in row ${index + 2}: ${record.FullName}`,
  //       );
  //     }

  //     const phone =
  //       record.Phone && String(record.Phone) !== '#ERROR!'
  //         ? String(record.Phone)
  //         : undefined;

  //     const employeeDto: CreateEmployeeDto = {
  //       id: record.id ?? 0,
  //       user_id: record.UserId,
  //       employee_code: record.EmployeeCode || undefined,
  //       name: record.FullName,
  //       personal_email: record.PersonalEmail || undefined,
  //       work_email: record.WorkEmail || undefined,
  //       personal_phone: phone,
  //       joining_date: joiningDate ? joiningDate.toISOString() : undefined,
  //       releaving_date: releavingDate ? releavingDate.toISOString() : undefined,
  //       address: record.Address || undefined,
  //       facebook_url: record.FacebookURL || undefined,
  //       remarks: record.Remarks || undefined,
  //       reporting_email: record.ReportingEmails || undefined,
  //       designation: record.designation || undefined,
  //       confirmation_date: confirmationDate
  //         ? confirmationDate.toISOString()
  //         : undefined,
  //     };

  //     employees.push(employeeDto);
  //   }

  //   const results: { row: number; employee: any }[] = [];
  //   const errors: { row: number; error: string }[] = [];

  //   for (const [index, dto] of employees.entries()) {
  //     try {
  //       const result = await this.employeesService.create(dto);
  //       results.push({ row: index + 2, employee: result.employee });
  //     } catch (error) {
  //       errors.push({ row: index + 2, error: error.message });
  //     }
  //   }

  //   return {
  //     message: 'Import completed',
  //     successful: results,
  //     errors,
  //     totalProcessed: employees.length,
  //     totalErrors: errors.length,
  //   };
  // }

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async import(@Body() dto: CreateEmployeeDto) {
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
