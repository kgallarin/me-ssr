import type { UseFetchOptions } from '#app';
import type { ApiResponse, ApiResponseError } from '@/types/Api.ts';

export function useApiFetchList<TNode, TPayload>(
  url: MaybeRefOrGetter<string>,
  extract: (payload: TPayload) => TNode[],
  options?: UseFetchOptions<ApiResponse<TPayload>>,
) {
  const { $api } = useNuxtApp();

  const { data, status, error, refresh, execute } = useFetch<ApiResponse<TPayload>>(
    url,
    {
      $fetch: $api as UseFetchOptions<ApiResponse<TPayload>>['$fetch'],
      dedupe: 'defer',
      ...options,
    },
  );

  const items = computed<TNode[]>((): TNode[] => {
    if (!data.value?.data) return [];
    return extract(data.value.data);
  });

  return {
    items,
    loading: computed((): boolean => status.value === 'pending'),
    status,
    error: error as Ref<ApiResponseError | null>,
    refresh,
    execute,
  };
}
