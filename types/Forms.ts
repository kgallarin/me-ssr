import type { ApiResponseError } from '@/types/Api.ts';
import type { FormOptions, TypedSchema } from 'vee-validate';

type SafeInitialValues<T extends Record<string, unknown>> = Required<
  FormOptions<T>
>['initialValues'];
export interface UseAppFormOptions<T extends Record<string, unknown>> {
  schema: TypedSchema<T>;
  initialValues?: SafeInitialValues<T>;
}

// form errors
export interface ValidationErrorItem {
  status: number;
  message: string;
  key: string;
}

export interface FormErrorPayload {
  error: unknown;
  // validation errors
  onValidationErrors: (errors: Record<string, string>) => void;
  // general errors (500, 403, etc.)
  onGlobalError?: (error: ApiResponseError) => void;
  // for stripping error prefix
  stripPrefix?: string;
}
