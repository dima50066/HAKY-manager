import mongoose, { Document, Schema } from 'mongoose';

export interface Profile extends Document {
  user: mongoose.Schema.Types.ObjectId;
  avatar?: string;
  isStudent: boolean;
  productivity: number;
  bio?: string;
  location?: string;
  birthDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema: Schema<Profile> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
    avatar: { type: String },
    isStudent: { type: Boolean, required: true },
    productivity: { type: Number, required: true },
    bio: { type: String },
    location: { type: String },
    birthDate: { type: Date },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    versionKey: false,
  }
);

ProfileSchema.statics.getProfile = async function (userId: string): Promise<Profile | null> {
  return this.findOne({ user: userId });
};

export const ProfilesCollection = mongoose.model<Profile>('profiles', ProfileSchema);
