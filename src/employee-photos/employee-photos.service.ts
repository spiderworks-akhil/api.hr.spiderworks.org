import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeePhotoDto } from './dto/create-employee-photo.dto';
import { UpdateEmployeePhotoDto } from './dto/update-employee-photo.dto';
import { Prisma } from '@prisma/client';
import { unlink } from 'fs/promises';

@Injectable()
export class EmployeePhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeePhotoDto) {
    try {
      const data: Prisma.EmployeePhotoCreateInput = {
        type: dto.type,
        photo: dto.photo!,
        employee: {
          connect: { id: dto.employee_id! },
        },
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const photo = await this.prisma.employeePhoto.create({ data });
      return {
        message: 'Employee photo created successfully',
        photo,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create employee photo',
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

    const where: Prisma.EmployeePhotoWhereInput = {
      employee_id,
      ...(keyword && { type: { contains: keyword, mode: 'insensitive' } }),
    };

    const [photos, total] = await Promise.all([
      this.prisma.employeePhoto.findMany({
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
      this.prisma.employeePhoto.count({ where }),
    ]);

    return { photos, total, page, limit };
  }

  async update(id: number, dto: UpdateEmployeePhotoDto) {
    const existing = await this.prisma.employeePhoto.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Employee photo with ID ${id} not found`);
    }

    try {
      if (dto.photo && existing.photo !== dto.photo) {
        try {
          await unlink(existing.photo);
        } catch (error) {
          console.warn(
            `Failed to delete old file ${existing.photo}: ${error.message}`,
          );
        }
      }

      const data: Prisma.EmployeePhotoUpdateInput = {
        type: dto.type,
        ...(dto.photo && { photo: dto.photo }),
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

      const updated = await this.prisma.employeePhoto.update({
        where: { id },
        data,
      });
      return {
        message: 'Employee photo updated successfully',
        photo: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update employee photo',
      );
    }
  }

  async remove(id: number) {
    const photo = await this.prisma.employeePhoto.findUnique({
      where: { id },
    });
    if (!photo) {
      throw new NotFoundException(`Employee photo with ID ${id} not found`);
    }

    try {
      await unlink(photo.photo);
    } catch (error) {
      console.warn(`Failed to delete file ${photo.photo}: ${error.message}`);
    }

    const deleted = await this.prisma.employeePhoto.delete({
      where: { id },
    });
    return {
      message: `Employee photo with ID ${id} deleted successfully`,
      photo: deleted,
    };
  }
}
