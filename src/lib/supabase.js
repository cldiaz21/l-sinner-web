import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://mpabxhfrceyjizsebzvw.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYWJ4aGZyY2V5aml6c2VienZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NDY5NDUsImV4cCI6MjA3ODIyMjk0NX0.jZO81fQHpIw-ybFU3XnwicPCjeok8C0rap1riDluPWY';

// Solo mostrar warning en desarrollo, no en producción
if (process.env.NODE_ENV === 'development' && (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY)) {
  console.warn('⚠️ Using fallback Supabase credentials. Please configure environment variables in Vercel for production.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

