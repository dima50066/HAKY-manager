import { ProfilesCollection } from "../db/models/profile";
import createHttpError from "http-errors";
import { saveFileToCloudinary } from "../utils/cloudinary";
import fs from "fs";
import path from "path";
import { TEMP_UPLOAD_DIR } from "../constants/constants";

interface ProfilePayload {
  avatar?: string;
  bio?: string;
  isStudent: boolean;
  productivity: number;
  location?: string;
  birthDate?: Date;
  livesIndependently?: boolean;
}

export const createProfile = async (userId: string, data: ProfilePayload) => {
  const existingProfile = await ProfilesCollection.findOne({ user: userId });
  if (existingProfile) throw createHttpError(409, "Profile already exists");

  return await ProfilesCollection.create({ ...data, user: userId });
};

export const getProfile = async (userId: string) => {
  const profile = await ProfilesCollection.findOne({ user: userId });
  if (!profile) throw createHttpError(404, "Profile not found");

  return profile;
};

export const updateProfile = async (userId: string, data: ProfilePayload) => {
  const profile = await ProfilesCollection.findOneAndUpdate(
    { user: userId },
    data,
    { new: true }
  );

  if (!profile) throw createHttpError(404, "Profile not found for update");

  return profile;
};

export const uploadDocument = async (
  userId: string,
  file: Express.Multer.File
) => {
  const tempFilePath = path.join(TEMP_UPLOAD_DIR, file.filename);

  try {
    const cloudinaryResult = await saveFileToCloudinary(tempFilePath, {
      resource_type: "auto",
    });

    const profile = await getProfile(userId);
    if (!profile) {
      throw createHttpError(404, "Profile not found");
    }

    const fileType: "pdf" | "image" | "other" = file.mimetype.includes("pdf")
      ? "pdf"
      : file.mimetype.startsWith("image")
      ? "image"
      : "other";

    const existingDocumentIndex = profile.documents.findIndex(
      (doc) => doc.name === file.originalname
    );

    const document = {
      url: cloudinaryResult.secure_url,
      type: fileType,
      name: file.originalname,
      uploadedAt: new Date(),
    };

    if (existingDocumentIndex !== -1) {
      profile.documents[existingDocumentIndex] = document;
    } else {
      profile.documents.push(document);
    }

    await profile.save();

    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    } else {
      console.warn(`Temp file not found: ${tempFilePath}`);
    }

    return document;
  } catch (error) {
    console.error("Error in uploadDocument:", error);
    throw createHttpError(500, "Failed to upload document");
  }
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

  profile.documents.splice(documentIndex, 1);
  await profile.save();
};
