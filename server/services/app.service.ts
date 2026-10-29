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
    },
  });
}
