import { ProductivityRecord } from '../db/models/productivity';
import { Department } from '../db/models/department';
import mongoose from 'mongoose';

interface ProductivityData {
  userId: string;
  departmentId: string;
  date: string;
  unitsCompleted: number;
  isStudent: boolean;
  productivityLevel: number;
}

export const getAllProductivityRecords = async () => {
  const records = await ProductivityRecord.find()
    .populate('departmentId', 'name')
    .populate('userId', 'name isStudent');
  return records;
};

export const deleteProductivityRecord = async (id: string) => {
  const deletedRecord = await ProductivityRecord.findByIdAndDelete(id);
  return deletedRecord;
};

export const calculateProductivityAndEarnings = async (data: ProductivityData) => {
  const { userId, departmentId, date, unitsCompleted, isStudent, productivityLevel } = data;

  const department = await Department.findById(new mongoose.Types.ObjectId(departmentId));
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
    userId: new mongoose.Types.ObjectId(userId),
    departmentId: new mongoose.Types.ObjectId(departmentId),
    date,
    unitsCompleted,
    productivityLevel,
    isStudent,
    totalEarnings,
  });

  return record;
};

export const updateProductivityRecord = async (id: string, updateData: Partial<ProductivityData>) => {
  const existingRecord = await ProductivityRecord.findById(id);
  if (!existingRecord) {
    throw new Error('Productivity record not found');
  }

  if (updateData.unitsCompleted !== undefined) existingRecord.unitsCompleted = updateData.unitsCompleted;
  if (updateData.productivityLevel !== undefined) existingRecord.productivityLevel = updateData.productivityLevel;
  if (updateData.isStudent !== undefined) existingRecord.isStudent = updateData.isStudent;
  if (updateData.date !== undefined) existingRecord.date = new Date(updateData.date);
  if (updateData.departmentId !== undefined) existingRecord.departmentId = new mongoose.Types.ObjectId(updateData.departmentId);

  const department = await Department.findById(existingRecord.departmentId);
  if (!department) {
    throw new Error('Department not found');
  }

  let appliedRate;
  if (existingRecord.productivityLevel === 125) {
    appliedRate = existingRecord.isStudent ? department.rate125Student : department.rate125;
  } else if (existingRecord.productivityLevel === 115) {
    appliedRate = existingRecord.isStudent ? department.rate115Student : department.rate115;
  } else {
    appliedRate = existingRecord.isStudent ? department.baseRateStudent : department.baseRate;
  }

  existingRecord.totalEarnings = existingRecord.unitsCompleted * appliedRate;

  const updatedRecord = await existingRecord.save();
  return updatedRecord;
};
