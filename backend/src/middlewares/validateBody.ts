import { Schema } from "joi";
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";

export const validateBody =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.file) {
        req.body.avatar = req.file.path;
      }

      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err: any) {
      const error = createHttpError(400, "Bad Request", {
        errors: err.details.map((detail: any) => detail.message),
      });
      next(error);
    }
  };
