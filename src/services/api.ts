import axios from 'axios';
import { checkTokenExpiration } from '@/utils/tokenManager';
import { apiBaseUrl } from './config';

// Create axios instance
const api = axios.create({
    baseURL: apiBaseUrl,
});

// List of endpoints that don't require token
const noTokenRequired = [
    '/signin',
    '/signup',
    '/forgot-password',
    '/reset-password'
];

// Request interceptor
api.interceptors.request.use(
    async (config) => {
        // Skip token check for authentication endpoints
        if (noTokenRequired.some(endpoint => config.url?.includes(endpoint))) {
            return config;
        }

        // Check token expiration before each request
        const isTokenValid = await checkTokenExpiration();
        if (!isTokenValid) {
            return Promise.reject(new Error('Token expired'));
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token is invalid or expired
            await checkTokenExpiration();
        }
        return Promise.reject(error);
    }
);

export default api; 