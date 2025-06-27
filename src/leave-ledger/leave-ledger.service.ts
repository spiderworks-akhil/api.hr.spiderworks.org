import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaveLedgerDto } from './dto/create-leave-ledger.dto';
import { UpdateLeaveLedgerDto } from './dto/update-leave-ledger.dto';
import { Prisma } from '@prisma/client';
import { LeaveType } from 'src/leave-application/dto/leave-application-enums.dto';

@Injectable()
export class LeaveLedgerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLeaveLedgerDto) {
    try {
      const data: Prisma.LeaveLedgerCreateInput = {
        employee: dto.employee_id
          ? { connect: { id: dto.employee_id } }
          : undefined,
        leaveApplication: dto.leave_application_id
          ? { connect: { id: dto.leave_application_id } }
          : undefined,
        leave_type: dto.leave_type,
        count: dto.count,
        eligibility_date: dto.eligibility_date
          ? new Date(dto.eligibility_date)
          : undefined,
        remarks: dto.remarks,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
      };

      const leaveLedger = await this.prisma.$transaction(async (prisma) => {
        const ledger = await prisma.leaveLedger.create({
          data,
          include: {
            employee: { select: { id: true, name: true } },
            leaveApplication: { select: { id: true } },
            createdBy: { select: { id: true, name: true } },
            updatedBy: { select: { id: true, name: true } },
          },
        });
        return ledger;
      });

      return {
        message: 'Leave ledger created successfully',
        leaveLedger,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create leave ledger',
      );
    }
  }

  async findAll(
    page: number,
    limit: number,
    employeeId?: number,
    leaveType?: LeaveType,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.LeaveLedgerWhereInput = {
      ...(employeeId && { employee_id: employeeId }),
      ...(leaveType && { leave_type: leaveType }),
    };

    const [leaveLedgers, total] = await Promise.all([
      this.prisma.leaveLedger.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          employee: { select: { id: true, name: true } },
          leaveApplication: { select: { id: true } },
          createdBy: { select: { id: true, name: true } },
          updatedBy: { select: { id: true, name: true } },
        },
      }),
      this.prisma.leaveLedger.count({ where }),
    ]);

    return { leaveLedgers, total, page, limit };
  }

  async findOne(id: number) {
    const leaveLedger = await this.prisma.leaveLedger.findUnique({
      where: { id },
      include: {
        employee: { select: { id: true, name: true } },
        leaveApplication: { select: { id: true } },
        createdBy: { select: { id: true, name: true } },
        updatedBy: { select: { id: true, name: true } },
      },
    });
    if (!leaveLedger) {
      throw new NotFoundException(`Leave ledger with ID ${id} not found`);
    }
    return { leaveLedger };
  }

  async update(id: number, dto: UpdateLeaveLedgerDto) {
    const existing = await this.prisma.leaveLedger.findUnique({
      where: { id },
      include: {
        employee: true,
        leaveApplication: true,
        createdBy: { select: { id: true, name: true } },
        updatedBy: { select: { id: true, name: true } },
      },
    });
    if (!existing) {
      throw new NotFoundException(`Leave ledger with ID ${id} not found`);
    }

    try {
      const data: Prisma.LeaveLedgerUpdateInput = {
        employee: dto.employee_id
          ? { connect: { id: dto.employee_id } }
          : dto.employee_id === null
            ? { disconnect: true }
            : undefined,
        leaveApplication: dto.leave_application_id
          ? { connect: { id: dto.leave_application_id } }
          : dto.leave_application_id === null
            ? { disconnect: true }
            : undefined,
        leave_type: dto.leave_type,
        count: dto.count,
        eligibility_date: dto.eligibility_date
          ? new Date(dto.eligibility_date)
          : undefined,
        remarks: dto.remarks,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : dto.updated_by === null
            ? { disconnect: true }
            : undefined,
      };

      const updated = await this.prisma.leaveLedger.update({
        where: { id },
        data,
        include: {
          employee: { select: { id: true, name: true } },
          leaveApplication: { select: { id: true } },
          createdBy: { select: { id: true, name: true } },
          updatedBy: { select: { id: true, name: true } },
        },
      });

      return {
        message: 'Leave ledger updated successfully',
        leaveLedger: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update leave ledger',
      );
    }
  }

  async remove(id: number) {
    const leaveLedger = await this.prisma.leaveLedger.findUnique({
      where: { id },
    });
    if (!leaveLedger) {
      throw new NotFoundException(`Leave ledger with ID ${id} not found`);
    }

    try {
      const deleted = await this.prisma.leaveLedger.delete({
        where: { id },
      });
      return {
        message: `Leave ledger with ID ${id} deleted successfully`,
        leaveLedger: deleted,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete leave ledger',
      );
    }
  }
}
