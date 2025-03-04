import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/slice";
import profileReducer from "./profile/slice";
import productivityReducer from "./productivity/slice";
import departmentsReducer from "./departments/slice";
import salaryReducer from "./salary/slice";
import requestsReducer from "./requests/slice";
import documentsReducer from "./documents/slice";
import coordinatorReducer from "./coordinator/slice";
import rankingReducer from "./ranking/slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { logOut } from "./auth/operations";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "auth",
    "profile",
    "requests",
    "departments",
    "ranking",
    "employees",
    "documents",
    "salary",
    "productivity",
  ],
};

const appReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  productivity: productivityReducer,
  departments: departmentsReducer,
  salary: salaryReducer,
  requests: requestsReducer,
  documents: documentsReducer,
  employees: coordinatorReducer,
  ranking: rankingReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === logOut.fulfilled.type) {
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
