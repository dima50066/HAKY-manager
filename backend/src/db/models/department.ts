import { Schema, model, Document } from 'mongoose';

interface IDepartment extends Document {
  name: string;
  baseRate: number;
  rate115: number; // Ставка при 115% продуктивності
  rate125: number; // Ставка при 125% продуктивності
  description?: string;
}

const DepartmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true, unique: true },
  baseRate: { type: Number, required: true },
  rate115: { type: Number, required: true },
  rate125: { type: Number, required: true },
  description: { type: String },
});

export const Department = model<IDepartment>('Department', DepartmentSchema);
