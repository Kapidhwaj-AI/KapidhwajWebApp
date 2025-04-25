"use server";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { clearAuthToken } from '@/redux/slices/authSlice';
import { store } from '@/redux/store';
import axios from 'axios';
import { apiBaseUrl } from '@/services/config';

export const checkTokenExpiration = async () => {
    try {
        const token = (await cookies()).get('auth-token')?.value;
        if (!token) {
            return false;
        }

        // Check token validity with backend
        const response = await axios({
            method: 'GET',
            url: `${apiBaseUrl}/user/added`,
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            console.log("Status: Token is valid.");
            return true;
        } else {
            console.log("Status: Token is not valid.");
            await handleLogout();
            return false;
        }
    } catch (error: any) {
        // If we get a 401 or 403, the token is invalid
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.log("Status: Token is invalid or expired.");
            await handleLogout();
            return false;
        }

        // For other errors (like 502), we'll assume the token is still valid
        // to prevent unnecessary logouts during server issues
        console.error('Token validation error:', error);
        return true;
    }
};

export const handleLogout = async () => {
    try {
        const token = (await cookies()).get('auth-token')?.value;

        // Call backend logout if token exists
        if (token) {
            try {
                await axios({
                    method: 'POST',
                    url: `${apiBaseUrl}/signout`,
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (error) {
                console.error('Backend logout failed:', error);
            }
        }

        // Clear Redux state
        store.dispatch(clearAuthToken());

        // Clear cookies
        (await cookies()).delete('auth-token');
        (await cookies()).delete('kapidhwajai-user');

        // Redirect to login
        redirect('/login');
    } catch (error) {
        console.error('Error during logout:', error);
        redirect('/login');
    }
}; 