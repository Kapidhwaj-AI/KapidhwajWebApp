// app/api/auth.ts
'use server'
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiBaseUrl } from './config';

export const handleLoginApi = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/signin`, {
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
}// app/actions/auth.ts

export async function handleLogout() {
    const token = (await cookies()).get('auth-token')?.value
    console.log("token", token);

    await axios({
        method: 'POST',
        url: `${apiBaseUrl}/signout`,
        headers: { Authorization: `Bearer ${token}` },
    }).then(async (res) => {
        (await cookies()).delete('auth-token')
        console.log("logout successfully");

        redirect('/login')
    }).catch((error) => {
        console.error('Backend logout failed:', error)
    })

}