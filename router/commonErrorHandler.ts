import { NextFunction, Request, Response } from 'express';
import { AlreadyExistError, AuthenticationError, ExpiredError, InputError, InvalidOperationError, NotFoundError } from '../model/errors';

const commonErrProc = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof InputError) res.status(400).json({ resultCode: -2, msg: err.message });
    else if (err instanceof NotFoundError) res.status(400).json({ resultCode: -3, msg: err.message });
    else if (err instanceof AuthenticationError) res.status(401).json({ resultCode: -4, msg: err.message });
    else if (err instanceof InvalidOperationError) res.status(400).json({ resultCode: -5, msg: err.message });
    else if (err instanceof AlreadyExistError) res.status(400).json({ resultCode: -6, msg: err.message });
    else if (err instanceof ExpiredError) res.status(400).json({ resultCode: -7, msg: err.message });
    else {
        console.error(err);
        res.status(500).end();
    }

    next();
};

export default commonErrProc;