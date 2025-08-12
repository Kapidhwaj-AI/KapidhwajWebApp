import { authReducer } from "./slices/authSlice";
import { cameraReducer } from "./slices/cameraSlice";
import { settingsReducer } from "./slices/settingsSlice";
import { userReducer } from "./slices/userSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Use web-compatible storage
import { ThunkAction, Action } from "@reduxjs/toolkit";
import { singleCameraSettingReducer } from "./slices/singleCameraSettingSlice";
import { singelCameraReducer } from "./slices/singleCameraSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  camera: cameraReducer,
  settings: settingsReducer,
  singleCameraSetting: singleCameraSettingReducer,
  singleCamera: singelCameraReducer
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
