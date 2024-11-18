import { Request, Response, NextFunction } from "express";
import {
  getAllCalendarEntries,
  upsertCalendarEntry,
  deleteCalendarEntry,
} from "../services/calendar";
import { AuthenticatedRequest } from "../types";

export const getCalendarEntries = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id?.toString();

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const entries = await getAllCalendarEntries(userId);
    res.status(200).json({ status: "success", data: entries });
  } catch (error) {
    console.error("Error in getCalendarEntries:", error);
    next(error);
  }
};

export const setCalendarEntry = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id?.toString();
    const { date, isWorkday } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const entry = await upsertCalendarEntry({ userId, date, isWorkday });
    res.status(200).json({ status: "success", data: entry });
  } catch (error) {
    console.error("Error in setCalendarEntry:", error);
    next(error);
  }
};

export const removeCalendarEntry = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id?.toString();
    const { date } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const deletedEntry = await deleteCalendarEntry(userId, date);

    if (!deletedEntry) {
      return res.status(404).json({ message: "Calendar entry not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Calendar entry deleted successfully",
    });
  } catch (error) {
    console.error("Error in removeCalendarEntry:", error);
    next(error);
  }
};
