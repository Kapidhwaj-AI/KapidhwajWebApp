import { Camera } from "./camera"
import { Person } from "./person"

export interface PersonDetails {
    alertType: string
    camera: Camera
    frame_url: string
    id: number
    person_ids: number[]
    persons: Person[]
    timestamp: 1756969395
    meta_data: {
        DETECTED_PLATE?: string;
        DETECTED_FIRE_SMOKE?: string;
        PEOPLE_COUNT?: number | string
    }
}

export interface PersonDetailsViewProps {
    personDetails: Alert[];
    offset: number;
    setOffset: (val: number) => void
    setFilterDial: (val: boolean) => void;
    filterDial: boolean;
    isDateFiltered: boolean;
    setIsDateFiltered: (val: boolean) => void;
    setPersonDetails: (val: Alert[]) => void;
    setDate: (val: Date | undefined) => void;
    setStartTime: (val: Date | undefined) => void;
    setEndTime: (val: Date | undefined) => void;
    setIsLoading: (val: boolean) => void;
    fetchAlertsByPersonId: (val: number) => Promise<Alert[]>;
    date: Date | undefined;
    startTime: Date | undefined;
    endTime: Date | undefined;
    handleApplyFilter: (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => void;
    isLoading: boolean;
    offset: number;
    divRef: React.RefObject<HTMLDivElement | null>;
    alertsLoading: boolean;
    setAlertsLoading: (val: boolean) => void
    hasMore: boolean;
    setHasMore: (val: boolean) => void
    err: string
}