import { Schema, model, Document, Types } from "mongoose";

interface ProductivityRecord extends Document {
  userId: Types.ObjectId;
  departmentId: Types.ObjectId;
  departmentName: string;
  date: Date;
  unitsCompleted: number;
  stopsCount?: number;
  storeNumber?: string;
  productivityLevel: number;
  totalEarnings: number;
  isStudent: boolean;
}

const ProductivityRecordSchema = new Schema<ProductivityRecord>({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  departmentName: { type: String, required: false },
  date: { type: Date, required: true },
  unitsCompleted: { type: Number, required: true },
  stopsCount: { type: Number, required: false },
  storeNumber: { type: String, required: false },
  productivityLevel: { type: Number, required: true },
  totalEarnings: { type: Number, required: true },
  isStudent: { type: Boolean, required: true },
});

export const ProductivityRecord = model<ProductivityRecord>(
  "ProductivityRecord",
  ProductivityRecordSchema
);
