import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAwardProgramDto } from './dto/create-award-program.dto';
import { UpdateAwardProgramDto } from './dto/update-award-program.dto';
import { Prisma } from '@prisma/client';
import { unlink } from 'fs/promises';

@Injectable()
export class AwardProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAwardProgramDto) {
    try {
      const data: Prisma.AwardProgramCreateInput = {
        title: dto.title,
        description: dto.description,
        expiry_date: dto.expiry_date ? new Date(dto.expiry_date) : undefined,
        thumbnail: dto.thumbnail,
        is_active: dto.is_active ?? 0,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const awardProgram = await this.prisma.awardProgram.create({ data });
      return {
        message: 'Award program created successfully',
        awardProgram,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create award program',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.AwardProgramWhereInput = {
      ...(keyword && { title: { contains: keyword, mode: 'insensitive' } }),
    };

    const [awardPrograms, total] = await Promise.all([
      this.prisma.awardProgram.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          createdBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          updatedBy: {
            select: { id: true, first_name: true, last_name: true },
          },
        },
      }),
      this.prisma.awardProgram.count({ where }),
    ]);

    return { awardPrograms, total, page, limit };
  }

  async update(id: number, dto: UpdateAwardProgramDto) {
    const existing = await this.prisma.awardProgram.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Award program with ID ${id} not found`);
    }

    try {
      if (dto.thumbnail && existing.thumbnail !== dto.thumbnail) {
        try {
          if (existing.thumbnail) {
            await unlink(existing.thumbnail);
          }
        } catch (error) {
          console.warn(
            `Failed to delete old file ${existing.thumbnail}: ${error.message}`,
          );
        }
      }

      const data: Prisma.AwardProgramUpdateInput = {
        title: dto.title,
        description: dto.description,
        expiry_date: dto.expiry_date ? new Date(dto.expiry_date) : undefined,
        thumbnail: dto.thumbnail,
        is_active: dto.is_active,
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

      const updated = await this.prisma.awardProgram.update({
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
        message: 'Award program updated successfully',
        awardProgram: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update award program',
      );
    }
  }

  async remove(id: number) {
    const awardProgram = await this.prisma.awardProgram.findUnique({
      where: { id },
    });
    if (!awardProgram) {
      throw new NotFoundException(`Award program with ID ${id} not found`);
    }

    try {
      if (awardProgram.thumbnail) {
        await unlink(awardProgram.thumbnail);
      }
    } catch (error) {
      console.warn(
        `Failed to delete file ${awardProgram.thumbnail}: ${error.message}`,
      );
    }

    const deleted = await this.prisma.awardProgram.delete({
      where: { id },
    });
    return {
      message: `Award program with ID ${id} deleted successfully`,
      awardProgram: deleted,
    };
  }
}
