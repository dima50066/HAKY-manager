import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { Schema } from 'joi';

export const validateBody = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err: any) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    next(error);
  }
};
