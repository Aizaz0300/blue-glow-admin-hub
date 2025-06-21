import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { checkAuthStatus } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkAuthStatus();
      setIsAuthenticated(isAuth);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Add a loading state here if needed
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
