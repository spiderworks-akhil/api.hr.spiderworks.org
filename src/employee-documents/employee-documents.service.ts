import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDocumentDto } from './dto/create-employee-document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee-document.dto';
import { Prisma } from '@prisma/client';
import { unlink } from 'fs/promises';

@Injectable()
export class EmployeeDocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeDocumentDto) {
    try {
      const data: Prisma.EmployeeDocumentCreateInput = {
        title: dto.title,
        document: dto.document!,
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

      const doc = await this.prisma.employeeDocument.create({ data });
      return {
        message: 'Employee document created successfully',
        document: doc,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create employee document',
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

    const where: Prisma.EmployeeDocumentWhereInput = {
      employee_id,
      ...(keyword && { title: { contains: keyword, mode: 'insensitive' } }),
    };

    const [documents, total] = await Promise.all([
      this.prisma.employeeDocument.findMany({
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
      this.prisma.employeeDocument.count({ where }),
    ]);

    return { documents, total, page, limit };
  }

  async update(id: number, dto: UpdateEmployeeDocumentDto) {
    const existing = await this.prisma.employeeDocument.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Employee document with ID ${id} not found`);
    }

    try {
      if (dto.document && existing.document !== dto.document) {
        try {
          await unlink(existing.document);
        } catch (error) {
          console.warn(
            `Failed to delete old file ${existing.document}: ${error.message}`,
          );
        }
      }

      const data: Prisma.EmployeeDocumentUpdateInput = {
        title: dto.title,
        ...(dto.document && { document: dto.document }),
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

      const updated = await this.prisma.employeeDocument.update({
        where: { id },
        data,
      });
      return {
        message: 'Employee document updated successfully',
        document: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update employee document',
      );
    }
  }

  async remove(id: number) {
    const doc = await this.prisma.employeeDocument.findUnique({
      where: { id },
    });
    if (!doc) {
      throw new NotFoundException(`Employee document with ID ${id} not found`);
    }

    try {
      await unlink(doc.document);
    } catch (error) {
      console.warn(`Failed to delete file ${doc.document}: ${error.message}`);
    }

    const deleted = await this.prisma.employeeDocument.delete({
      where: { id },
    });
    return {
      message: `Employee document with ID ${id} deleted successfully`,
      document: deleted,
    };
  }
}
