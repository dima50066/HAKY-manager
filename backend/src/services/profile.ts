import { User, UsersCollection } from '../db/models/user';
import { saveFileToCloudinary } from '../utils/cloudinary';

export const getUserProfileService = async (userId: string): Promise<User | null> => {
  const user = await UsersCollection.findById(userId).select('-password');
  return user;
};

export const updateUserProfileService = async (
  userId: string,
  name: string,
  bio: string,
  isStudent: boolean,
  productivity: number,
  file?: Express.Multer.File
): Promise<User | null> => {
  let avatar;

  if (file) {
    const result = await saveFileToCloudinary(file.path);
    avatar = result.secure_url; 
  }

  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    {
      name,
      bio,
      isStudent,
      productivity,
      ...(avatar && { avatar }),
    },
    { new: true, runValidators: true }
  ).select('-password');

  return updatedUser;
};
