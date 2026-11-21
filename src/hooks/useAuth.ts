import { useCallback } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
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
    isLockedOut,
    getLockoutTimeRemaining,
    validatePasswordStrength,
  };
}
