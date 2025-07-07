import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeLevelDto } from './dto/create-employee-level.dto';
import { UpdateEmployeeLevelDto } from './dto/update-employee-level.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeLevelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeLevelDto) {
    try {
      const data: Prisma.EmployeeLevelCreateInput = {
        name: dto.name,
        level_index: dto.level_index,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const employeeLevel = await this.prisma.employeeLevel.create({
        data,
        include: {
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Employee level created successfully',
        employeeLevel,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create employee level',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeLevelWhereInput = {
      ...(keyword && {
        name: { contains: keyword, mode: 'insensitive' },
      }),
    };

    const [employeeLevels, total] = await Promise.all([
      this.prisma.employeeLevel.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          createdBy: true,
          updatedBy: true,
          employees: { select: { id: true, name: true } },
        },
      }),
      this.prisma.employeeLevel.count({ where }),
    ]);

    return { employeeLevels, total, page, limit };
  }

  async update(id: number, dto: UpdateEmployeeLevelDto) {
    const existing = await this.prisma.employeeLevel.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Employee level with ID ${id} not found`);
    }

    try {
      const data: Prisma.EmployeeLevelUpdateInput = {
        name: dto.name,
        level_index: dto.level_index,
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

      const updated = await this.prisma.employeeLevel.update({
        where: { id },
        data,
        include: {
          createdBy: true,
          updatedBy: true,
          employees: { select: { id: true, name: true } },
        },
      });
      return {
        message: 'Employee level updated successfully',
        employeeLevel: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update employee level',
      );
    }
  }

  async remove(id: number) {
    const employeeLevel = await this.prisma.employeeLevel.findUnique({
      where: { id },
      include: {
        employees: true,
      },
    });

    if (!employeeLevel) {
      throw new NotFoundException(`Employee level with ID ${id} not found`);
    }

    try {
      await this.prisma.$transaction([
        this.prisma.employee.updateMany({
          where: { employee_level_id: id },
          data: { employee_level_id: null },
        }),
        this.prisma.employeeLevel.delete({
          where: { id },
        }),
      ]);

      return {
        message: `Employee level with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete employee level',
      );
    }
  }
}
