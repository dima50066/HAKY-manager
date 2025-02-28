import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserHistory,
  fetchDepartmentRanking,
  fetchDailyRanking,
  fetchAllUsers,
} from "./operations";

interface RankingState {
  userHistory: any[];
  visibleHistory: any[];
  departmentRanking: any[];
  dailyRanking: any[];
  allUsers: { _id: string; name: string }[];
  loading: {
    userHistory: boolean;
    departmentRanking: boolean;
    dailyRanking: boolean;
    allUsers: boolean;
  };
  error: {
    userHistory: string | null;
    departmentRanking: string | null;
    dailyRanking: string | null;
    allUsers: string | null;
  };
}

const initialState: RankingState = {
  userHistory: [],
  visibleHistory: [],
  departmentRanking: [],
  dailyRanking: [],
  allUsers: [],
  loading: {
    userHistory: false,
    departmentRanking: false,
    dailyRanking: false,
    allUsers: false,
  },
  error: {
    userHistory: null,
    departmentRanking: null,
    dailyRanking: null,
    allUsers: null,
  },
};

const rankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {
    loadMoreHistory(state) {
      const remainingDays =
        state.userHistory.length - state.visibleHistory.length;
      if (remainingDays > 0) {
        const nextDays = state.userHistory.slice(
          state.visibleHistory.length,
          state.visibleHistory.length + 7
        );
        state.visibleHistory = [...state.visibleHistory, ...nextDays];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserHistory.pending, (state) => {
        state.loading.userHistory = true;
        state.error.userHistory = null;
      })
      .addCase(fetchUserHistory.fulfilled, (state, action) => {
        state.loading.userHistory = false;
        state.userHistory = action.payload;
        state.visibleHistory = action.payload.slice(0, 7);
      })
      .addCase(fetchUserHistory.rejected, (state, action) => {
        state.loading.userHistory = false;
        state.error.userHistory =
          action.error.message || "Failed to fetch user history";
      })

      .addCase(fetchDepartmentRanking.pending, (state) => {
        state.loading.departmentRanking = true;
        state.error.departmentRanking = null;
      })
      .addCase(fetchDepartmentRanking.fulfilled, (state, action) => {
        state.loading.departmentRanking = false;
        state.departmentRanking = action.payload;
      })
      .addCase(fetchDepartmentRanking.rejected, (state, action) => {
        state.loading.departmentRanking = false;
        state.error.departmentRanking =
          action.error.message || "Failed to fetch department ranking";
      })

      .addCase(fetchDailyRanking.pending, (state) => {
        state.loading.dailyRanking = true;
        state.error.dailyRanking = null;
      })
      .addCase(fetchDailyRanking.fulfilled, (state, action) => {
        state.loading.dailyRanking = false;
        state.dailyRanking = action.payload;
      })
      .addCase(fetchDailyRanking.rejected, (state, action) => {
        state.loading.dailyRanking = false;
        state.error.dailyRanking =
          action.error.message || "Failed to fetch daily ranking";
      })

      .addCase(fetchAllUsers.pending, (state) => {
        state.loading.allUsers = true;
        state.error.allUsers = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading.allUsers = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading.allUsers = false;
        state.error.allUsers = action.error.message || "Failed to fetch users";
      });
  },
});

export const { loadMoreHistory } = rankingSlice.actions;

export default rankingSlice.reducer;
