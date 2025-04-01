export interface User {
  id: string;
  name: string;
  username: string;
  phone?: number;
  password: string;
  email?: string;
  profile_image?: unknown;

  createdAt?: Date;
  updatedAt?: Date;
}
