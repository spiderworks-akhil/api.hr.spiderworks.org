import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecruitmentRequestDto } from './dto/create-recruitment-request.dto';
import { UpdateRecruitmentRequestDto } from './dto/update-recruitment-request.dto';
import { Prisma, $Enums } from '@prisma/client';

@Injectable()
export class RecruitmentRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRecruitmentRequestDto) {
    try {
      const data: Prisma.RecruitmentRequestCreateInput = {
        job_title: dto.job_title,
        internal_requirement: dto.internal_requirement ?? null,
        public_job_post_content: dto.public_job_post_content ?? null,
        estimated_hiring_days: dto.estimated_hiring_days ?? null,
        priority: dto.priority ?? $Enums.PriorityLevel.MEDIUM,
        status: dto.status ?? $Enums.RecruitmentStatus.REQUESTED,
        hiring_remarks_by_hr: dto.hiring_remarks_by_hr ?? null,
        requestedBy: dto.requested_by
          ? { connect: { id: dto.requested_by } }
          : undefined,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const request = await this.prisma.recruitmentRequest.create({
        data,
        include: {
          requestedBy: true,
          createdBy: true,
          updatedBy: true,
        },
      });

      return {
        message: 'Recruitment request created successfully',
        request,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create recruitment request',
      );
    }
  }

  async getAllRequests(
    page: number,
    limit: number,
    keyword: string,
    status?: string,
    priority?: string,
  ) {
    try {
      const skip = (page - 1) * limit;

      const where: Prisma.RecruitmentRequestWhereInput = {
        AND: [
          keyword
            ? {
                OR: [
                  { job_title: { contains: keyword, mode: 'insensitive' } },
                  {
                    internal_requirement: {
                      contains: keyword,
                      mode: 'insensitive',
                    },
                  },
                  {
                    public_job_post_content: {
                      contains: keyword,
                      mode: 'insensitive',
                    },
                  },
                ],
              }
            : {},
          status ? { status: status as $Enums.RecruitmentStatus } : {},
          priority ? { priority: priority as $Enums.PriorityLevel } : {},
        ],
      };

      const [requests, total] = await Promise.all([
        this.prisma.recruitmentRequest.findMany({
          where,
          skip,
          take: limit,
          orderBy: { id: 'desc' },
          include: {
            requestedBy: true,
            createdBy: true,
            updatedBy: true,
          },
        }),
        this.prisma.recruitmentRequest.count({ where }),
      ]);

      return {
        requests,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to fetch recruitment requests',
      );
    }
  }

  async updateRequest(id: number, dto: UpdateRecruitmentRequestDto) {
    try {
      const request = await this.prisma.recruitmentRequest.findUnique({
        where: { id },
      });

      if (!request) {
        throw new NotFoundException(
          `Recruitment request with ID ${id} not found`,
        );
      }

      const data: Prisma.RecruitmentRequestUpdateInput = {
        job_title: dto.job_title ?? undefined,
        internal_requirement: dto.internal_requirement ?? undefined,
        public_job_post_content: dto.public_job_post_content ?? undefined,
        estimated_hiring_days: dto.estimated_hiring_days ?? undefined,
        priority: dto.priority ?? undefined,
        status: dto.status ?? undefined,
        hiring_remarks_by_hr: dto.hiring_remarks_by_hr ?? undefined,
        requestedBy: dto.requested_by
          ? { connect: { id: dto.requested_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const updatedRequest = await this.prisma.recruitmentRequest.update({
        where: { id },
        data,
        include: {
          requestedBy: true,
          createdBy: true,
          updatedBy: true,
        },
      });

      return {
        message: 'Recruitment request updated successfully',
        request: updatedRequest,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update recruitment request',
      );
    }
  }

  async getRequestById(id: number) {
    try {
      const request = await this.prisma.recruitmentRequest.findUnique({
        where: { id },
        include: {
          requestedBy: true,
          createdBy: true,
          updatedBy: true,
        },
      });

      if (!request) {
        throw new NotFoundException(
          `Recruitment request with ID ${id} not found`,
        );
      }

      return {
        message: 'Recruitment request retrieved successfully',
        request,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to retrieve recruitment request',
      );
    }
  }

  async remove(id: number) {
    try {
      const request = await this.prisma.recruitmentRequest.findUnique({
        where: { id },
      });
      if (!request) {
        throw new NotFoundException(
          `Recruitment request with ID ${id} not found`,
        );
      }
      const deleted = await this.prisma.recruitmentRequest.delete({
        where: { id },
      });
      return {
        message: `Recruitment request with ID ${id} deleted successfully`,
        request: deleted,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete recruitment request',
      );
    }
  }
}
