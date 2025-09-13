import { Alert } from "./alert";
import { Camera, CameraLocation } from "./camera";
import { RecordedClip } from "./clip";
import { Folders, Organization } from "./organization";

export interface StreamFormData {
    name: string;
    people_threshold_count: number | undefined;
    organizationId: string;
    folderId: number | null | string;
    subfolder: number | null | string;
    detectionSensitivity?: number | undefined,
    overlapSensitivity?: number | undefined,
    sceneDensity?: number | undefined,
}

export interface StreamsViewProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    isLoading: boolean;
    organizations: Organization[];
    handleOrganizationSelect: (organization: Organization) => void;
    selectedOrganization: Organization | null;
    handleFolderSelect: (data: Folders) => void;
    selectedFolder: Folders | null;
    setSelectedChildFolder: (data: Folders) => void;
    selectedChildFolder: Folders | null;
    selectedData: Camera[] | null;
    visibleCameras: Camera[];
    toogleColumnValue: number;
    cameraCount: number;
}

export interface StreamsPageViewProps {
    isAllAlertLoading: boolean
    loading: boolean;
    serviceType: string | null;
    isFullscreen: boolean;
    cameraLocation: CameraLocation | undefined;
    camera: Camera | undefined;
    setIsEdit: (val: boolean) => void;
    setSettingDial: (val: boolean) => void;
    setFilterDial: (val: boolean) => void;
    setAlertOffset: React.Dispatch<React.SetStateAction<number>>;
    setRecordings: (val: RecordedClip[]) => void;
    makeFav: boolean;
    toggleStreamFav: () => void;
    fetchRecordings: (offSet: number) => Promise<RecordedClip[]>;
    setHasRecordingMore: (val: boolean) => void;
    setRecordingLoading: (val: boolean) => void;
    setRecordingOffset: React.Dispatch<React.SetStateAction<number>>;
    recordingOffset: number;
    recordingLoading: boolean;
    recordings: RecordedClip[];
    recordingref: React.RefObject<HTMLDivElement | null>;
    hasRecordingMore: boolean;
    selectedTab: string;
    changeTab: (val: string) => void;
    setAlerts: (val: Alert[]) => void;
    alertOffset: number;
    alertEndRef: React.RefObject<HTMLDivElement | null>;
    alerts: Alert[];
    fetchAlerts: (offSet: number, serviceType?: string | null) => Promise<Alert[] >;
    alertsLoading: boolean;
    setAlertsLoading: (val: boolean) => void;
    setHasMore: (val: boolean) => void;
    hasMore: boolean;
    filteredAlerts: Alert[];
    isDateFiltered: boolean;
    setIsDateFiltered: (val: boolean) => void;
    date: Date | undefined;
    startTime: Date | undefined;
    endTime: Date | undefined;
    setStartTime: (val: Date | undefined) => void;
    setDate: (val: Date | undefined) => void;
    setEndTime: (val: Date | undefined) => void;
    filterDial: boolean;
    isEdit: boolean;
    setIsEdit: (val: boolean) => void;
    formData: StreamFormData;
    isEditLoading: boolean;
    setFormData: (data: StreamFormData) => void;
    organizations: Organization[] | undefined;
    stream: boolean;
    handleToggleStream: (val: boolean) => void;
    handleSave: (formData: StreamFormData) => void;
    settingDial: boolean;
    handleAiToggle: (key: "intrusion_detection" | "people_count" | "license_plate_detection", toggleValue: boolean) => Promise<AxiosResponse<ApiResponse<unknown>, unknown>>;
    handleMotionToggle: (toggleValue: boolean) => Promise<AxiosResponse<ApiResponse<unknown>, unknown>>;
    handleRecordingToggle: (isRecord: boolean) => Promise<AxiosResponse<ApiResponse<unknown>, unknown>>;
    handleApplyFilter: (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => void;
    isAiServiceLoading: boolean;
    serviceType: string | null
    setIsAllAlertsLoading:(val:boolean) => void;
    topAlertRef: React.RefObject<HTMLDivElement | null>;
    topRecordingRef: React.RefObject<HTMLDivElement | null>
    
}