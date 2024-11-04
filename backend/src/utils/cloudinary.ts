import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
}

export const saveFileToCloudinary = (filePath: string): Promise<CloudinaryUploadResult> => {
  return cloudinary.v2.uploader.upload(filePath, {
    folder: 'avatars', // Вкажіть потрібну папку в Cloudinary
  }) as Promise<CloudinaryUploadResult>; // Додаємо тип для поверненого значення
};
