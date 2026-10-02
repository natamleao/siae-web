export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    matricula?: string;
  };
  message?: string;
}

export interface User {
  id: string;
  email: string;
  matricula?: string;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
  token?: string;
  user?: User;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}
