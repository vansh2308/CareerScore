

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { deleteUserToken, getTokenData } from './lib/database'

export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/api/auth/verify')) {
        return NextResponse.next()
    }

    // Only run on user routes
    if (request.nextUrl.pathname.startsWith('/user/')) {
        try {
            // Get token from cookie
            const token = request.cookies.get('auth_token')?.value

            if (!token) {
                console.log("No token in cookies...")
                return NextResponse.redirect(new URL('/', request.url))
            }

            // Verify token exists in database
            const tokenData = await getTokenData(token)

            if (!tokenData) {
                console.log("Token not found in DB")
                return NextResponse.redirect(new URL('/', request.url))
            }

            // Get userId from URL
            const urlUserId = request.nextUrl.pathname.split('/')[2]

            // Verify token belongs to correct user
            if (tokenData.user_id !== urlUserId) {
                console.log("Tokens don't match")
                return NextResponse.redirect(new URL('/', request.url))
            }

            // await deleteUserToken(token)
            return NextResponse.next()

        } catch (error) {
            console.error('Auth middleware error:', error)
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

// Configure which routes to protect
export const config = {
    matcher: [
        '/user/:path*',
        '/api/auth/verify'
    ]
}