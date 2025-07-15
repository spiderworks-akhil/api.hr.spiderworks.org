import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { RecruitmentRequestService } from './recruitment-requests.service';
import { CreateRecruitmentRequestDto } from './dto/create-recruitment-request.dto';
import { UpdateRecruitmentRequestDto } from './dto/update-recruitment-request.dto';

@Controller('recruitment-requests')
export class RecruitmentRequestController {
  constructor(
    private readonly recruitmentRequestService: RecruitmentRequestService,
  ) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateRecruitmentRequestDto) {
    return this.recruitmentRequestService.create(dto);
  }

  @Get('list')
  async list(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('keyword') keyword: string = '',
    @Query('status') status?: string,
    @Query('priority') priority?: string,
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

    return this.recruitmentRequestService.getAllRequests(
      parsedPage,
      parsedLimit,
      keyword,
      status,
      priority,
    );
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
    @Body() dto: UpdateRecruitmentRequestDto,
  ) {
    return this.recruitmentRequestService.updateRequest(id, dto);
  }

  @Get('view/:id')
  async view(@Param('id', ParseIntPipe) id: number) {
    return this.recruitmentRequestService.getRequestById(id);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.recruitmentRequestService.remove(id);
  }
}
