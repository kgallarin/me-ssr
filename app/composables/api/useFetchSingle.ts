import { type UseFetchOptions, useFetch } from '#app';
import type {
  ApiResponse,
  ApiResponseError
} from '@/types/Api.ts';

export function useApiFetchSingle<TNode, TPayload>(
  url: string | MaybeRefOrGetter<string>,
  extract: (payload: TPayload) => TNode,
  options?: UseFetchOptions<ApiResponse<TPayload>>
) {
  const { $api } = useNuxtApp();

  const {data, status, error, refresh, execute } = useFetch<ApiResponse<TPayload>>(url, {
    $fetch: $api as UseFetchOptions<ApiResponse<TPayload>>['$fetch'],
    dedupe: 'defer',
    ...options
  });

  const item = computed(() => {
    if (!data.value?.data) return {};
    return extract(data.value?.data);
  })

  return {
    item,
    loading: computed((): boolean => status.value === 'pending'),
    status,
    graphQLErrors: computed((): ApiResponseError[] => data.value?.errors ?? []),
    fetchError: error,
    refresh,
    execute
  }
}

