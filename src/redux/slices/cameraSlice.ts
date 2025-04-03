import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Initial state for the user slice
export type CameraDetailView = 'focused' | 'overview';
type CameraStateType = {
    cameraDetailView: CameraDetailView;
    toogleColumns: number;
}
const initialState: CameraStateType = {
    cameraDetailView: 'focused',
    toogleColumns: 3,

}
// Create the slice
const cameraSlice = createSlice({
    name: "camera",
    initialState,
    reducers: {
        setToggleCameraDetailsView: (state, action: PayloadAction<CameraDetailView>) => {
            state.cameraDetailView = action.payload;
        },
        setToggleColumns: (state, action: PayloadAction<number>) => {
            state.toogleColumns = action.payload;
        },
    },
});

// Export the updateUser action and reducer
export const { setToggleCameraDetailsView, setToggleColumns } = cameraSlice.actions;
export const cameraReducer = cameraSlice.reducer;
