

// app/api/auth/verify.js
import jwt from 'jsonwebtoken'

import { getTokenData, deleteUserToken } from "@/lib/database"

export async function GET(req: any) {
    const token = req.url.split('=')[1]

    console.log(token) // Logs the token value
    const tokenData = await getTokenData(token)

    if (!tokenData) {
        return Response.json({ error: 'Invalid or expired token' })
    }

    jwt.verify(token, process.env.JWT_SECRET!)

    // WIP: Why delete?
    // Delete or invalidate the token
    await deleteUserToken(token)

    return Response.redirect(`/dashboard`) // Or wherever you want to redirect the user after login
}