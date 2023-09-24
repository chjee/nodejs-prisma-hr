import express, { Request, Response, NextFunction } from 'express';
import { getEmployee, updateEmployee, getHistoryList, updateDeptSalary } from '../biz/employee';
import { CustomRequest } from '../model/CustomRequest';

const router = express.Router();

const permissionCheck = (req: Request, res: Response, next: NextFunction) => {
    // if (!req.clientContext) throw new Error('Client context not found');
    // if (req.clientContext.permission && !String(req.clientContext.permission).includes('stay')) return res.status(401).json({ msg: 'not allowed' });

    return next();
};

router.post('/', permissionCheck, async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const ret = await getEmployee(req.body);
        res.status(200).json({ resultCode: 1, msg: 'ok', payload: ret });
    }
    catch (err) { next(err); }
});

router.put('/', permissionCheck, async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const ret = await updateEmployee(req.body);
        res.status(200).json({ resultCode: 1, msg: 'ok', payload: ret });
    }
    catch (err) { next(err); }
});

router.post('/history', permissionCheck, async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const ret = await getHistoryList(req.body);        
        res.status(200).json({ resultCode: 1, msg: 'ok', payload: ret });
    }
    catch (err) { next(err); }
});

router.patch('/salary', permissionCheck, async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const ret = await updateDeptSalary(req.body);        
        res.status(200).json({ resultCode: 1, msg: 'ok', payload: ret });
    }
    catch (err) { next(err); }
});

export default router;