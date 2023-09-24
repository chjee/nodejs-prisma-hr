import { InputError, NotFoundError } from '../model/errors';
import { z } from 'zod';
import axios from 'axios';

const getStationListZod = z.object({
    name: z.string().optional(),
    page: z.number().default(1),
    size: z.number().default(10),
    type: z.string().default('json'),
});

type statReturnModel = {
    page: number,
    size: number,
    totalCount: number,
    items: {
        item: {
            subwayRouteName: string | null,
            subwayStationId: string | null,
            subwayStationName: string | null,
        }[] | null
    }
}

type schdReturnModel = {
    page: number,
    size: number,
    totalCount: number,
    items: {
        item: {
            arrTime: number | null,
            dailyTypeCode: string | null,
            depTime: string | null,
            endSubwayStationId: string | null,
            endSubwayStationNm: string | null,
            subwayRouteId: string | null,
            subwayStationId: string | null,
            subwayStationNm: string | null,
            upDownTypeCode: string | null,            
        }[] | null
    }
}

export const getStationList = async (inputs: z.infer<typeof getStationListZod>): Promise<statReturnModel | null> => {
    const params = getStationListZod.safeParse(inputs);
    if (!params.success) throw new InputError(`invalid parameter: ${JSON.stringify(params.error.issues)}`);

    const resp = await axios.get(`${process.env.SUBWAY_API_URL}/getKwrdFndSubwaySttnList`, {
        timeout: 10000,
        params: {
            serviceKey: process.env.SUBWAY_API_KEY,
            _type: inputs.type,
            pageNo: inputs.page,
            numOfRows: inputs.size,
            subwayStationName: inputs.name,
        }
    });
    if (resp.status !== 200) throw new Error(`error from subway api: ${resp.status}`);

    let ret = {
        page: resp.data.response.body.pageNo,
        size: resp.data.response.body.numOfRows,
        totalCount: resp.data.response.body.totalCount,
        items: {
            item: resp.data.response.body.items.item.map((item: any) => {
                return {
                    subwayRouteName: item.subwayRouteName,
                    subwayStationId: item.subwayStationId,
                    subwayStationName: item.subwayStationName,
                }
            })
        }
    }

    return ret as statReturnModel;
}

const getScheduleListZod = z.object({
    stationId: z.string().nonempty(),
    dailyTypeCode: z.string().default('01'),
    upDownTypeCode: z.string().default('D'),
    page: z.number().default(1),
    size: z.number().default(10),
    type: z.string().default('json'),
});

export const getStationSchedule = async (inputs: z.infer<typeof getScheduleListZod>): Promise<schdReturnModel | null> => {
    const params = getScheduleListZod.safeParse(inputs);
    if (!params.success) throw new InputError(`invalid parameter: ${JSON.stringify(params.error.issues)}`);

    const resp = await axios.get(`${process.env.SUBWAY_API_URL}/getSubwaySttnAcctoSchdulList`, {
        timeout: 10000,
        params: {
            serviceKey: process.env.SUBWAY_API_KEY,
            _type: inputs.type,
            pageNo: inputs.page,
            numOfRows: inputs.size,
            subwayStationId: inputs.stationId,
            dailyTypeCode: inputs.dailyTypeCode,
            upDownTypeCode: inputs.upDownTypeCode,
        }
    });
    if (resp.status !== 200) throw new Error(`error from subway api: ${resp.status}`);

    let ret = {
        page: resp.data.response.body.pageNo,
        size: resp.data.response.body.numOfRows,
        totalCount: resp.data.response.body.totalCount,
        items: {
            item: resp.data.response.body.items.item.map((item: any) => {
                return {
                    arrTime: item.arrTime,
                    dailyTypeCode: item.dailyTypeCode,
                    depTime: item.depTime,
                    endSubwayStationId: item.endSubwayStationId,
                    endSubwayStationNm: item.endSubwayStationNm,
                    subwayRouteId: item.subwayRouteId,
                    subwayStationId: item.subwayStationId,
                    subwayStationNm: item.subwayStationNm,
                    upDownTypeCode: item.upDownTypeCode,
                }
            })
        }
    }

    return ret as schdReturnModel;
};