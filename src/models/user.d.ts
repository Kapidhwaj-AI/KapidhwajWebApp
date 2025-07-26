import { Activity } from "./activity";

export interface User {
  id: string;
  name: string;
  username: string;
  phone: number;
  password?: string;
  email?: string;
  profile_image?: string;
  activities?: Activity[];
  createdAt?: Date;
  updatedAt?: Date;
}
