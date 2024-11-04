import { Request, Response, NextFunction } from 'express';
import { calculateProductivityAndEarnings, getAllProductivityRecords } from '../services/productivity';
import { UsersCollection } from '../db/models/user';

export const addProductivityRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, departmentId, date, unitsCompleted, productivityLevel } = req.body;

    const user = await UsersCollection.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Конвертація значень у числа, якщо вони передаються як рядки
    const parsedUnitsCompleted = typeof unitsCompleted === 'string' ? parseFloat(unitsCompleted) : unitsCompleted;
    const parsedProductivityLevel = typeof productivityLevel === 'string' ? parseInt(productivityLevel, 10) : productivityLevel;

    const record = await calculateProductivityAndEarnings({
      userId,
      departmentId,
      date,
      unitsCompleted: parsedUnitsCompleted,
      isStudent: user.isStudent,
      productivityLevel: parsedProductivityLevel,
    });

    res.status(201).json({ status: 'success', data: record });
  } catch (error) {
    console.error("Error in addProductivityRecord:", error);
    next(error);
  }
};




export const getProductivityRecords = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await getAllProductivityRecords();
    res.status(200).json({ status: 'success', data: records });
  } catch (error) {
    console.error("Error in getProductivityRecords:", error);
    next(error);
  }
};
