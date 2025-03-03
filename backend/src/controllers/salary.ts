import { Request, Response, NextFunction } from "express";
import {
  calculateUserSalary,
  getUserSalaryHistory,
  updateUserSalaryRecord,
} from "../services/salary";
import { User } from "../db/models/user";
import { UsersCollection } from "../db/models/user";

import createHttpError from "http-errors";

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const calculateUserSalaryController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const result = await calculateUserSalary({ userId });

    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.error("Error in calculateUserSalaryController:", error);
    next(error);
  }
};

export const getUserSalaryHistoryController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const salaryHistory = await getUserSalaryHistory({ userId });

    res.status(200).json({ status: "success", data: salaryHistory });
  } catch (error) {
    console.error("Error in getUserSalaryHistoryController:", error);
    next(error);
  }
};

export const updateUserSalaryController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requesterId = req.user?.id;
    const { userId, recordId, additionalHours } = req.body;

    if (!requesterId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const requester = await UsersCollection.findById(requesterId);
    if (!requester) {
      return next(createHttpError(404, "Requester not found"));
    }

    if (requesterId !== userId && requester.role !== "coordinator") {
      return next(
        createHttpError(
          403,
          "You do not have permission to update this salary record"
        )
      );
    }

    const updatedSalaryRecord = await updateUserSalaryRecord({
      userId,
      recordId,
      additionalHours,
    });

    res.status(200).json({ status: "success", data: updatedSalaryRecord });
  } catch (error) {
    console.error("Error in updateUserSalaryController:", error);
    next(error);
  }
};
