export const isOnPrem = false;
const onPremApiBaseUrl = 'http://34.134.189.134:10023';
const cloudApiBaseUrl = 'https://api.kapidhwaj.ai/api_backend_naveen';
export const apiBaseUrl = isOnPrem ? onPremApiBaseUrl : cloudApiBaseUrl;
export const apiSocketUrl = 'https://api.kapidhwaj.ai';
export const apiSocketPath = '/api_backend_naveen/socket.io';