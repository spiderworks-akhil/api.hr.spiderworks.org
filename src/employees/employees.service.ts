import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UpdateEmployeePermissionsDto } from './dto/update-employee-permissions.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEmployeeDto) {
    try {
      const maxIdEmployee = await this.prisma.employee.findFirst({
        orderBy: { id: 'desc' },
        select: { id: true },
      });
      const newId = maxIdEmployee ? maxIdEmployee.id + 1 : 1;

      if (dto.personal_email || dto.work_email) {
        const existingEmployee = await this.prisma.employee.findFirst({
          where: {
            OR: [
              dto.personal_email ? { personal_email: dto.personal_email } : {},
              dto.work_email ? { work_email: dto.work_email } : {},
            ],
          },
        });
        if (existingEmployee) {
          throw new BadRequestException(
            'Employee with this email already exists',
          );
        }
      }

      if (dto.user_id) {
        const existingUser = await this.prisma.employee.findFirst({
          where: { user_id: dto.user_id },
        });
        if (existingUser) {
          throw new BadRequestException(
            'Employee with this user ID already exists',
          );
        }
      }

      if (dto.employee_code) {
        const existingCode = await this.prisma.employee.findFirst({
          where: { employee_code: String(dto.employee_code) },
        });
        if (existingCode) {
          throw new BadRequestException(
            'Employee with this employee code already exists',
          );
        }
      }

      if (dto.additional_manager_ids && dto.additional_manager_ids.length > 0) {
        const validManagers = await this.prisma.employee.findMany({
          where: { id: { in: dto.additional_manager_ids } },
        });
        if (validManagers.length !== dto.additional_manager_ids.length) {
          throw new BadRequestException(
            'One or more additional manager IDs are invalid',
          );
        }
      }

      if (dto.departments_id) {
        const department = await this.prisma.department.findUnique({
          where: { id: dto.departments_id },
        });
        if (!department) {
          throw new BadRequestException(
            `Department with ID ${dto.departments_id} not found`,
          );
        }
      }

      if (dto.employee_level_id) {
        const level = await this.prisma.employeeLevel.findUnique({
          where: { id: dto.employee_level_id },
        });
        if (!level) {
          throw new BadRequestException(
            `Employee level with ID ${dto.employee_level_id} not found`,
          );
        }
      }

      if (dto.manager_id) {
        const manager = await this.prisma.employee.findUnique({
          where: { id: dto.manager_id },
        });
        if (!manager) {
          throw new BadRequestException(
            `Manager with ID ${dto.manager_id} not found`,
          );
        }
      }

      if (dto.created_by) {
        const creator = await this.prisma.employee.findUnique({
          where: { id: dto.created_by },
        });
        if (!creator) {
          throw new BadRequestException(
            `Creator with ID ${dto.created_by} not found`,
          );
        }
      }

      if (dto.updated_by) {
        const updater = await this.prisma.employee.findUnique({
          where: { id: dto.updated_by },
        });
        if (!updater) {
          throw new BadRequestException(
            `Updater with ID ${dto.updated_by} not found`,
          );
        }
      }

      const data: Prisma.EmployeeCreateInput = {
        id: newId,
        employee_code: dto.employee_code ? String(dto.employee_code) : null,
        name: dto.name,
        personal_email: dto.personal_email ?? null,
        work_email: dto.work_email ?? null,
        personal_phone: dto.personal_phone ?? null,
        office_phone: dto.office_phone ?? null,
        official_date_of_birth: dto.official_date_of_birth
          ? new Date(dto.official_date_of_birth)
          : null,
        celebrated_date_of_birth: dto.celebrated_date_of_birth
          ? new Date(dto.celebrated_date_of_birth)
          : null,
        marriage_date: dto.marriage_date ? new Date(dto.marriage_date) : null,
        joining_date: dto.joining_date ? new Date(dto.joining_date) : null,
        releaving_date: dto.releaving_date
          ? new Date(dto.releaving_date)
          : null,
        employee_type: dto.employee_type ?? null,
        address: dto.address ?? null,
        remarks: dto.remarks ?? null,
        reporting_email: dto.reporting_email ?? null,
        last_sign_in_email: dto.last_sign_in_email ?? null,
        last_sign_out_email: dto.last_sign_out_email ?? null,
        leave_notification_mails: dto.leave_notification_mails ?? null,
        is_signin_mandatory: dto.is_signin_mandatory ?? 1,
        has_work_portal_access: dto.has_work_portal_access ?? 0,
        has_hr_portal_access: dto.has_hr_portal_access ?? 0,
        has_client_portal_access: dto.has_client_portal_access ?? 0,
        has_inventory_portal_access: dto.has_inventory_portal_access ?? 0,
        has_super_admin_access: dto.has_super_admin_access ?? 0,
        has_accounts_portal_access: dto.has_accounts_portal_access ?? 0,
        has_admin_portal_access: dto.has_admin_portal_access ?? 0,
        has_showcase_portal_access: dto.has_showcase_portal_access ?? 0,
        facebook_url: dto.facebook_url ?? null,
        instagram_url: dto.instagram_url ?? null,
        linkedin_url: dto.linkedin_url ?? null,
        blog_url: dto.blog_url ?? null,
        selfi_photo: dto.selfi_photo ?? null,
        family_photo: dto.family_photo ?? null,
        designation: dto.designation ?? null,
        confirmation_date: dto.confirmation_date
          ? new Date(dto.confirmation_date)
          : null,
        Department: dto.departments_id
          ? { connect: { id: dto.departments_id } }
          : undefined,
        Role: dto.employee_roles_id
          ? { connect: { id: dto.employee_roles_id } }
          : undefined,
        employeeLevel: dto.employee_level_id
          ? { connect: { id: dto.employee_level_id } }
          : undefined,
        manager: dto.manager_id
          ? { connect: { id: dto.manager_id } }
          : undefined,
        createdBy: dto.created_by
          ? { connect: { id: dto.created_by } }
          : undefined,
        updatedBy: dto.updated_by
          ? { connect: { id: dto.updated_by } }
          : undefined,
        user: dto.user_id ? { connect: { id: dto.user_id } } : undefined,
        additionalManagers: {
          connect:
            dto.additional_manager_ids?.map((managerId) => ({
              id: managerId,
            })) ?? [],
        },
      };

      const employee = await this.prisma.employee.create({
        data,
        include: {
          Department: true,
          Role: true,
          employeeLevel: true,
          manager: true,
          additionalManagers: { select: { id: true, name: true } },
          createdBy: true,
          updatedBy: true,
        },
      });

      return {
        message: 'Employee created successfully',
        employee,
      };
    } catch (error) {
      throw new BadRequestException(
        `While creating employee record: ${error.message || 'Failed to create employee'}`,
      );
    }
  }

  async getAllEmployees(
    page: number,
    limit: number,
    keyword: string,
    employeeRole?: string,
    employeeLevel?: string,
    employeeType?: string,
    department?: string,
  ) {
    try {
      const skip = (page - 1) * limit;

      const where: Prisma.EmployeeWhereInput = {
        AND: [
          keyword
            ? {
                OR: [
                  { name: { contains: keyword, mode: 'insensitive' } },
                  {
                    personal_email: { contains: keyword, mode: 'insensitive' },
                  },
                  { work_email: { contains: keyword, mode: 'insensitive' } },
                ],
              }
            : {},
          employeeRole ? { Role: { name: employeeRole } } : {},
          employeeLevel ? { employeeLevel: { name: employeeLevel } } : {},
          employeeType
            ? { employee_type: { equals: employeeType, mode: 'insensitive' } }
            : {},
          department ? { Department: { name: department } } : {},
        ],
      };

      const [employees, total] = await Promise.all([
        this.prisma.employee.findMany({
          where,
          skip,
          take: limit,
          orderBy: { id: 'desc' },
          include: {
            Department: true,
            Role: true,
            employeeLevel: true,
            manager: true,
            additionalManagers: { select: { id: true, name: true } },
            createdBy: true,
            updatedBy: true,
          },
        }),
        this.prisma.employee.count({ where }),
      ]);

      return {
        employees,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to fetch employees',
      );
    }
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id },
      });
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      if (dto.personal_email !== undefined || dto.work_email !== undefined) {
        const existingEmployee = await this.prisma.employee.findFirst({
          where: {
            OR: [
              dto.personal_email !== undefined && dto.personal_email !== null
                ? { personal_email: dto.personal_email }
                : {},
              dto.work_email !== undefined && dto.work_email !== null
                ? { work_email: dto.work_email }
                : {},
            ],
            NOT: { id },
          },
        });
        if (existingEmployee) {
          throw new BadRequestException(
            'Another employee with this email already exists',
          );
        }
      }

      if (dto.user_id !== undefined && dto.user_id !== null) {
        const existingUser = await this.prisma.employee.findFirst({
          where: { user_id: dto.user_id, NOT: { id } },
        });
        if (existingUser) {
          throw new BadRequestException(
            'Another employee with this user ID already exists',
          );
        }
      }

      if (dto.employee_code !== undefined && dto.employee_code !== null) {
        const existingCode = await this.prisma.employee.findFirst({
          where: { employee_code: String(dto.employee_code), NOT: { id } },
        });
        if (existingCode) {
          throw new BadRequestException(
            'Another employee with this employee code already exists',
          );
        }
      }

      if (dto.additional_manager_ids && dto.additional_manager_ids.length > 0) {
        const validManagers = await this.prisma.employee.findMany({
          where: { id: { in: dto.additional_manager_ids } },
        });
        if (validManagers.length !== dto.additional_manager_ids.length) {
          throw new BadRequestException(
            'One or more additional manager IDs are invalid',
          );
        }
      }

      if (dto.departments_id !== undefined && dto.departments_id !== null) {
        const department = await this.prisma.department.findUnique({
          where: { id: dto.departments_id },
        });
        if (!department) {
          throw new BadRequestException(
            `Department with ID ${dto.departments_id} not found`,
          );
        }
      }

      if (
        dto.employee_level_id !== undefined &&
        dto.employee_level_id !== null
      ) {
        const level = await this.prisma.employeeLevel.findUnique({
          where: { id: dto.employee_level_id },
        });
        if (!level) {
          throw new BadRequestException(
            `Employee level with ID ${dto.employee_level_id} not found`,
          );
        }
      }

      if (dto.manager_id !== undefined && dto.manager_id !== null) {
        const manager = await this.prisma.employee.findUnique({
          where: { id: dto.manager_id },
        });
        if (!manager) {
          throw new BadRequestException(
            `Manager with ID ${dto.manager_id} not found`,
          );
        }
      }

      if (dto.created_by !== undefined && dto.created_by !== null) {
        const creator = await this.prisma.employee.findUnique({
          where: { id: dto.created_by },
        });
        if (!creator) {
          throw new BadRequestException(
            `Creator with ID ${dto.created_by} not found`,
          );
        }
      }

      if (dto.updated_by !== undefined && dto.updated_by !== null) {
        const updater = await this.prisma.employee.findUnique({
          where: { id: dto.updated_by },
        });
        if (!updater) {
          throw new BadRequestException(
            `Updater with ID ${dto.updated_by} not found`,
          );
        }
      }

      const data: Prisma.EmployeeUpdateInput = {
        employee_code: dto.employee_code
          ? String(dto.employee_code)
          : undefined,
        name: dto.name,
        personal_email: dto.personal_email,
        work_email: dto.work_email,
        personal_phone: dto.personal_phone,
        office_phone: dto.office_phone,
        official_date_of_birth: dto.official_date_of_birth
          ? new Date(dto.official_date_of_birth)
          : undefined,
        celebrated_date_of_birth: dto.celebrated_date_of_birth
          ? new Date(dto.celebrated_date_of_birth)
          : undefined,
        marriage_date: dto.marriage_date
          ? new Date(dto.marriage_date)
          : undefined,
        joining_date: dto.joining_date ? new Date(dto.joining_date) : undefined,
        releaving_date: dto.releaving_date
          ? new Date(dto.releaving_date)
          : undefined,
        employee_type: dto.employee_type,
        address: dto.address,
        remarks: dto.remarks,
        reporting_email: dto.reporting_email,
        last_sign_in_email: dto.last_sign_in_email,
        last_sign_out_email: dto.last_sign_out_email,
        leave_notification_mails: dto.leave_notification_mails,
        is_signin_mandatory: dto.is_signin_mandatory,
        has_work_portal_access: dto.has_work_portal_access,
        has_hr_portal_access: dto.has_hr_portal_access,
        has_client_portal_access: dto.has_client_portal_access,
        has_inventory_portal_access: dto.has_inventory_portal_access,
        has_super_admin_access: dto.has_super_admin_access,
        has_accounts_portal_access: dto.has_accounts_portal_access,
        has_admin_portal_access: dto.has_admin_portal_access,
        has_showcase_portal_access: dto.has_showcase_portal_access,
        facebook_url: dto.facebook_url,
        instagram_url: dto.instagram_url,
        linkedin_url: dto.linkedin_url,
        blog_url: dto.blog_url,
        selfi_photo: dto.selfi_photo,
        family_photo: dto.family_photo,
        designation: dto.designation,
        confirmation_date: dto.confirmation_date
          ? new Date(dto.confirmation_date)
          : undefined,
        Department: dto.departments_id
          ? { connect: { id: dto.departments_id } }
          : dto.departments_id === null
            ? { disconnect: true }
            : undefined,
        Role: dto.employee_roles_id
          ? { connect: { id: dto.employee_roles_id } }
          : dto.employee_roles_id === null
            ? { disconnect: true }
            : undefined,
        employeeLevel: dto.employee_level_id
          ? { connect: { id: dto.employee_level_id } }
          : dto.employee_level_id === null
            ? { disconnect: true }
            : undefined,
        manager: dto.manager_id
          ? { connect: { id: dto.manager_id } }
          : dto.manager_id === null
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
        user: dto.user_id
          ? { connect: { id: dto.user_id } }
          : dto.user_id === null
            ? { disconnect: true }
            : undefined,
        additionalManagers: dto.additional_manager_ids
          ? {
              set: dto.additional_manager_ids.map((id) => ({ id })),
            }
          : undefined,
      };

      const updated = await this.prisma.employee.update({
        where: { id },
        data,
        include: {
          Department: true,
          Role: true,
          employeeLevel: true,
          manager: true,
          additionalManagers: { select: { id: true, name: true } },
          createdBy: true,
          updatedBy: true,
        },
      });

      return {
        message: 'Employee updated successfully',
        employee: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update employee',
      );
    }
  }

  async getEmployeeById(id: number) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id },
        include: {
          Department: true,
          Role: true,
          employeeLevel: true,
          manager: true,
          additionalManagers: { select: { id: true, name: true } },
          createdBy: true,
          updatedBy: true,
        },
      });

      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      return {
        message: 'Employee retrieved successfully',
        employee,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to retrieve employee',
      );
    }
  }

  async delete(id: number) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      await this.prisma.$transaction(async (prisma) => {
        await prisma.employee.updateMany({
          where: { manager_id: id },
          data: { manager_id: null },
        });

        const employeesWithManager = await prisma.employee.findMany({
          where: {
            additionalManagers: {
              some: { id: id },
            },
          },
          select: { id: true },
        });

        for (const emp of employeesWithManager) {
          await prisma.employee.update({
            where: { id: emp.id },
            data: {
              additionalManagers: {
                disconnect: { id },
              },
            },
          });
        }

        await prisma.employeeDocument.deleteMany({
          where: {
            OR: [{ employee_id: id }, { created_by: id }, { updated_by: id }],
          },
        });

        await prisma.employeePhoto.deleteMany({
          where: {
            OR: [{ employee_id: id }, { created_by: id }, { updated_by: id }],
          },
        });

        await prisma.employeeNote.deleteMany({
          where: {
            OR: [{ employee_id: id }, { created_by: id }, { updated_by: id }],
          },
        });

        await prisma.employeeEmergencyContact.deleteMany({
          where: {
            OR: [{ employee_id: id }, { created_by: id }, { updated_by: id }],
          },
        });

        await prisma.employeeSkillHobby.deleteMany({
          where: {
            OR: [{ employee_id: id }, { created_by: id }, { updated_by: id }],
          },
        });

        await prisma.employeeRatingParameter.deleteMany({
          where: {
            OR: [{ created_by: id }, { updated_by: id }],
          },
        });

        await prisma.department.updateMany({
          where: {
            OR: [
              { department_head_id: id },
              { created_by: id },
              { updated_by: id },
            ],
          },
          data: {
            department_head_id: null,
            created_by: null,
            updated_by: null,
          },
        });

        await prisma.employee.delete({
          where: { id },
        });
      });

      return { message: `Employee with ID ${id} deleted successfully` };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete employee',
      );
    }
  }

  async updatePermissions(id: number, dto: UpdateEmployeePermissionsDto) {
    try {
      const employee = await this.prisma.employee.findUnique({
        where: { id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      const data: Prisma.EmployeeUpdateInput = {
        has_work_portal_access: dto.has_work_portal_access,
        has_hr_portal_access: dto.has_hr_portal_access,
        has_client_portal_access: dto.has_client_portal_access,
        has_inventory_portal_access: dto.has_inventory_portal_access,
        has_super_admin_access: dto.has_super_admin_access,
        has_accounts_portal_access: dto.has_accounts_portal_access,
        has_admin_portal_access: dto.has_admin_portal_access,
        has_showcase_portal_access: dto.has_showcase_portal_access,
      };

      const updated = await this.prisma.employee.update({
        where: { id },
        data,
        include: {
          Department: true,
          Role: true,
          employeeLevel: true,
          manager: true,
          additionalManagers: { select: { id: true, name: true } },
          createdBy: true,
          updatedBy: true,
        },
      });

      return {
        message: 'Permissions updated successfully',
        employee: updated,
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update permissions',
      );
    }
  }
}
