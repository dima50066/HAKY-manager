import { Calendar } from "../db/models/calendar";
import { Types } from "mongoose";

interface CalendarEntryData {
  userId: string;
  date: string;
  isWorkday: boolean;
}

export const getAllCalendarEntries = async (userId: string) => {
  const entries = await Calendar.find({ userId }).sort({ date: 1 });
  return entries;
};

export const upsertCalendarEntry = async (data: CalendarEntryData) => {
  const { userId, date, isWorkday } = data;

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const entry = await Calendar.findOneAndUpdate(
    { userId, date: parsedDate },
    { isWorkday },
    { new: true, upsert: true }
  );
  return entry;
};

export const deleteCalendarEntry = async (userId: string, date: string) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const deletedEntry = await Calendar.findOneAndDelete({
    userId,
    date: parsedDate,
  });
  return deletedEntry;
};
