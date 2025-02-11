import { ProfilesCollection } from "../db/models/profile";
import createHttpError from "http-errors";
import {
  saveFileToCloudinary,
  deleteFileFromCloudinary,
} from "../utils/cloudinary";
import fs from "fs";
import path from "path";
import { TEMP_UPLOAD_DIR } from "../constants/constants";
import { AuthenticatedRequest } from "../types";

interface ProfilePayload {
  avatar?: string;
  bio?: string;
  isStudent: boolean;
  productivity: number;
  location?: string;
  birthDate?: Date;
  livesIndependently?: boolean;
}

export const createProfile = async (
  userId: string,
  req: AuthenticatedRequest
) => {
  const existingProfile = await ProfilesCollection.findOne({ user: userId });
  if (existingProfile) throw createHttpError(409, "Profile already exists");

  const data: ProfilePayload = {
    bio: req.body?.bio || "",
    isStudent: req.body?.isStudent === "true",
    productivity: parseInt(req.body?.productivity || "100", 10),
    location: req.body?.location || "",
    birthDate: req.body?.birthDate ? new Date(req.body.birthDate) : undefined,
    livesIndependently: req.body?.livesIndependently === "true",
  };

  if (req.file) {
    const tempFilePath = path.join(TEMP_UPLOAD_DIR, req.file.filename);
    const cloudinaryResult = await saveFileToCloudinary(tempFilePath);
    data.avatar = cloudinaryResult.secure_url;
  }

  return await ProfilesCollection.create({ ...data, user: userId });
};

export const getProfile = async (userId: string) => {
  const profile = await ProfilesCollection.findOne({ user: userId });
  if (!profile) throw createHttpError(404, "Profile not found");

  return profile;
};

export const updateProfile = async (
  userId: string,
  req: AuthenticatedRequest
) => {
  const profile = await ProfilesCollection.findOne({ user: userId });

  if (!profile) throw createHttpError(404, "Profile not found for update");

  const data: ProfilePayload = {
    bio: req.body?.bio || profile.bio,
    isStudent: req.body?.isStudent === "true",
    productivity: parseInt(
      req.body?.productivity || profile.productivity.toString(),
      10
    ),
    location: req.body?.location || profile.location,
    birthDate: req.body?.birthDate
      ? new Date(req.body.birthDate)
      : profile.birthDate,
    livesIndependently: req.body?.livesIndependently === "true",
  };

  if (req.file) {
    if (profile.avatar) {
      try {
        await deleteFileFromCloudinary(profile.avatar);
        console.log(`[CLOUDINARY] Old avatar deleted: ${profile.avatar}`);
      } catch (error) {
        console.warn("[CLOUDINARY] Failed to delete old avatar:", error);
      }
    }

    const tempFilePath = path.join(TEMP_UPLOAD_DIR, req.file.filename);
    const cloudinaryResult = await saveFileToCloudinary(tempFilePath);
    data.avatar = cloudinaryResult.secure_url;
  }

  Object.assign(profile, data);
  await profile.save();

  return profile;
};

export const uploadDocument = async (
  userId: string,
  file: Express.Multer.File,
  newDocumentName?: string
) => {
  const tempFilePath = path.join(TEMP_UPLOAD_DIR, file.filename);

  const cloudinaryResult = await saveFileToCloudinary(tempFilePath);

  const profile = await getProfile(userId);
  if (!profile) {
    throw createHttpError(404, "Profile not found");
  }
  const fileType: "pdf" | "image" | "other" = file.mimetype.includes("pdf")
    ? "pdf"
    : file.mimetype.startsWith("image")
    ? "image"
    : "other";

  const document = {
    url: cloudinaryResult.secure_url,
    type: fileType,
    name: newDocumentName || file.originalname,
    uploadedAt: new Date(),
  };

  const existingDocumentIndex = profile.documents.findIndex(
    (doc) => doc.name === document.name
  );

  if (existingDocumentIndex !== -1) {
    profile.documents[existingDocumentIndex] = document;
  } else {
    profile.documents.push(document);
  }

  await profile.save();

  return document;
};

export const deleteDocument = async (userId: string, documentName: string) => {
  const profile = await getProfile(userId);
  if (!profile) {
    throw createHttpError(404, "Profile not found");
  }

  const documentIndex = profile.documents.findIndex(
    (doc) => doc.name === documentName
  );

  if (documentIndex === -1) {
    throw createHttpError(404, "Document not found");
  }

  const document = profile.documents[documentIndex];

  try {
    await deleteFileFromCloudinary(document.url);
  } catch (error) {
    console.warn(
      "[CLOUDINARY] Proceeding with document deletion in DB despite Cloudinary error."
    );
  }

  profile.documents.splice(documentIndex, 1);
  await profile.save();
};
