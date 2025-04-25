import {Camera} from './camera';

export interface RecordedClip {
  id: number;
  camera_id: number;
  utc_stamp: number;
  recorded_path: string;

  camera?: Camera;

  createdAt?: Date;
  updatedAt?: Date;
}
