import { Requests } from "../db/models/calendar";

export const createCalendarRequest = async (
  userId: string,
  type: "vacation" | "day-off" | "work-day",
  date: string,
  endDate?: string
) => {
  try {
    const request = new Requests({
      userId,
      type,
      date: new Date(date),
      endDate: endDate ? new Date(endDate) : undefined,
    });
    const savedRequest = await request.save();
    return savedRequest;
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

export const getAllCalendarRequests = async () => {
  try {
    const requests = await Requests.find().populate("userId", "name email");
    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

export const respondToCalendarRequest = async (
  requestId: string,
  userId: string
) => {
  try {
    const updatedRequest = await Requests.findByIdAndUpdate(
      requestId,
      { respondedBy: userId, status: "responded" },
      { new: true }
    );
    return updatedRequest;
  } catch (error) {
    console.error("Error responding to request:", error);
    throw error;
  }
};

export const confirmCalendarRequest = async (
  requestId: string,
  userId: string
) => {
  try {
    const updatedRequest = await Requests.findByIdAndUpdate(
      requestId,
      { approvedBy: userId, status: "confirmed" },
      { new: true }
    );
    return updatedRequest;
  } catch (error) {
    console.error("Error confirming request:", error);
    throw error;
  }
};

export const declineCalendarRequest = async (
  requestId: string,
  userId: string
) => {
  try {
    const updatedRequest = await Requests.findByIdAndUpdate(
      requestId,
      { approvedBy: userId, status: "declined" },
      { new: true }
    );
    return updatedRequest;
  } catch (error) {
    console.error("Error declining request:", error);
    throw error;
  }
};
