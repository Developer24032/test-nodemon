import { StatusCodes } from 'http-status-codes';

export class CustomAPIError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomAPIError.prototype);
  }
}

export class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthenticatedError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
    Object.setPrototypeOf(this, UnauthenticatedError.prototype);
  }
}

export class UnauthorizedError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ValidationError extends CustomAPIError {
  errors: Record<string, string>;
  
  constructor(errors: Record<string, string>, message: string = 'Validation failed') {
    super(message, StatusCodes.BAD_REQUEST);
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class ConflictError extends CustomAPIError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class TooManyRequestsError extends CustomAPIError {
  constructor(message: string = 'Too many requests') {
    super(message, StatusCodes.TOO_MANY_REQUESTS);
    Object.setPrototypeOf(this, TooManyRequestsError.prototype);
  }
}

export class ServiceUnavailableError extends CustomAPIError {
  constructor(message: string = 'Service temporarily unavailable') {
    super(message, StatusCodes.SERVICE_UNAVAILABLE);
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }
}