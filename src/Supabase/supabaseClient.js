import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const client = createClient(supabaseUrl, supabaseKey);


export function getSupabaseBrowserClient() {
   if (client) {
     return client;
   }
}
