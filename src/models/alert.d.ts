import {Camera} from './camera';
import {Person} from './person';

export interface Alert {
  id: number;
  frame_url: string;
  timestamp: number;
  person_ids: number[];
  persons: any[];

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
