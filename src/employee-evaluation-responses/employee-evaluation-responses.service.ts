import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeEvaluationResponseDto } from './dto/create-employee-evaluation-response.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeEvaluationResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeEvaluationResponseDto) {
    try {
      if (dto.employee_evaluation_id == null) {
        throw new BadRequestException('Employee evaluation ID cannot be null');
      }
      const evaluation = await this.prisma.employeeEvaluation.findUnique({
        where: { id: dto.employee_evaluation_id },
      });
      if (!evaluation) {
        throw new NotFoundException(
          `Employee evaluation with ID ${dto.employee_evaluation_id} not found`,
        );
      }

      const parameterAssignmentIds = dto.parameter_responses.map(
        (param) => param.parameter_mapping_id,
      );
      const existingMappings =
        await this.prisma.employeeEvaluationTemplateParameterMapping.findMany({
          where: { id: { in: parameterAssignmentIds } },
        });
      if (existingMappings.length !== parameterAssignmentIds.length) {
        throw new BadRequestException(
          'One or more parameter assignment IDs are invalid',
        );
      }

      const result = await this.prisma.$transaction(async (prisma) => {
        if (dto.evaluation_remarks || dto.improvements_suggested) {
          await prisma.employeeEvaluation.update({
            where: { id: dto.employee_evaluation_id },
            data: {
              evaluation_remarks: dto.evaluation_remarks,
              improvements_suggested: dto.improvements_suggested,
              updated_by: dto.updated_by,
              updated_at: new Date(),
            },
          });
        }

        const existingResponses =
          await prisma.employeeEvaluationResponse.findMany({
            where: {
              employee_evaluation_id: dto.employee_evaluation_id,
              parameter_mapping_id: { in: parameterAssignmentIds },
            },
          });

        const existingResponseMap = new Map(
          existingResponses.map((res) => [res.parameter_mapping_id, res]),
        );

        const responsesToCreate: Prisma.EmployeeEvaluationResponseCreateManyInput[] =
          [];
        const responsesToUpdate: { id: number; data: any }[] = [];

        dto.parameter_responses.forEach((param) => {
          const existingResponse = existingResponseMap.get(
            param.parameter_mapping_id,
          );
          if (existingResponse) {
            responsesToUpdate.push({
              id: existingResponse.id,
              data: {
                response_value: param.response_value,
                updated_by: dto.updated_by,
                updated_at: new Date(),
              },
            });
          } else {
            responsesToCreate.push({
              employee_evaluation_id: dto.employee_evaluation_id,
              parameter_mapping_id: param.parameter_mapping_id,
              response_value: param.response_value,
              created_by: dto.created_by,
              updated_by: dto.updated_by,
            });
          }
        });

        if (responsesToCreate.length > 0) {
          await prisma.employeeEvaluationResponse.createMany({
            data: responsesToCreate,
          });
        }

        for (const { id, data } of responsesToUpdate) {
          await prisma.employeeEvaluationResponse.update({
            where: { id },
            data,
          });
        }

        const responses = await prisma.employeeEvaluationResponse.findMany({
          where: {
            employee_evaluation_id: dto.employee_evaluation_id,
          },
          include: {
            evaluation: true,
            parameterAssignment: {
              include: {
                parameter: true,
                createdBy: true,
                updatedBy: true,
              },
            },
            createdBy: true,
            updatedBy: true,
          },
        });

        return responses;
      });

      return {
        message: 'Evaluation responses processed successfully',
        responses: result,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to process evaluation responses',
      );
    }
  }

  async findAll(page: number, limit: number, employeeEvaluationId: number) {
    if (employeeEvaluationId == null) {
      throw new BadRequestException('Employee evaluation ID cannot be null');
    }

    const skip = (page - 1) * limit;

    const where: Prisma.EmployeeEvaluationResponseWhereInput = {
      employee_evaluation_id: employeeEvaluationId,
    };

    const [responses, total] = await Promise.all([
      this.prisma.employeeEvaluationResponse.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
        include: {
          evaluation: true,
          parameterAssignment: {
            include: {
              parameter: true,
              createdBy: true,
              updatedBy: true,
            },
          },
          createdBy: true,
          updatedBy: true,
        },
      }),
      this.prisma.employeeEvaluationResponse.count({ where }),
    ]);

    return { responses, total, page, limit };
  }
}
