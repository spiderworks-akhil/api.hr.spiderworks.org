import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeaveApplicationDto } from './dto/create-leave-application.dto';
import { UpdateLeaveApplicationDto } from './dto/update-leave-application.dto';
import { ReviewLeaveApplicationDto } from './dto/review-leave-application.dto';
import { Prisma } from '@prisma/client';
import {
  AttendanceType,
  ApprovalStatus,
  LeaveType,
} from './dto/leave-application-enums.dto';

@Injectable()
export class LeaveApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeaveApplicationDto) {
    if (
      dto.start_date &&
      dto.end_date &&
      new Date(dto.end_date) < new Date(dto.start_date)
    ) {
      throw new BadRequestException('End date cannot be before start date');
    }

    if (dto.manager_id === dto.hr_id && dto.manager_id !== null) {
      throw new BadRequestException('Manager ID and HR ID cannot be the same');
    }

    try {
      let count: number | undefined = dto.count;

      if (dto.start_date && dto.end_date) {
        const start = new Date(dto.start_date);
        const end = new Date(dto.end_date);

        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        const diffTime = end.getTime() - start.getTime();
        count = diffTime / (1000 * 60 * 60 * 24) + 1;
      }

      const data: Prisma.LeaveApplicationCreateInput = {
        employee: dto.employee_id
          ? { connect: { id: dto.employee_id } }
          : undefined,
        attendance_type: dto.attendance_type,
        leave_type: dto.leave_type,
        reason: dto.reason,
        start_date: dto.start_date ? new Date(dto.start_date) : undefined,
        end_date: dto.end_date ? new Date(dto.end_date) : undefined,
        count: count,
        manager: dto.manager_id
          ? { connect: { id: dto.manager_id } }
          : undefined,
        manager_approval_status: dto.manager_approval_status,
        manager_review_date: dto.manager_review_date
          ? new Date(dto.manager_review_date)
          : undefined,
        manager_remarks: dto.manager_remarks,
        hr: dto.hr_id ? { connect: { id: dto.hr_id } } : undefined,
        hr_approval_status: dto.hr_approval_status,
        hr_review_date: dto.hr_review_date
          ? new Date(dto.hr_review_date)
          : undefined,
        hr_remarks: dto.hr_remarks,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const leaveApplication = await this.prisma.$transaction(
        async (prisma) => {
          const application = await prisma.leaveApplication.create({
            data,
            include: {
              employee: { select: { id: true, name: true } },
              manager: { select: { id: true, name: true } },
              hr: { select: { id: true, name: true } },
              createdBy: { select: { id: true, name: true } },
              updatedBy: { select: { id: true, name: true } },
            },
          });
          return application;
        },
      );

      return {
        message: 'Leave application created successfully',
        leaveApplication,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create leave application',
      );
    }
  }

