import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/slice";
import profileReducer from "./profile/slice";
import productivityReducer from "./productivity/slice";
import departmentsReducer from "./departments/slice";
import salaryReducer from "./salary/slice";
import calendarReducer from "./calendar/slice";
import documentsReducer from "./documents/slice";
import coordinatorReducer from "./coordinator/slice";
import rankingReducer from "./ranking/slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "profile",
    "calendar",
    "departments",
    "ranking",
    "employees",
    "documents",
    "salary",
    "productivity",
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  productivity: productivityReducer,
  departments: departmentsReducer,
  salary: salaryReducer,
  calendar: calendarReducer,
  documents: documentsReducer,
  employees: coordinatorReducer,
  ranking: rankingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
