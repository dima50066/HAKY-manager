import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (err: Error | HttpError, req: Request, res: Response, next: NextFunction): Response | void => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
  }

  console.error('Unhandled error:', err); // Логування для відстеження помилок

  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};
