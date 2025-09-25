
'use client'

import { supabase } from "@/lib/supabaseClient";
import { DatabaseResumeResponse, ResumeType } from "@/types";
import { useCallback, useEffect, useState } from "react"


export default function useAllResumes() {

    const [resumeList, setResumeList] = useState<ResumeType[]>([]);
    const [resumeListLoading, setResumeListLoading] = useState<Boolean>(true);
    const [resumeListError, setResumeListError] = useState<Error | null>(null);

        const fetchResumeList = useCallback(async () => {
            try {
                setResumeListLoading(true)
                

                const { data, error } = await supabase
                .from('resumes')
                .select(`
                    id, 
                    updated_at, 
                    name, 
                    owner_id, 
                    link, 
                    size, 
                    status, 
                    users(email)
                `)
                .order('updated_at', { ascending: false })
                .returns<DatabaseResumeResponse[]>();

                setTimeout(() => {
                }, 1000);

                if (error) throw error;

                // console.log(data)

                setResumeList(
                    data.map((item) => ({
                        resumeId: item.id,
                        link: item.link,
                        name: item.name,
                        ownerId: item.owner_id,
                        size: item.size,
                        updatedAt: item.updated_at,
                        status: item.status,
                        ownerName: item.users.email
                    }))
                );

            } catch (err) {
                setResumeListError(err as Error);
            } finally {
                setTimeout(() => setResumeListLoading(false), 1000)
            }
        }, [])

    useEffect(() => {
        fetchResumeList();
    }, [fetchResumeList])

    return { resumeList, setResumeList, resumeListLoading, resumeListError, resfreshResumes: fetchResumeList };
}