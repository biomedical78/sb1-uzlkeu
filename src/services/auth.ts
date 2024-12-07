import { supabase } from '../lib/supabase';
import { handleAuthError } from '../utils/auth';
import { AuthError } from '../utils/errorHandling';

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new AuthError(error.message, error.status?.toString());

    if (!data.user) {
      throw new AuthError('No user data returned');
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      throw new AuthError('Failed to fetch user role');
    }

    return {
      success: true,
      user: { ...data.user, role: profile?.role || 'user' }
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      error: handleAuthError(error)
    };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new AuthError(error.message);
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return {
      success: false,
      error: handleAuthError(error)
    };
  }
}

export async function getCurrentUser() {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) throw new AuthError(sessionError.message);
    if (!session?.user) return null;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
    }

    return { ...session.user, role: profile?.role || 'user' };
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function refreshSession() {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) throw new AuthError(error.message);
    return { success: true, session };
  } catch (error) {
    console.error('Session refresh error:', error);
    return { success: false, error: handleAuthError(error) };
  }
}