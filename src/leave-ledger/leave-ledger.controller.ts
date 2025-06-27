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
import { LeaveLedgerService } from './leave-ledger.service';
import { CreateLeaveLedgerDto } from './dto/create-leave-ledger.dto';
import { UpdateLeaveLedgerDto } from './dto/update-leave-ledger.dto';
import { LeaveType } from 'src/leave-application/dto/leave-application-enums.dto';

@Controller('leave-ledger')
export class LeaveLedgerController {
  constructor(private readonly service: LeaveLedgerService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateLeaveLedgerDto) {
    return this.service.create(dto);
  }

  @Get('list')
  async list(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('employeeId') employeeId?: string,
    @Query('leave_type') leaveType?: LeaveType,
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

    const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : undefined;

    if (
      employeeId &&
      (parsedEmployeeId === undefined || isNaN(parsedEmployeeId))
    ) {
      throw new BadRequestException(
        'Query parameter "employeeId" must be a valid integer',
      );
    }

    return this.service.findAll(
      parsedPage,
      parsedLimit,
      parsedEmployeeId,
      leaveType,
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
    @Body() dto: UpdateLeaveLedgerDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
