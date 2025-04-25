// app/api/auth.ts
'use server'
import api from './api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiBaseUrl } from './config';
import { handleLogout } from '@/utils/tokenManager';
import axios from 'axios';

export const handleLoginApi = async (username: string, password: string) => {
    try {
        const response = await api.post('/signin', {
            username,
            password,
        })

        if (response.status === 200) {
            (await cookies()).set('auth-token', response.data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            (await cookies()).set('kapidhwajai-user', JSON.stringify(response.data.data), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            return {
                success: true,
                data: response.data // Include all response data
            }
        }
        return { success: false, error: 'Invalid credentials' }
    } catch (error) {
        console.error('Login error:', error)
        return { success: false, error: error.message }
    }
}

export const singupUser = async (signupData: any) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${apiBaseUrl}/signup`,
            data: {
                name: signupData.firstName,
                username: signupData.userName,
                email: signupData.email,
                phone: signupData.phone,
                password: signupData.password,
            },
        });
        console.error('Signup response:234', JSON.stringify(response.data))

        if (response.status === 200) {
            return {
                success: true,
                data: response.data
            }
        }
    } catch (error) {
        console.error('Signup error:234', error)
        return { success: false, error: error.response.data.message }
    }
}
