import { type UseFetchOptions, useFetch } from '#app';
import type {
  ApiResponse,
} from '@/types/Api.ts';

export function useApiFetchList<TNode, TPayload>(
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

  const items = computed(() => {
    if (!data.value?.data) return [];
    return extract(data.value?.data);
  });

  return {
    items,
    graphQLErrors: computed(() => data.value?.errors ?? []),
    fetchError: error,
    status,
    loading: computed((): boolean => status.value === 'pending'),
    refresh,
    execute
  }
}
