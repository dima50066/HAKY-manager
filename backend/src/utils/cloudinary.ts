import cloudinary from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
}

export const saveFileToCloudinary = async (
  filePath: string,
  folder: string = "HAKY-Manager"
): Promise<CloudinaryUploadResult> => {
  try {
    const result = await cloudinary.v2.uploader.upload(path.resolve(filePath), {
      resource_type: "auto",
      folder,
    });
    removeTempFile(filePath);
    return result as CloudinaryUploadResult;
  } catch (error) {
    console.error("[CLOUDINARY] Failed to upload file:", error);
    throw new Error("Failed to upload file to Cloudinary.");
  }
};

export const deleteFileFromCloudinary = async (
  fileUrl: string
): Promise<void> => {
  try {
    const publicId = getPublicIdFromUrl(fileUrl);
    if (publicId) {
      const result = await cloudinary.v2.uploader.destroy(publicId);
    } else {
      console.warn(
        "[CLOUDINARY] Failed to extract public_id from URL:",
        fileUrl
      );
    }
  } catch (error) {
    console.error("[CLOUDINARY] Error while deleting file:", error);
    throw new Error("Failed to delete file from Cloudinary.");
  }
};

const getPublicIdFromUrl = (url: string): string | null => {
  const matches = url.match(/\/([^\/]+)\.(pdf|jpg|png|jpeg|gif|svg|docx|txt)$/);
  return matches ? `HAKY-Manager/${matches[1]}` : null;
};

const removeTempFile = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("[CLOUDINARY] Failed to delete temp file:", filePath, err);
    } else {
      console.log("[CLOUDINARY] Temp file deleted:", filePath);
    }
  });
};
