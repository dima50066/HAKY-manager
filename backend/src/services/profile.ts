import { ProfilesCollection } from "../db/models/profile";
import createHttpError from "http-errors";

interface ProfilePayload {
  avatar?: string;
  bio?: string;
  isStudent: boolean;
  productivity: number;
  location?: string;
  birthDate?: Date;
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
