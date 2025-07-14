import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStarRatingDto, EntityType } from './dto/create-star-rating.dto';
import { UpdateStarRatingDto } from './dto/update-star-rating.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StarRatingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateStarRatingDto) {
    if (dto.given_by_id === dto.given_to_id) {
      throw new BadRequestException(
        'Employees cannot give star ratings to themselves',
      );
    }

    if (dto.entity_type === EntityType.PERFORMANCE_GOAL && !dto.entity_id) {
      throw new BadRequestException(
        'entity_id is required when entity_type is PERFORMANCE_GOAL',
      );
    }

    try {
      const data: Prisma.StarRatingCreateInput = {
        givenBy: dto.given_by_id
          ? { connect: { id: dto.given_by_id } }
          : undefined,
        givenTo: dto.given_to_id
          ? { connect: { id: dto.given_to_id } }
          : undefined,
        star_type: dto.star_type,
        star_count: dto.star_count,
        label: dto.label,
        entity_type: dto.entity_type,
        performanceGoal:
          dto.entity_type === EntityType.PERFORMANCE_GOAL && dto.entity_id
            ? { connect: { id: dto.entity_id } }
            : undefined,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const starRating = await this.prisma.$transaction(async (prisma) => {
        const rating = await prisma.starRating.create({
          data,
          include: {
            givenBy: { select: { id: true, name: true } },
            givenTo: { select: { id: true, name: true } },
            createdBy: {
              select: { id: true, first_name: true, last_name: true },
            },
            updatedBy: {
              select: { id: true, first_name: true, last_name: true },
            },
          },
        });
        return rating;
      });

      return {
        message: 'Star rating created successfully',
        starRating,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create star rating',
      );
    }
  }

  async findAll(
    page: number,
    limit: number,
    givenById?: number,
    givenToId?: number,
    employeeId?: number,
    starCount?: number,
    from?: string,
    to?: string,
  ) {
    const skip = (page - 1) * limit;

    let fromDate: Date | undefined;
    let toDate: Date | undefined;

    if (from) {
      fromDate = new Date(from);
      fromDate.setUTCHours(0, 0, 0, 0);
    }

    if (to) {
      toDate = new Date(to);
      toDate.setUTCHours(23, 59, 59, 999);
    }

    const where: Prisma.StarRatingWhereInput = {
      ...(employeeId && {
        OR: [{ given_by_id: employeeId }, { given_to_id: employeeId }],
      }),
      ...(givenById && !employeeId && { given_by_id: givenById }),
      ...(givenToId && !employeeId && { given_to_id: givenToId }),
      ...(starCount && { star_count: starCount }),
      ...(fromDate || toDate
        ? {
            created_at: {
              ...(fromDate && { gte: fromDate }),
              ...(toDate && { lte: toDate }),
            },
          }
        : {}),
    };

    const [starRatings, total] = await Promise.all([
      this.prisma.starRating.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          givenBy: { select: { id: true, name: true } },
          givenTo: { select: { id: true, name: true } },
          createdBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          updatedBy: {
            select: { id: true, first_name: true, last_name: true },
          },
        },
      }),
      this.prisma.starRating.count({ where }),
    ]);

    return { starRatings, total, page, limit };
  }

  async findOne(id: number) {
    const starRating = await this.prisma.starRating.findUnique({
      where: { id },
      include: {
        givenBy: { select: { id: true, name: true } },
        givenTo: { select: { id: true, name: true } },
        createdBy: { select: { id: true, first_name: true, last_name: true } },
        updatedBy: { select: { id: true, first_name: true, last_name: true } },
      },
    });
    if (!starRating) {
      throw new NotFoundException(`Star rating with ID ${id} not found`);
    }
    return { starRating };
  }

  async update(id: number, dto: UpdateStarRatingDto) {
    const existing = await this.prisma.starRating.findUnique({
      where: { id },
      include: {
        givenBy: true,
        givenTo: true,
      },
    });
    if (!existing) {
      throw new NotFoundException(`Star rating with ID ${id} not found`);
    }

    if (dto.given_by_id !== undefined || dto.given_to_id !== undefined) {
      const finalGivenById = dto.given_by_id ?? existing.given_by_id;
      const finalGivenToId = dto.given_to_id ?? existing.given_to_id;
      if (
        finalGivenById &&
        finalGivenToId &&
        finalGivenById === finalGivenToId
      ) {
        throw new BadRequestException(
          'Employees cannot give star ratings to themselves',
        );
      }
    }

    if (dto.entity_type === EntityType.PERFORMANCE_GOAL && !dto.entity_id) {
      throw new BadRequestException(
        'entity_id is required when entity_type is PERFORMANCE_GOAL',
      );
    }

    try {
      const data: Prisma.StarRatingUpdateInput = {
        givenBy: dto.given_by_id
          ? { connect: { id: dto.given_by_id } }
          : dto.given_by_id === null
            ? { disconnect: true }
            : undefined,
        givenTo: dto.given_to_id
          ? { connect: { id: dto.given_to_id } }
          : dto.given_to_id === null
            ? { disconnect: true }
            : undefined,
        star_type: dto.star_type,
        star_count: dto.star_count,
        label: dto.label,
        entity_type: dto.entity_type,
        performanceGoal:
          dto.entity_type === EntityType.PERFORMANCE_GOAL && dto.entity_id
            ? { connect: { id: dto.entity_id } }
            : dto.entity_id === null
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

      if (existing.entity_type === 'PERFORMANCE_GOAL' && existing.entity_id) {
        const updateData: Prisma.PerformanceGoalUpdateInput = {};

        if (dto.star_type === 'GREEN') {
          updateData.green_star_count = dto.star_count ?? 0;
        } else if (dto.star_type === 'RED') {
          updateData.red_star_count = dto.star_count ?? 0;
        }

        if (Object.keys(updateData).length > 0) {
          await this.prisma.performanceGoal.update({
            where: { id: existing.entity_id },
            data: updateData,
          });
        }
      }

      const updated = await this.prisma.starRating.update({
        where: { id },
        data,
        include: {
          givenBy: { select: { id: true, name: true } },
          givenTo: { select: { id: true, name: true } },
          createdBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          updatedBy: {
            select: { id: true, first_name: true, last_name: true },
          },
        },
      });

      return {
        message: 'Star rating updated successfully',
        starRating: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update star rating',
      );
    }
  }

  async remove(id: number) {
    const starRating = await this.prisma.starRating.findUnique({
      where: { id },
    });
    if (!starRating) {
      throw new NotFoundException(`Star rating with ID ${id} not found`);
    }

    try {
      const deleted = await this.prisma.starRating.delete({
        where: { id },
      });
      return {
        message: `Star rating with ID ${id} deleted successfully`,
        starRating: deleted,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete star rating',
      );
    }
  }
}
