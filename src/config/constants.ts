export const AUTH = {
  MAX_LOGIN_ATTEMPTS: 3,
  LOCKOUT_DURATION_MS: 15 * 60 * 1000,
  TOKEN_KEY: 'siae_token',
  USER_KEY: 'siae_user',
  FAIL_COUNT_KEY: 'siae_fail_count',
  LOCKOUT_END_KEY: 'siae_lockout_end',
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 16,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*\-_]).{8,16}$/,
  MATRICULA_REGEX: /^\d{6}$/,
  INSTITUTIONAL_EMAIL_REGEX: /^[^\s@]+@alu\.ufc\.br$/i,
} as const;

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
} as const;

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email ou senha inválidos',
  PASSWORD_MISMATCH: 'As senhas não coincidem',
  INVALID_PASSWORD_STRENGTH:
    'Senha deve ter de 8 a 16 caracteres, com letra maiúscula, minúscula, número e caractere especial',
  USER_NOT_FOUND: 'Usuário não encontrado',
  SERVER_ERROR: 'Erro ao conectar com o servidor',
  ACCOUNT_LOCKED: 'Muitas tentativas falhas. Bloqueado por 15 minutos',
  TOKEN_EXPIRED: 'Sua sessão expirou. Faça login novamente',
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet',
} as const;

export const TIMINGS = {
  TOAST_DURATION: 1500,
  REDIRECT_DELAY: 1500,
  DEBOUNCE: 300,
} as const;
