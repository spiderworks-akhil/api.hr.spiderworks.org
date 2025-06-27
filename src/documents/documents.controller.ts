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
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

function fileName(req, file, cb) {
  const uniqueSuffix =
    Date.now() + '_' + file.originalname.replace(/\s+/g, '_');
  cb(null, uniqueSuffix);
}

@Controller('documents')
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/hr/document-images',
        filename: fileName,
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Only JPEG, PNG, and GIF files are allowed',
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.service.uploadImage(file);
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('document', {
      storage: diskStorage({
        destination: './uploads/hr/documents',
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
    @Body() dto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      dto.document = file.path.replace(/\\/g, '/');
    }
    return this.service.create(dto);
  }

  @Get('list')
  async list(
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    page: number = 1,
    @Query('limit', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    limit: number = 10,
    @Query('keyword') keyword: string = '',
    @Query('document_category_id', new ParseIntPipe({ optional: true }))
    document_category_id?: number,
  ) {
    return this.service.findAll(page, limit, keyword, document_category_id);
  }

  @Get('view/:id')
  async view(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put('update/:id')
  @UseInterceptors(
    FileInterceptor('document', {
      storage: diskStorage({
        destination: './uploads/hr/documents',
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
    @Body() dto: UpdateDocumentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      dto.document = file.path.replace(/\\/g, '/');
    }
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
