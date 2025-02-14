import mongoose, { Document, Schema } from "mongoose";
import { UserRole } from "../../constants/constants";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [UserRole.USER, UserRole.COORDINATOR, UserRole.ADMIN],
      required: true,
      default: UserRole.USER,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    versionKey: false,
  }
);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = mongoose.model<User>("users", UserSchema);
