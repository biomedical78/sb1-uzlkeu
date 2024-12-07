import { supabase } from '../lib/supabase';
import { SUPABASE_CONFIG, DB_SCHEMA } from '../config/supabase';
import { AUTH_CONFIG } from '../config/auth';

export async function initializeDatabase() {
  try {
    // Create admin user
    const { data: adminUser, error: adminError } = await supabase.auth.signUp({
      email: AUTH_CONFIG.ADMIN_EMAIL,
      password: AUTH_CONFIG.ADMIN_PASSWORD,
    });

    if (adminError && !adminError.message.includes('User already registered')) {
      throw adminError;
    }

    // Set admin role
    if (adminUser?.user) {
      const { error: profileError } = await supabase
        .from(SUPABASE_CONFIG.TABLES.PROFILES)
        .upsert({
          id: adminUser.user.id,
          role: 'admin',
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;
    }

    // Enable Row Level Security
    await supabase.rpc('enable_rls');

    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
}