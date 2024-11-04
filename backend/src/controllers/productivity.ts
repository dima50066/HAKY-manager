import { Request, Response, NextFunction } from 'express';
import { calculateProductivityAndEarnings } from '../services/productivity';

export const addProductivityRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, departmentId, date, unitsCompleted } = req.body;

    // Виклик сервісу для розрахунку продуктивності та створення запису
    const record = await calculateProductivityAndEarnings({ userId, departmentId, date, unitsCompleted });

    res.status(201).json({ status: 'success', data: record });
  } catch (error) {
    console.error("Error in addProductivityRecord:", error);
    next(error); // Передаємо помилку в наступний обробник
  }
};
