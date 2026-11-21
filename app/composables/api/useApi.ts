import {
  type $Fetch,
  $fetch,
  type FetchContext,
  type FetchOptions,
  type ResponseType,
} from 'ofetch';

const RETRYABLE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const RETRYABLE_STATUS_CODES = [408, 425, 429, 500, 502, 503, 504];

function isIdempotentMethod(method?: string): boolean {
  return RETRYABLE_METHODS.has((method ?? 'GET').toUpperCase());
}

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
export function useApi(overrides: FetchOptions = {}): $Fetch {
  const config = useRuntimeConfig();
  // if server getCookie, if clients ignore
  const ssrHeaders = import.meta.server ? useRequestHeaders(['cookie']) : {};
  // retry
  const defaultRetries = isIdempotentMethod(overrides.method) ? 2 : 0;

  return $fetch.create({
    baseURL: import.meta.server ? `${config.public.appUrl}/api` : '/api',
    timeout: 15_000,
    retry: defaultRetries,
    retryStatusCodes: RETRYABLE_STATUS_CODES,
    retryDelay: (context) => computeBackOffDelay(context),

    onRequest<T>({ options }: FetchContext<T, ResponseType>): void {
      const headers = new Headers(options.headers as HeadersInit);

      if (import.meta.server && ssrHeaders.cookie) {
        headers.set('cookie', ssrHeaders.cookie);
      }

      // guard against mutations auto-retrying unless configured
      if (!isIdempotentMethod(options.method) && options.retry === undefined) {
        options.retry = 0;
      }

      options.headers = headers;
    },

    async onResponseError({ response, options }) {
      const status = response.status;
      const retriesRemaining = typeof options.retry === 'number' ? options.retry : 0;
      const willRetry =
        isIdempotentMethod(options.method) &&
        RETRYABLE_STATUS_CODES.includes(status) &&
        retriesRemaining > 0;

      // Let ofetch finish retrying transient statuses before throwing a normalized error
      if (willRetry) {
        return;
      }

      const payload = response._data;

      switch (status) {
        case 401:
          throw createError({
            status: 401,
            message: payload.data?.message ?? 'Unauthorized',
          });

        case 403:
          throw createError({
            status: 403,
            message: 'Not allowed',
          });

        case 422:
          throw createError({
            status: 422,
            message: payload?.message || 'Validation error',
            data: payload?.errors ?? payload.data ?? {},
          });

        case 409:
          throw createError({
            status: 409,
            message: payload?.message ?? 'Not allowed',
            data: payload?.errors ?? payload.data ?? {},
          });

        case 500:
          throw createError({
            status: 500,
            message: 'Internal server error',
          });
      }
    },

    ...overrides,
  });
}
