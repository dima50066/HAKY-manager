import { Schema, model, Document } from 'mongoose';

interface IProductivityRecord extends Document {
  userId: Schema.Types.ObjectId;
  departmentId: Schema.Types.ObjectId;
  date: Date;
  unitsCompleted: number;
  productivity: number; // Розрахована продуктивність у %
  appliedRate: number; // Ставка, яка застосовується (baseRate, rate115 або rate125)
  totalEarnings: number; // Заробіток на основі продуктивності
}

const ProductivityRecordSchema = new Schema<IProductivityRecord>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  date: { type: Date, required: true },
  unitsCompleted: { type: Number, required: true },
  productivity: { type: Number, required: true },
  appliedRate: { type: Number, required: true },
  totalEarnings: { type: Number, required: true },
});

export const ProductivityRecord = model<IProductivityRecord>('ProductivityRecord', ProductivityRecordSchema);
