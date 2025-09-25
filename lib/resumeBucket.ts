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
            status: 'Pending'
        })
        if (error) {
            console.error(error);
            throw error
        }

        return { data, error }
}

