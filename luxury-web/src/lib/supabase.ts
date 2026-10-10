import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qgvgtdpjylqjswkcvhuq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndmd0ZHBqeWxxanN3a2N2aHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2NDgyMjIsImV4cCI6MjEwNzIyNDIyMn0.kA53TCejU0ZjpMZqcVYCqq-N8tocQ02To01NMT7SUbU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadAircraftMedia(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `listings/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('aircraft_media')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      console.warn('Supabase storage upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage.from('aircraft_media').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error('Failed to upload media:', err);
    return null;
  }
}
