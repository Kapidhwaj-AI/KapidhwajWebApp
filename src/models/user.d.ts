import { Activity } from "./activity";
import { Organization } from "./organization";

export interface User {
  id: string;
  name: string;
  username: string;
  phone: number;
  password?: string;
  email?: string;
  profile_image?: any;
  activities?: Activity[];
  createdAt?: Date;
  updatedAt?: Date;
}
