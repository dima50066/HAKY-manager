import { Salary } from '../db/models/salary';
import { ProductivityRecord } from '../db/models/productivity';
import mongoose from 'mongoose';

interface CalculateSalaryInput {
  userId: string;
}

interface UpdateSalaryRecordInput {
  userId: string;
  recordId: string;
  additionalHours: number;
}

interface GetUserSalaryHistoryInput {
  userId: string;
}

export const calculateUserSalary = async ({ userId }: CalculateSalaryInput) => {
  const records = await ProductivityRecord.find({ userId: new mongoose.Types.ObjectId(userId) });

  const monthlyRecords: { [key: string]: number } = {};

  records.forEach(record => {
    const month = `${record.date.getFullYear()}-${String(record.date.getMonth() + 1).padStart(2, '0')}`;
    monthlyRecords[month] = (monthlyRecords[month] || 0) + record.totalEarnings;
  });

  for (const [month, totalEarnings] of Object.entries(monthlyRecords)) {
    let salaryRecord = await Salary.findOne({ userId: new mongoose.Types.ObjectId(userId), period: month });
    
    if (salaryRecord) {
      salaryRecord.totalEarnings = totalEarnings + salaryRecord.hoursWorked;
      await salaryRecord.save();
    } else {
      await Salary.create({
        userId: new mongoose.Types.ObjectId(userId),
        totalEarnings,
        hoursWorked: 0, 
        period: month
      });
    }
  }

  return { message: "Salaries calculated for all months" };
};




export const updateUserSalaryRecord = async ({ userId, recordId, additionalHours }: UpdateSalaryRecordInput) => {
  const salaryRecord = await Salary.findOne({ _id: recordId, userId: new mongoose.Types.ObjectId(userId) });

  if (!salaryRecord) {
    throw new Error('Salary record not found');
  }

  salaryRecord.hoursWorked = additionalHours;
  
  salaryRecord.totalEarnings = salaryRecord.totalEarnings + additionalHours;
  await salaryRecord.save();

  return salaryRecord;
};



export const getUserSalaryHistory = async ({ userId }: GetUserSalaryHistoryInput) => {
  const salaryHistory = await Salary.find({ userId: new mongoose.Types.ObjectId(userId) })
    .sort({ period: -1 });

  return salaryHistory;
};

