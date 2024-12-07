import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { AUTH_CONFIG } from '../../config/auth';

const AuthContext = createContext<null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { checkUser, isLoading, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      await checkUser();
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate(AUTH_CONFIG.LOGIN_REDIRECT);
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={null}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);