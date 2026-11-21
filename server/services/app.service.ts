import type { H3Event } from 'h3';
import { type $Fetch, $fetch, type FetchContext } from 'ofetch';

const RETRYABLE_STATUS_CODES = [408, 425, 429, 500, 502, 503, 504];

function computeBackOffDelay(
  context: FetchContext,
  baseDelayMs = 300,
  maxDelayMs = 4000,
): number {
  const retryAfter = context.response?.headers.get('retry-after');

  if (retryAfter) {
    const seconds = Number(retryAfter);
    if (!Number.isNaN(seconds)) {
      return Math.min(maxDelayMs, Math.max(0, seconds * 1000));
    }
  }

  const attempt =
    typeof context.options.retry === 'number' ? context.options.retry : 0;
  const exponential = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
  const jitter = Math.random() * 150;
  return Math.round(exponential + jitter);
}

export function createAppFetch(event: H3Event): $Fetch {
  const config = useRuntimeConfig(event);

  return $fetch.create({
    baseURL: config.graphqlUrl as string,
    timeout: 15_000,
    retry: 2,
    retryStatusCodes: RETRYABLE_STATUS_CODES,
    retryDelay: (context) => computeBackOffDelay(context),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },

    onResponse({ response }) {
      const body = response._data;

      // Standard top-level GraphQL protocol errors
      const bodyErrors = body?.errors;
      if (Array.isArray(bodyErrors) && bodyErrors.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: bodyErrors[0]?.message || 'API Error',
          data: bodyErrors,
        });
      }

      // Check for success: false inside mutation data
      const data = body?.data;
      if (data && typeof data === 'object') {
        for (const key of Object.keys(data)) {
          const result = data[key];
          if (
            result &&
            typeof result === 'object' &&
            'success' in result &&
            result.success === false
          ) {
            throw createError({
              statusCode: 422,
              statusMessage: result.message || 'Operation failed',
              data: result,
            });
          }
        }
      }
    },
  });
}
