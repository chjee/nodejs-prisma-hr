import { InputError, NotFoundError } from '../model/errors';
import { z } from 'zod';
import { prisma } from '../model/prismaInstance';

type deptReturnModel = {
    department_id: number, department_name: string, manager_id: number, location_id: number, 
    locations: { country_id: string, street_address: string, postal_code: string, city: string, state_province: string }
};

const getDepartmentZod = z.object({
    deptId: z.number().positive()
});

const getDepartmentListZod = z.object({
    offset: z.number().default(0),
    limit: z.number().default(10),
});

export const getDepartment = async (inputs: z.infer<typeof getDepartmentZod>): Promise<deptReturnModel | null> => {
    const params = getDepartmentListZod.safeParse(inputs);
    if (!params.success) throw new InputError(`invalid parameter: ${JSON.stringify(params.error.issues)}`);

    const deptModel = await prisma.departments.findUnique({
        where: { department_id: inputs.deptId },
        include: { locations: true }
    });

    if (!deptModel) return null;

    return deptModel as deptReturnModel;
}

export const getDepartmentList = async (inputs: z.infer<typeof getDepartmentListZod>): Promise<deptReturnModel[]> => {
    const params = getDepartmentListZod.safeParse(inputs);
    if (!params.success) throw new InputError(`invalid parameter: ${JSON.stringify(params.error.issues)}`);

    const deptModelList = await prisma.departments.findMany({
        include: { locations: true },
        skip: inputs.offset,
        take: inputs.limit,
    });

    if (!deptModelList) return [];

    return deptModelList.map((deptModel) => {
        return deptModel as deptReturnModel;
    });
}