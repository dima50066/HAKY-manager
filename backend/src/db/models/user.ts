import mongoose, { Document, Schema } from 'mongoose';

// Інтерфейс для типізації користувача
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string; // URL або шлях до аватарки
  createdAt: Date;
  updatedAt: Date;
}

// Схема користувача
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    avatar: { type: String, default: '' },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // Відстеження створення та оновлення
    versionKey: false,
  }
);

// Функція toJSON для приховування пароля при відправці користувача
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Експортуємо модель користувача
export const User = mongoose.model<IUser>('User', UserSchema);
