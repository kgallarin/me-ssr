import type { ValidationErrorItem } from '@/types/Forms.ts';

export interface GraphQLErrorExtension {
  category?: string;
  validation?: Record<string, string[]>;
  [key: string]: unknown;
}

export interface GraphqlResponseBody<T = unknown> {
  data?: T | null;
  errors: ApiResponseError[];
}

export interface ApiResponseError {
  message: string;
  locations?: {
    line: number;
    column: number;
  }[];
  path?: (string | number)[];
  extensions?: GraphQLErrorExtension;
}

// errors from proxy
export interface ApiThrownError {
  status?: number;
  statusCode?: number;
  message?: string;
  data?: ValidationErrorItem[] | Record<string, string[] | string> | unknown;
}

export interface ApiPageInfo {
  total: number;
  count: number;
  currentPage: number;
  lastPage: number;
  hasMorePages: boolean;

  hasNextPage: boolean;
  endCursor: string | null;
}
export interface ApiResponse<T = unknown> {
  data?: T | null;
  errors?: ApiResponseError[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pageInfo: ApiPageInfo;
}
