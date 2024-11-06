import { ProductivityRecord } from '../db/models/productivity';
import { Department } from '../db/models/department';

interface ProductivityData {
  userId: string;
  departmentId: string;
  date: string;
  unitsCompleted: number;
  isStudent: boolean;
  productivityLevel: number;
}

export const calculateProductivityAndEarnings = async (data: ProductivityData) => {
  const { userId, departmentId, date, unitsCompleted, isStudent, productivityLevel } = data;

  const department = await Department.findById(departmentId);
  if (!department) {
    throw new Error('Department not found');
  }

  let appliedRate;

  if (productivityLevel === 125) {
    appliedRate = isStudent ? department.rate125Student : department.rate125;
  } else if (productivityLevel === 115) {
    appliedRate = isStudent ? department.rate115Student : department.rate115;
  } else {
    appliedRate = isStudent ? department.baseRateStudent : department.baseRate;
  }

  const totalEarnings = unitsCompleted * appliedRate;

  const record = await ProductivityRecord.create({
    userId,
    departmentId,
    date,
    unitsCompleted,
    productivityLevel,
    isStudent,
    totalEarnings,
  });

  return record;
};

export const getAllProductivityRecords = async () => {
  const records = await ProductivityRecord.find()
    .populate('departmentId', 'name')
    .populate('userId', 'name isStudent'); 
  return records;
};
