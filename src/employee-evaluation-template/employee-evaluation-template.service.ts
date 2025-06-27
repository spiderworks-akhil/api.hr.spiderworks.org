import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeEvaluationTemplateDto } from './dto/create-employee-evaluation-template.dto';
import { UpdateEmployeeEvaluationTemplateDto } from './dto/update-employee-evaluation-template.dto';
import { ParameterSelectionDto } from './dto/parameter-selection.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeEvaluationTemplateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeEvaluationTemplateDto) {
    try {
      const data: Prisma.EmployeeEvaluationTemplateCreateInput = {
        name: dto.name,
        rate_by_self: dto.rate_by_self,
        rate_by_client: dto.rate_by_client,
        rate_by_manager: dto.rate_by_manager,
        status: dto.status,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const template = await this.prisma.employeeEvaluationTemplate.create({
        data,
        include: { createdBy: true, updatedBy: true },
      });
      return {
        message: 'Evaluation template created successfully',
        template,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create evaluation template',
      );
    }
  }

  async findAll(page: number, limit: number, keyword: string) {
    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeEvaluationTemplateWhereInput = {
      ...(keyword && { name: { contains: keyword, mode: 'insensitive' } }),
    };

    const [templates, total] = await Promise.all([
      this.prisma.employeeEvaluationTemplate.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          createdBy: true,
          updatedBy: true,
          parameterMapping: {
            include: {
              parameter: true,
            },
          },
        },
      }),
      this.prisma.employeeEvaluationTemplate.count({ where }),
    ]);

    return { templates, total, page, limit };
  }

  async findOne(id: number) {
    const template = await this.prisma.employeeEvaluationTemplate.findUnique({
      where: { id },
      include: {
        createdBy: true,
        updatedBy: true,
        parameterMapping: {
          include: {
            parameter: true,
          },
        },
      },
    });
    if (!template) {
      throw new NotFoundException(
        `Evaluation template with ID ${id} not found`,
      );
    }
    return { template };
  }

  async update(id: number, dto: UpdateEmployeeEvaluationTemplateDto) {
    const existing = await this.prisma.employeeEvaluationTemplate.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(
        `Evaluation template with ID ${id} not found`,
      );
    }

    try {
      const data: Prisma.EmployeeEvaluationTemplateUpdateInput = {
        name: dto.name,
        rate_by_self: dto.rate_by_self,
        rate_by_client: dto.rate_by_client,
        rate_by_manager: dto.rate_by_manager,
        status: dto.status,
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
      };

      const updated = await this.prisma.employeeEvaluationTemplate.update({
        where: { id },
        data,
        include: {
          createdBy: true,
          updatedBy: true,
          parameterMapping: {
            include: {
              parameter: true,
            },
          },
        },
      });
      return {
        message: 'Evaluation template updated successfully',
        template: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update evaluation template',
      );
    }
  }

  async remove(id: number) {
    const template = await this.prisma.employeeEvaluationTemplate.findUnique({
      where: { id },
    });
    if (!template) {
      throw new NotFoundException(
        `Evaluation template with ID ${id} not found`,
      );
    }

    const deleted = await this.prisma.employeeEvaluationTemplate.delete({
      where: { id },
      include: {
        parameterMapping: {
          include: { parameter: true },
        },
      },
    });
    return {
      message: `Evaluation template with ID ${id} deleted successfully`,
      template: deleted,
    };
  }

  async selectParameters(id: number, dto: ParameterSelectionDto) {
    const template = await this.prisma.employeeEvaluationTemplate.findUnique({
      where: { id },
    });
    if (!template) {
      throw new NotFoundException(
        `Evaluation template with ID ${id} not found`,
      );
    }

    try {
      if (dto.parameters.length > 0) {
        const parameterIds = dto.parameters.map((p) => p.parameter_id);
        const existingParameters =
          await this.prisma.employeeRatingParameter.findMany({
            where: { id: { in: parameterIds } },
          });
        if (existingParameters.length !== parameterIds.length) {
          throw new BadRequestException(
            'One or more parameter IDs are invalid',
          );
        }

        const existingMappings =
          await this.prisma.employeeEvaluationTemplateParameterMapping.findMany(
            {
              where: {
                template_id: id,
                parameter_id: { in: parameterIds },
              },
            },
          );
        const existingParameterIds = existingMappings.map(
          (m) => m.parameter_id,
        );
        const newParameters = dto.parameters.filter(
          (p) => !existingParameterIds.includes(p.parameter_id),
        );

        if (newParameters.length === 0) {
          return {
            message:
              'All provided parameters are already assigned to the template',
            template: await this.findOne(id),
          };
        }

        await this.prisma.$transaction(async (prisma) => {
          for (const param of newParameters) {
            await prisma.employeeEvaluationTemplateParameterMapping.create({
              data: {
                template: { connect: { id } },
                parameter: { connect: { id: param.parameter_id } },
                createdBy: template.created_by
                  ? { connect: { id: template.created_by } }
                  : undefined,
                updatedBy: template.updated_by
                  ? { connect: { id: template.updated_by } }
                  : undefined,
              },
            });
          }
        });
      }

      return {
        message: 'Parameters selected successfully',
        template: await this.findOne(id),
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to select parameters',
      );
    }
  }

  async unselectParameters(id: number, dto: ParameterSelectionDto) {
    const template = await this.prisma.employeeEvaluationTemplate.findUnique({
      where: { id },
    });
    if (!template) {
      throw new NotFoundException(
        `Evaluation template with ID ${id} not found`,
      );
    }

    try {
      if (dto.parameters.length > 0) {
        const parameterIds = dto.parameters.map((p) => p.parameter_id);
        const existingParameters =
          await this.prisma.employeeRatingParameter.findMany({
            where: { id: { in: parameterIds } },
          });
        if (existingParameters.length !== parameterIds.length) {
          throw new BadRequestException(
            'One or more parameter IDs are invalid',
          );
        }

        const existingMappings =
          await this.prisma.employeeEvaluationTemplateParameterMapping.findMany(
            {
              where: {
                template_id: id,
                parameter_id: { in: parameterIds },
              },
            },
          );

        if (existingMappings.length === 0) {
          return {
            message: 'No provided parameters are assigned to the template',
            template: await this.findOne(id),
          };
        }

        await this.prisma.employeeEvaluationTemplateParameterMapping.deleteMany(
          {
            where: {
              template_id: id,
              parameter_id: { in: parameterIds },
            },
          },
        );
      }

      return {
        message: 'Parameters unselected successfully',
        template: await this.findOne(id),
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to unselect parameters',
      );
    }
  }
}
