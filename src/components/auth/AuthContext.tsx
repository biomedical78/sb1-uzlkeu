import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/authStore';
import { validateSession } from '../../utils/auth';

interface AuthContextType {
  isInitialized: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isInitialized: false,
  isAuthenticated: false
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { checkUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const hasValidSession = await validateSession();
        setIsAuthenticated(hasValidSession);
        
        if (hasValidSession) {
          await checkUser();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
        await checkUser();
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isInitialized, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);