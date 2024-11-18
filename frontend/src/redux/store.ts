import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/slice";
import profileReducer from "./profile/slice";
import productivityReducer from "./productivity/slice";
import departmentsReducer from "./departments/slice";
import salaryReducer from "./salary/slice";
import calendarReducer from "./calendar/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    productivity: productivityReducer,
    departments: departmentsReducer,
    salary: salaryReducer,
    calendar: calendarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
