import { ProductivityRecord } from "../db/models/productivity";
import { Department } from "../db/models/department";
import mongoose from "mongoose";

interface ProductivityData {
  userId: string;
  departmentId: string;
  date: string;
  unitsCompleted: number;
  isStudent: boolean;
  productivityLevel: number;
  stopsCount?: number;
  storeNumber?: string;
}

export const getAllProductivityRecords = async () => {
  const records = await ProductivityRecord.find()
    .populate("departmentId", "name")
    .populate("userId", "name isStudent");
  return records;
};

export const deleteProductivityRecord = async (id: string) => {
  const deletedRecord = await ProductivityRecord.findByIdAndDelete(id);
  return deletedRecord;
};

export const calculateProductivityAndEarnings = async (
  data: ProductivityData & { departmentName?: string }
) => {
  const {
    userId,
    departmentId,
    departmentName,
    date,
    unitsCompleted,
    isStudent,
    productivityLevel,
    stopsCount,
    storeNumber,
  } = data;

  const department = await Department.findById(departmentId);
  if (!department) {
    throw new Error("Department not found");
  }

  let appliedRate;

  const hasAdvancedRates =
    department.rate115 !== undefined && department.rate125 !== undefined;

  if (hasAdvancedRates) {
    if (productivityLevel === 125) {
      appliedRate = isStudent ? department.rate125Student : department.rate125;
    } else if (productivityLevel === 115) {
      appliedRate = isStudent ? department.rate115Student : department.rate115;
    } else {
      appliedRate = isStudent
        ? department.baseRateStudent
        : department.baseRate;
    }
  } else {
    appliedRate = isStudent ? department.baseRateStudent : department.baseRate;
  }

  if (appliedRate === undefined) {
    throw new Error(`Rate not defined for department: ${department.name}`);
  }

  const totalEarnings = unitsCompleted * appliedRate;

  const record = await ProductivityRecord.create({
    userId: new mongoose.Types.ObjectId(userId),
    departmentId: new mongoose.Types.ObjectId(departmentId),
    departmentName: departmentName || department.name,
    date,
    unitsCompleted,
    stopsCount,
    storeNumber,
    productivityLevel,
    isStudent,
    totalEarnings,
  });

  return record;
};

export const updateProductivityRecord = async (
  id: string,
  updateData: Partial<
    ProductivityData & { department: { id: string; name?: string } }
  >
) => {
  const existingRecord = await ProductivityRecord.findById(id);
  if (!existingRecord) {
    throw new Error("Productivity record not found");
  }

  if (updateData.department) {
    const { id: departmentId, name: departmentName } = updateData.department;

    if (departmentId) {
      existingRecord.departmentId = new mongoose.Types.ObjectId(departmentId);
    }

    if (departmentName) {
      existingRecord.departmentName = departmentName;
    }
  }

  if (updateData.unitsCompleted !== undefined) {
    existingRecord.unitsCompleted = updateData.unitsCompleted;
  }

  if (updateData.date !== undefined) {
    existingRecord.date = new Date(updateData.date);
  }

  if (updateData.stopsCount !== undefined) {
    existingRecord.stopsCount = updateData.stopsCount;
  }

  if (updateData.storeNumber !== undefined) {
    existingRecord.storeNumber = updateData.storeNumber;
  }

  const currentDepartment = await Department.findById(
    existingRecord.departmentId
  );

  if (!currentDepartment) {
    throw new Error("Department not found");
  }

  existingRecord.totalEarnings =
    existingRecord.unitsCompleted *
    (existingRecord.isStudent
      ? currentDepartment.baseRateStudent
      : currentDepartment.baseRate);

  const updatedRecord = await existingRecord.save();
  return updatedRecord;
};

export const getUserProductivityRecords = async (userId: string) => {
  const records = await ProductivityRecord.find({ userId })
    .populate("departmentId", "name")
    .populate("userId", "name isStudent");

  return records;
};

export const recalculateProductivityRecords = async (
  userId: string,
  startDate?: string,
  endDate?: string
) => {
  const query: any = { userId: new mongoose.Types.ObjectId(userId) };

  if (startDate || endDate) {
    query.date = {};
    if (startDate) {
      query.date.$gte = new Date(startDate);
    }
    if (endDate) {
      query.date.$lte = new Date(endDate);
    }
  }

  const records = await ProductivityRecord.find(query);

  if (records.length === 0) {
    return {
      message: "No records found for the specified criteria",
      updatedCount: 0,
    };
  }

  let updatedCount = 0;

  for (const record of records) {
    const department = await Department.findById(record.departmentId);

    if (!department) {
      console.error(`Department not found for record: ${record._id}`);
      continue;
    }

    let appliedRate;
    const hasAdvancedRates =
      department.rate115 !== undefined && department.rate125 !== undefined;

    if (hasAdvancedRates) {
      if (record.productivityLevel === 125) {
        appliedRate = record.isStudent
          ? department.rate125Student
          : department.rate125;
      } else if (record.productivityLevel === 115) {
        appliedRate = record.isStudent
          ? department.rate115Student
          : department.rate115;
      } else {
        appliedRate = record.isStudent
          ? department.baseRateStudent
          : department.baseRate;
      }
    } else {
      appliedRate = record.isStudent
        ? department.baseRateStudent
        : department.baseRate;
    }

    if (appliedRate === undefined) {
      console.error(`Rate not defined for department: ${department.name}`);
      continue;
    }

    const newTotalEarnings = record.unitsCompleted * appliedRate;

    if (newTotalEarnings !== record.totalEarnings) {
      record.totalEarnings = newTotalEarnings;
      record.departmentName = department.name;
      await record.save();
      updatedCount++;
    }
  }

  return {
    message: `Successfully recalculated ${updatedCount} records`,
    updatedCount,
  };
};
