'use client'

import { supabase } from "@/lib/supabaseClient";
import { UserDetailType } from "@/types"
import { useEffect, useState } from "react"


export default function useUserDetails({
    userId
}: {
    userId: String
}) {

    const [userDetails, setUserDetails] = useState<UserDetailType | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { data, error } = await supabase.from('users').select().eq('id', userId).single();

                if(error) throw error;
                setUserDetails({
                    email: data.email,
                    userId: data.id
                });

            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserDetails();
    }, [userId])

    // useEffect(() => {
    //     console.log("User State: ", userDetails)
    // }, [userDetails])

    return { userDetails, loading, error };
}