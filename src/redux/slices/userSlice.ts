import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import { RootState } from "../store";


// Initial state for the user slice
const initialState: User | null = null;
// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRedux: (state, action: PayloadAction<User | null>) => {
      state = action.payload;
    },
  },
});

// Export the updateUser action and reducer
export const { setUserRedux } = userSlice.actions;
export const userReducer = userSlice.reducer;
