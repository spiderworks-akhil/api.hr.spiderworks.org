import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeRatingParameterDto } from './dto/create-employee-rating-parameter.dto';
import { UpdateEmployeeRatingParameterDto } from './dto/update-employee-rating-parameter.dto';
import { Prisma, RatingParameterType } from '@prisma/client';

@Injectable()
export class EmployeeRatingParameterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeRatingParameterDto) {
    try {
      const data: Prisma.EmployeeRatingParameterCreateInput = {
        name: dto.name,
        description: dto.description,
        ratable_by_client: dto.ratable_by_client ?? 0,
        ratable_by_manager: dto.ratable_by_manager ?? 0,
        ratable_by_self: dto.ratable_by_self ?? 0,
        type:
          (dto.type as RatingParameterType) ?? RatingParameterType.STAR_RATING,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const employeeRatingParameter =
        await this.prisma.employeeRatingParameter.create({
          data,
          include: {
            createdBy: true,
            updatedBy: true,
          },
        });
      return {
        message: 'Employee rating parameter created successfully',
        employeeRatingParameter,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create employee rating parameter',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeRatingParameterWhereInput = {
      ...(keyword && {
        name: { contains: keyword, mode: 'insensitive' },
      }),
    };

    const [employeeRatingParameters, total] = await Promise.all([
      this.prisma.employeeRatingParameter.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          createdBy: true,
          updatedBy: true,
        },
      }),
      this.prisma.employeeRatingParameter.count({ where }),
    ]);

    return { employeeRatingParameters, total, page, limit };
  }

  async update(id: number, dto: UpdateEmployeeRatingParameterDto) {
    const existing = await this.prisma.employeeRatingParameter.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        `Employee rating parameter with ID ${id} not found`,
      );
    }

    try {
      const data: Prisma.EmployeeRatingParameterUpdateInput = {
        name: dto.name,
        description: dto.description,
        ratable_by_client: dto.ratable_by_client,
        ratable_by_manager: dto.ratable_by_manager,
        ratable_by_self: dto.ratable_by_self,
        type: dto.type as RatingParameterType,
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

      const updated = await this.prisma.employeeRatingParameter.update({
        where: { id },
        data,
        include: {
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Employee rating parameter updated successfully',
        employeeRatingParameter: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update employee rating parameter',
      );
    }
  }

  async remove(id: number) {
    const employeeRatingParameter =
      await this.prisma.employeeRatingParameter.findUnique({
        where: { id },
      });

    if (!employeeRatingParameter) {
      throw new NotFoundException(
        `Employee rating parameter with ID ${id} not found`,
      );
    }

    try {
      await this.prisma.employeeEvaluationTemplateParameterMapping.deleteMany({
        where: { parameter_id: id },
      });

      await this.prisma.employeeRatingParameter.delete({
        where: { id },
      });

      return {
        message: `Employee rating parameter with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete employee rating parameter',
      );
    }
  }
}
