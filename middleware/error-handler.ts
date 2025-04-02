import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from '../errors';
import logger from '../utils/logger';

const errorHandlerMiddleware = (
  err: Error | CustomAPIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = {
    statusCode: err instanceof CustomAPIError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong, please try again',
  };

  if (err.name === 'ValidationError') {
    customError.message = Object.values((err as any).errors)
      .map((item: any) => item.message)
      .join(', ');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if ((err as any).code === 11000) {
    customError.message = `Duplicate value entered for ${Object.keys((err as any).keyValue)} field`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === 'CastError') {
    customError.message = `No item found with id: ${(err as any).value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  logger.error(err.stack);

  return res.status(customError.statusCode).json({ msg: customError.message });
};

export default errorHandlerMiddleware;