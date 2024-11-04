import { Request, Response, NextFunction } from 'express';
import {
  getUserProfileService,
  updateUserProfileService,
} from '../services/profile';

// Контролер для отримання профілю користувача
export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.id;
    const user = await getUserProfileService(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};

// Контролер для оновлення профілю користувача
export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.id;
    const { name, bio, isStudent } = req.body;

    const updatedUser = await updateUserProfileService(
      userId,
      name,
      bio,
      isStudent,
      req.file // Передаємо файл, якщо є
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};
