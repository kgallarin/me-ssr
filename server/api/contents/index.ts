import { getPageContentByKeys } from '#server/services/page-content.service.ts';
import type { ApiResponse } from '@/types/Api.ts';
import type { PageTextContentPayloadSingle } from '@/types/PageTextContent.ts';
import type { H3Event } from 'h3';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<PageTextContentPayloadSingle>> => {
    const query = getQuery(event);
    const keysParam = query.keys;

    if (!keysParam) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Content key is missing',
      });
    }

    const keys =
      typeof keysParam === 'string'
        ? keysParam.split(',').map((key: string) => key.trim())
        : [];

    return await getPageContentByKeys(event, keys as string[]);
  },
);
