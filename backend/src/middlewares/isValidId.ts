import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];

    if (!isValidObjectId(id)) {
      return next(createHttpError(400, `Invalid ${paramName}: '${id}'`));
    }

    next();
  };
};
