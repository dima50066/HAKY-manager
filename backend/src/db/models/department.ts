import { Schema, model, Document } from 'mongoose';

interface IDepartment extends Document {
  name: string;
  baseRate: number;
  baseRateStudent: number; 
  rate115: number;
  rate115Student: number;
  rate125: number; 
  rate125Student: number; 
  description?: string;
}

const DepartmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true, unique: true },
  baseRate: { type: Number, required: true },
  baseRateStudent: { type: Number, required: true },
  rate115: { type: Number, required: true },
  rate115Student: { type: Number, required: true },
  rate125: { type: Number, required: true },
  rate125Student: { type: Number, required: true },
  description: { type: String },
});

export const Department = model<IDepartment>('Department', DepartmentSchema);
