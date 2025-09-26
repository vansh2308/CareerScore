
'use client'

import { supabase } from "@/lib/supabaseClient";
import { ResumeType } from "@/types";
import { useCallback, useEffect, useState } from "react"


export default function useUserResumes({
    userId
}: {
    userId: String
}) {

    const [userResumes, setUserResumes] = useState<ResumeType[]>([]);
    const [resumeLoading, setResumeLoading] = useState<Boolean>(true);
    const [resumeError, setResumeError] = useState<Error | null>(null);

    const fetchUserResumes = useCallback(async () => {
        try {
            setResumeLoading(true)


            const { data, error } = await supabase.from('resumes').select().eq('owner_id', userId).order('updated_at', { ascending: false });
            setTimeout(() => {

            }, 1000);

            if (error) throw error;

            setUserResumes([...(data.map((item, key) => ({
                resumeId: item.id,
                link: item.link,
                name: item.name,
                ownerId: item.owner_id,
                size: item.size,
                updatedAt: item.updated_at,
                status: item.status,
                ownerName: '',
                score: {
                    structureScore: item.structure_score,
                    relevanceScore: item.relevance_score,
                    formattingScore: item.formatting_score,
                    keywordsScore: item.keyword_score
                }
            })))]);

        } catch (err) {
            setResumeError(err as Error);
        } finally {
            setTimeout(() => setResumeLoading(false), 1000)
            // setResumeLoading(false);
        }
    }, [userId])

    useEffect(() => {
        fetchUserResumes();
    }, [fetchUserResumes])

    return { userResumes, setUserResumes, resumeLoading, resumeError, resfreshResumes: fetchUserResumes };
}