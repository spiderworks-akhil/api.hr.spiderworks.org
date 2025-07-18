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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EmployeeNoteService } from './employee-note.service';
import { CreateEmployeeNoteDto } from './dto/create-employee-note.dto';
import { UpdateEmployeeNoteDto } from './dto/update-employee-note.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';

function parseExcelDate(dateVal: any): Date | undefined {
  if (!dateVal) {
    return undefined;
  }

  if (typeof dateVal === 'string') {
    let y: number,
      m: number,
      d: number,
      H = 0,
      M = 0,
      S = 0;
    const [datePart, timePart] = dateVal.split(' ');
    if (timePart) {
      [H, M, S] = timePart.split(':').map(Number);
    }
    if (datePart.includes('-')) {
      const [yStr, mStr, dStr] = datePart.split('-').map(Number);
      if (yStr > 1000) {
        y = yStr;
        m = mStr;
        d = dStr;
      } else {
        d = yStr;
        m = mStr;
        y = dStr;
      }
    } else if (datePart.includes('/')) {
      const [dStr, mStr, yStr] = datePart.split('/').map(Number);
      d = dStr;
      m = mStr;
      y = yStr;
    } else {
      console.log('Invalid date format:', datePart);
      return undefined;
    }
    if (isNaN(y) || isNaN(m) || isNaN(d)) {
      console.log('Invalid date components:', { y, m, d });
      return undefined;
    }
    const result = new Date(Date.UTC(y, m - 1, d, H, M, S));
    console.log('parseExcelDate string output:', result);
    return result;
  }

  if (typeof dateVal === 'number') {
    const excelEpoch = new Date(1899, 11, 30);
    const utcDate = new Date(excelEpoch.getTime() + dateVal * 86400000);
    const result = new Date(
      Date.UTC(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        0,
        0,
        0,
      ),
    );
    console.log('parseExcelDate number output:', result);
    return result;
  }

  if (dateVal instanceof Date) {
    const utcDate = new Date(dateVal.getTime() + 24 * 60 * 60 * 1000);
    const result = new Date(
      Date.UTC(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
        0,
        0,
        0,
      ),
    );
    console.log('parseExcelDate Date output:', result);
    return result;
  }

  console.log('Unsupported dateVal type:', typeof dateVal);
  return undefined;
}

@Controller('employee-note')
export class EmployeeNoteController {
  constructor(private readonly service: EmployeeNoteService) {}

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async importNotes(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    if (
      !file.mimetype.includes('excel') &&
      !file.mimetype.includes('spreadsheetml')
    ) {
      throw new BadRequestException('Only Excel (XLSX) files are supported');
    }
    const workbook = XLSX.read(file.buffer, {
      type: 'buffer',
      cellDates: true,
    });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const records: any[] = XLSX.utils.sheet_to_json(sheet);

    const results: { row: number; note: any }[] = [];
    const errors: { row: number; error: string }[] = [];

    for (const [index, record] of records.entries()) {
      try {
        if (
          !('ID' in record) ||
          !('EmployeeId' in record) ||
          !('Remarks' in record) ||
          !('Updated_by' in record) ||
          !('Date' in record)
        ) {
          throw new Error(
            `Row format incorrect at row ${index + 2}: Required columns (ID, EmployeeId, Remarks, Updated_by, Date) are missing`,
          );
        }

        const dto = {
          id: record.ID,
          employee_id: record.EmployeeId,
          notes: record.Remarks,
          created_by: record.Created_by,
          updated_by: record.Updated_by,
          created_at: record.Date ? parseExcelDate(record.Date) : undefined,
          updated_at: record.Date ? parseExcelDate(record.Date) : undefined,
        };

        if (!dto.id || !dto.employee_id || !dto.notes) {
          throw new Error('Missing required fields (ID, EmployeeId, Remarks)');
        }

        const existing = await this.service['prisma'].employeeNote.findUnique({
          where: { id: dto.id },
        });
        if (existing) {
          errors.push({
            row: index + 2,
            error: `Skipped: Note with ID ${dto.id} already exists`,
          });
          continue;
        }
        const result = await this.service.create(dto);
        results.push({ row: index + 2, note: result.employeeNote });
      } catch (error) {
        errors.push({ row: index + 2, error: error.message });
      }
    }
    return {
      message: errors.length > 0 ? 'Import failed' : 'Import completed',
      successful: results,
      errors,
      totalProcessed: records.length,
      totalErrors: errors.length,
    };
  }

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateEmployeeNoteDto) {
    if (!dto.employee_id) {
      throw new BadRequestException('Employee ID is required');
    }
    return this.service.create(dto);
  }

  @Get('list/:id')
  async list(
    @Param('id', ParseIntPipe) employee_id: number,
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    page: number = 1,
    @Query('limit', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    limit: number = 10,
    @Query('keyword') keyword: string = '',
  ) {
    return this.service.findAll(employee_id, page, limit, keyword);
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
    @Body() dto: UpdateEmployeeNoteDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
