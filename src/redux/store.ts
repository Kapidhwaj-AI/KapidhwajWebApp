import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use web-compatible storage
import { ThunkAction, Action } from "@reduxjs/toolkit";

import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { cameraReducer } from "./slices/cameraSlice"
const persistConfig = {
  key: "root", // Root key for persisting the entire store
  storage, // Use web-compatible storage
  whitelist: [], // Only persist these slices
};
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  camera: cameraReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer, // Persisted root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore Redux Persist actions
      },
    }),
});

// Persistor for Redux Persist
export const persistor = persistStore(store);

// TypeScript Type Exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
