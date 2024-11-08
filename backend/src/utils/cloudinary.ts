import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
}

export const saveFileToCloudinary = async (filePath: string): Promise<CloudinaryUploadResult> => {
  try {
    const result = await cloudinary.v2.uploader.upload(path.resolve(filePath), {
      folder: 'avatars',
    }) as CloudinaryUploadResult;
    
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete temp file: ${filePath}`, err);
      } else {
        console.log(`Temp file deleted: ${filePath}`);
      }
    });

    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
