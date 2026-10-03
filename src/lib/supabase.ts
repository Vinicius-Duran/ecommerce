import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cliente público (Seguro para expor no front-end, obedece o RLS)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Cliente administrativo (Contorna o RLS usando a Service Role Key)
// ATENÇÃO: NUNCA importe este arquivo em Client Components
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