  async findAll(
    page: number,
    limit: number,
    employeeId?: number,
    leaveType?: LeaveType,
    from?: string,
    to?: string,
    attendanceType?: AttendanceType,
    approvalStatus?: ApprovalStatus,
  ) {
    const skip = (page - 1) * limit;

    let fromDate: Date | undefined;
    let toDate: Date | undefined;

    if (from) {
      fromDate = new Date(from);
      fromDate.setUTCHours(0, 0, 0, 0);
    }

    if (to) {
      toDate = new Date(to);
      toDate.setUTCHours(23, 59, 59, 999);
    }

    const where: Prisma.LeaveApplicationWhereInput = {
      ...(employeeId && { employee_id: employeeId }),
      ...(leaveType && { leave_type: leaveType }),
      ...(attendanceType && { attendance_type: attendanceType }),
      ...(approvalStatus && {
        OR: [
          { manager_approval_status: approvalStatus },
          { hr_approval_status: approvalStatus },
        ],
      }),
      ...(fromDate || toDate
        ? {
            AND: [
              fromDate ? { start_date: { gte: fromDate } } : {},
              toDate ? { end_date: { lte: toDate } } : {},
            ],
          }
        : {}),
    };

    const [leaveApplications, total] = await Promise.all([
      this.prisma.leaveApplication.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          employee: { select: { id: true, name: true } },
          manager: { select: { id: true, name: true } },
          hr: { select: { id: true, name: true } },
          createdBy: { select: { id: true, name: true } },
          updatedBy: { select: { id: true, name: true } },
        },
      }),
      this.prisma.leaveApplication.count({ where }),
    ]);

    return { leaveApplications, total, page, limit };
  }

  async findOne(id: number) {
    const leaveApplication = await this.prisma.leaveApplication.findUnique({
      where: { id },
      include: {
        employee: { select: { id: true, name: true } },
        manager: { select: { id: true, name: true } },
        hr: { select: { id: true, name: true } },
        createdBy: { select: { id: true, name: true } },
        updatedBy: { select: { id: true, name: true } },
      },
    });
    if (!leaveApplication) {
      throw new NotFoundException(`Leave application with ID ${id} not found`);
    }
    return { leaveApplication };
  }

  async update(id: number, dto: UpdateLeaveApplicationDto) {
    const existing = await this.prisma.leaveApplication.findUnique({
      where: { id },
      include: {
        employee: true,
        manager: true,
        hr: true,
      },
    });
    if (!existing) {
      throw new NotFoundException(`Leave application with ID ${id} not found`);
    }

    if (
      dto.start_date &&
      dto.end_date &&
      new Date(dto.end_date) < new Date(dto.start_date)
    ) {
      throw new BadRequestException('End date cannot be before start date');
    }

    if (
      (dto.manager_id !== undefined || dto.hr_id !== undefined) &&
      dto.manager_id === dto.hr_id &&
      dto.manager_id !== null
    ) {
      throw new BadRequestException('Manager ID and HR ID cannot be the same');
    }

    let count: number | undefined = dto.count;

    if (dto.start_date && dto.end_date) {
      const start = new Date(dto.start_date);
      const end = new Date(dto.end_date);

      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      const diffTime = end.getTime() - start.getTime();
      count = diffTime / (1000 * 60 * 60 * 24) + 1;
    }

    try {
      const data: Prisma.LeaveApplicationUpdateInput = {
        employee: dto.employee_id
          ? { connect: { id: dto.employee_id } }
          : dto.employee_id === null
            ? { disconnect: true }
            : undefined,
        attendance_type: dto.attendance_type,
        leave_type: dto.leave_type,
        reason: dto.reason,
        start_date: dto.start_date ? new Date(dto.start_date) : undefined,
        end_date: dto.end_date ? new Date(dto.end_date) : undefined,
        count: count,
        manager: dto.manager_id
          ? { connect: { id: dto.manager_id } }
          : dto.manager_id === null
            ? { disconnect: true }
            : undefined,
        manager_approval_status: dto.manager_approval_status,
        manager_review_date: dto.manager_review_date
          ? new Date(dto.manager_review_date)
          : undefined,
        manager_remarks: dto.manager_remarks,
        hr: dto.hr_id
          ? { connect: { id: dto.hr_id } }
          : dto.hr_id === null
            ? { disconnect: true }
            : undefined,
        hr_approval_status: dto.hr_approval_status,
        hr_review_date: dto.hr_review_date
          ? new Date(dto.hr_review_date)
          : undefined,
        hr_remarks: dto.hr_remarks,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : dto.created_by === null
            ? { disconnect: true }
            : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : dto.updated_by === null
            ? { disconnect: true }
            : undefined,
      };

      const updated = await this.prisma.leaveApplication.update({
        where: { id },
        data,
        include: {
          employee: { select: { id: true, name: true } },
          manager: { select: { id: true, name: true } },
          hr: { select: { id: true, name: true } },
          createdBy: { select: { id: true, name: true } },
          updatedBy: { select: { id: true, name: true } },
        },
      });

      return {
        message: 'Leave application updated successfully',
        leaveApplication: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update leave application',
      );
    }
  }

  async reviewManager(id: number, dto: ReviewLeaveApplicationDto) {
    const existing = await this.prisma.leaveApplication.findUnique({
      where: { id },
      include: { employee: true, manager: true },
    });

    if (!existing) {
      throw new NotFoundException(`Leave application with ID ${id} not found`);
    }

    if (existing.employee_id === existing.manager_id) {
      throw new BadRequestException(
        'Managers cannot review their own leave applications',
      );
    }

    try {
      const data: Prisma.LeaveApplicationUpdateInput = {
        manager_approval_status: dto.approval_status,
        manager_remarks: dto.remarks,
        manager_review_date: new Date(),
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const updated = await this.prisma.leaveApplication.update({
        where: { id },
        data,
        include: {
          employee: { select: { id: true, name: true } },
          manager: { select: { id: true, name: true } },
          hr: { select: { id: true, name: true } },
          createdBy: { select: { id: true, name: true } },
          updatedBy: { select: { id: true, name: true } },
        },
      });

      if (dto.approval_status === ApprovalStatus.APPROVED) {
        const {
          start_date,
          end_date,
          employee_id,
          id: leave_application_id,
          leave_type,
        } = updated;

        if (start_date && end_date && employee_id && leave_type) {
          const start = new Date(start_date);
          const end = new Date(end_date);
          const utcStart = new Date(
            Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()),
          );
          const utcEnd = new Date(
            Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()),
          );

          const holidayDates = await this.prisma.companyCalendar.findMany({
            where: {
              date: {
                gte: utcStart,
                lte: utcEnd,
              },
              is_holiday: 1,
            },
            select: { date: true },
          });

          const getUTCDateKey = (date: Date) =>
            new Date(
              Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
            )
              .toISOString()
              .slice(0, 10);

          const holidaySet = new Set(
            holidayDates
              .filter((d) => d.date !== null)
              .map((d) => getUTCDateKey(d.date!)),
          );

          await this.prisma.leaveLedger.deleteMany({
            where: { leave_application_id },
          });

          const ledgers: Prisma.LeaveLedgerCreateManyInput[] = [];
          const current = new Date(utcStart);

          while (current <= utcEnd) {
            const dateKey = getUTCDateKey(current);

            if (!holidaySet.has(dateKey)) {
              ledgers.push({
                employee_id,
                leave_application_id,
                leave_type,
                count: 1,
                eligibility_date: new Date(
                  Date.UTC(
                    current.getFullYear(),
                    current.getMonth(),
                    current.getDate(),
                  ),
                ),
                remarks: updated.reason ?? null,
              });
            }

            current.setUTCDate(current.getUTCDate() + 1);
          }

          if (ledgers.length > 0) {
            await this.prisma.leaveLedger.createMany({ data: ledgers });
          }
        }
      }

      return {
        message: 'Manager review submitted successfully',
        leaveApplication: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to submit manager review',
      );
    }
  }

  async reviewHR(id: number, dto: ReviewLeaveApplicationDto) {
    const existing = await this.prisma.leaveApplication.findUnique({
      where: { id },
      include: { employee: true, hr: true },
    });

    if (!existing) {
      throw new NotFoundException(`Leave application with ID ${id} not found`);
    }

    if (existing.employee_id === existing.hr_id) {
      throw new BadRequestException(
        'HR cannot review their own leave applications',
      );
    }

    try {
      const data: Prisma.LeaveApplicationUpdateInput = {
        hr_approval_status: dto.approval_status,
        hr_remarks: dto.remarks,
        hr_review_date: new Date(),
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const updated = await this.prisma.leaveApplication.update({
        where: { id },
        data,
        include: {
          employee: { select: { id: true, name: true } },
          manager: { select: { id: true, name: true } },
          hr: { select: { id: true, name: true } },
          createdBy: { select: { id: true, name: true } },
          updatedBy: { select: { id: true, name: true } },
        },
      });

      if (dto.approval_status === ApprovalStatus.APPROVED) {
        const {
          start_date,
          end_date,
          employee_id,
          id: leave_application_id,
          leave_type,
        } = updated;

        if (start_date && end_date && employee_id && leave_type) {
          const rawStart = new Date(start_date);
          const rawEnd = new Date(end_date);
          const utcStart = new Date(
            Date.UTC(
              rawStart.getFullYear(),
              rawStart.getMonth(),
              rawStart.getDate(),
            ),
          );
          const utcEnd = new Date(
            Date.UTC(rawEnd.getFullYear(), rawEnd.getMonth(), rawEnd.getDate()),
          );

          const holidayDates = await this.prisma.companyCalendar.findMany({
            where: {
              date: {
                gte: utcStart,
                lte: utcEnd,
              },
              is_holiday: 1,
            },
            select: { date: true },
          });

          const getUTCDateKey = (date: Date) =>
            new Date(
              Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
            )
              .toISOString()
              .slice(0, 10);

          const holidaySet = new Set(
            holidayDates
              .filter((d) => d.date !== null)
              .map((d) => getUTCDateKey(d.date!)),
          );

          await this.prisma.leaveLedger.deleteMany({
            where: { leave_application_id },
          });

          const ledgers: Prisma.LeaveLedgerCreateManyInput[] = [];
          const current = new Date(utcStart);

          while (current <= utcEnd) {
            const dateKey = getUTCDateKey(current);
            if (!holidaySet.has(dateKey)) {
              ledgers.push({
                employee_id,
                leave_application_id,
                leave_type,
                count: 1,
                eligibility_date: new Date(
                  Date.UTC(
                    current.getFullYear(),
                    current.getMonth(),
                    current.getDate(),
                  ),
                ),
                remarks: updated.reason ?? null,
              });
            }
            current.setUTCDate(current.getUTCDate() + 1);
          }

          if (ledgers.length > 0) {
            await this.prisma.leaveLedger.createMany({ data: ledgers });
          }
        }
      }

      return {
        message: 'HR review submitted successfully',
        leaveApplication: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to submit HR review',
      );
    }
  }

  async remove(id: number) {
    const leaveApplication = await this.prisma.leaveApplication.findUnique({
      where: { id },
    });
    if (!leaveApplication) {
      throw new NotFoundException(`Leave application with ID ${id} not found`);
    }

    try {
      const deleted = await this.prisma.leaveApplication.delete({
        where: { id },
      });
      return {
        message: `Leave application with ID ${id} deleted successfully`,
        leaveApplication: deleted,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete leave application',
      );
    }
  }
}
