import { ResumeType, ScoreType } from "@/types";
import { supabase } from "./supabaseClient";
import { v4 as uuidv4 } from 'uuid';

// Upload file using standard upload
export const uploadFile = async (ownerId: String, file: File) => {
    const fileId = uuidv4();
    const { data, error } = await supabase.storage.from('resume').upload(`${fileId}`, file)
    if (error) {
        console.error(error)
    } else {
        console.log(`Successfully uploaded ${file.name}`)
        try {
            addFile(ownerId, fileId, file, data.fullPath)
        } catch (error) {
            console.error(error)
        }
    }

    return { data, error }
}


export const addFile = async (ownerId: String, fileID: string, file: File, fileLink: String) => {

    const { data, error } = await supabase.from('resumes').insert({
        id: fileID,
        name: file.name,
        owner_id: ownerId,
        link: fileLink,
        size: file.size,
        status: 'Pending',
    })
    if (error) {
        console.error(error);
        throw error
    }

    return { data, error }
}



export const deleteFile = async (fileId: string) => {
    try {
        const { error: storageError } = await supabase.storage.from('resume').remove([`${fileId}`]);
        if (storageError) {
            throw storageError;
        }

        const { data, error: dbError } = await supabase.from('resumes').delete().eq('id', fileId);
        if (dbError) {
            throw dbError;
        }

        return { success: true, data };

    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
}



export const updateResumeScore = async (resumeId: string, newResume: ResumeType) => {
    try {
        const { data, error } = await supabase
            .from('resumes')
            .update({
                status: newResume.status,
                structure_score: newResume.score.structureScore,
                relevance_score: newResume.score.relevanceScore,
                formatting_score: newResume.score.formattingScore,
                keyword_score: newResume.score.keywordsScore,
                updated_at: newResume.updatedAt
            })
            .eq('id', resumeId)
            .select()


        if (error) {
            throw error
        }
        return { success: true, data };
    } catch (error) {
        console.error('Error updating resume: ', error);
        throw error
    }
}



export const addResumeMessage = async (resumeId: string, messageContent: string, uploadedBy: 'admin' | 'owner' ) => {
    try {
        const { data, error } = await supabase
            .from('messages')
            .insert({
                resume_id: resumeId,
                content: messageContent,
                by: uploadedBy
            })
            .select()

        if (error) {
            throw error
        }
        return { data, error }

    } catch (error) {
        console.error('Error commenting: ', error);
        throw error
    }
}


