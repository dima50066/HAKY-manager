import { Request, Response, NextFunction } from 'express';

// Тип контролера для кращої підтримки TypeScript
type ControllerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Утіліта для обгортання контролерів
export const ctrlWrapper = (controller: ControllerFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
