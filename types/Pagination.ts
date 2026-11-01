import type { ApiPageInfo } from '@/types/Api.ts';

export interface CursorPagination<T> {
  getItems: () => T[];
  getPageInfo: () => ApiPageInfo | null | undefined;
  getLoading: () => boolean;
  onRefresh: () => void;
}
