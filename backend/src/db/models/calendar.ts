import { Schema, model, Document, Types } from "mongoose";

interface CalendarEntry extends Document {
  userId: Types.ObjectId;
  date: Date;
  isWorkday: boolean;
}

const CalendarSchema = new Schema<CalendarEntry>({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  date: { type: Date, required: true },
  isWorkday: { type: Boolean, required: true },
});

CalendarSchema.index({ userId: 1, date: 1 }, { unique: true });

export const Calendar = model<CalendarEntry>("Calendar", CalendarSchema);
