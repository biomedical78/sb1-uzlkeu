import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AUTH_CONFIG } from '../config/auth';

export function useAuth() {
  const { user, role, isLoading, error, signIn, signOut, checkUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user && location.pathname !== AUTH_CONFIG.LOGIN_REDIRECT) {
      navigate(AUTH_CONFIG.LOGIN_REDIRECT);
    }
  }, [isLoading, user, location.pathname, navigate]);

  const isAuthenticated = !!user;
  const isAdmin = role === 'admin';
  const isUser = role === 'user';

  return {
    user,
    role,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    isUser,
    signIn,
    signOut,
    checkUser,
  };
}