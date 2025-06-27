import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Prisma } from '@prisma/client';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Only JPEG, PNG, and GIF files are allowed',
      );
    }
    return {
      url: file.path.replace(/\\/g, '/'),
    };
  }

  async create(dto: CreateDocumentDto) {
    try {
      const data: Prisma.DocumentCreateInput = {
        name: dto.name,
        content: dto.content,
        document: dto.document,
        remarks: dto.remarks,
        permission: dto.permission,
        status: dto.status,
        category: dto.document_category_id
          ? { connect: { id: dto.document_category_id } }
          : undefined,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
        grantedAccess: dto.grantedAccess
          ? { connect: dto.grantedAccess.map((id) => ({ id })) }
          : undefined,
      };

      const doc = await this.prisma.document.create({
        data,
        include: { grantedAccess: true },
      });
      return {
        message: 'Document created successfully',
        document: doc,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create document',
      );
    }
  }

  async findAll(
    page: number,
    limit: number,
    keyword: string,
    document_category_id?: number,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.DocumentWhereInput = {
      ...(keyword && { name: { contains: keyword, mode: 'insensitive' } }),
      ...(document_category_id && { document_category_id }),
    };

    const [documents, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          category: true,
          grantedAccess: { select: { id: true } },
        },
      }),
      this.prisma.document.count({ where }),
    ]);

    return { documents, total, page, limit };
  }

  async findOne(id: number) {
    const doc = await this.prisma.document.findUnique({
      where: { id },
      include: {
        category: true,
        createdBy: true,
        updatedBy: true,
        grantedAccess: { select: { id: true } },
      },
    });
    if (!doc) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return { document: doc };
  }

  async update(id: number, dto: UpdateDocumentDto) {
    const existing = await this.prisma.document.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    try {
      if (
        dto.document &&
        existing.document &&
        existing.document !== dto.document
      ) {
        try {
          await unlink(existing.document);
        } catch (error) {
          console.warn(
            `Failed to delete old file ${existing.document}: ${error.message}`,
          );
        }
      }

      const data: Prisma.DocumentUpdateInput = {
        name: dto.name,
        content: dto.content,
        document: dto.document,
        remarks: dto.remarks,
        permission: dto.permission,
        status: dto.status,
        category: dto.document_category_id
          ? { connect: { id: dto.document_category_id } }
          : undefined,
        createdBy:
          dto.created_by !== undefined
            ? dto.created_by
              ? { connect: { id: dto.created_by } }
              : { disconnect: true }
            : undefined,
        updatedBy:
          dto.updated_by !== undefined
            ? dto.updated_by
              ? { connect: { id: dto.updated_by } }
              : { disconnect: true }
            : undefined,
        grantedAccess:
          dto.grantedAccess !== undefined
            ? { set: dto.grantedAccess.map((id) => ({ id })) }
            : undefined,
      };

      const updated = await this.prisma.document.update({
        where: { id },
        data,
        include: { grantedAccess: true },
      });
      return {
        message: 'Document updated successfully',
        document: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update document',
      );
    }
  }

  async remove(id: number) {
    const doc = await this.prisma.document.findUnique({
      where: { id },
    });
    if (!doc) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    const uploadsDir = join(__dirname, '..', '..', 'uploads');
    try {
      if (doc.document) {
        await unlink(doc.document);
      }
      if (doc.content) {
        const imgTagMatches =
          doc.content.match(/<img[^>]+src=["'](.*?)["']/gi) || [];
        const imageUrls: string[] = [];

        for (const imgTag of imgTagMatches) {
          const srcMatch = imgTag.match(/src=["'](.*?)["']/i);
          if (srcMatch && srcMatch[1]) {
            imageUrls.push(srcMatch[1]);
          }
        }

        for (const url of imageUrls) {
          if (url.includes('uploads/hr/document-images')) {
            try {
              const relativePath = url.replace(/^.*\/uploads\//, 'uploads/');
              const absolutePath = join(
                uploadsDir,
                relativePath.replace(/^uploads\//, ''),
              );
              await unlink(absolutePath);
            } catch (error) {
              console.warn(`Failed to delete image ${url}: ${error.message}`);
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to delete file ${doc.document}: ${error.message}`);
    }

    const deleted = await this.prisma.document.delete({
      where: { id },
    });
    return {
      message: `Document with ID ${id} deleted successfully`,
      document: deleted,
    };
  }
}
