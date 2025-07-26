import { Camera } from './camera';
import { User } from './user';

export interface Organization {
  id: string;
  name: string;
  owner?: User['id']; // Optional field to include full User details when needed
  cameras: Camera[];
  folders: Folders[];
  createdAt: Date;
  updatedAt: Date;
}


export interface Folders {
  cameras: Camera[];
  child_folders: Folders[];
  created_at: Date
  id: number
  name: string
  organization_id: string
  parent_id: null | string
  updated_at: Date
}