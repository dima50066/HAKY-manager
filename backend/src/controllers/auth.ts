import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUsersSession,
  requestResetToken,
  resetPassword,
} from '../services/auth';
import createHttpError from 'http-errors';
import { THIRTY_DAYS } from '../constants/constants';
import { Request, Response, NextFunction } from 'express';

const setupSession = (res: Response, session: any) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Received registration data:', req.body);

    const user = await registerUser(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    next(createHttpError(409, error.message));
  }
};

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { session, user } = await loginUser(req.body);
    console.log('session', session);

    setupSession(res, session);

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: {
        accessToken: session.accessToken,
        user,
      },
    });
  } catch (error: any) {
    next(createHttpError(401, error.message));
  }
};

export const logoutUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.cookies.sessionId) {
      await logoutUser(req.cookies.sessionId);
    }
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');
    res.status(204).send();
  } catch (error) {
    next(createHttpError(500, 'Logout failed'));
  }
};

export const refreshUserSessionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });
    setupSession(res, session);
    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(createHttpError(401, 'Session refresh failed'));
  }
};

export const requestResetEmailController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await requestResetToken(req.body.email);
    res.json({
      status: 200,
      message: 'Reset password email has been successfully sent!',
      data: {},
    });
  } catch (error) {
    next(createHttpError(500, 'Failed to send reset email'));
  }
};

export const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Received request for reset password:', req.body);
    await resetPassword(req.body);

    res.json({
      status: 200,
      message: 'Password has been successfully changed!',
      data: {},
    });
  } catch (error) {
    next(createHttpError(500, 'Password reset failed'));
  }
};
