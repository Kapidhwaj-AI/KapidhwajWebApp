'use server'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Organization } from '../models/organization';
import { apiBaseUrl } from './config';
import { cookies } from 'next/headers';

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

// Server-side functions
export const getOrganizations = async (organizationId?: string): Promise<Organization[]> => {
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
};

export const createOrganization = async (name: string): Promise<AxiosResponse<ApiResponse<Organization>>> => {
    const token = await getToken();
    try {
        const response = await axios<ApiResponse<Organization>>({
            method: 'POST',
            url: `${apiBaseUrl}/organizations/`,
            headers: { Authorization: `Bearer ${token}` },
            data: { name },
        });
        return response;
    } catch (error) {
        console.error('Error creating organization:', error);
        throw error;
    }
};

export const editOrganization = async (organizationId: string, name: string): Promise<AxiosResponse<ApiResponse<Organization>>> => {
    const token = await getToken();
    try {
        const response = await axios<ApiResponse<Organization>>({
            method: 'PUT',
            url: `${apiBaseUrl}/organizations`,
            headers: { Authorization: `Bearer ${token}` },
            data: { organizationId, name },
        });
        return response;
    } catch (error) {
        console.error('Error editing organization:', error);
        throw error;
    }
};

export const deleteOrganization = async (organizationId: string): Promise<AxiosResponse<ApiResponse<null>>> => {
    const token = await getToken();
    try {
        const response = await axios<ApiResponse<null>>({
            method: 'DELETE',
            url: `${apiBaseUrl}/organizations/`,
            headers: { Authorization: `Bearer ${token}` },
            data: { organizationId },
        });
        return response;
    } catch (error) {
        console.error('Error deleting organization:', error);
        throw error;
    }
}; 