import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env';
import { CLOUDINARY } from '../constants/constants';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file: { path: string }): Promise<string> => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path); // видаляємо локальний файл після завантаження
    return response.secure_url;
  } catch (error: any) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};
