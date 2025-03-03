import { Salary } from "../db/models/salary";
import { ProductivityRecord } from "../db/models/productivity";
import mongoose from "mongoose";
import { ProfilesCollection } from "../db/models/profile";

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
  const records = await ProductivityRecord.find({
    userId: new mongoose.Types.ObjectId(userId),
  });

  const profile = await ProfilesCollection.findOne({
    user: new mongoose.Types.ObjectId(userId),
  });
  if (!profile) throw new Error("Profile not found");

  const monthlyRecords: { [key: string]: number } = {};

  records.forEach((record) => {
    const month = `${record.date.getFullYear()}-${String(
      record.date.getMonth() + 1
    ).padStart(2, "0")}`;
    monthlyRecords[month] = (monthlyRecords[month] || 0) + record.totalEarnings;
  });

  for (const [month, totalEarnings] of Object.entries(monthlyRecords)) {
    let salaryRecord = await Salary.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      period: month,
    });

    let totalSalary =
      totalEarnings +
      (salaryRecord
        ? profile.livesIndependently
          ? salaryRecord.hoursWorked
          : 0
        : 0);

    if (salaryRecord) {
      salaryRecord.totalEarnings = totalSalary;
      await salaryRecord.save();
    } else {
      await Salary.create({
        userId: new mongoose.Types.ObjectId(userId),
        totalEarnings: totalSalary,
        hoursWorked: 0,
        period: month,
      });
    }
  }

  return { message: "Salaries calculated for all months" };
};

export const updateUserSalaryRecord = async ({
  userId,
  recordId,
  additionalHours,
}: UpdateSalaryRecordInput) => {
  console.log("Updating salary record for:", {
    userId,
    recordId,
    additionalHours,
  });

  const salaryRecord = await Salary.findOne({
    _id: new mongoose.Types.ObjectId(recordId),
    userId: new mongoose.Types.ObjectId(userId),
  });

  if (!salaryRecord) {
    throw new Error("Salary record not found");
  }

  salaryRecord.hoursWorked += additionalHours;
  salaryRecord.totalEarnings += additionalHours;

  await salaryRecord.save();

  return salaryRecord;
};

export const getUserSalaryHistory = async ({
  userId,
}: GetUserSalaryHistoryInput) => {
  const salaryHistory = await Salary.find({
    userId: new mongoose.Types.ObjectId(userId),
  }).sort({ period: -1 });

  return salaryHistory;
};
