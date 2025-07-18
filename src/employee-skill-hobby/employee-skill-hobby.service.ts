import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeSkillHobbyDto } from './dto/create-employee-skill-hobby.dto';
import { UpdateEmployeeSkillHobbyDto } from './dto/update-employee-skill-hobby.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeSkillHobbyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeSkillHobbyDto) {
    try {
      const data: Prisma.EmployeeSkillHobbyCreateInput = {
        title: dto.title,
        expertise: dto.expertise,
        employee: {
          connect: { id: dto.employee_id },
        },
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const skillHobby = await this.prisma.employeeSkillHobby.create({ data });
      return {
        message: 'Employee skill/hobby created successfully',
        skillHobby,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create employee skill/hobby',
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

    const where: Prisma.EmployeeSkillHobbyWhereInput = {
      employee_id,
      ...(keyword && { title: { contains: keyword, mode: 'insensitive' } }),
    };

    const [skillHobbies, total] = await Promise.all([
      this.prisma.employeeSkillHobby.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
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
      this.prisma.employeeSkillHobby.count({ where }),
    ]);

    return { skillHobbies, total, page, limit };
  }

  async update(id: number, dto: UpdateEmployeeSkillHobbyDto) {
    const existing = await this.prisma.employeeSkillHobby.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        `Employee skill/hobby with ID ${id} not found`,
      );
    }

    try {
      const data: Prisma.EmployeeSkillHobbyUpdateInput = {
        title: dto.title,
        expertise: dto.expertise,
        ...(dto.employee_id && {
          employee: { connect: { id: dto.employee_id } },
        }),
        ...(dto.created_by !== undefined && {
          createdBy: dto.created_by
            ? { connect: { id: dto.created_by } }
            : { disconnect: true },
        }),
        ...(dto.updated_by !== undefined && {
          updatedBy: dto.updated_by
            ? { connect: { id: dto.updated_by } }
            : { disconnect: true },
        }),
      };

      const updated = await this.prisma.employeeSkillHobby.update({
        where: { id },
        data,
      });
      return {
        message: 'Employee skill/hobby updated successfully',
        skillHobby: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update employee skill/hobby',
      );
    }
  }

  async remove(id: number) {
    const skillHobby = await this.prisma.employeeSkillHobby.findUnique({
      where: { id },
    });
    if (!skillHobby) {
      throw new NotFoundException(
        `Employee skill/hobby with ID ${id} not found`,
      );
    }

    const deleted = await this.prisma.employeeSkillHobby.delete({
      where: { id },
    });
    return {
      message: `Employee skill/hobby with ID ${id} deleted successfully`,
      skillHobby: deleted,
    };
  }
}
