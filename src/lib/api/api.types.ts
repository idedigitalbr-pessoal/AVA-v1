export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    lastPage: number;
  };
  message?: string;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export interface PaginatedQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}
