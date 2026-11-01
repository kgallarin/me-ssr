import type { ApiPageInfo, PaginatedResponse } from '@/types/Api.ts';
import type { Testimonial, TestimonialsPayload } from '@/types/Recommendations.ts';
import { usePaginatedFetchList } from '~/composables/api/usePaginatedFetchList.ts';

export const useRecommendations = (first: number = 10) => {
  const url = computed((): string => '/recommendations');

  const { appendedPageItems, after, loadMore, reset } = useCursorPagination({
    getItems: (): (Testimonial | null | undefined)[] => items.value,
    getPageInfo: (): ApiPageInfo | null => pageInfo.value,
    getLoading: (): boolean => loading.value,
    onRefresh: (): Promise<void> => refresh(),
  });

  const {
    items,
    pageInfo,
    loading,
    graphQLErrors,
    fetchError,
    status,
    refresh,
    execute,
  } = usePaginatedFetchList<Testimonial, TestimonialsPayload>(
    url,
    (payload: TestimonialsPayload): PaginatedResponse<Testimonial> =>
      payload.recommendations,
    {
      query: computed(() => ({
        first,
        after: after.value ?? undefined,
      })),
    },
  );

  return {
    testimonials: appendedPageItems,
    graphQLErrors,
    fetchError,
    loading,
    pageInfo,
    status,

    loadMore,
    execute,
    reset,
  };
};
