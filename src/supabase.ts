
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL: string = 'https://mfsjhcxjfxzdnsbmjory.supabase.co'
const SUPABASE_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mc2poY3hqZnh6ZG5zYm1qb3J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0OTY2MTQsImV4cCI6MjA1OTA3MjYxNH0.wEz9f3Sxvwk5tzAF_kT9ssga_D5224ZWmRJHDiyMc5g\n'


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
