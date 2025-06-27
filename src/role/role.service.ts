import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRoleDto) {
    try {
      const data: Prisma.RoleCreateInput = {
        name: dto.name,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const role = await this.prisma.role.create({
        data,
        include: {
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Role created successfully',
        role,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create role');
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.RoleWhereInput = {
      ...(keyword && {
        name: { contains: keyword, mode: 'insensitive' },
      }),
    };

    const [roles, total] = await Promise.all([
      this.prisma.role.findMany({
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
      this.prisma.role.count({ where }),
    ]);

    return { roles, total, page, limit };
  }

  async update(id: number, dto: UpdateRoleDto) {
    const existing = await this.prisma.role.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    try {
      const data: Prisma.RoleUpdateInput = {
        name: dto.name,
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

      const updated = await this.prisma.role.update({
        where: { id },
        data,
        include: {
          createdBy: true,
          updatedBy: true,
          employees: { select: { id: true, name: true } },
        },
      });
      return {
        message: 'Role updated successfully',
        role: updated,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update role');
    }
  }

  async remove(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        employees: true,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    try {
      await this.prisma.$transaction([
        this.prisma.employee.updateMany({
          where: { employee_roles_id: id },
          data: { employee_roles_id: null },
        }),

        this.prisma.role.delete({
          where: { id },
        }),
      ]);

      return {
        message: `Role with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to delete role');
    }
  }
}
