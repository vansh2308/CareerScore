
'use client'

import { supabase } from "@/lib/supabaseClient";
import { ResumeMessage, ResumeType, UserDetailType } from "@/types"
import { useEffect, useState } from "react"


export default function useResumeMessages({
    resumeId
}: {
    resumeId: string
}) {

    const [resumeMessages, setResumeMessages] = useState<ResumeMessage[]>([]);
    const [resumeMessagesLoading, setResumeMessagesLoading] = useState<Boolean>(true);
    const [resumeMessagesError, setResumeMessagesError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchResumeMessages = async () => {
            try {
                const { data, error } = await supabase
                                            .from('messages')
                                            .select()
                                            .eq('resume_id', resumeId)
                                            .order('created_at', {ascending: true});

                setTimeout(() => {
                }, 1000);

                if (error) throw error;

                setResumeMessages(
                    data.map((item) => ({
                        by: item.by,
                        content: item.content,
                        timestamp: item.created_at
                    }))
                )

            } catch (err) {
                setResumeMessagesError(err as Error);
            } finally {
                setTimeout(() => {
                    setResumeMessagesLoading(false);
                }, 1000);
            }
        }

        fetchResumeMessages();
    }, [resumeId])


    return { resumeMessages, setResumeMessages, resumeMessagesLoading, resumeMessagesError };
}