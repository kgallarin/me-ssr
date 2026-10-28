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

export interface ApiResponse<T = unknown> {
  data?: T | null;
  errors?: ApiResponseError[];
}
