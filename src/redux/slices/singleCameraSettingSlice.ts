import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SingleCameraSettingsState {
    peopleDetected: number;
    intrusionDetected: number;
    peopleCountDetected: number;
    motionDetected: number;
    licensePlateDetected: number;
    allRecordings: boolean;
    addToFavourites: boolean;
    fireSmokeDetected: number;
    faceDetection: number;
}

const initialState: SingleCameraSettingsState = {
    peopleDetected: 0,
    intrusionDetected: 0,
    peopleCountDetected: 0,
    motionDetected: 0,
    licensePlateDetected: 0,
    fireSmokeDetected: 0,
    allRecordings: false,
    addToFavourites: false,
    faceDetection: 0,

};

const singelCameraSettingsSlice = createSlice({
    name: 'singleCameraSettings',
    initialState,
    reducers: {
        togglePeopleDetection(state) {
            state.peopleDetected = state.peopleDetected + 1;
        },
        toggleIntrusionDetection(state) {
            state.intrusionDetected = state.intrusionDetected + 1;

        },
        togglePeopleCountDetected(state) {
            state.peopleCountDetected = state.peopleCountDetected + 1;

        },
        toggleMotionDetection(state) {
            state.motionDetected = state.motionDetected + 1;
        },
        toggleLicensePlateDetection(state) {
            state.licensePlateDetected = state.licensePlateDetected + 1;
        },
        toggleFireSmokeDetection(state) {
            state.fireSmokeDetected = state.fireSmokeDetected + 1;
        },
        toggleFaceDetection(state) {
            state.faceDetection = state.faceDetection + 1;
        },
        toggleAllRecordings(state) {
            state.allRecordings = !state.allRecordings;
        },
        setCameraSettings(state, action: PayloadAction<SingleCameraSettingsState>) {
            return action.payload;
        },
        toggleAddToFavouritesDetection(state) {
            state.addToFavourites = !state.addToFavourites;
        },
    },
});

export const {
    togglePeopleCountDetected,
    togglePeopleDetection,
    toggleIntrusionDetection,
    toggleMotionDetection,
    toggleFaceDetection,
    toggleLicensePlateDetection,
    toggleFireSmokeDetection,
    toggleAllRecordings,
    setCameraSettings,
    toggleAddToFavouritesDetection,
} = singelCameraSettingsSlice.actions;

export const singleCameraSettingReducer = singelCameraSettingsSlice.reducer;
