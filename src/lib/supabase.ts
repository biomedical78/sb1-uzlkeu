import { createClient } from '@supabase/supabase-js';
import { ENV } from '../config/env';

if (!ENV.SUPABASE_URL || !ENV.SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

if (!ENV.SUPABASE_URL.startsWith('https://')) {
  throw new Error('Invalid Supabase URL format');
}

export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'supabase.auth.token',
  },
});

// Initialize auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
    localStorage.removeItem('supabase.auth.token');
  }
});