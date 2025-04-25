import {Organization} from './organization';

export interface Category {
  id: number;
  name: string;
  color_code: string;
  organization_id: number;

  organization?: Organization;

  createdAt?: Date;
  updatedAt?: Date;
}
