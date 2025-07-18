import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeEmergencyContactDto } from './dto/create-employee-emergency-contact.dto';
import { UpdateEmployeeEmergencyContactDto } from './dto/update-employee-emergency-contact.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeEmergencyContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeEmergencyContactDto) {
    try {
      const data: Prisma.EmployeeEmergencyContactCreateInput = {
        contact_name: dto.contact_name,
        phone_number: dto.phone_number,
        relationship: dto.relationship,
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

      const emergencyContact =
        await this.prisma.employeeEmergencyContact.create({ data });
      return {
        message: 'Employee emergency contact created successfully',
        emergencyContact,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create employee emergency contact',
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

    const where: Prisma.EmployeeEmergencyContactWhereInput = {
      employee_id,
      ...(keyword && {
        contact_name: { contains: keyword, mode: 'insensitive' },
      }),
    };

    const [emergencyContacts, total] = await Promise.all([
      this.prisma.employeeEmergencyContact.findMany({
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
      this.prisma.employeeEmergencyContact.count({ where }),
    ]);

    return { emergencyContacts, total, page, limit };
  }

  async update(id: number, dto: UpdateEmployeeEmergencyContactDto) {
    const existing = await this.prisma.employeeEmergencyContact.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        `Employee emergency contact with ID ${id} not found`,
      );
    }

    try {
      const data: Prisma.EmployeeEmergencyContactUpdateInput = {
        contact_name: dto.contact_name,
        phone_number: dto.phone_number,
        relationship: dto.relationship,
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

      const updated = await this.prisma.employeeEmergencyContact.update({
        where: { id },
        data,
      });
      return {
        message: 'Employee emergency contact updated successfully',
        emergencyContact: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update employee emergency contact',
      );
    }
  }

  async remove(id: number) {
    const emergencyContact =
      await this.prisma.employeeEmergencyContact.findUnique({
        where: { id },
      });
    if (!emergencyContact) {
      throw new NotFoundException(
        `Employee emergency contact with ID ${id} not found`,
      );
    }

    const deleted = await this.prisma.employeeEmergencyContact.delete({
      where: { id },
    });
    return {
      message: `Employee emergency contact with ID ${id} deleted successfully`,
      emergencyContact: deleted,
    };
  }
}
