import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Adjust the import path to your store file

// Define the state interface for the auth slice
interface AuthState {
  token: string | null;
  isRememberMeChecked: string;
  isInitialized: boolean
}

// Initial state for the auth slice
const initialState: AuthState = {
  token: null,
  isRememberMeChecked: 'false',
  isInitialized: false
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the token in the Redux state
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isInitialized = true
    },
    // Logout action that removes the token and clears localStorage
    clearAuthToken: (state) => {
      state.token = null;

    },
    setIsRememberedMe: (state, action) => {
      state.isRememberMeChecked = action.payload;
    },
  },
});

// Export actions and reducer
export const { setAuthToken, clearAuthToken, setIsRememberedMe } = authSlice.actions;
export const authReducer = authSlice.reducer;

// Selectors
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsRememberMeChecked = (state: RootState) =>
  state.auth.isRememberMeChecked;
