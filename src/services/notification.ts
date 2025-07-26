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
    const token = await getToken();

    try {
        const res = await axios({
            method: 'GET',
            url: `${apiBaseUrl}/user/notification?offset=${offset}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data;
    } catch (err) {
        console.error("Error Fetching Notifications:", err);
        throw err;
    }
} 