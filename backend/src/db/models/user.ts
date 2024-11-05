import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string;
  bio: string;
  isStudent: boolean;
  productivity: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    isStudent: { type: Boolean, default: false },
    productivity: { type: Number, default: 100 },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    versionKey: false,
  }
);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = mongoose.model<User>('users', UserSchema);
