import type { Request, Response, NextFunction } from 'express';
import type { ApiError } from '../utils/apiError.js';

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
