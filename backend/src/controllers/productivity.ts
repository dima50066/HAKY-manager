import { Request, Response, NextFunction } from "express";
import {
  calculateProductivityAndEarnings,
  getAllProductivityRecords,
  updateProductivityRecord,
  deleteProductivityRecord,
  getUserProductivityRecords,
} from "../services/productivity";
import { UsersCollection } from "../db/models/user";
import { AuthenticatedRequest } from "../types";

export const addProductivityRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId,
      department,
      date,
      unitsCompleted,
      productivityLevel,
      isStudent,
      stopsCount,
      storeNumber,
    } = req.body;

    const user = await UsersCollection.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!department || !department.id) {
      return res
        .status(400)
        .json({ message: "Department information is incomplete" });
    }

    const record = await calculateProductivityAndEarnings({
      userId,
      departmentId: department.id,
      departmentName: department.name,
      date,
      unitsCompleted,
      isStudent,
      productivityLevel,
      stopsCount,
      storeNumber,
    });

    res.status(201).json({ status: "success", data: record });
  } catch (error) {
    console.error("Error in addProductivityRecord:", error);
    next(error);
  }
};

export const getProductivityRecords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const records = await getAllProductivityRecords();
    res.status(200).json({ status: "success", data: records });
  } catch (error) {
    console.error("Error in getProductivityRecords:", error);
    next(error);
  }
};

export const editProductivityRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedRecord = await updateProductivityRecord(id, req.body);

    if (!updatedRecord) {
      return res.status(404).json({ message: "Productivity record not found" });
    }

    res.status(200).json({ status: "success", data: updatedRecord });
  } catch (error) {
    console.error("Error in editProductivityRecord:", error);
    next(error);
  }
};

export const removeProductivityRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedRecord = await deleteProductivityRecord(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Productivity record not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Productivity record deleted successfully",
    });
  } catch (error) {
    console.error("Error in removeProductivityRecord:", error);
    next(error);
  }
};

export const getUserProductivityRecordsById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user data found" });
    }

    const userId = (req.user._id as string).toString();
    const records = await getUserProductivityRecords(userId);

    res.status(200).json({ status: "success", data: records });
  } catch (error) {
    console.error("Error in getUserProductivityRecordsById:", error);
    next(error);
  }
};
