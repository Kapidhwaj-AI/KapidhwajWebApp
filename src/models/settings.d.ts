import { AxiosResponse } from "axios";
import { Camera } from "./camera";
import { Folders, Organization } from "./organization";

export interface ManageHub {
    name: string;
    ip: string;
    physical_address: string | null;
    port: number;
    txt: string
}
export interface ManageDeviceViewProp {
    setSiteModalOpen: (val: boolean) => void;
    setAddFolderModalOpen: (val: boolean) => void;
    setSelectedHub: (val: Hub | null) => void;
    selectedHub: Hub | null;
    siteModalOpen: boolean;
    isAddFolderModalOpen: boolean;
    isHubLoading: boolean;
    setIsHubLoading: (val: boolean) => void;
    fetchHub: () => void;
    nearbyHubs: ManageHub[]
    savedHubs: Hub[]
    isSavedHubLoading: boolean;
    fetchSavedHubs: () => void;
    toggleStream: (toggleVal: boolean, id: number, physical_address: string, hub_id: number) => Promise<AxiosResponse>
    handleCopyIp: (ip: string) => void;
    isDelete: boolean;
    setIsDelete: (val: boolean) => void;
    handleDelete: (cameraId: number, organizationId: string) => void
    isHubDelete: boolean;
    setIsHubDelete: (val: boolean) => void;
    handleDeleteHub: (hubId: string) => void;
    setIsOpen: (val: boolean) => void;
    setSelectedSite: (val: string) => void;
    selectedSite: string;
    sites: Organization[]
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
    cameras: Camera[]
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
    image: string;
    file: FIle | undefined;
    setFile: (val: File) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
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