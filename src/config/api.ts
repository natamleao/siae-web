const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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
