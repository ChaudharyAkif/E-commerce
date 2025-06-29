
// import { createClient } from '@supabase/supabase-js'

import { createClient } from "@supabase/supabase-js";

const VITE_SUPABASE_URL = "https://qhntcmrfiukxnhvwrovh.supabase.co"
const VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFobnRjbXJmaXVreG5odndyb3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4MzI3MzMsImV4cCI6MjA2NTQwODczM30.iNYSAN_h3bChALkwWptUYY3FyZtCorsaWuVqE7FQUHI"
const supabase = createClient(VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY)
console.log(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY); // Just for debug
export default supabase;