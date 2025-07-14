import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePerformanceGoalDto } from './dto/create-performance-goal.dto';
import { UpdatePerformanceGoalDto } from './dto/update-performance-goal.dto';
import { ReviewPerformanceGoalDto } from './dto/review-performance-goal.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PerformanceGoalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePerformanceGoalDto) {
    if (dto.reviewer_id && dto.user_ids.includes(dto.reviewer_id)) {
      throw new BadRequestException(
        'Employees cannot assign goals to themselves',
      );
    }

    try {
      const data: Prisma.PerformanceGoalCreateInput = {
        title: dto.title,
        description: dto.description,
        reviewer: dto.reviewer_id
          ? { connect: { id: dto.reviewer_id } }
          : undefined,
        target_date: dto.target_date ? new Date(dto.target_date) : undefined,
        green_star_count: dto.green_star_count,
        red_star_count: dto.red_star_count,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
        assignments: {
          create: dto.user_ids.map((user_id) => ({
            user: { connect: { id: user_id } },
          })),
        },
      };

      const goal = await this.prisma.performanceGoal.create({
        data,
        include: {
          reviewer: { select: { id: true, name: true } },
          createdBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          updatedBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          assignments: {
            include: { user: { select: { id: true, name: true } } },
          },
        },
      });

      return {
        message: 'Performance goal created successfully',
        performanceGoal: goal,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create performance goal',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.PerformanceGoalWhereInput = {
      ...(keyword && {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } },
        ],
      }),
    };

    const [performanceGoals, total] = await Promise.all([
      this.prisma.performanceGoal.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          reviewer: { select: { id: true, name: true } },
          createdBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          updatedBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          assignments: {
            include: { user: { select: { id: true, name: true } } },
          },
        },
      }),
      this.prisma.performanceGoal.count({ where }),
    ]);

    return { performanceGoals, total, page, limit };
  }

  async update(id: number, dto: UpdatePerformanceGoalDto) {
    const existing = await this.prisma.performanceGoal.findUnique({
      where: { id },
      include: { assignments: { select: { user_id: true } } },
    });
    if (!existing) {
      throw new NotFoundException(`Performance goal with ID ${id} not found`);
    }

    if (dto.reviewer_id && dto.user_ids?.includes(dto.reviewer_id)) {
      throw new BadRequestException(
        'Employees cannot assign goals to themselves',
      );
    }

    try {
      const data: Prisma.PerformanceGoalUpdateInput = {
        title: dto.title,
        description: dto.description,
        reviewer: dto.reviewer_id
          ? { connect: { id: dto.reviewer_id } }
          : dto.reviewer_id === null
            ? { disconnect: true }
            : undefined,
        target_date: dto.target_date ? new Date(dto.target_date) : undefined,
        green_star_count: dto.green_star_count,
        red_star_count: dto.red_star_count,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : dto.created_by === null
            ? { disconnect: true }
            : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
        ...(dto.user_ids && {
          assignments: {
            deleteMany: {},
            create: dto.user_ids.map((user_id) => ({
              user: { connect: { id: user_id } },
            })),
          },
        }),
      };

      const goal = await this.prisma.performanceGoal.update({
        where: { id },
        data,
        include: {
          reviewer: { select: { id: true, name: true } },
          createdBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          updatedBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          assignments: {
            include: { user: { select: { id: true, name: true } } },
          },
        },
      });

      return {
        message: 'Performance goal updated successfully',
        performanceGoal: goal,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update performance goal',
      );
    }
  }

  async review(id: number, dto: ReviewPerformanceGoalDto) {
    const existing = await this.prisma.performanceGoal.findUnique({
      where: { id },
      include: { assignments: { select: { user_id: true } }, reviewer: true },
    });
    if (!existing) {
      throw new NotFoundException(`Performance goal with ID ${id} not found`);
    }

    const reviewerId = dto.reviewer_id || existing.reviewer_id;
    if (!reviewerId) {
      throw new BadRequestException('Reviewer ID must be provided');
    }

    if (existing.assignments.some((a) => a.user_id === reviewerId)) {
      throw new BadRequestException('Reviewers cannot review their own goals');
    }

    try {
      const data: Prisma.PerformanceGoalUpdateInput = {
        result: dto.result,
        result_remarks: dto.result_remarks,
        result_percentage_achieved: dto.result_percentage_achieved,
        achieved_date: dto.achieved_date
          ? new Date(dto.achieved_date)
          : undefined,
        green_star_count: dto.green_star_count,
        red_star_count: dto.red_star_count,
        reviewed_date: new Date(),
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const result = await this.prisma.$transaction(async (prisma) => {
        const goal = await prisma.performanceGoal.update({
          where: { id },
          data,
          include: {
            reviewer: { select: { id: true, name: true } },
            createdBy: {
              select: { id: true, first_name: true, last_name: true },
            },
            updatedBy: {
              select: { id: true, first_name: true, last_name: true },
            },
            assignments: {
              include: { user: { select: { id: true, name: true } } },
            },
          },
        });

        const starRatings: Prisma.StarRatingGetPayload<{
          include: {
            givenBy: { select: { id: true; name: true } };
            givenTo: { select: { id: true; name: true } };
            createdBy: {
              select: { id: true; first_name: true; last_name: true };
            };
            updatedBy: {
              select: { id: true; first_name: true; last_name: true };
            };
          };
        }>[] = [];
        const assignedUserIds = existing.assignments.map((a) => a.user_id);

        const existingStarRatings = await prisma.starRating.findMany({
          where: {
            entity_type: 'PERFORMANCE_GOAL',
            entity_id: id,
            star_type: { in: ['GREEN', 'RED'] },
            given_by_id: reviewerId,
            given_to_id: { in: assignedUserIds },
          },
        });

        if (dto.green_star_count != null && dto.green_star_count >= 0) {
          for (const user_id of assignedUserIds) {
            const existingGreenRating = existingStarRatings.find(
              (rating) =>
                rating.star_type === 'GREEN' &&
                rating.given_to_id === user_id &&
                rating.entity_id === id,
            );

            if (existingGreenRating) {
              const starRating = await prisma.starRating.update({
                where: { id: existingGreenRating.id },
                data: {
                  star_count: dto.green_star_count,
                  label: goal.title,
                  updatedBy: dto.updated_by
                    ? { connect: { id: dto.updated_by } }
                    : undefined,
                  updated_at: new Date(),
                },
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
              starRatings.push(starRating);
            } else {
              const starRating = await prisma.starRating.create({
                data: {
                  givenBy: { connect: { id: reviewerId } },
                  givenTo: { connect: { id: user_id } },
                  star_type: 'GREEN',
                  star_count: dto.green_star_count,
                  label: goal.title,
                  entity_type: 'PERFORMANCE_GOAL',
                  performanceGoal: { connect: { id: goal.id } },
                  createdBy: dto.created_by
                    ? { connect: { id: dto.created_by } }
                    : undefined,
                  updatedBy: dto.updated_by
                    ? { connect: { id: dto.updated_by } }
                    : undefined,
                },
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
              starRatings.push(starRating);
            }
          }
        }

        if (dto.red_star_count != null && dto.red_star_count >= 0) {
          for (const user_id of assignedUserIds) {
            const existingRedRating = existingStarRatings.find(
              (rating) =>
                rating.star_type === 'RED' &&
                rating.given_to_id === user_id &&
                rating.entity_id === id,
            );

            if (existingRedRating) {
              const starRating = await prisma.starRating.update({
                where: { id: existingRedRating.id },
                data: {
                  star_count: dto.red_star_count,
                  label: goal.title,
                  updatedBy: dto.updated_by
                    ? { connect: { id: dto.updated_by } }
                    : undefined,
                  updated_at: new Date(),
                },
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
              starRatings.push(starRating);
            } else {
              const starRating = await prisma.starRating.create({
                data: {
                  givenBy: { connect: { id: reviewerId } },
                  givenTo: { connect: { id: user_id } },
                  star_type: 'RED',
                  star_count: dto.red_star_count,
                  label: goal.title,
                  entity_type: 'PERFORMANCE_GOAL',
                  performanceGoal: { connect: { id: goal.id } },
                  createdBy: dto.created_by
                    ? { connect: { id: dto.created_by } }
                    : undefined,
                  updatedBy: dto.updated_by
                    ? { connect: { id: dto.updated_by } }
                    : undefined,
                },
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
              starRatings.push(starRating);
            }
          }
        }

        return { goal, starRatings };
      });

      return {
        message: 'Performance goal reviewed successfully',
        performanceGoal: result.goal,
        starRatings: result.starRatings,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to review performance goal',
      );
    }
  }

  async remove(id: number) {
    const performanceGoal = await this.prisma.performanceGoal.findUnique({
      where: { id },
      include: { assignments: true },
    });

    if (!performanceGoal) {
      throw new NotFoundException(`Performance goal with ID ${id} not found`);
    }

    try {
      await this.prisma.$transaction([
        this.prisma.starRating.deleteMany({
          where: { entity_type: 'PERFORMANCE_GOAL', entity_id: id },
        }),
        this.prisma.performanceGoalAssignment.deleteMany({
          where: { goal_id: id },
        }),
        this.prisma.performanceGoal.delete({
          where: { id },
        }),
      ]);

      return {
        message: `Performance goal with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete performance goal',
      );
    }
  }
}
