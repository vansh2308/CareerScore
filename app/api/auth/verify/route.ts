

// app/api/auth/verify.js
import jwt from 'jsonwebtoken'

import { getTokenData, deleteUserToken } from "@/lib/database"

export async function GET(req: any) {
    const token = req.url.split('=')[1]

    const tokenData = await getTokenData(token)


    if (!tokenData) {
        console.error("Invalid or expired token")
        return Response.redirect("http://localhost:3000/")
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
        if (err) {
            throw new Error("JWT Verification failed")
        }
    })

    // Delete ONE-TIME token (just for security)
    await deleteUserToken(token)
    return Response.redirect(`http://localhost:3000/user/${tokenData!.user_id}`) 
}