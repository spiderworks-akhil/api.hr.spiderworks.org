import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeEvaluationDto } from './dto/create-employee-evaluation.dto';
import { UpdateEmployeeEvaluationDto } from './dto/update-employee-evaluation.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeEvaluationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeEvaluationDto) {
    try {
      const data: Prisma.EmployeeEvaluationCreateInput = {
        template: dto.template_id
          ? { connect: { id: dto.template_id } }
          : undefined,
        evaluatedEmployee: dto.evaluation_for_employee_id
          ? { connect: { id: dto.evaluation_for_employee_id } }
          : undefined,
        evaluatorEmployee: dto.evaluation_by_employee_id
          ? { connect: { id: dto.evaluation_by_employee_id } }
          : undefined,
        evaluation_by_name: dto.evaluation_by_name,
        evaluation_by_email: dto.evaluation_by_email,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const evaluation = await this.prisma.employeeEvaluation.create({
        data,
        include: {
          template: true,
          evaluatedEmployee: true,
          evaluatorEmployee: true,
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Evaluation created successfully',
        evaluation,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create evaluation',
      );
    }
  }

  async findAll(
    page: number,
    limit: number,
    keyword: string,
    templateId: number,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeEvaluationWhereInput = {
      template: { id: templateId },
      ...(keyword && {
        OR: [
          { evaluation_by_name: { contains: keyword, mode: 'insensitive' } },
          { evaluation_by_email: { contains: keyword, mode: 'insensitive' } },
        ],
      }),
    };

    const [evaluations, total] = await Promise.all([
      this.prisma.employeeEvaluation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          template: {
            include: {
              parameterMapping: {
                include: {
                  parameter: true,
                  createdBy: true,
                  updatedBy: true,
                },
              },
            },
          },
          evaluatedEmployee: true,
          evaluatorEmployee: true,
          createdBy: true,
          updatedBy: true,
        },
      }),
      this.prisma.employeeEvaluation.count({ where }),
    ]);

    return { evaluations, total, page, limit };
  }

  async findOne(id: number) {
    const evaluation = await this.prisma.employeeEvaluation.findUnique({
      where: { id },
      include: {
        template: true,
        evaluatedEmployee: true,
        evaluatorEmployee: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    if (!evaluation) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }
    return { evaluation };
  }

  async update(id: number, dto: UpdateEmployeeEvaluationDto) {
    const existing = await this.prisma.employeeEvaluation.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }

    try {
      const data: Prisma.EmployeeEvaluationUpdateInput = {
        template: dto.template_id
          ? { connect: { id: dto.template_id } }
          : dto.template_id === null
            ? { disconnect: true }
            : undefined,
        evaluatedEmployee: dto.evaluation_for_employee_id
          ? { connect: { id: dto.evaluation_for_employee_id } }
          : dto.evaluation_for_employee_id === null
            ? { disconnect: true }
            : undefined,
        evaluatorEmployee: dto.evaluation_by_employee_id
          ? { connect: { id: dto.evaluation_by_employee_id } }
          : dto.evaluation_by_employee_id === null
            ? { disconnect: true }
            : undefined,
        evaluation_by_name: dto.evaluation_by_name,
        evaluation_by_email: dto.evaluation_by_email,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
      };

      const updated = await this.prisma.employeeEvaluation.update({
        where: { id },
        data,
        include: {
          template: true,
          evaluatedEmployee: true,
          evaluatorEmployee: true,
          createdBy: true,
          updatedBy: true,
        },
      });
      return {
        message: 'Evaluation updated successfully',
        evaluation: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update evaluation',
      );
    }
  }

  async remove(id: number) {
    const evaluation = await this.prisma.employeeEvaluation.findUnique({
      where: { id },
    });
    if (!evaluation) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }

    const deleted = await this.prisma.employeeEvaluation.delete({
      where: { id },
      include: {
        template: true,
        evaluatedEmployee: true,
        evaluatorEmployee: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    return {
      message: `Evaluation with ID ${id} deleted successfully`,
      evaluation: deleted,
    };
  }
}
