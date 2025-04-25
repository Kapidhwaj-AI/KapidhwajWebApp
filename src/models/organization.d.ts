import { Camera } from './camera';
import { Category } from './category';
import { Person } from './person';
import { Hub } from './hub';
import { User } from './user';

export interface Organization {
  id: string;
  name: string;
  owner?: User['id']; // Optional field to include full User details when needed
  cameras?: Camera[];
  Folders?: any;
  createdAt?: Date;
  updatedAt?: Date;
}
