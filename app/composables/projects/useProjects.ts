import type { ApiPageInfo, PaginatedResponse } from '@/types/Api.ts';
import type { Project, ProjectsPayload } from '@/types/Projects.ts';
import { usePaginatedFetchList } from '~/composables/api/usePaginatedFetchList.ts';

export const useProjects = (first: number = 10) => {
  const url = computed((): string => '/projects');

  const { appendedPageItems, after, loadMore, reset } = useCursorPagination({
    getItems: (): (Project | null | undefined)[] => items.value,
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
  } = usePaginatedFetchList<Project, ProjectsPayload>(
    url,
    (payload: ProjectsPayload): PaginatedResponse<Project> => payload.projects,
    {
      query: computed(() => ({
        first,
        after: after.value ?? undefined,
      })),
    },
  );

  return {
    projects: appendedPageItems,
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
