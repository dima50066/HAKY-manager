import mongoose, { Schema, Document } from 'mongoose';

interface ISalary extends Document {
  userId: mongoose.Types.ObjectId;
  totalEarnings: number;
  hoursWorked: number;
  period: string; 
}

const SalarySchema: Schema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalEarnings: {
    type: Number,
    required: true,
    default: 0
  },
  hoursWorked: {
    type: Number,
    required: true,
    default: 0
  },
  period: {
    type: String,
    required: true
  }
});

// Експортуємо модель Salary
export const Salary = mongoose.model<ISalary>('Salary', SalarySchema);
