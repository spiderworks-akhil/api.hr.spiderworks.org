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

// interface ExcelRow {
//   id?: number;
//   UserId?: number;
//   EmployeeCode?: string;
//   FullName: string;
//   PersonalEmail?: string;
//   WorkEmail?: string;
//   Phone?: string;
//   JoiningDate?: string | number;
//   ReleavingDate?: string | number;
//   Address?: string;
//   FacebookURL?: string;
//   Remarks?: string;
//   ReportingEmails?: string;
//   designation?: string;
//   confirmationDate?: string | number;
//   DepartmentId?: number;
//   CurrentEmployee?: number;
// }

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

  //   function parseExcelDate(dateVal: any): Date | undefined {
  //     if (!dateVal) {
  //       return undefined;
  //     }

  //     if (typeof dateVal === 'string') {
  //       let y: number,
  //         m: number,
  //         d: number,
  //         H = 0,
  //         M = 0,
  //         S = 0;
  //       const [datePart, timePart] = dateVal.split(' ');
  //       if (timePart) {
  //         [H, M, S] = timePart.split(':').map(Number);
  //       }
  //       if (datePart.includes('-')) {
  //         const [yStr, mStr, dStr] = datePart.split('-').map(Number);
  //         if (yStr > 1000) {
  //           y = yStr;
  //           m = mStr;
  //           d = dStr;
  //         } else {
  //           d = yStr;
  //           m = mStr;
  //           y = dStr;
  //         }
  //       } else if (datePart.includes('/')) {
  //         const [dStr, mStr, yStr] = datePart.split('/').map(Number);
  //         d = dStr;
  //         m = mStr;
  //         y = yStr;
  //       } else {
  //         return undefined;
  //       }
  //       if (isNaN(y) || isNaN(m) || isNaN(d)) {
  //         return undefined;
  //       }
  //       const result = new Date(Date.UTC(y, m - 1, d, H, M, S));
  //       return result;
  //     }

  //     if (typeof dateVal === 'number') {
  //       const excelEpoch = new Date(1899, 11, 30);
  //       const utcDate = new Date(excelEpoch.getTime() + dateVal * 86400000);
  //       const result = new Date(
  //         Date.UTC(
  //           utcDate.getUTCFullYear(),
  //           utcDate.getUTCMonth(),
  //           utcDate.getUTCDate(),
  //           0,
  //           0,
  //           0,
  //         ),
  //       );
  //       return result;
  //     }

  //     if (dateVal instanceof Date) {
  //       const utcDate = new Date(dateVal.getTime() + 24 * 60 * 60 * 1000);
  //       const result = new Date(
  //         Date.UTC(
  //           utcDate.getUTCFullYear(),
  //           utcDate.getUTCMonth(),
  //           utcDate.getUTCDate(),
  //           0,
  //           0,
  //           0,
  //         ),
  //       );
  //       return result;
  //     }

  //     return undefined;
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
  //     const joiningDate = parseExcelDate(record.JoiningDate);
  //     const confirmationDate = parseExcelDate(record.confirmationDate);
  //     const releavingDate = parseExcelDate(record.ReleavingDate);

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

  //     const employeeType =
  //       record.CurrentEmployee !== undefined
  //         ? Number(record.CurrentEmployee)
  //         : undefined;
  //     if (
  //       employeeType !== undefined &&
  //       (isNaN(employeeType) || ![0, 1].includes(employeeType))
  //     ) {
  //       throw new BadRequestException(
  //         `Invalid EmployeeType value in row ${index + 2}: ${record.FullName}. Must be 0 or 1.`,
  //       );
  //     }

  //     const remarks =
  //       record.Remarks !== undefined ? String(record.Remarks) : undefined;

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
  //       remarks: remarks,
  //       reporting_email: record.ReportingEmails || undefined,
  //       designation: record.designation || undefined,
  //       confirmation_date: confirmationDate
  //         ? confirmationDate.toISOString()
  //         : undefined,
  //       departments_id: record.DepartmentId || undefined,
  //       employee_type: employeeType,
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
    @Query('has_work_portal_access') hasWorkPortalAccess?: string,
    @Query('has_hr_portal_access') hasHrPortalAccess?: string,
    @Query('has_client_portal_access') hasClientPortalAccess?: string,
    @Query('has_inventory_portal_access') hasInventoryPortalAccess?: string,
    @Query('has_super_admin_access') hasSuperAdminAccess?: string,
    @Query('has_accounts_portal_access') hasAccountsPortalAccess?: string,
    @Query('has_admin_portal_access') hasAdminPortalAccess?: string,
    @Query('has_showcase_portal_access') hasShowcasePortalAccess?: string,
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
      hasWorkPortalAccess,
      hasHrPortalAccess,
      hasClientPortalAccess,
      hasInventoryPortalAccess,
      hasSuperAdminAccess,
      hasAccountsPortalAccess,
      hasAdminPortalAccess,
      hasShowcasePortalAccess,
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
