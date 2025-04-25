// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios';
import { apiBaseUrl } from '@/services/config';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value
    const { pathname } = request.nextUrl

    // Authentication routes (login, register, forgot-password)
    const authRoutes = ['/login', '/register', '/forgot-password']

    // Protected routes that require authentication
    const protectedRoutes = [
        '/home',
        '/streams',
        '/alerts',
        '/favourites',
        '/notifications',
        '/settings',
        '/profile',
        '/manage-account',
        '/create-stream',
        '/create-alert',
        '/create-favourite',
        '/create-notification',
        '/create-setting'
    ]

    // If user is on an auth route and has a token, redirect to home
    if (authRoutes.some(route => pathname.startsWith(route)) && token) {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    // If user is on a protected route
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        // If no token, redirect to login
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // Check token validity with backend
        try {
            const response = await axios({
                method: 'GET',
                url: `${apiBaseUrl}/user/added`,
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status !== 200) {
                // Clear cookies and redirect to login
                const response = NextResponse.redirect(new URL('/login', request.url))
                response.cookies.delete('auth-token')
                response.cookies.delete('kapidhwajai-user')
                return response
            }
        } catch (error: any) {
            // If we get a 401 or 403, the token is invalid
            if (error.response?.status === 401 || error.response?.status === 403) {
                // Clear cookies and redirect to login
                const response = NextResponse.redirect(new URL('/login', request.url))
                response.cookies.delete('auth-token')
                response.cookies.delete('kapidhwajai-user')
                return response
            }
        }
    }

    return NextResponse.next()
}

// Apply middleware to specific paths
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)'
    ]
}   