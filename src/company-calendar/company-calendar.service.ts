import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyCalendarDto } from './dto/create-company-calendar.dto';
import { UpdateCompanyCalendarDto } from './dto/update-company-calendar.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyCalendarService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCompanyCalendarDto) {
    try {
      if (dto.date) {
        const existing = await this.prisma.companyCalendar.findFirst({
          where: { date: new Date(dto.date) },
        });
        if (existing) {
          throw new BadRequestException(
            'A company calendar entry with this date already exists',
          );
        }
      }
      const data: Prisma.CompanyCalendarCreateInput = {
        date: dto.date ? new Date(dto.date) : undefined,
        is_holiday: dto.is_holiday,
        remarks: dto.remarks,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
      };

      const companyCalendar = await this.prisma.$transaction(async (prisma) => {
        const calendar = await prisma.companyCalendar.create({
          data,
          include: {
            createdBy: {
              select: { id: true, first_name: true, last_name: true },
            },
            updatedBy: {
              select: { id: true, first_name: true, last_name: true },
            },
          },
        });
        return calendar;
      });

      return {
        message: 'Company calendar entry created successfully',
        companyCalendar,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create company calendar entry',
      );
    }
  }

  async findAll(
    page: number,
    limit: number,
    isHoliday?: number,
    month?: number,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.CompanyCalendarWhereInput = {
      ...(isHoliday !== undefined && { is_holiday: isHoliday }),
      ...(month && {
        date: {
          gte: new Date(new Date().getFullYear(), month - 1, 1),
          lte: new Date(new Date().getFullYear(), month, 0),
        },
      }),
    };

    const [companyCalendars, total] = await Promise.all([
      this.prisma.companyCalendar.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          createdBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          updatedBy: {
            select: { id: true, first_name: true, last_name: true },
          },
        },
      }),
      this.prisma.companyCalendar.count({ where }),
    ]);

    return { companyCalendars, total, page, limit };
  }

  async findOne(id: number) {
    const companyCalendar = await this.prisma.companyCalendar.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, first_name: true, last_name: true } },
        updatedBy: { select: { id: true, first_name: true, last_name: true } },
      },
    });
    if (!companyCalendar) {
      throw new NotFoundException(
        `Company calendar entry with ID ${id} not found`,
      );
    }
    return { companyCalendar };
  }

  async update(id: number, dto: UpdateCompanyCalendarDto) {
    const existing = await this.prisma.companyCalendar.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, first_name: true, last_name: true } },
        updatedBy: { select: { id: true, first_name: true, last_name: true } },
      },
    });
    if (!existing) {
      throw new NotFoundException(
        `Company calendar entry with ID ${id} not found`,
      );
    }

    try {
      if (dto.date) {
        const duplicate = await this.prisma.companyCalendar.findFirst({
          where: {
            date: new Date(dto.date),
            id: { not: id },
          },
        });
        if (duplicate) {
          throw new BadRequestException(
            'A company calendar entry with this date already exists',
          );
        }
      }
      const data: Prisma.CompanyCalendarUpdateInput = {
        date: dto.date ? new Date(dto.date) : undefined,
        is_holiday: dto.is_holiday,
        remarks: dto.remarks,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : dto.updated_by === null
            ? { disconnect: true }
            : undefined,
      };

      const updated = await this.prisma.companyCalendar.update({
        where: { id },
        data,
        include: {
          createdBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          updatedBy: {
            select: { id: true, first_name: true, last_name: true },
          },
        },
      });

      return {
        message: 'Company calendar entry updated successfully',
        companyCalendar: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update company calendar entry',
      );
    }
  }

  async remove(id: number) {
    const companyCalendar = await this.prisma.companyCalendar.findUnique({
      where: { id },
    });
    if (!companyCalendar) {
      throw new NotFoundException(
        `Company calendar entry with ID ${id} not found`,
      );
    }

    try {
      const deleted = await this.prisma.companyCalendar.delete({
        where: { id },
      });
      return {
        message: `Company calendar entry with ID ${id} deleted successfully`,
        companyCalendar: deleted,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete company calendar entry',
      );
    }
  }
}
