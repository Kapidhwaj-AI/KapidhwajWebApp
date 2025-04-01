import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Initial state for the user slice
export type CameraDetailView = 'focused' | 'overview';
type CameraStateType = {
    cameraDetailView: CameraDetailView;
}
const initialState: CameraStateType = {
    cameraDetailView: 'focused'
}
// Create the slice
const cameraSlice = createSlice({
    name: "camera",
    initialState,
    reducers: {
        setToggleCameraDetailsView: (state, action: PayloadAction<CameraDetailView>) => {
            state.cameraDetailView = action.payload;
        },
    },
});

// Export the updateUser action and reducer
export const { setToggleCameraDetailsView } = cameraSlice.actions;
export const cameraReducer = cameraSlice.reducer;
