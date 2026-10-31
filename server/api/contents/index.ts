import { getPageContents } from '#server/services/page-content.service.ts';
import type { ApiResponse } from '@/types/Api.ts';
import type { PageTextContentPayload } from '@/types/PageTextContent.ts';
import type { H3Event } from 'h3';

export default defineEventHandler(
  async (event: H3Event): Promise<ApiResponse<PageTextContentPayload>> => {
    return await getPageContents(event);
  },
);
