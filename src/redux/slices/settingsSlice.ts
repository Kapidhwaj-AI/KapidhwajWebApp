import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Settings {
    isProfileOpen: boolean;
    isChangePasswordOpen: boolean;
}

const initialState: Settings = {
    isProfileOpen: false,
    isChangePasswordOpen: false
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setIsProfileOpen: (state, action: PayloadAction<boolean>) => {
            state.isProfileOpen = action.payload;
        },
        setIsChangePasswordOpen: (state, action: PayloadAction<boolean>) => {
            state.isChangePasswordOpen = action.payload;
        }
    }
})

export const {
    setIsProfileOpen,
    setIsChangePasswordOpen
} = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;