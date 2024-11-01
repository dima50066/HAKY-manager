import { model, Schema } from 'mongoose';

const sessionsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    accessToken: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true, unique: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const SessionsCollection = model('sessions', sessionsSchema);