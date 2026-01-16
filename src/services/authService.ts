import { apiRequest, getApiUrl } from '../config/api';
import { API_ENDPOINTS, AUTH, ERROR_MESSAGES } from '../config/constants';
import type { LoginResponse, RegisterResponse, ForgotPasswordResponse } from '../types/auth';

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    if (!email || !password) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    try {
      const response = await apiRequest<LoginResponse>(
        getApiUrl(API_ENDPOINTS.LOGIN),
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.token) {
        this.setToken(response.token);
      } else {
        this.setToken('authenticated');
      }

      return response;
    } catch (error) {
      this.incrementFailCount();
      throw error;
    }
  }

  async register(
    email: string,
    password: string,
    matricula: string
  ): Promise<RegisterResponse> {
    if (!email || !password || !matricula) {
      throw new Error('Todos os campos são obrigatórios');
    }

    if (!this.validatePasswordStrength(password)) {
      throw new Error(ERROR_MESSAGES.INVALID_PASSWORD_STRENGTH);
    }

    try {
      const response = await apiRequest<RegisterResponse>(
        getApiUrl(API_ENDPOINTS.REGISTER),
        {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            matricula: Number(matricula),
            permissao: 0,
          }),
        }
      );

      if (response.token) {
        this.setToken(response.token);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(identifier: string): Promise<ForgotPasswordResponse> {
    if (!identifier) {
      throw new Error('Email ou matrícula é obrigatório');
    }

    try {
      const response = await apiRequest<ForgotPasswordResponse>(
        getApiUrl(API_ENDPOINTS.FORGOT_PASSWORD),
        {
          method: 'POST',
          body: JSON.stringify({ email: identifier }),
        }
      );

      this.clearFailCount();

      return response;
    } catch (error) {
      this.incrementFailCount();
      throw error;
    }
  }

  logout(): void {
    this.clearToken();
    this.clearFailCount();
    this.clearLockout();
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(AUTH.TOKEN_KEY, token);
    this.clearFailCount();
  }

  private clearToken(): void {
    localStorage.removeItem(AUTH.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  validatePasswordStrength(password: string): boolean {
    if (!password || password.length < AUTH.MIN_PASSWORD_LENGTH) {
      return false;
    }
    return AUTH.PASSWORD_REGEX.test(password);
  }

  private incrementFailCount(): void {
    const currentCount = parseInt(
      localStorage.getItem(AUTH.FAIL_COUNT_KEY) || '0',
      10
    );

    if (currentCount + 1 >= AUTH.MAX_LOGIN_ATTEMPTS) {
      const lockoutEnd = Date.now() + AUTH.LOCKOUT_DURATION_MS;
      localStorage.setItem(AUTH.LOCKOUT_END_KEY, lockoutEnd.toString());
    }

    localStorage.setItem(AUTH.FAIL_COUNT_KEY, (currentCount + 1).toString());
  }

  private clearFailCount(): void {
    localStorage.removeItem(AUTH.FAIL_COUNT_KEY);
  }

  private clearLockout(): void {
    localStorage.removeItem(AUTH.LOCKOUT_END_KEY);
  }

  isLockedOut(): boolean {
    const lockoutEnd = localStorage.getItem(AUTH.LOCKOUT_END_KEY);
    if (!lockoutEnd) return false;

    const lockoutTime = parseInt(lockoutEnd, 10);
    const isLocked = lockoutTime > Date.now();

    if (!isLocked) {
      this.clearLockout();
      this.clearFailCount();
    }

    return isLocked;
  }

  getLockoutTimeRemaining(): number {
    const lockoutEnd = localStorage.getItem(AUTH.LOCKOUT_END_KEY);
    if (!lockoutEnd) return 0;

    const remaining = parseInt(lockoutEnd, 10) - Date.now();
    return Math.max(0, remaining);
  }
}

export const authService = new AuthService();
