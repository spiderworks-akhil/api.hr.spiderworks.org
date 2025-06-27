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
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { EmployeeDocumentsService } from './employee-documents.service';
import { CreateEmployeeDocumentDto } from './dto/create-employee-document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee-document.dto';

function fileName(req, file, cb) {
  const uniqueSuffix =
    Date.now() + '_' + file.originalname.replace(/\s+/g, '_');
  cb(null, uniqueSuffix);
}

@Controller('employee-documents')
export class EmployeeDocumentsController {
  constructor(private readonly service: EmployeeDocumentsService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('document', {
      storage: diskStorage({
        destination: './uploads/hr/employeedocuments',
        filename: fileName,
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException('Only PDF and DOC/DOCX files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(
    @Body() dto: CreateEmployeeDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Document file is required');
    }
    dto.document = file.path.replace(/\\/g, '/');
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
  @UseInterceptors(
    FileInterceptor('document', {
      storage: diskStorage({
        destination: './uploads/hr/employeedocuments',
        filename: fileName,
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException('Only PDF and DOC/DOCX files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEmployeeDocumentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      dto.document = file.path.replace(/\\/g, '/');
    }
    if (!dto.employee_id) {
      throw new BadRequestException('Employee ID is required');
    }
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
