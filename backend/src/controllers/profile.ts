import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import {
  createProfile,
  getProfile,
  updateProfile,
  uploadDocument,
  deleteDocument,
} from "../services/profile";
import { User } from "../db/models/user";

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const createProfileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const profileData = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const profile = await createProfile(userId, profileData);

    res.status(201).json({
      status: 201,
      message: "Profile successfully created!",
      data: profile,
    });
  } catch (error: any) {
    next(createHttpError(400, error.message));
  }
};

export const getProfileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const profile = await getProfile(userId);

    res.status(200).json({
      status: 200,
      message: "Profile retrieved successfully!",
      data: profile,
    });
  } catch (error: any) {
    next(createHttpError(500, "Could not retrieve profile"));
  }
};

export const updateProfileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const updatedProfile = await updateProfile(userId, req.body);

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully!",
      data: updatedProfile,
    });
  } catch (error: any) {
    next(createHttpError(400, error.message));
  }
};

export const uploadDocumentController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    if (!req.file) {
      return next(createHttpError(400, "No file uploaded"));
    }

    const document = await uploadDocument(userId, req.file);

    res.status(201).json({
      status: 201,
      message: "Document uploaded successfully!",
      data: document,
    });
  } catch (error: any) {
    console.error("Error in uploadDocumentController:", error);
    next(
      createHttpError(
        error.status || 500,
        error.message || "Failed to upload document"
      )
    );
  }
};

export const getDocumentsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const profile = await getProfile(userId);

    res.status(200).json({
      status: 200,
      message: "Documents retrieved successfully!",
      data: profile.documents,
    });
  } catch (error: any) {
    next(createHttpError(500, "Failed to retrieve documents"));
  }
};

export const deleteDocumentController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const { documentName } = req.body;
    if (!documentName) {
      return next(createHttpError(400, "Document name is required"));
    }

    await deleteDocument(userId, documentName);

    res.status(200).json({
      status: 200,
      message: "Document deleted successfully!",
    });
  } catch (error: any) {
    next(createHttpError(500, "Failed to delete document"));
  }
};
