import { AuthenticatedRequest } from "../types";
import { Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { UserRole } from "../constants/constants";

export const checkRole = (requiredRole: UserRole) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== requiredRole) {
      return next(createHttpError(403, "Access denied"));
    }
    next();
  };
};
