import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hbosjierbvruugtkkxad.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhib3NqaWVyYnZydXVndGtreGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1Mzk5ODUsImV4cCI6MjEwNTExNTk4NX0.ITJD1xx2znhBPh65pOciEUjz_6N-5rbu9wsaXTAleYU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
