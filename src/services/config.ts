export const isOnPrem = false;
const onPremApiBaseUrl = "http://34.134.189.134:10023";
const cloudApiBaseUrl = "https://api.kapidhwaj.ai/api_backend_naveen";
// export const apiBaseUrl = isOnPrem ? onPremApiBaseUrl : cloudApiBaseUrl;
export const apiBaseUrl = "https://apilive.kapidhwaj.ai/api-backend";
export const apiSocketUrl = "https://api.kapidhwaj.ai";
export const apiSocketPath = "/api_backend_naveen/socket.io";

export const LOCALSTORAGE_KEY =
  process.env.NEXT_PUBLIC_LOCALSTORAGE_KEY || "kapi-token";

export const REGISTER_OTP_ACCESS_KEY = `${LOCALSTORAGE_KEY}/REGISTER_OTP_ACCESS`;

export const USER_TOKEN_COOKIE = "kapi-token";
export const GOOGLE_KPH_BUCKET_URL = "https://storage.googleapis.com/kph-ml/";
