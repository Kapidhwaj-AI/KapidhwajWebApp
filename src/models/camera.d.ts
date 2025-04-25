import { Organization } from './organization';
import { RecordedClip } from './clip';
import { Room } from './room';
import { Site } from './site';
import { Hub } from './hub';

export interface Camera {
  camera_id: number;
  name: string;
  physical_address: string;
  isRegistered: number;
  site_id: number;
  room_id: number;
  hub_id: number;
  uri?: any;
  rtsp_url?: string;
  webrtc_url: string;
  isRecord: number;
  is_fav: number;
  isAiStreamActive: number;
  is_people_count_active: number;
  is_intrusion_active: number;
  organization_id?: number;
  room?: Room;
  site?: Site;
  hub?: Hub;
  people_threshold_count?: any;
  organization?: Organization;
  recordedClips?: RecordedClip[];
  alerts?: Alert[];

  createdAt?: Date;
  updatedAt?: Date;
}

export interface CameraLocation {
  folder: any;
  folderId: any;
  parantFolder: any;
  parantFolderId: any;
  organization: string;
}
