import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) =>{
    console.log(err);
    return res.status(504).json({message: "Something went wrong, please try again!"})
};

export default errorHandlerMiddleware;