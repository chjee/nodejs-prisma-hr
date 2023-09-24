import { InputError, NotFoundError } from '../model/errors';
import { z } from 'zod';
import { prisma } from '../model/prismaInstance';
import { Decimal } from '@prisma/client/runtime/library';

const getEmployeeZod = z.object({
    empId: z.number().positive(),
});

type empReturnModel = {
    employee_id: number, first_name: string, last_name: string,
    email: string, phone_number: string, hire_date: Date,
    job_id: string, salary: Decimal, commission_pct: Decimal, manager_id: number, department_id: number
};

type hisReturnModel = {
    employee_id: number, start_date: Date, end_date: Date,
    job_id: string, department_id: number
};

export const getEmployee = async (inputs: z.infer<typeof getEmployeeZod>): Promise<empReturnModel | null> => {
    const params = getEmployeeZod.safeParse(inputs);
    if (!params.success) throw new InputError(`invalid parameter: ${JSON.stringify(params.error.issues)}`);

    const empModel = await prisma.employees.findUnique({ where: { employee_id: inputs.empId } });
    if (!empModel) return null;

    return empModel as empReturnModel;
}

const updateEmployeeZod = z.object({
    empId: z.number().positive(),
    firstName: z.string().max(20).optional(),
    lastName: z.string().max(25),
    email: z.string().email().max(25).nonempty(),
    phoneNumber: z.string().max(20).optional(),
    hireDate: z.date(),
    jobId: z.string().max(10),
    salary: z.number().positive(),
    commissionPct: z.number().positive(),
    managerId: z.number().positive().optional(),
    departmentId: z.number().positive().optional(),
});

export const updateEmployee = async (inputs: z.infer<typeof updateEmployeeZod>): Promise<empReturnModel | null> => {
    const params = updateEmployeeZod.safeParse(inputs);
    if (!params.success) throw new InputError(`invalid parameter: ${JSON.stringify(params.error.issues)}`);

    const empModel = await prisma.employees.findUnique({
        where: { employee_id: inputs.empId },
    });

    if (!empModel) return null;

    const updatedEmpModel = await prisma.employees.update({
        where: { employee_id: inputs.empId },
        data: {
            first_name: inputs.firstName,
            last_name: inputs.lastName,
            email: inputs.email,
            phone_number: inputs.phoneNumber,
            hire_date: inputs.hireDate,
            job_id: inputs.jobId,
            salary: inputs.salary,
            commission_pct: inputs.commissionPct,
            manager_id: inputs.managerId,
            department_id: inputs.departmentId,
        }
    });

    return updatedEmpModel as empReturnModel;
}

const getHistoryListZod = z.object({
    empId: z.number().positive(),
    offset: z.number().default(0),
    limit: z.number().default(10),
});

export const getHistoryList = async (inputs: z.infer<typeof getHistoryListZod>): Promise<hisReturnModel[]> => {
    const params = getHistoryListZod.safeParse(inputs);
    if (!params.success) throw new InputError(`invalid parameter: ${JSON.stringify(params.error.issues)}`);

    const hisModelList = await prisma.job_history.findMany({
        where: { employee_id: inputs.empId },
        skip: inputs.offset,
        take: inputs.limit,
    });

    if (!hisModelList) return [];

    return hisModelList.map((hisModel) => {
        return hisModel as hisReturnModel;
    });
}

const updateSalaryZod = z.object({
    deptId: z.number().positive(),
    ratio: z.number()
});

export const updateDeptSalary = async (inputs: z.infer<typeof updateSalaryZod>): Promise<empReturnModel[]> => {
    const params = updateSalaryZod.safeParse(inputs);
    if (!params.success) throw new InputError(`invalid parameter: ${JSON.stringify(params.error.issues)}`);

    const empModelList = await prisma.employees.findMany({
        where: { department_id: inputs.deptId },
    });
    if (!empModelList) return [];

    const updatedEmpModelList = await Promise.all(empModelList.map(async (empModel) => {
        const updatedEmpModel = await prisma.employees.update({
            where: { employee_id: empModel.employee_id },
            data: { salary: { multiply: 1 + (inputs.ratio/100) } }
        });
        return updatedEmpModel as empReturnModel;
    }));

    return updatedEmpModelList;
}