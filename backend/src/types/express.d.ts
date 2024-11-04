import { IUser } from '../../db/models/user'; // Переконайтеся, що шлях до IUser правильний

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {}; // Додаємо порожній export, щоб TypeScript розпізнав це як модуль
