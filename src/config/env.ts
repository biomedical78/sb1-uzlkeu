function requireEnvVar(name: string): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ENV = {
  SUPABASE_URL: requireEnvVar('VITE_SUPABASE_URL'),
  SUPABASE_ANON_KEY: requireEnvVar('VITE_SUPABASE_ANON_KEY'),
  NODE_ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD
} as const;