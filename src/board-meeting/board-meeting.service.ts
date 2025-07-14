import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardMeetingDto } from './dto/create-board-meeting.dto';
import { UpdateBoardMeetingDto } from './dto/update-board-meeting.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BoardMeetingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBoardMeetingDto) {
    try {
      const data: Prisma.BoardMeetingCreateInput = {
        title: dto.title,
        date: dto.date ? new Date(dto.date) : undefined,
        meeting_location: dto.meeting_location,
        participants: dto.participants,
        agenda: dto.agenda,
        meeting_minutes: dto.meeting_minutes,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const boardMeeting = await this.prisma.boardMeeting.create({
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
        message: 'Board meeting record created successfully',
        boardMeeting,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create board meeting record',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.BoardMeetingWhereInput = {
      ...(keyword && {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { meeting_location: { contains: keyword, mode: 'insensitive' } },
          { participants: { contains: keyword, mode: 'insensitive' } },
          { agenda: { contains: keyword, mode: 'insensitive' } },
          { meeting_minutes: { contains: keyword, mode: 'insensitive' } },
        ],
      }),
    };

    const [boardMeetings, total] = await Promise.all([
      this.prisma.boardMeeting.findMany({
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
      this.prisma.boardMeeting.count({ where }),
    ]);

    return { boardMeetings, total, page, limit };
  }

  async update(id: number, dto: UpdateBoardMeetingDto) {
    const existing = await this.prisma.boardMeeting.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        `Board meeting record with ID ${id} not found`,
      );
    }

    try {
      const data: Prisma.BoardMeetingUpdateInput = {
        title: dto.title,
        date: dto.date ? new Date(dto.date) : undefined,
        meeting_location: dto.meeting_location,
        participants: dto.participants,
        agenda: dto.agenda,
        meeting_minutes: dto.meeting_minutes,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const boardMeeting = await this.prisma.boardMeeting.update({
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
        message: 'Board meeting record updated successfully',
        boardMeeting,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update board meeting record',
      );
    }
  }

  async remove(id: number) {
    const boardMeeting = await this.prisma.boardMeeting.findUnique({
      where: { id },
    });

    if (!boardMeeting) {
      throw new NotFoundException(
        `Board meeting record with ID ${id} not found`,
      );
    }

    try {
      await this.prisma.boardMeeting.delete({
        where: { id },
      });

      return {
        message: `Board meeting record with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete board meeting record',
      );
    }
  }
}
