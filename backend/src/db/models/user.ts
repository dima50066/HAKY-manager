import mongoose, { Document, Schema } from 'mongoose';

// Інтерфейс для типізації користувача
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string; // URL або шлях до аватарки
  createdAt: Date;
}

// Схема користувача
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Експортуємо модель користувача
export const User = mongoose.model<IUser>('User', UserSchema);
