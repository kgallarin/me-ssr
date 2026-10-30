import type { IconLink, IconLinksPayload } from '@/types/Icons.ts';
import { useApiFetchList } from '~/composables/api/useFetchList.ts';

export const useIconLinks = () => {
  const url = computed((): string => '/icon-links');

  const { items, loading, error, status, refresh, execute } = useApiFetchList<
    IconLink,
    IconLinksPayload
  >(url, (payload: IconLinksPayload): IconLink[] => payload.iconLinks);

  return {
    items,
    loading,
    error,
    status,
    refresh,
    execute,
  };
};
