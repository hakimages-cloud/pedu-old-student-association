import { createClient } from '@supabase/supabase-js';

// Your Supabase configuration
// Replace with your actual Supabase URL and anon key
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key-here';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export {
  supabase
};

export default supabase;
