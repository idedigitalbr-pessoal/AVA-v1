import { ApiError } from './api.types';

export class AppError extends Error {
  public statusCode: number;
  public errors?: string[];

  constructor(message: string, statusCode = 500, errors?: string[]) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export const handleError = (error: any): AppError => {
  console.error("API Error:", error);
  if (error?.response?.data) {
    const apiError = error.response.data as ApiError;
    return new AppError(
      Array.isArray(apiError.message) ? apiError.message[0] : apiError.message,
      apiError.statusCode,
      Array.isArray(apiError.message) ? apiError.message : undefined
    );
  }
  return new AppError("Ocorreu um erro inesperado de conexão.");
};
