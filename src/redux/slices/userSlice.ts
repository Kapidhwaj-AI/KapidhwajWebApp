import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  username: string;
  phone: string;
  notificationCount: number;
}

// Initial state for the user slice
const initialState: UserState = {
  email: "",
  username: "",
  phone: "",
  notificationCount: 0,
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setNotificationCount: (state, action: PayloadAction<number>) => {
      state.notificationCount = action.payload;
    },
  },
});

export const { setUserEmail, setUserUsername, setUserPhone, setNotificationCount} =
  userSlice.actions;
export const userReducer = userSlice.reducer;
