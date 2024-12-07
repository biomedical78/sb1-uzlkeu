import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export async function validateSession(): Promise<boolean> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    
    if (!session) {
      const { data: { session: refreshedSession }, error: refreshError } = 
        await supabase.auth.refreshSession();
      if (refreshError) throw refreshError;
      return !!refreshedSession;
    }
    
    return true;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
}

export function handleAuthError(error: unknown): string {
  if (error instanceof AuthError) {
    switch (error.message) {
      case 'Email not confirmed':
        return 'Please verify your email address';
      case 'Invalid login credentials':
        return 'Invalid email or password';
      case 'Email rate limit exceeded':
        return 'Too many attempts. Please try again later';
      case 'Failed to fetch':
        return 'Connection error. Please check your internet connection';
      default:
        return error.message;
    }
  }

  if (error instanceof Error) {
    if (error.message.includes('Failed to fetch')) {
      return 'Connection error. Please check your internet connection';
    }
    return error.message;
  }

  return 'An unexpected error occurred';
}