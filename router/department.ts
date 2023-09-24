import express, { Request, Response, NextFunction } from 'express';
import { getDepartment, getDepartmentList } from '../biz/department';
import { CustomRequest } from '../model/CustomRequest';

const router = express.Router();

const permissionCheck = (req: Request, res: Response, next: NextFunction) => {
    // if (!req.clientContext) throw new Error('Client context not found');
    // if (req.clientContext.permission && !String(req.clientContext.permission).includes('stay')) return res.status(401).json({ msg: 'not allowed' });

    return next();
};

router.post('/', permissionCheck, async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const ret = await getDepartment(req.body);
        res.status(200).json({ resultCode: 1, msg: 'ok', payload: ret });
    }
    catch (err) { next(err); }
});

router.post('/list', permissionCheck, async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const ret = await getDepartmentList(req.body);
        res.status(200).json({ resultCode: 1, msg: 'ok', payload: ret });
    }
    catch (err) { next(err); }
});

export default router;