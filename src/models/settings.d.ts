import { AxiosResponse } from "axios";
import { Camera } from "./camera";
import { Folders, Organization } from "./organization";
import { Category } from "./category";

export interface ManageHub {
    name: string;
    ip: string;
    physical_address: string | null;
    port: number;
    txt: string
}
export interface ManageDeviceViewProp {
    selectedHub: Hub | null;
    isSavedHubLoading: boolean
    setIsHubLoading: (val: boolean) => void;
    fetchSavedHubs: () => Promis<void>;
    toggleStream: (toggleVal: boolean, id: string, physical_address: string, hub_id: string) => Promise<AxiosResponse>
    isDelete: boolean;
    setIsDelete: (val: boolean) => void;
    handleDelete: (cameraId: string, organizationId: string) => void
    setSelectedSite: (val: string) => void;
    selectedSite: string;
    sites: Organization[]
    camera: Camera | undefined;
    setCamera:(val: Camera) => void
}



export interface Hub {
    name: string;
    ip: string;
    is_registered: number;
    id: string;
    created_at: Date;
    organization: Organization;
    organization_id: string;
    physical_address: string;
    cameras: Camera[];
    static_port: string | number
}

export interface Profile {
    name: string;
    setName: (val: string) => void;
    phone: string;
    setPhone: (val: string) => void;
    id: string;
    setId: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    file: FIle | undefined;
    setFile: (val: File) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    preview: string;
    setPreview: (val: string) => void;
    isOpen: boolean;
    onClose: () => void;
    handleSave: (e: FormEvent<HTMLFormElement>) => void;
    handleImageClick: () => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isLoading: boolean;
}

//Manage User
export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    profile_image?: string;
    phone?: string;
    role_id: number;
    role: string;
    total_camera: number;
    camera_count: number;
}

export interface ManageAccessViewProp {
    isLoading: boolean;
    setAddUserModalOpen: (val: boolean) => void;
    setAddAccessModalOpen: (val: boolean) => void;
    sharedUser: User[]
    setIsDelete: (val: boolean) => void;
    setIsEdit: (val: boolean) => void;
    setSelectedShareableUser: (val: User) => void
    selectedShareableUser: User | undefined;
    isAccessLoading: boolean;
    accessLevels: AccessLevel[]
}

export interface AccessLevel {
    id: number;
    name: string;
}


//Manage Sites and Folders

export interface ManageSitesFoldersProp {
    isSiteLoading: boolean;
    sites: Organization[];
    setIsOrg: (val: boolean) => void;
    setIsFolder: (val: boolean) => void;
    handleNavigate: (id: string | number, type: 'org' | 'folder') => void;
    setIsDelete: (val: boolean) => void;
    orgId: string;
    folderId: number;
    folders: Folders[];
    subFolders: Folders[];
    setIsOpen: (val: boolean) => void
    setId: (val: string | number) => void
    setIsEdit: (val: boolean) => void;
    setName: (val: string) => void;
}

//Mange Devices

export interface Device {
    name: string;
    ipaddress: string;
    connected: boolean;
    status: string;
    rtsp: string;
}

export interface DevicesMap {
    [macAddress: string]: Device;
}


//Manage Person
export interface Person {
    id: number;
    name: string;
    gender: string;
    dob: string;
    category_id: number;
    gcp_image_path: string;
    category: Category;
}
export interface PersonFormaData {
    name: string;
    dob: Date | undefined;
    gender: string;
    category: string;
    file: File | undefined
}


export interface SettingsViewProps {
    setShowSelectLanguageDial: (val: boolean) => void;
    setShowHelpDial: (val: boolean) => void;
    showSelectLanguageDial: boolean;
    showHelpDial: boolean;
    settingsItems: {
        id: number;
        title: string;
        icon: JSX.Element;
        path: string;
    }[]
}

//network 

interface NetworkData {
    mode?: "static" | "dhcp";
    nic?: string;
    ipVersion?: string;
    ipv4?: {
        address?: string,
        subnetMask?: string,
        gateway?: string
    },
    dns?: {
        preferrd?: string,
        alternate?: string
    },
    autoDns?: boolean,
    mtu?: number
}
export interface NetworkViewProps {
    networkData?: NetworkData;
    loading: boolean;
    handleSave: (val: NetworkData | undefined) => void
    nicsData: NicsData[]
    nic: string;
    setNic: (val: string) => void;
    healthCheck?: () => void;
    status?: { isInternetConnected: boolean, isSocketConnected: boolean, isTunnelAlive: boolean }
}
export interface NicsData {
    id: string;
    label: string;
    mac: string
}
//custom services

export interface CustomServicesViewProps {
    menuItems: {
        id: number;
        title: string;
        icon: JSX.Element;
        path: string;
    }[]
}

export interface AttendanceViewProps {
    loading: boolean;
    sites: Organization[];
    categories: Category[]
    setIsStartModal: (val: boolean) => void;
}


export interface StorageUsage {
    sizeGB: number;
    usedGB: number;
    freeGB: number;
    usedPercent: number;
    freePercent: number;
    imagesGB: number;
    clipsGB: number;
}

export interface StorageUsageViewProps {
    storageUsage: StorageUsage ;
    loading: boolean
}

