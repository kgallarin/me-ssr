import type { PaginatedResponse } from '@/types/Api.ts';
import type { Project, ProjectsPayload } from '@/types/Projects.ts';
import { usePaginatedFetchList } from '~/composables/api/usePaginatedFetchList.ts';

export const useProjects = (first: number = 10) => {
  const url = computed((): string => '/projects');
  const after = ref<string | null>(null);

  const extraPages = ref<(Project | null | undefined)[]>([]);

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

  const projects = computed((): (Project | null | undefined)[] =>
    loading.value && after.value
      ? extraPages.value
      : [...extraPages.value, ...items.value],
  );

  function loadMore(): void {
    if (!pageInfo.value?.hasMorePages || loading.value) return;
    extraPages.value = [...extraPages.value, ...items.value];
    after.value = pageInfo.value.endCursor ?? null;
  }

  function reset(): void {
    after.value = null;
    extraPages.value = [];

    refresh();
  }

  return {
    projects,
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
