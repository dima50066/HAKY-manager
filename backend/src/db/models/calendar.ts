import mongoose, { Schema, Document, Types } from "mongoose";

export interface RequestEntry extends Document {
  userId: Types.ObjectId;
  type: "vacation" | "day-off" | "work-day";
  date: Date;
  endDate?: Date;
  status: "pending" | "responded" | "confirmed" | "declined";
  respondedBy?: Types.ObjectId;
  approvedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema = new Schema<RequestEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    type: {
      type: String,
      enum: ["vacation", "day-off", "work-day"],
      required: true,
    },
    date: { type: Date, required: true },
    endDate: { type: Date },
    status: {
      type: String,
      enum: ["pending", "responded", "confirmed", "declined"],
      default: "pending",
    },
    respondedBy: { type: Schema.Types.ObjectId, ref: "users" },
    approvedBy: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

export const Requests = mongoose.model<RequestEntry>("Requests", RequestSchema);
