import type {
  PageTextContent,
  PageTextContentPayload,
  PageTextContentPayloadSingle,
} from '@/types/PageTextContent.ts';
import { useApiFetchList } from '~/composables/api/useFetchList.ts';
import { useApiFetchSingle } from '~/composables/api/useFetchSingle.ts';

export function useFetchContent() {
  const url = computed((): string => '/contents');
  function fetchContent() {
    return useApiFetchList<PageTextContent, PageTextContentPayload>(
      url,
      (payload: PageTextContentPayload): PageTextContent[] => payload.contents,
      { key: 'global-text-content-list' },
    );
  }

  function fetchContentSingle(key: MaybeRefOrGetter<string>) {
    return useApiFetchSingle<PageTextContent, PageTextContentPayloadSingle>(
      computed((): string => `${url.value}/${toValue(key)}`),
      (payload: PageTextContentPayloadSingle): PageTextContent => payload.content,
      {
        key: `global-text-content-${toValue(key)}`,
      },
    );
  }

  return {
    fetchContent,
    fetchContentSingle,
  };
}
