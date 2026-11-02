import type { ApiResponseError, ApiThrownError } from '@/types/Api.ts';
import type { FormErrorPayload, ValidationErrorItem } from '@/types/Forms.ts';

export function handleFormErrors({
  error,
  onValidationErrors,
  onGlobalError,
  stripPrefix = '',
}: FormErrorPayload): void {
  const err = error as ApiThrownError;
  const status = err.status ?? err.statusCode;

  if (status === 422 && Array.isArray(err.data)) {
    const newErrors: Record<string, string> = {};
    let hasUnmappedGlobalError = false;

    err.data.forEach((item: ValidationErrorItem): void => {
      const field = item.key.startsWith(stripPrefix)
        ? item.key.slice(stripPrefix?.length)
        : item.key;

      if (field) {
        newErrors[field] = item.message;
      } else {
        hasUnmappedGlobalError = true;
      }
    });

    onValidationErrors(newErrors);

    // if there's a validation item that can't be mapped to a field, pass it global
    if (hasUnmappedGlobalError && onGlobalError) {
      onGlobalError(err as ApiResponseError);
    }

    return;
  }

  if (onGlobalError) {
    onGlobalError(err as ApiResponseError);
  }
}
