import { Camera } from './camera';
import { Person } from './person';

export interface Alert {
  id: number;
  frame_url: string;
  timestamp: number;
  person_ids: number[];
  persons: number[];

  camera?: Camera;
  persons?: Person[];
  alertType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AlertVideo {
  id: number;
  event_id: number;
  person_id: number;
  gcp_video_path: string;

  person: Person;
  alert: Alert;

  createdAt?: Date;
  updatedAt?: Date;
}


export interface AlertViewProps {
  err: string
  filteredAlerts: Alert[];
  setAlerts: (val: Alert[]) => void;
  setAlertOffset: React.Dispatch<React.SetStateAction<number>>;
  alertOffset: number;
  setFilterDial: (val: boolean) => void;
  isDateFiltered: boolean;
  setIsDateFiltered: (val: boolean) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  fetchAlerts: (val: number, serviceType: string | null) => Promise<Alert[]>;
  setDate: (val: Date | undefined) => void;
  setStartTime: (val: Date | undefined) => void;
  setEndTime: (val: Date | undefined) => void;
  filterDial: boolean;
  handleApplyFilter: (date: Date | undefined, startTime: Date | undefined, endTime: Date | undefined) => void;
  date: Date | undefined;
  startTime: Date | undefined;
  endTime: Date | undefined;
  alertsLoading: boolean;
  hasMore: boolean;
  setHasMore: (val: boolean) => void;
  alertEndRef: React.RefObject<HTMLDivElement | nul>;
  alerts: Alert[];
  setSelectedTab: (value: string) => void;
  selectedTab: string;
  setAlertsLoading: (val: boolean) => void;
  serviceType: string | null
}