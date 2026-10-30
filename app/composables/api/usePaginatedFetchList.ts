import { type UseFetchOptions, useFetch } from '#app';
import type {
  ApiPageInfo,
  ApiResponse,
  ApiResponseError,
  PaginatedResponse,
} from '@/types/Api.ts';

export function usePaginatedFetchList<TNode, TPayload>(
  url: string | MaybeRefOrGetter<string>,
  extract: (payload: TPayload) => PaginatedResponse<TNode>,
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

  const paginator = computed((): PaginatedResponse<TNode> | null => {
    if (!data.value?.data) return null;
    return extract(data.value.data);
  });

  const items = computed((): (TNode | undefined | null)[] => {
    const paginatorValue = paginator.value;
    if (!paginatorValue) return [];

    return paginatorValue.data.map((item: TNode) => item);
  });

  const pageInfoWithEndCursor = computed((): ApiPageInfo | null => {
    const info = paginator.value?.pageInfo;
    if (!info) return null;

    return {
      ...info,
      hasNextPage: info.hasMorePages,
      endCursor: String(info.currentPage),
    };
  });

  return {
    items,
    pageInfo: pageInfoWithEndCursor,
    graphQLErrors: computed((): ApiResponseError[] => data.value?.errors ?? []),
    fetchError: error,
    status,
    loading: computed((): boolean => status.value === 'pending'),
    refresh,
    execute,
  };
}
