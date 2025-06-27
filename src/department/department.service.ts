import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDepartmentDto) {
    try {
      if (dto.parent_id) {
        const parent = await this.prisma.department.findUnique({
          where: { id: dto.parent_id },
        });
        if (!parent) {
          throw new BadRequestException(
            `Parent department with ID ${dto.parent_id} not found`,
          );
        }
      }

      const data: Prisma.DepartmentCreateInput = {
        name: dto.name,
        description: dto.description,
        parent: dto.parent_id ? { connect: { id: dto.parent_id } } : undefined,
        departmentHead: dto.department_head_id
          ? { connect: { id: dto.department_head_id } }
          : undefined,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const department = await this.prisma.department.create({
        data,
        include: {
          parent: true,
          departmentHead: true,
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Department created successfully',
        department,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create department',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.DepartmentWhereInput = {
      ...(keyword && {
        name: { contains: keyword, mode: 'insensitive' },
      }),
    };

    const [departments, total] = await Promise.all([
      this.prisma.department.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          parent: true,
          departmentHead: true,
          createdBy: true,
          updatedBy: true,
          children: { select: { id: true, name: true } },
        },
      }),
      this.prisma.department.count({ where }),
    ]);

    return { departments, total, page, limit };
  }

  async update(id: number, dto: UpdateDepartmentDto) {
    const existing = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    if (dto.parent_id === id) {
      throw new BadRequestException('Department cannot be its own parent');
    }

    if (dto.parent_id) {
      const parent = await this.prisma.department.findUnique({
        where: { id: dto.parent_id },
      });
      if (!parent) {
        throw new BadRequestException(
          `Parent department with ID ${dto.parent_id} not found`,
        );
      }
    }

    try {
      const data: Prisma.DepartmentUpdateInput = {
        name: dto.name,
        description: dto.description,
        parent: dto.parent_id
          ? { connect: { id: dto.parent_id } }
          : dto.parent_id === null
            ? { disconnect: true }
            : undefined,
        departmentHead: dto.department_head_id
          ? { connect: { id: dto.department_head_id } }
          : dto.department_head_id === null
            ? { disconnect: true }
            : undefined,
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

      const updated = await this.prisma.department.update({
        where: { id },
        data,
        include: {
          parent: true,
          departmentHead: true,
          createdBy: true,
          updatedBy: true,
          children: { select: { id: true, name: true } },
        },
      });
      return {
        message: 'Department updated successfully',
        department: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update department',
      );
    }
  }

  async remove(id: number) {
    const department = await this.prisma.department.findUnique({
      where: { id },
      include: {
        children: true,
        employees: true,
      },
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    try {
      await this.prisma.$transaction([
        this.prisma.employee.updateMany({
          where: { departments_id: id },
          data: { departments_id: null },
        }),

        this.prisma.department.updateMany({
          where: { parent_id: id },
          data: { parent_id: null },
        }),

        this.prisma.department.delete({
          where: { id },
        }),
      ]);

      return {
        message: `Department with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete department',
      );
    }
  }
}
