import {Camera} from './camera';
import {Person} from './person';

export interface Alert {
  id: number;
  frame_url: string;
  timestamp: number;
  person_ids: number[];
  camera_id: number;

  camera?: Camera;
  persons?: Person[];
  eventType: string;
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
