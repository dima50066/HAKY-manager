import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session';
import { UsersCollection, User } from '../db/models/user';

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  try {
    const session = await SessionsCollection.findOne({ accessToken: token });
    if (!session) {
      return next(createHttpError(401, 'Session not found'));
    }

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
    if (isAccessTokenExpired) {
      return next(createHttpError(401, 'Access token expired'));
    }

    const user = await UsersCollection.findById(session.userId);
    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    req.user = user;
    console.log('Authenticated User:', req.user);
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    next(createHttpError(500, 'Internal server error'));
  }
};
