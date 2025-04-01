// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value
    const { pathname } = request.nextUrl

    // Protected routes
    const protectedRoutes = ['/home', "/streams", "/alerts", "/favourites", "/notifications", "/settings"] // Add all protected paths
    const authRoutes = ['/login', '/register']


    // 1. Redirect logged-in users from auth pages
    if (authRoutes.some(route => pathname.startsWith(route)) && token) {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    // 2. Protect main routes from unauthorized access
    if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
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