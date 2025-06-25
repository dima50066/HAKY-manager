import { Schema, model, Document, Types } from "mongoose";

export interface ProductivityRecordDoc extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProductivityRecordSchema = new Schema<ProductivityRecordDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    departmentName: { type: String },
    date: { type: Date, required: true },
    unitsCompleted: { type: Number, required: true },
    stopsCount: { type: Number },
    storeNumber: { type: String },
    productivityLevel: { type: Number, required: true },
    totalEarnings: { type: Number, required: true },
    isStudent: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const ProductivityRecord = model<ProductivityRecordDoc>(
  "ProductivityRecord",
  ProductivityRecordSchema
);
