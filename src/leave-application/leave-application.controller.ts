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
import { LeaveApplicationService } from './leave-application.service';
import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
import { ReviewLeaveApplicationDto } from './dto/review-leave-application.dto';
import {
  AttendanceType,
  ApprovalStatus,
  LeaveType,
} from './dto/leave-application-enums.dto';
import { CreateLeaveApplicationByUserDto } from './dto/create-leave-application-by-user.dto';

@Controller('leave-application')
export class LeaveApplicationController {
  constructor(private readonly service: LeaveApplicationService) {}

  @Post('create')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() dto: CreateLeaveApplicationDto) {
    return this.service.create(dto);
  }

  @Post('add')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async add(@Body() dto: CreateLeaveApplicationByUserDto) {
    return this.service.add(dto);
  }

  @Get('list')
  async list(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('employeeId') employeeId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('leave_type') leaveType?: LeaveType,
    @Query('attendance_type') attendanceType?: AttendanceType,
    @Query('approval_status') approvalStatus?: ApprovalStatus,
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
        'Query parameters "manager_id", "hr_id", and "employeeId" must be valid integers',
      );
    }

    return this.service.findAll(
      parsedPage,
      parsedLimit,
      parsedEmployeeId,
      leaveType,
      from,
      to,
      attendanceType,
      approvalStatus,
    );
  }

  @Get('listing')
  async listing(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('userId') userId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('leave_type') leaveType?: LeaveType,
    @Query('attendance_type') attendanceType?: AttendanceType,
    @Query('approval_status') approvalStatus?: ApprovalStatus,
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

    const parsedUserId = userId ? parseInt(userId, 10) : undefined;

    if (userId && (parsedUserId === undefined || isNaN(parsedUserId))) {
      throw new BadRequestException(
        'Query parameter "userId" must be a valid integer',
      );
    }

    return this.service.listAll(
      parsedPage,
      parsedLimit,
      parsedUserId,
      leaveType,
      from,
      to,
      attendanceType,
      approvalStatus,
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
    @Body() dto: UpdateLeaveApplicationDto,
  ) {
    return this.service.update(id, dto);
  }

  @Put('review/manager/:id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async reviewManager(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReviewLeaveApplicationDto,
  ) {
    return this.service.reviewManager(id, dto);
  }

  @Put('review/hr/:id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async reviewHR(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReviewLeaveApplicationDto,
  ) {
    return this.service.reviewHR(id, dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
