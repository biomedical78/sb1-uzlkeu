import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { DB_CONFIG } from '../src/config/database';
import { AUTH_CONFIG } from '../src/config/auth';

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function initializeDatabase() {
  console.log('Initializing database...');

  try {
    // Create tables
    for (const [name, schema] of Object.entries(DB_CONFIG.SCHEMAS)) {
      console.log(`Creating ${name} table...`);
      const { error } = await supabase.rpc('exec_sql', { sql: schema });
      if (error && !error.message.includes('already exists')) {
        throw error;
      }
    }

    // Create admin user
    const { data: adminUser, error: adminError } = await supabase.auth.signUp({
      email: AUTH_CONFIG.ADMIN_EMAIL,
      password: AUTH_CONFIG.ADMIN_PASSWORD,
    });

    if (adminError && !adminError.message.includes('already registered')) {
      throw adminError;
    }

    if (adminUser?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: adminUser.user.id,
          role: 'admin',
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;
    }

    console.log('\n✅ Database initialized successfully');
    console.log('\nAdmin credentials:');
    console.log(`Email: ${AUTH_CONFIG.ADMIN_EMAIL}`);
    console.log(`Password: ${AUTH_CONFIG.ADMIN_PASSWORD}`);

    return true;
  } catch (error) {
    console.error('\n❌ Database initialization failed:', error);
    return false;
  }
}

initializeDatabase().then((success) => {
  process.exit(success ? 0 : 1);
});