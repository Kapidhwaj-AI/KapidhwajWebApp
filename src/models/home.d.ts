import { Hub, ManageHub } from "./settings";

export interface HomeViewProps {
    isHubLoading: boolean;
    fetchHub: () => void;
    nearbyHubs: ManageHub[];
    savedHubs: Hub[];
    isSavedHubLoading: boolean;
    fetchSavedHubs: () => void;
    handleAccessRemotely: (hub: Hub) => void;
    isRemotely: boolean;
    devices: number;
    handleNearbyHubsAccess: (hub: ManageHub) => void;
    setIsAddModal: (val: boolean) => void
    setIsSiteAddModal: (val: boolean) => void
}