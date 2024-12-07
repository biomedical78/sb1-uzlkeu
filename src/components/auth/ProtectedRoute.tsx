import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { AUTH_CONFIG } from '../../config/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'user')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, role, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !role || !allowedRoles.includes(role)) {
    return <Navigate to={AUTH_CONFIG.LOGIN_REDIRECT} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}