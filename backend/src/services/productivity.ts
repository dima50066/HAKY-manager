import { ProductivityRecord } from '../db/models/productivity';
import { Department } from '../db/models/department';

interface ProductivityData {
  userId: string;
  departmentId: string;
  date: string;
  unitsCompleted: number;
}

export const calculateProductivityAndEarnings = async (data: ProductivityData) => {
  const { userId, departmentId, date, unitsCompleted } = data;

  // Знайдемо департамент і отримаємо його ставки
  const department = await Department.findById(departmentId);
  if (!department) {
    throw new Error('Department not found');
  }

  // Розрахунок продуктивності
  const nominalUnitsPerHour = 100;
  const nominalTime = unitsCompleted / nominalUnitsPerHour;
  const productivity = (unitsCompleted / nominalUnitsPerHour) * 100;

  // Вибір ставки залежно від продуктивності
  let appliedRate = department.baseRate;
  if (productivity >= 125) appliedRate = department.rate125;
  else if (productivity >= 115) appliedRate = department.rate115;

  // Розрахунок загального заробітку
  const totalEarnings = unitsCompleted * appliedRate;

  // Створення запису в базі даних
  const record = await ProductivityRecord.create({
    userId,
    departmentId,
    date,
    unitsCompleted,
    nominalTime,
    productivity,
    appliedRate,
    totalEarnings,
  });

  return record;
};
