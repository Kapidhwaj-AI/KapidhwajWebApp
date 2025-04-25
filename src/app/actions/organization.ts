'use server'
import axios from 'axios';
import { cookies } from 'next/headers';
import { apiBaseUrl } from '@/services/config';

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

export async function getOrganizations(organizationId?: string) {
    const token = await getToken();
    try {
        const response = await axios<ApiResponse<any>>({
            method: 'GET',
            url: organizationId
                ? `${apiBaseUrl}/organizations?organizationId=${organizationId}`
                : `${apiBaseUrl}/organizations`,
            headers: { Authorization: `Bearer ${token}` },
        });

        if (organizationId) {
            return [response.data.data?.organization];
        }
        return response.data.data?.map((item: any) => item.organization);
    } catch (err) {
        console.error('Error fetching organizations:', err);
        throw err;
    }
} 