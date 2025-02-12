import mongoose, { Document, Schema } from "mongoose";

export interface Profile extends Document {
  user: mongoose.Schema.Types.ObjectId;
  avatar?: string;
  isStudent: boolean;
  productivity: number;
  bio?: string;
  location?: string;
  birthDate?: Date;
  livesIndependently: boolean;
  address?: string;
  emergencyContactNumber?: string;
  documents: {
    url: string;
    type: "image" | "pdf" | "other";
    name: string;
    uploadedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema<Profile> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    avatar: { type: String },
    isStudent: { type: Boolean, required: true },
    productivity: { type: Number, required: true },
    bio: { type: String },
    location: { type: String },
    birthDate: { type: Date },
    livesIndependently: { type: Boolean, required: true, default: false },
    address: { type: String, maxlength: 200 },
    emergencyContactNumber: { type: String, maxlength: 30 },
    documents: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "pdf", "other"], required: true },
        name: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    versionKey: false,
  }
);

export const ProfilesCollection = mongoose.model<Profile>(
  "profiles",
  ProfileSchema
);
