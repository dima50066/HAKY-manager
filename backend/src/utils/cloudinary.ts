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
  p0: { resource_type: string }
): Promise<CloudinaryUploadResult> => {
  try {
    const result = (await cloudinary.v2.uploader.upload(
      path.resolve(filePath),
      {
        resource_type: "auto",
        folder: "HAKY-Manager",
      }
    )) as CloudinaryUploadResult;

    fs.unlink(filePath, (err) => {
      if (err) {
      } else {
        console.log("[CLOUDINARY] Temp file deleted:", filePath);
      }
    });

    return result;
  } catch (error) {
    throw error;
  }
};
