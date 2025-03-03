import { Request, Response, NextFunction } from "express";
import {
  getAllEmployeeProfiles,
  getEmployeeProfileById,
  updateEmployeeProfile,
  getDocumentsByProfile,
  uploadDocumentByProfile,
  deleteDocumentByProfile,
  getDocumentPreviewLinkByProfile,
  downloadDocumentByProfile,
  getEmployeeProductivity,
  getEmployeeSalaryHistory,
  deleteEmployeeProfile,
} from "../services/coordinator";
import createHttpError from "http-errors";

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profiles = await getAllEmployeeProfiles();
    res.status(200).json({
      status: 200,
      message: "List of all employee profiles retrieved successfully!",
      data: profiles,
    });
  } catch (error) {
    next(createHttpError(500, "Failed to retrieve employee profiles"));
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId } = req.params;
    const profile = await getEmployeeProfileById(profileId);

    res.status(200).json({
      status: 200,
      message: "Employee profile retrieved successfully!",
      data: profile,
    });
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to retrieve employee profile"
      )
    );
  }
};

export const updateEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId } = req.params;
    const updates = req.body;

    const updatedProfile = await updateEmployeeProfile(profileId, updates);

    res.status(200).json({
      status: 200,
      message: "Employee profile updated successfully!",
      data: updatedProfile,
    });
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to update employee profile"
      )
    );
  }
};

export const getDocumentsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId } = req.params;
    const documents = await getDocumentsByProfile(profileId);

    res.status(200).json({
      status: 200,
      message: "Documents retrieved successfully!",
      data: documents,
    });
  } catch (error: any) {
    next(createHttpError(500, error.message || "Failed to retrieve documents"));
  }
};

export const uploadDocumentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId } = req.params;

    if (!req.file) {
      return next(createHttpError(400, "No file uploaded"));
    }

    const newDocumentName = req.body.newDocumentName?.trim();

    const document = await uploadDocumentByProfile(
      profileId,
      req.file,
      newDocumentName
    );

    res.status(201).json({
      status: 201,
      message: "Document uploaded successfully!",
      data: document,
    });
  } catch (error: any) {
    next(createHttpError(500, error.message || "Failed to upload document"));
  }
};

export const deleteDocumentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId } = req.params;
    const { documentName } = req.body;

    if (!documentName) {
      return next(createHttpError(400, "Document name is required"));
    }

    await deleteDocumentByProfile(profileId, documentName);

    res.status(200).json({
      status: 200,
      message: "Document deleted successfully!",
    });
  } catch (error: any) {
    next(createHttpError(500, error.message || "Failed to delete document"));
  }
};

export const getDocumentPreviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId, documentName } = req.params;
    const previewLink = await getDocumentPreviewLinkByProfile(
      profileId,
      documentName
    );

    res.status(200).json({
      status: 200,
      message: "Temporary preview link generated successfully!",
      data: { previewLink },
    });
  } catch (error: any) {
    next(
      createHttpError(500, error.message || "Failed to generate preview link")
    );
  }
};

export const downloadDocumentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId, documentName } = req.params;

    const {
      fileBuffer,
      documentName: fileName,
      mimeType,
    } = await downloadDocumentByProfile(profileId, documentName);

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", mimeType);
    res.send(fileBuffer);
  } catch (error: any) {
    next(createHttpError(500, error.message || "Failed to download document"));
  }
};

export const getEmployeeProductivityById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId } = req.params;
    const { startDate, endDate } = req.query;

    const productivityRecords = await getEmployeeProductivity(
      profileId,
      startDate as string,
      endDate as string
    );

    res.status(200).json({
      status: 200,
      message: "Employee productivity records retrieved successfully!",
      data: productivityRecords,
    });
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to retrieve employee productivity records"
      )
    );
  }
};

export const getEmployeeSalaryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId } = req.params;

    const salaryHistory = await getEmployeeSalaryHistory(profileId);

    res.status(200).json({
      status: 200,
      message: "Employee salary history retrieved successfully!",
      data: salaryHistory,
    });
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to retrieve employee salary history"
      )
    );
  }
};

export const deleteEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { profileId } = req.params;

    const result = await deleteEmployeeProfile(profileId);

    res.status(200).json({
      status: 200,
      message: result.message,
    });
  } catch (error: any) {
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to delete employee profile"
      )
    );
  }
};
