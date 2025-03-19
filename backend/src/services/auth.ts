import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import {
  FIFTEEN_MINUTES,
  THIRTY_DAYS,
  TEMPLATES_DIR,
} from "../constants/constants";
import { UsersCollection } from "../db/models/user";
import { SessionsCollection } from "../db/models/session";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";
import { sendEmail } from "../utils/sendMail";
import handlebars from "handlebars";
import path from "node:path";
import fs from "node:fs/promises";

interface UserPayload {
  email: string;
  password: string;
  name?: string;
  role?: string;
}

interface ResetPasswordPayload {
  token: string;
  newPassword?: string;
  password?: string;
}
export const registerUser = async (payload: UserPayload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, "Email in use");

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload: UserPayload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, "Unauthorized");
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  } = createSession();

  const session = await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return {
    session,
    user: {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

export const logoutUser = async (sessionId: string) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

const createSession = () => {
  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const refreshUsersSession = async ({
  sessionId,
  refreshToken,
}: {
  sessionId: string;
  refreshToken: string;
}) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, "Session not found");
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, "Session expired");
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const requestResetToken = async (email: string) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env("JWT_SECRET"),
    {
      expiresIn: "15m",
    }
  );
  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    "reset-password-email.html"
  );
  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.name,
    link: `${env("FRONTEND_URL")}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: env("SMTP_FROM"),
      to: email,
      subject: "Reset your password",
      html,
    });
  } catch (error) {
    throw createHttpError(
      500,
      "Failed to send the email, please try again later."
    );
  }
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  let entries: any;
  try {
    entries = jwt.verify(payload.token, env("JWT_SECRET"));
  } catch (error) {
    throw createHttpError(401, "Token is expired or invalid.");
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  const password = payload.newPassword || payload.password;
  if (typeof password !== "string") {
    throw new Error("Password is required");
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { $set: { password: encryptedPassword } }
  );

  await SessionsCollection.deleteMany({ userId: user._id });

  return {
    status: 200,
    message: "Password has been successfully reset.",
    data: {},
  };
};
