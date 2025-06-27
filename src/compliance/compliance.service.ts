import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComplianceDto } from './dto/create-compliance.dto';
import { UpdateComplianceDto } from './dto/update-compliance.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ComplianceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateComplianceDto) {
    try {
      const data: Prisma.ComplianceCreateInput = {
        title: dto.title,
        description: dto.description,
        last_filing_date: dto.last_filing_date
          ? new Date(dto.last_filing_date)
          : undefined,
        next_due_date: dto.next_due_date
          ? new Date(dto.next_due_date)
          : undefined,
        filing_instructions: dto.filing_instructions,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const compliance = await this.prisma.compliance.create({
        data,
        include: {
          createdBy: { select: { id: true, name: true } },
          updatedBy: { select: { id: true, name: true } },
        },
      });

      return {
        message: 'Compliance record created successfully',
        compliance,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create compliance record',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.ComplianceWhereInput = {
      ...(keyword && {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
          { filing_instructions: { contains: keyword, mode: 'insensitive' } },
        ],
      }),
    };

    const [compliances, total] = await Promise.all([
      this.prisma.compliance.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          createdBy: { select: { id: true, name: true } },
          updatedBy: { select: { id: true, name: true } },
        },
      }),
      this.prisma.compliance.count({ where }),
    ]);

    return { compliances, total, page, limit };
  }

  async update(id: number, dto: UpdateComplianceDto) {
    const existing = await this.prisma.compliance.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Compliance record with ID ${id} not found`);
    }

    try {
      const data: Prisma.ComplianceUpdateInput = {
        title: dto.title,
        description: dto.description,
        last_filing_date: dto.last_filing_date
          ? new Date(dto.last_filing_date)
          : undefined,
        next_due_date: dto.next_due_date
          ? new Date(dto.next_due_date)
          : undefined,
        filing_instructions: dto.filing_instructions,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const compliance = await this.prisma.compliance.update({
        where: { id },
        data,
        include: {
          createdBy: { select: { id: true, name: true } },
          updatedBy: { select: { id: true, name: true } },
        },
      });

      return {
        message: 'Compliance record updated successfully',
        compliance,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update compliance record',
      );
    }
  }

  async remove(id: number) {
    const compliance = await this.prisma.compliance.findUnique({
      where: { id },
    });

    if (!compliance) {
      throw new NotFoundException(`Compliance record with ID ${id} not found`);
    }

    try {
      await this.prisma.compliance.delete({
        where: { id },
      });

      return {
        message: `Compliance record with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete compliance record',
      );
    }
  }
}
