import { create } from 'zustand';
import { signIn, signOut, getCurrentUser } from '../services/auth';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  role: 'admin' | 'user' | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isLoading: true,
  error: null,
  
  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await signIn(email, password);
      
      if (response.success && response.user) {
        set({ 
          user: response.user,
          role: response.user.role,
          isLoading: false,
          error: null
        });
      } else {
        set({ 
          user: null,
          role: null,
          isLoading: false,
          error: response.error || 'Authentication failed'
        });
      }
    } catch (error) {
      set({ 
        user: null,
        role: null,
        isLoading: false,
        error: 'Authentication failed'
      });
    }
  },
  
  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOut();
      set({ user: null, role: null, isLoading: false, error: null });
    } catch (error) {
      set({ isLoading: false, error: 'Sign out failed' });
    }
  },
  
  checkUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getCurrentUser();
      set({ 
        user: user,
        role: user?.role || null,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        user: null,
        role: null,
        isLoading: false,
        error: 'Failed to get user'
      });
    }
  },

  clearError: () => set({ error: null })
}));