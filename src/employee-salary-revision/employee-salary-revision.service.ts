import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeSalaryRevisionDto } from './dto/create-employee-salary-revision.dto';
import { UpdateEmployeeSalaryRevisionDto } from './dto/update-employee-salary-revision.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeSalaryRevisionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeSalaryRevisionDto) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id: dto.employee_id },
      });
      if (!employee) {
        throw new BadRequestException(
          `Employee with ID ${dto.employee_id} not found`,
        );
      }

      const data: Prisma.EmployeeSalaryRevisionCreateInput = {
        version: dto.version,
        employee: { connect: { id: dto.employee_id } },
        effective_date: dto.effective_date
          ? new Date(dto.effective_date)
          : undefined,
        basic_pay: dto.basic_pay,
        tds_deduction_amount: dto.tds_deduction_amount,
        esi_employee_share: dto.esi_employee_share,
        esi_employer_share: dto.esi_employer_share,
        pf_employee_share: dto.pf_employee_share,
        pf_employer_share: dto.pf_employer_share,
        hra: dto.hra,
        travel_allowance: dto.travel_allowance,
        other_allowance: dto.other_allowance,
        grand_total: dto.grand_total,
        remarks: dto.remarks,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const salaryRevision = await this.prisma.employeeSalaryRevision.create({
        data,
        include: {
          employee: true,
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Employee salary revision created successfully',
        salaryRevision,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create employee salary revision',
      );
    }
  }

  async findAll(
    employee_id: number,
    page: number,
    limit: number,
    keyword: string,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeSalaryRevisionWhereInput = {
      employee_id,
      ...(keyword && {
        remarks: { contains: keyword, mode: 'insensitive' },
      }),
    };

    const [salaryRevisions, total] = await Promise.all([
      this.prisma.employeeSalaryRevision.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          employee: true,
          createdBy: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
            },
          },
          updatedBy: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.employeeSalaryRevision.count({ where }),
    ]);

    return { salaryRevisions, total, page, limit };
  }

  async update(id: number, dto: UpdateEmployeeSalaryRevisionDto) {
    const existing = await this.prisma.employeeSalaryRevision.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        `Employee salary revision with ID ${id} not found`,
      );
    }

    if (dto.employee_id) {
      const employee = await this.prisma.employee.findUnique({
        where: { id: dto.employee_id },
      });
      if (!employee) {
        throw new BadRequestException(
          `Employee with ID ${dto.employee_id} not found`,
        );
      }
    }

    try {
      const data: Prisma.EmployeeSalaryRevisionUpdateInput = {
        version: dto.version,
        employee: dto.employee_id
          ? { connect: { id: dto.employee_id } }
          : undefined,
        effective_date: dto.effective_date
          ? new Date(dto.effective_date)
          : undefined,
        basic_pay: dto.basic_pay,
        tds_deduction_amount: dto.tds_deduction_amount,
        esi_employee_share: dto.esi_employee_share,
        esi_employer_share: dto.esi_employer_share,
        pf_employee_share: dto.pf_employee_share,
        pf_employer_share: dto.pf_employer_share,
        hra: dto.hra,
        travel_allowance: dto.travel_allowance,
        other_allowance: dto.other_allowance,
        grand_total: dto.grand_total,
        remarks: dto.remarks,
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

      const updated = await this.prisma.employeeSalaryRevision.update({
        where: { id },
        data,
        include: {
          employee: true,
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Employee salary revision updated successfully',
        salaryRevision: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update employee salary revision',
      );
    }
  }

  async remove(id: number) {
    const salaryRevision = await this.prisma.employeeSalaryRevision.findUnique({
      where: { id },
    });

    if (!salaryRevision) {
      throw new NotFoundException(
        `Employee salary revision with ID ${id} not found`,
      );
    }

    try {
      await this.prisma.employeeSalaryRevision.delete({
        where: { id },
      });

      return {
        message: `Employee salary revision with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete employee salary revision',
      );
    }
  }
}
