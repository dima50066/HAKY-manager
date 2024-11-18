import { AppDispatch } from "../store";
import axiosInstance from "../../hooks/axiosConfig";
import {
  fetchEntriesStart,
  fetchEntriesSuccess,
  fetchEntriesFailure,
  addOrUpdateEntry,
  deleteEntry,
} from "./slice";

export const fetchCalendarEntries = () => async (dispatch: AppDispatch) => {
  dispatch(fetchEntriesStart());
  try {
    const response = await axiosInstance.get("/calendar");
    dispatch(fetchEntriesSuccess(response.data.data));
  } catch (error: any) {
    dispatch(
      fetchEntriesFailure(
        error.response?.data?.message || "Failed to fetch entries"
      )
    );
  }
};

export const addOrUpdateCalendarEntry =
  (date: string, isWorkday: boolean) => async (dispatch: AppDispatch) => {
    try {
      const response = await axiosInstance.post("/calendar", {
        date,
        isWorkday,
      });
      dispatch(addOrUpdateEntry(response.data.data));
    } catch (error: any) {
      console.error("Failed to add or update entry:", error);
    }
  };

export const deleteCalendarEntry =
  (date: string) => async (dispatch: AppDispatch) => {
    try {
      await axiosInstance.delete("/calendar", { data: { date } });
      dispatch(deleteEntry(date));
    } catch (error: any) {
      console.error("Failed to delete entry:", error);
    }
  };
