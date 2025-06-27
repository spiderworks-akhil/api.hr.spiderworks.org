import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAwardWinnerDto } from './dto/create-award-winner.dto';
import { UpdateAwardWinnerDto } from './dto/update-award-winner.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AwardWinnerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAwardWinnerDto) {
    try {
      if (dto.employee_id) {
        const employee = await this.prisma.employee.findUnique({
          where: { id: dto.employee_id },
        });
        if (!employee) {
          throw new BadRequestException(
            `Employee with ID ${dto.employee_id} not found`,
          );
        }
      }

      if (dto.award_program_id) {
        const awardProgram = await this.prisma.awardProgram.findUnique({
          where: { id: dto.award_program_id },
        });
        if (!awardProgram) {
          throw new BadRequestException(
            `Award Program with ID ${dto.award_program_id} not found`,
          );
        }
      }

      const data: Prisma.AwardWinnerCreateInput = {
        title: dto.title,
        description: dto.description,
        awarder_date: dto.awarder_date ? new Date(dto.awarder_date) : undefined,
        employee: dto.employee_id
          ? { connect: { id: dto.employee_id } }
          : undefined,
        awardProgram: dto.award_program_id
          ? { connect: { id: dto.award_program_id } }
          : undefined,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const awardWinner = await this.prisma.awardWinner.create({
        data,
        include: {
          employee: true,
          awardProgram: true,
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Award winner created successfully',
        awardWinner,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create award winner',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.AwardWinnerWhereInput = {
      ...(keyword && {
        title: { contains: keyword, mode: 'insensitive' },
      }),
    };

    const [awardWinners, total] = await Promise.all([
      this.prisma.awardWinner.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          employee: true,
          awardProgram: true,
          createdBy: true,
          updatedBy: true,
        },
      }),
      this.prisma.awardWinner.count({ where }),
    ]);

    return { awardWinners, total, page, limit };
  }

  async update(id: number, dto: UpdateAwardWinnerDto) {
    const existing = await this.prisma.awardWinner.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Award winner with ID ${id} not found`);
    }

    if (dto.employee_id) {
      const employee = await this.prisma.employee.findUnique({
        where: { id: dto.employee_id },
      });
      if (!employee) {
        throw new BadRequestException(
          `Employee with ID ${dto.employee_id} not found`,
        );
      }
    }

    if (dto.award_program_id) {
      const awardProgram = await this.prisma.awardProgram.findUnique({
        where: { id: dto.award_program_id },
      });
      if (!awardProgram) {
        throw new BadRequestException(
          `Award Program with ID ${dto.award_program_id} not found`,
        );
      }
    }

    try {
      const data: Prisma.AwardWinnerUpdateInput = {
        title: dto.title,
        description: dto.description,
        awarder_date: dto.awarder_date ? new Date(dto.awarder_date) : undefined,
        employee: dto.employee_id
          ? { connect: { id: dto.employee_id } }
          : dto.employee_id === null
            ? { disconnect: true }
            : undefined,
        awardProgram: dto.award_program_id
          ? { connect: { id: dto.award_program_id } }
          : dto.award_program_id === null
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

      const updated = await this.prisma.awardWinner.update({
        where: { id },
        data,
        include: {
          employee: true,
          awardProgram: true,
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Award winner updated successfully',
        awardWinner: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update award winner',
      );
    }
  }

  async remove(id: number) {
    const awardWinner = await this.prisma.awardWinner.findUnique({
      where: { id },
    });

    if (!awardWinner) {
      throw new NotFoundException(`Award winner with ID ${id} not found`);
    }

    try {
      await this.prisma.awardWinner.delete({
        where: { id },
      });

      return {
        message: `Award winner with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete award winner',
      );
    }
  }
}
