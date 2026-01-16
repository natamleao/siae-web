import { useCallback, useEffect, useState } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    setAuthenticated(authService.isAuthenticated());
  }, []);

  const getToken = useCallback(() => {
    return authService.getToken();
  }, []);

  const isAuthenticated = useCallback(() => {
    return authenticated;
  }, [authenticated]);

  const logout = useCallback(() => {
    authService.logout();
    setAuthenticated(false);
  }, []);

  const isLockedOut = useCallback(() => {
    return authService.isLockedOut();
  }, []);

  const getLockoutTimeRemaining = useCallback(() => {
    return authService.getLockoutTimeRemaining();
  }, []);

  const validatePasswordStrength = useCallback((password: string) => {
    return authService.validatePasswordStrength(password);
  }, []);

  return {
    getToken,
    isAuthenticated,
    logout,
    isLockedOut,
    getLockoutTimeRemaining,
    validatePasswordStrength,
  };
}
