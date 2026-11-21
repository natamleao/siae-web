export type Permissao = "ADMIN" | "ALUNO" | "TECNICO" | "ASSISTENTE" | "ALUNO_ADMIN";

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    matricula?: string;
    permissao: Permissao;
  };
  message?: string;
}

export interface User {
  id: string;
  email: string;
  matricula?: string;
  permissao: Permissao;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
  data?: {
    id: number;
    authId: number;
    nome: string;
    matricula: string;
    email: string;
    permissao: string;
    token: string;
  };
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}
