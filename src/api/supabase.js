// Supabase client
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBKEY

const supabase = createClient(supabaseUrl, supabaseKey)

// Create a single supabase client for interacting with your database
export default  supabase;
