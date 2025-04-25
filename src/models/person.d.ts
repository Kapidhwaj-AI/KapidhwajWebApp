import {Alert} from './alert';
import {Camera} from './camera';
import {Category} from './category';
import {Organization} from './organization';

export interface Person {
  id?: number;
  name?: string | undefined;
  dob?: any;
  category_id?: number;
  gcp_image_path?: string;
  frame_url?: string;
  organization_id?: number;
  is_active?: number;
  gender?: string;
  category?: Category;
  organization?: Organization;

  alerts?: Alert[];

  createdAt?: Date;
  updatedAt?: Date;
  timestamp?: number;
  camera?: Camera;
}
