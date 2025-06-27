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
import { EmployeePhotosService } from './employee-photos.service';
import { CreateEmployeePhotoDto } from './dto/create-employee-photo.dto';
import { UpdateEmployeePhotoDto } from './dto/update-employee-photo.dto';

function fileName(req, file, cb) {
  const uniqueSuffix =
    Date.now() + '_' + file.originalname.replace(/\s+/g, '_');
  cb(null, uniqueSuffix);
}

@Controller('employee-photos')
export class EmployeePhotosController {
  constructor(private readonly service: EmployeePhotosService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/hr/employeephotos',
        filename: fileName,
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Only JPG, JPEG, PNG, and WebP files are allowed',
            ),
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
    @Body() dto: CreateEmployeePhotoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Photo file is required');
    }
    dto.photo = file.path.replace(/\\/g, '/');
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
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/hr/employeephotos',
        filename: fileName,
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
        ];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Only JPG, JPEG, PNG, and WebP files are allowed',
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
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
    @Body() dto: UpdateEmployeePhotoDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      dto.photo = file.path.replace(/\\/g, '/');
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
