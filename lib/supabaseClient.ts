// lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.SUPABASE_URL!;
const supabaseAnonKey: string = process.env.SUPABASE_ANON_KEY!;


export const supabase = createClient(supabaseUrl, supabaseAnonKey)