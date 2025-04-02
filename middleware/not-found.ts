import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors';

/**
 * Middleware to handle 404 Not Found errors
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * 
 * @throws {NotFoundError} - When route is not found
 */
const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError(`Route not found: ${req.originalUrl}`);
};

export default notFoundMiddleware;