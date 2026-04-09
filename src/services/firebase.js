import { createClient } from '@supabase/supabase-js';

// Your Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://blgjwfbsjqojfbjqwpim.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsZ2p3ZmJzanFvamZianF3cGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NTUxNjIsImV4cCI6MjA5MTEzMTE2Mn0.2GpwubVzKxQcAbbCb-omrTjz0V6tJah8kYuScDRJ0po';

// Create Supabase client with improved session management
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'supabase.auth.token'
  }
});

export {
  supabase
};

export default supabase;
