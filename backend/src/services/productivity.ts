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
    console.log(`Applying 125% rate: ${appliedRate}`);
  } else if (productivityLevel === 115) {
    appliedRate = isStudent ? department.rate115Student : department.rate115;
    console.log(`Applying 115% rate: ${appliedRate}`);
  } else {
    appliedRate = isStudent ? department.baseRateStudent : department.baseRate;
    console.log(`Applying base rate: ${appliedRate}`);
  }

  const totalEarnings = unitsCompleted * appliedRate;
  console.log(`Total Earnings: ${totalEarnings}`);

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
  const records = await ProductivityRecord.find().populate('departmentId', 'name');
  return records;
};