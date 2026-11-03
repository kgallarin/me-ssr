import { createAppFetch } from '#server/services/app.service.ts';
import type { ApiResponse } from '@/types/Api.ts';
import type {
  PageTextContentPayload,
  PageTextContentPayloadSingle,
} from '@/types/PageTextContent.ts';
import type { H3Event } from 'h3';

export const GET_PAGE_CONTENT = `
  query GetContentsByKeys($key: String!) {
    content(key: $key) {
      id
      key
      title
      subtitle
      content {
        title
        text
      }
      heroImages {
        url
        alt
      }
      socialImages {
        url
        alt
      }
    }
  }
`;

export const GET_PAGE_CONTENT_BY_KEYS = `
  query GetContentsByKeys($keys: [String!]) {
    contents(keys: $keys) {
      id
      key
      title
      subtitle
      content {
        title
        text
      }
      heroImages {
        url
        alt
      }
      socialImages {
        url
        alt
      }
    }
  }
`;

export const GET_PAGE_CONTENTS = `
  query GetContents {
    contents {
      id
      key
      title
      subtitle
      content {
        title
        text
      }
      heroImages {
        url
        alt
      }
      socialImages {
        url
        alt
      }
    }
  }
`;
export async function getPageContents(
  event: H3Event,
): Promise<ApiResponse<PageTextContentPayload>> {
  const pageContentsFetch = createAppFetch(event);
  return await pageContentsFetch('', {
    method: 'POST',
    body: JSON.stringify({
      query: GET_PAGE_CONTENTS,
    }),
  });
}

export async function getPageContentByKeys(
  event: H3Event,
  keys: string[],
): Promise<ApiResponse<PageTextContentPayloadSingle>> {
  const pageContentFetchByKeys = createAppFetch(event);

  const payload = {
    query: GET_PAGE_CONTENT_BY_KEYS,
    variables: {
      keys,
    },
  };
  return await pageContentFetchByKeys('', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getPageContent(
  event: H3Event,
  key: string,
): Promise<ApiResponse<PageTextContentPayloadSingle>> {
  const pageContentFetchByKey = createAppFetch(event);

  return await pageContentFetchByKey('', {
    method: 'POST',
    body: JSON.stringify({
      query: GET_PAGE_CONTENT,
      variables: {
        key,
      },
    }),
  });
}
