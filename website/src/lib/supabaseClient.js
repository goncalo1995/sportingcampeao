// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Cole o seu Project URL aqui
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Cole a sua Project API Key (anon public) aqui

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);