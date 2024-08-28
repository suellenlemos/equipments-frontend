import { useCallback, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../app/hooks/useAuth';
import { authService } from '../app/services/authService.ts';

interface AuthGuardProps {
  isPrivate: boolean;
}

export const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
  const { signedIn } = useAuth();

  const VALIDATE_TOKEN_INTERVAL_MS = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

  const checkTokenIsValid = useCallback(async (): Promise<void> => {
    if (signedIn) {
      await authService.validateToken();
    }
  }, [signedIn]);

  useEffect(() => {
    checkTokenIsValid();

    const interval = setInterval(() => {
      checkTokenIsValid();
    }, VALIDATE_TOKEN_INTERVAL_MS);

    return () => {
      return clearInterval(interval);
    };
  }, [checkTokenIsValid]);

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
