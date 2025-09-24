
// lib/database.js

import { supabase } from "./supabaseClient"


export const saveToken = async (userId: any, token: String) => {
    await supabase
        .from('magic_tokens')
        .delete()
        .eq('user_id', userId);


    const { data, error } = await supabase.from('magic_tokens').insert([
        {
            user_id: userId,
            token: token,
            expires_at: new Date(Date.now() + 3600000),
        }, // expires in 1 hour
    ])

    if (error) throw new Error(error.message)
    return data
}

export const getUserByEmail = async (email: String) => {
    try {
        const { data, error } = await supabase.from('users').select().eq('email', email).single();
        if (error && error.code !== 'PGRST116') throw error;

        if (data == null) {
            const { data, error } = await supabase.from('users').insert({ email: email }).select().single();
            if (error) throw error;

            return data;
        }

        return data;

    } catch (error) {
        console.error('Error in getUserByEmail:', error);
        throw error;
    }
}


export const getTokenData = async (token: String) => {
    const { data, error } = await supabase
        .from('magic_tokens')
        .select()
        .eq('token', token)
        .single()


    if (error) throw new Error(error.message)
    if (new Date(data.expires_at) < new Date()) {
        throw new Error('Token expired')
    }
    return data
}

export const deleteUserToken = async (token: String) => {
    const { data, error } = await supabase.from('magic_tokens').delete().match({ token: token })

    if (error) throw new Error(error.message)
    return data
}