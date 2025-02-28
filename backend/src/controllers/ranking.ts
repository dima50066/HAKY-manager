import { Request, Response, NextFunction } from "express";
import {
  getUserHistory,
  getDepartmentRanking,
  getDailyRanking,
  getAllUsers,
} from "../services/ranking";
import { AuthenticatedRequest } from "../types";

export const fetchUserHistory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(400).json({ message: "User not authenticated" });
      return;
    }
    const history = await getUserHistory(userId.toString());
    res.status(200).json({ status: "success", data: history });
  } catch (error) {
    next(error);
  }
};

export const fetchDepartmentRanking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { departmentId, date, month, allTime } = req.query;

    if (!departmentId) {
      res.status(400).json({ message: "Missing departmentId parameter" });
      return;
    }

    const period = {
      date: date ? (date as string) : undefined,
      month: month ? (month as string) : undefined,
      allTime: allTime === "true",
    };

    const ranking = await getDepartmentRanking(departmentId as string, period);

    res.status(200).json({ status: "success", data: ranking });
  } catch (error) {
    next(error);
  }
};

export const fetchDailyRanking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { date } = req.query;
    if (!date) {
      res.status(400).json({ message: "Missing date parameter" });
      return;
    }
    const ranking = await getDailyRanking(date as string);
    res.status(200).json({ status: "success", data: ranking });
  } catch (error) {
    next(error);
  }
};

export const fetchAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    next(error);
  }
};
