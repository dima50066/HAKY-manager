import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import {
  createProfile,
  getProfile,
  updateProfile,
  uploadDocument,
  deleteDocument,
  getDocumentPreviewLink,
} from "../services/profile";
import { AuthenticatedRequest } from "../types";

export const createProfileController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const profile = await createProfile(userId, req);

    res.status(201).json({
      status: 201,
      message: "Profile successfully created!",
      data: profile,
    });
  } catch (error: any) {
    next(createHttpError(400, error.message));
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

    const updatedProfile = await updateProfile(userId, req);

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully!",
      data: updatedProfile,
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

    const newDocumentName = req.body.newDocumentName?.trim();

    const document = await uploadDocument(userId, req.file, newDocumentName);

    res.status(201).json({
      status: 201,
      message: "Document uploaded successfully!",
      data: document,
    });
  } catch (error: any) {
    next(createHttpError(500, "Failed to upload document"));
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

export const getDocumentPreviewController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return next(createHttpError(401, "User is not authenticated"));
    }

    const { documentName } = req.params;
    if (!documentName) {
      return next(createHttpError(400, "Document name is required"));
    }

    const previewLink = await getDocumentPreviewLink(userId, documentName);

    res.status(200).json({
      status: 200,
      message: "Document preview link generated successfully!",
      data: { previewLink },
    });
  } catch (error: any) {
    next(
      createHttpError(
        500,
        error.message || "Failed to get document preview link"
      )
    );
  }
};
