import {Camera} from './camera';
import {Organization} from './organization';

export interface Hub {
  id: number;
  name: string;
  physical_address: string;
  organization_id: number;
  cameras?: Camera[];
  User?: User;
  organization: Organization;
  Organization: Organization;

  createdAt?: Date;
  updatedAt?: Date;
}
