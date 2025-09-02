import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FeatureKeys =
    | 'cameraMovement'
    | 'allRecordings'
    | 'intrusionDetection'
    | 'peopleDetection'
    | 'peopleCount'
    | 'motionDetection'
    | 'licensePlateDetection'
    | 'fireSmokeDetection';
interface SingleCameraState {
    currentCameraId: string;
    activeTab: FeatureKeys;
    currentCameraIsRecording: boolean;
    currentCameraIsIntrusion: boolean;
    currentCameraIsFaceDetection: boolean;
    peopleCount: { camera_id: string; people_count: string, } | null;
    currentCameraIsMotionDetection: boolean;
    currentCameraIsLicenseDetection: boolean;
    currentCameraIsFireDetection: boolean;
    currentCameraName: string;
    isMoveable: boolean;
    storage_type: string
    isPeople: boolean;
}

const initialState: SingleCameraState = {
    currentCameraId: '',
    activeTab: 'allRecordings',
    currentCameraIsRecording: false,
    currentCameraIsIntrusion: false,
    currentCameraIsFaceDetection: false,
    currentCameraIsMotionDetection: false,
    currentCameraIsLicenseDetection: false,
    currentCameraIsFireDetection: false,
    peopleCount: { camera_id: '', people_count: '0', },
    currentCameraName: '',
    isMoveable: true,
    storage_type: '',
    isPeople: false
};

const singelCameraSlice = createSlice({
    name: 'singleCamera',
    initialState,
    reducers: {
        setCurrentCameraId(state, action) {
            const { id } = action.payload;
            state.currentCameraId = id;
        },
        setCurrentCameraIsRecording(state, action) {
            state.currentCameraIsRecording = action.payload;
        },
        setCurrentCameraIsIntrusion(state, action) {
            state.currentCameraIsIntrusion = action.payload;
        },
        setCurrentCameraIsFaceDetection(state, action) {
            state.currentCameraIsFaceDetection = action.payload;
        },
        setCurrentCameraIsMotionDetection(state, action) {
            state.currentCameraIsMotionDetection = action.payload;
        },
        setCurrentCameraIsLicenseDetection(state, action) {
            state.currentCameraIsLicenseDetection = action.payload;
        },
        setCurrentCameraIsFireDetection(state, action) {
            state.currentCameraIsFireDetection = action.payload;
        },
        setActiveTabRedux(state, action) {
            state.activeTab = action.payload;
        },
        setPeopleCount(state, action: PayloadAction<{ camera_id: string; people_count: string, }>) {
            if (state.currentCameraId === action.payload.camera_id) {
                state.peopleCount = action.payload;
            } else {
                state.peopleCount = initialState.peopleCount;
            }
        },
        setIsPeople(state, action) {
            state.isPeople = action.payload
        },
        setCurrentCameraName(state, action) {
            const { name } = action.payload;
            state.currentCameraName = name;
        },
        setIsMoveable(state, action) {
            state.isMoveable = action.payload;
        },
        setCurrentStorageType(state, action) {
            state.storage_type = action.payload
        }
    },
});

export const {
    setCurrentCameraId,
    setCurrentCameraIsRecording,
    setCurrentCameraIsIntrusion,
    setCurrentCameraIsFaceDetection,
    setCurrentCameraIsLicenseDetection,
    setCurrentCameraIsMotionDetection,
    setCurrentCameraIsFireDetection,
    setActiveTabRedux,
    setPeopleCount,
    setCurrentCameraName,
    setIsMoveable,
    setCurrentStorageType,
    setIsPeople
} = singelCameraSlice.actions;

export const singelCameraReducer = singelCameraSlice.reducer;
