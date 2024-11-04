import { Request, Response, NextFunction } from 'express';

export const ctrlWrapper = (ctrl: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    ctrl(req, res, next).catch(next);
  };
};
