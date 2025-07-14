import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentCategoryDto } from './dto/create-document-category.dto';
import { UpdateDocumentCategoryDto } from './dto/update-document-category.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DocumentCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDocumentCategoryDto) {
    try {
      const data: Prisma.DocumentCategoryCreateInput = {
        name: dto.name,
        remarks: dto.remarks,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const documentCategory = await this.prisma.documentCategory.create({
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
        message: 'Document category created successfully',
        documentCategory,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create document category',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.DocumentCategoryWhereInput = {
      ...(keyword && {
        name: { contains: keyword, mode: 'insensitive' },
      }),
    };

    const [documentCategories, total] = await Promise.all([
      this.prisma.documentCategory.findMany({
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
      this.prisma.documentCategory.count({ where }),
    ]);

    return { documentCategories, total, page, limit };
  }

  async update(id: number, dto: UpdateDocumentCategoryDto) {
    const existing = await this.prisma.documentCategory.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Document category with ID ${id} not found`);
    }

    try {
      const data: Prisma.DocumentCategoryUpdateInput = {
        name: dto.name,
        remarks: dto.remarks,
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

      const updated = await this.prisma.documentCategory.update({
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
        message: 'Document category updated successfully',
        documentCategory: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update document category',
      );
    }
  }

  async remove(id: number) {
    const documentCategory = await this.prisma.documentCategory.findUnique({
      where: { id },
      include: {
        documents: true,
      },
    });

    if (!documentCategory) {
      throw new NotFoundException(`Document category with ID ${id} not found`);
    }

    try {
      await this.prisma.$transaction([
        this.prisma.document.updateMany({
          where: { document_category_id: id },
          data: { document_category_id: null },
        }),

        this.prisma.documentCategory.delete({
          where: { id },
        }),
      ]);

      return {
        message: `Document category with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete document category',
      );
    }
  }
}
