'use server'
import axios from 'axios';
import { cookies } from 'next/headers';
import { apiBaseUrl } from './config';
import { Notification } from '@/models/notification';

interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

const getToken = async () => {
    const token = (await cookies()).get('auth-token')?.value;
    if (!token) throw new Error('No token found');
    return token;
}

export async function getNotifications(offset: number = 0): Promise<Notification[]> {
    console.log("getNotifications function called with offset:", offset);
    const token = await getToken();
    console.log("Token obtained:", token ? "Yes" : "No");

    try {
        console.log("Making API request to:", `${apiBaseUrl}/user/notification?offset=${offset}`);
        const res = await axios({
            method: 'GET',
            url: `${apiBaseUrl}/user/notification?offset=${offset}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Notification API Response:", res.data);
        return res.data.data;
    } catch (err) {
        console.error("Error Fetching Notifications:", err);
        throw err;
    }
} 