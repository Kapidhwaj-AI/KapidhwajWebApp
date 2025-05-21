export const API_BASE_URL = process.env.API_BASE_URL;

export interface ApiResponse {
  reason: string;
  message: string;
}

export interface UserDetails {
  id: string;
  name: string;
  username: string;
  phone: string;
  email?: string | null;
  profile_image?: string | null;
}
