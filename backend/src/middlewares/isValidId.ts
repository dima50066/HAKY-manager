import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req: Request, res: Response, next: NextFunction) => {
  const { contactId } = req.params;
  
  if (!isValidObjectId(contactId)) {
    return next(createHttpError(400, `Invalid contact ID: '${contactId}'`));
  }

  next();
};
