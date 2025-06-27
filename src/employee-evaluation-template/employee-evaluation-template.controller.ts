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
} from '@nestjs/common';
import { EmployeeEvaluationTemplateService } from './employee-evaluation-template.service';
import { CreateEmployeeEvaluationTemplateDto } from './dto/create-employee-evaluation-template.dto';
import { UpdateEmployeeEvaluationTemplateDto } from './dto/update-employee-evaluation-template.dto';
import { ParameterSelectionDto } from './dto/parameter-selection.dto';

@Controller('employee-evaluation-templates')
export class EmployeeEvaluationTemplateController {
  constructor(private readonly service: EmployeeEvaluationTemplateService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateEmployeeEvaluationTemplateDto) {
    return this.service.create(dto);
  }

  @Get('list')
  async list(
    @Query('page', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    page: number = 1,
    @Query('limit', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    limit: number = 10,
    @Query('keyword') keyword: string = '',
  ) {
    return this.service.findAll(page, limit, keyword);
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
    @Body() dto: UpdateEmployeeEvaluationTemplateDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Post(':id/parameters/select')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async selectParameters(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ParameterSelectionDto,
  ) {
    return this.service.selectParameters(id, dto);
  }

  @Post(':id/parameters/unselect')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async unselectParameters(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ParameterSelectionDto,
  ) {
    return this.service.unselectParameters(id, dto);
  }
}
