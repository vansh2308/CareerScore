// WIP: Limit 5 resumes/user 

'use client'


import { useParams } from "next/navigation"
import UserDashboard from "@/pages/UserDashboard";
import useUserDetails from "@/hooks/useUserDetails";
import AdminDashboard from "@/pages/AdminDashboard";



export default function Dashboard() {
    const params = useParams()
    const user = params?.user as string
    const { userDetails } = useUserDetails({ userId: user });

    return (
        userDetails?.role == 'admin' ?
        <AdminDashboard user={user} /> :
        <UserDashboard user={user} />
    )
}
