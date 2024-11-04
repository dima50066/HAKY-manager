import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/slice';
import profileReducer from './profile/slice';
import productivityReducer  from './productivity/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    productivity: productivityReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;