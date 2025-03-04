import { Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { AuthenticatedRequest } from "../types";
import {
  createCalendarRequest,
  getAllCalendarRequests,
  confirmCalendarRequest,
  respondToCalendarRequest,
  declineCalendarRequest,
} from "../services/calendar";
import mongoose from "mongoose";

export const createCalendarRequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const { type, date, endDate } = req.body;
    const request = await createCalendarRequest(userId, type, date, endDate);

    res.status(201).json({
      status: "success",
      data: request,
    });
  } catch (error: any) {
    next(
      createHttpError(
        500,
        error.message || "Server error while creating request"
      )
    );
  }
};

export const getCalendarRequestsHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requests = await getAllCalendarRequests();
    res.status(200).json({
      status: "success",
      data: requests,
    });
  } catch (error: any) {
    next(
      createHttpError(
        500,
        error.message || "Server error while fetching requests"
      )
    );
  }
};

export const respondCalendarToRequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const { requestId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return next(createHttpError(400, "Invalid request ID"));
    }

    const request = await respondToCalendarRequest(requestId, userId);
    if (!request) {
      return next(createHttpError(404, "Request not found"));
    }

    res.status(200).json({
      status: "success",
      data: request,
    });
  } catch (error: any) {
    next(
      createHttpError(
        500,
        error.message || "Server error while responding to request"
      )
    );
  }
};

export const confirmCalendarRequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const { requestId } = req.params;
    const request = await confirmCalendarRequest(requestId, userId);

    res.status(200).json({
      status: "success",
      data: request,
    });
  } catch (error: any) {
    next(
      createHttpError(
        500,
        error.message || "Server error while confirming request"
      )
    );
  }
};

export const declineCalendarRequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const { requestId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return next(createHttpError(400, "Invalid request ID"));
    }

    const request = await declineCalendarRequest(requestId, userId);
    if (!request) {
      return next(createHttpError(404, "Request not found"));
    }

    res.status(200).json({
      status: "success",
      data: request,
    });
  } catch (error: any) {
    next(
      createHttpError(
        500,
        error.message || "Server error while declining request"
      )
    );
  }
};
