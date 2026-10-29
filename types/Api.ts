export interface GraphQLErrorExtension {
  category?: string;
  validation?: Record<string, string[]>;
  [key: string]: unknown;
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
