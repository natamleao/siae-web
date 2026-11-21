
declare global {
  interface Window {
    __SIAE_CONFIG__?: {
      API_URL?: string;
    };
  }
}

const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL || 'http://localhost:3000'
  : window.__SIAE_CONFIG__?.API_URL;

if (!API_URL) {
  throw new Error(
    'Configuração da API ausente. Verifique a variável API_URL do ambiente.'
  );
}

export const getApiUrl = (endpoint: string): string => {
  return `${API_URL}${endpoint}`;
};

export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include',
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisição');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Erro desconhecido ao conectar com o servidor');
  }
}
