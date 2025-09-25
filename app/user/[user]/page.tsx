// WIP: Limit 5 resumes/user 

'use client'


import { useParams } from "next/navigation"
import UserDashboard from "@/pages/UserDashboard";
import useUserDetails from "@/hooks/useUserDetails";
import { useEffect } from "react";
import AdminDashboard from "@/pages/AdminDashboard";



export default function Dashboard() {
    const params = useParams()
    const user = params?.user as string
    const { userDetails, loading, error } = useUserDetails({ userId: user as String });

    // useEffect(() => {
    //     console.log(userDetails)
    // }, [userDetails])

    return (
        userDetails?.role == 'admin' ?
        <AdminDashboard user={user} /> :
        <UserDashboard user={user} />
    )
}
