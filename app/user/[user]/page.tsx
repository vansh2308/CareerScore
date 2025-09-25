// WIP: Limit 5 resumes/user 

'use client'


import { useParams } from "next/navigation"
import UserDashboard from "@/pages/UserDashboard";



export default function Dashboard() {
    const params = useParams()
    const user = params?.user as string

    return (
        <UserDashboard user={user} />
    )
}
