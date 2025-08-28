export const isOnPrem = false;
export const onPremApiBaseUrl = "http://34.134.189.134:10023";
export const cloudApiBaseUrl = "https://api.kapidhwaj.ai/api-backend";
// export const apiBaseUrl = isOnPrem ? onPremApiBaseUrl : cloudApiBaseUrl;
export const apiBaseUrl = "http://localhost:8084";
export const apiSocketUrl = "ws://localhost:8084";
export const apiSocketPath = "/api-backend/socket.io";

export const LOCALSTORAGE_KEY =
  process.env.NEXT_PUBLIC_LOCALSTORAGE_KEY || "kapi-token";

export const REGISTER_OTP_ACCESS_KEY = `${LOCALSTORAGE_KEY}/REGISTER_OTP_ACCESS`;

export const USER_TOKEN_COOKIE = "kapi-token";
export const GOOGLE_KPH_BUCKET_URL = "https://storage.googleapis.com/";
