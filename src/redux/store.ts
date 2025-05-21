import { authReducer } from "./slices/authSlice";
import { cameraReducer } from "./slices/cameraSlice";
import { userReducer } from "./slices/userSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Use web-compatible storage
import { ThunkAction, Action } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  camera: cameraReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// TypeScript Type Exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
