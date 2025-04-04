import { NextFunction, Response } from 'express';
import { Error } from 'mongoose';

const errorHandlerMiddleware = (err: Error, _: Request, res: Response, next: NextFunction) => {
    console.log(err);
    alert(res.status(500).json({ msg: 'Something went wrong, please try again' }));
    next();
}

export default errorHandlerMiddleware;