import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  username: string;
  phone: string;
}

// Initial state for the user slice
const initialState: UserState = {
  email: "",
  username: "",
  phone: "",
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
  },
});

// Export the updateUser action and reducer
export const { setUserEmail, setUserUsername, setUserPhone } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
