import { ApiResponse, PaginatedQuery } from './api.types';

// TODO: Replace with real HTTP client (fetch/axios) integrated with NestJS backend
// Simulando delay de rede
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiClient {
  // TODO: Implement actual NestJS endpoints connectivity
  public async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    await delay();
    console.log(`GET ${url}`, params);
    return { data: {} as T };
  }

  public async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    await delay();
    console.log(`POST ${url}`, data);
    return { data: {} as T };
  }

  public async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    await delay();
    console.log(`PUT ${url}`, data);
    return { data: {} as T };
  }

  public async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    await delay();
    console.log(`PATCH ${url}`, data);
    return { data: {} as T };
  }

  public async delete<T>(url: string): Promise<ApiResponse<T>> {
    await delay();
    console.log(`DELETE ${url}`);
    return { data: {} as T };
  }
}

export const apiClient = new ApiClient();
