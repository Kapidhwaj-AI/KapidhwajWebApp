import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Initial state for the user slice
export type CameraDetailView = 'focused' | 'overview';
type CameraStateType = {
    cameraDetailView: CameraDetailView;
    toogleColumns: number;
    isFullScreen: boolean,
}
const initialState: CameraStateType = {
    cameraDetailView: 'focused',
    toogleColumns: 3,
    isFullScreen: false,
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
        setIsFullScreenMode: (state, action: PayloadAction<boolean>) =>{
            state.isFullScreen = action.payload
        }
    },
});

// Export the updateUser action and reducer
export const { setToggleCameraDetailsView, setToggleColumns, setIsFullScreenMode } = cameraSlice.actions;
export const cameraReducer = cameraSlice.reducer;
