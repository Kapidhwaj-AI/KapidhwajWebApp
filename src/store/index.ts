
import { removeLocalStorageItem, setLocalStorageItem } from '@/lib/storage';
import { Hub } from '@/models/settings';
import { create } from 'zustand';


interface AuthState {
    token: string | null;
    registerOtpAccess: boolean;
}
export type CameraDetailView = 'focused' | 'overview';
type CameraState = {
    cameraDetailView: CameraDetailView;
    toogleColumns: number;
    isFullScreen: boolean,
    isAlertFullScreen: boolean
}

interface HubState {
    remoteHub: Hub | null
    localHub: Hub | null
}

interface SettingsState {
    isProfileOpen: boolean;
    isChangePasswordOpen: boolean;
}
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
    isFootFallCountEnabled: boolean;
    isIntrusionEnabled: boolean;
    isTrackEnabled: boolean;
    settings: {
        recordings: boolean;
        motion: boolean;
        intrusion_detection: boolean;
        people_count: boolean;
        license_plate_detection: boolean;
        face_detection: boolean;
        fire_smoke_detection: boolean;
        footfall_count: boolean;
        temp: boolean;
        intrusion_track_detection: boolean
    }

}
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
    footFallCount?: { camera_id: string; inCount: number; outCount: number } | null;
    currentCameraIsMotionDetection: boolean;
    currentCameraIsLicenseDetection: boolean;
    currentCameraIsFireDetection: boolean;
    currentCameraName: string;
    isMoveable: boolean;
    storage_type: string
    isPeople: boolean;
    ports: { static_port: number; live_port: number };
    filterLoading: boolean
}

interface UserState {
    email: string;
    username: string;
    phone: string;
    notificationCount: number;
}

export interface RootState {
    auth: AuthState;
    camera: CameraState;
    hub: HubState;
    settings: SettingsState;
    singleCameraSettings: SingleCameraSettingsState;
    singleCamera: SingleCameraState;
    user: UserState
}

export interface RootActions {

    //Auth
    setAuthToken: (token: string | null) => void;
    clearAuthToken: () => void;
    allowRegisterOtpAccess: () => void;
    clearRegisterOtpAccess: () => void;

    //User
    setUserEmail: (email: string) => void;
    setUserUsername: (username: string) => void;
    setUserPhone: (phone: string) => void;
    setNotificationCount: (notificationCount: number) => void

    //CameraDetails
    setToggleCameraDetailsView: (view: CameraDetailView) => void;
    setToggleColumns: (columns: number) => void;
    setIsFullScreenMode: (isFullScreen: boolean) => void;
    setIsAlertFullScreen: (isAlertFullScreen: boolean) => void;

    //Hub actions 
    setRemoteHub: (hub: Hub | null) => void;
    setLocalHUb: (hub: Hub | null) => void;

    // Settings actions
    setIsProfileOpen: (isOpen: boolean) => void;
    setIsChangePasswordOpen: (isOpen: boolean) => void;

    // Single Camera Settings actions
    togglePeopleDetection: () => void;
    toggleIntrusionDetection: () => void;
    togglePeopleCountDetected: () => void;
    toggleMotionDetection: () => void;
    toggleLicensePlateDetection: () => void;
    toggleFireSmokeDetection: () => void;
    toggleFaceDetection: () => void;
    toggleAllRecordings: () => void;
    setCameraSettings: (settings: SingleCameraSettingsState) => void;
    toggleAddToFavouritesDetection: () => void;
    setIsFootFallCount: (isFootFallCountEnabled: boolean) => void;
    setIsIntrusionEnabled: (isIntrusionEnabled: boolean) => void;
    setIsTrackEnabled:(isTrackEnabled: boolean) => void;
    setSettings: (settings: {
        recordings: boolean;
        motion: boolean;
        intrusion_detection: boolean;
        people_count: boolean;
        license_plate_detection: boolean;
        face_detection: boolean;
        fire_smoke_detection: boolean;
        footfall_count: boolean;
        temp: boolean;
        intrusion_track_detection: boolean
    }) => void;
    setCurrentCameraId: (id: { id: string }) => void;
    setCurrentCameraIsRecording: (isRecording: boolean) => void;
    setCurrentCameraIsIntrusion: (isIntrusion: boolean) => void;
    setCurrentCameraIsFaceDetection: (isFaceDetection: boolean) => void;
    setCurrentCameraIsMotionDetection: (isMotionDetection: boolean) => void;
    setCurrentCameraIsLicenseDetection: (isLicenseDetection: boolean) => void;
    setCurrentCameraIsFireDetection: (isFireDetection: boolean) => void;
    setActiveTabRedux: (tab: FeatureKeys) => void;
    setPeopleCount: (data: { camera_id: string; people_count: string }) => void;
    setFootFallCount: (data: { camera_id: string; inCount: number; outCount: number }) => void;
    setIsPeople: (isPeople: boolean) => void;
    setPorts: (data: { static_port: number; live_port: number }) => void;
    setCurrentCameraName: (data: { name: string }) => void;
    setIsMoveable: (isMoveable: boolean) => void;
    setCurrentStorageType: (storageType: string) => void;
    setIsFilterLoading: (val: boolean) => void
}



