

// app/api/auth/verify.js
import jwt from 'jsonwebtoken'
import { getTokenData, deleteUserToken } from "@/lib/database"
import { NextResponse } from 'next/server'


export async function GET(req: Request) {
    try {
        const url = new URL(req.url)
        const token = url.searchParams.get('token')

        if (!token) {
            return NextResponse.redirect(new URL('/', req.url))
        }

        const tokenData = await getTokenData(token)

        if (!tokenData) {
            console.error("Invalid or expired token")
            return NextResponse.redirect(new URL('/', req.url))
        }

        // Verify JWT
        jwt.verify(token, process.env.JWT_SECRET!)

        // Create response with redirect
        const response = NextResponse.redirect(
            new URL(`/user/${tokenData.user_id}`, req.url)
        )

        // Set authentication cookie
        response.cookies.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 // 1 hour
        })

        return response

    } catch (error) {
        console.error('Verification error:', error)
        return NextResponse.redirect(new URL('/', req.url))
    }
}