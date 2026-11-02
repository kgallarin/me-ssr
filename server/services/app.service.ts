import type { H3Event } from 'h3';
import { type $Fetch, $fetch } from 'ofetch';

export function createAppFetch(event: H3Event): $Fetch {
  const config = useRuntimeConfig(event);

  return $fetch.create({
    baseURL: config.graphqlUrl as string,
    timeout: 15_000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },

    onResponse({ response }) {
      const errors = response._data.errors;
      if (errors && errors.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: errors[0].message || 'API Error',
          data: errors,
        });
      }

      const body = response._data;
      // Standard top-level GraphQL protocol errors
      const bodyErrors = body?.errors;
      if (bodyErrors && bodyErrors.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: bodyErrors[0].message || 'API Error',
          data: bodyErrors,
        });
      }

      // Check for success: false inside mutation data
      const data = body?.data;
      if (data) {
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
