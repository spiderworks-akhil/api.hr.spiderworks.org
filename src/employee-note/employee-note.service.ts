import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeNoteDto } from './dto/create-employee-note.dto';
import { UpdateEmployeeNoteDto } from './dto/update-employee-note.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeNoteService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeNoteDto) {
    try {
      let id = dto.id;
      if (!id) {
        const max = await this.prisma.employeeNote.findFirst({
          orderBy: { id: 'desc' },
          select: { id: true },
        });
        id = max?.id ? max.id + 1 : 1;
      }
      const data: Prisma.EmployeeNoteCreateInput = {
        id,
        notes: dto.notes,
        employee: {
          connect: { id: dto.employee_id },
        },
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
        created_at: dto.created_at ? new Date(dto.created_at) : new Date(),
      };

      const employeeNote = await this.prisma.employeeNote.create({ data });
      return {
        message: 'Employee note created successfully',
        employeeNote,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create employee note',
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

    const where: Prisma.EmployeeNoteWhereInput = {
      employee_id,
      ...(keyword && {
        notes: { contains: keyword, mode: 'insensitive' },
      }),
    };

    const [employeeNotes, total] = await Promise.all([
      this.prisma.employeeNote.findMany({
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
      this.prisma.employeeNote.count({ where }),
    ]);

    return { employeeNotes, total, page, limit };
  }

  async update(id: number, dto: UpdateEmployeeNoteDto) {
    const existing = await this.prisma.employeeNote.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Employee note with ID ${id} not found`);
    }

    try {
      const data: Prisma.EmployeeNoteUpdateInput = {
        notes: dto.notes,
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

      const updated = await this.prisma.employeeNote.update({
        where: { id },
        data,
      });
      return {
        message: 'Employee note updated successfully',
        employeeNote: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update employee note',
      );
    }
  }

  async remove(id: number) {
    const employeeNote = await this.prisma.employeeNote.findUnique({
      where: { id },
    });
    if (!employeeNote) {
      throw new NotFoundException(`Employee note with ID ${id} not found`);
    }

    const deleted = await this.prisma.employeeNote.delete({
      where: { id },
    });
    return {
      message: `Employee note with ID ${id} deleted successfully`,
      employeeNote: deleted,
    };
  }
}
