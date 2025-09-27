
// lib/database.js

import { supabase } from "./supabaseClient"


export const saveToken = async (userId: string, token: string) => {
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

export const getUserByEmail = async (email: string) => {
    try {
        const { data, error } = await supabase.from('users').select().eq('email', email).single();
        if (error && error.code !== 'PGRST116') throw error;

        if (data == null) {
            const allowed_admins = process.env.NEXT_PUBLIC_ALLOWED_ADMINS;
            const role = allowed_admins?.split(' ').includes(email) ? 'admin' : 'regular';

            const { data, error } = await supabase.from('users').insert({ email: email, role: role }).select().single();
            if (error) throw error;

            return data;
        }

        return data;

    } catch (error) {
        console.error('Error in getUserByEmail:', error);
        throw error;
    }
}


export const getTokenData = async (token: string) => {
    const { data, error } = await supabase
        .from('magic_tokens')
        .select()
        .eq('token', token)
        .single()

    if (error && error.code !== 'PGRST116') throw new Error(error.message)

    // redirect to home 
    if(data == null) return data

    if (new Date(data.expires_at) < new Date()) {
        throw new Error('Token expired')
    }
    return data
}

export const deleteUserToken = async (token: string) => {
    const { data, error } = await supabase.from('magic_tokens').delete().match({ token: token })

    if (error) throw new Error(error.message)
    return data
}


