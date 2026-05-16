export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Interface customizada para o nosso cliente HTTP, que atualmente simula um comportamento real
 * através de atrasos e respostas mockadas.
 */
interface HttpClient {
  get: <T>(url: string, config?: any) => Promise<{ data: T }>;
  post: <T>(url: string, data?: any, config?: any) => Promise<{ data: T }>;
  put: <T>(url: string, data?: any, config?: any) => Promise<{ data: T }>;
  patch: <T>(url: string, data?: any, config?: any) => Promise<{ data: T }>;
  delete: <T>(url: string, config?: any) => Promise<{ data: T }>;
}

/**
 * Função para simular delay de rede
 */
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Cliente HTTP Fake que simula o uso do Axios/Fetch.
 * Posteriormente, podemos substituir pela instância real do axios.
 * ex: import axios from 'axios'; const apiClient = axios.create({ baseURL: API_URL });
 */
export const apiClient: HttpClient = {
  get: async <T>(url: string, config?: any) => {
    await delay();
    console.log(`[GET] ${url}`, config);
    // Para simplificar no mock, como ele não terá dados reais, deixamos o .data as any
    // Os services individuais tratarão de retornar os dados corretos no mock.
    return { data: {} as T };
  },
  post: async <T>(url: string, data?: any, config?: any) => {
    await delay();
    console.log(`[POST] ${url}`, data, config);
    return { data: {} as T };
  },
  put: async <T>(url: string, data?: any, config?: any) => {
    await delay();
    console.log(`[PUT] ${url}`, data, config);
    return { data: {} as T };
  },
  patch: async <T>(url: string, data?: any, config?: any) => {
    await delay();
    console.log(`[PATCH] ${url}`, data, config);
    return { data: {} as T };
  },
  delete: async <T>(url: string, config?: any) => {
    await delay();
    console.log(`[DELETE] ${url}`, config);
    return { data: {} as T };
  }
};
