import type { IconLink, IconLinksPayload } from '@/types/Icons.ts';
import { useApiFetchList } from '~/composables/api/useFetchList.ts';

export const useIconLinks = () => {
  const url = computed((): string => '/icon-links');
  const nuxtApp = useNuxtApp();

  const { items, loading, error, status, refresh, execute } = useApiFetchList<
    IconLink,
    IconLinksPayload
  >(url, (payload: IconLinksPayload): IconLink[] => payload.iconLinks, {
    key: 'icons-with-links',
    getCachedData(key: string) {
      // cache to prevent refetching
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  });

  return {
    icons: items,
    loading,
    error,
    status,
    refresh,
    execute,
  };
};