export const useStore = create<RootState & RootActions>((set, get) => ({
    auth: {
        token: null,
        registerOtpAccess: false
    },
    camera: {
        cameraDetailView: 'focused',
        toogleColumns: 2,
        isFullScreen: false,
        isAlertFullScreen: false,
    },
    hub: {
        remoteHub: null,
        localHub: null,
    },
    settings: {
        isProfileOpen: false,
        isChangePasswordOpen: false,
    },
    singleCameraSettings: {
        peopleDetected: 0,
        intrusionDetected: 0,
        peopleCountDetected: 0,
        motionDetected: 0,
        licensePlateDetected: 0,
        fireSmokeDetected: 0,
        allRecordings: false,
        addToFavourites: false,
        faceDetection: 0,
        isFootFallCountEnabled: false,
        isIntrusionEnabled: false,
        isTrackEnabled: false,
        settings: {
            recordings: false,
            motion: false,
            intrusion_detection: false,
            people_count: false,
            license_plate_detection: false,
            face_detection: false,
            fire_smoke_detection: false,
            footfall_count: false,
            temp: false,
            intrusion_track_detection: false
        },
    },
    user: {
        email: '',
        username: '',
        phone: '',
        notificationCount: 0,
    },
    singleCamera: {
        currentCameraId: '',
        activeTab: 'allRecordings',
        currentCameraIsRecording: false,
        currentCameraIsIntrusion: false,
        currentCameraIsFaceDetection: false,
        currentCameraIsMotionDetection: false,
        currentCameraIsLicenseDetection: false,
        currentCameraIsFireDetection: false,
        peopleCount: { camera_id: '', people_count: '0' },
        footFallCount: { camera_id: '', inCount: 0, outCount: 0 },
        currentCameraName: '',
        isMoveable: true,
        storage_type: '',
        isPeople: false,
        ports: { static_port: NaN, live_port: NaN },
        filterLoading: false
    },

    setAuthToken: (token) => set(state => ({ auth: { ...state.auth, token, } })),
    clearAuthToken: () => set(state => ({ auth: { ...state.auth, token: null } })),
    allowRegisterOtpAccess: () => set(state => ({ auth: { ...state.auth, registerOtpAccess: true } })),
    clearRegisterOtpAccess: () => set(state => ({ auth: { ...state.auth, registerOtpAccess: false } })),

    setUserEmail: (email) => set(state => ({ user: { ...state.user, email } })),
    setUserPhone: (phone) => set(state => ({ user: { ...state.user, phone } })),
    setUserUsername: (username) => set(state => ({ user: { ...state.user, username } })),
    setNotificationCount: (notificationCount) => set(state => ({ user: { ...state.user, notificationCount } })),

    setToggleCameraDetailsView: (view) => set(state => ({ camera: { ...state.camera, cameraDetailView: view } })),
    setToggleColumns: (columns) => set(state => ({ camera: { ...state.camera, toogleColumns: columns } })),
    setIsFullScreenMode: (isFullScreen) => set(state => ({ camera: { ...state.camera, isFullScreen } })),
    setIsAlertFullScreen: (isAlertFullScreen: boolean) => set(state => ({ camera: { ...state.camera, isAlertFullScreen } })),
    setRemoteHub: (hub) => {
        setLocalStorageItem('Remotehub', JSON.stringify(hub));
        removeLocalStorageItem('Localhub');
        set(state => ({ hub: { ...state.hub, remoteHub: hub } }));
    },
    setLocalHUb: (hub) => {
        setLocalStorageItem('Localhub', JSON.stringify(hub));
        removeLocalStorageItem('Remotehub');
        set(state => ({ hub: { ...state.hub, localHub: hub } }));
    },

    setIsProfileOpen: (isOpen) => set(state => ({ settings: { ...state.settings, isProfileOpen: isOpen } })),
    setIsChangePasswordOpen: (isOpen) => set(state => ({ settings: { ...state.settings, isChangePasswordOpen: isOpen } })),

    togglePeopleDetection: () => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, peopleDetected: state.singleCameraSettings.peopleDetected + 1 } })),
    toggleIntrusionDetection: () => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, intrusionDetected: state.singleCameraSettings.intrusionDetected + 1 } })),
    togglePeopleCountDetected: () => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, peopleCountDetected: state.singleCameraSettings.peopleCountDetected + 1 } })),
    toggleMotionDetection: () => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, motionDetected: state.singleCameraSettings.motionDetected + 1 } })),
    toggleLicensePlateDetection: () => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, licensePlateDetected: state.singleCameraSettings.licensePlateDetected + 1 } })),
    toggleFireSmokeDetection: () => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, fireSmokeDetected: state.singleCameraSettings.fireSmokeDetected + 1 } })),
    toggleFaceDetection: () => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, faceDetection: state.singleCameraSettings.faceDetection + 1 } })),
    toggleAllRecordings: () => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, allRecordings: !state.singleCameraSettings.allRecordings } })),
    setCameraSettings: (settings) => set({ singleCameraSettings: settings }),
    toggleAddToFavouritesDetection: () => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, addToFavourites: !state.singleCameraSettings.addToFavourites } })),
    setIsFootFallCount: (isFootFallCountEnabled) => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, isFootFallCountEnabled } })),
    setIsIntrusionEnabled: (isIntrusionEnabled: boolean) => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, isIntrusionEnabled } })),
    setIsTrackEnabled: (isTrackEnabled: boolean) => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, isTrackEnabled } })),
    setSettings: (settings) => set(state => ({ singleCameraSettings: { ...state.singleCameraSettings, settings: { ...state.singleCameraSettings.settings, ...settings } } })),
    setCurrentCameraId: ({ id }) => set(state => ({ singleCamera: { ...state.singleCamera, currentCameraId: id } })),
    setCurrentCameraIsRecording: (isRecording) => set(state => ({ singleCamera: { ...state.singleCamera, currentCameraIsRecording: isRecording } })),
    setCurrentCameraIsIntrusion: (isIntrusion) => set(state => ({ singleCamera: { ...state.singleCamera, currentCameraIsIntrusion: isIntrusion } })),
    setCurrentCameraIsFaceDetection: (isFaceDetection) => set(state => ({ singleCamera: { ...state.singleCamera, currentCameraIsFaceDetection: isFaceDetection } })),
    setCurrentCameraIsMotionDetection: (isMotionDetection) => set(state => ({ singleCamera: { ...state.singleCamera, currentCameraIsMotionDetection: isMotionDetection } })),
    setCurrentCameraIsLicenseDetection: (isLicenseDetection) => set(state => ({ singleCamera: { ...state.singleCamera, currentCameraIsLicenseDetection: isLicenseDetection } })),
    setCurrentCameraIsFireDetection: (isFireDetection) => set(state => ({ singleCamera: { ...state.singleCamera, currentCameraIsFireDetection: isFireDetection } })),
    setActiveTabRedux: (tab) => set(state => ({ singleCamera: { ...state.singleCamera, activeTab: tab } })),
    setPeopleCount: (data) => {
        const currentState = get().singleCamera;
        const peopleCount = currentState.currentCameraId === data.camera_id ? data : { camera_id: '', people_count: '0' };
        set({ singleCamera: { ...currentState, peopleCount } });
    },
    setFootFallCount: (data) => {
        const currentState = get().singleCamera;
        const footFallCount = currentState.currentCameraId === data.camera_id ? data : { camera_id: '', inCount: 0, outCount: 0 };
        set({ singleCamera: { ...currentState, footFallCount } });
    },
    setIsPeople: (isPeople) => set(state => ({ singleCamera: { ...state.singleCamera, isPeople } })),
    setIsFilterLoading: (filterrDial) => set(state => ({ singleCamera: { ...state.singleCamera, filterLoading: filterrDial } })),
    setPorts: (data) => {
        set((state) => ({ singleCamera: { ...state.singleCamera, ports: data } }))
    },
    setCurrentCameraName: ({ name }) => set(state => ({ singleCamera: { ...state.singleCamera, currentCameraName: name } })),
    setIsMoveable: (isMoveable) => set(state => ({ singleCamera: { ...state.singleCamera, isMoveable } })),
    setCurrentStorageType: (storageType) => set(state => ({ singleCamera: { ...state.singleCamera, storage_type: storageType } })),

}))