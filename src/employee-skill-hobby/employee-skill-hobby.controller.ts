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
import { EmployeeSkillHobbyService } from './employee-skill-hobby.service';
import { CreateEmployeeSkillHobbyDto } from './dto/create-employee-skill-hobby.dto';
import { UpdateEmployeeSkillHobbyDto } from './dto/update-employee-skill-hobby.dto';

@Controller('employee-skill-hobby')
export class EmployeeSkillHobbyController {
  constructor(private readonly service: EmployeeSkillHobbyService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateEmployeeSkillHobbyDto) {
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
    @Body() dto: UpdateEmployeeSkillHobbyDto,
  ) {
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
