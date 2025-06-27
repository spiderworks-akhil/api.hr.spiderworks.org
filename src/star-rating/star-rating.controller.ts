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
import { StarRatingService } from './star-rating.service';
import { CreateStarRatingDto } from './dto/create-star-rating.dto';
import { UpdateStarRatingDto } from './dto/update-star-rating.dto';

@Controller('star-rating')
export class StarRatingController {
  constructor(private readonly service: StarRatingService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateStarRatingDto) {
    return this.service.create(dto);
  }

  @Get('list')
  async list(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('given_by_id') givenById?: string,
    @Query('given_to_id') givenToId?: string,
    @Query('employeeId') employeeId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('star_count') starCount?: string,
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

    const parsedGivenById = givenById ? parseInt(givenById, 10) : undefined;
    const parsedGivenToId = givenToId ? parseInt(givenToId, 10) : undefined;
    const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined;
    const parsedStarCount = starCount ? parseInt(starCount, 10) : undefined;

    if (
      (givenById &&
        (parsedGivenById === undefined || isNaN(parsedGivenById))) ||
      (givenToId &&
        (parsedGivenToId === undefined || isNaN(parsedGivenToId))) ||
      (employeeId &&
        (parsedEmployeeId === undefined || isNaN(parsedEmployeeId))) ||
      (starCount && (parsedStarCount === undefined || isNaN(parsedStarCount)))
    ) {
      throw new BadRequestException(
        'Query parameters "given_by_id", "given_to_id", "employeeId", and "star_count" must be valid integers',
      );
    }

    return this.service.findAll(
      parsedPage,
      parsedLimit,
      parsedGivenById,
      parsedGivenToId,
      parsedEmployeeId,
      parsedStarCount,
      from,
      to,
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
    @Body() dto: UpdateStarRatingDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
