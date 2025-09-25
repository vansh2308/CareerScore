
'use client'

import { supabase } from "@/lib/supabaseClient";
import { ResumeType, UserDetailType } from "@/types"
import { useEffect, useState } from "react"


export default function useResumeDetails({
    resumeId
}: {
    resumeId: String
}) {

    const [resumeDetails, setResumeDetails] = useState<ResumeType | null>(null);
    const [resumeLaoding, setResumeLoading] = useState<Boolean>(true);
    const [resumeError, setResumeError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const { data, error } = await supabase.from('resumes').select().eq('id', resumeId).single();

                if(error) throw error;
                setResumeDetails({
                    resumeId: data.id,
                    link: data.link,
                    name: data.name,
                    ownerId: data.owner_id,
                    size: data.size,
                    updatedAt: data.updated_at,
                    status: data.status,
                    ownerName: ''
                });

            } catch (err) {
                setResumeError(err as Error);
            } finally {
                setResumeLoading(false);
            }
        }

        fetchUserDetails();
    }, [resumeId])

    // useEffect(() => {
    //     console.log("User State: ", userDetails)
    // }, [userDetails])

    return { resumeDetails, resumeLaoding, resumeError };
}