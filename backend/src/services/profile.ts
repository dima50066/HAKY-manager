import { IUser, UsersCollection } from '../db/models/user';
import { saveFileToCloudinary } from '../utils/cloudinary';

// Сервіс для отримання даних профілю
export const getUserProfileService = async (userId: string): Promise<IUser | null> => {
  const user = await UsersCollection.findById(userId).select('-password');
  return user;
};

// Сервіс для оновлення профілю користувача
export const updateUserProfileService = async (
  userId: string,
  name: string,
  bio: string,
  isStudent: boolean,
  file?: Express.Multer.File
): Promise<IUser | null> => {
  let avatar;

  // Завантаження аватара в Cloudinary, якщо файл є
  if (file) {
    const result = await saveFileToCloudinary(file.path);
    avatar = result.secure_url; // Зберігаємо URL Cloudinary у полі `avatar`
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    {
      name,
      bio,
      isStudent,
      ...(avatar && { avatar }), // Оновлюємо `avatar`, якщо зображення завантажено
    },
    { new: true, runValidators: true }
  ).select('-password');

  return updatedUser;
};
