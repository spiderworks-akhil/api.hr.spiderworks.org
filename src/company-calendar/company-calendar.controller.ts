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
import { CompanyCalendarService } from './company-calendar.service';
import { CreateCompanyCalendarDto } from './dto/create-company-calendar.dto';
import { UpdateCompanyCalendarDto } from './dto/update-company-calendar.dto';

@Controller('company-calendar')
export class CompanyCalendarController {
  constructor(private readonly service: CompanyCalendarService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateCompanyCalendarDto) {
    return this.service.create(dto);
  }

  @Get('list')
  async list(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('isHoliday') isHoliday?: string,
    @Query('month') month?: string,
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

    const parsedIsHoliday = isHoliday ? parseInt(isHoliday, 10) : undefined;
    if (
      isHoliday &&
      (parsedIsHoliday === undefined || isNaN(parsedIsHoliday))
    ) {
      throw new BadRequestException(
        'Query parameter "isHoliday" must be a valid integer',
      );
    }

    const parsedMonth = month ? parseInt(month, 10) : undefined;
    if (
      month &&
      (parsedMonth === undefined ||
        isNaN(parsedMonth) ||
        parsedMonth < 1 ||
        parsedMonth > 12)
    ) {
      throw new BadRequestException(
        'Query parameter "month" must be a valid integer between 1 and 12',
      );
    }

    return this.service.findAll(
      parsedPage,
      parsedLimit,
      parsedIsHoliday,
      parsedMonth,
    );
  }

  @Get('view/:id')
  async view(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
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
    @Body() dto: UpdateCompanyCalendarDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
