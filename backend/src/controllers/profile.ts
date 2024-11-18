import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { createProfile, getProfile, updateProfile } from '../services/profile';
import { saveFileToCloudinary } from '../utils/cloudinary';
import { User } from '../db/models/user';
import fs from 'fs';
import path from 'path';
import { TEMP_UPLOAD_DIR } from '../constants/constants';

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const createProfileController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const profileData = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, 'User is not authenticated'));
    }

    if (req.file) {
      const tempFilePath = path.join(TEMP_UPLOAD_DIR, req.file.filename);
      const cloudinaryResult = await saveFileToCloudinary(tempFilePath);
      profileData.avatar = cloudinaryResult.secure_url;
      fs.unlinkSync(tempFilePath);
    }

    const profile = await createProfile(userId, { ...profileData, livesIndependently: profileData.livesIndependently });

    res.status(201).json({
      status: 201,
      message: 'Profile successfully created!',
      data: profile,
    });
  } catch (error: any) {
    console.error('Profile creation error:', error);
    next(createHttpError(400, error.message));
  }
};

export const getProfileController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(createHttpError(401, 'User is not authenticated'));
    }

    const profile = await getProfile(userId);

    res.status(200).json({
      status: 200,
      message: 'Profile retrieved successfully!',
      data: profile,
    });
  } catch (error: any) {
    console.error('Error retrieving profile:', error);
    next(createHttpError(500, 'Could not retrieve profile'));
  }
};

export const updateProfileController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const updatedData = req.body;

    if (!userId) {
      return next(createHttpError(401, 'User is not authenticated'));
    }

    const updatedProfile = await updateProfile(userId, updatedData);

    res.status(200).json({
      status: 200,
      message: 'Profile updated successfully!',
      data: updatedProfile,
    });
  } catch (error: any) {
    console.error('Profile update error:', error);
    next(createHttpError(400, error.message));
  }
};
