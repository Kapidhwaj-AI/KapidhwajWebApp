import { RootState } from "../store";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Adjust the import path to your store file

// Define the state interface for the auth slice
interface AuthState {
  token: string | null;
  registerOtpAccess: boolean;
  // isRememberMeChecked: string;
  // isInitialized: boolean
}

// Initial state for the auth slice
const initialState: AuthState = {
  token: null,
  registerOtpAccess: false,
  // isRememberMeChecked: 'false',
  // isInitialized: false
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the token in the Redux state
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      // state.isInitialized = true
    },

    // Logout action that removes the token and clears localStorage
    clearAuthToken: (state) => {
      state.token = null;
    },

    allowRegisterOtpAccess: (state) => {
      state.registerOtpAccess = true;
    },

    clearRegisterOtpAccess: (state) => {
      state.registerOtpAccess = false;
    },

    // setIsRememberedMe: (state, action) => {
    //   state.isRememberMeChecked = action.payload;
    // },
  },
});

// Export actions and reducer
export const {
  setAuthToken,
  clearAuthToken,
  allowRegisterOtpAccess,
  clearRegisterOtpAccess,
} = authSlice.actions;
export const authReducer = authSlice.reducer;

// Selectors
// export const selectToken = (state: RootState) => state.auth.token;
// export const selectIsRememberMeChecked = (state: RootState) =>
//   state.auth.isRememberMeChecked;
