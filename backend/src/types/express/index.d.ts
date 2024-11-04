import { IUser } from '../../db/models/user';

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Додаємо кастомне поле user у тип Request
    }
  }
}
