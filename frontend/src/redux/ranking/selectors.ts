import { RootState } from "../store";

export const selectUserHistory = (state: RootState) =>
  state.ranking.userHistory;
export const selectVisibleHistory = (state: RootState) =>
  state.ranking.visibleHistory;
export const selectUserHistoryLoading = (state: RootState) =>
  state.ranking.loading.userHistory;
export const selectUserHistoryError = (state: RootState) =>
  state.ranking.error.userHistory;

export const selectDepartmentRanking = (state: RootState) =>
  state.ranking.departmentRanking;
export const selectDepartmentRankingLoading = (state: RootState) =>
  state.ranking.loading.departmentRanking;
export const selectDepartmentRankingError = (state: RootState) =>
  state.ranking.error.departmentRanking;

export const selectDailyRanking = (state: RootState) =>
  state.ranking.dailyRanking;
export const selectDailyRankingLoading = (state: RootState) =>
  state.ranking.loading.dailyRanking;
export const selectDailyRankingError = (state: RootState) =>
  state.ranking.error.dailyRanking;

export const selectAllUsers = (state: RootState) => state.ranking.allUsers;
export const selectAllUsersLoading = (state: RootState) =>
  state.ranking.loading.allUsers;
export const selectAllUsersError = (state: RootState) =>
  state.ranking.error.allUsers;
