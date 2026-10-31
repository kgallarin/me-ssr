import { getPageContent } from '#server/services/page-content.service.ts';
import type { ApiResponse } from '@/types/Api.ts';
import type { PageTextContentPayloadSingle } from '@/types/PageTextContent.ts';
import type { H3Event } from 'h3';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<PageTextContentPayloadSingle>> => {
    const key = event.context.params?.handle;

    if (!key) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Content key is missing',
      });
    }
    return await getPageContent(event, key as string);
  },
);
