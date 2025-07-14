import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePeerFeedbackDto } from './dto/create-peer-feedback.dto';
import { UpdatePeerFeedbackDto } from './dto/update-peer-feedback.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PeerFeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePeerFeedbackDto) {
    try {
      const data: Prisma.PeerFeedbackCreateInput = {
        feedback: dto.feedback,
        providedBy: dto.provided_by
          ? { connect: { id: dto.provided_by } }
          : undefined,
        providedTo: dto.provided_to
          ? { connect: { id: dto.provided_to } }
          : undefined,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const peerFeedback = await this.prisma.peerFeedback.create({
        data,
        include: {
          providedBy: true,
          providedTo: true,
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Peer feedback created successfully',
        peerFeedback,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create peer feedback',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.PeerFeedbackWhereInput = {
      ...(keyword && {
        feedback: { contains: keyword, mode: 'insensitive' },
      }),
    };

    const [peerFeedbacks, total] = await Promise.all([
      this.prisma.peerFeedback.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          providedBy: { select: { id: true, name: true } },
          providedTo: { select: { id: true, name: true } },
          createdBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          updatedBy: {
            select: { id: true, first_name: true, last_name: true },
          },
        },
      }),
      this.prisma.peerFeedback.count({ where }),
    ]);

    return { peerFeedbacks, total, page, limit };
  }

  async update(id: number, dto: UpdatePeerFeedbackDto) {
    const existing = await this.prisma.peerFeedback.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Peer feedback with ID ${id} not found`);
    }

    try {
      const data: Prisma.PeerFeedbackUpdateInput = {
        feedback: dto.feedback,
        providedBy: dto.provided_by
          ? { connect: { id: dto.provided_by } }
          : dto.provided_by === null
            ? { disconnect: true }
            : undefined,
        providedTo: dto.provided_to
          ? { connect: { id: dto.provided_to } }
          : dto.provided_to === null
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

      const updated = await this.prisma.peerFeedback.update({
        where: { id },
        data,
        include: {
          providedBy: { select: { id: true, name: true } },
          providedTo: { select: { id: true, name: true } },
          createdBy: {
            select: { id: true, first_name: true, last_name: true },
          },
          updatedBy: {
            select: { id: true, first_name: true, last_name: true },
          },
        },
      });
      return {
        message: 'Peer feedback updated successfully',
        peerFeedback: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update peer feedback',
      );
    }
  }

  async remove(id: number) {
    const peerFeedback = await this.prisma.peerFeedback.findUnique({
      where: { id },
    });

    if (!peerFeedback) {
      throw new NotFoundException(`Peer feedback with ID ${id} not found`);
    }

    try {
      await this.prisma.peerFeedback.delete({
        where: { id },
      });

      return {
        message: `Peer feedback with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete peer feedback',
      );
    }
  }
}
