import { Schema, model, Document } from 'mongoose';

interface ProductivityRecord extends Document {
  userId: Schema.Types.ObjectId;
  departmentId: Schema.Types.ObjectId;
  date: Date;
  unitsCompleted: number;
  productivity: number; 
  totalEarnings: number; 
  isStudent: boolean;
}

const ProductivityRecordSchema = new Schema<ProductivityRecord>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  departmentId: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
  date: { type: Date, required: true },
  unitsCompleted: { type: Number, required: true },
  productivity: { type: Number, required: true },
  totalEarnings: { type: Number, required: true },
  isStudent: { type: Boolean, required: true },
});

export const ProductivityRecord = model<ProductivityRecord>('ProductivityRecord', ProductivityRecordSchema);
